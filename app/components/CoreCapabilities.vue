<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import DotDashed from "./svg/DotDashed.vue";
import AutonomousPlatform from "./svg/AutonomousPlatform.vue";
import Target from "./svg/Target.vue";
import SecureConnection from "./svg/SecureConnection.vue";
import KryosSectionHeader from "./KryosSectionHeader.vue";
const operationSections = [
  {
    title: "Autonomous Ground Platforms",
    text: "Multi-terrain drones engineered for patrol, interdiction, and perimeter security.",
    icon: AutonomousPlatform,
  },
  {
    title: "Intelligent Target Acquisition",
    text: "Sensor fusion, threat classification, and precision response under strict rules of engagement.",
    icon: Target,
  },
  {
    title: "Secure Systems Integration",
    text: "Seamless integration with existing command, surveillance, and infrastructure networks.",
    icon: SecureConnection,
  },
];
</script>
<template>
  <KryosSectionHeader right-text="SECTOR // OPERATIONAL BRIEFING" />
  <div
    class="min-h-screen relative flex flex-col items-center justify-center gap-4 overflow-hidden"
  >
    <img
      src="../assets/img/shapes//shape3.jpg"
      alt="Futuristic metallic structures with orange glow"
      class="absolute inset-0 w-full h-full object-cover -z-10 opacity-70"
    />

    <Absolute
      extra-class="bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-300 opacity-5 -z-1"
    >
      <DotDashed />
    </Absolute>

    <div
      class="flex flex-col items-center justify-center gap-12 p-12 z-10 relative"
    >
      <div
        v-for="(operation, idx) in operationSections"
        :key="`operation-${idx}`"
        class="w-full lg:max-w-200 flex flex-col justify-center gap-2 rounded-2xl bg-(--kryos-bg)/40 trns hover:scale-105 hover:bg-(--kryos-bg)/80 p-4"
      >
        <h1 class="text-4xl text-(--kryos-warn) font-bold">
          [{{ operation.title }}]
        </h1>
        <div class="flex items-start gap-2">
          <div class="w-25 text-(--kryos-accent)">
            <component :is="operation.icon" class="w-full h-auto" />
          </div>
          <p class="text-4xl max-w-2xl">
            {{ operation.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
