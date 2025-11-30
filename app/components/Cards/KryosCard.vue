<script lang="ts" setup>
type CardOption = 1 | 2;

const props = withDefaults(
  defineProps<{
    title?: string;
    text?: string;
    option?: CardOption;
  }>(),
  {
    title: "",
    text: "",
    option: 1,
  }
);

const cardOptions: Record<
  CardOption,
  { width: string; height: string; cardTitleHeight: string }
> = {
  // square-ish
  1: {
    width: "max-w-xl", // wider but close to square
    height: "h-150",
    cardTitleHeight: "min-h-100",
  },
  // wide + short rectangle
  2: {
    width: "max-w-4xl", // more width
    height: "min-h-100", // less height
    cardTitleHeight: "min-h-60",
  },
};

const currentCard = computed(() => cardOptions[props.option!]);
</script>

<template>
  <div
    class="relative inline-block"
    :class="[currentCard.width, currentCard.height]"
  >
    <div
      class="absolute inset-0 translate-x-3 translate-y-4 rounded-xl border-2 -z-10 bg-(--kryos-metal-light) opacity-40"
    ></div>
    <div
      class="flex flex-col trns hover:bg-(--kryos-bg) items-center justify-between gap-2 border-2 rounded-xl p-4 bg-(--kryos-bg-alt) w-full h-full"
    >
      <h4
        class="card-title border-b-2 w-full"
        :class="currentCard.cardTitleHeight"
      >
        {{ title }}
      </h4>

      <p v-if="text" class="card-text w-full">
        {{ text }}
      </p>
    </div>
  </div>
</template>
