import { describe, expect, it, vi } from "vitest";
import type { Device } from "../generated/prisma/client.js";
import { createDeviceSimulator } from "../server/simulator";
import {
  createTelemetryIngestionService,
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
    expect((await service.ingest({ ...valid, deviceId: "UNKNOWN" })).reason).toBe("unknown");
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
    expect((await service.ingest({ ...telemetry, sequence: 2 })).outcome).toBe("stale");
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
});
