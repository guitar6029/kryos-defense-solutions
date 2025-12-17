<script lang="ts" setup>
import type { Callout } from "~/types/Callout";
import Absolute from "../Wrapper/Absolute.vue";
import KryosArcs from "../svg/Systems/KryosArcs.vue";
import KryosCallout from "./KryosCallout.vue";

const callouts: Callout[] = [
  {
    id: "control-core",
    anchor: { left: "clamp(-18rem, -19rem, -20rem)", bottom: "10%" },
    wClass: "w-fit md:95 xl:w-110",
    hClass: "h-26",
    title: "[Autonomous Control Core]",
    body: "Low-latency adaptive decision pipelines",
  },
  {
    id: "core-chassis",
    anchor: { left: "clamp(-14rem,-15rem, -16rem)", bottom: "40%" },
    wClass: "md:w-[10rem] lg:w-[24rem]",
    hClass: "h-24 md:h-fit",
    title: "[Hardened Core Chassis]",
    body: "Isolated compute, power, and mobility subsystems",
  },
  {
    id: "sensor-suite",
    anchor: { left: "clamp(-10rem,12rem, 15rem)", bottom: "10%" },
    wClass: "w-[min(10rem, 70vw)] md:w-[10rem] lg:w-[24rem]",
    hClass: "h-24 md:h-fit",
    showLine: true,
    lineFrom: "tc",
    lineLen: "clamp(6rem, 12vw, 12rem)",
    title: "[Sensor Suite]",
    body: "Thermal, LIDAR, acoustic, inertial mapping",
  },
  {
    id: "communications",
    anchor: { right: "clamp(-19rem,-20rem, -22rem)", top: "1%" },
    wClass: "md:w-[10rem] lg:w-[24rem]",
    hClass: "h-24 md:h-fit",
    showLine: true,
    lineFrom: "bl",
    lineLen: "clamp(8rem, 16vw, 18rem)",
    title: "[Communications]",
    body: "Encrypted multi-channel command + telemetry",
  },
  {
    id: "mobility",
    anchor: { right: "clamp(-20rem, -22rem, -24rem)", top: "30%" },
    wClass: "md:w-[10rem] lg:w-[24rem]",
    hClass: "h-24 md:h-fit",
    title: "[Mobility Envelope]",
    body: "Floor, wall, and overhead traversal",
  },
  {
    id: "payload",
    anchor: { right: "clamp(-26rem, -25rem, -22rem)", bottom: "20%" },
    wClass: "md:w-[10rem] lg:w-[24rem]",
    hClass: "h-24 md:h-fit",
    showLine: true,
    lineFrom: "lc",
    lineLen: "clamp(8rem, 18vw, 20rem)",
    title: "[Modular Payload]",
    body: "Two configurable mission hardpoints",
  },
];
</script>

<template>
  <div
    class="flex flex-col gap-6 p-4 h-screen bg-linear-180 from-bg-(--kryos-bg) to-gray-700 relative overflow-x-hidden overflow-y-auto"
  >
    <KryosArcs />

    <Absolute
      extra-class="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
    >
      <div
        class="flex flex-col items-center justify-center relative w-[min(60rem,92vw)]"
      >
        <KryosCallout
          v-for="c in callouts"
          :key="c.id"
          :anchor="c.anchor"
          :wClass="c.wClass"
          :hClass="c.hClass"
          :showLine="c.showLine"
          :line-from="c.lineFrom"
          :line-len="c.lineLen"
          class="hidden md:block"
        >
          <div class="flex flex-col gap-1">
            <span class="kryos-text text-(--kryos-warn)">
              {{ c.title }}
            </span>
            <span>{{ c.body }}</span>
          </div>
        </KryosCallout>

        <img
          src="~/assets/img/mk-i-side-a-trns.png"
          alt="MK-1"
          class="w-full h-auto"
        />

        <!-- mobile list callout -->
        <div class="md:hidden flex flex-col gap-2">
          <div class="flex flex-col gap-1 z-1 max-w-2xl">
            <h2 class="model-title">KRYOS MK-I Tactical Platform</h2>
            <p>
              Autonomous six-legged ground platform engineered for dense urban,
              industrial, and subterranean environments.
            </p>
          </div>

          <div
            v-for="c in callouts"
            :key="`${c.id}-mobile`"
            class="flex flex-col gap-1"
          >
            <span class="kryos-text text-(--kryos-warn)">
              {{ c.title }}
            </span>
            <span>{{ c.body }}</span>
          </div>
        </div>
      </div>
    </Absolute>

    <Absolute
      extra-class="hidden md:block top-0 left-[clamp(1rem,4vw,10rem)] flex flex-col gap-2 w-100 items-center justify-center"
    >
      <div class="relative flex flex-col gap-1 z-1 max-w-2xl top-10">
        <div class="absolute inset-0">
          <svg
            class="w-full h-auto"
            viewBox="0 0 700 427"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.5 426.5L27.7487 386.256V189.683L0.5 157.952V47L71.25 0.5H210.25L268.75 47H434.75L452.75 24.5H699.25"
              stroke="var(--kryos-accent)"
              stroke-width="6"
            />
          </svg>
        </div>
        <div class="relative z-10 top-8 left-8">
          <h2 class="model-title">[MK-I Tactical Platform]</h2>
          <p>
            Autonomous six-legged ground platform engineered for dense urban,
            industrial, and subterranean environments.
          </p>
        </div>
      </div>
    </Absolute>
  </div>
</template>

<style scoped>
.model-title {
  font-family: "Orbitron", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
