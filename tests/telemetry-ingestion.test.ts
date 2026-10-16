import { describe, expect, it, vi } from "vitest";
import type { Device } from "../generated/prisma/client.js";
import { createDeviceSimulator, createTelemetryMessageId } from "../server/simulator";
import {
  createTelemetryIngestionService,
  validateTelemetryEnvelope,
  toTelemetryProjection,
  type TelemetryProjection,
  type TelemetryPersistence,
} from "../server/telemetry/ingestion";
import { processSimulationTick } from "../server/telemetry/runner-boundary";

function makeDevice(overrides: Partial<Device> = {}): Device {
  return {
    unitId: "SIM-0001",
    platform: "MK",
    status: "ONLINE",
    zone: "ALPHA",
    powerPct: 80,
    linkStatus: "STABLE",
    signalQuality: 90,
    lastPingAt: new Date("2026-10-15T12:00:00.000Z"),
    lastTelemetryOccurredAt: null,
    role: "SCOUT",
    health: "HEALTHY",
    availability: "AVAILABLE",
    charging: "NOT_CHARGING",
    assignmentId: null,
    faultCode: null,
    lastMessageId: null,
    lastSimulatorRunId: null,
    lastTelemetrySequence: 0,
    authorityRunId: null,
    authorityGeneration: null,
    ...overrides,
  };
}

function makeTelemetry() {
  const telemetry = createDeviceSimulator({ fleetSize: 1, seed: 7 }, { runId: "run-a" }).tick()?.telemetry[0];
  if (!telemetry) {
    throw new Error("Expected the simulator to generate telemetry");
  }
  return telemetry;
}

describe("telemetry ingestion", () => {
  it("maps simulator telemetry to the fleet projection and operational state", () => {
    const telemetry = makeTelemetry();
    const receivedAt = new Date("2026-10-15T12:05:00.000Z");
    const projection = toTelemetryProjection({
      ...telemetry,
      measurements: {
        ...telemetry.measurements,
        batteryPct: 81.6,
        connectivity: "DISCONNECTED",
        health: "FAULTED",
        availability: "ASSIGNED",
        charging: "CHARGING",
        assignmentId: "assignment-1",
        faultCode: "SENSOR_DEGRADED",
      },
    }, receivedAt);
    expect(projection).toMatchObject({
      unitId: "SIM-0001",
      platform: "MK",
      occurredAt: new Date(telemetry.occurredAt),
      receivedAt,
      powerPct: 82,
      linkStatus: "LOST",
      health: "FAULTED",
      availability: "ASSIGNED",
      charging: "CHARGING",
      assignmentId: "assignment-1",
      faultCode: "SENSOR_DEGRADED",
      simulatorRunId: "run-a",
    });
  });

  it("accepts only cross-field operational states that can be represented consistently", () => {
    const telemetry = makeTelemetry();
    expect(validateTelemetryEnvelope(telemetry)).toBe(true);
    expect(validateTelemetryEnvelope({
      ...telemetry,
      measurements: { ...telemetry.measurements, availability: "AVAILABLE", assignmentId: "assignment-1" },
    })).toBe(false);
    expect(validateTelemetryEnvelope({
      ...telemetry,
      measurements: { ...telemetry.measurements, availability: "ASSIGNED", assignmentId: null },
    })).toBe(false);
    expect(validateTelemetryEnvelope({
      ...telemetry,
      measurements: { ...telemetry.measurements, charging: "CHARGING", assignmentId: "assignment-1" },
    })).toBe(false);
  });

  it("rejects messages whose canonical identity does not match their envelope fields", async () => {
    const service = createTelemetryIngestionService({ persist: vi.fn() });
    const telemetry = makeTelemetry();

    for (const malformed of [
      { ...telemetry, messageId: "telemetry-v1-invalid" },
      { ...telemetry, deviceId: "SIM-9999" },
      { ...telemetry, sequence: telemetry.sequence + 1 },
      { ...telemetry, simulator: { ...telemetry.simulator, runId: "other-run" } },
    ]) {
      expect((await service.ingest(malformed)).reason).toBe("invalid-telemetry");
    }
  });

  it("uses the injected receipt clock for liveness while preserving producer time", async () => {
    let captured: TelemetryProjection | undefined;
    const service = createTelemetryIngestionService({
      persist: async (projection) => {
        captured = projection;
        return { kind: "persisted" as const, device: makeDevice() };
      },
    }, { clock: { now: () => new Date("2026-10-15T12:05:00.000Z") } });

    const telemetry = makeTelemetry();
    await service.ingest(telemetry);

    expect(captured).toMatchObject({
      occurredAt: new Date(telemetry.occurredAt),
      receivedAt: new Date("2026-10-15T12:05:00.000Z"),
    });
  });

  it("accepts valid messages, rejects invalid and unknown identities, and keeps counters distinct", async () => {
    const persistence: TelemetryPersistence = {
      persist: vi.fn(async (projection) =>
        projection.unitId === "SIM-0001"
          ? { kind: "persisted" as const, device: makeDevice() }
          : { kind: "unknown" as const },
      ),
    };
    const service = createTelemetryIngestionService(persistence);
    const valid = makeTelemetry();
    expect((await service.ingest(valid)).outcome).toBe("persisted");
    expect((await service.ingest({
      ...valid,
      deviceId: "UNKNOWN",
      messageId: createTelemetryMessageId(valid.simulator.runId, "UNKNOWN", valid.sequence),
    })).reason).toBe("unknown");
    expect((await service.ingest({ ...valid, sequence: 0 })).reason).toBe("invalid-telemetry");
    expect(service.getCounters()).toEqual({ accepted: 2, rejected: 2, persisted: 1, failed: 0 });
  });

  it("does not count duplicates or stale messages as persisted", async () => {
    const persistence: TelemetryPersistence = {
      persist: vi.fn()
        .mockResolvedValueOnce({ kind: "persisted" as const, device: makeDevice() })
        .mockResolvedValueOnce({ kind: "duplicate" as const })
        .mockResolvedValueOnce({ kind: "stale" as const }),
    };
    const service = createTelemetryIngestionService(persistence);
    const telemetry = makeTelemetry();
    expect((await service.ingest(telemetry)).persisted).toBe(true);
    expect((await service.ingest(telemetry)).outcome).toBe("duplicate");
    expect((await service.ingest({
      ...telemetry,
      sequence: 2,
      messageId: createTelemetryMessageId(telemetry.simulator.runId, telemetry.deviceId, 2),
    })).outcome).toBe("stale");
    expect(service.getCounters()).toMatchObject({ accepted: 3, persisted: 1, rejected: 2 });
  });

  it("separates persistence failures from rejected messages", async () => {
    const service = createTelemetryIngestionService({ persist: async () => { throw new Error("database unavailable"); } });
    const result = await service.ingest(makeTelemetry());
    expect(result).toMatchObject({ outcome: "failed", accepted: true, rejected: false, persisted: false });
    expect(service.getCounters()).toEqual({ accepted: 1, rejected: 0, persisted: 0, failed: 1 });
  });

  it("keeps batch counters aligned when persistence fails", async () => {
    const service = createTelemetryIngestionService({ persist: async () => { throw new Error("database unavailable"); } });
    const tick = createDeviceSimulator({ fleetSize: 1 }, { runId: "failed-batch" }).tick()!;
    const result = await processSimulationTick(tick, service);
    expect(result).toMatchObject({ generated: 1, accepted: 1, rejected: 0, persisted: 0, failed: 1 });
  });

  it("processes a simulator tick through the explicit batch boundary", async () => {
    const service = createTelemetryIngestionService({
      persist: async () => ({ kind: "persisted" as const, device: makeDevice() }),
    });
    const tick = createDeviceSimulator({ fleetSize: 2 }, { runId: "batch-test" }).tick()!;
    const result = await processSimulationTick(tick, service);
    expect(result).toMatchObject({ generated: 2, accepted: 2, rejected: 0, persisted: 2, failed: 0 });
  });

  it("forwards telemetry while leaving generated operational events outside persistence", async () => {
    const persist = vi.fn(async () => ({ kind: "persisted" as const, device: makeDevice() }));
    const service = createTelemetryIngestionService({ persist });
    const telemetry = makeTelemetry();
    const result = await processSimulationTick({
      occurredAt: telemetry.occurredAt,
      telemetry: [telemetry],
      events: [{
        type: "fault.opened",
        deviceId: telemetry.deviceId,
        occurredAt: telemetry.occurredAt,
        details: { faultCode: "SENSOR_DEGRADED" },
      }],
    }, service);

    expect(result).toMatchObject({ generated: 1, persisted: 1, failed: 0 });
    expect(persist).toHaveBeenCalledTimes(1);
  });
});
