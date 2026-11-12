<script setup lang="ts">
useHead({
  title: "Kryos Multirotor | Flagship Hardware Concept",
  meta: [
    {
      name: "description",
      content:
        "Kryos Multirotor is a conceptual compact multirotor design intended to complement the Kryos Platform.",
    },
    { property: "og:title", content: "Kryos Multirotor" },
    {
      property: "og:description",
      content:
        "A conceptual aircraft design. Platform integration is planned and not implemented.",
    },
    { property: "og:type", content: "product" },
  ],
});
</script>

<template>
  <article class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-14 md:px-10 md:py-20">
    <header class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="flex flex-col items-start gap-5">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">
          Flagship hardware concept · not fielded or available
        </p>
        <h1 class="font-kryos-2077-heading text-4xl leading-tight text-(--kryos-text-high) md:text-6xl">
          Kryos Multirotor
        </h1>
        <p class="text-xl leading-relaxed text-(--kryos-text-high)">
          A proposed compact multirotor concept for remote observation and
          situational context in defense planning.
        </p>
        <p class="text-sm text-(--kryos-text-mid)">
          Concept visualization in development · working product label
        </p>
      </div>
      <div class="flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-(--kryos-accent-dark-3) bg-(--kryos-bg) p-8 text-center" aria-label="Kryos Multirotor concept visualization placeholder">
        <span aria-hidden="true" class="font-kryos-2077-heading text-6xl tracking-[0.12em] text-(--kryos-warn)">K//M</span>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-(--kryos-text-high)">Multirotor concept</p>
        <p class="text-sm text-(--kryos-text-mid)">3D visualization in development · no operational aircraft is represented</p>
      </div>
    </header>

    <section class="grid gap-8 border-y border-(--kryos-accent-dark-3) py-10 md:grid-cols-2">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-(--kryos-warn)">
          Proposed design intent
        </p>
        <h2 class="font-kryos-2077-heading mt-3 text-2xl text-(--kryos-text-high)">
          A concept alongside the Platform
        </h2>
        <p class="mt-3 leading-relaxed">
          This compact multirotor is a conceptual hardware design intended to
          complement the Kryos Platform. Its role and appearance are proposed
          design direction, not verified aircraft capabilities.
        </p>
      </div>
      <div class="rounded-lg border border-(--kryos-accent) bg-(--kryos-bg-alt) p-6">
        <p class="text-sm font-semibold uppercase tracking-wider text-(--kryos-warn)">
          Planned / conceptual integration · not implemented
        </p>
        <p class="mt-3 leading-relaxed">
          No aircraft connection, telemetry feed, or control path is implemented
          or represented. The Platform prototype uses sample data.
        </p>
      </div>
    </section>

    <section aria-labelledby="unknowns-title" class="max-w-4xl">
      <p class="text-sm uppercase tracking-wider text-(--kryos-text-low)">
        Concept status
      </p>
      <h2 id="unknowns-title" class="font-kryos-2077-heading mt-3 text-2xl text-(--kryos-text-high)">
        Technical details have not been established
      </h2>
      <p class="mt-3 leading-relaxed">
        No approved specifications, testing, availability, deployment, range,
        endurance, payload, sensors, communications, autonomy, or performance
        information is available for this concept.
      </p>
    </section>

    <nav aria-label="Product navigation" class="flex flex-wrap gap-5 border-t border-(--kryos-accent-dark-3) pt-7">
      <NuxtLink to="/platform" class="font-kryos-2077-ui text-(--kryos-text-high) underline underline-offset-4 hover:text-(--kryos-warn) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
        Explore the Kryos Platform
      </NuxtLink>
      <NuxtLink to="/products" class="font-kryos-2077-ui text-(--kryos-text-high) underline underline-offset-4 hover:text-(--kryos-warn) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
        All products
      </NuxtLink>
    </nav>
  </article>
</template>
