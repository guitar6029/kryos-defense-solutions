import { randomUUID } from "node:crypto";

export const DEFAULT_SIMULATOR_CONFIG = {
  fleetSize: 500,
  telemetryIntervalMs: 5_000,
  seed: 1,
  batteryDrainPerSecond: 0.02,
  batteryChargePerSecond: 0.2,
  lowBatteryThreshold: 25,
  chargeCompleteThreshold: 90,
  connectivityLossProbability: 0.02,
  connectivityRecoveryProbability: 0.35,
  faultProbability: 0.01,
  faultRecoveryProbability: 0.2,
  assignmentChangeProbability: 0.04,
};

export type SimulatorConfig = Omit<Partial<typeof DEFAULT_SIMULATOR_CONFIG>, "fleetSize" | "telemetryIntervalMs" | "seed"> & {
  fleetSize?: number;
  telemetryIntervalMs?: number;
  seed?: number | string;
  deviceIds?: string[];
};

export type SimulatorClock = { now: () => Date };
export type RandomSource = { next: () => number };

export type ConnectivityState = "CONNECTED" | "DEGRADED" | "DISCONNECTED";
export type HealthState = "HEALTHY" | "FAULTED";
export type AvailabilityState = "AVAILABLE" | "ASSIGNED";
export type ChargingState = "NOT_CHARGING" | "CHARGING";
export type DeviceStatus = "ONLINE" | "OFFLINE" | "DEGRADED";

export type SimulatedDevice = {
  unitId: string;
  platform: "MK" | "EX";
  role: "SCOUT" | "SUPPORT" | "GUARD" | "HAUL";
  zone: "ALPHA" | "BRAVO" | "CHARLIE" | "DELTA";
  status: DeviceStatus;
  connectivity: ConnectivityState;
  health: HealthState;
  availability: AvailabilityState;
  charging: ChargingState;
  assignmentId: string | null;
  batteryPct: number;
  signalQuality: number;
  faultCode: FaultCode | null;
  lastTelemetryAt: string | null;
  sequence: number;
};

export type TelemetryEnvelope = {
  schemaVersion: 1;
  messageId: string;
  deviceId: string;
  deviceType: SimulatedDevice["platform"];
  sequence: number;
  occurredAt: string;
  measurements: {
    batteryPct: number;
    signalQuality: number;
    connectivity: ConnectivityState;
    health: HealthState;
    availability: AvailabilityState;
    charging: ChargingState;
    status: DeviceStatus;
    assignmentId: string | null;
    faultCode: string | null;
  };
  simulator: { seed: string; runId: string; generation: number };
};

export type OperationalEventType =
  | "connectivity.changed"
  | "fault.opened"
  | "fault.cleared"
  | "assignment.changed"
  | "assignment.completed"
  | "charging.started"
  | "charging.completed";

export type OperationalEvent = {
  type: OperationalEventType;
  deviceId: string;
  occurredAt: string;
  details: Record<string, string | number | null>;
};

export type SimulationTick = {
  occurredAt: string;
  telemetry: TelemetryEnvelope[];
  events: OperationalEvent[];
};

export type SimulatorCounters = {
  ticks: number;
  telemetryGenerated: number;
  operationalEventsGenerated: number;
};

type ResolvedConfig = Omit<Required<SimulatorConfig>, "seed" | "deviceIds"> & {
  seed: string;
  deviceIds?: string[];
};

const PLATFORMS = ["MK", "EX"] as const;
const ROLES = ["SCOUT", "SUPPORT", "GUARD", "HAUL"] as const;
const ZONES = ["ALPHA", "BRAVO", "CHARLIE", "DELTA"] as const;
const FAULT_CODES = ["SENSOR_DEGRADED", "POWER_ANOMALY", "LINK_CONTROLLER"] as const;
type FaultCode = (typeof FAULT_CODES)[number];

function seededRandom(seed: number | string): RandomSource {
  let state = typeof seed === "number" ? seed >>> 0 : hashSeed(seed);
  return {
    next: () => {
      state += 0x6d2b79f5;
      let value = Math.imul(state ^ (state >>> 15), 1 | state);
      value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
      return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    },
  };
}

function hashSeed(seed: string): number {
  let hash = 2_166_136_261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16_777_619);
  }
  return hash >>> 0;
}

function validateConfig(input: SimulatorConfig): ResolvedConfig {
  const config = { ...DEFAULT_SIMULATOR_CONFIG, ...input };
  const integerFields = ["fleetSize", "telemetryIntervalMs"] as const;
  for (const field of integerFields) {
    if (!Number.isInteger(config[field]) || config[field] <= 0) {
      throw new RangeError(`${field} must be a positive integer`);
    }
  }
  if (config.fleetSize > 100_000) throw new RangeError("fleetSize is too large");
  if (typeof config.seed !== "number" && typeof config.seed !== "string") {
    throw new TypeError("seed must be a number or string");
  }
  if (config.deviceIds !== undefined) {
    if (config.deviceIds.length === 0 || config.deviceIds.some((id) => typeof id !== "string" || !id.trim())) {
      throw new RangeError("deviceIds must contain at least one non-empty ID");
    }
    if (new Set(config.deviceIds).size !== config.deviceIds.length) {
      throw new RangeError("deviceIds must not contain duplicates");
    }
    if (config.deviceIds.length !== config.fleetSize) {
      throw new RangeError("deviceIds length must match fleetSize");
    }
  }
  const boundedFields = [
    "lowBatteryThreshold",
    "chargeCompleteThreshold",
  ] as const;
  for (const field of boundedFields) {
    if (!Number.isFinite(config[field]) || config[field] < 0 || config[field] > 100) {
      throw new RangeError(`${field} must be between 0 and 100`);
    }
  }
  if (config.lowBatteryThreshold >= config.chargeCompleteThreshold) {
    throw new RangeError("lowBatteryThreshold must be below chargeCompleteThreshold");
  }
  const rateFields = ["batteryDrainPerSecond", "batteryChargePerSecond"] as const;
  for (const field of rateFields) {
    if (!Number.isFinite(config[field]) || config[field] < 0) {
      throw new RangeError(`${field} must be zero or greater`);
    }
  }
  const probabilityFields = [
    "connectivityLossProbability",
    "connectivityRecoveryProbability",
    "faultProbability",
    "faultRecoveryProbability",
    "assignmentChangeProbability",
  ] as const;
  for (const field of probabilityFields) {
    if (!Number.isFinite(config[field]) || config[field] < 0 || config[field] > 1) {
      throw new RangeError(`${field} must be between 0 and 1`);
    }
  }
  return { ...config, seed: String(config.seed) };
}

function iso(date: Date): string {
  if (Number.isNaN(date.getTime())) throw new RangeError("clock.now() must return a valid Date");
  return date.toISOString();
}

function statusFor(device: Pick<SimulatedDevice, "connectivity" | "health">): DeviceStatus {
  if (device.connectivity === "DISCONNECTED") return "OFFLINE";
  if (device.connectivity === "DEGRADED" || device.health === "FAULTED") return "DEGRADED";
  return "ONLINE";
}

function platformFor(unitId: string, index: number): SimulatedDevice["platform"] {
  const seededPlatform = /^DEV-(MK|EX)-/i.exec(unitId)?.[1]?.toUpperCase();
  if (seededPlatform === "MK" || seededPlatform === "EX") return seededPlatform;
  return PLATFORMS[index % PLATFORMS.length] ?? "MK";
}

export class DeviceSimulator {
  readonly config: ResolvedConfig;
  private readonly random: RandomSource;
  private readonly clock: SimulatorClock;
  private readonly runId: string;
  private generation = 1;
  private readonly devices: SimulatedDevice[];
  private previousTickAt: number | null = null;
  private counters: SimulatorCounters = {
    ticks: 0,
    telemetryGenerated: 0,
    operationalEventsGenerated: 0,
  };

  constructor(config: SimulatorConfig = {}, dependencies: { clock?: SimulatorClock; random?: RandomSource; runId?: string } = {}) {
    this.config = validateConfig(config);
    this.clock = dependencies.clock ?? { now: () => new Date() };
    this.random = dependencies.random ?? seededRandom(this.config.seed);
    iso(this.clock.now());
    this.runId = dependencies.runId ?? `run-${randomUUID()}`;
    this.devices = Array.from({ length: this.config.fleetSize }, (_, index) =>
      this.createDevice(index),
    );
  }

  getDevices(): SimulatedDevice[] {
    return this.devices.map((device) => ({ ...device }));
  }

  getRunId(): string {
    return this.runId;
  }

  setGeneration(generation: number): void {
    if (!Number.isSafeInteger(generation) || generation <= 0) throw new RangeError("generation must be a positive safe integer");
    this.generation = generation;
  }

  getCounters(): SimulatorCounters {
    return { ...this.counters };
  }

  tick(at: Date = this.clock.now()): SimulationTick | null {
    const atMs = at.getTime();
    if (Number.isNaN(atMs)) throw new RangeError("tick time must be a valid Date");
    if (this.previousTickAt !== null && atMs < this.previousTickAt) {
      throw new RangeError("tick time cannot move backwards");
    }
    if (this.previousTickAt !== null && atMs - this.previousTickAt < this.config.telemetryIntervalMs) {
      return null;
    }
    const firstTick = this.previousTickAt === null;
    const elapsedSeconds = this.previousTickAt === null ? 0 : (atMs - (this.previousTickAt ?? atMs)) / 1000;
    const occurredAt = new Date(atMs).toISOString();
    const events: OperationalEvent[] = [];
    const telemetry = this.devices.map((device) => {
      if (!firstTick) this.transition(device, elapsedSeconds, occurredAt, events);
      device.sequence += 1;
      device.lastTelemetryAt = occurredAt;
      return this.toTelemetry(device, occurredAt);
    });
    this.previousTickAt = atMs;
    this.counters.ticks += 1;
    this.counters.telemetryGenerated += telemetry.length;
    this.counters.operationalEventsGenerated += events.length;
    return { occurredAt, telemetry, events };
  }

  private createDevice(index: number): SimulatedDevice {
    const mixed = index % 8;
    const connectivity: ConnectivityState = mixed === 1 ? "DEGRADED" : mixed === 2 ? "DISCONNECTED" : "CONNECTED";
    const health: HealthState = mixed === 3 ? "FAULTED" : "HEALTHY";
    const charging: ChargingState = mixed === 4 ? "CHARGING" : "NOT_CHARGING";
    const availability: AvailabilityState = mixed === 5 ? "ASSIGNED" : "AVAILABLE";
    const batteryPct = mixed === 4 ? 38 : 45 + Math.floor(this.random.next() * 51);
    const device: SimulatedDevice = {
      unitId: this.config.deviceIds?.[index] ?? `SIM-${String(index + 1).padStart(4, "0")}`,
      platform: platformFor(this.config.deviceIds?.[index] ?? `SIM-${String(index + 1).padStart(4, "0")}`, index),
      role: ROLES[index % ROLES.length] ?? 'SCOUT',
      zone: ZONES[index % ZONES.length] ?? 'CHARLIE',
      status: "ONLINE",
      connectivity,
      health,
      availability,
      charging,
      assignmentId: availability === "ASSIGNED" ? `assignment-${String(index + 1).padStart(4, "0")}` : null,
      batteryPct,
      signalQuality: connectivity === "CONNECTED" ? 90 : connectivity === "DEGRADED" ? 55 : 0,
      faultCode: health === "FAULTED" ? (FAULT_CODES[index % FAULT_CODES.length] ?? null) : null,
      lastTelemetryAt: null,
      sequence: 0,
    };
    device.status = statusFor(device);
    if (device.charging === "CHARGING") device.availability = "AVAILABLE";
    return device;
  }

  private transition(device: SimulatedDevice, elapsedSeconds: number, occurredAt: string, events: OperationalEvent[]): void {
    const beforeConnectivity = device.connectivity;
    const beforeFault = device.health;
    const beforeAssignment = device.assignmentId;
    const beforeCharging = device.charging;
    if (device.charging === "CHARGING") {
      device.batteryPct = Math.min(100, device.batteryPct + this.config.batteryChargePerSecond * elapsedSeconds);
      if (device.batteryPct >= this.config.chargeCompleteThreshold) {
        device.charging = "NOT_CHARGING";
        events.push({ type: "charging.completed", deviceId: device.unitId, occurredAt, details: { batteryPct: device.batteryPct } });
      }
    } else {
      const drainMultiplier = device.availability === "ASSIGNED" ? 1.5 : 1;
      device.batteryPct = Math.max(0, device.batteryPct - this.config.batteryDrainPerSecond * elapsedSeconds * drainMultiplier);
      if (device.batteryPct <= this.config.lowBatteryThreshold && device.health === "HEALTHY") {
        device.charging = "CHARGING";
        device.availability = "AVAILABLE";
        device.assignmentId = null;
        events.push({ type: "charging.started", deviceId: device.unitId, occurredAt, details: { batteryPct: device.batteryPct } });
      }
    }
    if (device.connectivity === "DISCONNECTED") {
      if (this.random.next() < this.config.connectivityRecoveryProbability) device.connectivity = "CONNECTED";
    } else if (this.random.next() < this.config.connectivityLossProbability) {
      device.connectivity = "DISCONNECTED";
    } else if (device.connectivity === "DEGRADED" && this.random.next() < this.config.connectivityRecoveryProbability) {
      device.connectivity = "CONNECTED";
    }
    if (device.health === "FAULTED") {
      if (this.random.next() < this.config.faultRecoveryProbability) {
        device.health = "HEALTHY";
        device.faultCode = null;
      }
    } else if (this.random.next() < this.config.faultProbability) {
      device.health = "FAULTED";
      device.faultCode = FAULT_CODES[Math.floor(this.random.next() * FAULT_CODES.length)] ?? null;
    }
    if (device.charging !== "CHARGING" && device.health === "HEALTHY" && device.connectivity !== "DISCONNECTED" && this.random.next() < this.config.assignmentChangeProbability) {
      if (device.assignmentId) {
        events.push({ type: "assignment.completed", deviceId: device.unitId, occurredAt, details: { assignmentId: device.assignmentId } });
        device.assignmentId = null;
        device.availability = "AVAILABLE";
      } else {
        device.assignmentId = `assignment-${device.unitId}`;
        device.availability = "ASSIGNED";
      }
    }
    if (beforeConnectivity !== device.connectivity) events.push({ type: "connectivity.changed", deviceId: device.unitId, occurredAt, details: { from: beforeConnectivity, to: device.connectivity } });
    if (beforeFault !== device.health) events.push({ type: device.health === "FAULTED" ? "fault.opened" : "fault.cleared", deviceId: device.unitId, occurredAt, details: { faultCode: device.faultCode } });
    if (beforeAssignment !== device.assignmentId) events.push({ type: "assignment.changed", deviceId: device.unitId, occurredAt, details: { from: beforeAssignment, to: device.assignmentId } });
    if (beforeCharging !== device.charging && !events.some((event) => event.deviceId === device.unitId && event.type === (device.charging === "CHARGING" ? "charging.started" : "charging.completed"))) {
      events.push({ type: device.charging === "CHARGING" ? "charging.started" : "charging.completed", deviceId: device.unitId, occurredAt, details: { batteryPct: device.batteryPct } });
    }
    device.signalQuality = device.connectivity === "CONNECTED" ? 90 : device.connectivity === "DEGRADED" ? 55 : 0;
    device.status = statusFor(device);
  }

  private toTelemetry(device: SimulatedDevice, occurredAt: string): TelemetryEnvelope {
    return {
      schemaVersion: 1,
      messageId: `${this.runId}/${device.unitId}/${String(device.sequence).padStart(6, "0")}`,
      deviceId: device.unitId,
      deviceType: device.platform,
      sequence: device.sequence,
      occurredAt,
      measurements: {
        batteryPct: Number(device.batteryPct.toFixed(3)),
        signalQuality: device.signalQuality,
        connectivity: device.connectivity,
        health: device.health,
        availability: device.availability,
        charging: device.charging,
        status: device.status,
        assignmentId: device.assignmentId,
        faultCode: device.faultCode,
      },
      simulator: { seed: this.config.seed, runId: this.runId, generation: this.generation },
    };
  }
}

export function createDeviceSimulator(config?: SimulatorConfig, dependencies?: { clock?: SimulatorClock; random?: RandomSource; runId?: string }): DeviceSimulator {
  return new DeviceSimulator(config, dependencies);
}

