<script setup lang="ts">
useHead({
  title: "Kryos Platform | Software Prototype",
  meta: [
    {
      name: "description",
      content:
        "Learn about the Kryos Platform fleet-operations software prototype and its sample-data record workflows.",
    },
    { property: "og:title", content: "Kryos Platform" },
    {
      property: "og:description",
      content:
        "A software prototype for browsing sample fleet records, applying filters, and reviewing status summaries.",
    },
    { property: "og:type", content: "website" },
  ],
});

const workflow = [
  {
    number: "01",
    title: "Sample records",
    text: "Browse paginated fleet and device records from the development data path.",
  },
  {
    number: "02",
    title: "Search and filters",
    text: "Narrow records using text search and available status, platform, zone, role, and link-state filters.",
  },
  {
    number: "03",
    title: "Status summaries",
    text: "Review sample status fields and derived summaries such as status counts and average power.",
  },
];
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-16 md:px-10 md:py-24">
    <header class="flex max-w-4xl flex-col items-start gap-6">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">
        Primary product · software prototype
      </p>
      <h1 class="text-4xl font-semibold leading-tight text-(--kryos-text-high) md:text-6xl">
        Kryos Platform
      </h1>
      <p class="text-2xl leading-relaxed text-(--kryos-text-high)">
        A fleet-operations software prototype for browsing sample device records,
        applying filters, and reviewing status summaries.
      </p>
      <p class="rounded-full border border-(--kryos-accent) px-4 py-2 text-sm text-(--kryos-text-high)">
        Prototype · sample data · not a live operational display
      </p>
    </header>

    <section aria-labelledby="workflow-title" class="flex flex-col gap-7">
      <div>
        <p class="text-sm uppercase tracking-wider text-(--kryos-text-low)">
          Verified prototype workflow
        </p>
        <h2 id="workflow-title" class="mt-2 text-3xl font-semibold text-(--kryos-text-high)">
          From sample records to a concise summary
        </h2>
      </div>
      <ol aria-label="Illustrative sample-data workflow" class="grid gap-4 md:grid-cols-3">
        <li
          v-for="(step, index) in workflow"
          :key="step.number"
          class="relative rounded-xl border border-white/10 bg-(--kryos-bg-alt) p-6"
        >
          <span class="text-sm font-semibold tracking-wider text-(--kryos-warn)">
            {{ step.number }} · {{ index === 0 ? "INPUT" : index === 1 ? "QUERY" : "SUMMARY" }}
          </span>
          <h3 class="mt-4 text-xl font-semibold text-(--kryos-text-high)">
            {{ step.title }}
          </h3>
          <p class="mt-3 leading-relaxed">{{ step.text }}</p>
          <span
            v-if="index < workflow.length - 1"
            aria-hidden="true"
            class="mt-5 hidden text-(--kryos-warn) md:block"
          >
            Continues to next step →
          </span>
        </li>
      </ol>
      <p class="text-sm text-(--kryos-text-mid)">
        Illustrative workflow · sample data · not a live operational display
      </p>
    </section>

    <section class="grid gap-8 border-y border-white/10 py-10 md:grid-cols-2">
      <div>
        <p class="text-sm uppercase tracking-wider text-(--kryos-warn)">
          Implemented prototype
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">
          Record workflows
        </h2>
        <p class="mt-3 leading-relaxed">
          The inspected prototype supports request/response record retrieval,
          search and filters, pagination, sample status fields, and derived
          status/power summaries. This does not establish a production service or
          live connection to equipment.
        </p>
      </div>
      <div>
        <p class="text-sm uppercase tracking-wider text-(--kryos-text-low)">
          Planned / unverified
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">
          Future directions
        </h2>
        <p class="mt-3 leading-relaxed">
          Live telemetry, geospatial views, real-time updates, and AI-assisted
          workflows are not presented as implemented capabilities.
        </p>
      </div>
    </section>

    <section class="rounded-xl border border-(--kryos-accent) bg-(--kryos-bg-alt) p-6 md:p-9">
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-(--kryos-warn)">
        Planned / conceptual relationship · not implemented
      </p>
      <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">
        Intended to complement the Platform
      </h2>
      <p class="mt-3 max-w-4xl leading-relaxed">
        The Kryos Multirotor is a conceptual hardware design intended to
        complement the Kryos Platform. No hardware connection, aircraft data,
        telemetry feed, or control path is implemented or represented here.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <NuxtLink
          to="/app"
          class="inline-flex min-h-12 items-center rounded-md border border-(--kryos-warn) px-5 py-3 font-semibold text-(--kryos-text-high) hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
        >
          Open sample/development workspace
        </NuxtLink>
        <NuxtLink
          to="/products/kryos-multirotor"
          class="inline-flex min-h-12 items-center rounded-md border border-(--kryos-accent) px-5 py-3 font-semibold text-(--kryos-text-high) hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
        >
          Explore Kryos Multirotor
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="inline-flex min-h-12 items-center px-5 py-3 font-semibold text-(--kryos-text-high) underline underline-offset-4 hover:text-(--kryos-warn) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
        >
          View products
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
