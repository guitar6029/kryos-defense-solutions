export const FLEET_PAGE_SIZE_OPTIONS = [5, 25, 50, 100] as const;
export const DEFAULT_FLEET_PAGE = 0;
export const DEFAULT_FLEET_PAGE_SIZE = 25;

export type FleetPageSize = (typeof FLEET_PAGE_SIZE_OPTIONS)[number];

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

  if (
    page === null ||
    parsedPageSize === null ||
    !isFleetPageSize(parsedPageSize) ||
    page > Math.floor(Number.MAX_SAFE_INTEGER / parsedPageSize)
  ) {
    return null;
  }

  return {
    page,
    pageSize: parsedPageSize,
  };
}

function isFleetPageSize(value: number): value is FleetPageSize {
  return FLEET_PAGE_SIZE_OPTIONS.some((pageSize) => pageSize === value);
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
