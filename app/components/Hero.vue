<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KRYOS_HERO from "~/assets/img/shapes/3d_shapes.png";
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center gap-4"
  >
    <!-- <img
      :src="KRYOS_HERO"
      alt="KRYOS protects the entire world"
      class="absolute inset-0 w-full h-full object-cover -z-10 opacity-70"
    /> -->
    <Absolute extra-class="top-10 left-10 w-screen  opacity-70">
      <svg
       class="absolute inset-0 w-full h-full"
        viewBox="0 0 3406 2030"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M525.5 133.373L291 345.873V2029.37M0 1727.37H379M3405.5 1727.37H3276M379 1727.37V460.873L568 290.873M379 1727.37H3030.5M3276 1727.37V1986.87H2199.5M3276 1727.37H3117M3117 1727.37V188.873L2905.5 0.373047M3117 1727.37H3030.5M3030.5 1727.37V345.873L2849 188.873"
          stroke="var(--kryos-accent)"
        />
      </svg>
    </Absolute>

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

    <div class="w-full p-8 text-center">
      <h1
        class="sm:text-2xl md:text-[6rem] lg:text-[8rem] font-orbitron font-bold text-(--kryos-text-high) text-center"
      >
        Kryos Defense Solutions
      </h1>

      <span
        class="text-2xl text-(--kryos-warn) font-bold tracking-[0.03em] text-center"
        >[Autonomous Tactical Robotics for High-Risk Environments]</span
      >
    </div>

    <div class="z-10 flex flex-col gap-10 items-center justify-center">
      <div class="w-full max-w-4xl h-px bg-white/10 my-4"></div>

      <p class="max-w-4xl text-3xl text-(--kryos-text-high)">
        Kryos Defense Solutions develops precision-engineered autonomous
        platforms for government, corporate, and critical infrastructure
        security. Our systems are built to operate where human presence is too
        costly—or too dangerous.
      </p>

      <div class="flex flex-row items-center gap-6">
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
        <div class="relative p-2 h-25 flex items-center justify-center">
          <div class="absolute inset-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 560 200"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="
      M20 0.5
      H540
      L559.5 18
      V182
      L540 199.5
      H20
      L0.5 182
      V18
      L20 0.5
      Z
    "
                fill="var(--kryos-bg-alt)"
                stroke="var(--kryos-accent)"
                stroke-width="3"
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
              viewBox="0 0 560 200"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="
      M20 0.5
      H540
      L559.5 18
      V182
      L540 199.5
      H20
      L0.5 182
      V18
      L20 0.5
      Z
    "
                fill="var(--kryos-bg-alt)"
                stroke="var(--kryos-accent)"
                stroke-width="3"
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
              viewBox="0 0 560 200"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="
      M20 0.5
      H540
      L559.5 18
      V182
      L540 199.5
      H20
      L0.5 182
      V18
      L20 0.5
      Z
    "
                fill="var(--kryos-bg-alt)"
                stroke="var(--kryos-accent)"
                stroke-width="3"
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
