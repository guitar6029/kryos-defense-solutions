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

// fleet store
const kryosFleetStore = useKryosFleetStore();

const systemStateStore = useSystemStateStore();
const { currentSystemMode } = storeToRefs(systemStateStore);
export type SystemModule = "fleet_monitor" | "command";

const currentModule = ref<SystemModule>("fleet_monitor");
const handleModule = (mode: SystemModule) => {
  currentModule.value = mode;
};
</script>

<template>
  <div class="flex flex-col min-h-screen p-4 gap-6 cursor-default">
    <!-- header -->
    <div class="flex flex-col">
      <div class="flex flex-row items-center justify-between p-4">
        <div class="flex flex-row items-center gap-4 kryos-text">
          <h1 class="w-fit font-bold">SYSTEMS</h1>
          <div>|</div>
          <div class="flex items-center gap-2">
            <p class="uppercase">
              <span class="font-bold text-(--kryos-warn)">[STATUS] </span
              >{{ currentSystemMode }}
            </p>
          </div>
        </div>

        <div
          class="kryos-text trns min-w-50 hover:text-(--kryos-text-high) border border-transparent hover:border-(--kryos-accent) trns hover:bg-(--kryos-bg-alt) p-4 flex item-center justify-center"
        >
          <NuxtLink to="/">EXIT SYSTEMS</NuxtLink>
        </div>
      </div>
      <div
        class="w-full h-0.5 bg-linear-to-r from-(--kryos-warn)/0 via-(--kryos-warn)/40 to-(--kryos-warn)/0"
      ></div>
    </div>
    <!-- end of header -->

    <!-- tabs -->
    <div class="flex items-center gap-2">
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
    </div>
    <!-- end labels -->

    <!-- kryos stats strip -->
    <KryosSystemStats />
    <!-- end kryos stats strip -->

    <!-- Fleet Monitor -->
    <div v-if="currentModule === 'fleet_monitor'" class="flex flex-col gap-2">
      <KryosPanelTitle title="Active Units" />
      <KryosTable :data="kryosFleetStore.fleet" />

      <!-- nuxt ui table component  -->
    </div>
    <!-- End Fleet Monitor -->

    <KryosCommandController v-else-if="currentModule === 'command'" />
  </div>
</template>
