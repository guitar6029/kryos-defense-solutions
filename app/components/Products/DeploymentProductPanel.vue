<script lang="ts" setup>
import Energy from "../svg/Energy.vue";
import Restricted from "../svg/Restricted.vue";
import Transit from "../svg/Transit.vue";
import CampusSecurity from "../svg/CampusSecurity.vue";
import type { Component } from "vue";
export type ProductPanel = 1 | 2 | 3 | 4;

defineProps<{
  productPanel: ProductPanel;
}>();

const selectedProfile: Record<
  ProductPanel,
  { id: string; title: string; svgIcon: Component; summary: string }
> = {
  1: {
    id: "01",
    title: "Tier-1 Corporate Campus Security",
    svgIcon: CampusSecurity,
    summary:
      "MK-I units dynamically patrol access corridors, loading bays, and server infrastructure while coordinating with fixed surveillance assets.",
  },
  2: {
    id: "02",
    title: "Transit & Subterranean Infrastructure",
    svgIcon: Transit,
    summary:
      "MK-I units dynamically patrol access corridors, loading bays, and server infrastructure while coordinating with fixed surveillance assets.",
  },
  3: {
    id: "03",
    title: "Energy & Industrial Facilities",
    svgIcon: Energy,
    summary:
      "Equipped with specialized payloads for gas detection, heat mapping, and operational anomaly detection in refineries and heavy-manufacturing plants.",
  },
  4: {
    id: "04",
    title: "Restricted Black-Site Operations",
    svgIcon: Restricted,
    summary:
      "Certain deployments operate under full classification, with modified firmware and non-disclosed payload configurations.",
  },
};
</script>

<template>
  <div class="w-full xl:max-w-4xl flex flex-col gap-2 p-4 border">
    <span class="font-bold"
      >PROFILE // {{ selectedProfile[productPanel].id }}</span
    >
    <h3 class="text-4xl text-(--kryos-warn) font-bold">
      [ {{ selectedProfile[productPanel].title }} ]
    </h3>
    <div class="flex items-start gap-2">
      <div class="min-w-25 max-w-25 text-(--kryos-accent)">
        <component :is="selectedProfile[productPanel].svgIcon" />
      </div>
      <p class="text-4xl max-w-3xl">
        {{ selectedProfile[productPanel].summary }}
      </p>
    </div>
  </div>
</template>
