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
    class="w-[250px] h-20 relative flex items-center justify-center group"
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
        viewBox="0 0 612 323"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0.5 302V60L33.25 30.25L66 0.5H146H579.5L611 73.5V259.5L524.5 322H487H91.5L0.5 302Z"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
    <span class="uppercase font-bold z-10 relative cursor-pointer">{{
      title
    }}</span>
  </div>
</template>
