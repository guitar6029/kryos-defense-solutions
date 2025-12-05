<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>
<template>
  <div
    class="flex flex-col min-h-screen gap-2 relative bg-(--kryos-bg-alt) z-1"
  >
    <Absolute
      extra-class="bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 sm:w-100 lg:w-400 -z-1 opacity-20"
    >
      <KryosPanel :option="14" :stroke-width="1" stroke="gray" />
    </Absolute>

    <Splitter right-text="SECTOR // DEPLOYMENTS" />

    <div class="flex flex-col items-center gap-12 text-[4rem] mt-20">
      <div class="flex flex-row items-center gap-8">
        <span class="font-bold text-(--kryos-warn) font-orbitron">[AIR]</span>
        <span class="text-[3.5rem]"
          >High-altitude ISR / interception / overwatch</span
        >
      </div>
      <div class="flex flex-row items-center gap-8">
        <span class="font-bold text-(--kryos-warn) font-orbitron">[LAND]</span>
        <span class="text-[3.5rem]"
          >High-altitude ISR / interception / overwatch</span
        >
      </div>
      <div class="flex flex-row items-center gap-8">
        <span class="font-bold text-(--kryos-warn) font-orbitron">[SEA]</span>
        <span class="text-[3.5rem]"
          >High-altitude ISR / interception / overwatch</span
        >
      </div>
      <div class="flex flex-row items-center gap-8">
        <span class="font-bold text-(--kryos-warn) font-orbitron"
          >[DIGITAL]</span
        >
        <span class="text-[3.5rem]"
          >High-altitude ISR / interception / overwatch</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes kryosHover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

.hovering-anim {
  display: inline-block;
  animation: kryosHover 2.5s ease-in-out infinite;
}
</style>
