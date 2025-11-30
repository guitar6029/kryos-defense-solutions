<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string;
    text?: string;
  }>(),
  {
    title: "",
    text: "",
  }
);
</script>

<template>
  <div
    class="flex flex-col trns hover:bg-(--kryos-bg) items-center justify-between gap-2 border-2 rounded-xl max-w-xl h-150 p-4 bg-(--kryos-bg-alt)"
  >
    <h4 class="card-title min-h-100">{{ title }}</h4>
    <p class="card-text w-full">
      {{ text }}
    </p>
  </div>
</template>
