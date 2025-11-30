<script lang="ts" setup>
withDefaults(
  defineProps<{
    extraClass?: string;
  }>(),
  {
    extraClass: "",
  }
);
</script>

<template>
  <div :class="['absolute', extraClass]">
    <slot></slot>
  </div>
</template>
