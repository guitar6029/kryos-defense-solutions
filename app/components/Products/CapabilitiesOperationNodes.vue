<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import KryosSectionHeader from "../KryosSectionHeader.vue";
import PatrolRouteIcon from "~/components/svg/PatrolRouteIcon.vue";
import TargetIcon from "../svg/TargetIcon.vue";
import ZoneEnforcement from "../svg/ZoneEnforcement.vue";
import DataCapture from "../svg/DataCapture.vue";

const capabilities = [
  {
    title: "Autonomous Patrol",
    text: "Configurable patrol routes with adaptive pathfinding around new obstacles and environmental changes.",
    icon: PatrolRouteIcon,
  },
  {
    title: "Threat Detection & Classification",
    text: "Real-time analysis of motion, thermal signatures, and anomalous patterns within defined perimeters.",
    icon: TargetIcon,
  },
  {
    title: "Zone Enforcement",
    text: "Configurable soft and hard boundaries, with escalating response ladders based on client policy.",
    icon: ZoneEnforcement,
  },
  {
    title: "Data Capture & Forensics",
    text: "Continuous logging of visual, positional, and environmental data for post-incident review.",
    icon: DataCapture,
  },
];
</script>
<template>
  <section class="flex flex-col gap-2 relative min-h-screen">
    <KryosSectionHeader right-text="OPERATING MODES" />

    <Absolute extra-class="-z-1 top-100 -right-50 w-150 ">
      <KryosPanel :option="7" />
    </Absolute>

    <Absolute extra-class="-z-1 top-20 left-0  w-200 ">
      <KryosPanel :option="13" />
    </Absolute>

    <Absolute extra-class="-z-1 bottom-20 left-0 opacity-50 w-200 ">
      <KryosPanel :option="3" />
    </Absolute>

    <h2 class="section-title">Systems Capabilities</h2>
    <div class="flex flex-col items-center gap-4 p-12">
      <ul class="flex flex-col gap-6">
        <li
          v-for="(capability, idx) in capabilities"
          :key="`capability-${idx}`"
          class="flex flex-col gap-6"
        >
          <span class="font-bold text-5xl text-(--kryos-warn)">
            [{{ capability.title }}]
          </span>

          <div class="flex items-start gap-2">
            <div class="w-25 text-(--kryos-accent)">
              <component :is="capability.icon" class="w-20 h-20 shrink-0" />
            </div>

            <p class="max-w-4xl text-4xl">
              {{ capability.text }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
