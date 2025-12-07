<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import Splitter from "../Splitter.vue";
import PatrolRouteIcon from "~/components/svg/PatrolRouteIcon.vue";
import TargetIcon from "../svg/TargetIcon.vue";
import ZoneEnforcement from "../svg/ZoneEnforcement.vue";
import DataCapture from "../svg/DataCapture.vue";
</script>
<template>
  <section class="flex flex-col gap-2 relative min-h-screen">
    <Splitter right-text="OPERATING MODES" />

    <Absolute extra-class="-z-1 top-100 -right-30 w-300 ">
      <KryosPanel :option="7" />
    </Absolute>

    <Absolute extra-class="-z-1 bottom-20 left-0  w-400 ">
      <KryosPanel :option="13" />
    </Absolute>

    <h2 class="section-title">Systems Capabilities</h2>
    <div class="flex flex-col items-center gap-4 p-12">
      <ul class="flex flex-col gap-6">
        <li class="flex flex-col gap-6">
          <span class="font-bold text-5xl text-(--kryos-warn)"
            >[Autonomous Patrol]</span
          >
          <div class="flex items-center gap-2">
            <div class="w-40">
              <PatrolRouteIcon />
            </div>
            <p class="max-w-4xl text-4xl">
              Configurable patrol routes with adaptive pathfinding around new
              obstacles and environmental changes.
            </p>
          </div>
        </li>
        <li class="flex flex-col gap-6">
          <span class="font-bold text-5xl text-(--kryos-warn)"
            >[Threat Detection & Classification]</span
          >
          <div class="flex items-center gap-2">
            <div class="w-40">
              <TargetIcon />
            </div>
            <p class="max-w-4xl text-4xl">
              Real-time analysis of motion, thermal signatures, and anomalous
              patterns within defined perimeters.
            </p>
          </div>
        </li>
        <li class="flex flex-col gap-6">
          <span class="font-bold text-5xl text-(--kryos-warn)"
            >[Zone Enforcement]</span
          >
          <div class="flex items-center gap-2">
            <div class="w-40">
              <ZoneEnforcement />
            </div>
            <p class="max-w-4xl text-4xl">
              Configurable soft and hard boundaries, with escalating response
              ladders based on client policy.
            </p>
          </div>
        </li>
        <li class="flex flex-col gap-6">
          <span class="font-bold text-5xl text-(--kryos-warn)"
            >[Data Capture & Forensics]</span
          >
          <div class="flex items-center gap-2">
            <div class="w-40">
              <DataCapture />
            </div>
            <p class="max-w-4xl text-4xl">
              Continuous logging of visual, positional, and environmental data
              for post-incident review.
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="flex flex-col items-end gap-2">
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Recon Modes</h3>
        <p class="max-w-4xl text-4xl">
          Low-profile traversal with reduced visible signature and emphasis on
          mapping, observation, and silent tracking.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Interdiction Mode</h3>
        <p class="max-w-4xl text-4xl">
          Aggressive posture with priority on deterrence, boundary enforcement,
          and response escalation under operator-defined rules of engagement.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Guard Mode</h3>
        <p class="max-w-4xl text-4xl">
          Fixed or bounded operation around a constrained perimeter, ideal for
          static high-value assets and chokepoints.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Transit Mode</h3>
        <p class="max-w-4xl text-4xl">
          Optimized for movement between sectors, with reduced sensor footprint
          and energy-efficient path planning.
        </p>
      </div>
    </div> -->
  </section>
</template>
