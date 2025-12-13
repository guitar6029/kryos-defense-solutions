import { defineStore } from "pinia";
import { ref } from "vue";

export const useSystemModalStore = defineStore("systemsModal", () => {
  
  const isShowing = ref(false);
  const showBtns = ref(true);

  function open() {
    isShowing.value = true;
  }

  function close() {
    isShowing.value = false;
  }

  return { isShowing, showBtns, open, close };
});
