<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    headerTitle?: string;
    headerSubheader?: string;
  }>(),
  {
    headerTitle: "kryos",
    headerSubheader: "[status] enabled",
  }
);

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <aside
    class="absolute flex flex-col items-center justify-center top-0 right-0 w-75 h-screen bg-linear-90 bg-(--kryos-bg) z-100 border-l-2 border-l-(--kryos-accent)"
  >
    <div
      class="trns kryos-text hover:text-(--kryos-text-high) absolute top-5 left-5 flex flex-col gap-1 uppercase"
    >
      <span>{{ headerTitle }}</span>
      <span class="text-(--kryos-warn)">{{ headerSubheader }}</span>
    </div>
    <button @click="emit('click')">
      <Icon
        class="trns hover:text-(--kryos-text-high) absolute top-5 right-5"
        name="material-symbols:close"
      />
    </button>
    <div
      v-if="$slots.main"
      class="flex flex-col item-center gap-4 max-w-[200px]"
    >
      <slot name="main" />
    </div>
  </aside>
</template>
