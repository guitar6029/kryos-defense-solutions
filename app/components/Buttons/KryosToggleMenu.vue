<script lang="ts" setup>
defineProps<{
  expanded: boolean;
  controls: string;
}>();

const emit = defineEmits<{
  (e: "toggle-menu", trigger: HTMLElement): void;
}>();

</script>

<template>
  <!-- header -->
  <div class="fixed top-5 right-5 z-110 min-[751px]:hidden">
    <button
      type="button"
      aria-label="Toggle navigation menu"
      :aria-expanded="expanded"
      :aria-controls="controls"
      @click="emit('toggle-menu', $event.currentTarget as HTMLElement)"
    >
      <Icon
        class="trns hover:text-(--kryos-text-high)"
        name="tdesign:menu-filled"
        size="20"
      />
    </button>
  </div>
</template>
