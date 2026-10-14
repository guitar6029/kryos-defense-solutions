<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FleetFilters from "~/components/Systems/FleetFilters.vue";
import KryosFleetPagination from "~/components/Table/KryosFleetPagination.vue";
import KryosFleetTable from "~/components/Table/KryosFleetTable.vue";
import { useKryosFleet } from "~/composables/useKryosFleet";
import { useKryosFleetCriteria } from "~/composables/useKryosFleetCriteria";
import { getFleetFeedback } from "~/utils/fleetFeedback";
import { DEFAULT_FLEET_PAGE_SIZE } from "#shared/fleet/pagination";
import type { FleetPageSize } from "~/types/FleetPage";
definePageMeta({ layout: "app" });
useHead({ title: "Kryos Platform | Fleet" });
const page = ref(0);
const pageSize = ref<FleetPageSize>(DEFAULT_FLEET_PAGE_SIZE);
const { criteria, effectiveCriteria, hasCriteria, clearCriteria } = useKryosFleetCriteria(page);
const fleetQuery = useKryosFleet(page, pageSize, effectiveCriteria);
const feedback = computed(() => getFleetFeedback({ isLoading: fleetQuery.isLoading.value, isError: fleetQuery.isError.value, total: fleetQuery.data.value?.total, hasCriteria: hasCriteria.value }));
watch(() => fleetQuery.data.value, (data) => { if (!data || data.page !== page.value || data.pageSize !== pageSize.value) return; const totalPages = Math.ceil(data.total / data.pageSize); if (page.value > 0 && page.value >= totalPages) page.value = 0; });
</script>
<template>
  <div class="flex flex-col gap-6">
    <header><p class="text-xs font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">Fleet management</p><h1 class="mt-2 text-3xl font-semibold text-(--kryos-text-high) md:text-4xl">Fleet records</h1><p class="mt-3 max-w-3xl leading-relaxed">Browse the existing paginated sample fleet data. Search and filters use the same API contract as the legacy <NuxtLink to="/systems" class="text-(--kryos-warn) underline underline-offset-4">Systems interface</NuxtLink>.</p></header>
    <FleetFilters :search="criteria.search ?? ''" :status="criteria.status" :platform="criteria.platform" :zone="criteria.zone" :role="criteria.role" :link-status="criteria.linkStatus" :has-criteria="hasCriteria" @update:search="criteria.search = $event" @update:status="criteria.status = $event" @update:platform="criteria.platform = $event" @update:zone="criteria.zone = $event" @update:role="criteria.role = $event" @update:link-status="criteria.linkStatus = $event" @clear="clearCriteria" />
    <div v-if="feedback?.kind === 'error'" role="alert" class="flex flex-wrap items-center gap-3 text-sm"><p>{{ feedback.message }}</p><button type="button" :disabled="fleetQuery.isFetching.value" class="rounded border border-(--kryos-text-low)/50 px-3 py-1 disabled:opacity-40" @click="fleetQuery.refetch()">Retry</button></div><p v-else-if="feedback" role="status" class="text-sm">{{ feedback.message }}</p>
    <KryosFleetTable :data="fleetQuery.data.value?.devices ?? []" />
    <KryosFleetPagination :page="page" :page-size="pageSize" :total="fleetQuery.data.value?.total ?? 0" :is-loading="fleetQuery.isLoading.value" :is-error="fleetQuery.isError.value" :is-empty="(fleetQuery.data.value?.devices.length ?? 0) === 0" @update:page="page = $event" @update:page-size="pageSize = $event" />
  </div>
</template>
