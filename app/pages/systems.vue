<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useSystemModalStore } from "#imports";
const systemModalStore = useSystemModalStore();
const FAST_STEP_PX = 75;
const SLOW_STEP_PX = 25;
const BASE_INTERVAL_TIME_MS = 500;
const parentLoadingDiv = ref<HTMLElement | null>(null);
const loadingBarMax = ref(0);

const loadingWidthPxs = ref(0);
useHead({
  title: "KRYOS | SYSTEMS",
});

function loadingBar() {
  let half_bar = loadingBarMax.value / 2;
  let interval = setInterval(() => {
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
      clearInterval(interval);
      return;
    }
  }, BASE_INTERVAL_TIME_MS);
}

onMounted(() => {
  //when page loads and component mounts
  // open the modal
  //systemModalStore.open();

  // on mount get the width o the parent div
  console.log("parentLoadingDiv : ", parentLoadingDiv.value?.clientWidth);
  if (parentLoadingDiv.value) {
    loadingBarMax.value = parentLoadingDiv.value?.clientWidth;
  }

  loadingBar();
});
</script>

<template>
  <div class="flex flex-col min-h-screen p-4">
    <h1 class="section-title w-fit">KRYOS // SYSTEMS</h1>
    <div class="flex flex-col gap-2">
      <h1>LOADING</h1>
      <div ref="parentLoadingDiv" class="w-200 h-10 border-2">
        <div
          :style="{ width: `${loadingWidthPxs}px` }"
          class="bg-neutral-400 h-9"
        ></div>
      </div>
    </div>
  </div>
</template>
