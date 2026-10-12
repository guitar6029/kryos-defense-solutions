import { createError, defineEventHandler } from "h3";
import { getPrismaClient } from "../utils/prisma";
import { toFleetResponse } from "../utils/fleet-response";

export default defineEventHandler(async () => {
  try {
    const devices = await getPrismaClient().device.findMany({
      orderBy: { unitId: "asc" },
    });
    return devices.map(toFleetResponse);
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: "Fleet data is temporarily unavailable.",
    });
  }
});
