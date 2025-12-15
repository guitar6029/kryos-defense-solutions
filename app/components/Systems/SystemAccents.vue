<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosArcMultiple from "../svg/KryosArcMultiple.vue";
</script>

<template>
  <Absolute extra-class="bottom-1/2 left-0 -z-1">
    <div class="w-screen h-[0.1rem] bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute extra-class="bottom-10 left-0 -z-1">
    <div class="w-screen h-[0.1rem] bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute extra-class="bottom-20 left-0 w-screen -z-1 opacity-40">
    <svg
      class="w-full h-auto"
      viewBox="0 0 2678 4895"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2320 0.407227L2677 255.407V3517.91L828.5 4894.41H0"
        stroke="var(--kryos-accent)"
        stroke-dasharray="7000"
        stroke-dashoffset="7000"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="7000; 0; 7000"
          keyTimes="0; 0.6; 1"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </Absolute>

  <Absolute extra-class="bottom-10 left-0 w-screen -z-1">
    <svg
      class="w-full h-auto"
      viewBox="0 0 883 1047"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.40625 0.5H310.583L374.94 54.1271H592.275L612.32 29.2095H791.674L882.406 54.1271V386.724L846.008 418.142V700.903L882.406 752.905V1046.5H675.094L547.964 984.206H38.9146L0.40625 930.579"
        stroke="var(--kryos-accent)"
        stroke-dasharray="3000"
        stroke-dashoffset="3000"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="3000; 0; 3000"
          keyTimes="0; 0.6; 1"
          dur="40s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </Absolute>

  <Absolute extra-class="bottom-10 left-0 w-screen -z-1 ">
    <svg
      class="w-full h-auto"
      viewBox="0 0 5584 3384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.40332 3383L398.403 2838.5H628.903M5467.9 0V1581.5M628.903 2838.5V3037.5M628.903 2838.5H5195.9M5195.9 2838.5V2492.5M5195.9 2838.5H5331.9M5331.9 2838.5H5467.9V2021.5M5331.9 2838.5V2758M5331.9 199H5583.4M5394.9 827H5583.4M5467.9 1581.5H5331.9M5467.9 1581.5V2021.5M5467.9 2021.5H5583.4"
        stroke="var(--kryos-text-high)"
      >
        <!-- <animate
              attributeName="stroke-dashoffset"
              values="10000; 0; 10000"
              keyTimes="0; 0.6; 1"
              dur="20s"
              repeatCount="indefinite"
            /> -->
      </path>
    </svg>
  </Absolute>

  <Absolute extra-class="top-0 left-1/2 -translate-x-1/2 -z-1">
    <div class="h-screen w-[0.1rem] bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute extra-class="top-10 right-20 -z-1 flex gap-2">
    <div class="w-2 h-2 bg-(--kryos-accent)"></div>
    <div class="w-2 h-2 bg-(--kryos-accent)"></div>
    <div class="w-2 h-2 bg-(--kryos-accent)"></div>
    <div class="w-2 h-2 bg-(--kryos-accent)"></div>
    <div class="w-2 h-2 bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute extra-class="top-40 right-30 -z-1 flex gap-2">
    <div class="w-1 h-1 bg-(--kryos-accent)"></div>
    <div class="w-1 h-1 bg-(--kryos-accent)"></div>
    <div class="w-1 h-1 bg-(--kryos-accent)"></div>
    <div class="w-1 h-1 bg-(--kryos-accent)"></div>
    <div class="w-1 h-1 bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute extra-class="top-10 left-10 -z-1">
    <div class="w-65 h-65 bg-(--kryos-accent)/20 flex flex-col relative">
      <div class="flex flex-col font-mono text-[.5rem] uppercase p-4">
        <span>system handshake pending</span>
        <span>secure session detected</span>
        <span>operator presence confirmed</span>
        <span>internal bus online</span>
      </div>

      <Absolute extra-class="bottom-10 right-10 -z-1 flex flex-col gap-2">
        <div
          class="w-25 h-25 bg-(--kryos-bg)/50 flex flex-col items-center justify-center"
        >
          //
        </div>
      </Absolute>
    </div>
  </Absolute>

  <Absolute extra-class="bottom-10 right-10 -z-1">
    <div class="w-65 h-65 bg-(--kryos-accent)/20 flex flex-col relative">
      <div class="flex flex-col font-mono text-[.5rem] uppercase p-4">
        <span>Session time : 00:00:00</span>
        <span>boot sequence: standby</span>
        <span>uptime: -</span>
        <span>last sync: < 1s ago</span>
      </div>

      <Absolute extra-class="bottom-10 right-10 -z-1 flex flex-col gap-2">
        <div
          class="w-25 h-25 bg-(--kryos-bg)/50 flex flex-col items-center justify-center"
        >
          +
        </div>
      </Absolute>
    </div>
  </Absolute>

  <Absolute extra-class="bottom-10 right-20 -z-1 flex gap-2">
    <div class="text-[0.8rem] font-mono uppercase">
      <span>Input Required</span>
    </div>
  </Absolute>

  <Absolute extra-class="bottom-10 left-20 -z-1 flex gap-2">
    <div
      class="text-[0.8rem] font-mono text-(--kryos-accent) uppercase flex flex-col"
    >
      <span>BOOT SEQUENCE: STANDBY</span>
      <span>[AWAITING SIGNAL]</span>
    </div>
  </Absolute>

  <Absolute extra-class="top-0 right-10 -z-1 flex flex-col gap-2">
    <div class="h-25 w-[.1rem] bg-(--kryos-accent)"></div>
    <div class="h-125 w-2 bg-(--kryos-accent)"></div>
    <div class="h-25 w-[.1rem] bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute extra-class="bottom-10 left-10 -z-1 flex flex-col gap-2">
    <div class="h-25 w-[.1rem] bg-(--kryos-accent)"></div>
    <div class="h-125 w-2 bg-(--kryos-accent)"></div>
    <div class="h-25 w-[.1rem] bg-(--kryos-accent)"></div>
  </Absolute>

  <Absolute
    extra-class="bottom-1/2 translate-y-1/2 left-1/2 w-200 -translate-x-1/2 -z-1 opacity-30 text-(--kryos-accent)"
    :style="{
      '--duration': '100s',
      '--from-angle': '360deg',
      '--to-angle': '0deg',
    }"
  >
    <KryosArcMultiple />
  </Absolute>

  <Absolute extra-class="-top-50 -right-50 -z-2 flex flex-col gap-2 opacity-50">
    <div class="w-200 h-200 border-2 rounded-full bg-(--kryos-bg)"></div>
  </Absolute>
</template>
