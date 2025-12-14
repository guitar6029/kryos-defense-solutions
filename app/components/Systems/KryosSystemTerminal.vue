<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "#imports";
import { useSystemStateStore } from "#imports";
import KryosLabel from "../Labels/KryosLabel.vue";
import KryosPanelTitle from "../Labels/KryosPanelTitle.vue";
import KryosSystemStats from "./KryosSystemStats.vue";
import KryosTable from "../Table/KryosTable.vue";
import { useKryosFleetStore } from "#imports";

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
  <div class="flex flex-col min-h-screen p-4 gap-6">
    <!-- header -->
    <div class="flex flex-row items-center gap-4 bg-(--kryos-bg-alt) p-4">
      <h1 class="w-fit font-bold">SYSTEMS</h1>
      <div>//</div>
      <div class="flex items-center gap-2">
        <p class="uppercase">
          <span class="font-bold text-(--kryos-warn)">[STATUS] </span
          >{{ currentSystemMode }}
        </p>
      </div>
    </div>
    <!-- end of header -->

    <!-- labels -->
    <div class="flex items-center gap-2">
      <KryosLabel
        title="Fleet Monitor"
        :active="currentModule === 'fleet_monitor'"
        @click="handleModule('fleet_monitor')"
      />
      <KryosLabel
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

    <div v-else-if="currentModule === 'command'" class="flex flex-col gap-2">
      <KryosPanelTitle title="Command queue" />
      <span>NO PENDING COMMANDS</span>
      <!-- nuxt ui table component  -->
    </div>
  </div>
</template>
