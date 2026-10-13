<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import KryosPanelTitle from "../Labels/KryosPanelTitle.vue";
import KryosSystemStats from "./KryosSystemStats.vue";
import KryosTable from "../Table/KryosFleetTable.vue";
import KryosFleetPagination from "../Table/KryosFleetPagination.vue";
import KryosCommandController from "./KryosCommandController.vue";
import KryosDossierController from "./KryosDossierController.vue";
import KryosSidePanel from "../Panels/KryosSidePanel.vue";
import type { SystemModule } from "~/types/SystemModule";
import { DESKTOP_NAV_MIN_WIDTH } from "~/utils/DesktopResolutionValues";
import KryosToggleMenu from "../Buttons/KryosToggleMenu.vue";
import { useKryosFleet } from "~/composables/useKryosFleet";
import { useKryosFleetCriteria } from "~/composables/useKryosFleetCriteria";
import { useSystemStateStore } from "#imports";
import type { FleetPageSize } from "~/types/FleetPage";
import { DEVICE_STATUSES } from "~/types/Status";
import { PLATFORMS } from "~/types/Platform";
import { ZONES } from "~/types/Zone";
import { ROLES } from "~/types/Role";
import { LINK_STATUSES } from "~/types/LinkState";
import { getFleetFeedback } from "~/utils/fleetFeedback";
const kryosSystemState = useSystemStateStore();
const page = ref(0);
const pageSize = ref<FleetPageSize>(25);
const { criteria, effectiveCriteria, hasCriteria, clearCriteria } =
  useKryosFleetCriteria(page);
const fleetQuery = useKryosFleet(page, pageSize, effectiveCriteria);
const fleetFeedback = computed(() =>
  getFleetFeedback({
    isLoading: fleetQuery.isLoading.value,
    isError: fleetQuery.isError.value,
    total: fleetQuery.data.value?.total,
    hasCriteria: hasCriteria.value,
  }),
);

watch(
  () => fleetQuery.data.value,
  (data) => {
    if (!data || data.page !== page.value || data.pageSize !== pageSize.value) {
      return;
    }

    const totalPages = Math.ceil(data.total / data.pageSize);
    if (page.value > 0 && page.value >= totalPages) {
      page.value = 0;
    }
  },
);

const handleSystemExit = () => {
  kryosSystemState.setToExitingMode();
};

const currentModule = ref<SystemModule>("fleet_monitor");
const handleModule = (mode: SystemModule) => {
  sideMenuDisplaying.value = false;
  currentModule.value = mode;
};

const { isMobile, sideMenuDisplaying, toggleMenu, closeMenu } =
  useKryosMobileMenu(DESKTOP_NAV_MIN_WIDTH);
</script>

<template>
  <div class="flex flex-col h-screen gap-6 cursor-default relative">
    <Transition name="panel-fade">
      <KryosSidePanel v-if="sideMenuDisplaying" @close="closeMenu">
        <template #main>
          <span
            :disabled="currentModule === 'fleet_monitor'"
            @click="handleModule('fleet_monitor')"
            :class="[
              'uppercase kryos-bracket',
              currentModule === 'fleet_monitor' ? 'text-(--kryos-warn)' : '',
            ]"
            >Fleet Monitor</span
          >
          <span
            :class="[
              'uppercase kryos-bracket',
              currentModule === 'command' ? 'text-(--kryos-warn)' : '',
            ]"
            :disabled="currentModule === 'command'"
            @click="handleModule('command')"
            class="uppercase kryos-bracket"
            >Command Queue</span
          >
          <span
            :disabled="currentModule === 'dossier'"
            @click="handleModule('dossier')"
            :class="[
              'uppercase kryos-bracket',
              currentModule === 'dossier' ? 'text-(--kryos-warn)' : '',
            ]"
            >System Dossier</span
          >
          <button
            @click="handleSystemExit"
            class="w-fit relative kryos-text uppercase trns cursor-default"
          >
            <span class="kryos-bracket">Exit system</span>
          </button>
        </template>
      </KryosSidePanel>
    </Transition>
    <div class="md:hidden relative w-full p-4">
      <div class="relative z-10">
        <KryosPanelTitle :title="`kryos // ${currentModule}`" />
      </div>
    </div>

    <!-- header -->
    <KryosToggleMenu :is-mobile="isMobile" @toggle-menu="toggleMenu" />

    <!-- md screens and up -->
    <div class="hidden md:block w-full relative mb-20 bottom-5">
      <div class="flex flex-col gap-2 relative z-1 top-10">
        <div class="flex flex-row items-center justify-between w-screen gap-2">
          <div class="flex flex-row items-center gap-2">
            <span
              :disabled="currentModule === 'fleet_monitor'"
              @click="handleModule('fleet_monitor')"
              :class="[
                'uppercase kryos-bracket',
                currentModule === 'fleet_monitor' ? 'text-(--kryos-warn)' : '',
              ]"
              >Fleet Monitor</span
            >
            <span
              :class="[
                'uppercase kryos-bracket',
                currentModule === 'command' ? 'text-(--kryos-warn)' : '',
              ]"
              :disabled="currentModule === 'command'"
              @click="handleModule('command')"
              class="uppercase kryos-bracket"
              >Command Queue</span
            >
            <span
              :disabled="currentModule === 'dossier'"
              @click="handleModule('dossier')"
              :class="[
                'uppercase kryos-bracket',
                currentModule === 'dossier' ? 'text-(--kryos-warn)' : '',
              ]"
              >System Dossier</span
            >
          </div>
          <button
            @click="handleSystemExit"
            class="w-fit relative -left-5 kryos-text uppercase trns cursor-default"
          >
            <span class="kryos-bracket">Exit system</span>
          </button>
        </div>
      </div>
    </div>

    <!-- end header -->

    <!-- kryos stats strip -->
    <KryosSystemStats
      v-if="currentModule === 'fleet_monitor' || currentModule === 'command'"
    />
    <!-- end kryos stats strip -->

    <!-- Fleet Monitor -->
    <div
      v-if="currentModule === 'fleet_monitor'"
      class="flex flex-col gap-2 p-4"
    >
      <KryosPanelTitle title="Active Units" />
      <section
        aria-label="Fleet search and filters"
        class="grid grid-cols-1 gap-3 rounded border border-(--kryos-text-low)/30 p-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <label class="flex flex-col gap-1 text-sm sm:col-span-2">
          <span>Search unit ID</span>
          <input
            v-model="criteria.search"
            type="search"
            placeholder="Search by unit ID"
            aria-label="Search by unit ID"
            class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) placeholder:text-(--kryos-text-low)"
          />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span>Status</span>
          <select v-model="criteria.status" aria-label="Filter by status" class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) disabled:opacity-50">
            <option :value="undefined">All statuses</option>
            <option v-for="status in DEVICE_STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span>Platform</span>
          <select v-model="criteria.platform" aria-label="Filter by platform" class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) disabled:opacity-50">
            <option :value="undefined">All platforms</option>
            <option v-for="platform in PLATFORMS" :key="platform" :value="platform">{{ platform }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span>Zone</span>
          <select v-model="criteria.zone" aria-label="Filter by zone" class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) disabled:opacity-50">
            <option :value="undefined">All zones</option>
            <option v-for="zone in ZONES" :key="zone" :value="zone">{{ zone }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span>Role</span>
          <select v-model="criteria.role" aria-label="Filter by role" class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) disabled:opacity-50">
            <option :value="undefined">All roles</option>
            <option v-for="role in ROLES" :key="role" :value="role">{{ role }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span>Link status</span>
          <select v-model="criteria.linkStatus" aria-label="Filter by link status" class="rounded border border-(--kryos-text-low)/50 bg-(--kryos-bg) px-3 py-2 text-(--kryos-text-high) disabled:opacity-50">
            <option :value="undefined">All link statuses</option>
            <option v-for="linkStatus in LINK_STATUSES" :key="linkStatus" :value="linkStatus">{{ linkStatus }}</option>
          </select>
        </label>
        <div class="flex items-end sm:col-span-2 lg:col-span-4">
          <button
            type="button"
            :disabled="!hasCriteria"
            class="rounded border border-(--kryos-text-low)/50 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            @click="clearCriteria"
          >
            Clear search and filters
          </button>
        </div>
      </section>
      <div
        v-if="fleetFeedback?.kind === 'error'"
        role="alert"
        class="flex flex-wrap items-center gap-3 text-sm"
      >
        <p>{{ fleetFeedback.message }}</p>
        <button
          type="button"
          :disabled="fleetQuery.isFetching.value"
          class="rounded border border-(--kryos-text-low)/50 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
          @click="fleetQuery.refetch()"
        >
          Retry
        </button>
      </div>
      <p
        v-else-if="fleetFeedback"
        role="status"
        class="text-sm"
      >
        {{ fleetFeedback.message }}
      </p>
      <KryosTable :data="fleetQuery.data.value?.devices ?? []" />
      <KryosFleetPagination
        :page="page"
        :page-size="pageSize"
        :total="fleetQuery.data.value?.total ?? 0"
        :is-loading="fleetQuery.isLoading.value"
        :is-error="fleetQuery.isError.value"
        :is-empty="(fleetQuery.data.value?.devices.length ?? 0) === 0"
        @update:page="page = $event"
        @update:page-size="pageSize = $event"
      />

      <!-- nuxt ui table component  -->
    </div>
    <!-- End Fleet Monitor -->

    <!-- command controller -->
    <div
      class="p-4 flex flex-col gap-6"
      v-else-if="currentModule === 'command'"
    >
      <KryosCommandController />
    </div>
    <!-- end command controller -->

    <KryosDossierController v-else-if="currentModule === 'dossier'" />
  </div>
</template>
