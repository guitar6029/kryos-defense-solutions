import { describe, expect, it } from "vitest";
import fixture from "../db.json";
import { isKryosNode, isKryosNodeArray } from "../app/types/KryosNode";
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
    expect(fixture.fleet.every(isKryosNode)).toBe(true);
    expect(isKryosNodeArray(fixture.fleet)).toBe(true);
  });

  it("rejects missing required device properties", () => {
    const validNode = fixture.fleet[0]!;
    const requiredProperties = [
      "unitId",
      "platform",
      "status",
      "zone",
      "powerPct",
      "link",
      "lastPingmsAgo",
      "role",
    ] as const;

    for (const property of requiredProperties) {
      const node = { ...validNode };
      delete (node as Record<string, unknown>)[property];
      expect(isKryosNode(node)).toBe(false);
    }
  });

  it("rejects invalid field types and enum-like values", () => {
    const validNode = fixture.fleet[0]!;
    const invalidNodes = [
      { ...validNode, unitId: 42 },
      { ...validNode, platform: "UNKNOWN" },
      { ...validNode, status: "QUEUED" },
      { ...validNode, zone: "UNKNOWN" },
      { ...validNode, powerPct: "82" },
      { ...validNode, powerPct: 82.5 },
      { ...validNode, powerPct: Number.POSITIVE_INFINITY },
      { ...validNode, powerPct: 101 },
      { ...validNode, lastPingmsAgo: "120" },
      { ...validNode, lastPingmsAgo: 120.5 },
      { ...validNode, lastPingmsAgo: Number.NaN },
      { ...validNode, lastPingmsAgo: -1 },
      { ...validNode, role: "UNKNOWN" },
    ];

    for (const node of invalidNodes) expect(isKryosNode(node)).toBe(false);
  });

  it("rejects malformed nested link data", () => {
    const validNode = fixture.fleet[0]!;
    const invalidNodes = [
      { ...validNode, link: null },
      { ...validNode, link: {} },
      { ...validNode, link: { status: "STABLE" } },
      { ...validNode, link: { signalQuality: 92 } },
      { ...validNode, link: { status: "UNKNOWN", signalQuality: 92 } },
      { ...validNode, link: { status: "STABLE", signalQuality: "92" } },
      { ...validNode, link: { status: "STABLE", signalQuality: 92.5 } },
      {
        ...validNode,
        link: { status: "STABLE", signalQuality: Number.POSITIVE_INFINITY },
      },
      { ...validNode, link: { status: "STABLE", signalQuality: 101 } },
    ];

    for (const node of invalidNodes) expect(isKryosNode(node)).toBe(false);
  });

  it("rejects duplicate device identities in fleet responses", () => {
    const [first] = fixture.fleet;
    expect(isKryosNodeArray([first, first])).toBe(false);
    expect(isKryosNodeArray({ fleet: fixture.fleet })).toBe(false);
  });
});
