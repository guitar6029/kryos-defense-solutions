<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <header class="sticky top-0 z-50">
    <nav
      class="flex items-center gap-4 h-35 bg-(--kryos-bg-alt) font-orbitron text-xl p-4 relative"
    >
      <div class="absolute top-0 right-0 -rotate-90 origin-bottom-right">
        <span class="font-orbitron font-bold">KRYOS</span>
      </div>

      <NuxtLink
        to="/"
        class="nav-link"
        :class="route.path === '/' ? 'text-(--kryos-text-high)' : ''"
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/products"
        class="nav-link"
        :class="
          route.path.startsWith('/products') ? 'text-(--kryos-text-high)' : ''
        "
      >
        Products
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="nav-link"
        :class="
          route.path.startsWith('/about') ? 'text-(--kryos-text-high)' : ''
        "
      >
        About
      </NuxtLink>

      <!-- <svg viewBox="0 0 80 100" class="w-20 mx-auto" fill="none" stroke="black">
        <ellipse
          cx="40"
          cy="35"
          rx="25"
          ry="15"
          stroke-width="2"
          fill="white"
        ></ellipse>
        <line x1="15" y1="35" x2="15" y2="65" stroke-width="2"></line>
        <line x1="65" y1="35" x2="65" y2="65" stroke-width="2"></line>
        <ellipse
          cx="40"
          cy="65"
          rx="25"
          ry="15"
          stroke-width="2"
          fill="white"
        ></ellipse>
        <line x1="40" y1="20" x2="40" y2="80" stroke-width="1"></line>
        <circle cx="40" cy="40" r="4" fill="black"></circle>
        <circle cx="40" cy="60" r="4" fill="black"></circle>
      </svg> -->
    </nav>
    <div
      class="w-full h-0.5 bg-linear-to-r from-(--kryos-warn)/0 via-(--kryos-warn)/40 to-(--kryos-warn)/0"
    ></div>
  </header>
</template>
