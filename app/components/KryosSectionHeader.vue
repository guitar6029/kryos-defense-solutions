<script lang="ts" setup>
withDefaults(
  defineProps<{
    leftText?: string;
    rightText?: string;
    extraClass?: string;
  }>(),
  {
    leftText: "KRYOS DEFENSE SOLUTIONS",
    rightText: "//",
    extraClass: "bg-(--kryos-bg-alt)",
  }
);
</script>

<template>
  <div
    class="min-h-10 w-full flex items-center justify-between p-4 kryos-text"
    :class="[extraClass]"
  >
    <span class="font-orbitron uppercase">{{ leftText }}</span>
    <span class="font-orbitron uppercase">{{ rightText }}</span>
  </div>
</template>
