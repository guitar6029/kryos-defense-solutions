<script lang="ts" setup>
import Modal from "./components/Modal.vue";
import { useSystemModalStore } from "./stores/systemModal";

const systemsModalStore = useSystemModalStore();

function handleExit() {
  systemsModalStore.close();
  navigateTo("/");
}

function handleEnter() {
  systemsModalStore.close();
}
</script>

<template>
  <NuxtLayout>
    <Modal
      v-if="systemsModalStore.isShowing"
      :show-btns="systemsModalStore.showBtns"
      @cancel="handleExit"
      @continue="handleEnter"
    >
      <template #header>
        <h1 class="font-bold text-5xl">KRYOS SYSTEMS INTERFACE</h1>
      </template>

      <div class="flex flex-col gap-4 text-4xl">
        <div class="flex flex-col gap-4 max-w-4xl">
          <p>
            Accessing this interface initiates the Kryos internal systems layer.
          </p>
          <p>
            This environment manages core architectural components supporting
            autonomous platforms and tactical infrastructure.
          </p>

          <span>Module: Systems</span>
          <span>Release Channel: Internal</span>
          <span>Version: 2.4</span>
        </div>
      </div>
    </Modal>
    <Nav />
    <main class="flex justify-center min-h-screen overflow-x-hidden">
      <div class="w-full max-w-[3000px] flex flex-col gap-2">
        <NuxtPage />
      </div>
    </main>
    <KryosFooter />
  </NuxtLayout>
</template>
