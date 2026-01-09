<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Absolute from "../Wrapper/Absolute.vue";
import KryosSignature from "../KryosSignature.vue";
import MK1Model from "~/assets/img/mk-i-no-bg.png";
import MK1Model_side from "~/assets/img/mk-i-side-a-trns.png";

import EX1Model from "~/assets/img/ex-1-no-bg.png";
import EX1Model_side from "~/assets/img/ex-1-side-b-trns.png";
import type { Platform } from "~/types/Platform";

let interval = <ReturnType<typeof setTimeout> | null>null;

const props = defineProps<{
  model: Platform;
  hasSignature?: boolean;
}>();

const currentImg = ref(0);

const selectedModel: Record<Platform, { img: string[] }> = {
  MK: {
    img: [MK1Model, MK1Model_side],
  },
  EX: {
    img: [EX1Model, EX1Model_side],
  },
};

function changeImg() {
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
    <Transition name="fade" mode="out-in">
      <img
        :key="`${model}-${currentImg}`"
        :src="selectedModel[model].img[currentImg]"
        :alt="`${model}-model`"
        class="w-200 h-200 object-contain"
      />
    </Transition>
    <div class="relative flex items-center justify-center gap-2">
      <Absolute
        extra-class="bottom-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-2 -z-1"
      >
        <KryosSignature />
      </Absolute>
      <div
        v-for="(_, idx) in selectedModel[model].img.length"
        :key="idx"
        class="w-6 h-6 border"
        :class="{ 'border-(--kryos-accent-bright)': currentImg === idx }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 350ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
