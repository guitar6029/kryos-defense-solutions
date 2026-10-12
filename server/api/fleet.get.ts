import { createError, defineEventHandler, getQuery } from "h3";
import { getPrismaClient } from "../utils/prisma";
import { parseFleetPagination } from "../utils/fleet-pagination";
import { toFleetResponse, type FleetPageResponse } from "../utils/fleet-response";

export default defineEventHandler(async (event): Promise<FleetPageResponse> => {
  const pagination = parseFleetPagination(getQuery(event));
  if (!pagination) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid fleet pagination parameters.",
    });
  }

  try {
    const deviceModel = getPrismaClient().device;
    const [devices, total] = await Promise.all([
      deviceModel.findMany({
        skip: pagination.page * pagination.pageSize,
        take: pagination.pageSize,
        orderBy: { unitId: "asc" },
      }),
      deviceModel.count(),
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
