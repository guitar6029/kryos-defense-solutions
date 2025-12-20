import type { KryosNode } from "~/types/KryosNode";
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const fleet = await $fetch<KryosNode[]>(`${config.jsonServerBaseUrl}/fleet`);

  return fleet
});
