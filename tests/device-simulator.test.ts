import { describe, expect, it } from "vitest";
import { createDeviceSimulator, DEFAULT_SIMULATOR_CONFIG, type SimulatorClock } from "../server/simulator";

function makeClock(start = "2026-10-14T12:00:00.000Z"): SimulatorClock & { advance: (ms: number) => void } {
  let time = new Date(start).getTime();
  return { now: () => new Date(time), advance: (ms) => { time += ms; } };
}

describe("device simulator kernel", () => {
  it("uses the documented defaults and accepts a configurable fleet size", () => {
    expect(DEFAULT_SIMULATOR_CONFIG.fleetSize).toBe(500);
    expect(DEFAULT_SIMULATOR_CONFIG.telemetryIntervalMs).toBe(5000);
    expect(createDeviceSimulator({ fleetSize: 3 }).getDevices()).toHaveLength(3);
  });

  it("creates stable identities and reproducible initial profiles", () => {
    const first = createDeviceSimulator({ fleetSize: 12, seed: 12345 }).getDevices();
    const second = createDeviceSimulator({ fleetSize: 12, seed: 12345 }).getDevices();
    expect(first).toEqual(second);
    expect(first.map((device) => device.unitId)).toEqual([
      "SIM-0001", "SIM-0002", "SIM-0003", "SIM-0004", "SIM-0005", "SIM-0006",
      "SIM-0007", "SIM-0008", "SIM-0009", "SIM-0010", "SIM-0011", "SIM-0012",
    ]);
  });

  it("supports explicit target identities for an existing inventory", () => {
    const simulator = createDeviceSimulator({ fleetSize: 3, deviceIds: ["DEV-MK-01", "DEV-MK-02", "DEV-EX-01"] });
    expect(simulator.getDevices().map(({ unitId }) => unitId)).toEqual(["DEV-MK-01", "DEV-MK-02", "DEV-EX-01"]);
    expect(simulator.getDevices().map(({ platform }) => platform)).toEqual(["MK", "MK", "EX"]);
  });

  it("starts with mixed operational dimensions", () => {
    const devices = createDeviceSimulator({ fleetSize: 500 }).getDevices();
    expect(new Set(devices.map((device) => device.connectivity)).size).toBeGreaterThan(1);
    expect(new Set(devices.map((device) => device.health)).size).toBeGreaterThan(1);
    expect(new Set(devices.map((device) => device.availability)).size).toBeGreaterThan(1);
    expect(new Set(devices.map((device) => device.charging)).size).toBeGreaterThan(1);
  });

  it("generates one batched telemetry sample per device at the interval", () => {
    const clock = makeClock();
    const simulator = createDeviceSimulator({ fleetSize: 4, seed: 4 }, { clock });
    const first = simulator.tick();
    expect(first?.telemetry).toHaveLength(4);
    expect(simulator.tick()).toBeNull();
    clock.advance(5000);
    expect(simulator.tick()?.telemetry).toHaveLength(4);
    expect(simulator.getCounters()).toMatchObject({ ticks: 2, telemetryGenerated: 8 });
  });

  it("drains assigned devices and transitions low battery devices into charging", () => {
    const clock = makeClock();
    const simulator = createDeviceSimulator({ fleetSize: 1, seed: 2, batteryDrainPerSecond: 20, lowBatteryThreshold: 25 }, { clock });
    const device = simulator.getDevices()[0];
    expect(device.batteryPct).toBeGreaterThan(25);
    simulator.tick();
    clock.advance(5000);
    const tick = simulator.tick();
    expect(tick?.events.some((event) => event.type === "charging.started")).toBe(true);
    expect(simulator.getDevices()[0].charging).toBe("CHARGING");
  });

  it("does not start charging a device that faults at low battery", () => {
    const clock = makeClock();
    const simulator = createDeviceSimulator({
      fleetSize: 1,
      seed: 2,
      batteryDrainPerSecond: 20,
      lowBatteryThreshold: 25,
      faultProbability: 1,
      faultRecoveryProbability: 0,
    }, { clock });
    simulator.tick();
    clock.advance(5000);
    const tick = simulator.tick();
    const device = simulator.getDevices()[0];

    expect(tick?.events.map((event) => event.type)).toEqual(expect.arrayContaining(["fault.opened"]));
    expect(tick?.events.some((event) => event.type === "charging.started")).toBe(false);
    expect(device).toMatchObject({ health: "FAULTED", charging: "NOT_CHARGING" });
  });

  it("stops charging and clears assignment when a charging device faults", () => {
    const clock = makeClock();
    const simulator = createDeviceSimulator({
      fleetSize: 5,
      faultProbability: 1,
      faultRecoveryProbability: 0,
    }, { clock });
    simulator.tick();
    expect(simulator.getDevices()[4]).toMatchObject({ charging: "CHARGING", availability: "AVAILABLE", assignmentId: null });

    clock.advance(5000);
    const tick = simulator.tick();
    const device = simulator.getDevices()[4];

    expect(tick?.events.map((event) => event.type)).toEqual(expect.arrayContaining(["fault.opened", "charging.stopped"]));
    expect(device).toMatchObject({ health: "FAULTED", charging: "NOT_CHARGING", availability: "AVAILABLE", assignmentId: null });
  });

  it("supports deterministic connectivity and fault transitions", () => {
    const clock = makeClock();
    const simulator = createDeviceSimulator({ fleetSize: 1, seed: 3, connectivityLossProbability: 1, faultProbability: 1 }, { clock });
    simulator.tick();
    clock.advance(5000);
    const tick = simulator.tick();
    expect(tick?.events.map((event) => event.type)).toEqual(expect.arrayContaining(["connectivity.changed", "fault.opened"]));
    expect(simulator.getDevices()[0]).toMatchObject({ connectivity: "DISCONNECTED", health: "FAULTED", status: "OFFLINE" });
  });

  it("is reproducible with a fixed seed and simulated clock", () => {
    const run = () => {
      const clock = makeClock();
      const simulator = createDeviceSimulator({ fleetSize: 8, seed: 99 }, { clock, runId: "deterministic-test-run" });
      const ticks = [simulator.tick()];
      clock.advance(5000);
      ticks.push(simulator.tick());
      return { ticks, counters: simulator.getCounters(), devices: simulator.getDevices() };
    };
    expect(run()).toEqual(run());
  });

  it("counts telemetry and operational events without counting skipped ticks", () => {
    const clock = makeClock();
    const simulator = createDeviceSimulator({ fleetSize: 2, seed: 7, connectivityLossProbability: 1 }, { clock });
    simulator.tick();
    clock.advance(5000);
    const tick = simulator.tick();
    expect(simulator.getCounters()).toEqual({ ticks: 2, telemetryGenerated: 4, operationalEventsGenerated: tick?.events.length });
  });

  it("rejects invalid configuration and time boundaries", () => {
    expect(() => createDeviceSimulator({ fleetSize: 0 })).toThrow(/fleetSize/);
    expect(() => createDeviceSimulator({ fleetSize: 1.5 })).toThrow(/fleetSize/);
    expect(() => createDeviceSimulator({ telemetryIntervalMs: 0 })).toThrow(/telemetryIntervalMs/);
    expect(() => createDeviceSimulator({ faultProbability: 2 })).toThrow(/faultProbability/);
    expect(() => createDeviceSimulator({ lowBatteryThreshold: 90, chargeCompleteThreshold: 90 })).toThrow(/lowBatteryThreshold/);
    const simulator = createDeviceSimulator({ fleetSize: 1 });
    expect(() => simulator.tick(new Date("invalid"))).toThrow(/valid Date/);
    const clock = makeClock();
    const ordered = createDeviceSimulator({ fleetSize: 1 }, { clock });
    ordered.tick();
    expect(() => ordered.tick(new Date("2026-10-14T11:59:59.000Z"))).toThrow(/backwards/);
  });
});
