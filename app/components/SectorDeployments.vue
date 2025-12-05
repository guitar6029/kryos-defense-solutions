<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen relative bg-(--kryos-bg-alt)">
    <Absolute extra-class="top-20 -right-20 w-200">
      <KryosPanel :option="8" />
    </Absolute>
    <Absolute extra-class="top-150 -left-20 w-200 -z-1">
      <KryosPanel :option="8" />
    </Absolute>
    <Absolute extra-class="top-150 -right-20 w-100 -z-0">
      <KryosPanel :option="10" />
    </Absolute>
    <Absolute extra-class="top-20 -left-20 w-50 -z-0 -rotate-180">
      <KryosPanel :option="10" />
    </Absolute>

    <Absolute extra-class="bottom-100 -left-20 w-50 -z-0 -rotate-180">
      <KryosPanel :option="10" />
    </Absolute>

    <Absolute extra-class="bottom-250 left-0 w-150 -z-0 -rotate-180">
      <KryosPanel :option="3" :stroke-width="2" />
    </Absolute>

    <Absolute extra-class="top-150 left-0 w-150 -z-0 -rotate-180">
      <KryosPanel :option="3" :stroke-width="4" />
    </Absolute>

    <Splitter right-text="SECTOR // DEPLOYMENTS" extraClass="bg-(--kryos-bg)" />
    <DeploymentPanel deployment="air" />
    <DeploymentPanel deployment="land" />
    <DeploymentPanel deployment="sea" />
    <DeploymentPanel deployment="digital" />
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
