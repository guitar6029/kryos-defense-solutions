<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import DotDashed from "./svg/DotDashed.vue";
import EXOLINE from "~/assets/img/EXO_LINE_1.png"
</script>
<template>
  
  <Divider right-text="SECTOR // OPERATIONAL BRIEFING" />
  <div
    class="min-h-screen relative flex flex-col items-center justify-center gap-4 overflow-hidden"
  >


  <img :src="EXOLINE" alt="EXO LINE" class="absolute ineset-0 w-full h-full object-cover -z-10 opacity-70">

    <Absolute
      extra-class="bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-300 opacity-5 -z-1"
    >
      <DotDashed />
    </Absolute>

    <div class="flex flex-col items-center justify-center gap-12 p-12 z-10 relative">
      <div class="flex flex-col justify-center gap-2">
        <h1 class="text-4xl text-(--kryos-warn) font-bold">
          [Autonomous Ground Platforms]
        </h1>
        <div class="flex items-start gap-2">
          <div class="w-25 text-(--kryos-accent)">
            <svg
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <!-- Corner brackets -->
              <path d="M8 18V12H22" />
              <path d="M8 46V52H22" />
              <path d="M56 18V12H42" />
              <path d="M56 46V52H42" />

              <!-- Drone body -->
              <rect x="22" y="26" width="20" height="10" rx="2" />

              <!-- Sensor mast -->
              <line x1="32" y1="22" x2="32" y2="26" />
              <circle cx="32" cy="20" r="2" />

              <!-- Wheels / treads -->
              <circle cx="26" cy="40" r="3" />
              <circle cx="38" cy="40" r="3" />

              <!-- Ground line -->
              <line x1="20" y1="44" x2="44" y2="44" />
            </svg>
          </div>
          <p class="text-4xl max-w-2xl">
            Multi-terrain drones engineered for patrol, interdiction, and
            perimeter security.
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-2">
        <h1 class="text-4xl text-(--kryos-warn) font-bold">
          [Intelligent Target Acquisition]
        </h1>
        <div class="flex items-start gap-2">
          <div class="w-25 text-(--kryos-accent)">
            <svg
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <!-- Outer triangle -->
              <path d="M32 10L12 46H52L32 10Z" />

              <!-- Inner circle / lock-on point -->
              <circle cx="32" cy="30" r="4" />

              <!-- Crosshair lines -->
              <line x1="32" y1="20" x2="32" y2="26" />
              <line x1="32" y1="34" x2="32" y2="40" />
              <line x1="24" y1="30" x2="28" y2="30" />
              <line x1="36" y1="30" x2="40" y2="30" />
            </svg>
          </div>
          <p class="text-4xl max-w-2xl">
            Sensor fusion, threat classification, and precision response under
            strict rules of engagement.
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-2">
        <h1 class="text-4xl text-(--kryos-warn) font-bold">
          [Secure Systems Integration]
        </h1>
        <div class="flex items-start gap-2">
          <div class="w-25 text-(--kryos-accent)">
            <svg
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <!-- Left angled panel -->
              <path d="M10 22H26L30 26V42H14L10 38V22Z" />

              <!-- Right angled panel -->
              <path d="M54 22H38L34 26V42H50L54 38V22Z" />

              <!-- Link channel -->
              <line x1="30" y1="32" x2="34" y2="32" />
              <circle cx="30" cy="32" r="1.5" />
              <circle cx="34" cy="32" r="1.5" />
            </svg>
          </div>
          <p class="text-4xl max-w-2xl">
            Seamless integration with existing command, surveillance, and
            infrastructure networks.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
