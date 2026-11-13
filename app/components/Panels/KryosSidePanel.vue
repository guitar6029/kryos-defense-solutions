<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id?: string;
    headerTitle?: string;
    headerSubheader?: string;
    marketingTelemetry?: boolean;
    showCloseButton?: boolean;
    showHeader?: boolean;
  }>(),
  {
    headerTitle: "kryos",
    headerSubheader: "[status] enabled",
    marketingTelemetry: false,
    showCloseButton: true,
    showHeader: true,
  }
);

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <aside :id="props.id" :class="{ 'marketing-mobile-panel': props.marketingTelemetry }"
    class="fixed flex flex-col items-center justify-center top-0 right-0 w-75 h-screen bg-linear-90 bg-(--kryos-bg) z-100 border-l-2 border-l-(--kryos-accent)">
    <div v-if="props.showHeader"
      class="trns kryos-text hover:text-(--kryos-text-high) absolute top-5 left-5 flex flex-col gap-1 uppercase">
      <span>{{ headerTitle }}</span>
      <span class="text-(--kryos-warn)">{{ headerSubheader }}</span>
    </div>
    <button v-if="props.showCloseButton" type="button" class="cursor-pointer" aria-label="Close navigation menu"
      @click="emit('close')">
      <Icon class="trns hover:text-(--kryos-text-high) absolute top-5 right-5" name="material-symbols:close" />
    </button>
    <div v-if="$slots.main" class="flex flex-col items-center gap-4 max-w-50">
      <slot name="main" />
    </div>
  </aside>
</template>

<style scoped>
/* Only the marketing drawer uses the quiet vertical telemetry signal. */
.marketing-mobile-panel {
  border-left-width: 1px;
  border-left-color: color-mix(in srgb, var(--kryos-2077-brand-accent) 28%, transparent);
}

.marketing-mobile-panel::after {
  position: absolute;
  top: 0;
  left: -1px;
  width: 2px;
  height: 12px;
  content: "";
  pointer-events: none;
  background: var(--kryos-2077-brand-accent);
  animation: marketing-mobile-signal 180s linear infinite;
}

@keyframes marketing-mobile-signal {
  0% {
    top: 0;
    opacity: 0;
  }

  0.5% {
    opacity: 0.8;
  }

  98.5% {
    opacity: 0.8;
  }

  99.5% {
    top: calc(100% - 12px);
    opacity: 0;
  }

  100% {
    top: 0;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marketing-mobile-panel::after {
    display: none;
  }
}
</style>
