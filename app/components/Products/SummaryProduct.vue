<script lang="ts" setup>
import type { Platform } from "~/types/Platform";
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
  <div class="relative flex">
    <div class="flex flex-col gap-2 pl-2 pt-4 min-w-2xl max-w-4xl">
      <h2 class="text-4xl">
        {{ selectedModel[model].fullTitle }}
      </h2>
      <p class="text-2xl max-w-2xl">
        {{ selectedModel[model].summary }}
      </p>
    </div>
  </div>
</template>
