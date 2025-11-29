<script lang="ts" setup>
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
    <div class="flex flex-col gap-2">
      <h1>Kryos Defense Solutions</h1>
      <span>Autonomous Tactical Roobtics for High-Risk Environments.</span>
      <p>
        Kryos Defense Solutions develops precision-engineered autonomous
        platforms for government, corporate, and critical infrastructure
        security. Our systems are built to operate where human presence is too
        costly—or too dangerous.
      </p>
      <NuxtLink to="/products#kryos-mk-i"> Explore Kryos MK-I </NuxtLink>
      <NuxtLink to="/rdivision"> Learn about our R&D Diviision</NuxtLink>
      <div>
        <div><span>24+ Global Facilities</span></div>
        <div><span>72 Active Deployment Zones</span></div>
        <div><span>Tier-1 Defense Contractor</span></div>
      </div>
    </div>
    <!-- END HERO -->
    <!-- Core Capabilities -->
    <div class="flex flex-col gap-2">
      <h2>What We Build</h2>
      <div class="grid grid-cols-3">
        <div class="flex flex-col gap-2">
          <h1>Autonomous Ground Platforms</h1>
          <p>
            Multi-terrain drones engineered for patrol, interdiction, and
            perimeter security.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h1>Intelligent Target Acquisition</h1>
          <p>
            Sensor fusion, threat classification, and precision response under
            strict rules of engagement.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h1>Secure Systems Integration</h1>
          <p>
            Seamless integration with existing command, surveillance, and
            infrastructure networks.
          </p>
        </div>
      </div>
    </div>
    <!-- End Capabilities -->

    <!-- Kryos Mk-I Spotlight -->
    <div class="flex flex-col gap-2">
      <h2>Flagship Platform: Kryos MK-I</h2>
      <p>
        The Kryos MK-I is a multi-terrain autonomous drone designed for
        high-density urban, industrial, and subterranean environments. With
        six-degrees-of-freedom mobility and a hardened sensor array, MK-I units
        maintain operational integrity where conventional systems fail.
      </p>
      <ul>
        <li>Multi-surface traversal (floor, wall, overhead structures)</li>
        <li>Redundant sensor clusters (thermal, LIDAR, acoustic mapping)</li>
        <li>Modular payload hardpoints</li>
        <li>Encrypted command and control channel</li>
      </ul>
      <NuxtLink to="/products">View full technical specification</NuxtLink>
      <div>
        <span>PRODUCT RENDER / SCHEMATIC HERE</span>
      </div>
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
