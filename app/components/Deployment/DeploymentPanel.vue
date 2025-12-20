<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import AirDeployment from "~/assets/img/swarm_drones.jpg";
import LandDeployment from "~/assets/img/land_deployment.jpg";
import SeaDeployment from "~/assets/img/sea_deployment.jpg";
import DigitalDeployment from "~/assets/img/digital_deployment.jpg";
export type DeploymentType = "air" | "land" | "sea" | "digital";

defineProps<{
  deployment: DeploymentType;
}>();

const selectedDeployment: Record<
  DeploymentType,
  { title: string; description: string; imgSrc: string }
> = {
  air: {
    title: "AIR",
    description: "ISR, overwatch, and interception.",
    imgSrc: AirDeployment,
  },

  land: {
    title: "LAND",
    description: "Patrol, interdiction, and ground support.",
    imgSrc: LandDeployment,
  },

  sea: {
    title: "SEA",
    description: "Maritime patrol and subsurface recon.",
    imgSrc: SeaDeployment,
  },

  digital: {
    title: "DIGITAL",
    description: "Cyber defense and signal intelligence.",
    imgSrc: DigitalDeployment,
  },
};
</script>

<template>
  <div class="flex w-full h-170 flex-row items-center gap-8 p-4 relative">
    <div
      class="absolute flex flex-col xl:flex-row items-center gap-4 left-1/2 -translate-x-1/2 animate-brief z-10"
    >
      <span
        class="font-bold text-(--kryos-warn) font-orbitron text-[4rem] text-nowrap"
        >[{{ selectedDeployment[deployment].title }}]</span
      >

      <div class="relative w-full xl:w-150 text-center">
        <div
          class="text-[2rem] flex-1 text-(--kryos-text-high) font-bold px-6 py-4"
        >
          <span class="uppercase">{{
            selectedDeployment[deployment].description
          }}</span>
        </div>
      </div>
    </div>

    <!-- PANEL WRAPPER -->
    <Absolute
      class="w-full xl:w-250 h-150 left-1/2 -translate-x-1/2 flex items-center justify-center trns hover:opacity-70 opacity-50"
    >
      <svg
        class="w-full h-auto"
        viewBox="0 0 670 307"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- Your panel shape -->
          <clipPath :id="`platform_${deployment}`">
            <path
              d="M0.5 114.5V76L6.13576 57.5L23.5 0.5H66H188L205.5 8H483.5L504.5 0.5H539L581 42.5V76H565V114.5H581L603.229 163L650.208 265.5L669 306.5H647L616.5 295H551L524 306.5H407.5L381 295H216L195.5 306.5H155.5L137.336 284L117.5 265.5L129.5 258L59 163H39.6536L0.5 114.5Z"
            />
          </clipPath>
        </defs>

        <image
          :href="selectedDeployment[deployment].imgSrc"
          width="670"
          height="307"
          preserveAspectRatio="xMidYMid slice"
          :style="{ clipPath: `url(#platform_${deployment})` }"
        />

        <path
          d="M0.5 114.5V76L6.13576 57.5L23.5 0.5H66H188L205.5 8H483.5L504.5 0.5H539L581 42.5V76H565V114.5H581L603.229 163L650.208 265.5L669 306.5H647L616.5 295H551L524 306.5H407.5L381 295H216L195.5 306.5H155.5L137.336 284L117.5 265.5L129.5 258L59 163H39.6536L0.5 114.5Z"
          fill="none"
          stroke="var(--kryos-text-high)"
          stroke-width="4"
        />
      </svg>
    </Absolute>
  </div>
</template>
