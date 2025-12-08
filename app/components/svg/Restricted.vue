<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <!-- Outer warning triangle -->
    <path
      d="M32 10L10 48h44L32 10z"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <!-- Inner lock -->
    <rect
      x="26"
      y="30"
      width="12"
      height="10"
      rx="2"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
    />
    <path
      d="M30 30v-2a4 4 0 0 1 8 0v2"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <circle cx="32" cy="35" r="1.3" fill="currentColor" />
  </svg>
</template>
