<!-- components/Text3D.vue -->
<script lang="ts" setup>
interface Props {
  /** Fallback text for simple one-line usage */
  text?: string;
  /** Class for the main (front) text */
  mainClass?: string;
  /** Class for the shadow layer */
  shadowClass?: string;
  /** Extra offset classes for the shadow (e.g. translate-x/y) */
  shadowOffsetClass?: string;
}

withDefaults(defineProps<Props>(), {
  mainClass: "font-orbitron font-bold text-4xl xl:text-8xl text-nowrap",
  shadowClass:
    "font-orbitron font-bold text-4xl xl:text-8xl text-nowrap text-black",
  shadowOffsetClass: "translate-x-[2px] translate-y-[2px]",
});
</script>

<template>
  <div class="relative inline-block">
    <!-- Shadow / back copy -->
    <div
      class="absolute inset-0"
      :class="[shadowClass, shadowOffsetClass]"
      aria-hidden="true"
    >
      <!-- If no slot is provided, fall back to `text` prop -->
      <slot>{{ text }}</slot>
    </div>

    <!-- Main / front copy -->
    <div :class="['relative', mainClass]">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>
