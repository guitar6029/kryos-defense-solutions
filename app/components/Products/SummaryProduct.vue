<script lang="ts" setup>
import type { KryosModel } from "~/types/KryosModel";

defineProps<{
  model: KryosModel;
}>();

const selectedModel: Record<
  KryosModel,
  { title: string; fullTitle: string; summary: string }
> = {
  mk1: {
    title: "KRYOS MK-1",
    fullTitle: "Kryos MK-I Autonomous Tactical Drone",
    summary: `The Kryos MK-I is a multi-terrain ground platform designed for dense urban, industrial, and subterranean environments. Six-degree mobility, redundant sensor arrays, and modular payload interfaces allow MK-I units to operate continuously under adverse conditions.`,
  },
  ex1: {
    title: "KRYOS EX-1",
    fullTitle: "Kryos EX-1 Tactical ExoFrame",
    summary: `The Kryos EX-1 is a powered exoskeleton platform designed for high-load,
        high-risk operations. Humanoid articulation, assisted lift systems, and
        a hardened sensor spine allow a single operator to move, stabilize, and
        handle mass that would normally require a full team and heavy equipment.`,
  },
};
</script>

<template>
  <div class="relative flex border h-125">
    <div
      class="absolute bottom-0 left-0 -rotate-90 origin-bottom-left w-125 h-25 border translate-x-px flex flex-col items-center justify-center"
    >
      <span class="font-orbitron font-extrabold text-6xl">{{
        selectedModel[model].title
      }}</span>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 p-2 max-w-4xl">
      <h2 class="text-6xl">{{ selectedModel[model].fullTitle }}</h2>
      <p class="text-2xl">
        {{ selectedModel[model].summary }}
      </p>
    </div>
  </div>
</template>
