<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import { onMounted, ref } from "vue";

const clipId = ref<string | null>(null);

onMounted(() => {
  clipId.value = crypto.randomUUID();
});

const props = withDefaults(
  defineProps<{
    absoluteExtraClass?: string;
    imgSrc?: string;
    svgPath: string;
    svgFillColor?:string;
    svgViewBox: string;
    svgStrokeColor?: string;
    svgStrokeWidth?: number;
  }>(),
  {
    absoluteExtraClass: "top-0 left-0",
    svgStrokeColor: "var(--kryos-circuit-path)",
    svgStrokeWidth: 2,
  }
);
</script>

<template>
  <Absolute :extra-class="absoluteExtraClass">
    <svg
      class="w-full h-auto"
      :viewBox="svgViewBox"
      :fill="imgSrc ? 'none' : svgFillColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs v-if="clipId">
        <clipPath :id="`kryos_${clipId}`">
          <path :d="svgPath" />
        </clipPath>
      </defs>

      <image
        v-if="imgSrc && clipId"
        :href="imgSrc"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        :clip-path="`url(#kryos_${clipId})`"
      />

      <path
        :d="svgPath"
        :stroke="svgStrokeColor"
        :stroke-width="svgStrokeWidth"
      />
    </svg>
  </Absolute>
</template>
