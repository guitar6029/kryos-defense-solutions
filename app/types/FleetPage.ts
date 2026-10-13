import type { KryosNode } from "./KryosNode";

export type FleetPageSize = 5 | 25 | 50 | 100;

export type FleetPageResponse = {
  devices: KryosNode[];
  total: number;
  page: number;
  pageSize: FleetPageSize;
};
