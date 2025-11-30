<script lang="ts" setup>
import Absolute from "@/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
</script>

<template>
  <div class="flex flex-col gap-2 min-h-screen">
    <!-- HERO -->
    <Hero />
    <!-- END HERO -->

    <!-- Core Capabilities -->
    <CoreCapabilities />
    <!-- End Capabilities -->

    <!-- Kryos Mk-I Spotlight -->
    <KryosHighlightMKI />
    <!-- End Kryos Mk-I Spotlight -->

    <!-- Sectors and Deplyments -->
    <SectorDeployments />
    <!-- End Sectors and Deplyments -->

    <!-- R&D Division Teaser -->
    <RDivision />
    <!-- End R&D Division Teaser -->

    <!-- News / Press Highlights -->
    <Highlights />
    <!-- End News / Press Highlights -->
  </div>
</template>
