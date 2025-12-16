<script setup lang="ts">
type Anchor = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

type LineFrom = "tl" | "tc" | "tr" | "lc" | "rc" | "bl" | "bc" | "br";

const props = defineProps<{
  anchor: Anchor; // required: absolute offsets
  class?: string;
  wClass?: string; // ex: "w-100"
  hClass?: string; // ex: "h-28"
  showLine?: boolean;
  lineFrom?: LineFrom;
  lineLen?: string;
}>();

function lineAnchor(val: LineFrom) {
  switch (val) {
    case "lc":
      return "right-full top-1/2 -translate-y-1/2";
    case "rc":
      return "left-full top-1/2 -translate-y-1/2";
    case "tc":
      return "bottom-full left-1/2 -translate-x-1/2";
    case "bc":
      return "top-full left-1/2 -translate-x-1/2";
    case "tl":
      return "right-full bottom-full";
    case "tr":
      return "left-full bottom-full";
    case "bl":
      return "right-full top-full";
    case "br":
      return "left-full top-full";
  }
}

function isHorizontal(val: LineFrom) {
  return (
    val === "lc" ||
    val === "rc" ||
    val === "tl" ||
    val === "tr" ||
    val === "bl" ||
    val === "br"
  );
}

function pinAtLineEnd(val: LineFrom) {
  // pin sits at the *far end* of the leader
  switch (val) {
    case "lc":
      return "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2";
    case "rc":
      return "right-0 top-1/2 translate-x-1/2 -translate-y-1/2";
    case "tc":
      return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2";
    case "bc":
      return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2";
    default:
      return "left-0 top-0"; // (optional) corners later
  }
}
</script>

<template>
  <div
    class="absolute z-10"
    :class="[props.wClass ?? 'w-100', props.hClass ?? 'h-24', props.class]"
    :style="{
      top: props.anchor.top,
      left: props.anchor.left,
      right: props.anchor.right,
      bottom: props.anchor.bottom,
    }"
  >
    <div class="relative w-full h-full">
      <!-- panel -->
      <svg
        class="absolute inset-0 w-full h-full"
        viewBox="0 0 1272 530"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M554.5 488H709.5H1197L1245 407V174L1271 133.5V0.5H1160L1097.5 19H225.5L192.5 0.5H0.5V133.5L22.5 174V362.5H0.5V488L44.5 529H499L554.5 488Z"
          stroke="var(--kryos-text-high)"
        />
      </svg>

      <!-- content -->
      <div class="relative z-10 p-4">
        <slot />
      </div>

      <!-- leader + pin (as one unit) -->
      <div
        v-if="props.showLine && props.lineFrom"
        class="absolute pointer-events-none"
        :class="lineAnchor(props.lineFrom)"
      >
        <!-- the line -->
        <div
          class="bg-(--kryos-text-high) opacity-70"
          :class="isHorizontal(props.lineFrom) ? 'h-0.5' : 'w-0.5'"
          :style="
            isHorizontal(props.lineFrom)
              ? { width: props.lineLen ?? '10rem' }
              : { height: props.lineLen ?? '10rem' }
          "
        />

        <!-- the pin at the END of the line -->
        <div
          class="absolute size-2 rounded-full bg-(--kryos-text-high) opacity-90"
          :class="pinAtLineEnd(props.lineFrom)"
        />
      </div>
    </div>
  </div>
</template>
