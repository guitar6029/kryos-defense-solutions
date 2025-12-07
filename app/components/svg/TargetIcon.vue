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

    <!-- Radar concentric circles -->
    <circle
      cx="32"
      cy="32"
      r="10"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="4 3"
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />

    <!-- Radar sweep -->
    <path
      d="M32 32 L50 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
    />

    <!-- Detected anomaly marker -->
    <polygon
      points="50,24 53,27 50,30 47,27"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />

    <!-- Small motion blip -->
    <circle cx="24" cy="40" r="3" fill="currentColor" />
  </svg>
</template>
