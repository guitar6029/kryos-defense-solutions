<script lang="ts" setup>
import MKI from "@/assets/img/mk-i-no-bg.png";
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col items-center gap-12 relative">
    <Absolute extra-class="top-50 w-full opacity-50 ">
      <KryosPanel :option="5" />
    </Absolute>

    <Absolute
      extra-class="-bottom-50 left-0 sm:w-100 lg:w-200 rotate-180 opacity-50"
    >
      <KryosPanel :option="3" :stroke-width="2" />
    </Absolute>

    <Absolute
      extra-class="bottom-50 right-0 sm:w-100 lg:w-200 rotate-180 opacity-50"
    >
      <KryosPanel :option="3" :stroke-width="2" />
    </Absolute>

    <Absolute extra-class="bottom-50 left-0 sm:w-100 lg:w-100  opacity-50 -z-1">
      <KryosPanel :option="6" :stroke-width="2" />
    </Absolute>

    <Absolute extra-class="top-150 left-0 opacity-20 -z-1">
      <div
        class="w-125 h-25 border-2 flex flex-col items-center justify-center"
      >
        <span class="font-orbitron font-extrabold text-6xl">KRYOS MK-I</span>
      </div>
      <div class="w-110 h-2 border-2"></div>
    </Absolute>

    <Absolute extra-class="top-1/2 left-1/2 -translate-x-1/2 opacity-2 -z-1">
      <KryosSignature />
    </Absolute>

    <h2 class="section-title">Flagship Platform</h2>
    <div class="flex gap-2">
      <div class="flex flex-col items-center gap-2">
        <img :src="MKI" alt="Kryos MK-I Prototype" class="w-200" />
        <h3 class="text-6xl text-(--kryos-text-high) font-orbitron uppercase">
          Kryos MK-I
        </h3>
      </div>
    </div>
    <div class="flex flex-col gap-6 max-w-4xl">
      <p class="text-4xl">
        The Kryos MK-I is a multi-terrain autonomous drone designed for
        high-density urban, industrial, and subterranean environments. With
        six-degrees-of-freedom mobility and a hardened sensor array, MK-I units
        maintain operational integrity where conventional systems fail.
      </p>
      <ul class="text-4xl list-disc font-bold flex flex-col gap-4">
        <li>Multi-surface traversal (floor, wall, overhead structures)</li>
        <li>Redundant sensor clusters (thermal, LIDAR, acoustic mapping)</li>
        <li>Modular payload hardpoints</li>
        <li>Encrypted command and control channel</li>
      </ul>
    </div>
    <NuxtLink to="/products/mk-1" class="link"
      >View full technical specification</NuxtLink
    >
  </div>
</template>
