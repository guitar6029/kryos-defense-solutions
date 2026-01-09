<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>

<template>
  <footer
    class="min-h-150 bg-(--kryos-bg-alt) flex flex-col gap-4 p-12 relative z-1 cursor-default"
  >
    <Absolute extra-class="top-50 right-20 w-100 -z-1">
      <KryosPanel :option="11" />
    </Absolute>

    <Absolute extra-class="top-60 right-50 w-50 -z-2">
      <KryosPanel :option="11" />
    </Absolute>

    <Absolute extra-class="top-50 left-10 w-150 -z-2">
      <KryosPanel :option="13" />
    </Absolute>

    <Absolute
      extra-class="bottom-10 left-10 -z-3 origin-bottom-left -rotate-90"
    >
      <span class="border-b-2">KRYOS</span>
    </Absolute>

    <div class="text-2xl flex flex-col gap-2">
      <span class="uppercase font-bold font-orbitron"
        >Kryos Defense Solutions</span
      >
      <span class="text-xl italic border-b-2 w-fit"
        >Precision Beyond Human Limits.</span
      >
    </div>

    <div class="grid grid-cols-4 gap-2">
      <!-- COL 1 -->
      <div class="flex flex-col gap-2 col-span-2 xl:col-span-1">
        <h2 class="footer-section-title">Operational Partnerships</h2>
        <div class="flex flex-col gap-4 trns">
          <NuxtLink to="#" class="hv-text trns"
            >Defense & Strategic Agencies</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns">Industrial Partners</NuxtLink>
          <NuxtLink to="#" class="hv-text trns"
            >Research Consortium Access</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Autonomous Systems Contractors</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Supply Chain Integrators</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns">KryosConnect Portal</NuxtLink>
        </div>
      </div>

      <!-- COL 2 -->
      <div class="flex flex-col gap-2 col-span-2 xl:col-span-1">
        <h2 class="footer-section-title">R&D Divisions</h2>
        <div class="flex flex-col gap-4">
          <NuxtLink to="#" class="hv-text trns"
            >Ares Autonomous Platforms</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >CryoCore Intelligence Lab</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Microsystem Blackcell Group</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Tactical Robotics Bureau</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Applied Combat Sciences</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Innovation Incubation Node</NuxtLink
          >
        </div>
      </div>

      <!-- COL 3 -->
      <div class="flex flex-col gap-2 col-span-2 xl:col-span-1">
        <h2 class="footer-section-title">Careers & Recruitment</h2>
        <div class="flex flex-col gap-4">
          <NuxtLink to="#" class="hv-text trns">Field Operator Track</NuxtLink>
          <NuxtLink to="#" class="hv-text trns"
            >Engineering & Fabrication</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >AI & Systems Intelligence</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Contractor Opportunities</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns">Fellowship Programs</NuxtLink>
          <NuxtLink to="#" class="hv-text trns">Life Inside KRYOS</NuxtLink>
        </div>
      </div>

      <!-- COL 4 -->
      <div class="flex flex-col gap-2 col-span-2 xl:col-span-1">
        <h2 class="footer-section-title">Corporate Intelligence</h2>
        <div class="flex flex-col gap-4">
          <NuxtLink to="#" class="hv-text trns">Our Mission Charter</NuxtLink>
          <NuxtLink to="#" class="hv-text trns">Founding & History</NuxtLink>
          <NuxtLink to="#" class="hv-text trns">Leadership Cell</NuxtLink>
          <NuxtLink to="#" class="hv-text trns"
            >Compliance & Export Protocols</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Facilities & Secure Sites</NuxtLink
          >
          <NuxtLink to="#" class="hv-text trns"
            >Public Disclosure Archive</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>
