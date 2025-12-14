<script lang="ts" setup>
import { storeToRefs } from "#imports";
import { onMounted, onBeforeUnmount,} from "vue";
import { useSystemModalStore, type SystemMode } from "#imports";
import { useSystemStateStore } from "#imports";
import KryosSystemTerminal from "~/components/Systems/KryosSystemTerminal.vue";
import KryosSystemBoot from "~/components/Systems/KryosSystemBoot.vue";
import KryosLoader from "~/components/Systems/KryosLoader.vue";

definePageMeta({ layout: "systems" });

const systemModalStore = useSystemModalStore();

const systemStateStore = useSystemStateStore();
const { currentSystemMode } = storeToRefs(systemStateStore);

useHead({
  title: "KRYOS | SYSTEMS",
});

onMounted(() => {
  //when page loads and component mounts
  // open the modal
  systemModalStore.open();
});

onBeforeUnmount(() => {
  //before leaving, reseet the mode to 'locked'
  systemStateStore.resetMode();
});

function handleSystemBoot() {
  //set the mode to operational
  systemStateStore.setToOperationalMode();
}
</script>

<template>
  <div
    v-if="currentSystemMode === 'locked' || currentSystemMode === 'loading'"
    class="flex flex-col h-screen items-center justify-center"
  >
    <div v-if="currentSystemMode === 'loading'" class="flex flex-col gap-2">
      <!-- LOADER -->
      <KryosLoader :loading="currentSystemMode === 'loading'" />
      <!-- END LOADER -->
      <!-- BOOT SEQUENCE -->
      <KryosSystemBoot
        @boot-completed="handleSystemBoot"
      />
      <!-- END BOOT SEQUENCE -->
    </div>

    <div
      v-else
      class="flex flex-col items-center h-screen justify-center gap-2"
    >
      <h1>LOCKED</h1>
    </div>
  </div>

  <KryosSystemTerminal v-else />
</template>
