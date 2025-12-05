<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
import SwarmDrones from "~/assets/img/swarm_drones.jpg";
</script>
<template>
  <div class="flex flex-col min-h-screen relative bg-(--kryos-bg-alt) z-1">
    <Absolute
      extra-class="bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 sm:w-100 lg:w-400 -z-1 opacity-20"
    >
      <KryosPanel :option="14" :stroke-width="1" stroke="gray" />
    </Absolute>

    <Splitter right-text="SECTOR // DEPLOYMENTS" />

    <div class="flex flex-col items-center text-[4rem] mt-20">
      <DeploymentPanel deployment="air" />
      <DeploymentPanel deployment="land" />
      <DeploymentPanel deployment="sea" />
      <DeploymentPanel deployment="digital" />
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
