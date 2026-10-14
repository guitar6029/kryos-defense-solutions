<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; description: string }>();
</script>
<template>
  <section class="mx-auto max-w-3xl rounded-xl border border-white/10 bg-(--kryos-bg-alt) p-6 md:p-8">
    <p class="text-xs font-semibold uppercase tracking-[0.16em] text-(--kryos-warn)">{{ eyebrow }}</p>
    <h1 class="mt-3 text-3xl font-semibold text-(--kryos-text-high) md:text-4xl">{{ title }}</h1>
    <p class="mt-4 leading-relaxed">{{ description }}</p>
    <p class="mt-6 border-t border-white/10 pt-4 text-sm text-(--kryos-text-low)">This area is planned for a future milestone. No production capability is represented here.</p>
  </section>
</template>
