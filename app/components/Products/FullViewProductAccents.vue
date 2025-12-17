<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
defineProps<{
  text: string;
}>();
</script>

<template>
  <Absolute extra-class="absolute top-0 w-75  right-0 rotate-180">
    <KryosPanel stroke="var(--kryos-accent)" :option="6" />
  </Absolute>

  <Absolute extra-class="absolute top-0 w-50  left-0">
    <KryosPanel stroke="var(--kryos-accent)" :option="6" />
  </Absolute>

  <Absolute
    extra-class="absolute bottom-10 left-20  -rotate-90 origin-bottom-left"
  >
    <div class="p-2 border-b-6 border-b-(--kryos-warn)">
      <span class="font-orbitron font-extrabold text-xl text-nowrap">{{
        text
      }}</span>
    </div>
  </Absolute>
</template>
