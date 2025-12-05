<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import KryosBld from "~/assets/img/kryos-building.jpg";
import KryosMission from "~/assets/img/our_mission.jpg";
</script>

<template>
  <div class="flex flex-col min-h-screen justify-center gap-12 relative">
    <img
      :src="KryosBld"
      alt="Kryos Defense Solution Tall Building"
      class="absolute top-0 right-0 w-250 h-auto -z-1 opacity-40"
    />

    <section class="flex flex-col gap-6 p-12 relative pl-24">
      <Absolute
        extra-class="top-0 left-0 w-full h-300 bg-(--kryos-bg-alt) -z-2 p-4"
      >
        <KryosPanel :option="6" extra-class="opacity-50 w-auto h-full" />
      </Absolute>

      <!-- <h1 class="section-title">Kryos Defense Solutions</h1> -->
      <p class="max-w-4xl text-4xl">
        <span class="font-bold text-6xl">Kryos Defense Solutions</span>
        is a privately held defense technology contractor specializing in
        autonomous tactical robotics, sensor fusion systems, and secure
        infrastructure protection. We operate at the intersection of advanced
        research, industrial engineering, and field-proven deployment.
      </p>

      <p class="max-w-4xl text-4xl">
        To deliver autonomous systems that extend human reach into environments
        where presence is too costly, too complex, or too dangerous.
      </p>
      <p class="max-w-4xl text-4xl">
        Every platform we build is designed to reduce risk, increase stability,
        and maintain operational continuity under pressure.
      </p>
    </section>

    <!-- Leadership Team -->
    <section
      class="flex flex-col items-center justify-center gap-12 text-4xl bg-(--kryos-bg) relative z-10 mb-10"
    >
      <Absolute extra-class="bottom-50 -left-15 w-100 -z-1 ">
        <KryosPanel :option="8" />
      </Absolute>

      <Absolute extra-class="bottom-50 -left-25 w-150 -z-1 ">
        <KryosPanel :option="8" />
      </Absolute>

      <Absolute extra-class="bottom-20 -right-10 w-100 -z-1 ">
        <KryosPanel :option="8" />
      </Absolute>

      <Absolute extra-class="top-50 -left-10 w-100 -z-1 ">
        <KryosPanel :option="8" />
      </Absolute>

      <Absolute extra-class="top-20 -left-10 w-120 -z-1 ">
        <KryosPanel :option="8" />
      </Absolute>

      <Absolute extra-class="top-10 -right-10 w-50 -z-1">
        <KryosPanel :option="10" />
      </Absolute>

      <h2 class="text-6xl font-bold text-center">Executive Leadership</h2>
      <div class="flex flex-col items-center gap-2 max-w-4xl p-2">
        <h3>
          <span class="font-bold">Helena Voss</span> — Chief Executive Officer
        </h3>
        <p class="max-w-4xl">
          Oversees global strategy, corporate partnerships, and high-level
          procurement initiatives, with a background in defense logistics and
          predictive risk modeling.
        </p>
      </div>

      <div class="flex flex-col gap-2 max-w-4xl p-2">
        <h3>
          <span class="font-bold">Dr. Rowan Ilyan</span> — Chief Technology
          Officer
        </h3>
        <p class="max-w-4xl">
          Leads platform architecture, AI decision frameworks, and long-horizon
          research programs within the Advanced Systems Division.
        </p>
      </div>

      <div class="flex flex-col gap-2 max-w-4xl p-2">
        <h3>
          <span class="font-bold">Col. Marcus Hale (Ret.)</span> — Chief
          Security Operations Officer
        </h3>

        <p class="max-w-4xl">
          Coordinates deployment doctrine, field testing, and operational
          integration with defense and security entities worldwide.
        </p>
      </div>

      <div class="flex flex-col gap-2 max-w-4xl">
        <h3>
          <span class="font-bold">Yara Chen</span> — Director of Infrastructure
          & Compliance
        </h3>

        <p class="max-w-4xl">
          Manages regulatory alignment, export controls, and infrastructure
          security standards across all Kryos facilities.
        </p>
      </div>
    </section>

    <!-- End Leadership Team -->
  </div>
</template>
