<script setup lang="ts">
useHead({
  title: "KRYOS | HOME",
  meta: [
    {
      name: "description",
      content:
        "KRYOS Defense Solutions develops next-generation autonomous platforms, exoskeletal systems, and advanced tactical robotics engineered for precision operations across hostile and unpredictable environments.",
    },
    {
      name: "keywords",
      content:
        "Kryos Defense Solutions, tactical robotics, autonomous platforms, exoskeleton systems, MK-I, EX-1, advanced defense technology, autonomous ground units",
    },
    {
      property: "og:title",
      content: "KRYOS | HOME",
    },
    {
      property: "og:description",
      content:
        "Next-generation defense robotics and autonomous systems engineered with military-grade precision and adaptability.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Hero />
    <CoreCapabilities />
    <KryosHighlightMKI />
    <Highlights />
  </div>
</template>
