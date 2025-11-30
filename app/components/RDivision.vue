<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
import KryosCard from "./Cards/KryosCard.vue";
</script>
<template>
  <div class="flex flex-col items-center gap-6 relative min-h-screen">
    <Absolute extra-class="top-50 left-0 w-200 rotate-180 opacity-50 -z-1">
      <KryosPanel :stroke-width="3" :option="5" />
    </Absolute>

    <Absolute extra-class="bottom-10 right-0 w-200 rotate-180 opacity-50 -z-1">
      <KryosPanel :stroke-width="3" :option="6" />
    </Absolute>

    <h2 class="section-title">Kryos Advanced</h2>
    <h2 class="section-title">Systems Division</h2>
    <p class="text-4xl max-w-4xl">
      Our Advanced Systems Division leads research into autonomous coordination,
      adaptive armor, and next-generation sensor architectures. Most of our work
      is never disclosed. What follows is only what's cleared for public
      release.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-6">
      <KryosCard
        title="Swarm Coordination Frameworks"
        text="Multi-unit orchestration protocols enabling synchronized behavior, distributed targeting, and adaptive formation control across autonomous ground platforms."
        :option="2"
      />

      <KryosCard
        title="Adaptive Mobility Systems"
        text="Real-time terrain analysis, traction optimization, and chassis morphing algorithms designed to maintain stability and maneuverability in hostile or unpredictable environments."
        :option="2"
      />

      <KryosCard
        title="Hardened AI Decision Pipelines"
        text="Compartmentalized inference layers engineered to maintain reliability under signal denial, environmental interference, and electronic warfare conditions."
        :option="2"
      />
    </div>
    <NuxtLink to="rdivision" class="link">Inside the R&D Division</NuxtLink>
  </div>
</template>
