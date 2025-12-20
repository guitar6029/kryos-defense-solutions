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
    class="min-w-4xl max-w-5xl h-[80vh] flex flex-col items-center relative pb-60"
  >
    <svg
      class="w-full inset-0"
      viewBox="0 0 1354 2022"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      stroke-width="4"
    >
      <path
        d="M1058 0.5L1180.5 100.5V256.5H1280.5V813L1247.5 885.5V1397.5L1353 1509V1887.5L1247.5 1976.5H573.5L512.5 2021H167.5L45 1843V1586.5L0.5 1509V885.5L111.5 774V256.5L45 206.5V61.5H512.5L573.5 0.5H1058Z"
        stroke="var(--kryos-accent)"
      />
    </svg>

    <img
      :src="selectedModel[model].imageSrc"
      alt="MKI Model with background"
      class="absolute left-1/2 top-20 -translate-x-1/2 w-150 z-20"
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
