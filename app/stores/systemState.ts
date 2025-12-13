import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type SystemMode = "locked" | "loading" | "operational";

export const useSystemStateStore = defineStore("systemState", () => {
  const currentSystemMode = ref<SystemMode>("locked");

  function setToLockedMode() {
    currentSystemMode.value = "locked";
  }

  function setToLoadingMode() {
    currentSystemMode.value = "loading";
  }

  function setToOperationalMode() {
    currentSystemMode.value = "operational";
  }

  function resetMode() {
    currentSystemMode.value = "locked";
  }

  /** COMPUTED ***/
  const isLocked = computed(() => currentSystemMode.value === 'locked')
  const isLoading = computed(() => currentSystemMode.value === 'loading')
  const isOperational = computed(() => currentSystemMode.value === 'operational')

  return {
    currentSystemMode,
    isLoading,
    isLocked,
    isOperational,
    resetMode,
    setToLoadingMode,
    setToLockedMode,
    setToOperationalMode,
  };
});
