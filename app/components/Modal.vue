<script lang="ts" setup>
defineEmits<{
  (e: "cancel"): void;
  (e: "continue"): void;
}>();

defineProps<{
  showBtns?: boolean;
}>();
</script>

<template>
  <div
    class="absolute w-full h-full bg-(--kryos-bg-alt) flex flex-col items-center justify-center"
  >
    <div
      class="w-full max-w-4xl border border-(--kryos-accent) p-4 flex flex-col gap-4 bg-(--kryos-bg)"
    >
      <div v-if="$slots.header">
        <slot name="header" />
      </div>

      <!-- modal body -->
      <slot />

      <footer
        v-if="$slots.actions || showBtns"
        class="flex flex-row justify-end gap-2 w-full"
      >
        <slot name="actions">
          <button
            class="uppercase text-2xl border p-2"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button
            class="uppercase text-2xl border p-2"
            @click="$emit('continue')"
          >
            Continue
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>
