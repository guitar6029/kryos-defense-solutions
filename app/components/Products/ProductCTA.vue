<script setup lang="ts">
defineProps<{
  text?: string;
  to: string;
  linkLabel: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 min-w-xl">
    <p class="text-xl" v-if="text">{{ text }}</p>
    <NuxtLink :to="to" class="nav-link">
      <span class="kryos-bracket">{{ linkLabel }}</span>
    </NuxtLink>
  </div>
</template>
