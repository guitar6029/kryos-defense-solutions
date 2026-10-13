<script setup lang="ts">
import type { FleetSearchCriteria } from "~/types/FleetPage";
import { DEVICE_STATUSES, isStatus } from "~/types/Status";
import { PLATFORMS, isPlatform } from "~/types/Platform";
import { ZONES, isZone } from "~/types/Zone";
import { ROLES, isRole } from "~/types/Role";
import { LINK_STATUSES, isLinkStatus } from "~/types/LinkState";

const props = defineProps<
  FleetSearchCriteria & {
    hasCriteria: boolean;
  }
>();

const emit = defineEmits<{
  (event: "update:search", value: string): void;
  (event: "update:status", value: FleetSearchCriteria["status"]): void;
  (event: "update:platform", value: FleetSearchCriteria["platform"]): void;
  (event: "update:zone", value: FleetSearchCriteria["zone"]): void;
  (event: "update:role", value: FleetSearchCriteria["role"]): void;
  (event: "update:linkStatus", value: FleetSearchCriteria["linkStatus"]): void;
  (event: "clear"): void;
}>();

const ALL_FILTERS = "__all__";
const statusOptions = [
  { label: "All statuses", value: ALL_FILTERS },
  ...DEVICE_STATUSES.map((status) => ({ label: status, value: status })),
];
const platformOptions = [
  { label: "All platforms", value: ALL_FILTERS },
  ...PLATFORMS.map((platform) => ({ label: platform, value: platform })),
];
const zoneOptions = [
  { label: "All zones", value: ALL_FILTERS },
  ...ZONES.map((zone) => ({ label: zone, value: zone })),
];
const roleOptions = [
  { label: "All roles", value: ALL_FILTERS },
  ...ROLES.map((role) => ({ label: role, value: role })),
];
const linkStatusOptions = [
  { label: "All link statuses", value: ALL_FILTERS },
  ...LINK_STATUSES.map((linkStatus) => ({
    label: linkStatus,
    value: linkStatus,
  })),
];

function updateStatus(value: string) {
  emit("update:status", isStatus(value) ? value : undefined);
}

function updatePlatform(value: string) {
  emit("update:platform", isPlatform(value) ? value : undefined);
}

function updateZone(value: string) {
  emit("update:zone", isZone(value) ? value : undefined);
}

function updateRole(value: string) {
  emit("update:role", isRole(value) ? value : undefined);
}

function updateLinkStatus(value: string) {
  emit("update:linkStatus", isLinkStatus(value) ? value : undefined);
}
</script>

<template>
  <section
    aria-label="Fleet search and filters"
    class="grid grid-cols-1 gap-3 rounded border border-(--kryos-text-low)/30 p-3 sm:grid-cols-2 lg:grid-cols-4"
  >
    <label class="flex flex-col gap-1 text-sm sm:col-span-2">
      <span>Search unit ID</span>
      <input
        :value="props.search ?? ''"
        type="search"
        placeholder="Search by unit ID"
        aria-label="Search by unit ID"
        class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) placeholder:text-(--kryos-text-low)"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </label>
    <label class="flex flex-col gap-1 text-sm">
      <span>Status</span>
      <USelect
        :model-value="props.status ?? ALL_FILTERS"
        :items="statusOptions"
        aria-label="Filter by status"
        class="w-full rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high)"
        @update:model-value="updateStatus"
      />
    </label>
    <label class="flex flex-col gap-1 text-sm">
      <span>Platform</span>
      <USelect
        :model-value="props.platform ?? ALL_FILTERS"
        :items="platformOptions"
        aria-label="Filter by platform"
        class="w-full rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high)"
        @update:model-value="updatePlatform"
      />
    </label>
    <label class="flex flex-col gap-1 text-sm">
      <span>Zone</span>
      <USelect
        :model-value="props.zone ?? ALL_FILTERS"
        :items="zoneOptions"
        aria-label="Filter by zone"
        class="w-full rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high)"
        @update:model-value="updateZone"
      />
    </label>
    <label class="flex flex-col gap-1 text-sm">
      <span>Role</span>
      <USelect
        :model-value="props.role ?? ALL_FILTERS"
        :items="roleOptions"
        aria-label="Filter by role"
        class="w-full rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high)"
        @update:model-value="updateRole"
      />
    </label>
    <label class="flex flex-col gap-1 text-sm">
      <span>Link status</span>
      <USelect
        :model-value="props.linkStatus ?? ALL_FILTERS"
        :items="linkStatusOptions"
        aria-label="Filter by link status"
        class="w-full rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high)"
        @update:model-value="updateLinkStatus"
      />
    </label>
    <div class="flex items-end sm:col-span-2 lg:col-span-4">
      <button
        type="button"
        :disabled="!props.hasCriteria"
        class="rounded border border-(--kryos-text-low)/50 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        @click="emit('clear')"
      >
        Clear search and filters
      </button>
    </div>
  </section>
</template>
