import type { Device } from "../../generated/prisma/client.js";
import { isKryosNode, type KryosNode } from "../../app/types/KryosNode";

/** Explicit API mapping: Prisma fields are preserved; Date becomes ISO 8601. */
export function toFleetResponse(device: Device): KryosNode {
  const response = {
    unitId: device.unitId,
    platform: device.platform,
    status: device.status,
    zone: device.zone,
    linkStatus: device.linkStatus,
    role: device.role,
    powerPct: device.powerPct,
    signalQuality: device.signalQuality,
    lastPingAt: device.lastPingAt.toISOString(),
  };

  if (!isKryosNode(response)) {
    throw new TypeError("A persisted device does not match the fleet API contract.");
  }

  return response;
}
