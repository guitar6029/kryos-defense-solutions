/** Bound user supplied search patterns sent to the fleet database query. */
export const MAX_FLEET_SEARCH_LENGTH = 64;

/** Escape PostgreSQL LIKE metacharacters so search remains literal substring matching. */
export function escapeFleetSearchPattern(search: string): string {
  return search.replace(/[\\%_]/g, "\\$&");
}
