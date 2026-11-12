<script setup lang="ts">
import type { FleetViewMode } from "~/composables/useFleetViewMode";

const props = defineProps<{
  modelValue: FleetViewMode;
  snapshotDisabled?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: FleetViewMode): void;
}>();
</script>

<template>
  <div class="inline-flex rounded border border-(--kryos-text-low)/50 p-1" role="group" aria-label="Fleet viewing mode">
    <button type="button" class="rounded px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kryos-warn)" :class="props.modelValue === 'live' ? 'bg-(--kryos-accent-dark-3) text-(--kryos-text-high)' : ''" :aria-pressed="props.modelValue === 'live'" @click="emit('update:modelValue', 'live')">Live</button>
    <button type="button" class="rounded px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kryos-warn) disabled:cursor-not-allowed disabled:opacity-40" :class="props.modelValue === 'snapshot' ? 'bg-(--kryos-accent-dark-3) text-(--kryos-text-high)' : ''" :aria-pressed="props.modelValue === 'snapshot'" :disabled="props.snapshotDisabled" @click="emit('update:modelValue', 'snapshot')">Snapshot</button>
  </div>
</template>
