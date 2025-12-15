<script lang="ts" setup>
import type { CardOption } from "./Cards/KryosCard.vue";

const systemsCards: { title: string; text: string; option: CardOption }[] = [
  {
    title: "Swarm Coordination Frameworks",
    text: "Multi-unit orchestration protocols enabling synchronized behavior, distributed targeting, and adaptive formation control across autonomous ground platforms.",
    option: 2,
  },
  {
    title: "Adaptive Mobility Systems",
    text: "Real-time terrain analysis, traction optimization, and chassis morphing algorithms designed to maintain stability and maneuverability in hostile or unpredictable environments.",
    option: 2,
  },
  {
    title: "Hardened AI Decision Pipelines",
    text: "Compartmentalized inference layers engineered to maintain reliability under signal denial, environmental interference, and electronic warfare conditions.",
    option: 2,
  },
];
</script>
<template>
  <Divider right-text="SECTOR // Hardened AI Decision Pipelines" />
  <div class="flex flex-col md:flex-row relative min-h-[50vh]">
    <div class="w-full md:w-150 overflow-hidden">
      <img
        src="~/assets/img/protocol_01.jpg"
        alt="Advanced Systems"
        class="w-full h-full object-cover trns-slow hover:scale-160"
      />
    </div>
    <div
      class="text-5xl flex-1 flex flex-col gap-4 items-center justify-center p-4 rounded-xl trns bg-(--kryos-bg) hover:bg-(--kryos-bg-alt)/50"
    >
      <h1 class="text-[4.5rem] font-bold text-(--kryos-warn)">
        [{{ systemsCards[0]?.title }}]
      </h1>
      <p class="w-full md:max-w-3xl">{{ systemsCards[0]?.text }}</p>
    </div>
  </div>

  <div class="flex flex-col-reverse md:flex-row relative min-h-[50vh]">
    <div
      class="text-5xl flex-1 flex flex-col gap-4 items-center justify-center p-4 rounded-xl trns bg-(--kryos-bg) hover:bg-(--kryos-bg-alt)/50"
    >
      <h1 class="text-[4.5rem] font-bold text-(--kryos-warn)">
        [{{ systemsCards[1]?.title }}]
      </h1>
      <p class="w-full md:max-w-3xl">{{ systemsCards[1]?.text }}</p>
    </div>

    <div class="w-full md:w-150 overflow-hidden">
      <img
        src="~/assets/img/protocol_02.jpg"
        alt="Advanced Systems"
        class="w-full h-full object-cover trns-slow hover:scale-160"
      />
    </div>
  </div>

  <div class="flex flex-col md:flex-row relative min-h-[50vh]">
    <div class="w-full md:w-150 overflow-hidden">
      <img
        src="~/assets/img/interference_layers_01.jpg"
        alt="Advanced Systems"
        class="w-full h-full object-cover trns-slow hover:scale-160"
      />
    </div>
    <div
      class="text-5xl flex-1 flex flex-col gap-4 items-center justify-center p-4 rounded-xl trns bg-(--kryos-bg) hover:bg-(--kryos-bg-alt)/50"
    >
      <h1 class="text-[4.5rem] font-bold text-(--kryos-warn)">
        [{{ systemsCards[2]?.title }}]
      </h1>
      <p class="w-full md:max-w-3xl">{{ systemsCards[2]?.text }}</p>
    </div>
  </div>
</template>
