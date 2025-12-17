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
  <div class="w-full flex items-center justify-end p-4 z-100">
    <button v-if="isMobile" @click="emit('toggle-menu')">
      <Icon
        class="trns hover:text-(--kryos-text-high)"
        name="tdesign:menu-filled"
      />
    </button>
  </div>
</template>
