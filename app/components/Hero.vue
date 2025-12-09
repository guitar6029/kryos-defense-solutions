<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KRYOS_HERO from "~/assets/img/KRYOS.png";
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center gap-4"
  >
    <img
      :src="KRYOS_HERO"
      alt="KRYOS protects the entire world"
      class="absolute ineset-0 w-full h-full object-cover -z-10 opacity-70"
    />

    <Absolute extra-class="top-10 left-10 w-250 -z-1 opacity-50">
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

    <div class="w-full bg-(--kryos-bg) p-8 text-center">
      <h1
        class="sm:text-2xl md:text-[6rem] lg:text-[8rem] font-orbitron font-bold text-(--kryos-text-high) text-center"
      >
        Kryos Defense Solutions
      </h1>

      <span
        class="text-xl xl:text-4xl text-(--kryos-warn) font-bold tracking-[0.03em] text-center"
        >[Autonomous Tactical Robotics for High-Risk Environments]</span
      >
    </div>

    <div class="z-10 flex flex-col gap-10 items-center justify-center">
      <!-- <span
        class="text-xl xl:text-4xl text-(--kryos-warn) font-bold tracking-[0.03em] text-center w-full bg-black p-4"
        >[Autonomous Tactical Robotics for High-Risk Environments]</span
      > -->
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
      <NuxtLink to="#" class="link"> Learn about our R&D Division</NuxtLink>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div class="relative p-2 h-25 flex items-center justify-center">
          <div class="absolute inset-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 743 407"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 95.5L70 0.5H742V330L640.5 406H0.5V95.5Z"
                fill="var(--kryos-bg-alt)"
                stroke="var(--kryos-accent)"
                stroke-width="4"
              />
            </svg>
          </div>
          <div class="text-2xl font-bold text-(--kryos-text-high) relative z-1">
            24+ Global Facilities
          </div>
        </div>

        <div class="relative p-2 h-25 flex items-center justify-center">
          <div class="absolute inset-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 743 407"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 95.5L70 0.5H742V330L640.5 406H0.5V95.5Z"
                fill="var(--kryos-bg-alt)"
                stroke="var(--kryos-accent)"
                stroke-width="4"
              />
            </svg>
          </div>

          <div class="text-2xl font-bold text-(--kryos-text-high) relative z-1">
            72 Active Deployment Zones
          </div>
        </div>

        <div class="relative p-2 h-25 flex items-center justify-center">
          <div class="absolute inset-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 743 407"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 95.5L70 0.5H742V330L640.5 406H0.5V95.5Z"
                fill="var(--kryos-bg-alt)"
                stroke="var(--kryos-accent)"
                stroke-width="4"
              />
            </svg>
          </div>

          <div class="text-2xl font-bold text-(--kryos-text-high) relative z-1">
            Tier-1 Defense Contractor
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
