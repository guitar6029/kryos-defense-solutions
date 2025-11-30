<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center gap-4"
  >
    <Absolute
      extra-class="top-10 -left-20 sm:w-100 md:w-100 lg:w-200 -z-1 opacity-50"
    >
      <KryosPanel :stroke-width="2" />
    </Absolute>

    <Absolute extra-class="top-50 -right-20 sm:w-100 lg:w-100 opacity-50">
      <KryosPanel :option="10" />
    </Absolute>

    <!-- <Absolute extra-class="top-0 right-0 sm:w-100 lg:w-200 opacity-50">
      <KryosPanel :option="3" :stroke-width="2" />
    </Absolute> -->

    <Absolute
      extra-class="-bottom-50 left-0 sm:w-100 lg:w-200 rotate-180 opacity-50"
    >
      <KryosPanel :option="3" :stroke-width="2" />
    </Absolute>

    <div class="z-10 flex flex-col gap-10 items-center justify-center">
      <h1 class="sm:text-2xl md:text-[6rem] lg:text-[8rem] font-orbitron">
        Kryos Defense Solutions
      </h1>
      <span class="text-4xl"
        >Autonomous Tactical Robotics for High-Risk Environments.</span
      >
      <p class="max-w-4xl text-2xl">
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
        <div class="p-2 h-25 border-2 flex items-center justify-center">
          <span class="text-2xl font-bold">24+ Global Facilities</span>
        </div>
        <div class="p-2 h-25 border-2 flex items-center justify-center">
          <span class="text-2xl font-bold">72 Active Deployment Zones</span>
        </div>
        <div class="p-2 h-25 border-2 flex items-center justify-center">
          <span class="text-2xl font-bold">Tier-1 Defense Contractor</span>
        </div>
      </div>
    </div>
  </div>
</template>
