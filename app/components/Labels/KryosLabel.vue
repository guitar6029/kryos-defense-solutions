<script lang="ts" setup>
defineProps<{
  labelText: string;
}>();
</script>

<template>
  <label :for="labelText" class="text-(--kryos-text-low) kryos-text"
    >[{{ labelText }}]</label
  >
</template>
