<script lang="ts" setup>
import { watch } from "vue";

const props = defineProps<{
  loading: boolean;
}>();

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const FAST_STEP_PX = 75;
const SLOW_STEP_PX = 35;
const BASE_INTERVAL_TIME_MS = 500;
const parentLoadingDiv = ref<HTMLElement | null>(null);
const loadingBarMax = ref(0);
const loadingWidthPxs = ref(0);

watch(
  () => props.loading,
  async (isLoading) => {
    if (!isLoading) return stopLoading();

    // ref becomes available after render
    await nextTick();
    if (!parentLoadingDiv.value) return;

    loadingBarMax.value = parentLoadingDiv.value.clientWidth;
    loadingWidthPxs.value = 0;
    loadingBar();
  },
  { immediate: true }
);

function stopLoading() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
  //reset loading bar px
  loadingWidthPxs.value = 0;
}

function loadingBar() {
  stopLoading();

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
        intervalId.value = null;
      }

      return;
    }
  }, BASE_INTERVAL_TIME_MS);
}
</script>

<template>
  <div class="flex flex-col gap-1 font-mono">
    <h1 class="text-[.8rem]">LOADING...</h1>
    <div class="flex flex-row items-center gap-2">
      <div class="text-[2rem] h-12">[</div>
      <div
        ref="parentLoadingDiv"
        class="w-200 h-4 border-2 border-(--kryos-accent)/50"
      >
        <div
          :style="{ width: `${loadingWidthPxs}px` }"
          class="bg-(--kryos-metal-light) h-3"
        ></div>
      </div>
      <div class="text-[2rem] h-12">]</div>
    </div>
  </div>
</template>
