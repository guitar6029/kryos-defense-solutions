import type { Device } from "../../generated/prisma/client.js";
import type { PrismaClient } from "../../generated/prisma/client.js";
import { getPrismaClient } from "../utils/prisma";
import { publishDeviceUpdated } from "../utils/fleet-events";
import { createTelemetryMessageId, type TelemetryEnvelope } from "../simulator/device-simulator";

export type TelemetryProjection = {
  unitId: string;
  platform: "MK" | "EX";
  status: "ONLINE" | "OFFLINE" | "DEGRADED";
  powerPct: number;
  linkStatus: "STABLE" | "WEAK" | "LOST";
  signalQuality: number;
  occurredAt: Date;
  receivedAt: Date;
  health: "HEALTHY" | "FAULTED";
  availability: "AVAILABLE" | "ASSIGNED";
  charging: "NOT_CHARGING" | "CHARGING";
  assignmentId: string | null;
  faultCode: string | null;
  messageId: string;
  simulatorRunId: string;
  sequence: number;
  generation: number;
};

export type TelemetryPersistenceResult =
  | { kind: "persisted"; device: Device }
  | { kind: "duplicate" | "stale" | "unknown" | "identity-mismatch" | "superseded" | "stopped" };

export type TelemetryPersistence = {
  persist: (projection: TelemetryProjection) => Promise<TelemetryPersistenceResult>;
};

export type TelemetryReceiptClock = { now: () => Date };

export type TelemetryIngestionResult = {
  outcome: "persisted" | "duplicate" | "stale" | "rejected" | "failed";
  accepted: boolean;
  rejected: boolean;
  persisted: boolean;
  reason?: string;
  device?: Device;
};

export type TelemetryIngestionCounters = {
  accepted: number;
  rejected: number;
  persisted: number;
  failed: number;
};

/**
 * Counter semantics:
 * generated is owned by the simulator; accepted means the envelope passed
 * validation and processing was attempted; rejected counts invalid messages
 * plus valid messages refused by identity/order policy; persisted means state
 * advanced; failed means processing errored before persistence was confirmed.
 */

const CONNECTIVITY_TO_LINK_STATUS = {
  CONNECTED: "STABLE",
  DEGRADED: "WEAK",
  DISCONNECTED: "LOST",
} as const;

const PLATFORMS = new Set(["MK", "EX"]);
const STATUSES = new Set(["ONLINE", "OFFLINE", "DEGRADED"]);
const CONNECTIVITY = new Set(Object.keys(CONNECTIVITY_TO_LINK_STATUS));
const HEALTH = new Set(["HEALTHY", "FAULTED"]);
const AVAILABILITY = new Set(["AVAILABLE", "ASSIGNED"]);
const CHARGING = new Set(["NOT_CHARGING", "CHARGING"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function boundedString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength;
}

function isBoundedNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100;
}

function isNullableString(value: unknown, maxLength: number): value is string | null {
  return value === null || (typeof value === "string" && value.length <= maxLength);
}

function hasConsistentOperationalState(measurements: Record<string, unknown>): boolean {
  const assignmentId = measurements.assignmentId;
  const availability = measurements.availability;
  const charging = measurements.charging;
  if (availability === "AVAILABLE" && assignmentId !== null) return false;
  if (availability === "ASSIGNED" && assignmentId === null) return false;
  if (charging === "CHARGING" && assignmentId !== null) return false;
  return true;
}

export function validateTelemetryEnvelope(value: unknown): value is TelemetryEnvelope {
  if (!isRecord(value) || value.schemaVersion !== 1) return false;
  if (!boundedString(value.messageId, 256) || !boundedString(value.deviceId, 128)) return false;
  if (!PLATFORMS.has(String(value.deviceType))) return false;
  if (typeof value.sequence !== "number" || !Number.isSafeInteger(value.sequence) || value.sequence <= 0) return false;
  if (!boundedString(value.occurredAt, 64) || !Number.isFinite(Date.parse(value.occurredAt))) return false;
  if (!isRecord(value.measurements) || !isRecord(value.simulator)) return false;
  const measurements = value.measurements;
  const simulator = value.simulator;
  return (
    isBoundedNumber(measurements.batteryPct) &&
    Number.isInteger(measurements.signalQuality) &&
    isBoundedNumber(measurements.signalQuality) &&
    typeof measurements.connectivity === "string" && CONNECTIVITY.has(measurements.connectivity) &&
    typeof measurements.health === "string" && HEALTH.has(measurements.health) &&
    typeof measurements.availability === "string" && AVAILABILITY.has(measurements.availability) &&
    typeof measurements.charging === "string" && CHARGING.has(measurements.charging) &&
    typeof measurements.status === "string" && STATUSES.has(measurements.status) &&
    isNullableString(measurements.assignmentId, 256) &&
    isNullableString(measurements.faultCode, 128) &&
    hasConsistentOperationalState(measurements) &&
    boundedString(simulator.seed, 128) &&
    boundedString(simulator.runId, 128) &&
    typeof simulator.generation === "number" && Number.isSafeInteger(simulator.generation) && simulator.generation > 0 &&
    value.messageId === createTelemetryMessageId(simulator.runId, value.deviceId, value.sequence)
  );
}

export function toTelemetryProjection(telemetry: TelemetryEnvelope, receivedAt: Date = new Date()): TelemetryProjection {
  if (Number.isNaN(receivedAt.getTime())) throw new RangeError("receivedAt must be a valid Date");
  return {
    unitId: telemetry.deviceId,
    platform: telemetry.deviceType,
    status: telemetry.measurements.status,
    powerPct: Math.round(telemetry.measurements.batteryPct),
    linkStatus: CONNECTIVITY_TO_LINK_STATUS[telemetry.measurements.connectivity],
    signalQuality: telemetry.measurements.signalQuality,
    occurredAt: new Date(telemetry.occurredAt),
    receivedAt: new Date(receivedAt.getTime()),
    health: telemetry.measurements.health,
    availability: telemetry.measurements.availability,
    charging: telemetry.measurements.charging,
    assignmentId: telemetry.measurements.assignmentId,
    faultCode: telemetry.measurements.faultCode,
    messageId: telemetry.messageId,
    simulatorRunId: telemetry.simulator.runId,
    sequence: telemetry.sequence,
    generation: telemetry.simulator.generation,
  };
}

/** Persist the current projection atomically, without accepting an older sample. */
export function createPrismaTelemetryPersistence(prisma: PrismaClient = getPrismaClient()): TelemetryPersistence {
  return {
    persist: async (projection) => prisma.$transaction(async (tx) => {
      const run = await tx.simulatorRun.findUnique({ where: { runId: projection.simulatorRunId } });
      if (!run) return { kind: "unknown" as const };
      if (run.status !== "ACTIVE") return { kind: "stopped" as const };
      if (run.generation !== BigInt(projection.generation)) return { kind: "superseded" as const };
      const current = await tx.device.findUnique({ where: { unitId: projection.unitId } });
      if (!current) return { kind: "unknown" as const };
      if (current.platform !== projection.platform) return { kind: "identity-mismatch" as const };
      if (current.authorityRunId !== projection.simulatorRunId || current.authorityGeneration !== BigInt(projection.generation)) {
        return { kind: "superseded" as const };
      }
      const samePersistedRun = current.lastSimulatorRunId === projection.simulatorRunId;
      if (samePersistedRun && projection.sequence <= current.lastTelemetrySequence) {
        return { kind: projection.messageId === current.lastMessageId ? "duplicate" as const : "stale" as const };
      }

      const updated = await tx.device.updateMany({
        where: {
          unitId: projection.unitId,
          authorityRunId: projection.simulatorRunId,
          authorityGeneration: BigInt(projection.generation),
          OR: [
            { lastSimulatorRunId: { not: projection.simulatorRunId } },
            { lastTelemetrySequence: { lt: projection.sequence } },
          ],
        },
        data: {
          status: projection.status,
          powerPct: projection.powerPct,
          linkStatus: projection.linkStatus,
          signalQuality: projection.signalQuality,
          lastPingAt: projection.receivedAt,
          lastTelemetryOccurredAt: projection.occurredAt,
          health: projection.health,
          availability: projection.availability,
          charging: projection.charging,
          assignmentId: projection.assignmentId,
          faultCode: projection.faultCode,
          lastMessageId: projection.messageId,
          lastSimulatorRunId: projection.simulatorRunId,
          lastTelemetrySequence: projection.sequence,
        },
      });
      if (updated.count !== 1) return { kind: "stale" as const };
      const device = await tx.device.findUnique({ where: { unitId: projection.unitId } });
      if (!device) return { kind: "unknown" as const };
      return { kind: "persisted" as const, device };
    }),
  };
}

export class TelemetryIngestionService {
  private readonly persistence: TelemetryPersistence;
  private readonly clock: TelemetryReceiptClock;
  private counters: TelemetryIngestionCounters = { accepted: 0, rejected: 0, persisted: 0, failed: 0 };

  constructor(
    persistence: TelemetryPersistence = createPrismaTelemetryPersistence(),
    options: { clock?: TelemetryReceiptClock } = {},
  ) {
    this.persistence = persistence;
    this.clock = options.clock ?? { now: () => new Date() };
  }

  getCounters(): TelemetryIngestionCounters {
    return { ...this.counters };
  }

  async ingest(telemetry: unknown): Promise<TelemetryIngestionResult> {
    if (!validateTelemetryEnvelope(telemetry)) {
      this.counters.rejected += 1;
      return { outcome: "rejected", accepted: false, rejected: true, persisted: false, reason: "invalid-telemetry" };
    }

    const projection = toTelemetryProjection(telemetry, this.clock.now());
    let result: TelemetryPersistenceResult;
    try {
      result = await this.persistence.persist(projection);
    } catch {
      this.counters.accepted += 1;
      this.counters.failed += 1;
      return { outcome: "failed", accepted: true, rejected: false, persisted: false, reason: "persistence-failed" };
    }

    if (result.kind === "persisted") {
      this.counters.accepted += 1;
      this.counters.persisted += 1;
      try {
        publishDeviceUpdated(toFleetEventPayload(result.device));
      } catch {
        // Database state is already committed; a process-local listener cannot undo it.
      }
      return { outcome: "persisted", accepted: true, rejected: false, persisted: true, device: result.device };
    }
    if (result.kind === "unknown" || result.kind === "identity-mismatch" || result.kind === "superseded" || result.kind === "stopped") {
      this.counters.accepted += 1;
      this.counters.rejected += 1;
      return { outcome: "rejected", accepted: true, rejected: true, persisted: false, reason: result.kind };
    }

    this.counters.accepted += 1;
    this.counters.rejected += 1;
    return { outcome: result.kind, accepted: true, rejected: true, persisted: false, reason: result.kind };
  }
}

function toFleetEventPayload(device: Device) {
  return {
    unitId: device.unitId,
    platform: device.platform as "MK" | "EX",
    status: device.status as "ONLINE" | "OFFLINE" | "MAINTENANCE" | "DEGRADED",
    zone: device.zone as "ALPHA" | "BRAVO" | "CHARLIE" | "DELTA",
    linkStatus: device.linkStatus as "STABLE" | "WEAK" | "LOST",
    role: device.role as "SCOUT" | "SUPPORT" | "GUARD" | "HAUL",
    powerPct: device.powerPct,
    signalQuality: device.signalQuality,
    lastPingAt: device.lastPingAt.toISOString(),
  };
}

export function createTelemetryIngestionService(
  persistence?: TelemetryPersistence,
  options: { clock?: TelemetryReceiptClock } = {},
): TelemetryIngestionService {
  return new TelemetryIngestionService(persistence, options);
}
