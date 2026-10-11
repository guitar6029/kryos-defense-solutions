import { isLinkState, type LinkState } from "./LinkState";
import { isPlatform, type Platform } from "./Platform";
import { isRole, type Role } from "./Role";
import { isStatus, type Status } from "./Status";
import { isZone, type Zone } from "./Zone";

export type KryosNode = {
  unitId: string;
  platform: Platform;
  status: Status;
  zone: Zone;
  powerPct: number;
  link: LinkState;
  lastPingmsAgo: number;
  role: Role;
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
    typeof value.powerPct === "number" &&
    Number.isFinite(value.powerPct) &&
    Number.isInteger(value.powerPct) &&
    value.powerPct >= 0 &&
    value.powerPct <= 100 &&
    isLinkState(value.link) &&
    typeof value.lastPingmsAgo === "number" &&
    Number.isFinite(value.lastPingmsAgo) &&
    Number.isInteger(value.lastPingmsAgo) &&
    value.lastPingmsAgo >= 0 &&
    isRole(value.role)
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
