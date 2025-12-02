<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import KryosCard from "~/components/Cards/KryosCard.vue";
import ProcurementIntegration from "~/components/Products/ProcurementIntegration.vue";
import Roadmap from "~/components/Products/Roadmap.vue";
import DeploymentProfiles from "~/components/Products/DeploymentProfiles.vue";
import CapabilitiesOperationNodes from "~/components/Products/CapabilitiesOperationNodes.vue";
import FullViewProduct from "~/components/Products/FullViewProduct.vue";
import SummaryProduct from "~/components/Products/SummaryProduct.vue";
import VideoFullPanel from "~/components/Products/VideoFullPanel.vue";
</script>

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
      <p
        class="relative bottom-0 text-(--kryos-warn) text-4xl max-w-2xl text-center mt-10"
      >
        Note: Certain platform configurations are restricted and available only
        under classified procurement channels.
      </p>
    </section>
    <!-- END Product Families Overview -->

    <!-- Kryos MK-I Flagship Spotlight -->
    <section class="flex flex-col items-center gap-10 relative">
      <FullViewProduct model="mk1" />

      <SummaryProduct model="mk1" />

      <VideoFullPanel model="mk1" />

      <!-- blocks -->
      <div
        class="flex flex-col justify-center gap-4 mb-50 relative w-full min-h-screen"
      >
        <Absolute extra-class="absolute bottom-0 left-0 w-100 -z-1 ">
          <KryosPanel :option="6" />
        </Absolute>
        <Absolute extra-class="absolute bottom-0 right-0 w-100 -z-1 rotate-45">
          <KryosPanel :option="6" />
        </Absolute>
        <Absolute extra-class="absolute top-20 -right-10 w-150 -z-1 rotate-45">
          <KryosPanel :option="8" />
        </Absolute>

        <Absolute extra-class="absolute top-0 left-0 w-200 -z-1">
          <KryosPanel :option="8" />
        </Absolute>
        <h3 class="text-6xl text-center">Core Specifications</h3>
        <ul class="flex flex-col items-center gap-4 text-4xl">
          <li>
            <span class="font-bold">Configuration:</span> Six-legged autonomous
            ground platform
          </li>
          <li>
            <span class="font-bold">Mobility Envelope:</span> Floor, wall, and
            overhead structural traversal
          </li>
          <li>
            <span class="font-bold">Endurance:</span> 18-26 hours continuous
            operation (environment dependent)
          </li>
          <li>
            <span class="font-bold">Sensor Suite:</span> Thermal, LIDAR,
            acoustic, and inertial mapping
          </li>
          <li>
            <span class="font-bold">Communications:</span> Encrypted,
            multi-channel command and telemetry link
          </li>
          <li>
            <span class="font-bold">Payload:</span> Two modular hardpoints,
            configurable per deployment
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-center gap-2">
        <h3 class="text-6xl">System Architecture</h3>
        <p class="max-w-4xl text-2xl">
          MK-I units are built on a hardened core chassis with isolated compute,
          power, and mobility subsystems. Critical functions are distributed
          across redundant modules, ensuring continued operation under partial
          damage or signal disruption.
        </p>

        <p class="max-w-4xl text-2xl">
          Decision pipelines are designed to preserve operator intent while
          allowing low-latency autonomous adjustments to terrain, threat
          posture, and local conditions.
        </p>
      </div>

      <div class="flex flex-col text-center gap-2 mb-50">
        <p class="text-center text-4xl">View deployment modes and profiles</p>
        <NuxtLink to="/contact" class="link"
          >Request detailed technical brief</NuxtLink
        >
      </div>
    </section>
    <!-- END Kryos MK-I Flagship Spotlight -->

    <!-- Kryos EX-1 Tactical ExoFrame Spotlight  -->
    <section class="flex flex-col items-center gap-10 relative">
      <!-- hero -->
      <FullViewProduct model="ex1" />

      <!-- summary block -->
      <SummaryProduct model="ex1" />

      <!-- teaser video -->
      <VideoFullPanel model="ex1" />

      <!-- preview specs -->
      <div
        class="flex flex-col justify-center gap-4 mb-50 relative w-full min-h-[70vh]"
      >
        <Absolute extra-class="absolute bottom-0 left-0 w-100 -z-1">
          <KryosPanel :option="6" />
        </Absolute>
        <Absolute extra-class="absolute bottom-0 right-0 w-100 -z-1 rotate-45">
          <KryosPanel :option="6" />
        </Absolute>
        <Absolute extra-class="absolute top-10 -right-10 w-150 -z-1 rotate-45">
          <KryosPanel :option="8" />
        </Absolute>
        <Absolute extra-class="absolute top-0 left-0 w-200 -z-1">
          <KryosPanel :option="8" />
        </Absolute>

        <h3 class="text-6xl text-center">Core Specifications</h3>
        <ul class="flex flex-col items-center gap-4 text-4xl">
          <li>
            <span class="font-bold">Configuration:</span>
            Humanoid powered exoskeleton platform
          </li>
          <li>
            <span class="font-bold">Primary Role:</span>
            Assisted lift, hazardous-material handling, and tactical support in
            constrained environments
          </li>
          <li>
            <span class="font-bold">Augmentation Channel:</span>
            Full-body mechanical linkage with spine, shoulder, and leg actuation
          </li>
          <li>
            <span class="font-bold">Control Model:</span>
            Operator-in-the-loop with motion amplification and safety constraint
            layers
          </li>
          <li>
            <span class="font-bold">Compatibility:</span>
            Shares compute, power, and telemetry stack with Kryos MK-series
            ground platforms
          </li>
        </ul>
      </div>

      <div class="flex flex-col text-center gap-2 mb-50">
        <p class="text-center text-4xl">
          View full specifications, operating modes, and deployment profiles
        </p>
        <NuxtLink to="/products/ex-1" class="link">
          Open EX-1 Tactical ExoFrame brief
        </NuxtLink>
      </div>
    </section>
    <!-- END Kryos EX-1 Tactical ExoFrame Spotlight -->

    <!-- Capabilities & Operating Modes -->
    <CapabilitiesOperationNodes />
    <!-- END Capabilities & Operating Modes -->

    <!-- Deployment Profiles-->
    <DeploymentProfiles />
    <!-- END Deployment Profiles -->

    <!-- Roadmap / Future Platforms -->
    <Roadmap />
    <!-- END Roadmap / Future Platforms -->

    <!-- Procurement & Integration CTA -->
    <ProcurementIntegration />
    <!-- end Procurement & Integration CTA -->
  </div>
</template>
