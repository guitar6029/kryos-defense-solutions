<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosArcs from "../svg/Systems/KryosArcs.vue";
import KryosCallout from "./KryosCallout.vue";

type Callout = {
  id: string;
  anchor: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  wClass: string;
  hClass: string;
  showLine?: boolean;
  lineFrom?: "tl" | "tc" | "tr" | "lc" | "rc" | "bl" | "bc" | "br";
  lineLen?: string;
  title: string;
  body: string;
};

const callouts: Callout[] = [
  {
    id: "control-core",
    anchor: { left: "-35%", bottom: "10%" },
    wClass: "w-110",
    hClass: "h-26",
    title: "[Autonomous Control Core]",
    body: "Low-latency adaptive decision pipelines",
  },
  {
    id: "core-chassis",
    anchor: { left: "-35%", bottom: "40%" },
    wClass: "w-100",
    hClass: "h-24",
    title: "[Hardened Core Chassis]",
    body: "Isolated compute, power, and mobility subsystems",
  },
  {
    id: "sensor-suite",
    anchor: { left: "18%", bottom: "10%" },
    wClass: "w-105",
    hClass: "h-24",
    showLine: true,
    lineFrom: "tc",
    lineLen: "10rem",
    title: "[Sensor Suite]",
    body: "Thermal, LIDAR, acoustic, inertial mapping",
  },
  {
    id: "communications",
    anchor: { right: "-40%", top: "1%" },
    wClass: "w-110",
    hClass: "h-24",
    showLine: true,
    lineFrom: "bl",
    lineLen: "15rem",
    title: "[Communications]",
    body: "Encrypted multi-channel command + telemetry",
  },
  {
    id: "mobility",
    anchor: { right: "-40%", top: "30%" },
    wClass: "w-100",
    hClass: "h-24",
    title: "[Mobility Envelope]",
    body: "Floor, wall, and overhead traversal",
  },
  {
    id: "payload",
    anchor: { right: "-40%", bottom: "20%" },
    wClass: "w-110",
    hClass: "h-26",
    showLine: true,
    lineFrom: "lc",
    lineLen: "15rem",
    title: "[Modular Payload]",
    body: "Two configurable mission hardpoints",
  },
];
</script>

<template>
  <div
    class="flex flex-col gap-6 p-4 h-screen bg-linear-180 from-bg-(--kryos-bg) to-gray-700 relative overflow-hidden"
  >
    <KryosArcs />

    <Absolute
      extra-class="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
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
