<script lang="ts" setup>
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import DeploymentProfiles from "~/components/Products/DeploymentProfiles.vue";
import FullViewProduct from "~/components/Products/FullViewProduct.vue";
import ProductCTA from "~/components/Products/ProductCTA.vue";
import ProductFamiliesOverview from "~/components/Products/ProductFamiliesOverview.vue";
import ProductHero from "~/components/Products/ProductHero.vue";
import SummaryProduct from "~/components/Products/SummaryProduct.vue";
import Absolute from "~/components/Wrapper/Absolute.vue";
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
  <div class="flex flex-col relative min-h-screen">
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
    <KryosSectionHeader right-text="MK-1" />
    <section class="flex flex-col gap-8 relative mt-24 p-4">
      <div class="flex flex-col items-center">
        <FullViewProduct model="MK" />
      </div>

      <Absolute extra-class="top-100 right-0 opacity-30 w-200 ">
        <KryosPanel :option="8" />
      </Absolute>
    </section>
    <!-- END Kryos MK-I Flagship Spotlight -->

    <!-- Kryos EX-1 Tactical ExoFrame Spotlight  -->
    <KryosSectionHeader right-text="EX-1" />
    <section class="flex flex-col gap-8 relative mt-24 p-4">
      <div
        class="flex flex-col lg:flex-row items-stretch lg:items-center justify-around gap-8"
      >
        <FullViewProduct model="EX" />
      </div>
      <Absolute extra-class="top-100 right-0 opacity-30 w-200">
        <KryosPanel :option="8" />
      </Absolute>
    </section>

    <!-- END Kryos EX-1 Tactical ExoFrame Spotlight -->
  </div>
</template>
