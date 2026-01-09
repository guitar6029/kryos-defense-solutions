<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KRYOS_HERO from "~/assets/img/shapes/3d_shapes.png";
import KryosFrame from "./Panels/KryosFrame.vue";
const KRYOS_SUMMARY = `Kryos Defense Solutions develops precision-engineered autonomous
        platforms for government, corporate, and critical infrastructure
        security. Our systems are built to operate where human presence is too
        costly—or too dangerous.`;

const panels = [
  "24+ Global Facilities",
  "72 Active Deployment Zones",
  "Tier-1 Defense Contractor",
];
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center gap-4"
  >
    <img
      :src="KRYOS_HERO"
      alt="KRYOS protects the entire world"
      class="absolute inset-0 w-full h-full object-cover -z-10 opacity-70"
    />

    <Absolute
      extra-class="hidden md:block top-10 left-10 w-250 -z-1 opacity-50"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="4" />
        <circle cx="24" cy="8" r="4" />
        <circle cx="40" cy="8" r="4" />
        <circle cx="56" cy="8" r="4" />

        <circle cx="8" cy="24" r="4" />
        <circle cx="24" cy="24" r="4" />
        <circle cx="40" cy="24" r="4" />
        <circle cx="56" cy="24" r="4" />
      </svg>
    </Absolute>

    <div class="w-full p-8 text-center">
      <h1
        class="text-2xl md:text-[4rem] lg:text-[6rem] font-orbitron font-bold text-(--kryos-text-high) text-center"
      >
        Kryos Defense Solutions
      </h1>

      <span
        class="text-xl text-(--kryos-warn) font-bold tracking-[0.03em] text-center"
        >[Autonomous Combat Robotics]</span
      >
    </div>

    <div class="z-10 flex flex-col gap-10 items-center justify-center">
      <div class="w-full max-w-4xl h-px bg-white/10 my-4"></div>

      <p
        class="text-2xl md:text-4xl p-8 text-center md:p-0 text-(--kryos-text-high)"
      >
        {{ KRYOS_SUMMARY }}
      </p>

      <div class="flex flex-col md:flex-row items-center gap-6">
        <NuxtLink to="/products#kryos-mk-i" class="nav-link">
          <span class="kryos-bracket">Explore Kryos MK-I</span>
        </NuxtLink>
        <NuxtLink to="#" class="nav-link"
          ><span class="kryos-bracket"
            >Learn about our R&D Division</span
          ></NuxtLink
        >
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-10">
        <div
          v-for="(panelItem, idx) in panels"
          :key="`panel-${idx}`"
          class="relative p-2 h-25 flex items-center justify-center"
        >
          <KryosFrame
            preserve-aspect-ratio="none"
            absolute-extra-class="inset-0"
            svg-view-box="0 0 560 200"
            svg-path="M20 0.5 H540 L559.5 18 V182 L540 199.5 H20 L0.5 182 V18 L20 0.5 Z"
            svg-fill-color="var(--kryos-bg-alt)"
            svg-stroke-color="var(--kryos-accent)"
            :svg-stroke-width="3"
          />

          <div class="text-2xl font-bold text-(--kryos-text-high) relative z-1">
            {{ panelItem }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
