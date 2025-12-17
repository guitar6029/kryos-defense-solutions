<script lang="ts" setup></script>

<template>
  <section
    class="relative flex h-[50vh] items-center justify-center overflow-hidden"
  >
    <!-- Background image -->
    <img
      src="~/assets/img/kryos_catalog.png"
      alt="Kryos Catalog"
      class="absolute inset-0 w-full h-full object-cover opacity-70"
    />

    <div
      class="absolute top-0 right-0 z-10 w-full md:w-1/2 shrink-0 h-full flex flex-col items-center gap-2"
    >
      <div class="text-xl z-10 flex flex-col gap-2 relative top-30 font-bold">
        <span class="kryos-bracket">KRYOS SYSTEM CATALOG</span>
        <span class="kryos-text pl-2">RESTRICTED ACCESS</span>
      </div>

      <div class="absolute inset-0">
        <svg
          class="w-full h-full"
          viewBox="0 0 1291 1524"
          fill="var(--kryos-bg)"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1290.5 0.5H148.5H0.5V188.5L94.5 287.5V421L40 692.5V1118L148.5 1207V1360L440.5 1523H1290.5V0.5Z"
            stroke="var(--kryos-accent)"
            stroke-width="4"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
