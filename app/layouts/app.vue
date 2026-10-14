<script setup lang="ts">
const route = useRoute();
const links = [
  { label: "Overview", to: "/app" },
  { label: "Fleet", to: "/app/fleet" },
  { label: "Zones", to: "/app/zones" },
  { label: "Notifications", to: "/app/notifications" },
];
function isActive(to: string) { return to === "/app" ? route.path === to : route.path.startsWith(to); }
</script>

<template>
  <div class="min-h-screen bg-(--kryos-bg) text-(--kryos-text-mid)">
    <header class="border-b border-white/10 bg-(--kryos-bg-alt)">
      <div class="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <NuxtLink to="/app" class="flex flex-col focus-visible:outline-2 focus-visible:outline-(--kryos-warn)">
          <span class="text-sm font-semibold tracking-[0.2em] text-(--kryos-text-high)">KRYOS</span>
          <span class="text-xs uppercase tracking-[0.16em] text-(--kryos-text-low)">Platform workspace</span>
        </NuxtLink>
        <div class="hidden items-center gap-3 text-right sm:flex">
          <span class="text-xs uppercase tracking-[0.14em] text-(--kryos-text-low)">Demo workspace</span>
          <span class="flex size-9 items-center justify-center rounded-full border border-(--kryos-accent) text-sm text-(--kryos-warn)" aria-label="Demo account placeholder">DS</span>
        </div>
      </div>
    </header>
    <div class="mx-auto flex max-w-7xl flex-col md:flex-row">
      <aside class="border-b border-white/10 md:w-56 md:shrink-0 md:border-b-0 md:border-r">
        <nav aria-label="Platform navigation" class="flex gap-1 overflow-x-auto p-3 md:sticky md:top-0 md:flex-col md:gap-2 md:p-5">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-(--kryos-text-high) focus-visible:outline-2 focus-visible:outline-(--kryos-warn)" :class="isActive(link.to) ? 'bg-white/5 text-(--kryos-warn)' : ''" :aria-current="isActive(link.to) ? 'page' : undefined">{{ link.label }}</NuxtLink>
          <div class="hidden border-t border-white/10 pt-3 md:block"><NuxtLink to="/app/settings" class="block rounded-md px-3 py-2 text-sm hover:bg-white/5 hover:text-(--kryos-text-high) focus-visible:outline-2 focus-visible:outline-(--kryos-warn)">Settings</NuxtLink></div>
        </nav>
      </aside>
      <main class="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10"><slot /></main>
    </div>
  </div>
</template>
