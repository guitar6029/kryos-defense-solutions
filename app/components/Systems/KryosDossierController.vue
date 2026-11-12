<script lang="ts" setup>
import KryosArcs from "../svg/Systems/KryosArcs.vue";
import KryosCalloutSummary from "./KryosCalloutSummary.vue";
</script>

<template>
  <div
    class="flex flex-col gap-6 p-4 h-screen bg-linear-180 from-bg-(--kryos-bg) to-gray-700 relative overflow-x-hidden overflow-y-auto"
  >
    <KryosArcs />
    <KryosCalloutSummary />
  </div>
</template>
