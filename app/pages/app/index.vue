<script setup lang="ts">
import { computed, ref } from "vue";
import { DEFAULT_FLEET_PAGE_SIZE } from "#shared/fleet/pagination";
import { useKryosFleet } from "~/composables/useKryosFleet";
import type { FleetPageSize } from "~/types/FleetPage";
import { getFleetDashboardSummary } from "~/utils/fleetDashboard";
definePageMeta({ layout: "app" });
useHead({ title: "Kryos Platform | Overview" });
const page = ref(0);
const pageSize = ref<FleetPageSize>(DEFAULT_FLEET_PAGE_SIZE);
const criteria = ref({});
const fleetQuery = useKryosFleet(page, pageSize, criteria);
const devices = computed(() => fleetQuery.data.value?.devices ?? []);
const summary = computed(() => getFleetDashboardSummary(devices.value));
const metrics = computed(() => [
  { label: "Fleet records", value: fleetQuery.data.value?.total ?? "—", detail: "available in the API read model" },
  { label: "Visible attention", value: fleetQuery.isError.value ? "—" : summary.value.attentionCount, detail: "non-online records on the loaded page" },
  { label: "Average power", value: summary.value.averagePower === null ? "—" : `${summary.value.averagePower}%`, detail: "loaded page sample" },
]);
</script>
<template>
  <div class="flex flex-col gap-8">
    <header class="flex flex-col gap-3">
      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">Workspace overview</p>
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><h1 class="text-3xl font-semibold text-(--kryos-text-high) md:text-5xl">Platform overview</h1><p class="mt-3 max-w-2xl leading-relaxed">A concise view of the verified fleet read model. This workspace uses sample/development data and is not a live operational display.</p></div>
        <NuxtLink to="/app/fleet" class="inline-flex min-h-11 items-center justify-center rounded-md border border-(--kryos-warn) px-4 py-2 text-sm font-semibold text-(--kryos-text-high) hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-(--kryos-warn)">Open fleet</NuxtLink>
      </div>
    </header>
    <div v-if="fleetQuery.isError.value" role="alert" class="rounded-md border border-(--kryos-danger) bg-(--kryos-danger-faint)/20 p-4 text-sm">Fleet summary is temporarily unavailable. Open Fleet to retry the existing data query.</div>
    <div v-else-if="fleetQuery.isLoading.value" role="status" class="rounded-md border border-white/10 p-4 text-sm">Loading sample fleet summary…</div>
    <section aria-labelledby="metrics-title"><div class="mb-3 flex items-baseline justify-between gap-4"><h2 id="metrics-title" class="text-lg font-semibold text-(--kryos-text-high)">Fleet health</h2><span class="text-xs uppercase tracking-wider text-(--kryos-text-low)">Verified source: /api/fleet</span></div><div class="grid gap-3 sm:grid-cols-3"><article v-for="metric in metrics" :key="metric.label" class="rounded-lg border border-white/10 bg-(--kryos-bg-alt) p-5"><p class="text-xs uppercase tracking-wider text-(--kryos-text-low)">{{ metric.label }}</p><p class="mt-3 text-3xl font-semibold tabular-nums text-(--kryos-text-high)">{{ metric.value }}</p><p class="mt-2 text-sm">{{ metric.detail }}</p></article></div></section>
    <div class="grid gap-4 lg:grid-cols-2">
      <section aria-labelledby="attention-title" class="rounded-lg border border-white/10 bg-(--kryos-bg-alt) p-5"><div class="flex items-center justify-between gap-4"><h2 id="attention-title" class="text-lg font-semibold text-(--kryos-text-high)">Devices needing attention</h2><NuxtLink to="/app/fleet" class="text-sm text-(--kryos-warn) underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-(--kryos-warn)">Review fleet</NuxtLink></div><p class="mt-3 text-sm leading-relaxed">{{ summary.attentionCount ? `${summary.attentionCount} non-online record${summary.attentionCount === 1 ? "" : "s"} appear on the loaded sample page.` : "No attention records are available on the loaded page." }}</p><p class="mt-3 text-xs text-(--kryos-text-low)">This is a page-level view, not a fleet-wide health aggregate.</p></section>
      <section aria-labelledby="activity-title" class="rounded-lg border border-white/10 bg-(--kryos-bg-alt) p-5"><h2 id="activity-title" class="text-lg font-semibold text-(--kryos-text-high)">Recent activity</h2><p class="mt-3 text-sm leading-relaxed">No notification or event-history source is currently available for this overview.</p><NuxtLink to="/app/notifications" class="mt-4 inline-block text-sm text-(--kryos-warn) underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-(--kryos-warn)">View planned notifications</NuxtLink></section>
    </div>
    <section aria-labelledby="zones-title" class="rounded-lg border border-dashed border-(--kryos-accent) p-5"><p class="text-xs uppercase tracking-[0.16em] text-(--kryos-text-low)">Coming later</p><h2 id="zones-title" class="mt-2 text-lg font-semibold text-(--kryos-text-high)">Zones and reporting</h2><p class="mt-3 max-w-3xl text-sm leading-relaxed">Zone values exist on device records, but a zone overview, map, and reporting source are not implemented. The dashboard keeps this boundary explicit until those capabilities are approved and built.</p><NuxtLink to="/app/zones" class="mt-4 inline-block text-sm text-(--kryos-warn) underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-(--kryos-warn)">Explore zone roadmap</NuxtLink></section>
  </div>
</template>
