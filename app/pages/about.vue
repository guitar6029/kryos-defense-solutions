<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import KryosSectionHeader from "~/components/KryosSectionHeader.vue";
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
  <div class="flex flex-col min-h-screen justify-center relative">
    <img
      src="~/assets/img/kryos_building.jpg"
      alt="Kryos Defense Solution Tall Building"
      class="md:absolute md:top-0 md:right-0 w-250 h-fit lg:h-auto z-0 md:-z-1 opacity-100 md:opacity-40"
    />

    <section class="flex flex-col gap-6 p-12 relative pl-24">
      <Absolute
        extra-class="top-0 left-0 w-full h-300 bg-(--kryos-bg-alt) -z-2 p-4"
      >
        <KryosPanel :option="6" extra-class="opacity-50 w-auto h-full" />
      </Absolute>

      <!-- <h1 class="section-title">Kryos Defense Solutions</h1> -->
      <p class="max-w-4xl text-2xl">
        <span class="font-bold text-2xl text-(--kryos-warn)"
          >[Kryos Defense Solutions]</span
        >
        is a privately held defense technology contractor specializing in
        autonomous tactical robotics, sensor fusion systems, and secure
        infrastructure protection. We operate at the intersection of advanced
        research, industrial engineering, and field-proven deployment.
      </p>

      <p class="max-w-4xl text-2xl">
        To deliver autonomous systems that extend human reach into environments
        where presence is too costly, too complex, or too dangerous.
      </p>
      <p class="max-w-4xl text-2xl">
        Every platform we build is designed to reduce risk, increase stability,
        and maintain operational continuity under pressure.
      </p>
    </section>

    <!-- Leadership Team -->
    <KryosSectionHeader rightText="// LEADERSHIP" />
    <section
      class="flex flex-row flex-wrap items-center justify-center gap-12 text-4xl bg-(--kryos-bg) relative z-10 p-4"
    >
      <h2 class="text-4xl w-full font-bold xl:text-center">
        Executive Leadership
      </h2>

      <LeadershipPanel job-title="ceo" />
      <LeadershipPanel job-title="cto" />
      <LeadershipPanel job-title="csoo" />
      <LeadershipPanel job-title="director" />
    </section>

    <!-- End Leadership Team -->
  </div>
</template>
