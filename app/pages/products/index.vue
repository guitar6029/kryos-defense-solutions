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
import ProductCTA from "~/components/Products/ProductCTA.vue";
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
    <section class="flex flex-col items-center gap-8 relative">
      <FullViewProduct model="mk1" />
      <SummaryProduct model="mk1" />
      <div class="flex flex-col item-center justify-center gap-4">
        <ProductCTA
          text="Access full specifications, autonomous modes, and mission parameters"
          to="/products/mk-1"
          linkLabel="Open MK-I Tactical Platform brief"
        />
        <ProductCTA
          text="View operational modes and deployment profiles"
          to="/contact"
          linkLabel="Request MK-I technical dossier"
        />
      </div>
    </section>
    <!-- END Kryos MK-I Flagship Spotlight -->

    <!-- Kryos EX-1 Tactical ExoFrame Spotlight  -->
    <section class="flex flex-col items-center gap-8 relative">
      <FullViewProduct model="ex1" />
      <SummaryProduct model="ex1" />
      <div class="flex flex-col item-center justify-center gap-4">
        <ProductCTA
          text="View full specifications, operating modes, and deployment profiles"
          to="/products/ex-1"
          linkLabel="Open EX-1 Tactical ExoFrame brief"
        />
        <ProductCTA
          text="View deployment modes and profiles"
          to="/contact"
          linkLabel="Request detailed technical brief"
        />
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
