<script lang="ts" setup>
import Absolute from "@/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import MKI from "@/assets/img/mk-i-no-bg.png";
import KryosCard from "@/components/Cards/KryosCard.vue";
</script>

<template>
  <div class="flex flex-col gap-2 min-h-screen">
    <!-- HERO -->
    <div
      class="relative flex min-h-screen flex-col items-center justify-center gap-4"
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
      class="min-h-screen relative flex flex-col items-center justify-center gap-4"
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

      <Absolute
        extra-class="bottom-50 left-0 sm:w-100 lg:w-100  opacity-50 -z-1"
      >
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

      <!-- <Absolute extra-class="top-1/2 left-1/2 -translate-x-1/2 opacity-5 -z-1">
        <KryosSignature />
      </Absolute> -->

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
    <div
      class="flex flex-col min-h-screen items-center justify-center gap-2 relative"
    >
      <Absolute
        extra-class="bottom-10 -right-20 sm:w-100 lg:w-400  opacity-50 -z-1"
      >
        <KryosPanel :option="7" :stroke-width="1" />
      </Absolute>

      <h2 class="section-title">Deployed Across Critical Sectors</h2>
      <div class="flex flex-wrap items-center justify-center gap-6">
        <KryosCard
          title="Goverment & Defense"
          text="Perimeter defense, border control, urban operations support."
        />
        <KryosCard
          title="Corporate Security"
          text="High-value campus protection, data center security, logistics hubs."
        />
        <KryosCard
          title="Industrial & Energy"
          text="Refineries, mining facilities, off-shore platforms, and hazardous
        environments."
        />
        <KryosCard
          title="Research & Black-Site Operations"
          text="Compartmentalized deployments under classified directives."
        />
      </div>
    </div>
    <!-- End Sectors and Deplyments -->

    <!-- R&D Division Teaser -->
    <div class="flex flex-col items-center gap-6 relative min-h-screen">
      <Absolute extra-class="top-50 left-0 w-200 rotate-180 opacity-50 -z-1">
        <KryosPanel :stroke-width="3" :option="5" />
      </Absolute>

      <Absolute
        extra-class="bottom-10 right-0 w-200 rotate-180 opacity-50 -z-1"
      >
        <KryosPanel :stroke-width="3" :option="6" />
      </Absolute>

      <h2 class="section-title">Kryos Advanced</h2>
      <h2 class="section-title">Systems Division</h2>
      <p class="text-4xl max-w-4xl">
        Our Advanced Systems Division leads research into autonomous
        coordination, adaptive armor, and next-generation sensor architectures.
        Most of our work is never disclosed. What follows is only what's cleared
        for public release.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-6">
        <KryosCard
          title="Swarm Coordination Frameworks"
          text="Multi-unit orchestration protocols enabling synchronized behavior, distributed targeting, and adaptive formation control across autonomous ground platforms."
          :option="2"
        />

        <KryosCard
          title="Adaptive Mobility Systems"
          text="Real-time terrain analysis, traction optimization, and chassis morphing algorithms designed to maintain stability and maneuverability in hostile or unpredictable environments."
          :option="2"
        />

        <KryosCard
          title="Hardened AI Decision Pipelines"
          text="Compartmentalized inference layers engineered to maintain reliability under signal denial, environmental interference, and electronic warfare conditions."
          :option="2"
        />
      </div>
      <NuxtLink to="rdivision" class="link">Inside the R&D Division</NuxtLink>
    </div>
    <!-- End R&D Division Teaser -->

    <!-- News / Press Highlights -->
    <div
      class="flex flex-col items-center justify-center gap-2 h-screen relative"
    >
      <Absolute
        extra-class="bottom-10 left-0 w-200  opacity-50 -z-1"
      >
        <KryosPanel :stroke-width="1" :option="6" />
      </Absolute>
      
      <Absolute
        extra-class="top-50 right-0 w-150 opacity-50 -z-1"
      >
        <KryosPanel :stroke-width="2" :option="3" />
      </Absolute>

      <h2 class="section-title">Recent Announcements</h2>
      <ul
        class="text-4xl font-bold flex flex-col items-center gap-4 text-(--kryos-text-high)"
      >
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
