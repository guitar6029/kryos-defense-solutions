<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
import DotDashed from "./svg/DotDashed.vue";
import PillDashed from "./svg/PillDashed.vue";
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center gap-4"
  >
    <Absolute extra-class="top-10 left-10 w-250 -z-1 opacity-20">
      <PillDashed />
    </Absolute>

    <Absolute extra-class="top-10 left-10 w-250 -z-2 opacity-20">
      <DotDashed />
    </Absolute>

    <Absolute extra-class="bottom-10 -right-40 w-100 -z-1 opacity-20">
      <PillDashed />
    </Absolute>

    <Absolute extra-class="bottom-10 -right-40 w-100 -z-2 opacity-20">
      <DotDashed />
    </Absolute>

    <Absolute extra-class="bottom-10 -left-20 w-50 -z-1 opacity-20">
      <PillDashed />
    </Absolute>

    <Absolute extra-class="bottom-10 -left-20 w-50 -z-2 opacity-20">
      <DotDashed />
    </Absolute>

    <Absolute extra-class="top-10 -left-20 w-50 -z-1 opacity-20">
      <PillDashed />
    </Absolute>

    <Absolute extra-class="top-10 -left-20 w-50 -z-2 opacity-20">
      <DotDashed />
    </Absolute>

    <Absolute extra-class="top-10 -right-20 w-50 -z-1 opacity-20">
      <PillDashed />
    </Absolute>

    <Absolute extra-class="top-10 -right-20 w-50 -z-2 opacity-20">
      <DotDashed />
    </Absolute>

    <div class="z-10 flex flex-col gap-10 items-center justify-center">
      <h1
        class="sm:text-2xl md:text-[6rem] lg:text-[8rem] font-orbitron font-bold text-(--kryos-text-high)"
      >
        Kryos Defense Solutions
      </h1>
      <span class="text-4xl text-(--kryos-warn) font-bold tracking-[0.03em]"
        >[Autonomous Tactical Robotics for High-Risk Environments]</span
      >
      <div class="w-full max-w-4xl h-px bg-white/10 my-4"></div>

      <p class="max-w-4xl text-3xl text-(--kryos-text-high)">
        Kryos Defense Solutions develops precision-engineered autonomous
        platforms for government, corporate, and critical infrastructure
        security. Our systems are built to operate where human presence is too
        costly—or too dangerous.
      </p>

      <NuxtLink to="/products#kryos-mk-i" class="link">
        Explore Kryos MK-I
      </NuxtLink>
      <NuxtLink to="/rdivision" class="link">
        Learn about our R&D Division</NuxtLink
      >

      <div class="grid grid-cols-3 gap-4">
        <div
          class="p-2 h-25 border-2 flex items-center justify-center bg-(--kryos-bg-alt)"
        >
          <span class="text-2xl font-bold text-(--kryos-text-high)"
            >24+ Global Facilities</span
          >
        </div>
        <div
          class="p-2 h-25 border-2 flex items-center justify-center bg-(--kryos-bg-alt)"
        >
          <span class="text-2xl font-bold text-(--kryos-text-high)"
            >72 Active Deployment Zones</span
          >
        </div>
        <div
          class="p-2 h-25 border-2 flex items-center justify-center bg-(--kryos-bg-alt)"
        >
          <span class="text-2xl font-bold text-(--kryos-text-high)"
            >Tier-1 Defense Contractor</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
