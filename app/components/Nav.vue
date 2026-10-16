<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import KryosSidePanel from "./Panels/KryosSidePanel.vue";
import KryosToggleMenu from "./Buttons/KryosToggleMenu.vue";
import { DESKTOP_NAV_MIN_WIDTH } from "#imports";

const route = useRoute();
const { sideMenuDisplaying, toggleMenu, closeMenu } =
  useKryosMobileMenu(DESKTOP_NAV_MIN_WIDTH);
const mobileMenuId = "kryos-mobile-menu";
const menuTrigger = ref<HTMLElement | null>(null);

const handleToggleMenu = (trigger: HTMLElement) => {
  menuTrigger.value = trigger;
  toggleMenu();
};

const handleCloseMenu = async () => {
  closeMenu();
  await nextTick();
  menuTrigger.value?.focus();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && sideMenuDisplaying.value) {
    void handleCloseMenu();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});

const marketingLinks = [
  { label: "Home", to: "/", active: (path: string) => path === "/" },
  { label: "Platform", to: "/platform", active: (path: string) => path === "/platform" },
  { label: "Products", to: "/products", active: (path: string) => path.startsWith("/products") },
  { label: "About", to: "/about", active: (path: string) => path.startsWith("/about") },
];
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-(--kryos-bg-alt)/95 backdrop-blur">
    <nav
      aria-label="Main navigation"
      class="mx-auto flex min-h-18 w-full max-w-7xl items-center gap-8 px-6 md:px-10 max-[750px]:hidden"
    >
      <NuxtLink to="/" class="mr-auto text-lg font-semibold tracking-[0.12em] text-(--kryos-text-high) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
        KRYOS
      </NuxtLink>
      <NuxtLink
        v-for="link in marketingLinks"
        :key="link.to"
        :to="link.to"
        class="rounded-sm py-2 text-sm font-medium text-(--kryos-text-mid) hover:text-(--kryos-text-high) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
        :class="link.active(route.path) ? 'text-(--kryos-text-high)' : ''"
        :aria-current="link.active(route.path) ? 'page' : undefined"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <KryosToggleMenu
      :expanded="sideMenuDisplaying"
      :controls="mobileMenuId"
      @toggle-menu="handleToggleMenu"
    />
    <Transition name="panel-fade">
      <KryosSidePanel
        v-if="sideMenuDisplaying"
        :id="mobileMenuId"
        @close="handleCloseMenu"
      >
        <template #main>
          <nav aria-label="Mobile main navigation" class="flex flex-col items-center gap-5">
            <NuxtLink
              v-for="link in marketingLinks"
              :key="link.to"
              :to="link.to"
              @click="handleCloseMenu"
              class="text-lg text-(--kryos-text-mid) hover:text-(--kryos-text-high) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)"
              :class="link.active(route.path) ? 'text-(--kryos-text-high)' : ''"
              :aria-current="link.active(route.path) ? 'page' : undefined"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </template>
      </KryosSidePanel>
    </Transition>
  </header>
</template>
