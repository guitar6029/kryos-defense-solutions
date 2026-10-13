import { createError, defineEventHandler, getQuery } from "h3";
import { getPrismaClient } from "../utils/prisma";
import { parseFleetPagination } from "../utils/fleet-pagination";
import { hasOnlyAllowedQueryParameters } from "../utils/query-parameters";
import { toFleetResponse, type FleetPageResponse } from "../utils/fleet-response";
import { isStatus } from "../../app/types/Status";
import { isPlatform } from "../../app/types/Platform";
import { isZone } from "../../app/types/Zone";
import { isRole } from "../../app/types/Role";
import { isLinkStatus } from "../../app/types/LinkState";

const ALLOWED_PARAMETERS = [
  "page",
  "pageSize",
  "search",
  "status",
  "platform",
  "zone",
  "role",
  "linkStatus",
] as const;

export default defineEventHandler(async (event): Promise<FleetPageResponse> => {
  const query = getQuery(event);
  if (!hasOnlyAllowedQueryParameters(query, ALLOWED_PARAMETERS)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid fleet query parameters.",
    });
  }

  const pagination = parseFleetPagination(query);
  const filters = parseFleetFilters(query);
  if (!pagination || !filters) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid fleet query parameters.",
    });
  }

  try {
    const deviceModel = getPrismaClient().device;
    const where = {
      ...(filters.search
        ? { unitId: { contains: filters.search, mode: "insensitive" as const } }
        : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.platform ? { platform: filters.platform } : {}),
      ...(filters.zone ? { zone: filters.zone } : {}),
      ...(filters.role ? { role: filters.role } : {}),
      ...(filters.linkStatus ? { linkStatus: filters.linkStatus } : {}),
    };
    const [devices, total] = await Promise.all([
      deviceModel.findMany({
        where,
        skip: pagination.page * pagination.pageSize,
        take: pagination.pageSize,
        orderBy: { unitId: "asc" },
      }),
      deviceModel.count({ where }),
    ]);

    return {
      devices: devices.map(toFleetResponse),
      total,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: "Fleet data is temporarily unavailable.",
    });
  }
});

type FleetFilters = {
  search?: string;
  status?: string;
  platform?: string;
  zone?: string;
  role?: string;
  linkStatus?: string;
};

/** Reject malformed/repeated filters, and normalize whitespace-only search away. */
function parseFleetFilters(query: Record<string, unknown>): FleetFilters | null {
  const search = query.search;
  const status = query.status;
  const platform = query.platform;
  const zone = query.zone;
  const role = query.role;
  const linkStatus = query.linkStatus;

  if (
    (search !== undefined && typeof search !== "string") ||
    (status !== undefined && !isStatus(status)) ||
    (platform !== undefined && !isPlatform(platform)) ||
    (zone !== undefined && !isZone(zone)) ||
    (role !== undefined && !isRole(role)) ||
    (linkStatus !== undefined && !isLinkStatus(linkStatus))
  ) {
    return null;
  }

  const normalizedSearch = typeof search === "string" ? search.trim() : "";
  return {
    ...(normalizedSearch ? { search: normalizedSearch } : {}),
    ...(status ? { status } : {}),
    ...(platform ? { platform } : {}),
    ...(zone ? { zone } : {}),
    ...(role ? { role } : {}),
    ...(linkStatus ? { linkStatus } : {}),
  };
}
