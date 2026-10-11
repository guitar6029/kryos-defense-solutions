import { createError, defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";
import type { KryosNode } from "~/types/KryosNode";
import { isStatus } from "~/types/Status";
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const fleet: unknown = await $fetch(`${config.jsonServerBaseUrl}/fleet`);
  if (
    !Array.isArray(fleet) ||
    !fleet.every(
      (node): node is KryosNode =>
        typeof node === "object" &&
        node !== null &&
        isStatus((node as { status?: unknown }).status),
    )
  ) {
    throw createError({
      statusCode: 502,
      statusMessage: "Fleet data contains an unsupported device status.",
    });
  }

  return fleet;
});
