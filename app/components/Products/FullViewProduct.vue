<script lang="ts" setup>
import EX1Model from "~/assets/img/ex-1-no-bg.png";
import MKIModel from "~/assets/img/mk-i-no-bg.png";
import type { Platform } from "~/types/Platform";
import Absolute from "../Wrapper/Absolute.vue";

withDefaults(
  defineProps<{
    model: Platform;
    hasTitle?: boolean;
  }>(),
  {
    model: "MK",
    hasTitle: true,
  }
);

const selectedModel: Record<Platform, { title: string; imageSrc: string }> = {
  MK: {
    title: "KRYOS MK-I",
    imageSrc: MKIModel,
  },
  EX: {
    title: "KRYOS EX-I",
    imageSrc: EX1Model,
  },
};
</script>

<template>
  <!-- bg-[radial-gradient(circle_at_center,var(--kryos-mk-bg),transparent)] -->
  <div
    class="min-w-4xl max-w-5xl h-[50vh] flex flex-col items-center relative pb-60"
  >
    <img
      :src="selectedModel[model].imageSrc"
      alt="MKI Model with background"
      class="absolute left-1/2 -translate-x-1/2 w-150 z-20"
    />

    <Absolute
      extra-class="absolute bottom-1/2 left-20  -rotate-90 origin-bottom-left"
    >
      <div class="p-2 border-b-6 border-b-(--kryos-warn)">
        <span class="font-orbitron font-extrabold text-xl text-nowrap">
          {{ selectedModel[model].title }}
        </span>
      </div>
    </Absolute>
  </div>
</template>
