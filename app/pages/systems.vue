<script lang="ts" setup>
import { storeToRefs } from "#imports";
import { onMounted, ref, onBeforeUnmount, watch, nextTick } from "vue";
import { useSystemModalStore, type SystemMode } from "#imports";
import { useSystemStateStore } from "#imports";
import KryosSystemTerminal from "~/components/Systems/KryosSystemTerminal.vue";

definePageMeta({ layout: "systems" });

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

const systemModalStore = useSystemModalStore();

const systemStateStore = useSystemStateStore();
const { currentSystemMode } = storeToRefs(systemStateStore);

const FAST_STEP_PX = 75;
const SLOW_STEP_PX = 35;
const BASE_INTERVAL_TIME_MS = 500;

const parentLoadingDiv = ref<HTMLElement | null>(null);
const loadingBarMax = ref(0);

const loadingWidthPxs = ref(0);
useHead({
  title: "KRYOS | SYSTEMS",
});

function loadingBar() {
  let half_bar = loadingBarMax.value / 2;
  intervalId.value = setInterval(() => {
    if (loadingWidthPxs.value < half_bar) {
      //first 50 % fast
      loadingWidthPxs.value += FAST_STEP_PX;
    } else {
      //the other 50 % , slowed down += valuee
      loadingWidthPxs.value += SLOW_STEP_PX;
    }
    if (loadingWidthPxs.value >= loadingBarMax.value) {
      //clear the interval
      loadingWidthPxs.value = Math.min(
        loadingWidthPxs.value,
        loadingBarMax.value
      );
      if (intervalId.value) {
        clearInterval(intervalId.value);
        //set the mode to operational
        systemStateStore.setToOperationalMode();
      }

      return;
    }
  }, BASE_INTERVAL_TIME_MS);
}

onMounted(() => {
  //when page loads and component mounts
  // open the modal
  systemModalStore.open();
});

onBeforeUnmount(() => {
  //before leaving, reseet the mode to 'locked'
  systemStateStore.resetMode();
});

// WATCHERS
watch(currentSystemMode, async (mode: SystemMode) => {
  if (mode !== "loading") return;

  // ref becomes available after render
  await nextTick();

  if (!parentLoadingDiv.value) return;
  loadingBarMax.value = parentLoadingDiv.value.clientWidth;

  //reset loading bar value
  loadingWidthPxs.value = 0;
  loadingBar();
});
</script>

<template>
  <div
    v-if="currentSystemMode === 'locked' || currentSystemMode === 'loading'"
    class="flex flex-col h-screen items-center justify-center"
  >
    <div v-if="currentSystemMode === 'loading'" class="flex flex-col gap-2">
      <h1>LOADING</h1>
      <div ref="parentLoadingDiv" class="w-200 h-10 border-2">
        <div
          :style="{ width: `${loadingWidthPxs}px` }"
          class="bg-neutral-400 h-9"
        ></div>
      </div>
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
