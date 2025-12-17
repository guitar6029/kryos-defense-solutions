<script lang="ts" setup>
import EX1Model from "~/assets/img/ex-1-no-bg.png";
import MKIModel from "~/assets/img/mk-i-no-bg.png";
import type { Platform } from "~/types/Platform";
import FullViewProductAccents from "./FullViewProductAccents.vue";

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
  <div
    class="w-full h-[50vh] flex flex-col items-center bg-[radial-gradient(circle_at_center,var(--kryos-mk-bg),transparent)] relative pb-60"
  >
    <img
      :src="selectedModel[model].imageSrc"
      alt="MKI Model with background"
      class="absolute left-1/2 -translate-x-1/2 w-150 z-20"
    />

    <FullViewProductAccents
      v-if="hasTitle"
      :text="selectedModel[model].title"
    />
  </div>
</template>
