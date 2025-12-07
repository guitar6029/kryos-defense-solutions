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
    class="min-h-10 w-full flex items-center justify-between p-4"
    :class="[extraClass]"
  >
    <span class="font-orbitron text-[1rem] uppercase">{{ leftText }}</span>
    <span class="font-orbitron text-[1rem] uppercase">{{ rightText }}</span>
  </div>
</template>
