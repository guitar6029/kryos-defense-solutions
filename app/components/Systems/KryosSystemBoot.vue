<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  BOOT_SEQUENCE_STEPS,
  FINALIZE_SEQUENCE_STEPS,
} from "~/assets/static_data/BootSequenceSteps";

const BASE_SEQUENCE_MS_INTERVAL = 150;
const BASE_FINALIZED_BOOT_MS = 700;
const emits = defineEmits<{
  (e: "boot-completed"): void;
}>();

/** FINAL BOOT SEQUENCE */
const finalBootSequence = ref<string[]>([]);
// final steps data array
const bootFinalSteps = FINALIZE_SEQUENCE_STEPS;
// final interval id
const finalBootSequenceIntervalId = ref<ReturnType<typeof setInterval> | null>(
  null
);
/** END FINAL BOOT SEQUENCE */

/** INITIAL BOOT SEQUENCE */
const bootSequence = ref<string[]>([]);
// boot array
const bootSteps = BOOT_SEQUENCE_STEPS;
//  interval id
const sequenceIntervalId = ref<ReturnType<typeof setInterval> | null>(null);
/** END INITIAL BOOT SEQUENCE */

/** REF FOR THE DIV TO SCROLL AUTOMATICALLY */
const bootScrollElement = ref<HTMLElement | null>(null);

function beginFinalizeBoot() {
  stopFinalBootSequence();

  let i = 0;
  finalBootSequenceIntervalId.value = setInterval(() => {
    if (i >= bootFinalSteps.length) {
      stopFinalBootSequence();
      emits("boot-completed");
      return;
    }

    const step = bootFinalSteps[i];
    if (step === undefined) return;
    finalBootSequence.value.push(step);
    i++;
  }, BASE_FINALIZED_BOOT_MS);
}

function beginSystemBootSequence() {
  stopBootSequenceInterval();

  let i = 0;
  sequenceIntervalId.value = setInterval(() => {
    if (i >= bootSteps.length) {
      if (sequenceIntervalId.value) {
        clearInterval(sequenceIntervalId.value);
        sequenceIntervalId.value = null;
        beginFinalizeBoot();
      }
      return;
    }

    const step = bootSteps[i];
    if (step === undefined) return;
    bootSequence.value.push(step);
    i++;
  }, BASE_SEQUENCE_MS_INTERVAL);
}

watch(
  [() => bootSequence.value.length, () => finalBootSequence.value.length],
  async () => {
    await nextTick();
    const divElement = bootScrollElement.value;
    if (!divElement) {
      return;
    }
    divElement.scrollTop = divElement.scrollHeight;
  }
);

function resetBootState() {
  //clear intervals
  stopBootSequenceInterval();
  stopFinalBootSequence();

  //clear arrays
  bootSequence.value = [];
  finalBootSequence.value = [];
}

function stopBootSequenceInterval() {
  if (sequenceIntervalId.value) {
    clearInterval(sequenceIntervalId.value);
    sequenceIntervalId.value = null;
  }
}

function stopFinalBootSequence() {
  if (finalBootSequenceIntervalId.value) {
    clearInterval(finalBootSequenceIntervalId.value);
    finalBootSequenceIntervalId.value = null;
  }
}

onMounted(() => {
  resetBootState();
  beginSystemBootSequence();
});

onBeforeUnmount(() => {
  stopBootSequenceInterval();
  stopFinalBootSequence();
});
</script>

<template>
  <div
    ref="bootScrollElement"
    class="flex flex-col gap-2 mt-12 font-mono h-50 overflow-hidden"
  >
    <span>BOOT SEQUENCE INITIATED...</span>
    <span
      v-for="(sequence, idx_sequence) in bootSequence"
      :key="`${idx_sequence}-sequence`"
      :class="[
        'text-[.8rem] uppercase',
        `${idx_sequence === bootSteps.length - 1 ? 'text-(--kryos-ok)' : ''}`,
      ]"
      >{{ sequence }}</span
    >

    <!-- final -->
    <span
      v-for="(finalSequenceStep, idx_final) in finalBootSequence"
      :key="`${idx_final}-sequence-final-boot`"
      class="text-[.8rem] uppercase text-(--kryos-ok)"
      >{{ finalSequenceStep }}</span
    >
  </div>
</template>
