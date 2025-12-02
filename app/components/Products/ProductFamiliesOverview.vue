<script lang="ts" setup>
import KryosCard from "../Cards/KryosCard.vue";
</script>

<template>
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
</template>
