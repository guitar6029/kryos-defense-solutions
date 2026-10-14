<script lang="ts" setup>
const emit = defineEmits<{
  (e: "toggle-menu"): void;
}>();

</script>

<template>
  <!-- header -->
  <div class="fixed top-5 right-5 z-110 min-[751px]:hidden">
    <button
      type="button"
      aria-label="Toggle navigation menu"
      @click="emit('toggle-menu')"
    >
      <Icon
        class="trns hover:text-(--kryos-text-high)"
        name="tdesign:menu-filled"
        size="20"
      />
    </button>
  </div>
</template>
