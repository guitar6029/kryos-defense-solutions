<script lang="ts" setup>
const baseClass =
  "cursor-default border border-(--kryos-accent) p-4 uppercase font-mono h-10 flex items-center justify-center min-w-50 trns hover:text-(--kryos-text-high) hover:bg-(--kryos-bg-alt)/50";

defineProps<{
  label: string;
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button @click="emits('click')" :class="baseClass">{{ label }}</button>
</template>
