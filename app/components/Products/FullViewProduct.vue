<script lang="ts" setup>
import EX1Model from "~/assets/img/ex-1-no-bg.png";
import MKIModel from "~/assets/img/mk-i-no-bg.png";
import type { Platform } from "~/types/Platform";
import SummaryProduct from "./SummaryProduct.vue";
import ProductCTA from "./ProductCTA.vue";
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
  <div
    class="w-full min-h-[50vh] group flex flex-col gap-2 lg:flex-row items-center border-2 border-(--kryos-accent)/40 rounded-2xl trns justify-around relative hover:bg-(--kryos-bg-alt)"
  >
    <div class="relative trns group min-w-100 max-w-150">
      <img
        :src="selectedModel[model].imageSrc"
        alt="MKI Model with background"
        class="w-full z-20 border rounded-2xl border-(--kryos-accent)/80 trns hover:border-(--kryos-warn)"
      />
      <Absolute
        extra-class="relative bottom-20 left-0 -rotate-90 origin-bottom-left"
      >
        <div class="p-2 border-b-2 w-fit border-b-(--kryos-warn)">
          <span class="font-orbitron font-extrabold text-xl text-nowrap">
            {{ selectedModel[model].title }}
          </span>
        </div>
      </Absolute>
    </div>

    <div class="flex flex-col gap-4 relative">
      <SummaryProduct :model="model" />
      <ProductCTA
        to="/products/mk-1"
        linkLabel="Open MK-I Tactical Platform brief"
      />
      <ProductCTA to="#" linkLabel="Request MK-I technical dossier" />
    </div>
  </div>
</template>
