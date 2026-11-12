<script setup lang="ts">
type FramePosition = "left" | "center" | "right";

interface FrameVariant {
  top?: FramePosition;
  bottom?: FramePosition;
  side?: "left" | "right";
}

defineProps<{
  name: string;
  title: string;
  biography: string;
  portrait: string;
  portraitAlt: string;
  frame: FrameVariant;
}>();
</script>

<template>
  <article class="relative isolate grid h-full grid-cols-[minmax(6.75rem,30%)_minmax(0,1fr)] border border-kryos-2077-border bg-kryos-2077-surface sm:grid-cols-[minmax(8rem,30%)_minmax(0,1fr)]">
    <svg
      v-if="frame.top"
      aria-hidden="true"
      viewBox="0 -16 128 16"
      class="pointer-events-none absolute top-0 z-10 h-3 w-20 -translate-y-full overflow-visible"
      :class="{
        'left-[12%]': frame.top === 'left',
        'left-1/2 -translate-x-1/2': frame.top === 'center',
        'right-[12%]': frame.top === 'right',
      }"
    >
      <path d="M0 0H48L64 -16H102L118 0H128" fill="none" stroke="var(--kryos-2077-border)" stroke-width="2" vector-effect="non-scaling-stroke" />
      <path d="M76 -16H96" fill="none" stroke="var(--kryos-2077-brand-accent)" stroke-width="3" vector-effect="non-scaling-stroke" />
    </svg>
    <svg
      v-if="frame.bottom"
      aria-hidden="true"
      viewBox="0 0 128 16"
      class="pointer-events-none absolute top-full z-10 h-3 w-20 overflow-visible"
      :class="{
        'left-[12%]': frame.bottom === 'left',
        'left-1/2 -translate-x-1/2': frame.bottom === 'center',
        'right-[12%]': frame.bottom === 'right',
      }"
    >
      <path d="M0 0H48L64 16H102L118 0H128" fill="none" stroke="var(--kryos-2077-border)" stroke-width="2" vector-effect="non-scaling-stroke" />
      <path d="M76 16H96" fill="none" stroke="var(--kryos-2077-brand-accent)" stroke-width="3" vector-effect="non-scaling-stroke" />
    </svg>
    <svg
      v-if="frame.side === 'left'"
      aria-hidden="true"
      viewBox="-16 0 16 48"
      class="pointer-events-none absolute left-0 top-1/2 z-10 h-9 w-3 -translate-x-full -translate-y-1/2 overflow-visible"
    >
      <path d="M0 0H-16V48H0" fill="none" stroke="var(--kryos-2077-border)" stroke-width="2" vector-effect="non-scaling-stroke" />
      <path d="M-16 20V36" fill="none" stroke="var(--kryos-2077-brand-accent)" stroke-width="3" vector-effect="non-scaling-stroke" />
    </svg>
    <svg
      v-if="frame.side === 'right'"
      aria-hidden="true"
      viewBox="0 0 16 48"
      class="pointer-events-none absolute left-full top-1/2 z-10 h-9 w-3 -translate-y-1/2 overflow-visible"
    >
      <path d="M0 0H16V48H0" fill="none" stroke="var(--kryos-2077-border)" stroke-width="2" vector-effect="non-scaling-stroke" />
      <path d="M16 20V36" fill="none" stroke="var(--kryos-2077-brand-accent)" stroke-width="3" vector-effect="non-scaling-stroke" />
    </svg>
    <div class="relative min-h-full self-stretch overflow-hidden border-r border-kryos-2077-border">
      <img
        :src="portrait"
        :alt="portraitAlt"
        width="512"
        height="512"
        loading="lazy"
        decoding="async"
        class="block h-full w-full object-cover object-top"
      >
    </div>
    <div class="min-w-0 p-5 sm:p-6">
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
