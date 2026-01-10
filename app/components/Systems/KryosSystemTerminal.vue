<script lang="ts" setup>
import { ref, watch } from "vue";
import { useKryosFleetStore } from "#imports";
import KryosPanelTitle from "../Labels/KryosPanelTitle.vue";
import KryosSystemStats from "./KryosSystemStats.vue";
import KryosTable from "../Table/KryosFleetTable.vue";
import KryosCommandController from "./KryosCommandController.vue";
import KryosDossierController from "./KryosDossierController.vue";
import KryosSidePanel from "../Panels/KryosSidePanel.vue";
import type { SystemModule } from "~/types/SystemModule";
import { DESKTOP_NAV_MIN_WIDTH } from "~/utils/DesktopResolutionValues";
import KryosToggleMenu from "../Buttons/KryosToggleMenu.vue";
import { useKryosFleet } from "~/composables/useKryosFleet";
import { useSystemStateStore } from "#imports";
// fleet store
const kryosFleetStore = useKryosFleetStore();
const kryosSystemState = useSystemStateStore();
// fleet query
const fleetQuery = useKryosFleet();

const handleSystemExit = () => {
  kryosSystemState.setToExitingMode();
};

watch(
  () => fleetQuery.data.value,
  (data) => {
    if (data) {
      kryosFleetStore.setFleet(data);
    }
  },
  { immediate: true }
);

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
      <KryosTable :data="kryosFleetStore.fleet" />

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
