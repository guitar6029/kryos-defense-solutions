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

    <!-- Log lines (continuous data records) -->
    <rect
      x="14"
      y="16"
      width="22"
      height="4"
      rx="2"
      ry="2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />
    <rect
      x="14"
      y="24"
      width="22"
      height="4"
      rx="2"
      ry="2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />
    <rect
      x="14"
      y="32"
      width="22"
      height="4"
      rx="2"
      ry="2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />

    <!-- Capture block (visual / sensor frame) -->
    <rect
      x="40"
      y="14"
      width="10"
      height="8"
      rx="2"
      ry="2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />
    <circle cx="45" cy="18" r="2" fill="currentColor" />

    <!-- Magnifying glass (forensics / review) -->
    <circle
      cx="38"
      cy="40"
      r="7"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
    />
    <line
      x1="43"
      y1="45"
      x2="50"
      y2="52"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </svg>
</template>
