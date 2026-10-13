import {
  DEFAULT_FLEET_PAGE_SIZE,
  FLEET_PAGE_SIZES,
  type FleetPageSize,
} from "../../app/constants/fleet";

export const DEFAULT_FLEET_PAGE = 0;
export const MAX_FLEET_OFFSET = 10_000;

export type { FleetPageSize } from "../../app/constants/fleet";
export {
  DEFAULT_FLEET_PAGE_SIZE,
  FLEET_PAGE_SIZES as FLEET_PAGE_SIZE_OPTIONS,
};

export type FleetPagination = {
  page: number;
  pageSize: FleetPageSize;
};

/** Return null when either supplied query parameter is malformed or unsupported. */
export function parseFleetPagination(
  query: Record<string, unknown>,
): FleetPagination | null {
  const page = parseNonNegativeInteger(query.page, DEFAULT_FLEET_PAGE);
  const parsedPageSize = parseNonNegativeInteger(
    query.pageSize,
    DEFAULT_FLEET_PAGE_SIZE,
  );

  if (page === null || parsedPageSize === null) {
    return null;
  }

  const offset = page * parsedPageSize;


  if (
    !isFleetPageSize(parsedPageSize) ||
    !Number.isSafeInteger(offset) ||
    offset > MAX_FLEET_OFFSET
  ) {
    return null;
  }

  return {
    page,
    pageSize: parsedPageSize,
  };
}

function isFleetPageSize(value: number): value is FleetPageSize {
  return FLEET_PAGE_SIZES.some((pageSize) => pageSize === value);
}

function parseNonNegativeInteger(
  value: unknown,
  defaultValue: number,
): number | null {
  if (value === undefined) return defaultValue;
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}
