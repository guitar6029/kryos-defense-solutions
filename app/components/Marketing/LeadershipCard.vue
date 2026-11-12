<script setup lang="ts">
defineProps<{
  name: string;
  title: string;
  biography: string;
  portrait: string;
  portraitAlt: string;
}>();
</script>

<template>
  <article class="grid h-full grid-cols-[6rem_minmax(0,1fr)] items-start gap-5 border border-kryos-2077-border bg-kryos-2077-surface p-5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6 sm:p-6">
    <img
      :src="portrait"
      :alt="portraitAlt"
      width="512"
      height="512"
      loading="lazy"
      decoding="async"
      class="aspect-square w-full border border-kryos-2077-border object-cover"
    >
    <div class="min-w-0">
      <h3 class="font-kryos-2077-heading text-xl leading-tight text-kryos-2077-text sm:text-2xl">
        {{ name }}
      </h3>
      <p class="mt-2 font-kryos-2077-ui text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-kryos-2077-accent">
        {{ title }}
      </p>
      <p class="mt-4 text-sm leading-relaxed text-kryos-2077-muted sm:text-base">
        {{ biography }}
      </p>
    </div>
  </article>
</template>
