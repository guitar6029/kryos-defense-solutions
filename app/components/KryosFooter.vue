<template>
  <footer class="border-t border-(--kryos-accent-dark-3) bg-(--kryos-bg-alt)">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
      <div>
        <NuxtLink
          to="/"
          aria-label="Kryos home"
          class="inline-flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-2077-focus)"
        >
          <img
            src="/assets/images/kryos-symbol.png"
            alt=""
            width="1341"
            height="1173"
            class="h-9 w-auto"
          />
          <span class="font-kryos-2077-ui text-2xl font-bold tracking-[0.16em] text-kryos-2077-text">
            KRYOS
          </span>
        </NuxtLink>
        <p class="font-kryos-2077-ui mt-2 tracking-[0.12em] text-(--kryos-text-high)">
          KRYOS DEFENSE SOLUTIONS
        </p>
        <p class="mt-2 max-w-xl text-sm leading-relaxed">
          Autonomous systems · Fleet intelligence · Advanced engineering
        </p>
      </div>
      <nav aria-label="Footer navigation" class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <NuxtLink to="/" class="font-kryos-2077-ui text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          Home
        </NuxtLink>
        <NuxtLink to="/platform" class="font-kryos-2077-ui text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          Platform
        </NuxtLink>
        <NuxtLink to="/products" class="font-kryos-2077-ui text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          Products
        </NuxtLink>
        <NuxtLink to="/about" class="font-kryos-2077-ui text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          About
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
