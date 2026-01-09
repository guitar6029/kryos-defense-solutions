<script lang="ts" setup>
import GeoShapes from "~/assets/img/shapes/shape5.jpg";
import KryosSectionHeader from "./KryosSectionHeader.vue";
</script>
<template>
  <KryosSectionHeader right-text="SECTOR // ANNOUNCEMENTS" />
  <div
    class="flex flex-col justify-center h-screen relative overflow-hidden -mt-2"
  >
    <img
      :src="GeoShapes"
      alt="KRYOS geometric shapes"
      class="absolute inset-0 w-full h-full object-cover -z-10 mask-fade-bottom opacity-50"
    />

    <h2 class="section-title">Recent Announcements</h2>
    <ul
      class="text-2xl font-bold flex flex-col items-center gap-10 text-(--kryos-text-high) w-full p-4 md:max-w-4xl mx-auto"
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
</template>
