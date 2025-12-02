<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import KryosCard from "../Cards/KryosCard.vue";
</script>

<template>
  <section
    class="flex flex-col items-center gap-4 bg-(--kryos-bg-alt) p-4 relative min-h-[50vh]"
  >

  <Absolute extra-class="top-0 left-0  w-full z-1 rotate-180">
    <div class="w-full h-100 border-b-2 border-t-2 "></div>
  </Absolute>
    
    <Absolute extra-class="bottom-10 left-20 w-50 h-300  rotate-180">
      <KryosPanel :option="10" />
    </Absolute>
    
    <Absolute extra-class="bottom-1/2 right-20 w-50 h-300 ">
      <KryosPanel :option="10" />
    </Absolute>

    <h2 class="section-title">Upcoming Platforms</h2>
    <KryosCard
      title="Kryos MK-II (Concept Stage)"
      text="A heavier, armor-enhanced variant designed for contested environments
        and direct interface with mechanized units."
      :option="2"
      extra-class="z-20 relative"
    />

    <KryosCard
      title="Kryos Aerial Recon Node (ARN-Series)"
      text="A heavier, armor-enhanced variant designed for contested environments
        and direct interface with mechanized units."
      :option="2"
    />

    <KryosCard
      title="Kryos Swarm Coordination Package"
      text="Software layer enabling multi-unit coordination for coverage,
        redundancy, and complex perimeter management."
      :option="2"
    />
  </section>
</template>
