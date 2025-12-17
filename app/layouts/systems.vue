<script setup lang="ts">
import Modal from "~/components/Modal.vue";
import { useSystemModalStore } from "~/stores/systemModal";
import { useSystemStateStore } from "~/stores/systemState";
import SystemAccents from "~/components/Systems/SystemAccents.vue";

const systemsModalStore = useSystemModalStore();
const systemStateStore = useSystemStateStore();

function handleExit() {
  systemsModalStore.close();
  navigateTo("/");
}

function handleEnter() {
  systemsModalStore.close();
  systemStateStore.setToLoadingMode();
}
</script>

<template>
  <div class="min-h-screen relative cursor-default">
    <Modal
      v-if="systemsModalStore.isShowing"
      :show-btns="systemsModalStore.showBtns"
      @cancel="handleExit"
      @continue="handleEnter"
    >
      <SystemAccents />

      <template #header>
        <h1 class="font-bold text-5xl">KRYOS SYSTEMS INTERFACE</h1>
      </template>

      <div class="flex flex-col text-2xl">
        <div class="flex flex-col gap-4 max-w-4xl">
          <p>
            Accessing this interface initiates the Kryos internal systems layer.
          </p>
          <p>
            This environment manages core architectural components supporting
            autonomous platforms and tactical infrastructure.
          </p>

          <div class="h-[.1rem] bg-(--kryos-accent)"></div>

          <div
            class="flex flex-row items-center gap-2 font-bold uppercase text-[1rem]"
          >
            <span class="text-(--kryos-warn)">[Module]</span>
            <span>Systems</span>
          </div>

          <div
            class="flex flex-row items-center gap-2 font-bold uppercase text-[1rem]"
          >
            <span class="text-(--kryos-warn)">[Release Channel]</span>
            <span>Internal</span>
          </div>

          <div
            class="flex flex-row items-center gap-2 font-bold uppercase text-[1rem]"
          >
            <span class="text-(--kryos-warn)">[Version]</span>
            <span>2.4.8</span>
          </div>
        </div>
      </div>
    </Modal>
    <!-- no Nav / no Footer -->
    <main class="min-h-screen">
      <slot />
    </main>
  </div>
</template>
