<script setup lang="ts">
import multirotorHero from "~/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png";

useHead({
  title: "Kryos Platform | Defense Robotics Software Concept",
  meta: [
    {
      name: "description",
      content:
        "Explore the Kryos Platform software prototype and its sample-data fleet workflows, alongside the conceptual Kryos Multirotor.",
    },
    { property: "og:title", content: "Kryos Platform" },
    {
      property: "og:description",
      content:
        "A fleet-operations software prototype and a conceptual multirotor design for defense robotics.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <div class="flex flex-col">
    <section
      aria-labelledby="home-platform-title"
      class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 md:px-10 md:py-28"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">
        Defense technology concept · software prototype
      </p>
      <div class="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div class="flex flex-col items-start gap-6">
          <h1
            id="home-platform-title"
            class="max-w-4xl text-4xl font-semibold leading-tight text-(--kryos-text-high) md:text-6xl"
          >
            The Kryos Platform
          </h1>
          <p class="max-w-3xl text-xl leading-relaxed text-(--kryos-text-mid) md:text-2xl">
            A fleet-operations software prototype for browsing sample device
            records, applying filters, and reviewing status summaries.
          </p>
          <p class="rounded-full border border-(--kryos-accent) px-4 py-2 text-sm text-(--kryos-text-high)">
            Software prototype · sample data
          </p>
          <NuxtLink
            to="/platform"
            class="inline-flex min-h-12 items-center rounded-md bg-(--kryos-warn) px-6 py-3 font-semibold text-(--kryos-bg) hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
          >
            Explore the Platform
          </NuxtLink>
        </div>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div class="rounded-lg border border-white/10 bg-(--kryos-bg-alt) p-5">
            <p class="text-sm uppercase tracking-wider text-(--kryos-text-low)">
              Implemented prototype workflows
            </p>
            <p class="mt-2 text-lg text-(--kryos-text-high)">
              Record search, filters, pagination, and status summaries
            </p>
          </div>
          <div class="rounded-lg border border-white/10 bg-(--kryos-bg-alt) p-5">
            <p class="text-sm uppercase tracking-wider text-(--kryos-text-low)">
              Project status
            </p>
            <p class="mt-2 text-lg text-(--kryos-text-high)">
              Fictional engineering portfolio · not a production system
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      aria-labelledby="home-multirotor-title"
      class="border-y border-white/10 bg-(--kryos-bg-alt)"
    >
      <div
        class="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center"
      >
        <figure class="overflow-hidden rounded-xl border border-white/10 bg-black">
          <img
            :src="multirotorHero"
            alt="Illustrative concept rendering of the Kryos Multirotor, a compact aircraft shown from the front three-quarter view."
            class="block h-auto w-full object-contain"
            width="1672"
            height="941"
            fetchpriority="high"
            decoding="async"
          />
          <figcaption class="px-4 py-3 text-sm text-(--kryos-text-mid)">
            Illustrative concept rendering · not a fielded or available aircraft
          </figcaption>
        </figure>
        <div class="flex flex-col items-start gap-5">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">
            Flagship hardware concept
          </p>
          <h2
            id="home-multirotor-title"
            class="text-3xl font-semibold leading-tight text-(--kryos-text-high) md:text-4xl"
          >
            A multirotor concept intended to complement the Platform
          </h2>
          <p class="text-lg leading-relaxed">
            Kryos is exploring a compact aircraft concept for remote observation
            and situational context in defense planning. Its design remains
            conceptual. Any Platform integration is planned and not implemented.
          </p>
          <p class="text-sm font-medium text-(--kryos-text-high)">
            Approved concept render · working product label
          </p>
          <NuxtLink
            to="/products/kryos-multirotor"
            class="inline-flex min-h-12 items-center rounded-md border border-(--kryos-warn) px-6 py-3 font-semibold text-(--kryos-text-high) hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
          >
            Explore Kryos Multirotor
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mx-auto grid w-full max-w-7xl gap-6 px-6 py-16 md:px-10 md:py-20 md:grid-cols-2">
      <NuxtLink
        to="/platform"
        class="rounded-xl border border-white/10 bg-(--kryos-bg-alt) p-7 hover:border-(--kryos-accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
      >
        <p class="text-sm uppercase tracking-wider text-(--kryos-warn)">Primary product</p>
        <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">Kryos Platform</h2>
        <p class="mt-3 leading-relaxed">Software prototype · sample data</p>
      </NuxtLink>
      <NuxtLink
        to="/products/kryos-multirotor"
        class="rounded-xl border border-white/10 bg-(--kryos-bg-alt) p-7 hover:border-(--kryos-accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
      >
        <p class="text-sm uppercase tracking-wider text-(--kryos-warn)">Flagship hardware concept</p>
        <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">Kryos Multirotor</h2>
        <p class="mt-3 leading-relaxed">Conceptual design · integration not implemented</p>
      </NuxtLink>
    </section>

    <section class="border-t border-white/10 px-6 py-10 text-center md:px-10">
      <p class="mx-auto max-w-3xl leading-relaxed">
        MK-I remains a future ground-vehicle concept under review. EX-1 is deferred.
        Kryos is a fictional portfolio project; the software uses sample data and
        the hardware shown is conceptual.
      </p>
      <NuxtLink to="/about" class="mt-4 inline-block text-(--kryos-text-high) underline underline-offset-4 hover:text-(--kryos-warn)">
        About the Kryos concept
      </NuxtLink>
    </section>
  </div>
</template>
