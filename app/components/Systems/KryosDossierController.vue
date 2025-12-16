<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosArcs from "../svg/Systems/KryosArcs.vue";
import KryosCallout from "./KryosCallout.vue";
</script>

<template>
  <div
    class="flex flex-col gap-6 p-4 h-screen bg-linear-180 from-bg-(--kryos-bg) to-gray-700 relative"
  >
    <KryosArcs />

    <Absolute
      extra-class="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
    >
      <div class="flex flex-col items-center justify-center relative">
        <KryosCallout
          :anchor="{ left: '-30rem', bottom: '5rem' }"
          wClass="w-110"
          hClass="h-26"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)"
              >[Autonomous Control Core]</span
            >
            <span>Low-latency adaptive decision pipelines</span>
          </div>
        </KryosCallout>

        <KryosCallout
          :anchor="{ left: '-25rem', bottom: '20rem' }"
          wClass="w-100"
          hClass="h-24"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)"
              >[Hardened Core Chassis]</span
            >
            <span>Isolated compute, power, and mobility subsystems</span>
          </div>
        </KryosCallout>

        <KryosCallout
          :anchor="{ left: '10rem', bottom: '2rem' }"
          wClass="w-105"
          hClass="h-24"
          showLine
          line-from="tc"
          line-len="10rem"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)">[Sensor Suite]</span>
            <span>Thermal, LIDAR, acoustic, inertial mapping</span>
          </div>
        </KryosCallout>

        <KryosCallout
          :anchor="{ right: '-28rem', top: '1rem' }"
          wClass="w-110"
          hClass="h-24"
          showLine
          line-from="bl"
          line-len="15rem"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)">[Communications]</span>
            <span>Encrypted multi-channel command + telemetry</span>
          </div>
        </KryosCallout>

        <KryosCallout
          :anchor="{ right: '-30rem', top: '15rem' }"
          wClass="w-100"
          hClass="h-24"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)"
              >[Mobility Envelope]</span
            >
            <span>Floor, wall, and overhead traversal</span>
          </div>
        </KryosCallout>

        <KryosCallout
          :anchor="{ right: '-26rem', bottom: '2rem' }"
          wClass="w-110"
          hClass="h-26"
          showLine
          line-from="lc"
          line-len="15rem"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)"
              >[Modular Payload]</span
            >
            <span>Two configurable mission hardpoints</span>
          </div>
        </KryosCallout>

        <img
          src="~/assets/img/mk-i-side-a-trns.png"
          alt="MK-1"
          class="w-[min(60rem,70vw)]"
        />
      </div>
    </Absolute>

    <Absolute
      extra-class="top-20 left-[clamp(1rem,4vw,10rem)] flex flex-col gap-2 w-100 items-center justify-center"
    >
      <div class="absolute inset-0"></div>
      <div class="relative flex flex-col gap-1 z-1 max-w-2xl top-10">
        <h2 class="model-title">KRYOS MK-I Tactical Platform</h2>
        <p>
          Autonomous six-legged ground platform engineered for dense urban,
          industrial, and subterranean environments.
        </p>
      </div>
    </Absolute>
  </div>
</template>

<style scoped>
.model-title {
  font-family: "Orbitron", sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  border-bottom: 4px solid;
}
</style>
