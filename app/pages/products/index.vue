<script setup lang="ts">
import multirotorHero from "~/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png";

useHead({
  title: "Products | Kryos Platform and Concepts",
  meta: [
    {
      name: "description",
      content:
        "Explore the Kryos Platform software prototype and the conceptual Kryos Multirotor aircraft.",
    },
    { property: "og:title", content: "Kryos Products" },
    {
      property: "og:description",
      content:
        "The Kryos Platform is the primary product. Kryos Multirotor is its flagship hardware concept.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-16 md:px-10 md:py-24">
    <header class="flex max-w-4xl flex-col items-start gap-5">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">
        Defense-first engineering concept
      </p>
      <h1 class="text-4xl font-semibold text-(--kryos-text-high) md:text-6xl">
        Kryos Platform and product concepts
      </h1>
      <p class="text-xl leading-relaxed">
        The Kryos Platform is the primary software product. Kryos Multirotor is
        the flagship hardware concept intended to complement it.
      </p>
      <p class="text-sm text-(--kryos-text-mid)">
        Fictional portfolio project · software uses sample data · hardware is conceptual
      </p>
    </header>

    <section aria-labelledby="platform-card-title" class="grid gap-8 rounded-xl border border-(--kryos-accent-dark-3) bg-(--kryos-bg-alt) p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-(--kryos-warn)">
          Primary product · software prototype · sample data
        </p>
        <h2 id="platform-card-title" class="mt-3 text-3xl font-semibold text-(--kryos-text-high)">
          Kryos Platform
        </h2>
        <p class="mt-4 max-w-3xl leading-relaxed">
          Browse sample fleet and device records, search and filter results,
          move through paginated data, and review prototype status and power
          summaries. This is not a live operational service.
        </p>
      </div>
      <NuxtLink
        to="/platform"
        class="inline-flex min-h-12 items-center justify-center rounded-md bg-(--kryos-warn) px-6 py-3 font-semibold text-(--kryos-bg) hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
      >
        Explore the Platform
      </NuxtLink>
    </section>

    <section aria-labelledby="multirotor-card-title" class="overflow-hidden rounded-xl border border-(--kryos-accent-dark-3) bg-(--kryos-bg-alt)">
      <div class="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div class="aspect-video w-full self-start overflow-hidden bg-(--kryos-bg)">
          <img
            :src="multirotorHero"
            alt="Illustrative concept rendering of the Kryos Multirotor compact aircraft."
            class="block h-full w-full object-contain"
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="flex flex-col items-start justify-center gap-5 p-7 md:p-10">
          <p class="text-sm font-semibold uppercase tracking-wider text-(--kryos-warn)">
            Flagship hardware concept · not fielded
          </p>
          <h2 id="multirotor-card-title" class="text-3xl font-semibold text-(--kryos-text-high)">
            Kryos Multirotor
          </h2>
          <p class="leading-relaxed">
            A conceptual compact multirotor design for remote observation and
            situational context in defense planning. Its design remains
            conceptual; Kryos Multirotor is the approved working label.
          </p>
          <p class="text-sm text-(--kryos-text-high)">
            Intended to complement the Platform · integration planned, not implemented
          </p>
          <NuxtLink
            to="/products/kryos-multirotor"
            class="inline-flex min-h-12 items-center rounded-md border border-(--kryos-warn) px-6 py-3 font-semibold text-(--kryos-text-high) hover:bg-(--kryos-accent-dark-3) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
          >
            Explore Kryos Multirotor
          </NuxtLink>
        </div>
      </div>
    </section>

    <section aria-labelledby="future-title" class="border-t border-(--kryos-accent-dark-3) pt-8">
      <p class="text-sm uppercase tracking-wider text-(--kryos-text-low)">
        Future direction · under review
      </p>
      <h2 id="future-title" class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">
        MK-I ground-vehicle concept
      </h2>
      <p class="mt-3 max-w-3xl leading-relaxed">
        MK-I remains a possible future portfolio direction. Its role, design,
        and any technical claims require reassessment before promotion.
      </p>
      <p class="mt-5 text-sm text-(--kryos-text-mid)">
        EX-1 is deferred and is not presented as an active product.
      </p>
    </section>
  </div>
</template>
