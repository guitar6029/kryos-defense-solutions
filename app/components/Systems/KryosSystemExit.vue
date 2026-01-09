<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import { SHUTDOWN_SEQUENCE_STEPS } from "~/assets/static_data/ShutdownSequenceSteps";
import { useSystemStateStore } from "#imports";

// consts for intervals and timeouts
const BASE_SEQUENCE_MS_INTERVAL = 250;
const SYSTEM_TIMEOUT = 2500;
const SHUTDOWN_STEPS_LENGTH = SHUTDOWN_SEQUENCE_STEPS.length;

const systemStore = useSystemStateStore();

const sequenceContainer = ref<HTMLElement | null>(null);
const systemExitSteps = ref<string[]>([]);

const sequenceIntervalId = ref<ReturnType<typeof setInterval> | null>(null);
const finalizedTimeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
const initializeShutdownSequence = () => {
  stopShutdownSequence();
  let i = 0;
  sequenceIntervalId.value = setInterval(() => {
    if (i >= SHUTDOWN_SEQUENCE_STEPS.length) {
      if (sequenceIntervalId.value) {
        clearInterval(sequenceIntervalId.value);
        finalizeExit();
        return;
      }
    }
    const step = SHUTDOWN_SEQUENCE_STEPS[i];
    if (step === undefined) return;
    systemExitSteps.value.push(step);
    i++;
  }, BASE_SEQUENCE_MS_INTERVAL);
};

const stopShutdownSequence = () => {
  if (sequenceIntervalId.value) {
    clearInterval(sequenceIntervalId.value);
    sequenceIntervalId.value = null;
  }
  if (finalizedTimeoutId.value) {
    clearTimeout(finalizedTimeoutId.value);
    finalizedTimeoutId.value = null;
  }
};

const finalizeExit = () => {
  finalizedTimeoutId.value = setTimeout(() => {
    systemStore.resetMode();
    stopShutdownSequence();
    navigateTo("/");
  }, SYSTEM_TIMEOUT);
};

onMounted(() => {
  initializeShutdownSequence();
});

onBeforeUnmount(() => {
  stopShutdownSequence();
  //reseet everything
  resetValues();
});

function resetValues() {
  systemExitSteps.value = [];
  sequenceContainer.value = null;
}

watch(
  () => systemExitSteps.value.length,
  async () => {
    await nextTick();
    const divElement = sequenceContainer.value;
    if (!divElement) return;
    divElement.scrollTop = divElement.scrollHeight;
  }
);

function getSequenceColor(idx: number): string {
  return idx >= SHUTDOWN_STEPS_LENGTH - 5 ? "text-(--kryos-ok)" : "";
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="uppercase text-left text-[.8rem] gap-2 font-mono"
      >system exiting...</span
    >
    <div
      ref="sequenceContainer"
      class="flex flex-col text-[.8rem] gap-2 font-mono h-50 overflow-hidden uppercase"
    >
      <span
        v-for="(value, idx) in systemExitSteps"
        :key="`system_exit_step-${idx}`"
        :class="getSequenceColor(idx)"
      >
        {{ value }}
      </span>
    </div>
  </div>
</template>
