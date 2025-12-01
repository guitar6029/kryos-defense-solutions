<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import KryosCard from "~/components/Cards/KryosCard.vue";
import MKIVideo from "~/assets/video/mki.mp4";
import MKIModel from "~/assets/img/mk-i-no-bg.png";
import MKIModelBg from "~/assets/img/mk-i.jpg";
</script>

<!-- <main>
  [1] Page Title + Intro
  [2] Product Families Overview
  [3] Kryos MK-I – Flagship Spotlight
  [4] Capabilities & Operating Modes
  [5] Deployment Profiles
  [6] Roadmap / Future Platforms
  [7] Procurement & Integration CTA
</main> -->

<template>
  <div class="flex flex-col relative gap-4 min-h-screen">
    <Absolute extra-class="top-20 left-1/2 -translate-x-1/2 w-200">
      <KryosPanel :option="11" />
    </Absolute>

    <section
      class="flex flex-col relative items-center justify-center gap-4 min-h-[50vh]"
    >
      <h1 class="section-title">Kryos Platform Catalog</h1>
      <p class="text-2xl max-w-2xl">
        Kryos Defense Solutions develops autonomous platforms engineered for
        long-duration deployment in high-risk, high-value environments. Each
        system is built on a shared core architecture, with configurations
        tailored to specific operational demands.
      </p>
      <p class="text-2xl max-w-2xl">
        This catalog summarizes the platforms currently available for
        procurement, starting with our flagship ground unit.
      </p>
    </section>
    <!-- Product Families Overview -->
    <section class="flex flex-col items-center min-h-screen gap-6 mb-50">
      <h2 class="section-title">Platform Families</h2>
      <div class="flex flex-wrap items-center justify-center gap-6">
        <KryosCard
          title="Ground Platforms (Active)"
          text="Autonomous, multi-terrain units for patrol, interdiction, and close
        asset protection."
        />

        <KryosCard
          title="Aerial Recon Platforms (In Development)"
          text="Lightweight, persistent-surveillance drones designed for layered
        situational awareness."
        />

        <KryosCard
          title="Infrastructure Integration Systems (In Development)"
          text="Embedded systems for transit networks, industrial facilities, and
        critical infrastructure nodes."
        />

        <KryosCard
          title="Ground Platforms (Active)"
          text="Autonomous, multi-terrain units for patrol, interdiction, and close
        asset protection."
        />
      </div>
      <p class="text-(--kryos-warn) text-4xl">
        Note: Certain platform configurations are restricted and available only
        under classified procurement channels.
      </p>
    </section>
    <!-- END Product Families Overview -->

    <!-- Kryos MK-I Flagship Spotlight -->
    <section class="flex flex-col items-center gap-2 relative">
      <div class="w-full h-screen bg-(--kryos-mk-bg) relative pb-60">
        <h2
          class="absolute top-10 left-1/2 -translate-x-1/2 font-orbitron font-extrabold text-[10rem] z-10"
        >
          KRYOS MK-I
        </h2>
        <img
          :src="MKIModel"
          alt="MKI Model with background"
          class="w-500 absolute left-1/2 -translate-x-1/2 -bottom-24 lg:-bottom-32"
        />
        <Absolute
          extra-class="absolute bottom-10 left-25 -rotate-90 origin-bottom-left"
        >
          <div class="border-4 p-2">
            <span class="font-orbitron font-extrabold text-8xl"
              >KRYOS MK-I</span
            >
          </div>
        </Absolute>
      </div>

      <div class="relative flex gap-2 mt-50 border h-125">
        <div
          class="absolute bottom-0 left-0 -rotate-90 origin-bottom-left w-125 h-25 border translate-x-px flex flex-col items-center justify-center"
        >
          <span class="font-orbitron font-extrabold text-6xl">KRYOS MK-I</span>
        </div>

        <div class="flex flex-col justify-center gap-2 p-2 max-w-2xl">
          <h2 class="text-6xl">Kryos MK-I Autonomous Tactical Drone</h2>
          <p class="text-2xl">
            The Kryos MK-I is a multi-terrain ground platform designed for dense
            urban, industrial, and subterranean environments. Six-degree
            mobility, redundant sensor arrays, and modular payload interfaces
            allow MK-I units to operate continuously under adverse conditions.
          </p>
        </div>
      </div>
      <!-- 
      <div class="max-w-300 absolute right-0 top-10">
        <img :src="MKIModel" alt="Kryos MKI model" />
      </div> -->

      <video controls muted class="w-full">
        <source :src="MKIVideo" type="video/webm" />
      </video>

      <!-- blocks -->
      <!-- <div class="flex flex-col gap-2">
        <h3>Core Specifications</h3>
        <ul>
          <li>Configuration: Six-legged autonomous ground platform</li>
          <li>
            Mobility Envelope: Floor, wall, and overhead structural traversal
          </li>
          <li>
            Endurance: 18-26 hours continuous operation (environment dependent)
          </li>
          <li>Sensor Suite: Thermal, LIDAR, acoustic, and inertial mapping</li>
          <li>
            Communications: Encrypted, multi-channel command and telemetry link
          </li>
          <li>Payload: Two modular hardpoints, configurable per deployment</li>
        </ul>
      </div> -->
      <!-- <div class="flex flex-col gap-2">
        <h3>System Architecture</h3>
        <p>
          MK-I units are built on a hardened core chassis with isolated compute,
          power, and mobility subsystems. Critical functions are distributed
          across redundant modules, ensuring continued operation under partial
          damage or signal disruption.
        </p>

        <p>
          Decision pipelines are designed to preserve operator intent while
          allowing low-latency autonomous adjustments to terrain, threat
          posture, and local conditions.
        </p>
      </div> -->

      <!-- <div class="flex flex-col gap-2">
      
        <p>View deployment modes and profiles</p>
        <NuxtLink to="/contact" class="link"
          >Request detailed technical brief</NuxtLink
        >
      </div> -->
    </section>
    <!-- END Kryos MK-I Flagship Spotlight -->

    <!-- Capabilities & Operating Modes -->
    <!-- <section class="flex flex-col gap-2">
      <h2 class="section-title">Capabilities & Operating Modes</h2>
      <div class="flex flex-col gap-2">
        <h3>Platform Capabilities</h3>
        <ul>
          <li>
            <span>Autonomous Patrol</span>
            <p>
              - Configurable patrol routes with adaptive pathfinding around new
              obstacles and environmental changes.
            </p>
          </li>
          <li>
            <span>Threat Detection & Classification</span>
            <p>
              - Real-time analysis of motion, thermal signatures, and anomalous
              patterns within defined perimeters.
            </p>
          </li>
          <li>
            <span>Zone Enforcement</span>
            <p>
              - Configurable soft and hard boundaries, with escalating response
              ladders based on client policy.
            </p>
          </li>
          <li>
            <span>Data Capture & Forensics</span>
            <p>
              - Continuous logging of visual, positional, and environmental data
              for post-incident review.
            </p>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Operating Modes</h3>
        <div class="flex flex-col gap-2">
          <h3>Recon Modes</h3>
          <p>
            Low-profile traversal with reduced visible signature and emphasis on
            mapping, observation, and silent tracking.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Interdiction Mode</h3>
          <p>
            Aggressive posture with priority on deterrence, boundary
            enforcement, and response escalation under operator-defined rules of
            engagement.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Guard Mode</h3>
          <p>
            Fixed or bounded operation around a constrained perimeter, ideal for
            static high-value assets and chokepoints.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Transit Mode</h3>
          <p>
            Optimized for movement between sectors, with reduced sensor
            footprint and energy-efficient path planning.
          </p>
        </div>
      </div>
    </section> -->
    <!-- END Capabilities & Operating Modes -->

    <!-- Deployment Profiles-->
    <!-- <section class="flex flex-col gap-2">
      <h2 class="section-title">Deployment Profiles</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-2">
          <h3>Tier-1 Corporate Campus Security</h3>
          <p>
            MK-I units dynamically patrol access corridors, loading bays, and
            server infrastructure while coordinating with fixed surveillance
            assets.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Transit & Subterranean Infrastructure</h3>
          <p>
            Deployed within tunnels, service passages, and maintenance corridors
            to monitor structural integrity and detect unauthorized presence.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Energy & Industrial Facilities</h3>
          <p>
            Equipped with specialized payloads for gas detection, heat mapping,
            and operational anomaly detection in refineries and
            heavy-manufacturing plants.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Restricted Black-Site Operations</h3>
          <p>
            Certain deployments operate under full classification, with modified
            firmware and non-disclosed payload configurations.
          </p>
        </div>
      </div>
    </section> -->
    <!-- END Deployment Profiles -->

    <!-- Roadmap / Future Platforms -->
    <!-- <section class="flex flex-col gap-2">
      <h2 class="section-title">Upcoming Platforms</h2>
      <div class="flex flex-col gap-2">
        <h3>Kryos MK-II (Concept Stage)</h3>
        <p>
          A heavier, armor-enhanced variant designed for contested environments
          and direct interface with mechanized units.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Kryos Aerial Recon Node (ARN-Series)</h3>
        <p>
          Lightweight aerial platforms focused on persistent overhead
          surveillance and integrated targeting support.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Kryos Swarm Coordination Package</h3>
        <p>
          Software layer enabling multi-unit coordination for coverage,
          redundancy, and complex perimeter management.
        </p>
      </div>
    </section> -->
    <!-- END Roadmap / Future Platforms -->

    <!-- Procurement & Integration CTA -->
    <!-- <section
      class="flex flex-col items-center justify-center gap-2 min-h-screen"
    >
      <h2 class="section-title">Procurement & Systems Integration</h2>
      <p class="text-4xl max-w-2xl">
        Kryos platforms are available under controlled procurement channels for
        qualified defense, security, and critical infrastructure clients. Each
        deployment is preceded by a joint assessment phase to align platform
        capabilities with operational requirements and regulatory frameworks.
      </p>
      <p class="text-2xl max-w-2xl">
        For procurement inquiries, integration planning, or technical briefings,
        contact the Kryos deployment team.
      </p>
      <NuxtLink to="/contact" class="link"
        >Contact Kryos Deployment Team</NuxtLink
      >
    </section> -->
    <!-- end Procurement & Integration CTA -->
  </div>
</template>
