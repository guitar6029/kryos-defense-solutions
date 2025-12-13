<script lang="ts" setup>
import type { Platform } from "~/types/Platform";
import MKIVideo from "~/assets/video/mki.mp4";
import EX1VideoB from "~/assets/video/ex-1-360-b.mp4";

withDefaults(
  defineProps<{
    model: Platform;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
  }>(),
  {
    model: "MK",
    autoPlay: true,
    loop: true,
    muted: true,
    className: "w-full",
  }
);

const selectedModel: Record<Platform, { videoSrc: string }> = {
  MK: {
    videoSrc: MKIVideo,
  },
  EX: {
    videoSrc: EX1VideoB,
  },
};
</script>

<template>
  <video :muted="muted" :autoplay="autoPlay" :loop="loop" :class="[className]">
    <source :src="selectedModel[model].videoSrc" type="video/mp4" />
  </video>
</template>
