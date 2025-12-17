<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useKryosFleetStore } from "#imports";
import KryosPanelTitle from "../Labels/KryosPanelTitle.vue";
import KryosSystemStats from "./KryosSystemStats.vue";
import KryosTable from "../Table/KryosFleetTable.vue";
import KryosCommandController from "./KryosCommandController.vue";
import KryosDossierController from "./KryosDossierController.vue";
import type { SystemModule } from "~/types/SystemModule";

const DESKTOP_NAV_MIN_WIDTH = 850;

// fleet store
const kryosFleetStore = useKryosFleetStore();
const showMenuIcon = ref(false);
const currentModule = ref<SystemModule>("fleet_monitor");
const handleModule = (mode: SystemModule) => {
  sideMenuDisplaying.value = false;
  currentModule.value = mode;
};

const sideMenuDisplaying = ref(false);

function toggleMenu() {
  sideMenuDisplaying.value = !sideMenuDisplaying.value;
}

function handleResize() {
  if (window.innerWidth > DESKTOP_NAV_MIN_WIDTH) {
    sideMenuDisplaying.value = false;
    showMenuIcon.value = false;
  } else {
    showMenuIcon.value = true;
  }
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="flex flex-col h-screen gap-6 cursor-default relative">
    <aside
      v-if="sideMenuDisplaying"
      class="absolute flex flex-col items-center justify-center top-0 right-0 w-75 h-screen bg-linear-90 bg-(--kryos-bg) z-100 border-l-2 border-l-(--kryos-accent)"
    >
      <div
        class="trns kryos-text hover:text-(--kryos-text-high) absolute top-5 left-5 flex flex-col gap-1"
      >
        <span>KRYOS</span>
        <span class="text-(--kryos-warn)">[system]</span>
      </div>
      <button @click="toggleMenu">
        <Icon
          class="trns hover:text-(--kryos-text-high) absolute top-5 right-5"
          name="material-symbols:close"
        />
      </button>
      <div class="flex flex-col item-center gap-4 max-w-[200px]">
        <span
          :disabled="currentModule === 'fleet_monitor'"
          @click="handleModule('fleet_monitor')"
          :class="[
            'uppercase nav-link',
            currentModule === 'fleet_monitor' ? 'text-(--kryos-warn)' : '',
          ]"
          >Fleet Monitor</span
        >
        <span
          :class="[
            'uppercase nav-link',
            currentModule === 'command' ? 'text-(--kryos-warn)' : '',
          ]"
          :disabled="currentModule === 'command'"
          @click="handleModule('command')"
          class="uppercase nav-link"
          >Command Queue</span
        >
        <span
          :disabled="currentModule === 'dossier'"
          @click="handleModule('dossier')"
          :class="[
            'uppercase nav-link',
            currentModule === 'dossier' ? 'text-(--kryos-warn)' : '',
          ]"
          >System Dossier</span
        >
        <NuxtLink
          to="/"
          class="nav-link kryos-text uppercase relative trns hover:text-(--kryos-text-high) mt-12 cursor-default"
          >Exit system</NuxtLink
        >
      </div>
    </aside>

    <div class="md:hidden absolute top-0 left-0 flex flex-col w-full gap-2 p-4">
      <svg
        class="absolute w-full -z-1"
        viewBox="0 0 1657 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRation="none"
      >
        <path
          d="M0 28H222.5L361 83.5H685L907 0.5H1656.5"
          stroke="var(--kryos-accent)"
          stroke-width="4"
        />
      </svg>

      <div class="relative z-10">
        <KryosPanelTitle :title="`kryos // ${currentModule}`" />
      </div>
    </div>

    <!-- header -->
    <div class="w-full flex items-center justify-end p-4">
      <button v-if="showMenuIcon" @click="toggleMenu">
        <Icon
          class="trns hover:text-(--kryos-text-high)"
          name="tdesign:menu-filled"
        />
      </button>
    </div>
    <!-- md screens and up -->
    <div class="hidden md:block w-full relative mb-20 bottom-5">
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
            <span
              :disabled="currentModule === 'fleet_monitor'"
              @click="handleModule('fleet_monitor')"
              :class="[
                'uppercase nav-link',
                currentModule === 'fleet_monitor' ? 'text-(--kryos-warn)' : '',
              ]"
              >Fleet Monitor</span
            >
            <span
              :class="[
                'uppercase nav-link',
                currentModule === 'command' ? 'text-(--kryos-warn)' : '',
              ]"
              :disabled="currentModule === 'command'"
              @click="handleModule('command')"
              class="uppercase nav-link"
              >Command Queue</span
            >
            <span
              :disabled="currentModule === 'dossier'"
              @click="handleModule('dossier')"
              :class="[
                'uppercase nav-link',
                currentModule === 'dossier' ? 'text-(--kryos-warn)' : '',
              ]"
              >System Dossier</span
            >
          </div>
          <NuxtLink
            to="/"
            class="kryos-text uppercase relative -left-20 trns hover:text-(--kryos-text-high) cursor-default"
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
