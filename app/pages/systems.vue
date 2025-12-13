<script lang="ts" setup>
import { onMounted } from "vue";
import { useSystemModalStore } from "#imports";
const systemModalStore = useSystemModalStore();
useHead({
  title: "KRYOS | SYSTEMS",
});

onMounted(() => {
  //when page loads and component mounts
  // open the modal
  systemModalStore.open();
});
</script>

<template>
  <div class="flex flex-col min-h-screen p-4">
    <h1 class="section-title w-fit">KRYOS // SYSTEMS</h1>
  </div>
</template>
