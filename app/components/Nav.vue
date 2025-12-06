<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <header class="sticky top-0 z-50">
    <nav
      class="flex items-center gap-4 h-45 bg-(--kryos-bg-alt) font-orbitron text-4xl p-4"
    >
      <NuxtLink
        to="/"
        :class="route.path === '/' ? 'text-(--kryos-text-high)' : ''"
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/products"
        :class="
          route.path.startsWith('/products') ? 'text-(--kryos-text-high)' : ''
        "
      >
        Products
      </NuxtLink>

      <NuxtLink
        to="/rdivision"
        :class="
          route.path.startsWith('/rdivision') ? 'text-(--kryos-text-high)' : ''
        "
      >
        R&D Division
      </NuxtLink>

      <NuxtLink
        to="/contact"
        :class="
          route.path.startsWith('/contact') ? 'text-(--kryos-text-high)' : ''
        "
      >
        Contact
      </NuxtLink>

      <NuxtLink
        to="/about"
        :class="
          route.path.startsWith('/about') ? 'text-(--kryos-text-high)' : ''
        "
      >
        About
      </NuxtLink>
    </nav>
  </header>
</template>
