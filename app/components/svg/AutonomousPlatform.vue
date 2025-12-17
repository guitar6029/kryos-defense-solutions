<template>
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Corner brackets -->
    <path d="M8 18V12H22" />
    <path d="M8 46V52H22" />
    <path d="M56 18V12H42" />
    <path d="M56 46V52H42" />

    <!-- Drone body -->
    <rect x="22" y="26" width="20" height="10" rx="2" />

    <!-- Sensor mast -->
    <line x1="32" y1="22" x2="32" y2="26" />
    <circle cx="32" cy="20" r="2" />

    <!-- Wheels / treads -->
    <circle cx="26" cy="40" r="3" />
    <circle cx="38" cy="40" r="3" />

    <!-- Ground line -->
    <line x1="20" y1="44" x2="44" y2="44" />
  </svg>
</template>
