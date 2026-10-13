export const FLEET_PAGE_SIZES = [5, 25, 50, 100] as const;

export type FleetPageSize = (typeof FLEET_PAGE_SIZES)[number];

export const DEFAULT_FLEET_PAGE_SIZE: FleetPageSize = 25;
