import { createDeviceSimulator, DEFAULT_SIMULATOR_CONFIG, type DeviceSimulator, type SimulationTick, type SimulatorConfig } from "./device-simulator";

export type SimulatorRunnerEnvironment = Record<string, string | undefined>;

export type SimulatorRunnerConfig = {
  fleetSize: number;
  telemetryIntervalMs: number;
  seed: number | string;
  targetDeviceIds?: string[];
};

export type SimulatorRunnerOutput = (message: string) => void;

export type SimulatorTimerHandle = ReturnType<typeof setTimeout> | number;

export type SimulatorRunnerTimer = {
  setTimeout: (callback: () => void, delayMs: number) => SimulatorTimerHandle;
  clearTimeout: (handle: SimulatorTimerHandle) => void;
};

export type SimulatorRunnerOptions = {
  simulator?: DeviceSimulator;
  processTick?: (tick: SimulationTick) => void | Promise<void>;
  output?: SimulatorRunnerOutput;
  timer?: SimulatorRunnerTimer;
  now?: () => Date;
  runId?: string;
  registerRun?: (runId: string, targetDeviceIds: string[]) => Promise<number>;
  stopRun?: (runId: string) => Promise<void>;
};

const defaultTimer: SimulatorRunnerTimer = {
  setTimeout: (callback, delayMs) => setTimeout(callback, delayMs),
  clearTimeout: (handle) => clearTimeout(handle),
};

function parsePositiveInteger(name: string, value: string | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value) || Number(value) <= 0 || !Number.isSafeInteger(Number(value))) {
    throw new RangeError(`${name} must be a positive integer`);
  }
  return Number(value);
}

function parseTargetDeviceIds(value: string | undefined): string[] | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const targetDeviceIds = value.split(",").map((id) => id.trim());
  if (targetDeviceIds.some((id) => !id)) throw new RangeError("SIMULATOR_TARGET_DEVICE_IDS must be a comma-separated list of non-empty device IDs");
  if (new Set(targetDeviceIds).size !== targetDeviceIds.length) throw new RangeError("SIMULATOR_TARGET_DEVICE_IDS must not contain duplicates");
  return targetDeviceIds;
}

export function parseSimulatorRunnerConfig(env: SimulatorRunnerEnvironment = process.env): SimulatorRunnerConfig {
  const fleetSize = parsePositiveInteger(
    "SIMULATOR_FLEET_SIZE",
    env.SIMULATOR_FLEET_SIZE,
    DEFAULT_SIMULATOR_CONFIG.fleetSize,
  );
  const telemetryIntervalMs = parsePositiveInteger(
    "SIMULATOR_TELEMETRY_INTERVAL_MS",
    env.SIMULATOR_TELEMETRY_INTERVAL_MS,
    DEFAULT_SIMULATOR_CONFIG.telemetryIntervalMs,
  );
  const seed = env.SIMULATOR_SEED ?? DEFAULT_SIMULATOR_CONFIG.seed;
  const targetDeviceIds = parseTargetDeviceIds(env.SIMULATOR_TARGET_DEVICE_IDS);
  const resolvedFleetSize = targetDeviceIds?.length ?? fleetSize;

  try {
    createDeviceSimulator({ fleetSize: resolvedFleetSize, telemetryIntervalMs, seed, deviceIds: targetDeviceIds });
  } catch (error) {
    throw new RangeError(`Invalid simulator configuration: ${error instanceof Error ? error.message : String(error)}`);
  }

  return {
    fleetSize: resolvedFleetSize,
    telemetryIntervalMs,
    seed,
    ...(targetDeviceIds ? { targetDeviceIds } : {}),
  };
}

export class DeviceSimulatorRunner {
  readonly config: SimulatorRunnerConfig;
  private readonly simulator: DeviceSimulator;
  private readonly processTick: (tick: SimulationTick) => void | Promise<void>;
  private readonly output: SimulatorRunnerOutput;
  private readonly timer: SimulatorRunnerTimer;
  private readonly now: () => Date;
  private readonly registerRun?: SimulatorRunnerOptions["registerRun"];
  private readonly stopRun?: SimulatorRunnerOptions["stopRun"];
  private starting: Promise<void> | null = null;
  private scheduledHandle: SimulatorTimerHandle | null = null;
  private currentTick: Promise<void> | null = null;
  private started = false;
  private stopping = false;

  constructor(config: SimulatorRunnerConfig, options: SimulatorRunnerOptions = {}) {
    this.config = config;
    this.simulator = options.simulator ?? createDeviceSimulator({
      fleetSize: config.fleetSize,
      telemetryIntervalMs: config.telemetryIntervalMs,
      seed: config.seed,
      deviceIds: config.targetDeviceIds,
    }, { runId: options.runId });
    this.processTick = options.processTick ?? (() => undefined);
    this.output = options.output ?? console.log;
    this.timer = options.timer ?? defaultTimer;
    this.now = options.now ?? (() => new Date());
    this.registerRun = options.registerRun;
    this.stopRun = options.stopRun;
  }

  async start(): Promise<void> {
    if (this.started) throw new Error("simulator runner has already started");
    this.started = true;
    this.starting = this.registerAndSchedule();
    try {
      await this.starting;
    } catch (error) {
      this.started = false;
      throw error;
    } finally {
      this.starting = null;
    }
  }

  private async registerAndSchedule(): Promise<void> {
    if (this.registerRun) {
      const generation = await this.registerRun(
        this.simulator.getRunId(),
        this.simulator.getDevices().map(({ unitId }) => unitId),
      );
      this.simulator.setGeneration(generation);
    }
    if (this.stopping) return;
    this.output(
      `[simulator] started fleet=${this.config.fleetSize} interval=${this.config.telemetryIntervalMs}ms seed=${this.config.seed}`,
    );
    this.schedule(0);
  }

  async stop(): Promise<void> {
    if (!this.started || this.stopping) {
      if (this.currentTick) await this.currentTick;
      return;
    }
    this.stopping = true;
    const starting = this.starting;
    if (starting) {
      try {
        await starting;
      } catch {
        // Registration may have committed before a response failure; stop is idempotent.
      }
    }
    const scheduledHandle = this.scheduledHandle;
    if (scheduledHandle !== null) {
      this.timer.clearTimeout(scheduledHandle);
      this.scheduledHandle = null;
    }
    const currentTick = this.currentTick;
    try {
      if (currentTick) await currentTick;
    } finally {
      if (this.stopRun) await this.stopRun(this.simulator.getRunId());
    }
    this.output("[simulator] stopped");
  }

  private schedule(delayMs: number): void {
    if (this.stopping) return;
    this.scheduledHandle = this.timer.setTimeout(() => {
      this.scheduledHandle = null;
      this.runTick();
    }, delayMs);
  }

  private runTick(): void {
    if (this.stopping || this.currentTick) return;
    const tick = this.simulator.tick(this.now());
    if (!tick) {
      this.schedule(this.config.telemetryIntervalMs);
      return;
    }
    const counters = this.simulator.getCounters();
    this.currentTick = Promise.resolve(this.processTick(tick)).then(() => {
      const telemetryRate = tick.telemetry.length / (this.config.telemetryIntervalMs / 1000);
      const eventRate = tick.events.length / (this.config.telemetryIntervalMs / 1000);
      this.output(
        `[simulator] tick=${counters.ticks} interval telemetry=${tick.telemetry.length} events=${tick.events.length} ` +
          `rates telemetry=${telemetryRate.toFixed(2)}/s events=${eventRate.toFixed(2)}/s ` +
          `cumulative telemetry=${counters.telemetryGenerated} events=${counters.operationalEventsGenerated}`,
      );
    }, (error: unknown) => {
      this.output(`[simulator] tick processing failed: ${error instanceof Error ? error.message : "unknown error"}`);
    }).finally(() => {
      this.currentTick = null;
      this.schedule(this.config.telemetryIntervalMs);
    });
  }
}
