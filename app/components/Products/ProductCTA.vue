<script setup lang="ts">
defineProps<{
  text: string;
  to: string;
  linkLabel: string;
}>();
</script>

<template>
  <div class="flex flex-col text-center gap-2 min-w-xl">
    <p class="text-center text-xl">{{ text }}</p>
    <NuxtLink :to="to" class="nav-link">
      <span class="kryos-bracket">{{ linkLabel }}</span>
    </NuxtLink>
  </div>
</template>
