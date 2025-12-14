<script lang="ts" setup>
import { storeToRefs } from "#imports";
import { onMounted, ref, onBeforeUnmount, watch, nextTick } from "vue";
import { useSystemModalStore, type SystemMode } from "#imports";
import { useSystemStateStore } from "#imports";
import KryosSystemTerminal from "~/components/Systems/KryosSystemTerminal.vue";
import { BOOT_SEQUENCE_STEPS } from "~/assets/static_data/BootSequenceSteps";
import KryosLoader from "~/components/Systems/KryosLoader.vue";

definePageMeta({ layout: "systems" });

const bootSteps = BOOT_SEQUENCE_STEPS;
// boot sequence steps
const bootSequence = ref<string[]>([]);

const sequenceIntervalId = ref<ReturnType<typeof setInterval> | null>(null);
const bootScrollElement = ref<HTMLElement | null>(null);

const systemModalStore = useSystemModalStore();

const systemStateStore = useSystemStateStore();
const { currentSystemMode } = storeToRefs(systemStateStore);

useHead({
  title: "KRYOS | SYSTEMS",
});

function bootSequenceStart() {
  let i = 0;
  sequenceIntervalId.value = setInterval(() => {
    if (i >= bootSteps.length) {
      if (sequenceIntervalId.value) {
        clearInterval(sequenceIntervalId.value);
        sequenceIntervalId.value = null;
        //set the mode to operational
        systemStateStore.setToOperationalMode();
      }
      return;
    }

    const step = bootSteps[i];
    if (step === undefined) return;
    bootSequence.value.push(step);
    i++;
  }, 150);
}

onMounted(() => {
  //when page loads and component mounts
  // open the modal
  systemModalStore.open();
});

onBeforeUnmount(() => {
  //before leaving, reseet the mode to 'locked'
  systemStateStore.resetMode();
});

// WATCHERS
watch(currentSystemMode, (mode: SystemMode) => {
  if (mode !== "loading") return;
  //reset sequence array
  bootSequence.value = [];
  bootSequenceStart();
});

watch(
  () => bootSequence.value.length,
  async () => {
    await nextTick();
    const divElement = bootScrollElement.value;
    if (!divElement) {
      return;
    }
    divElement.scrollTop = divElement.scrollHeight;
  }
);
</script>

<template>
  <div
    v-if="currentSystemMode === 'locked' || currentSystemMode === 'loading'"
    class="flex flex-col h-screen items-center justify-center"
  >
    <div v-if="currentSystemMode === 'loading'" class="flex flex-col gap-2">
      <!-- LOADER -->
      <KryosLoader :loading="currentSystemMode === 'loading'" />
      <!-- END LOADER -->

      <!-- BOOT SEQUENCE -->
      <div
        ref="bootScrollElement"
        class="flex flex-col gap-2 mt-12 font-mono h-50 overflow-hidden"
      >
        <span>BOOT SEQUENCE INITIATED...</span>
        <span
          v-for="(sequence, idx) in bootSequence"
          :key="idx"
          :class="[
            'text-[.8rem] uppercase',
            `${idx === bootSteps.length - 1 ? 'text-(--kryos-ok)' : ''}`,
          ]"
          >{{ sequence }}</span
        >
      </div>
      <!-- END BOOT SEQUENCE -->
    </div>

    <div
      v-else
      class="flex flex-col items-center h-screen justify-center gap-2"
    >
      <h1>LOCKED</h1>
    </div>
  </div>

  <KryosSystemTerminal v-else />
</template>
