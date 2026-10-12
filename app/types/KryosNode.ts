import { isPlatform, type Platform } from "./Platform";
import { isRole, type Role } from "./Role";
import { isStatus, type Status } from "./Status";
import { isZone, type Zone } from "./Zone";
import { isLinkStatus, type LinkStatus } from "./LinkState";

/** Fleet read model matching the persisted Prisma Device fields. */
export type KryosNode = {
  unitId: string;
  platform: Platform;
  status: Status;
  zone: Zone;
  linkStatus: LinkStatus;
  role: Role;
  powerPct: number;
  signalQuality: number;
  lastPingAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isKryosNode(value: unknown): value is KryosNode {
  if (!isRecord(value)) return false;

  return (
    typeof value.unitId === "string" &&
    isPlatform(value.platform) &&
    isStatus(value.status) &&
    isZone(value.zone) &&
    isLinkStatus(value.linkStatus) &&
    isRole(value.role) &&
    typeof value.powerPct === "number" &&
    Number.isInteger(value.powerPct) &&
    value.powerPct >= 0 &&
    value.powerPct <= 100 &&
    typeof value.signalQuality === "number" &&
    Number.isInteger(value.signalQuality) &&
    value.signalQuality >= 0 &&
    value.signalQuality <= 100 &&
    typeof value.lastPingAt === "string" &&
    Number.isFinite(Date.parse(value.lastPingAt))
  );
}

export function isKryosNodeArray(value: unknown): value is KryosNode[] {
  if (!Array.isArray(value)) return false;

  const unitIds = new Set<string>();
  return value.every((node) => {
    if (!isKryosNode(node) || unitIds.has(node.unitId)) return false;
    unitIds.add(node.unitId);
    return true;
  });
}
