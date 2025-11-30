<script lang="ts" setup>
type ShapeOption = 1 | 2 | 3;

const props = withDefaults(
  defineProps<{
    option?: ShapeOption;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    extraClass?: string;
  }>(),
  {
    option: 1,
    fill: "none",
    stroke: "var(--kryos-accent)",
    strokeWidth: 1,
    extraClass: "w-auto h-full",
  }
);

// Store SVG paths in an object
const paths: Record<ShapeOption, { viewBox: string; d: string }> = {
  1: {
    viewBox: "0 0 937 816",
    d: `M0 0.5H148L241 79.5H463L522 44.5H603L666 147.5L656 176.5L818 421.5L856 427.5L936 543.5V709.5L560 807.5L241 815.5L167 751.5H0
        M252.5 73V59H336.5V73H252.5Z
        M342 73V59H363V73H342Z
        M369.5 59V73H397V59H369.5Z
        M252.5 34V49.5L362 50.5V42.5L355 34H252.5Z
        M369.5 42.5V50.5H390.5L397 46V34H369.5Z`,
  },
  2: {
    viewBox: "0 0 863 814",
    d: `M862.42 0.436462L709.42 85.9365V259.936L681.42 272.26
        M0.420044 690.936L177.92 415.936H242.42
        M242.42 415.936L248.92 410.436H359.42L362.92 415.936
        M242.42 415.936H362.92
        M362.92 415.936H402.92L486.92 338.936H529.92L558.92 326.173
        M558.92 326.173L560.92 318.936L670.92 269.436L681.42 272.26
        M558.92 326.173L681.42 272.26
        M4.42004 693.936L278.92 732.936L529.92 665.436L709.42 813.436L862.42 808.436`,
  },
  3: {
    viewBox: "0 0 1181 505",
    d: `M0.359863 418.037L11.8599 429.956M1180.86 133.037H1096.36L987.86 7.03732H774.86L763.258 10.0373M553.86 64.1848L527.36 71.0373V252.037L307.86 503.537H256.86M553.86 64.1848L560.36 39.0373L677.86 10.0373L693.36 14.0373L748.86 0.537323L763.258 10.0373M553.86 64.1848L763.258 10.0373M110.86 503.537H82.8599L62.8599 482.81M110.86 503.537L124.36 491.537H240.86L256.86 503.537M110.86 503.537H256.86M11.8599 429.956H28.3599L60.8599 463.537L62.8599 482.81M11.8599 429.956L62.8599 482.81`,
  },
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="props.extraClass"
    :viewBox="paths[props.option].viewBox"
    :fill="props.fill"
  >
    <path
      :d="paths[props.option].d"
      :stroke="props.stroke"
      :stroke-width="props.strokeWidth"
    />
  </svg>
</template>
