<script lang="ts" setup></script>

<template>
  <section
    class="relative flex h-screen items-center justify-center overflow-hidden"
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
      <div
        class="text-2xl xl:text-6xl z-10 flex flex-col gap-2 relative top-30 font-bold"
      >
        <span>KRYOS</span>
        <span>SYSTEM CATALOG</span>
        <span class="text-xl">RESTRICTED ACCESS</span>
      </div>

      <div class="sm:block md:hidden absolute inset-0">
        <svg
          class="w-full h-full"
          viewBox="0 0 1667 899"
          fill="#7f4105"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1666.2 898.5V0.5H863.203H0.202881L545.203 242.5L1029.7 356L674.203 772.5L1029.7 898.5H1666.2Z"
            stroke="#041520"
            stroke-width="4"
          />
        </svg>
      </div>

      <div class="hidden md:block absolute inset-0 opacity-90">
        <svg
          class="w-full h-full"
          viewBox="0 0 587 785"
          fill="#7f4105"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0.568359 86L68.5684 0.5H585.568V784H68.5684L34.5684 693.5L213.568 543L114.068 443.5V321.5L49.0684 213.5L0.568359 86Z"
            stroke="#041520"
            stroke-width="4"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
