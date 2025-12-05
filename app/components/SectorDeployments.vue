<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
import SwarmDrones from "~/assets/img/swarm_drones.jpg";
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
      <div
        class="flex w-full h-150 flex-row items-center gap-8 bg-(--kryos-bg) p-4 relative z-1"
      >
        <div
          class="absolute flex items-center gap-4 left-1/2 -translate-x-1/2 animate-brief"
        >
          <span class="font-bold text-(--kryos-warn) font-orbitron text-[6rem]"
            >[AIR]</span
          >
          <div
            class="text-[2.5rem] flex-1 text-(--kryos-text-high) font-bold bg-black/55 px-6 py-2"
          >
            <span>High-altitude ISR / interception / overwatch</span>
          </div>
        </div>

        <!-- PANEL WRAPPER -->
        <Absolute
          class="w-250 h-150 left-1/2 -translate-x-1/2 flex items-center justify-center -z-1 opacity-50"
        >
          <svg
            class="w-full h-auto"
            viewBox="0 0 670 307"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <!-- Your panel shape -->
              <clipPath id="platformAir">
                <path
                  d="M0.5 114.5V76L6.13576 57.5L23.5 0.5H66H188L205.5 8H483.5L504.5 0.5H539L581 42.5V76H565V114.5H581L603.229 163L650.208 265.5L669 306.5H647L616.5 295H551L524 306.5H407.5L381 295H216L195.5 306.5H155.5L137.336 284L117.5 265.5L129.5 258L59 163H39.6536L0.5 114.5Z"
                />
              </clipPath>
            </defs>

            <image
              :href="SwarmDrones"
              width="670"
              height="307"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#platformAir)"
            />

            <path
              d="M0.5 114.5V76L6.13576 57.5L23.5 0.5H66H188L205.5 8H483.5L504.5 0.5H539L581 42.5V76H565V114.5H581L603.229 163L650.208 265.5L669 306.5H647L616.5 295H551L524 306.5H407.5L381 295H216L195.5 306.5H155.5L137.336 284L117.5 265.5L129.5 258L59 163H39.6536L0.5 114.5Z"
              fill="none"
              stroke="var(--kryos-accent)"
              stroke-width="2"
            />
          </svg>
        </Absolute>
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

.animate-brief {
  animation: briefIn 0.35s ease-out forwards;
}

@keyframes briefIn {
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
