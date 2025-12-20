<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import Text3D from "../Text/Text3D.vue";
import circuit1 from "~/assets/img/kryos_circuit_1.jpg";
import circuit2 from "~/assets/img/kryos_circuit_2.jpg";
import circuit3 from "~/assets/img/kryos_circuit_3.jpg";
import KryosSectionHeader from "../KryosSectionHeader.vue";
import KryosFrame from "../Panels/KryosFrame.vue";

const kryosFrameSvgFrames = [
  {
    viewBox: "0 0 1967 3461",
    d: "M1816 191V502V953L1966.5 1284V2969L1595 3460.5H311.5L0.5 3169.5V502L392 0.5H1354.5L1816 191Z",
  },
  {
    viewBox: "0 0 2078 2150",
    d: "M1832 89.5L2038 318V401.5L2077 507V808L1865.5 936V1214L1960 1386.5V1609.5L1598 1887.5H1091.5L780 2149.5H245.5L0.5 2015.5V1704L134 1581.5V975L0.5 808V551.5L351.5 318V89.5L563 0.5H1431L1548 89.5H1832Z",
  },
  {
    viewBox: "0 0 1988 2144",
    d: "M557 440L757.5 317.5L880 306.5L1002.5 145H1425.5L1525.5 0.5H1893V368L1987.5 468V674L1792.5 874.5V1369.5L1893 1481V1887.5L1570 2032H907.5L690.5 2143.5H267.5L0.5 2032V1614.5L111.5 1369.5L267.5 1236L323 1292L557 1102.5L507 1036L718.5 874.5L557 702V440Z",
  },
  {
    viewBox: "0 0 2439 3697",
    d: "M696.5 0.5H100.5V262L390 150.5L551.5 317.5H935.5L885.5 579.5H1587L1609 535L1854 607L1910 1041.5L1776 1158V1965.5L2038 2021V2360.5L1854 2583.5V2889.5L1704 2923V3123L1292 3229L1214 3167.5L757.5 3312.5L702 3474H323.5V3268L423.5 3167.5V2984H0.5V3401.5L223 3696.5H1114L2149 3268V2700L2438.5 2466.5V1665L2310.5 1609V674L1982 67H824.5L696.5 0.5Z",
  },
] as const;
</script>

<template>
  <section class="flex flex-col min-h-screen relative overflow-hidden">
    <KryosSectionHeader right-text="PLATFORM FAMILIES" />
    <div class="flex flex-col items-center gap-12 relative">
      <h2 class="section-title">Platform Families</h2>
      <div class="flex flex-col items-center xl:flex-row gap-12">
        <div class="sm:w-100 md:w-150 xl:w-200 relative trns hover:scale-102">
          <Absolute extra-class="bottom-10 left-1/2 -translate-x-1/2">
            <Text3D text="Ground Platforms" />
          </Absolute>

          <KryosFrame
            absolute-extra-class="-top-10 left-0 w-150 opacity-50 -z-1"
            :svg-view-box="kryosFrameSvgFrames[0]?.viewBox"
            :svg-path="kryosFrameSvgFrames[0].d"
            :img-src="circuit1"
          />

          <div class="absolute inset-0 -z-10 scale-105 translate-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 422 269"
              class="w-full h-auto"
            >
              <path
                d="M0.5 64.0562L74.8472 9.22875H286.159L306.551 0.5H369.349L421.5 39.9158V211.763L330.371 268.5H0.5V64.0562Z"
                fill="none"
                stroke="var(--kryos-warn)"
                stroke-width="2"
              />
            </svg>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 422 269"
            class="w-full h-auto"
          >
            <defs>
              <!-- Your panel shape -->
              <clipPath id="kryosPanel">
                <path
                  d="M0.5 64.0562L74.8472 9.22875H286.159L306.551 0.5H369.349L421.5 39.9158V211.763L330.371 268.5H0.5V64.0562Z"
                />
              </clipPath>
            </defs>

            <!-- Image clipped by that shape -->
            <image
              href="~/assets/img/kryos_ground.jpg"
              width="422"
              height="269"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#kryosPanel)"
            />

            <!-- Optional outline stroke on top -->
            <path
              d="M0.5 64.0562L74.8472 9.22875H286.159L306.551 0.5H369.349L421.5 39.9158V211.763L330.371 268.5H0.5V64.0562Z"
              fill="none"
              stroke="var(--kryos-accent)"
              stroke-width="2"
            />
          </svg>
        </div>

        <div class="flex items-center justify-center p-4 z-12">
          <p class="max-w-4xl text-2xl xl:text-4xl italic font-bold">
            Autonomous, multi-terrain units for patrol, interdiction, and close
            asset protection.
          </p>
        </div>
      </div>

      <div class="w-full h-25 relative">
        <Absolute
          extra-class="bottom-10 left-20 -z-1 flex flex-row gap-2 animate-move-right-alt"
        >
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-100"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-200"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-300"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-400"
          ></div>
        </Absolute>
      </div>

      <div class="flex items-center xl:flex-row flex-col-reverse gap-12">
        <div class="flex items-center justify-center p-4 z-12">
          <p class="max-w-4xl text-2xl xl:text-4xl italic font-bold">
            Lightweight, persistent-surveillance drones designed for layered
            situational awareness.
          </p>
        </div>

        <div class="sm:w-100 md:w-150 xl:w-200 relative trns hover:scale-102">
          <Absolute extra-class="top-10 left-1/2 -translate-x-1/2 z-10">
            <Text3D text="Aerial Recon Platforms" />
          </Absolute>

          <KryosFrame
            absolute-extra-class="-bottom-15 -right-40 w-250 opacity-50 -z-2"
            :svg-view-box="kryosFrameSvgFrames[1]?.viewBox"
            :svg-path="kryosFrameSvgFrames[1].d"
            :img-src="circuit2"
            :svg-stroke-width="4"
          />

          <div class="absolute inset-0 -z-10 scale-105 translate-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-auto"
              viewBox="0 0 558 372"
              fill="none"
            >
              <path
                d="M0.59082 199.026L47.0908 35.0257L343.591 0.525719L422.091 84.0257L556.591 187.026L498.091 334.026L422.091 370.526H196.591L115.591 260.526L0.59082 199.026Z"
                fill="none"
                stroke="var( --kryos-warn)"
                stroke-width="2"
              />
            </svg>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-auto"
            viewBox="0 0 558 372"
            fill="none"
          >
            <defs>
              <!-- Your panel shape -->
              <clipPath id="kryosAerial">
                <path
                  d="M0.59082 199.026L47.0908 35.0257L343.591 0.525719L422.091 84.0257L556.591 187.026L498.091 334.026L422.091 370.526H196.591L115.591 260.526L0.59082 199.026Z"
                />
              </clipPath>
            </defs>

            <image
              href="assets/img/kryos_aerial.jpg"
              width="558"
              height="372"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#kryosAerial)"
            />

            <path
              d="M0.59082 199.026L47.0908 35.0257L343.591 0.525719L422.091 84.0257L556.591 187.026L498.091 334.026L422.091 370.526H196.591L115.591 260.526L0.59082 199.026Z"
              fill="none"
              stroke="var(--kryos-accent)"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>

      <div class="w-full h-25 relative">
        <Absolute
          extra-class="bottom-10 right-20 -z-1 flex flex-row gap-2 animate-move-left-alt"
        >
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-100"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-200"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-300"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-400"
          ></div>
        </Absolute>
      </div>

      <div class="flex flex-col items-center xl:flex-row gap-12">
        <div class="sm:w-100 md:w-150 xl:w-200 relative trns hover:scale-102">
          <Absolute
            extra-class="bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-2"
          >
            <Text3D text="Integration Systems" />
          </Absolute>

          <KryosFrame
            absolute-extra-class="-bottom-10 -left-20 w-250 opacity-50 -z-3"
            :svg-view-box="kryosFrameSvgFrames[2]?.viewBox"
            :svg-path="kryosFrameSvgFrames[2].d"
            :img-src="circuit3"
            :svg-stroke-width="4"
          />

          <div class="absolute inset-0 -z-10 scale-105 translate-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-auto"
              viewBox="0 0 536 509"
              fill="none"
            >
              <defs>
                <clipPath>
                  <path
                    d="M160.233 113.579L373.233 0.579285L490.733 76.5793L534.733 422.079L321.733 508.079L0.733398 466.079L160.233 113.579Z"
                  />
                </clipPath>
              </defs>

              <path
                d="M160.233 113.579L373.233 0.579285L490.733 76.5793L534.733 422.079L321.733 508.079L0.733398 466.079L160.233 113.579Z"
                fill="none"
                stroke="var(--kryos-warn)"
                stroke-width="2"
              />
            </svg>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-auto"
            viewBox="0 0 536 509"
            fill="none"
          >
            <defs>
              <clipPath id="kryosLab">
                <path
                  d="M160.233 113.579L373.233 0.579285L490.733 76.5793L534.733 422.079L321.733 508.079L0.733398 466.079L160.233 113.579Z"
                />
              </clipPath>
            </defs>

            <image
              href="~/assets/img/kryos_system_lab.jpg"
              width="536"
              height="509"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#kryosLab)"
            />
            <path
              d="M160.233 113.579L373.233 0.579285L490.733 76.5793L534.733 422.079L321.733 508.079L0.733398 466.079L160.233 113.579Z"
              fill="none"
              stroke="var(--kryos-accent)"
              stroke-width="2"
            />
          </svg>
        </div>

        <div class="flex items-center w-fit justify-center p-4 z-15">
          <p class="max-w-4xl text-2xl xl:text-4xl italic font-bold">
            Embedded systems for transit networks, industrial facilities, and
            critical infrastructure nodes.
          </p>
        </div>
      </div>

      <div class="w-full h-25 relative">
        <Absolute
          extra-class="bottom-10 left-20 -z-1 flex flex-row gap-2 animate-move-right-alt"
        >
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-100"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-200"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-300"
          ></div>
          <div
            class="w-6 h-6 bg-(--kryos-bg-alt) border-neutral-600 border delay-400"
          ></div>
        </Absolute>

        <!-- <Absolute
          extra-class="left-1/2 -translate-x-1/2 bottom-1/2 w-200 -z-1 opacoty-50"
        >
          <svg
            class="w-full h-auto"
            viewBox="0 0 269 296"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.5 5.97534L211.5 76.4753L236.5 294.975M25 37.9753V188.975L206 264.975M46.5 59.4753V173.475L77.5 187.9M219.5 253.975L77.5 187.9M69 0.475342L230.5 59.4753L247.5 253.975M104.5 0.475342L219.5 37.9753M260 240.475L247.5 91.9753M10.5 76.4753V157.975M46.5 219.475L164 264.975M69 47.9753L104.5 61.1014M188 91.9753L104.5 61.1014M0.5 112.975V138.475M156 5.97534L188 15.9753M263 134.475L268.5 198.975M77.5 187.9V101.975L131.5 121.975V180.975L188 208.975V121.975M104.5 61.1014V85.9753L156 101.975"
              stroke="var(--kryos-accent)"
              stroke-width=".5"
            />
          </svg>
        </Absolute> -->
      </div>

      <div class="flex flex-row items-center justify-center gap-2">
        <p
          class="relative bottom-10 max-w-2xl text-center mt-10 kryos-text kryos-bracket"
        >
          Certain platform configurations are restricted and available only
          under classified procurement channels.
        </p>
      </div>
    </div>
  </section>
</template>
