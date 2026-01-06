<script lang="ts" setup>
import Energy from "../svg/Energy.vue";
import Restricted from "../svg/Restricted.vue";
import Transit from "../svg/Transit.vue";
import CampusSecurity from "../svg/CampusSecurity.vue";
import type { Component } from "vue";
export type ProductPanel = 1 | 2 | 3 | 4;
import KryosFrame from "../Panels/KryosFrame.vue";

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
  <div class="w-full xl:max-w-4xl min-h-65 flex flex-col relative">
    <KryosFrame
      svg-class="w-full h-auto"
      absolute-extra-class="inset-[-1.5rem]"
      svg-path="M230.5 0.5L126.5 67H23V423L0.5 449V708.5L86 808.5H575.5L709 883H1276L1354 834.5H1647L1754.5 668V423L1780.5 360V156L1680.5 67H1380L1250 41H746L671.5 0.5H230.5Z"
      svg-view-box="0 0 1781 884"
      preserve-aspect-ratio="none"
      :svg-stroke-width="4"
    />

    <div class="relative flex flex-col p-4 md:p-6 lg:p-7">
      <span class="kryos-text mb-1"
        >PROFILE // {{ selectedProfile[productPanel].id }}</span
      >
      <h3 class="text-2xl text-(--kryos-warn) font-bold mb-3">
        [ {{ selectedProfile[productPanel].title }} ]
      </h3>
      <div class="flex items-start gap-4">
        <div class="min-w-25 max-w-25 text-(--kryos-accent)">
          <component :is="selectedProfile[productPanel].svgIcon" />
        </div>
        <p class="text-2xl max-w-xl">
          {{ selectedProfile[productPanel].summary }}
        </p>
      </div>
    </div>
  </div>
</template>
