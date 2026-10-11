import { describe, expect, it } from "vitest";
import fixture from "../db.json";
import { DEVICE_STATUSES, isStatus } from "../app/types/Status";

describe("persisted device contract", () => {
  it("accepts only the device statuses declared by the persistence contract", () => {
    expect(DEVICE_STATUSES).toEqual([
      "ONLINE",
      "OFFLINE",
      "MAINTENANCE",
      "DEGRADED",
    ]);
    for (const status of DEVICE_STATUSES) expect(isStatus(status)).toBe(true);
    for (const status of ["QUEUED", "SENDING", "ACKED", "FAILED", "CANCELED"])
      expect(isStatus(status)).toBe(false);
  });

  it("keeps every fixture device compatible with persisted fields", () => {
    expect(fixture.fleet.length).toBeGreaterThan(0);
    expect(new Set(fixture.fleet.map((device) => device.unitId)).size).toBe(
      fixture.fleet.length,
    );
    for (const device of fixture.fleet) {
      expect(isStatus(device.status)).toBe(true);
      expect(device.unitId).toEqual(expect.any(String));
      expect(["MK", "EX"]).toContain(device.platform);
      expect(["ALPHA", "BRAVO", "CHARLIE", "DELTA"]).toContain(device.zone);
      expect(["SCOUT", "SUPPORT", "GUARD", "HAUL"]).toContain(device.role);
      expect(device.link).toEqual({
        status: expect.stringMatching(/^(STABLE|WEAK|LOST)$/),
        signalQuality: expect.any(Number),
      });
      expect(device.powerPct).toBeGreaterThanOrEqual(0);
      expect(device.powerPct).toBeLessThanOrEqual(100);
      expect(device.link.signalQuality).toBeGreaterThanOrEqual(0);
      expect(device.link.signalQuality).toBeLessThanOrEqual(100);
      expect(device.lastPingmsAgo).toBeGreaterThanOrEqual(0);
    }
  });
});
