import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type SystemMode = "locked" | "loading" | "operational" | "exiting";

export const useSystemStateStore = defineStore("systemState", () => {
  const currentSystemMode = ref<SystemMode>("locked");

  function setToExitingMode() {
    currentSystemMode.value = "exiting";
  }

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
  const isLocked = computed(() => currentSystemMode.value === "locked");
  const isLoading = computed(() => currentSystemMode.value === "loading");
  const isOperational = computed(
    () => currentSystemMode.value === "operational"
  );
  const isExiting = computed(() => currentSystemMode.value === "exiting");

  return {
    currentSystemMode,
    isExiting,
    isLoading,
    isLocked,
    isOperational,
    resetMode,
    setToExitingMode,
    setToLoadingMode,
    setToLockedMode,
    setToOperationalMode,
  };
});
