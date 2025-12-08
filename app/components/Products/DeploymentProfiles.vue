<script lang="ts" setup>
import DeploymentProductPanel from "./DeploymentProductPanel.vue";
</script>

<template>
  <section class="flex flex-col items-center justify-center gap-2 min-h-screen">
    <Divider right-text="DEPLOYMENT" />
    <h2 class="section-title">Deployment Profiles</h2>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <DeploymentProductPanel :product-panel="1" />
      <DeploymentProductPanel :product-panel="2" />
      <DeploymentProductPanel :product-panel="3" />
      <DeploymentProductPanel :product-panel="4" />
    </div>
  </section>
</template>
