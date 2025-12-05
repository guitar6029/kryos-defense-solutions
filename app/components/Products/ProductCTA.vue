<script setup lang="ts">
defineProps<{
  text: string;
  to: string;
  linkLabel: string;
}>();
</script>

<template>
  <div class="flex flex-col text-center gap-2">
    <p class="text-center text-4xl">{{ text }}</p>
    <NuxtLink :to="to" class="link">
      {{ linkLabel }}
    </NuxtLink>
  </div>
</template>
