import type { KryosNode } from "~/types/KryosNode";

export function getFleetDashboardSummary(devices: KryosNode[]) {
  return {
    attentionCount: devices.filter((device) => device.status !== "ONLINE").length,
    averagePower: devices.length
      ? Math.round(devices.reduce((total, device) => total + device.powerPct, 0) / devices.length)
      : null,
  };
}
