import { describe, expect, it } from "vitest";
import { getFleetDashboardSummary } from "../app/utils/fleetDashboard";
import type { KryosNode } from "../app/types/KryosNode";

const device = (overrides: Partial<KryosNode> = {}): KryosNode => ({
  unitId: "MK-I-001",
  platform: "MK-I",
  status: "ONLINE",
  zone: "ALPHA",
  linkStatus: "STABLE",
  role: "SCOUT",
  powerPct: 80,
  signalQuality: 90,
  lastPingAt: "2026-10-14T12:00:00.000Z",
  ...overrides,
});

describe("fleet dashboard summary", () => {
  it("derives page-level attention and average power values", () => {
    expect(getFleetDashboardSummary([
      device(),
      device({ unitId: "MK-I-002", status: "DEGRADED", powerPct: 40 }),
    ])).toEqual({ attentionCount: 1, averagePower: 60 });
  });

  it("does not invent metrics for an empty page", () => {
    expect(getFleetDashboardSummary([])).toEqual({ attentionCount: 0, averagePower: null });
  });
});
