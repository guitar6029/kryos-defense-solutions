import { computed, type Ref } from "vue";
import { useQuery } from "#imports";
import type {
  FleetPageResponse,
  FleetPageSize,
  FleetSearchCriteria,
} from "~/types/FleetPage";

export const useKryosFleet = (
  page: Readonly<Ref<number>>,
  pageSize: Readonly<Ref<FleetPageSize>>,
  criteria: Readonly<Ref<FleetSearchCriteria>>,
) => {
  const normalizedCriteria = computed<FleetSearchCriteria>(() => {
    const search = criteria.value.search?.trim();
    return {
      ...(search ? { search } : {}),
      ...(criteria.value.status ? { status: criteria.value.status } : {}),
      ...(criteria.value.platform ? { platform: criteria.value.platform } : {}),
      ...(criteria.value.zone ? { zone: criteria.value.zone } : {}),
      ...(criteria.value.role ? { role: criteria.value.role } : {}),
      ...(criteria.value.linkStatus
        ? { linkStatus: criteria.value.linkStatus }
        : {}),
    };
  });

  return useQuery({
    queryKey: computed(
      () => ["fleet", page.value, pageSize.value, normalizedCriteria.value] as const,
    ),
    queryFn: ({ queryKey }) =>
      $fetch<FleetPageResponse>("/api/fleet", {
        query: {
          page: queryKey[1],
          pageSize: queryKey[2],
          ...queryKey[3],
        },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
