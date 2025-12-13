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
          <div class="relative w-[260px] h-20 group">
            <svg
              class="absolute inset-0 w-full trns h-full group-hover:fill-(--kryos-warn) group-hover:opacity-90"
              viewBox="0 0 691 243"
              fill="var(--kryos-bg-alt)"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 54.5244L71.5 0.524414L173.5 15.0244H347L381 0.524414H690.5V191.024L599.5 242.024H191L154 219.024H0.5V54.5244Z"
                stroke="var(--kryos-accent)"
                stroke-width="2"
              />
            </svg>

            <button
              class="relative z-10 w-full h-full flex items-center justify-center uppercase text-2xl trns group-hover:text-black"
              @click="$emit('cancel')"
            >
              Cancel
            </button>
          </div>

          <div class="group relative w-[260px] h-20 trns">
            <svg
              class="absolute inset-0 w-full trns h-full group-hover:fill-(--kryos-bg) group-hover:opacity-90"
              viewBox="0 0 620 242"
              fill="var(--kryos-bg-alt)"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 188V26L83 0.5H619.5V165L528.5 241.5H51.5L0.5 188Z"
                stroke="var(--kryos-accent)"
                stroke-width="2"
              />
            </svg>

            <button
              class="relative z-10 w-full h-full flex items-center justify-center uppercase text-2xl"
              @click="$emit('continue')"
            >
              Continue
            </button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>
