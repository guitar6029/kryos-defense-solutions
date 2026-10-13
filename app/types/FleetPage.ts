import type { KryosNode } from "./KryosNode";
import type { FleetPageSize } from "../constants/fleet";
import type { LinkStatus } from "./LinkState";
import type { Platform } from "./Platform";
import type { Role } from "./Role";
import type { Status } from "./Status";
import type { Zone } from "./Zone";

export type { FleetPageSize } from "../constants/fleet";

export type FleetSearchCriteria = {
  search?: string;
  status?: Status;
  platform?: Platform;
  zone?: Zone;
  role?: Role;
  linkStatus?: LinkStatus;
};

export type FleetPageResponse = {
  devices: KryosNode[];
  total: number;
  page: number;
  pageSize: FleetPageSize;
};
