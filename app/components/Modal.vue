<script lang="ts" setup>
const baseBtnClass =
  "relative z-10 w-full h-full flex items-center justify-center uppercase text-[1rem] trns group-hover:text-(--kryos-text-high)";
const basePath = "M0.5 188V26L83 0.5H619.5V165L528.5 241.5H51.5L0.5 188Z";
const baseDivBtnContainer = "relative w-[150px] h-12 group cursor-default";
const baseSVGClass =
  "absolute inset-0 w-full trns h-full group-hover:fill-(--kryos-bg)";

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
    class="fixed inset-0 z-999 w-full h-full bg-(--kryos-bg-alt) flex flex-col items-center justify-center"
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
          <div :class="baseDivBtnContainer">
            <svg
              :class="baseSVGClass"
              viewBox="0 0 620 242"
              fill="var(--kryos-bg-alt)"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                :d="basePath"
                stroke="var(--kryos-accent)"
                stroke-width="2"
              />
            </svg>

            <button :class="baseBtnClass" @click="$emit('cancel')">
              Cancel
            </button>
          </div>

          <div :class="baseDivBtnContainer">
            <svg
              :class="baseSVGClass"
              viewBox="0 0 620 242"
              fill="var(--kryos-bg-alt)"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                :d="basePath"
                stroke="var(--kryos-accent)"
                stroke-width="2"
              />
            </svg>

            <button :class="baseBtnClass" @click="$emit('continue')">
              Continue
            </button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>
