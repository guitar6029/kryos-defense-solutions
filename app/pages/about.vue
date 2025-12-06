<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import KryosBld from "~/assets/img/kryos-building.jpg";

// leadership img
import ColMarcusHale from "~/assets/img/leadership/col_marcus_hale.png";
import DrRowan from "~/assets/img/leadership/dr_rowan_ilyan.png";
import YaraChen from "~/assets/img/leadership/yara_chen.png";
import HelenaVoss from "~/assets/img/leadership/helena_voss.png";

import Splitter from "~/components/Splitter.vue";
import DotDashed from "~/components/svg/DotDashed.vue";
import PillDashed from "~/components/svg/PillDashed.vue";
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
        <span class="font-bold text-6xl text-(--kryos-warn)"
          >[Kryos Defense Solutions]</span
        >
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

      <Absolute extra-class="bottom-150 -right-10 w-100 -z-1 rotate-45 ">
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

      <Absolute extra-class="top-400 -left-10 w-50 -z-1 -rotate-180">
        <KryosPanel :option="10" />
      </Absolute>

      <Absolute extra-class="top-400 -right-150 w-300 -z-1 opacity-50">
        <DotDashed />
      </Absolute>

      <Absolute extra-class="top-250 -left-10 w-100 -z-1 opacity-50 ">
        <PillDashed />
      </Absolute>

      <Splitter rightText="// LEADERSHIP" />

      <h2 class="text-6xl font-bold text-center">Executive Leadership</h2>

      <!-- CEO -->
      <div class="flex flex-row items-center gap-6">
        <div class="shrink-0 w-100 flex-col gap-2">
          <img
            :src="HelenaVoss"
            alt="Helena Voss - CEO"
            class="w-100 rounded-xl"
          />
          <div class="flex flex-col">
            <span class="font-bold text-(--kryos-warn)">Helena Voss</span>
            <span class="italic">Chief Executive Officer</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 max-w-2xl p-2">
          <p>
            Oversees global strategy, corporate partnerships, and high-level
            procurement initiatives, with a background in defense logistics and
            predictive risk modeling.
          </p>
        </div>
      </div>

      <div class="h-5 w-full border-b-8 border-(--kryos-bg-alt)"></div>

      <!-- CTO -->
      <div class="flex flex-row items-center gap-6 mt-12">
        <div class="shrink-0 w-100 flex flex-col gap-2">
          <img
            :src="DrRowan"
            alt="Dr. Rowan Ilyan - CTO"
            class="w-100 rounded-xl"
          />
          <div class="flex flex-col">
            <span class="font-bold text-(--kryos-warn)">Dr. Rowan Ilyan</span>
            <span class="italic">Chief Technology Officer</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 max-w-2xl p-2">
          <p>
            Leads platform architecture, AI decision frameworks, and
            long-horizon research programs within the Advanced Systems Division.
          </p>
        </div>
      </div>

      <div class="h-5 w-full border-b-8 border-(--kryos-bg-alt)"></div>

      <!-- CSOO -->
      <div class="flex flex-row items-center gap-6 mt-12">
        <div class="shrink-0 w-100 flex flex-col gap-2">
          <img
            :src="ColMarcusHale"
            alt="Col. Marcus Hale - CSOO"
            class="w-100 rounded-xl"
          />
          <div class="flex flex-col">
            <span class="font-bold text-(--kryos-warn)"
              >Col. Marcus Hale (Ret.)</span
            >
            <span class="italic">Chief Security Operations Officer</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 max-w-2xl p-2">
          <p>
            Coordinates deployment doctrine, field testing, and operational
            integration with defense and security entities worldwide.
          </p>
        </div>
      </div>

      <div class="h-5 w-full border-b-8 border-(--kryos-bg-alt)"></div>

      <!-- Director of Infrastructure -->
      <div class="flex flex-row items-center gap-6 mt-12">
        <div class="shrink-0 w-100 flex flex-col gap-2">
          <img
            :src="YaraChen"
            alt="Yara Chen - Director of Infrastructure & Compliance"
            class="w-100 rounded-xl"
          />
          <div class="flex flex-col">
            <span class="font-bold text-(--kryos-warn)">Yara Chen</span>
            <span class="italic">Director of Infrastructure & Compliance</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 max-w-2xl p-2">
          <p>
            Manages regulatory alignment, export controls, and infrastructure
            security standards across all Kryos facilities.
          </p>
        </div>
      </div>
    </section>

    <!-- End Leadership Team -->
  </div>
</template>
