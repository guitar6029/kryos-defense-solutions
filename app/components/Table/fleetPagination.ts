import type { FleetPageSize } from "~/types/FleetPage";

export const FLEET_PAGE_SIZES: FleetPageSize[] = [5, 25, 50, 100];

export function getFleetTotalPages(total: number, pageSize: FleetPageSize): number {
  return Math.ceil(total / pageSize);
}

export function shouldDisablePrevious(page: number): boolean {
  return page <= 0;
}

export function shouldDisableNext(page: number, totalPages: number): boolean {
  return totalPages === 0 || page >= totalPages - 1;
}

export function getPageSizeChange(page: number, pageSize: FleetPageSize) {
  return {
    resetPage: page !== 0,
    pageSize,
  };
}
