<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import CapabilitiesOperationNodes from "~/components/Products/CapabilitiesOperationNodes.vue";
import DeploymentProfiles from "~/components/Products/DeploymentProfiles.vue";
import FullViewProduct from "~/components/Products/FullViewProduct.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import ProcurementIntegration from "~/components/Products/ProcurementIntegration.vue";
import ProductCTA from "~/components/Products/ProductCTA.vue";
import ProductFamiliesOverview from "~/components/Products/ProductFamiliesOverview.vue";
import ProductHero from "~/components/Products/ProductHero.vue";
import Roadmap from "~/components/Products/Roadmap.vue";
import SummaryProduct from "~/components/Products/SummaryProduct.vue";
</script>

<template>
  <div class="flex flex-col relative gap-4 min-h-screen">
    <!-- <Absolute extra-class="top-20 left-1/2 -translate-x-1/2 w-200">
      <KryosPanel :option="11" />
    </Absolute> -->

    <ProductHero />
    <!-- Product Families Overview -->
    <ProductFamiliesOverview />
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
