<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import EX1Model from "~/assets/img/ex-1-no-bg.png";
import MKIModel from "~/assets/img/mk-i-no-bg.png";
import type { KryosModel } from "~/types/KryosModel";
import KryosPanel from "../Panels/KryosPanel.vue";

withDefaults(
  defineProps<{
    model: KryosModel;
    hasTitle?: boolean;
  }>(),
  {
    model: "mk1",
    hasTitle: true,
  }
);

const selectedModel: Record<KryosModel, { title: string; imageSrc: string }> = {
  mk1: {
    title: "KRYOS MK-I",
    imageSrc: MKIModel,
  },
  ex1: {
    title: "KRYOS EX-I",
    imageSrc: EX1Model,
  },
};
</script>

<template>
  <div
    class="w-full h-[50vh] xl:h-screen flex flex-col items-center bg-[radial-gradient(circle_at_center,var(--kryos-mk-bg),transparent)] relative pb-60"
  >
    <div class="relative" v-if="hasTitle">
      <h2
        class="absolute top-10 left-1/2 -translate-x-1/2 font-orbitron font-extrabold text-6xl md:text-8xl xl:text-[10rem] text-nowrap z-10"
      >
        {{ selectedModel[model].title }}
      </h2>
      <h2
        class="absolute top-12 left-1/2 -translate-x-1/2 font-orbitron text-black font-extrabold text-6xl md:text-8xl xl:text-[10rem] text-nowrap z-11 opacity-90"
      >
        {{ selectedModel[model].title }}
      </h2>
    </div>
    <img
      :src="selectedModel[model].imageSrc"
      alt="MKI Model with background"
      class="absolute left-1/2 -translate-x-1/2 w-full max-w-200 xl:max-w-400 -bottom-24 lg:-bottom-32 z-15"
    />

    <Absolute extra-class="absolute bottom-0 w-125 h-20 right-0 ">
      <div class="bg-(--kryos-bg) w-full h-full"></div>
    </Absolute>

    <Absolute extra-class="absolute top-0 w-125 h-20 left-0">
      <div class="bg-(--kryos-bg) w-full h-full"></div>
    </Absolute>

    <Absolute extra-class="absolute top-0 w-75 xl:w-225 right-0 rotate-180">
      <KryosPanel stroke="var(--kryos-accent)" :option="6" />
    </Absolute>

    <Absolute extra-class="absolute top-0 w-50 xl:w-125 left-0">
      <KryosPanel stroke="var(--kryos-accent)" :option="6" />
    </Absolute>

    <Absolute
      extra-class="absolute bottom-0 left-20 xl:bottom-50 xl:left-30 -rotate-90 origin-bottom-left"
    >
      <div class="p-2 border-b-6 border-b-(--kryos-warn)">
        <span
          class="font-orbitron font-extrabold text-4xl xl:text-8xl text-nowrap"
          >{{ selectedModel[model].title }}</span
        >
      </div>
    </Absolute>
  </div>
</template>
