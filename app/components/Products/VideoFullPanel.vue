<script lang="ts" setup>
import type { KryosModel } from "~/types/KryosModel";
import MKIVideo from "~/assets/video/mki.mp4";
import EX1VideoB from "~/assets/video/ex-1-360-b.mp4";

withDefaults(
  defineProps<{
    model: KryosModel;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
  }>(),
  {
    model: "mk1",
    autoPlay: true,
    loop: true,
    muted: true,
    className: "w-full",
  }
);

const selectedModel: Record<KryosModel, { videoSrc: string }> = {
  mk1: {
    videoSrc: MKIVideo,
  },
  ex1: {
    videoSrc: EX1VideoB,
  },
};
</script>

<template>
  <video :muted="muted" :autoplay="autoPlay" :loop="loop" :class="[className]">
    <source :src="selectedModel[model].videoSrc" type="video/mp4" />
  </video>
</template>
