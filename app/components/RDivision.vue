<script lang="ts" setup>
import { ref, computed } from "vue";
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
import KryosCard, { type CardOption } from "./Cards/KryosCard.vue";

let interval: number | null = null;
const currentCard = ref<number>(0);
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

const activeCard = computed(() => {
  return systemsCards[currentCard.value];
});

onMounted(() => {
  interval = setInterval(() => {
    if (currentCard.value === systemsCards.length - 1) {
      currentCard.value = 0;
    } else {
      currentCard.value = currentCard.value + 1;
    }
  }, 5000);
});

onBeforeUnmount(() => {
  //clean up
  if (interval !== null) {
    clearInterval(interval);
  }
});
</script>
<template>
  <div class="flex flex-col items-center gap-12 relative min-h-screen">
    <Absolute extra-class="top-0 left-0 w-full rotate-180 opacity-50 -z-1">
      <KryosPanel :stroke-width="3" :option="5" />
    </Absolute>

    <Absolute extra-class="bottom-10 right-0 w-200 rotate-180 opacity-50 -z-1">
      <KryosPanel :stroke-width="1" :option="6" />
    </Absolute>

    <Splitter right-text="SECTOR // SYSTEM DIVISION" />

    <h2 class="section-title">Kryos Advanced</h2>
    <h2 class="section-title">Systems Division</h2>
    <div class="flex flex-col items-center gap-6">
      <p class="text-4xl p-4 max-w-4xl">
        Our
        <span class="text-(--kryos-warn) font-bold"
          >[Advanced Systems Division]</span
        >
        leads research into autonomous coordination, adaptive armor, and
        next-generation sensor architectures. Most of our work is never
        disclosed. What follows is only what's cleared for public release.
      </p>
      <NuxtLink to="rdivision" class="link">Inside the R&D Division</NuxtLink>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-6">
      <KryosCard
        :title="activeCard?.title"
        :text="activeCard?.text"
        :option="activeCard?.option ?? 2"
      />
    </div>

    <div class="flex items-center gap-4">
      <div
        v-for="(imgSrc, idx) in systemsCards.length"
        :key="idx"
        class="w-6 h-6 border rounded-full"
        :class="{ 'border-(--kryos-accent-bright)': currentCard === idx }"
      ></div>
    </div>
  </div>
</template>
