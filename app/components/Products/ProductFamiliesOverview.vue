<script lang="ts" setup>
import KryosArerial from "~/assets/img/kryos-aerial.jpg";
import KryosGround from "~/assets/img/kryos-ground.jpg";
import KryosLab from "~/assets/img/kryos-system-lab.jpg";
import Absolute from "../Wrapper/Absolute.vue";
import KryosPanel from "../Panels/KryosPanel.vue";
import Text3D from "../Text/Text3D.vue";
</script>

<template>
  <section class="flex flex-col items-center min-h-screen gap-12 mb-50">
    <h2 class="section-title">Platform Families</h2>

    <div class="flex flex-col gap-12 relative">
      <div class="flex flex-col items-center xl:flex-row gap-2">
        <div class="sm:w-200 md:250 xl:w-300 relative trns hover:scale-102">
          <Absolute extra-class="bottom-50 left-1/2 -translate-x-1/2">
            <Text3D text="Ground Platforms" />
          </Absolute>

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
              :href="KryosGround"
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

        <div class="flex items-center justify-center p-4">
          <p class="max-w-4xl text-4xl xl:text-6xl italic">
            Autonomous, multi-terrain units for patrol, interdiction, and close
            asset protection.
          </p>
        </div>
      </div>

      <div class="flex items-center xl:flex-row flex-col-reverse gap-2">
        <div class="flex items-center justify-center p-4">
          <p class="max-w-4xl text-4xl xl:text-6xl italic">
            Lightweight, persistent-surveillance drones designed for layered
            situational awareness.
          </p>
        </div>

        <div class="sm:w-200 md:250 xl:w-300 relative trns hover:scale-102">
          <Absolute extra-class="top-40 left-1/2 -translate-x-1/2 z-10">
            <Text3D text="Aerial Recon Platforms" />
          </Absolute>

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
              :href="KryosArerial"
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

      <div class="flex flex-col items-center xl:flex-row gap-2">
        <div class="sm:w-200 md:250 xl:w-300 relative trns hover:scale-102">
          <Absolute
            extra-class="bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-2"
          >
            <Text3D text="Integration Systems" />
          </Absolute>

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
              :href="KryosLab"
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

        <div class="flex items-center justify-center p-4">
          <p class="max-w-4xl text-4xl xl:text-6xl italic">
            Embedded systems for transit networks, industrial facilities, and
            critical infrastructure nodes.
          </p>
        </div>
      </div>

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
