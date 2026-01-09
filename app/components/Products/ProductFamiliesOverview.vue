<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import Text3D from "../Text/Text3D.vue";
import KryosSectionHeader from "../KryosSectionHeader.vue";
import KryosFrame from "../Panels/KryosFrame.vue";
import KryosPanel from "../Panels/KryosPanel.vue";

import circuit1 from "~/assets/img/kryos_circuit_1.jpg";
import circuit2 from "~/assets/img/kryos_circuit_2.jpg";
import circuit3 from "~/assets/img/kryos_circuit_3.jpg";

import groundImg from "~/assets/img/kryos_ground.jpg";
import aerialImg from "~/assets/img/kryos_aerial.jpg";
import labImg from "~/assets/img/kryos_system_lab.jpg";
import type { PlatformConfig } from "~/types/PlatformConfig";

const kryosFrameSvgFrames = [
  {
    viewBox: "0 0 2909 2632",
    d: "M2462.5 85L2555 185L2908.5 339V1046.5L2754.5 1154.5V1900.5L2862.5 1985V2385.5L2670 2524H1500.5L1331.5 2631.5H439.5L262.5 2524H0.5V2162.5L262.5 1939.5V1370L124 1270V631.5L216 531.5V277.5L439.5 0.5H1093L1370 185H1662.5L1801 85H2462.5Z",
  },
  {
    viewBox: "0 0 2078 2150",
    d: "M1832 89.5L2038 318V401.5L2077 507V808L1865.5 936V1214L1960 1386.5V1609.5L1598 1887.5H1091.5L780 2149.5H245.5L0.5 2015.5V1704L134 1581.5V975L0.5 808V551.5L351.5 318V89.5L563 0.5H1431L1548 89.5H1832Z",
  },
  {
    viewBox: "0 0 1988 2144",
    d: "M557 440L757.5 317.5L880 306.5L1002.5 145H1425.5L1525.5 0.5H1893V368L1987.5 468V674L1792.5 874.5V1369.5L1893 1481V1887.5L1570 2032H907.5L690.5 2143.5H267.5L0.5 2032V1614.5L111.5 1369.5L267.5 1236L323 1292L557 1102.5L507 1036L718.5 874.5L557 702V440Z",
  },
] as const;

const platformList: PlatformConfig[] = [
  {
    key: "GROUND",
    title: "Ground Platforms",
    text: "Autonomous, multi-terrain units for patrol, interdiction, and close asset protection.",
    startingPosition: "left",
    panel: {
      viewBox: "0 0 422 269",
      path: "M0.5 64.0562L74.8472 9.22875H286.159L306.551 0.5H369.349L421.5 39.9158V211.763L330.371 268.5H0.5V64.0562Z",
      width: 422,
      height: 269,
      imgSrc: groundImg,
      clipId: "kryosPanelGround",
    },
    circuit: {
      imgSrc: circuit1,
      frameIndex: 0,
      absoluteClass: "-top-20 -left-10 opacity-50 -z-1",
      styleWidth: "clamp(34rem, 35rem, 40rem)",
      strokeWidth: 2,
    },
    captionFrame: {
      viewBox: "0 0 1709 507",
      path: "M0.5 42.5L101.5 0.5H1640.5L1708 42.5V447.5L1640.5 506.5H1299L1265 481H337.5L295.5 506.5H101.5L0.5 447.5V42.5Z",
      strokeColor: "var(--kryos-circuit-path)",
      strokeWidth: 4,
    },
    dx: "300px",
  },
  {
    key: "AERIAL",
    title: "Aerial Recon Platforms",
    text: "Lightweight, persistent-surveillance drones designed for layered situational awareness.",
    startingPosition: "right",
    panel: {
      viewBox: "0 0 558 372",
      path: "M0.59082 199.026L47.0908 35.0257L343.591 0.525719L422.091 84.0257L556.591 187.026L498.091 334.026L422.091 370.526H196.591L115.591 260.526L0.59082 199.026Z",
      width: 558,
      height: 372,
      imgSrc: aerialImg,
      clipId: "kryosPanelAerial",
    },
    circuit: {
      imgSrc: circuit2,
      frameIndex: 1,
      absoluteClass: "-bottom-15 -right-40 opacity-50 -z-2",
      styleWidth: "clamp(34rem, 35rem, 40rem)",
      strokeWidth: 4,
    },
    captionFrame: {
      viewBox: "0 0 1709 507",
      path: "M0.5 42.5L101.5 0.5H1640.5L1708 42.5V447.5L1640.5 506.5H1299L1265 481H337.5L295.5 506.5H101.5L0.5 447.5V42.5Z",
      strokeColor: "var(--kryos-circuit-path)",
      strokeWidth: 4,
    },
    dx: "-300px",
  },
  {
    key: "INTEGRATION",
    title: "Integration Systems",
    text: "Embedded systems for transit networks, industrial facilities, and critical infrastructure nodes.",
    startingPosition: "left",
    panel: {
      viewBox: "0 0 536 509",
      path: "M160.233 113.579L373.233 0.579285L490.733 76.5793L534.733 422.079L321.733 508.079L0.733398 466.079L160.233 113.579Z",
      width: 536,
      height: 509,
      imgSrc: labImg,
      clipId: "kryosPanelIntegration",
    },
    circuit: {
      imgSrc: circuit3,
      frameIndex: 2,
      absoluteClass: "-bottom-10 -left-20 opacity-50 -z-3",
      styleWidth: "clamp(50rem, 52rem, 55rem)",
      strokeWidth: 4,
    },
    captionFrame: {
      viewBox: "0 0 1709 507",
      path: "M0.5 42.5L101.5 0.5H1640.5L1708 42.5V447.5L1640.5 506.5H1299L1265 481H337.5L295.5 506.5H101.5L0.5 447.5V42.5Z",
      strokeColor: "var(--kryos-circuit-path)",
      strokeWidth: 4,
    },
    dx: "300px",
  },
];
</script>

<template>
  <section class="flex flex-col min-h-screen relative overflow-hidden p-4">
    <KryosSectionHeader right-text="PLATFORM FAMILIES" />

    <div class="flex flex-col items-center gap-12 relative">
      <h2 class="section-title">Platform Families</h2>
      <Absolute extra-class="top-0 left-0 w-200 opacity-50 -z-1">
        <KryosPanel :option="6" />
      </Absolute>
      <Absolute extra-class="top-20 right-0 w-200 opacity-50 -z-1 -rotate-180">
        <KryosPanel :option="6" />
      </Absolute>

      <KryosFrame
        absoluteExtraClass="bottom-0 -left-170 w-200 opacity-30 -z-3"
        svg-path="M631 0.5H0.5V2547L1385 2508.5L1570 2393.5V1578L1431.5 1439.5V808.5L1516 593V177.5H831L631 0.5Z"
        svg-view-box="0 0 1571 2548"
        :img-src="circuit1"
      />

      <KryosFrame
        absoluteExtraClass="top-0 -right-170 w-200 opacity-30 -z-3 -rotate-180"
        svg-path="M631 0.5H0.5V2547L1385 2508.5L1570 2393.5V1578L1431.5 1439.5V808.5L1516 593V177.5H831L631 0.5Z"
        svg-view-box="0 0 1571 2548"
        :img-src="circuit1"
      />

      <KryosFrame
        absoluteExtraClass="-bottom-150 -right-170 w-200 opacity-30 -z-3 -rotate-180"
        svg-path="M631 0.5H0.5V2547L1385 2508.5L1570 2393.5V1578L1431.5 1439.5V808.5L1516 593V177.5H831L631 0.5Z"
        svg-view-box="0 0 1571 2548"
        :img-src="circuit1"
      />

      <Absolute extra-class="top-300 left-0 w-200 opacity-50 -z-1 ">
        <KryosPanel :option="6" />
      </Absolute>

      <div
        v-for="p in platformList"
        :key="p.key"
        class="w-full h-screen md:h-fit flex flex-col items-center justify-center"
      >
        <!-- main row -->
        <div
          class="flex flex-col items-center gap-12 xl:gap-16"
          :class="
            p.startingPosition === 'left'
              ? 'xl:flex-row'
              : 'xl:flex-row-reverse'
          "
        >
          <!-- MEDIA CARD -->
          <div class="w-full md:w-150 xl:w-200 relative trns hover:scale-102">
            <Absolute
              :extra-class="
                p.startingPosition === 'left'
                  ? 'bottom-10 left-1/2 -translate-x-1/2'
                  : 'top-10 left-1/2 -translate-x-1/2 z-10'
              "
            >
              <Text3D :text="p.title" />
            </Absolute>

            <KryosFrame
              :absolute-extra-class="p.circuit.absoluteClass"
              :style="{ width: p.circuit.styleWidth }"
              :svg-view-box="kryosFrameSvgFrames[p.circuit.frameIndex]?.viewBox!"
              :svg-path="kryosFrameSvgFrames[p.circuit.frameIndex]!.d"
              :img-src="p.circuit.imgSrc"
              :svg-stroke-width="p.circuit.strokeWidth ?? 2"
            />

            <!-- WARN OUTLINE BACKPLATE -->
            <Absolute class="inset-0 -z-10 scale-105 translate-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :viewBox="p.panel.viewBox"
                class="w-full h-auto"
              >
                <path
                  :d="p.panel.path"
                  fill="none"
                  stroke="var(--kryos-warn)"
                  stroke-width="2"
                />
              </svg>
            </Absolute>

            <!-- CLIPPED IMAGE PANEL -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :viewBox="p.panel.viewBox"
              class="w-full h-auto"
            >
              <defs>
                <clipPath :id="p.panel.clipId">
                  <path :d="p.panel.path" />
                </clipPath>
              </defs>

              <image
                :href="p.panel.imgSrc"
                :width="p.panel.width"
                :height="p.panel.height"
                preserveAspectRatio="xMidYMid slice"
                :clip-path="`url(#${p.panel.clipId})`"
              />

              <path
                :d="p.panel.path"
                fill="none"
                stroke="var(--kryos-accent)"
                stroke-width="2"
              />
            </svg>
          </div>

          <!-- CAPTION -->
          <div class="relative inline-block">
            <div class="relative max-w-2xl px-10 py-8">
              <KryosFrame
                absolute-extra-class="inset-0 pointer-events-none -z-1"
                :svg-path="p.captionFrame.path"
                :svg-view-box="p.captionFrame.viewBox"
                :svg-stroke-color="p.captionFrame.strokeColor"
                :svg-fill-color="p.captionFrame.fillColor ?? 'transparent'"
                :svg-stroke-width="p.captionFrame.strokeWidth"
                svg-class="w-full h-full"
                preserve-aspect-ratio="none"
              />

              <p class="relative z-10 text-4xl font-bold">
                {{ p.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- MOVING SQUARES -->
        <div class="w-full h-25 relative">
          <Absolute
            :extra-class="
              [
                'bottom-10 -z-1 flex flex-row gap-2 animate-move-x',
                p.startingPosition === 'left' ? 'left-20' : 'right-20',
              ].join(' ')
            "
            :style="`--dx: ${p.dx}`"
          >
            <div
              class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border"
            ></div>
            <div
              class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border"
            ></div>
            <div
              class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border"
            ></div>
            <div
              class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border"
            ></div>
          </Absolute>
        </div>
      </div>
    </div>
  </section>
</template>
