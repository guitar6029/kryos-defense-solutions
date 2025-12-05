<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>
<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center gap-4"
  >
    <Absolute
      extra-class="top-50 left-1/2 -translate-x-1/2 w-400 opacity-50 rotate-180"
    >
      <KryosPanel :option="4" />
    </Absolute>

    <Splitter right-text="SECTOR // OPERATIONAL BRIEFING" />

    <div class="flex flex-col items-center justify-center">
      <h2 class="section-title">What We Build</h2>
    </div>

    <div class="flex flex-col items-center justify-center gap-12">
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-6xl">Autonomous Ground Platforms</h1>
        <p class="text-4xl max-w-2xl">
          Multi-terrain drones engineered for patrol, interdiction, and
          perimeter security.
        </p>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-6xl">Intelligent Target Acquisition</h1>
        <p class="text-4xl max-w-2xl">
          Sensor fusion, threat classification, and precision response under
          strict rules of engagement.
        </p>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-6xl">Secure Systems Integration</h1>
        <p class="text-4xl max-w-2xl">
          Seamless integration with existing command, surveillance, and
          infrastructure networks.
        </p>
      </div>
    </div>
  </div>
</template>
