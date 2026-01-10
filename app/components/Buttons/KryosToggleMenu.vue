<script lang="ts" setup>
const emit = defineEmits<{
  (e: "toggle-menu"): void;
}>();

defineProps<{
  isMobile: boolean;
}>();
</script>

<template>
  <!-- header -->
  <div v-if="isMobile" class="fixed top-5 right-5 z-110">
    <button @click="emit('toggle-menu')">
      <Icon
        class="trns hover:text-(--kryos-text-high)"
        name="tdesign:menu-filled"
        size="20"
      />
    </button>
  </div>
</template>
