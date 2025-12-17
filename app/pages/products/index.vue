<script lang="ts" setup>
import CapabilitiesOperationNodes from "~/components/Products/CapabilitiesOperationNodes.vue";
import DeploymentProfiles from "~/components/Products/DeploymentProfiles.vue";
import FullViewProduct from "~/components/Products/FullViewProduct.vue";
import ProcurementIntegration from "~/components/Products/ProcurementIntegration.vue";
import ProductCTA from "~/components/Products/ProductCTA.vue";
import ProductFamiliesOverview from "~/components/Products/ProductFamiliesOverview.vue";
import ProductHero from "~/components/Products/ProductHero.vue";
import Roadmap from "~/components/Products/Roadmap.vue";
import SummaryProduct from "~/components/Products/SummaryProduct.vue";
useHead({
  title: "KRYOS | PRODUCTS",
  meta: [
    {
      name: "description",
      content:
        "Explore the full suite of Kryos Defense Solutions platforms, including autonomous ground units, tactical aerial systems, and next-generation exoskeletal technologies engineered for precision operations.",
    },
    {
      name: "keywords",
      content:
        "Kryos products, Kryos Defense Solutions, autonomous platforms, tactical robotics, defense systems, exoskeleton, MK-I, EX-1, military robotics, autonomous vehicles",
    },
    {
      property: "og:title",
      content: "KRYOS | PRODUCTS",
    },
    {
      property: "og:description",
      content:
        "Discover the advanced robotics and tactical systems developed by Kryos Defense Solutions, from autonomous platforms to adaptive exoskeletal units.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<template>
  <div class="flex flex-col relative gap-4 min-h-screen">
    <ProductHero />
    <!-- Product Families Overview -->
    <ProductFamiliesOverview />
    <!-- END Product Families Overview -->

    <!-- Deployment Profiles-->
    <DeploymentProfiles />
    <!-- END Deployment Profiles -->

    <!-- Capabilities & Operating Modes -->
    <CapabilitiesOperationNodes />
    <!-- END Capabilities & Operating Modes -->

    <!-- Kryos MK-I Flagship Spotlight -->
    <section class="flex flex-col items-center gap-8 relative">
      <FullViewProduct model="MK" />
      <SummaryProduct model="MK" />
      <div class="flex flex-col item-center justify-center gap-4">
        <ProductCTA
          text="Access full specifications, autonomous modes, and mission parameters"
          to="/products/mk-1"
          linkLabel="Open MK-I Tactical Platform brief"
        />
        <ProductCTA
          text="View operational modes and deployment profiles"
          to="#"
          linkLabel="Request MK-I technical dossier"
        />
      </div>
    </section>
    <!-- END Kryos MK-I Flagship Spotlight -->

    <!-- Kryos EX-1 Tactical ExoFrame Spotlight  -->
    <section class="flex flex-col items-center gap-8 relative">
      <FullViewProduct model="EX" />
      <SummaryProduct model="EX" />
      <div class="flex flex-col item-center justify-center gap-4">
        <ProductCTA
          text="View full specifications, operating modes, and deployment profiles"
          to="/products/ex-1"
          linkLabel="Open EX-1 Tactical ExoFrame brief"
        />
        <ProductCTA
          text="View deployment modes and profiles"
          to="#"
          linkLabel="Request detailed technical brief"
        />
      </div>
    </section>
    <!-- END Kryos EX-1 Tactical ExoFrame Spotlight -->

    <!-- Roadmap / Future Platforms -->
    <Roadmap />
    <!-- END Roadmap / Future Platforms -->

    <!-- Procurement & Integration CTA -->
    <ProcurementIntegration />
    <!-- end Procurement & Integration CTA -->
  </div>
</template>
