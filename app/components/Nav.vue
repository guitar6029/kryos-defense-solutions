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
  <header
    class="marketing-nav-telemetry sticky top-0 z-50 border-b border-(--kryos-accent-dark-3) bg-(--kryos-bg-alt)/95 backdrop-blur">
    <nav aria-label="Main navigation"
      class="mx-auto flex min-h-18 w-full max-w-7xl items-center gap-8 px-6 md:px-10 max-[750px]:hidden">
      <NuxtLink to="/" aria-label="Kryos home"
        class="mr-auto inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kryos-2077-focus">
        <img src="/assets/images/kryos-symbol.png" alt="" width="1341" height="1173" class="h-10 w-auto" />
      </NuxtLink>
      <NuxtLink v-for="link in marketingLinks" :key="link.to" :to="link.to"
        class="marketing-nav-link font-kryos-2077-ui" :class="{ 'marketing-nav-link--active': link.active(route.path) }"
        :aria-current="link.active(route.path) ? 'page' : undefined">
        <span class="relative z-10">{{ link.label }}</span>
      </NuxtLink>
    </nav>

    <div class="flex min-h-18 items-center px-6 min-[751px]:hidden">
      <NuxtLink to="/" aria-label="Kryos home"
        class="inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kryos-2077-focus">
        <img src="/assets/images/kryos-symbol.png" alt="" width="1341" height="1173" class="h-9 w-auto" />
      </NuxtLink>
    </div>

    <KryosToggleMenu :expanded="sideMenuDisplaying" :controls="mobileMenuId" @toggle-menu="handleToggleMenu" />
    <Transition name="panel-fade">
      <KryosSidePanel v-if="sideMenuDisplaying" :id="mobileMenuId" :marketing-telemetry="true"
        :show-close-button="false" :show-header="false" @close="handleCloseMenu">
        <template #main>
          <nav aria-label="Mobile main navigation" class="flex flex-col items-center gap-5">
            <NuxtLink v-for="link in marketingLinks" :key="link.to" :to="link.to" @click="handleCloseMenu"
              class="marketing-nav-link font-kryos-2077-ui text-lg"
              :class="{ 'marketing-nav-link--active': link.active(route.path) }"
              :aria-current="link.active(route.path) ? 'page' : undefined">
              <span class="relative z-10">{{ link.label }}</span>
            </NuxtLink>
          </nav>
        </template>
      </KryosSidePanel>
    </Transition>
  </header>
</template>

<style scoped src="./styles/nav.css"></style>
