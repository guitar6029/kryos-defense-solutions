<script lang="ts" setup>
import type { Platform } from "~/types/Platform";
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
defineProps<{
  model: Platform;
}>();

const selectedModel: Record<
  Platform,
  { title: string; fullTitle: string; summary: string }
> = {
  MK: {
    title: "KRYOS MK-1",
    fullTitle: "Kryos MK-I Autonomous Tactical Drone",
    summary: `The Kryos MK-I is a multi-terrain ground platform designed for dense urban, industrial, and subterranean environments. Six-degree mobility, redundant sensor arrays, and modular payload interfaces allow MK-I units to operate continuously under adverse conditions.`,
  },
  EX: {
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
    <Absolute extra-class="absolute top-0 -left-4/4 w-75 xl:w-225 right-0">
      <KryosPanel stroke="var(--kryos-accent)" :option="8" />
    </Absolute>

    <div
      class="absolute bottom-0 left-0 -rotate-90 origin-bottom-left w-125 h-25 border translate-x-px flex flex-col items-center justify-center"
    >
      <span class="font-orbitron font-extrabold text-4xl">{{
        selectedModel[model].title
      }}</span>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 p-2 max-w-4xl">
      <h2 class="text-4xl kryos-bracket">
        {{ selectedModel[model].fullTitle }}
      </h2>
      <p class="text-2xl max-w-2xl">
        {{ selectedModel[model].summary }}
      </p>
    </div>
  </div>
</template>
