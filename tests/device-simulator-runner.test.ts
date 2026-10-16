import { describe, expect, it } from "vitest";
import { createDeviceSimulator, type SimulationTick } from "../server/simulator";
import { DeviceSimulatorRunner, parseSimulatorRunnerConfig, type SimulatorRunnerTimer } from "../server/simulator/runner";

function makeTimer() {
  let nextId = 0;
  const callbacks = new Map<number, () => void>();
  const timer: SimulatorRunnerTimer = {
    setTimeout: (callback) => {
      const id = ++nextId;
      callbacks.set(id, callback);
      return id;
    },
    clearTimeout: (handle) => {
      if (typeof handle === "number") callbacks.delete(handle);
    },
  };
  return {
    timer,
    runNext: () => {
      const next = callbacks.entries().next();
      if (next.done) return;
      callbacks.delete(next.value[0]);
      next.value[1]();
    },
    pending: () => callbacks.size,
  };
}

describe("device simulator runner", () => {
  it("parses defaults and validates environment configuration", () => {
    expect(parseSimulatorRunnerConfig()).toEqual({ fleetSize: 500, telemetryIntervalMs: 5000, seed: 1 });
    expect(parseSimulatorRunnerConfig({ SIMULATOR_FLEET_SIZE: "12", SIMULATOR_TELEMETRY_INTERVAL_MS: "250", SIMULATOR_SEED: "test" })).toEqual({
      fleetSize: 12,
      telemetryIntervalMs: 250,
      seed: "test",
    });
    expect(parseSimulatorRunnerConfig({ SIMULATOR_TARGET_DEVICE_IDS: " DEV-MK-01, DEV-EX-01 " })).toEqual({
      fleetSize: 2,
      telemetryIntervalMs: 5000,
      seed: 1,
      targetDeviceIds: ["DEV-MK-01", "DEV-EX-01"],
    });
    expect(() => parseSimulatorRunnerConfig({ SIMULATOR_FLEET_SIZE: "0" })).toThrow(/SIMULATOR_FLEET_SIZE/);
    expect(() => parseSimulatorRunnerConfig({ SIMULATOR_TELEMETRY_INTERVAL_MS: "1.5" })).toThrow(/SIMULATOR_TELEMETRY_INTERVAL_MS/);
    expect(() => parseSimulatorRunnerConfig({ SIMULATOR_FLEET_SIZE: "100001" })).toThrow(/too large/);
    expect(() => parseSimulatorRunnerConfig({ SIMULATOR_TARGET_DEVICE_IDS: "DEV-MK-01,,DEV-EX-01" })).toThrow(/SIMULATOR_TARGET_DEVICE_IDS/);
  });

  it("starts, processes aggregate batches, and stops without scheduling more ticks", async () => {
    const clock = { time: 0, now() { return new Date(this.time); } };
    const timer = makeTimer();
    const output: string[] = [];
    const processed: SimulationTick[] = [];
    const runner = new DeviceSimulatorRunner(
      { fleetSize: 2, telemetryIntervalMs: 1000, seed: 1 },
      {
        simulator: createDeviceSimulator({ fleetSize: 2, telemetryIntervalMs: 1000, seed: 1 }, { clock }),
        timer: timer.timer,
        output: (message) => output.push(message),
        now: () => clock.now(),
        processTick: (tick) => { processed.push(tick); },
      },
    );
    await runner.start();
    expect(timer.pending()).toBe(1);
    timer.runNext();
    await Promise.resolve();
    expect(processed[0]?.telemetry).toHaveLength(2);
    expect(output[1]).toContain("interval telemetry=2");
    expect(output[1]).toContain("cumulative telemetry=2");
    await runner.stop();
    expect(timer.pending()).toBe(0);
  });

  it("waits for a current tick and never overlaps processing", async () => {
    const timer = makeTimer();
    let resolveProcessing: (() => void) | undefined;
    let active = 0;
    let maximumActive = 0;
    const runner = new DeviceSimulatorRunner(
      { fleetSize: 1, telemetryIntervalMs: 1000, seed: 1 },
      {
        timer: timer.timer,
        processTick: async () => {
          active += 1;
          maximumActive = Math.max(maximumActive, active);
          await new Promise<void>((resolve) => { resolveProcessing = resolve; });
          active -= 1;
        },
      },
    );
    await runner.start();
    timer.runNext();
    timer.runNext();
    expect(maximumActive).toBe(1);
    const stopping = runner.stop();
    let stopped = false;
    void stopping.then(() => { stopped = true; });
    await Promise.resolve();
    expect(stopped).toBe(false);
    if (!resolveProcessing) throw new Error("processing promise was not created");
    resolveProcessing();
    await stopping;
    expect(stopped).toBe(true);
    expect(timer.pending()).toBe(0);
  });

  it("uses unique run identities by default and accepts deterministic run identities", () => {
    const first = createDeviceSimulator({ fleetSize: 1, seed: 1 }).tick();
    const second = createDeviceSimulator({ fleetSize: 1, seed: 1 }).tick();
    expect(first?.telemetry[0]?.simulator.runId).not.toBe(second?.telemetry[0]?.simulator.runId);
    const deterministic = createDeviceSimulator({ fleetSize: 1, seed: 1 }, { runId: "test-run" }).tick();
    expect(deterministic?.telemetry[0]?.simulator.runId).toBe("test-run");
  });

  it("registers before producing telemetry and stops the registered run", async () => {
    const timer = makeTimer();
    const clock = { now: () => new Date("2026-10-15T12:00:00.000Z") };
    const calls: string[] = [];
    let emittedGeneration = 0;
    const runner = new DeviceSimulatorRunner(
      { fleetSize: 2, telemetryIntervalMs: 1000, seed: 1 },
      {
        simulator: createDeviceSimulator({ fleetSize: 2, telemetryIntervalMs: 1000, seed: 1 }, { clock, runId: "registered-run" }),
        timer: timer.timer,
        registerRun: async (runId, targetIds) => {
          calls.push(`register:${runId}:${targetIds.join(",")}`);
          return 27;
        },
        processTick: (tick) => { emittedGeneration = tick.telemetry[0]?.simulator.generation ?? 0; },
        stopRun: async (runId) => { calls.push(`stop:${runId}`); },
      },
    );
    await runner.start();
    timer.runNext();
    await Promise.resolve();
    expect(calls[0]).toBe("register:registered-run:SIM-0001,SIM-0002");
    expect(emittedGeneration).toBe(27);
    await runner.stop();
    expect(calls.at(-1)).toBe("stop:registered-run");
  });

  it("registers explicitly configured inventory identities", async () => {
    const config = parseSimulatorRunnerConfig({ SIMULATOR_TARGET_DEVICE_IDS: "DEV-MK-01,DEV-EX-01" });
    const timer = makeTimer();
    let registeredIds: string[] = [];
    const runner = new DeviceSimulatorRunner(config, {
      timer: timer.timer,
      registerRun: async (_runId, targetIds) => {
        registeredIds = targetIds;
        return 1;
      },
    });

    await runner.start();
    expect(registeredIds).toEqual(["DEV-MK-01", "DEV-EX-01"]);
    await runner.stop();
  });
});
