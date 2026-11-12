import { computed, type Ref } from "vue";
import { useAsyncData } from "#imports";
import type {
  FleetPageResponse,
  FleetPageSize,
  FleetSearchCriteria,
} from "~/types/FleetPage";

export const useKryosFleet = (
  page: Readonly<Ref<number>>,
  pageSize: Readonly<Ref<FleetPageSize>>,
  criteria: Readonly<Ref<FleetSearchCriteria>>,
  enabled: Readonly<Ref<boolean>> = computed(() => true),
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

  const request = computed(() => ({
    page: page.value,
    pageSize: pageSize.value,
    criteria: normalizedCriteria.value,
  }));
  const key = computed(() => `fleet:${JSON.stringify(request.value)}`);
  const query = useAsyncData(
    key,
    (_nuxtApp, { signal }) => {
      const currentRequest = request.value;
      return $fetch<FleetPageResponse>("/api/fleet", {
        query: {
          page: currentRequest.page,
          pageSize: currentRequest.pageSize,
          ...currentRequest.criteria,
        },
        signal,
      });
    },
    {
      dedupe: "cancel",
      enabled,
    },
  );

  return {
    data: query.data,
    isLoading: computed(
      () => query.status.value === "pending" && query.data.value === undefined,
    ),
    isFetching: query.pending,
    isError: computed(() => query.status.value === "error"),
    refetch: () => query.refresh({ dedupe: "cancel" }),
  };
};
