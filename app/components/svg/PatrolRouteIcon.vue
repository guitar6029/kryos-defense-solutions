<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <!-- Outer rounded square -->
    <rect
      x="3"
      y="3"
      width="58"
      height="58"
      rx="8"
      ry="8"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    />

    <!-- Waypoint circles -->
    <circle
      cx="18"
      cy="18"
      r="6"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    />
    <circle
      cx="46"
      cy="46"
      r="6"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    />

    <!-- Dashed routes -->
    <!-- Bottom-left to center to upper-right -->
    <path
      d="M 10 44
       Q 22 42 28 36
       Q 34 28 46 18"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="4 4"
    />
    <!-- Center to bottom-right circle -->
    <path
      d="M 26 38
       Q 34 44 42 46"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="4 4"
    />
  </svg>
</template>
