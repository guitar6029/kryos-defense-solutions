<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <header class="sticky top-0 z-50">
    <nav
      class="flex items-center gap-4 h-35 bg-(--kryos-bg-alt) font-orbitron text-xl p-4"
    >
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
    </nav>
  </header>
</template>
