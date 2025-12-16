<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "#imports";
import { useKryosFleetStore } from "#imports";
import { useSystemStateStore } from "#imports";
import KryosTab from "../KryosTab.vue";
import KryosPanelTitle from "../Labels/KryosPanelTitle.vue";
import KryosSystemStats from "./KryosSystemStats.vue";
import KryosTable from "../Table/KryosFleetTable.vue";
import KryosCommandController from "./KryosCommandController.vue";
import KryosDossierController from "./KryosDossierController.vue";
import type { SystemModule } from "~/types/SystemModule";

// fleet store
const kryosFleetStore = useKryosFleetStore();

const systemStateStore = useSystemStateStore();
const { currentSystemMode } = storeToRefs(systemStateStore);

const currentModule = ref<SystemModule>("fleet_monitor");
const handleModule = (mode: SystemModule) => {
  currentModule.value = mode;
};
</script>

<template>
  <div class="flex flex-col h-screen gap-6 cursor-default">
    <!-- header -->

    <div class="w-full relative flex mb-20 bottom-5">
      <div class="absolute inset-0">
        <svg
          class="w-full h-40"
          viewBox="0 0 3944 852"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stop-color="var(--kryos-bg)"
                stop-opacity="0.95"
              />
              <stop
                offset="65%"
                stop-color="var(--kryos-bg)"
                stop-opacity="0.85"
              />
              <stop
                offset="100%"
                stop-color="var(--kryos-bg)"
                stop-opacity="0.7"
              />
            </linearGradient>
          </defs>

          <path
            d="M1788 28.5065H0.5V681.007H166L221 648.507H1480V681.007H1618L1917 819.007H2064L2156 773.007H2817.5L2918.5 851.007H3327.5L3373.5 819.007H3815L3943.5 681.007V129.507V0.506531L1788 28.5065Z"
            fill="url(#headerGrad)"
            stroke="var(--kryos-accent)"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div class="flex flex-col gap-2 relative z-1 left-5 top-10">
        <div class="flex flex-row items-center justify-between w-screen gap-2">
          <div class="flex flex-row items-center gap-2">
            <KryosTab
              title="Fleet Monitor"
              :active="currentModule === 'fleet_monitor'"
              @click="handleModule('fleet_monitor')"
            />
            <KryosTab
              title="Command Queue"
              :active="currentModule === 'command'"
              @click="handleModule('command')"
            />
            <KryosTab
              title="System Dossier"
              :active="currentModule === 'dossier'"
              @click="handleModule('dossier')"
            />
          </div>
          <NuxtLink
            to="/"
            class="kryos-text uppercase relative -left-20 trns hover:text-(--kryos-text-high)"
            >Exit system</NuxtLink
          >
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
