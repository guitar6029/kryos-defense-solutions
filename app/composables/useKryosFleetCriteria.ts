import { computed, reactive, ref, watch, type Ref } from "vue";
import type { FleetSearchCriteria } from "~/types/FleetPage";

const SEARCH_DEBOUNCE_MS = 300;

export function useKryosFleetCriteria(page: Ref<number>) {
  const criteria = reactive<FleetSearchCriteria>({});
  const debouncedSearch = ref("");

  watch(
    () => criteria.search,
    (search, _previousSearch, onCleanup) => {
      const normalizedSearch = search?.trim() ?? "";
      if (!normalizedSearch) {
        debouncedSearch.value = "";
        return;
      }

      const timeout = setTimeout(() => {
        debouncedSearch.value = normalizedSearch;
      }, SEARCH_DEBOUNCE_MS);
      onCleanup(() => clearTimeout(timeout));
    },
    { flush: "sync" },
  );

  const effectiveCriteria = computed<FleetSearchCriteria>(() => ({
    ...(debouncedSearch.value ? { search: debouncedSearch.value } : {}),
    ...(criteria.status ? { status: criteria.status } : {}),
    ...(criteria.platform ? { platform: criteria.platform } : {}),
    ...(criteria.zone ? { zone: criteria.zone } : {}),
    ...(criteria.role ? { role: criteria.role } : {}),
    ...(criteria.linkStatus ? { linkStatus: criteria.linkStatus } : {}),
  }));

  watch(
    () => [
      effectiveCriteria.value.search,
      effectiveCriteria.value.status,
      effectiveCriteria.value.platform,
      effectiveCriteria.value.zone,
      effectiveCriteria.value.role,
      effectiveCriteria.value.linkStatus,
    ],
    () => {
      page.value = 0;
    },
  );

  const hasCriteria = computed(() =>
    Boolean(
      criteria.search?.trim() ||
        criteria.status ||
        criteria.platform ||
        criteria.zone ||
        criteria.role ||
        criteria.linkStatus,
    ),
  );

  function clearCriteria() {
    criteria.search = "";
    criteria.status = undefined;
    criteria.platform = undefined;
    criteria.zone = undefined;
    criteria.role = undefined;
    criteria.linkStatus = undefined;
    debouncedSearch.value = "";
    page.value = 0;
  }

  return { criteria, effectiveCriteria, hasCriteria, clearCriteria };
}
