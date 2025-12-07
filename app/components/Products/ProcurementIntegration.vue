<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-10 min-h-screen realtive"
  >
    <Absolute extra-class="bottom-0 left-0 w-full -z-1 opacity-50">
      <KryosPanel :option="13" />
    </Absolute>

    <h2 class="section-title">Systems Integration</h2>
    <p class="text-4xl max-w-2xl text-center">
      Kryos platforms are available under controlled procurement channels for
      qualified defense, security, and critical infrastructure clients. Each
      deployment is preceded by a joint assessment phase to align platform
      capabilities with operational requirements and regulatory frameworks.
    </p>
    <p class="text-2xl max-w-2xl text-center">
      For procurement inquiries, integration planning, or technical briefings,
      contact the Kryos deployment team.
    </p>
    <NuxtLink to="#" class="link">Contact Kryos Deployment Team</NuxtLink>
  </section>
</template>
