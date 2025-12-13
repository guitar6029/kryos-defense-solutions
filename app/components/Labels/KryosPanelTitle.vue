<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1 class="uppercase text-(--kryos-warn)">[{{ title }}]</h1>
</template>
