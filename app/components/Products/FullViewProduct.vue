<script lang="ts" setup>
import MKIModel from "~/assets/img/mk-i-no-bg.png";
import EX1Model from "~/assets/img/ex-1-no-ng.png";
import Absolute from "../Wrapper/Absolute.vue";
import type { KryosModel } from "~/types/KryosModel";

defineProps<{
  model: KryosModel;
}>();

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
  <div class="w-full h-screen bg-(--kryos-mk-bg) relative pb-60">
    <h2
      class="absolute top-10 left-1/2 -translate-x-1/2 font-orbitron font-extrabold sm:text-6xl md:text-8xl xl:text-[10rem] lg:text-nowrap z-10"
    >
      {{ selectedModel[model].title }}
    </h2>
    <h2
      class="absolute top-12 left-1/2 -translate-x-1/2 font-orbitron text-black font-extrabold sm:text-6xl md:text-8xl xl:text-[10rem] lg:text-nowrap z-11 opacity-90"
    >
      {{ selectedModel[model].title }}
    </h2>
    <img
      :src="selectedModel[model].imageSrc"
      alt="MKI Model with background"
      class="w-500 absolute left-1/2 -translate-x-1/2 -bottom-24 lg:-bottom-32"
    />
    <Absolute
      extra-class="absolute bottom-50 left-30 -rotate-90 origin-bottom-left"
    >
      <div class="p-2 border-b-12 border-b-(--kryos-warn)">
        <span class="font-orbitron font-extrabold text-8xl">{{
          selectedModel[model].title
        }}</span>
      </div>
    </Absolute>

    <!-- <Absolute
          extra-class="absolute top-10 left-20 inline-flex gap-4 opacity-40 "
        >
          <KryosPanel
            option="right"
            fill="var(--kryos-warn)"
            extra-class="w-20"
          />
          <KryosPanel
            option="right"
            fill="var(--kryos-warn)"
            extra-class="w-8"
          />
          <KryosPanel
            option="right"
            fill="var(--kryos-warn)"
            extra-class="w-4"
          />
          <KryosPanel
            option="right"
            fill="var(--kryos-warn)"
            extra-class="w-2"
          />
        </Absolute> -->
  </div>
</template>
