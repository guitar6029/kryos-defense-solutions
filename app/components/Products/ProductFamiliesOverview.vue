<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import Text3D from "../Text/Text3D.vue";
import baseCatalog from "~/assets/img/catalog_base.jpg";
import KryosSectionHeader from "../KryosSectionHeader.vue";
</script>

<template>
  <section class="flex flex-col min-h-screen relative overflow-hidden">
    <KryosSectionHeader right-text="PLATFORM FAMILIES" />
    <h2 class="section-title">Platform Families</h2>

    <!-- <Absolute extra-class="top-20 right-20 w-200 opacity-30 -z-1">
      <svg
        class="w-full h-auto"
        viewBox="0 0 1967 3461"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="kryos_panel_1">
            <path
              d="M1816 191V502V953L1966.5 1284V2969L1595 3460.5H311.5L0.5 3169.5V502L392 0.5H1354.5L1816 191Z"
            />
          </clipPath>
        </defs>

        <image
          :href="baseCatalog"
          width="1967"
          height="3461"
          preserveAspectRatio="xMidYMid slice"
          clip-path="url(#kryos_panel_1)"
        />

        <path
          d="M1816 191V502V953L1966.5 1284V2969L1595 3460.5H311.5L0.5 3169.5V502L392 0.5H1354.5L1816 191Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->

    <!-- <Absolute extra-class="top-20 left-20 w-200 opacity-50 -z-1">
      <svg
        class="w-full h-auto"
        viewBox="0 0 1967 3461"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1816 191V502V953L1966.5 1284V2969L1595 3460.5H311.5L0.5 3169.5V502L392 0.5H1354.5L1816 191Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->
    <!-- <Absolute extra-class="top-1/2 left-20 w-200 opacity-50 -z-1">
      <svg
        class="w-full h-auto"
        viewBox="0 0 1872 1476"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.5 384.5L201 295.5V134L323.5 0.5H590.5L724 106H1191.5L1247.5 61.5H1587L1765 162V496H1826.5L1871 752V1074.5L1720.5 1175V1397.5L1514.5 1475.5H1247.5L1086 1431H624L512.5 1475.5H100.5L0.5 1397.5V1113.5L100.5 1002.5V629.5V462.5H28.5V384.5Z"
          stroke="black"
        />
      </svg>
    </Absolute> -->
    <!-- <Absolute extra-class="top-1/2 left-20 w-200 opacity-50 -z-1">
      <svg
        class="w-full h-auto"
        viewBox="0 0 1354 2022"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1058 0.5L1180.5 100.5V256.5H1280.5V813L1247.5 885.5V1397.5L1353 1509V1887.5L1247.5 1976.5H573.5L512.5 2021H167.5L45 1843V1586.5L0.5 1509V885.5L111.5 774V256.5L45 206.5V61.5H512.5L573.5 0.5H1058Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->

    <!-- <Absolute
      extra-class="bottom-0 left-10 -translate-x-1/2 w-150 opacity -z-1"
    >
      <svg
        class="w-full h-auto"
        viewBox="0 0 1872 1476"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.5 384.5L201 295.5V134L323.5 0.5H590.5L724 106H1191.5L1247.5 61.5H1587L1765 162V496H1826.5L1871 752V1074.5L1720.5 1175V1397.5L1514.5 1475.5H1247.5L1086 1431H624L512.5 1475.5H100.5L0.5 1397.5V1113.5L100.5 1002.5V629.5V462.5H28.5V384.5Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->

    <!-- <Absolute extra-class="top-10 right-20 opacity-50 w-100 -z-1 rotate-180">
      <svg
        class="w-full h-auto"
        viewBox="0 0 547 1722"
        fill="var(--kryos-warn)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M268 106.318L62 0.817871V289.818L0.5 340.318V835.318L62 874.318V1258.82H0.5V1353.32L234.5 1570.32V1653.82L312.5 1720.82H546L457 1509.32L234.5 1308.82V573.818L268 507.318V106.318Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->

    <!-- <Absolute extra-class="top-1/2 left-20 opacity-20 w-100 -z-1">
      <svg
        class="w-full h-auto"
        viewBox="0 0 547 1722"
        fill="var(--kryos-warn)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M268 106.318L62 0.817871V289.818L0.5 340.318V835.318L62 874.318V1258.82H0.5V1353.32L234.5 1570.32V1653.82L312.5 1720.82H546L457 1509.32L234.5 1308.82V573.818L268 507.318V106.318Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->

    <!-- <Absolute extra-class="bottom-10 right-20 opacity-50 w-300 -z-1">
      <svg
        class="w-full h-auto"
        viewBox="0 0 2011 2595"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRation="none"
      >
        <path
          d="M1186 0.5H1458.5H1893V257L2010 435V947L1893 1119.5V1865.5L1948.5 1921V2594.5H1726L1559 2550H857.5L785 2594.5H601.5L429 2550L312 2316.5V2055H662.5L1158 1821V1459L1119 1348H479L429 1392.5H312L61.5 1181V557.5L0.5 468.5V301.5L195 56.5H1019L1186 0.5Z"
          stroke="var(--kryos-circuit-path)"
          stroke-width="2"
        />
      </svg>
    </Absolute> -->

    <div class="flex flex-col items-center gap-12 relative">
      <div class="flex flex-col items-center xl:flex-row gap-12">
        <div class="sm:w-100 md:w-150 xl:w-200 relative trns hover:scale-102">
          <Absolute extra-class="bottom-10 left-1/2 -translate-x-1/2">
            <Text3D text="Ground Platforms" />
          </Absolute>

          <!-- the back svg , little bit larger -->
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
