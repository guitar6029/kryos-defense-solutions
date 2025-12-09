<script lang="ts" setup>
import KryosCard, { type CardOption } from "./Cards/KryosCard.vue";
import Text3D from "./Text/Text3D.vue";
let interval: number | null = null;

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
  <div class="flex flex-row relative min-h-[50vh]">
    <div class="w-275">
      <img
        src="~/assets/img/protocol_01.jpg"
        alt="Advanced Systems"
        class="w-full h-full object-cover"
      />
    </div>
    <div
      class="text-6xl flex-1 flex flex-col gap-4 justify-center p-4 rounded-xl bg-(--kryos-bg)"
    >
      <h1 class="text-[5.5rem] font-bold text-(--kryos-warn)">
        [{{ systemsCards[0]?.title }}]
      </h1>
      <p>{{ systemsCards[0]?.text }}</p>
    </div>
  </div>

  <div class="flex flex-row relative min-h-[50vh]">
    <div
      class="text-6xl flex-1 flex flex-col gap-4 justify-center p-4 rounded-xl bg-(--kryos-bg)"
    >
      <h1 class="text-[5.5rem] font-bold text-(--kryos-warn)">
        [{{ systemsCards[1]?.title }}]
      </h1>
      <p>{{ systemsCards[1]?.text }}</p>
    </div>

    <div class="w-275">
      <img
        src="~/assets/img/protocol_02.jpg"
        alt="Advanced Systems"
        class="w-full h-full object-cover"
      />
    </div>
  </div>

  <div class="flex flex-row relative min-h-[50vh]">
    <div class="w-275">
      <img
        src="~/assets/img/interference_layers_01.jpg"
        alt="Advanced Systems"
        class="w-full h-full object-cover"
      />
    </div>
    <div
      class="text-6xl flex-1 flex flex-col gap-4 justify-center p-4 rounded-xl bg-(--kryos-bg)"
    >
      <h1 class="text-[5.5rem] font-bold text-(--kryos-warn)">
        [{{ systemsCards[2]?.title }}]
      </h1>
      <p>{{ systemsCards[2]?.text }}</p>
    </div>
  </div>
</template>
