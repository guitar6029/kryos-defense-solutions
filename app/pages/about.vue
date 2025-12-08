<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import KryosBld from "~/assets/img/kryos-building.jpg";
import Divider from "~/components/Divider.vue";
import LeadershipPanel from "~/components/About/LeadershipPanel.vue";

useHead({
  title: "KRYOS | ABOUT",
  meta: [
    {
      name: "description",
      content:
        "Kryos Defense Solutions is an engineering-driven organization specializing in autonomous robotics, advanced mobility systems, and mission-critical defense technologies. Learn about our vision, leadership, and commitment to next-generation innovation.",
    },
    {
      name: "keywords",
      content:
        "Kryos Defense Solutions, about Kryos, defense technology company, autonomous robotics, tactical systems, leadership, advanced systems division",
    },
    {
      property: "og:title",
      content: "KRYOS | ABOUT",
    },
    {
      property: "og:description",
      content:
        "Discover the mission, vision, and leadership behind Kryos Defense Solutions — a developer of advanced autonomous platforms and next-generation defense technologies.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
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
        <KryosPanel />
      </Absolute>

      <Absolute extra-class="top-250 -left-10 w-100 -z-1 opacity-50 ">
        <KryosPanel />
      </Absolute>

      <Absolute extra-class="top-350 -right-10 w-50 -z-1 opacity-50 ">
        <KryosPanel />
      </Absolute>

      <Divider rightText="// LEADERSHIP" />

      <h2 class="text-6xl font-bold text-center">Executive Leadership</h2>

      <!-- CEO -->
      <LeadershipPanel job-title="ceo" />

      <div class="h-5 w-full border-b-8 border-(--kryos-bg-alt)"></div>

      <!-- CTO -->
      <LeadershipPanel job-title="cto" />
      <div class="h-5 w-full border-b-8 border-(--kryos-bg-alt)"></div>

      <!-- CSOO -->
      <LeadershipPanel job-title="csoo" />
      <div class="h-5 w-full border-b-8 border-(--kryos-bg-alt)"></div>

      <!-- Director of Infrastructure -->
      <LeadershipPanel job-title="director" />
    </section>

    <!-- End Leadership Team -->
  </div>
</template>
