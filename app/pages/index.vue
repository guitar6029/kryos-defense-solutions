<script lang="ts" setup>
import Absolute from "@/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import MKI from "@/assets/img/mk-i-no-bg.png";
/**
 * 
 * <main>
  [1] Corporate Hero
  [2] Core Capabilities Strip
  [3] Kryos MK-I Spotlight
  [4] Sectors & Deployments
  [5] R&D Division Teaser
  [6] News / Press Highlights
  [7] Footer Summary
</main>

 * 
 * 
 */
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- HERO -->
    <div
      class="relative flex h-screen flex-col items-center justify-center gap-4"
    >
      <Absolute
        extra-class="top-10 -left-20 sm:w-100 md:w-100 lg:w-200 -z-1 opacity-50"
      >
        <KryosPanel :stroke-width="2" />
      </Absolute>

      <Absolute extra-class="top-120 right-0 sm:w-100 lg:w-200 opacity-50">
        <KryosPanel :option="2" />
      </Absolute>

      <Absolute extra-class="top-0 right-0 sm:w-100 lg:w-200 opacity-50">
        <KryosPanel :option="3" :stroke-width="2" />
      </Absolute>

      <Absolute
        extra-class="-bottom-50 left-0 sm:w-100 lg:w-200 rotate-180 opacity-50"
      >
        <KryosPanel :option="3" :stroke-width="2" />
      </Absolute>

      <!-- <Absolute
        extra-class="top-20 left-1/2 -translate-x-1/2 z-[-10] pointer-events-none"
      >
        <span
          class="text-[50rem] font-orbitron text-(--kryos-metal-light) opacity-5 select-none"
        >
          K
        </span>
      </Absolute> -->

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
    <!-- END HERO -->

    <!-- Core Capabilities -->
    <div
      class="relative flex min-h-screen flex-col items-center justify-center gap-4"
    >
      <Absolute
        extra-class="top-50 left-1/2 -translate-x-1/2 w-400 opacity-50 rotate-180"
      >
        <KryosPanel :option="4" />
      </Absolute>

      <div class="flex flex-col items-center justify-center">
        <h2 class="section-title">What We Build</h2>
      </div>

      <div class="flex flex-col items-center justify-center gap-12">
        <div class="flex flex-col items-center justify-center gap-2">
          <h1 class="text-6xl">Autonomous Ground Platforms</h1>
          <p class="text-4xl max-w-2xl">
            Multi-terrain drones engineered for patrol, interdiction, and
            perimeter security.
          </p>
        </div>
        <div class="flex flex-col items-center justify-center gap-2">
          <h1 class="text-6xl">Intelligent Target Acquisition</h1>
          <p class="text-4xl max-w-2xl">
            Sensor fusion, threat classification, and precision response under
            strict rules of engagement.
          </p>
        </div>
        <div class="flex flex-col items-center justify-center gap-2">
          <h1 class="text-6xl">Secure Systems Integration</h1>
          <p class="text-4xl max-w-2xl">
            Seamless integration with existing command, surveillance, and
            infrastructure networks.
          </p>
        </div>
      </div>
    </div>
    <!-- End Capabilities -->

    <!-- Kryos Mk-I Spotlight -->
    <div class="flex flex-col items-center gap-4 relative">
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

      <Absolute
        extra-class="bottom-50 left-0 sm:w-100 lg:w-100  opacity-50 -z-1"
      >
        <KryosPanel :option="6" :stroke-width="2" />
      </Absolute>
      
      <Absolute
        extra-class="top-150 left-0 opacity-20 -z-1"
      >
          <div class="w-125 h-25 border-2 flex flex-col items-center justify-center">
            <span class="font-orbitron font-extrabold text-6xl">KRYOS MK-I</span>
          </div>
          <div class="w-110 h-2 border-2">

          </div>
      </Absolute>
      
      <Absolute
        extra-class="top-1/2 left-1/2 -translate-x-1/2 opacity-5 -z-1"
      >
          <div class="w-325 h-325 flex flex-col items-center justify-center">
            <span class="font-orbitron font-extrabold text-[10rem]">KRYOS</span>
          </div>
          
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
          six-degrees-of-freedom mobility and a hardened sensor array, MK-I
          units maintain operational integrity where conventional systems fail.
        </p>
        <ul class="text-4xl list-disc font-bold flex flex-col gap-4">
          <li>Multi-surface traversal (floor, wall, overhead structures)</li>
          <li>Redundant sensor clusters (thermal, LIDAR, acoustic mapping)</li>
          <li>Modular payload hardpoints</li>
          <li>Encrypted command and control channel</li>
        </ul>
      </div>
      <NuxtLink to="/products" class="link"
        >View full technical specification</NuxtLink
      >
    </div>
    <!-- End Kryos Mk-I Spotlight -->

    <!-- Sectors and Deplyments -->
    <div class="flex flex-col gap-2">
      <h2>Deployed Across Critical Sectors</h2>
      <div class="flex flex-col gap-2">
        <h4>Goverment & Defense</h4>
        <span
          >Perimeter defense, border control, urban operations support.</span
        >
      </div>
      <div class="flex flex-col gap-2">
        <h4>Corporate Security</h4>
        <span
          >High-value campus protection, data center security, logistics
          hubs.</span
        >
      </div>
      <div class="flex flex-col gap-2">
        <h4>Industrial & Energy</h4>
        <span
          >Refineries, mining facilities, off-shore platforms, and hazardous
          environments.</span
        >
      </div>
      <div class="flex flex-col gap-2">
        <h4>Research & Black-Site Operations</h4>
        <span>Compartmentalized deployments under classified directives.</span>
      </div>
    </div>
    <!-- End Sectors and Deplyments -->

    <!-- R&D Division Teaser -->
    <div class="flex flex-col gap-2">
      <h2>Kryos Advanced Systems Division</h2>
      <p>
        Our Advanced Systems Division leads research into autonomous
        coordination, adaptive armor, and next-generation sensor architectures.
        Most of our work is never disclosed. What follows is only what’s cleared
        for public release.
      </p>
      <div class="flex flex-col gap-2">
        <div>Swarm coordination frameworks</div>
        <div>Adaptive mobility systems</div>
        <div>Hardened AI decision pipelines</div>
      </div>
      <NuxtLink to="rdivision">Inside the R&D Division</NuxtLink>
    </div>
    <!-- End R&D Division Teaser -->

    <!-- News / Press Highlights -->
    <div class="flex flex-col gap-2">
      <h2>Recent Announcements</h2>
      <ul>
        <li>
          Kryos MK-I enters limited deployment with Tier-1 security partners.
        </li>
        <li>
          Kryos Defense Solutions announces expansion of subterranean testing
          facilities.
        </li>
        <li>
          Joint research initiative launched with undisclosed government entity.
        </li>
      </ul>
    </div>
    <!-- End News / Press Highlights -->
  </div>
</template>
