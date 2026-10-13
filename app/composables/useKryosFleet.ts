import { computed, type Ref } from "vue";
import { useQuery } from "#imports";
import type { FleetPageResponse, FleetPageSize } from "~/types/FleetPage";

export const useKryosFleet = (
  page: Readonly<Ref<number>>,
  pageSize: Readonly<Ref<FleetPageSize>>,
) => {
  return useQuery({
    queryKey: computed(() => ["fleet", page.value, pageSize.value] as const),
    queryFn: ({ queryKey }) =>
      $fetch<FleetPageResponse>("/api/fleet", {
        query: { page: queryKey[1], pageSize: queryKey[2] },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
