<script setup lang="ts">
import type { FleetPageSize } from "~/types/FleetPage";
import { FLEET_PAGE_SIZES } from "~/constants/fleet";
import {
  getFleetTotalPages,
  getPageSizeChange,
  shouldDisableNext,
  shouldDisablePrevious,
} from "./fleetPagination";

const props = defineProps<{
  page: number;
  pageSize: FleetPageSize;
  total: number;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}>();

const emit = defineEmits<{
  (event: "update:page", page: number): void;
  (event: "update:pageSize", pageSize: FleetPageSize): void;
}>();

const totalPages = computed(() => getFleetTotalPages(props.total, props.pageSize));
const controlsDisabled = computed(
  () => props.isLoading || props.isError,
);

function changePageSize(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value);
  if (!FLEET_PAGE_SIZES.includes(value as FleetPageSize)) return;

  const change = getPageSizeChange(props.page, value as FleetPageSize);
  if (change.resetPage) {
    emit("update:page", 0);
  }
  emit("update:pageSize", change.pageSize);
}
</script>

<template>
  <section
    class="flex flex-col gap-3 border-t border-(--kryos-text-low)/30 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
    aria-label="Fleet pagination"
  >
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <label class="flex items-center gap-2">
        <span>Rows per page</span>
        <select
          :value="pageSize"
          :disabled="controlsDisabled"
          aria-label="Rows per page"
          class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-2 py-1 text-(--kryos-text-high) disabled:opacity-50"
          @change="changePageSize"
        >
          <option v-for="size in FLEET_PAGE_SIZES" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </label>
      <span aria-live="polite">{{ total }} total units</span>
    </div>

    <p v-if="isLoading" role="status" class="sm:order-last">Loading fleet…</p>
    <p v-else-if="isError" role="alert" class="sm:order-last">
      Fleet pagination is unavailable.
    </p>
    <p v-else-if="isEmpty" role="status" class="sm:order-last">
      {{ total === 0 ? "No fleet units to display." : "No units on this page." }}
    </p>

    <div class="flex items-center gap-3">
      <span aria-live="polite">
        Page {{ total === 0 ? 0 : page + 1 }} of {{ totalPages }}
      </span>
      <button
        type="button"
        aria-label="Previous page"
        :disabled="controlsDisabled || shouldDisablePrevious(page)"
        class="rounded border border-(--kryos-text-low)/50 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
        @click="emit('update:page', page - 1)"
      >
        Previous
      </button>
      <button
        type="button"
        aria-label="Next page"
        :disabled="controlsDisabled || shouldDisableNext(page, totalPages)"
        class="rounded border border-(--kryos-text-low)/50 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
        @click="emit('update:page', page + 1)"
      >
        Next
      </button>
    </div>
  </section>
</template>
