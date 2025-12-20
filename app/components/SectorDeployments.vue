<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import type { DeploymentType } from "./Deployment/DeploymentPanel.vue";
import KryosSectionHeader from "./KryosSectionHeader.vue";
import base_img from "~/assets/img/shapes/shape4.jpg";
let interval: ReturnType<typeof setInterval> | null = null;

const currentPanel = ref(0);

const selectedPanel: DeploymentType[] = ["air", "land", "sea", "digital"];

onMounted(() => {
  interval = setInterval(() => {
    currentPanel.value =
      currentPanel.value === selectedPanel.length - 1
        ? 0
        : currentPanel.value + 1;
  }, 5000);
});

onBeforeUnmount(() => {
  if (interval !== null) {
    clearInterval(interval);
  }
});

const selected = computed<DeploymentType>(() => {
  return selectedPanel[currentPanel.value] ?? "air";
});
</script>
<template>
  <KryosSectionHeader
    right-text="SECTOR // DEPLOYMENTS"
    extraClass="bg-(--kryos-bg)"
  />
  <div
    class="flex flex-col min-h-[50vh] justify-center relative bg-(--kryos-bg)"
  >
    <img
      :src="base_img"
      alt="KRYOS protects the entire world"
      class="absolute inset-0 w-full h-full object-cover opacity-50"
    />

    <DeploymentPanel :deployment="selected" />

    <div class="flex flex-row items-center justify-center gap-2">
      <div
        class="flex flex-row items-center justify-center"
        v-for="idx in selectedPanel.length"
        :key="idx"
      >
        <span
          class="w-2 h-2 border"
          :class="{ 'bg-(--kryos-accent)': idx - 1 === currentPanel }"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes kryosHover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

.hovering-anim {
  display: inline-block;
  animation: kryosHover 2.5s ease-in-out infinite;
}

.animate-brief {
  animation: briefIn 0.35s ease-out forwards;
}

@keyframes briefIn {
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
