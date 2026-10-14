<script setup lang="ts">
useHead({
  title: "About the Kryos Concept",
  meta: [
    {
      name: "description",
      content:
        "Kryos Defense Solutions is a fictional engineering portfolio exploring a fleet-operations software prototype and future robotics concepts.",
    },
    { property: "og:title", content: "About the Kryos Concept" },
    {
      property: "og:description",
      content:
        "A fictional engineering portfolio with a sample-data software prototype and conceptual hardware.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <article class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-10 md:py-24">
    <header class="flex max-w-4xl flex-col items-start gap-6">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">
        About the concept
      </p>
      <h1 class="text-4xl font-semibold leading-tight text-(--kryos-text-high) md:text-6xl">
        A defense robotics engineering portfolio
      </h1>
      <p class="text-xl leading-relaxed text-(--kryos-text-high)">
        Kryos Defense Solutions is a fictional portfolio project exploring a
        fleet-operations software prototype and future uncrewed systems.
      </p>
    </header>

    <section class="grid gap-6 md:grid-cols-2">
      <div class="rounded-xl border border-white/10 bg-(--kryos-bg-alt) p-7">
        <p class="text-sm font-semibold uppercase tracking-wider text-(--kryos-warn)">
          Implemented prototype
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">
          Kryos Platform
        </h2>
        <p class="mt-3 leading-relaxed">
          The software prototype supports sample fleet/device record retrieval,
          search and filters, pagination, and derived status summaries. It is
          not a production service or live operational system.
        </p>
        <NuxtLink to="/platform" class="mt-5 inline-block text-(--kryos-text-high) underline underline-offset-4 hover:text-(--kryos-warn)">
          Explore the Platform
        </NuxtLink>
      </div>
      <div class="rounded-xl border border-white/10 bg-(--kryos-bg-alt) p-7">
        <p class="text-sm font-semibold uppercase tracking-wider text-(--kryos-warn)">
          Conceptual hardware
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-(--kryos-text-high)">
          Kryos Multirotor
        </h2>
        <p class="mt-3 leading-relaxed">
          The compact multirotor is a conceptual design intended to complement
          the Platform. Integration is planned and not implemented. MK-I is a
          future concept under review; EX-1 is deferred.
        </p>
        <NuxtLink to="/products" class="mt-5 inline-block text-(--kryos-text-high) underline underline-offset-4 hover:text-(--kryos-warn)">
          View product concepts
        </NuxtLink>
      </div>
    </section>
  </article>
</template>
