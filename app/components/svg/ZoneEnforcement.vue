<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <!-- Outer rounded square (perimeter) -->
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

    <!-- Inner dashed boundary (soft zone) -->
    <rect
      x="14"
      y="14"
      width="36"
      height="28"
      rx="4"
      ry="4"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="4 3"
    />

    <!-- Protected asset in center -->
    <circle cx="32" cy="28" r="4" fill="currentColor" />

    <!-- Escalating response ladder (harder measures) -->
    <g transform="translate(0,4)">
      <rect
        x="40"
        y="36"
        width="4"
        height="8"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect
        x="46"
        y="32"
        width="4"
        height="12"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect
        x="52"
        y="28"
        width="4"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
    </g>
  </svg>
</template>
