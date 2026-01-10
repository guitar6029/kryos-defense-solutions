<script lang="ts" setup>
import KryosSidePanel from "./Panels/KryosSidePanel.vue";
import KryosToggleMenu from "./Buttons/KryosToggleMenu.vue";
import { DESKTOP_NAV_MIN_WIDTH } from "#imports";
const route = useRoute();

const { isMobile, sideMenuDisplaying, toggleMenu, closeMenu } =
  useKryosMobileMenu(DESKTOP_NAV_MIN_WIDTH);
</script>

<template>
  <header v-if="!isMobile" class="sticky top-0 z-50">
    <nav
      class="flex items-center gap-4 h-35 bg-(--kryos-bg-alt) font-orbitron text-xl p-4 relative"
    >
      <div class="absolute top-0 right-0 -rotate-90 origin-bottom-right">
        <span class="font-orbitron font-bold">KRYOS</span>
      </div>

      <NuxtLink
        to="/"
        class="kryos-bracket nav-link"
        :class="route.path === '/' ? 'text-(--kryos-text-high)' : ''"
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/products"
        class="kryos-bracket nav-link"
        :class="
          route.path.startsWith('/products') ? 'text-(--kryos-text-high)' : ''
        "
      >
        Products
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="kryos-bracket nav-link"
        :class="
          route.path.startsWith('/about') ? 'text-(--kryos-text-high)' : ''
        "
      >
        About
      </NuxtLink>

      <NuxtLink
        to="/systems"
        class="kryos-bracket nav-link"
        :class="
          route.path.startsWith('/systems') ? 'text-(--kryos-text-high)' : ''
        "
      >
        Systems
      </NuxtLink>
    </nav>
    <div
      class="w-full h-0.5 bg-linear-to-r from-(--kryos-warn)/0 via-(--kryos-warn)/40 to-(--kryos-warn)/0"
    ></div>
  </header>
  <KryosToggleMenu :is-mobile="isMobile" @toggle-menu="toggleMenu" />
  <Transition name="panel-fade">
    <KryosSidePanel v-if="sideMenuDisplaying" @close="closeMenu">
      <template #main>
        <NuxtLink
          to="/"
          @click="closeMenu"
          class="kryos-bracket nav-link"
          :class="route.path === '/' ? 'text-(--kryos-text-high)' : ''"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/products"
          @click="closeMenu"
          class="kryos-bracket nav-link"
          :class="
            route.path.startsWith('/products') ? 'text-(--kryos-text-high)' : ''
          "
        >
          Products
        </NuxtLink>

        <NuxtLink
          to="/about"
          @click="closeMenu"
          class="kryos-bracket nav-link"
          :class="
            route.path.startsWith('/about') ? 'text-(--kryos-text-high)' : ''
          "
        >
          About
        </NuxtLink>

        <NuxtLink
          to="/systems"
          @click="closeMenu"
          class="kryos-bracket nav-link"
          :class="
            route.path.startsWith('/systems') ? 'text-(--kryos-text-high)' : ''
          "
        >
          Systems
        </NuxtLink>
      </template>
    </KryosSidePanel>
  </Transition>
</template>
