import type { LinkState } from "./LinkState";
import type { Platform } from "./Platform";
import type { Role } from "./Role";
import type { Status } from "./Status";
import type { Zone } from "./Zone";

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
