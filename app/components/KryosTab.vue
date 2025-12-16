<script lang="ts" setup>
defineProps<{
  title: string;
  active?: boolean;
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();

const baseClassContainer =
  "min-w-[200px] h-10 cursor-default flex items-center justify-center group border trns bg-(--kryos-bg)/70 hover:bg-(--kryos-bg) hover:border-(--kryos-text-high)";

const baseClassContext =
  "uppercase font-bold p-4 trns group-hover:text-(--kryos-text-high)";
</script>

<template>
  <div
    @click="emits('click')"
    :class="baseClassContainer"
    :style="{
      borderColor: `${
        active ? 'var(--kryos-text-high)' : 'var(--kryos-text-low)'
      }`,
    }"
  >
    <span :class="baseClassContext">{{ title }}</span>
  </div>
</template>
