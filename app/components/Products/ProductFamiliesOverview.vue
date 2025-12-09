<script lang="ts" setup>
import KryosArerial from "~/assets/img/kryos-aerial.jpg";
import KryosGround from "~/assets/img/kryos-ground.jpg";
import KryosLab from "~/assets/img/kryos-system-lab.jpg";
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import Text3D from "../Text/Text3D.vue";
import Divider from "../Divider.vue";
</script>

<template>
  <section class="flex flex-col min-h-screen gap-12">
    <Divider right-text="PLATFORM FAMILIES" />
    <h2 class="section-title">Platform Families</h2>

    <div class="flex flex-col items-center gap-12 relative">
      <Absolute extra-class="top-20 -left-20 w-200 -z-1">
        <KryosPanel />
      </Absolute>

      <Absolute extra-class="top-0 -right-50 w-200 -z-1 opacity-50">
        <KryosPanel :option="7" />
      </Absolute>

      <Absolute extra-class="top-300 left-20 w-200 -z-1 opacity-50">
        <KryosPanel :option="14" />
      </Absolute>

      <Absolute extra-class="top-500 -left-20 w-200 -z-1">
        <KryosPanel />
      </Absolute>

      <Absolute extra-class="top-500 -right-50 w-200 -z-1 opacity-50">
        <KryosPanel :option="7" />
      </Absolute>

      <div class="flex flex-col items-center xl:flex-row gap-2">
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
              href="~/assets/img/kryos-ground.jpg"
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
        <Absolute extra-class="bottom-10 left-20 -z-1 flex flex-row gap-2">
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

      <div class="flex items-center xl:flex-row flex-col-reverse gap-2">
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
              href="assets/img/kryos-aerial.jpg"
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
        <Absolute extra-class="bottom-10 right-20 -z-1 flex flex-row gap-2">
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

      <div class="flex flex-col items-center xl:flex-row gap-2">
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
                <clipPath id="kryosLab">
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
              href="~/assets/img/kryos-system-lab.jpg"
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
        <Absolute extra-class="bottom-10 left-20 -z-1 flex flex-row gap-2">
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

      <Absolute extra-class="bottom-10 -right-50 w-200 -z-1 opacity-50">
        <KryosPanel :option="7" />
      </Absolute>

      <div class="flex flex-row items-center justify-center gap-2">
        <p
          class="relative bottom-0 text-(--kryos-warn) text-4xl max-w-2xl text-center mt-10"
        >
          Note: Certain platform configurations are restricted and available
          only under classified procurement channels.
        </p>
      </div>
    </div>
  </section>
</template>
