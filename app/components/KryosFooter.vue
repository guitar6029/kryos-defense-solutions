<template>
  <footer class="border-t border-(--kryos-accent-dark-3) bg-(--kryos-bg-alt)">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
      <div>
        <p class="font-semibold tracking-[0.12em] text-(--kryos-text-high)">
          KRYOS DEFENSE SOLUTIONS
        </p>
        <p class="mt-2 max-w-xl text-sm leading-relaxed">
          Fictional engineering portfolio · software prototype uses sample data · hardware concepts are not fielded products.
        </p>
      </div>
      <nav aria-label="Footer navigation" class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <NuxtLink to="/" class="text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          Home
        </NuxtLink>
        <NuxtLink to="/platform" class="text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          Platform
        </NuxtLink>
        <NuxtLink to="/products" class="text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          Products
        </NuxtLink>
        <NuxtLink to="/about" class="text-(--kryos-text-mid) underline-offset-4 hover:text-(--kryos-text-high) hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kryos-warn)">
          About
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
