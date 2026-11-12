<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FleetFilters from "~/components/Systems/FleetFilters.vue";
import LiveSnapshotSwitch from "~/components/Systems/LiveSnapshotSwitch.vue";
import KryosFleetPagination from "~/components/Table/KryosFleetPagination.vue";
import KryosFleetTable from "~/components/Table/KryosFleetTable.vue";
import { useKryosFleet } from "~/composables/useKryosFleet";
import { useKryosFleetCriteria } from "~/composables/useKryosFleetCriteria";
import { useFleetViewMode, type FleetViewMode } from "~/composables/useFleetViewMode";
import { getFleetFeedback } from "~/utils/fleetFeedback";
import { DEFAULT_FLEET_PAGE_SIZE } from "#shared/fleet/pagination";
import type { FleetPageSize } from "~/types/FleetPage";
definePageMeta({ layout: "app" });
useHead({ title: "Kryos Platform | Fleet" });
const page = ref(0);
const pageSize = ref<FleetPageSize>(DEFAULT_FLEET_PAGE_SIZE);
const { criteria, effectiveCriteria, hasCriteria, clearCriteria } = useKryosFleetCriteria(page);
const isLive = ref(true);
const fleetQuery = useKryosFleet(page, pageSize, effectiveCriteria, isLive);
const { mode, displayedData, capturedAt, relativeAge, captureSnapshot, resumeLive } = useFleetViewMode(fleetQuery.data, () => fleetQuery.refetch());
const isSnapshot = computed(() => mode.value === "snapshot");
const feedback = computed(() => getFleetFeedback({
  isLoading: isSnapshot.value ? false : fleetQuery.isLoading.value,
  isError: isSnapshot.value ? false : fleetQuery.isError.value,
  total: displayedData.value?.total,
  hasCriteria: hasCriteria.value,
}));
const paginationIsLoading = computed(() => isSnapshot.value ? false : fleetQuery.isLoading.value);
const paginationIsError = computed(() => isSnapshot.value ? false : fleetQuery.isError.value);
watch(() => fleetQuery.data.value, (data) => { if (isSnapshot.value || !data || data.page !== page.value || data.pageSize !== pageSize.value) return; const totalPages = Math.ceil(data.total / data.pageSize); if (page.value > 0 && page.value >= totalPages) page.value = 0; });
function resumeLiveMode() { isLive.value = true; return resumeLive(); }
function setViewMode(nextMode: FleetViewMode) { if (nextMode === "snapshot") { if (captureSnapshot()) isLive.value = false; } else if (isSnapshot.value) resumeLiveMode(); }
</script>
<template>
  <div class="flex flex-col gap-6">
    <header class="flex flex-wrap items-end justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">Fleet management</p><h1 class="mt-2 text-3xl font-semibold text-(--kryos-text-high) md:text-4xl">Fleet records</h1><p class="mt-3 max-w-3xl leading-relaxed">Browse the existing paginated fleet sample. Search and filters use the same API contract as the platform workspace.</p></div><LiveSnapshotSwitch :model-value="mode" :snapshot-disabled="!fleetQuery.data.value" @update:model-value="setViewMode" /></header>
    <section v-if="isSnapshot && capturedAt !== undefined" role="status" class="sticky top-3 z-10 flex flex-wrap items-center justify-between gap-3 border border-(--kryos-warn)/60 bg-(--kryos-bg-alt) p-3 shadow-sm"><div><p class="font-semibold text-(--kryos-warn)">NOTICE: VIEWING DATA IN SNAPSHOT MODE</p><p class="mt-1 text-sm">Captured {{ new Date(capturedAt).toLocaleString() }} ({{ relativeAge }}).</p></div><button type="button" class="rounded border border-(--kryos-warn)/70 px-3 py-1.5 text-sm font-medium text-(--kryos-text-high) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kryos-warn)" @click="resumeLiveMode">Resume Live</button></section>
    <FleetFilters :search="criteria.search ?? ''" :status="criteria.status" :platform="criteria.platform" :zone="criteria.zone" :role="criteria.role" :link-status="criteria.linkStatus" :has-criteria="hasCriteria" :disabled="isSnapshot" @update:search="criteria.search = $event" @update:status="criteria.status = $event" @update:platform="criteria.platform = $event" @update:zone="criteria.zone = $event" @update:role="criteria.role = $event" @update:link-status="criteria.linkStatus = $event" @clear="clearCriteria" />
    <div v-if="feedback?.kind === 'error'" role="alert" class="flex flex-wrap items-center gap-3 text-sm"><p>{{ feedback.message }}</p><button type="button" :disabled="fleetQuery.isFetching.value" class="rounded border border-(--kryos-text-low)/50 px-3 py-1 disabled:opacity-40" @click="fleetQuery.refetch()">Retry</button></div><p v-else-if="feedback" role="status" class="text-sm">{{ feedback.message }}</p>
    <KryosFleetTable :data="displayedData?.devices ?? []" />
    <KryosFleetPagination :page="page" :page-size="pageSize" :total="displayedData?.total ?? 0" :is-loading="paginationIsLoading" :is-error="paginationIsError" :is-empty="(displayedData?.devices.length ?? 0) === 0" :disabled="isSnapshot" @update:page="page = $event" @update:page-size="pageSize = $event" />
  </div>
</template>
