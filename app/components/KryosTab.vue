<script lang="ts" setup>
defineProps<{
  title: string;
  active?: boolean;
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <div
    @click="emits('click')"
    class="min-w-[200px] h-15 relative flex items-center justify-center group"
  >
    <div
      class="absolute inset-0 z-1 cursor-pointer trns group-hover:fill-(--kryos-metal-light)/50"
      :class="[
        active
          ? 'fill-(--kryos-bg-alt) stroke-(--kryos-warn)'
          : 'fill-(--kryos-bg) stroke-(--kryos-accent-dark-1)',
      ]"
    >
      <svg
        class="w-full h-full"
        viewBox="0 0 552 374"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0.5 102.5L71.5 41.5H253L274.5 21L296 0.5H551.5V23.5V296.5L500.5 357.5H100L71.5 373H15.5H0.5V182V102.5Z"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
    <span class="uppercase font-bold z-10 relative cursor-pointer">{{
      title
    }}</span>
  </div>
</template>
