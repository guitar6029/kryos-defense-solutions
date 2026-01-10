<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    fill="none"
    stroke="currentColor"
    stroke-width="6"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Outer rounded tile -->
    <rect x="10" y="10" width="108" height="108" rx="18" opacity="0.95" />

    <!-- Metro line (main) -->
    <path d="M30 44h26c6 0 10 4 10 10v20c0 6 4 10 10 10h22" />

    <!-- Metro line (branch / subterranean) -->
    <path d="M66 74l-12 12c-4 4-8 6-14 6H30" opacity="0.75" />

    <!-- Stations -->
    <circle cx="30" cy="44" r="8" />
    <circle cx="56" cy="44" r="6" />
    <circle cx="66" cy="74" r="7" />
    <circle cx="98" cy="84" r="8" />

    <!-- Underground strata lines -->
    <path d="M30 96h68" opacity="0.35" />
    <path d="M34 104h60" opacity="0.25" />
  </svg>
</template>
