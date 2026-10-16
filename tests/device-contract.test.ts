import { describe, expect, it } from "vitest";
import type { Device } from "../generated/prisma/client.js";
import { isKryosNode, isKryosNodeArray } from "../app/types/KryosNode";
import { DEVICE_STATUSES, isStatus } from "../app/types/Status";
import { toFleetResponse } from "../server/utils/fleet-response";

const device: Device = {
  unitId: "MK-1A",
  platform: "MK",
  status: "ONLINE",
  zone: "ALPHA",
  powerPct: 82,
  linkStatus: "STABLE",
  signalQuality: 92,
  lastPingAt: new Date("2026-10-10T12:00:00.123Z"),
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
};

describe("persisted device contract", () => {
  it("accepts only the device statuses declared by the Prisma migration", () => {
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

  it("maps every Device field explicitly and preserves lastPingAt as ISO time", () => {
    const response = toFleetResponse(device);

    expect(response).toEqual({
      unitId: "MK-1A",
      platform: "MK",
      status: "ONLINE",
      zone: "ALPHA",
      linkStatus: "STABLE",
      role: "SCOUT",
      powerPct: 82,
      signalQuality: 92,
      lastPingAt: "2026-10-10T12:00:00.123Z",
    });
    expect(isKryosNode(response)).toBe(true);
    expect(isKryosNodeArray([response])).toBe(true);
  });

  it("rejects values that do not match the persisted fleet contract", () => {
    const response = toFleetResponse(device);

    expect(isKryosNode({ ...response, status: "QUEUED" })).toBe(false);
    expect(isKryosNode({ ...response, signalQuality: 101 })).toBe(false);
    expect(isKryosNode({ ...response, lastPingAt: "not-a-date" })).toBe(false);
    expect(isKryosNodeArray([response, response])).toBe(false);
  });
});
