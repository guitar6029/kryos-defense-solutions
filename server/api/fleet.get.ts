import { createError, defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";
import { isKryosNodeArray } from "~/types/KryosNode";
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const fleet: unknown = await $fetch(`${config.jsonServerBaseUrl}/fleet`);
  if (!isKryosNodeArray(fleet)) {
    throw createError({
      statusCode: 502,
      statusMessage: "Fleet data does not match the device contract.",
    });
  }

  return fleet;
});
