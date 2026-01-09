<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "#imports";
import { useSystemModalStore } from "#imports";
import { useSystemStateStore } from "#imports";
import KryosSystemBoot from "~/components/Systems/KryosSystemBoot.vue";
import KryosSystemTerminal from "~/components/Systems/KryosSystemTerminal.vue";
import KryosLoader from "~/components/Systems/KryosLoader.vue";
import KryosSystemExit from "~/components/Systems/KryosSystemExit.vue";

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
    v-if="currentSystemMode === 'exiting'"
    class="flex flex-col items-center justify-center gap-2 relative h-screen"
  >
    <KryosSystemExit />
  </div>

  <div
    v-else-if="currentSystemMode === 'locked'"
    class="flex flex-col items-center h-screen justify-center gap-2"
  >
    <h1 class="kryos-text text-(--kryos-warn) uppercase">[LOCKED]</h1>
  </div>

  <div
    v-else-if="currentSystemMode === 'loading'"
    class="flex flex-col h-screen items-center justify-center overflow-hidden"
  >
    <div class="flex flex-col gap-2 relative">
      <KryosLoader loading />
      <KryosSystemBoot @boot-completed="handleSystemBoot" />
    </div>
  </div>

  <KryosSystemTerminal v-else />
</template>
