<script lang="ts" setup>
import Wall from "~/assets/img/wall-panel.jpg";
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center">
    <!-- Background image -->
    <img
      :src="Wall"
      alt="gray wall"
      class="absolute inset-0 w-full h-full object-cover -z-10 opacity-40"
    />

    <!-- Optional dark overlay to boost contrast -->
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center gap-6 px-4">
      <h1 class="section-title bg-(--kryos-bg) px-8 py-4">
        Kryos Platform Catalog
      </h1>

      <div
        class="relative text-4xl flex flex-col gap-4 border bg-black/60 px-6 py-4 max-w-3xl"
      >
        <p>
          Kryos Defense Solutions develops autonomous platforms engineered for
          long-duration deployment in high-risk, high-value environments. Each
          system is built on a shared core architecture, with configurations
          tailored to specific operational demands.
        </p>
        <p>
          This catalog summarizes the platforms currently available for
          procurement, starting with our flagship ground unit.
        </p>
      </div>
    </div>
  </section>
</template>
