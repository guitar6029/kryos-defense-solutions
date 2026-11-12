<script setup lang="ts">
useHead({
  title: "Kryos Defense Solutions | Corporate Overview",
  meta: [
    {
      name: "description",
      content:
        "Kryos Defense Solutions engineers autonomous systems, strategic intelligence, and defense technology.",
    },
    { property: "og:title", content: "Kryos Defense Solutions" },
    {
      property: "og:description",
      content:
        "Engineering the next generation of autonomous systems, strategic intelligence, and defense technology.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <section
    aria-labelledby="about-title"
    class="relative isolate flex min-h-[82svh] overflow-hidden bg-kryos-2077-page bg-[url('/assets/images/headquarters.png')] bg-[position:68%_center] bg-cover bg-no-repeat text-kryos-2077-text md:min-h-[88svh] md:bg-[position:72%_center]"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.88)_0%,rgba(5,7,9,0.72)_38%,rgba(5,7,9,0.32)_68%,rgba(5,7,9,0.12)_100%)]"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,9,0.06)_0%,rgba(5,7,9,0.42)_100%)]"
    />

    <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:py-24">
      <p class="mb-7 max-w-[22rem] font-kryos-2077-display text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.28em] text-kryos-2077-accent sm:max-w-none sm:text-xs">
        KRYOS DEFENSE SOLUTIONS / CORPORATE OVERVIEW
      </p>
      <div aria-hidden="true" class="hero-diagonal-stripes mb-5" />
      <h1
        id="about-title"
        class="hero-headline max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.06em] text-kryos-2077-text"
      >
        The Future Does Not Wait.
      </h1>
      <p class="mt-10 max-w-xl border-l border-kryos-2077-accent pl-5 text-base leading-relaxed text-kryos-2077-text sm:mt-12 sm:pl-6 md:text-lg">
        Engineering the next generation of autonomous systems, strategic intelligence, and defense technology.
      </p>
    </div>
  </section>
</template>
