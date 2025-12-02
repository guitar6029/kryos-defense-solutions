<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MK1Model from "~/assets/img/mk-i-no-bg.png";
import MK1Model_side from "~/assets/img/mk-i-side-a-trns.png";

import EX1Model from "~/assets/img/ex-1-no-bg.png";
import EX1Model_side from "~/assets/img/ex-1-side-b-trns.png";
import type { KryosModel } from "~/types/KryosModel";

let interval: number | null = null;

const props = defineProps<{
  model: KryosModel;
}>();

const currentImg = ref(0);

const selectedModel: Record<KryosModel, { img: string[] }> = {
  mk1: {
    img: [MK1Model, MK1Model_side],
  },
  ex1: {
    img: [EX1Model, EX1Model_side],
  },
};

function changeImg() {
  console.log("change img");
  interval = setInterval(() => {
    if (currentImg.value === selectedModel[props.model].img.length - 1) {
      // set it to zero again
      currentImg.value = 0;
    } else {
      currentImg.value = currentImg.value + 1;
    }
  }, 6500);
}

onMounted(() => {
  changeImg();
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <img
      :src="selectedModel[model].img[currentImg]"
      alt=""
      class="w-200 h-200 object-contain"
    />
    <div class="flex items-center justify-center gap-2">
      <div
        v-for="(imgSrc, idx) in selectedModel[model].img.length"
        :key="idx"
        class="w-6 h-6 border"
        :class="{ 'border-(--kryos-accent-bright)': currentImg === idx }"
      ></div>
    </div>
  </div>
</template>
