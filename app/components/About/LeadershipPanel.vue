<script lang="ts" setup>
// leadership img
import ColMarcusHale from "~/assets/img/leadership/col_marcus_hale.png";
import DrRowan from "~/assets/img/leadership/dr_rowan_ilyan.png";
import YaraChen from "~/assets/img/leadership/yara_chen.png";
import HelenaVoss from "~/assets/img/leadership/helena_voss.png";
import type { JobTitle } from "~/types/JobTitle";

defineProps<{
  jobTitle: JobTitle;
}>();

const selectedJobPanel: Record<
  JobTitle,
  { name: string; title: string; summary: string; image: string }
> = {
  ceo: {
    name: "Helena Voss",
    title: "Chief Executive Officer",
    summary:
      "Oversees global strategy, corporate partnerships, and high-level procurement initiatives, with a background in defense logistics and predictive risk modeling.",
    image: HelenaVoss,
  },

  cto: {
    name: "Dr. Rowan Ilyan",
    title: "Chief Technology Officer",
    summary:
      "Leads platform architecture, AI decision frameworks, and long-horizon research programs within the Advanced Systems Division.",
    image: DrRowan,
  },

  csoo: {
    name: "Col. Marcus Hale (Ret.)",
    title: "Chief Security Operations Officer",
    summary:
      "Coordinates deployment doctrine, field testing, and operational integration with defense and security entities worldwide.",
    image: ColMarcusHale,
  },

  director: {
    name: "Yara Chen",
    title: "Director of Infrastructure & Compliance",
    summary:
      "Manages regulatory alignment, export controls, and infrastructure security standards across all Kryos facilities.",
    image: YaraChen,
  },
};
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="relative shrink-0 max-w-75 xl:w-100 flex-col gap-2">
      <svg
        class="w-full h-auto"
        viewBox="0 0 337 488"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath :id="`leadership_${jobTitle}`">
            <path
              d="M279.364 0.5H316.057L336.5 50.9503V238.337H326.016V333.06H336.5V426.754L316.057 471.026H101.143L76.5062 487.5H0.5V443.227L13.0803 392.777V348.504L0.5 322.764V50.9503L32.475 21.092H257.349L279.364 0.5Z"
            />
          </clipPath>
        </defs>

        <image
          :href="selectedJobPanel[jobTitle].image"
          width="337"
          height="488"
          preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#leadership_${jobTitle})`"
        />

        <path
          d="M279.364 0.5H316.057L336.5 50.9503V238.337H326.016V333.06H336.5V426.754L316.057 471.026H101.143L76.5062 487.5H0.5V443.227L13.0803 392.777V348.504L0.5 322.764V50.9503L32.475 21.092H257.349L279.364 0.5Z"
          fill="none"
          stroke="var(--kryos-accent)"
          stroke-width="2"
        />
      </svg>

      <div class="flex flex-col text-2xl">
        <span class="font-bold text-(--kryos-warn)">{{
          selectedJobPanel[jobTitle].name
        }}</span>
        <span class="italic">{{ selectedJobPanel[jobTitle].title }}</span>
      </div>
    </div>

    <div class="flex flex-col gap-2 min-h-75">
      <p class="text-2xl text-left w-full md:w-100">
        {{ selectedJobPanel[jobTitle].summary }}
      </p>
    </div>
  </div>
</template>
