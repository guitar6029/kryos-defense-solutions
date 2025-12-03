<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
import CompactAerialDrone from "~/assets/img/compact_aerial_drone_for_mapping.png";
import SpinalAug from "~/assets/img/cybernetic_spinal_augmentation.jpg";
import EmergencyHelmet from "~/assets/img/emergency_response_helmet.png";
import ContructionDrone from "~/assets/img/exoskeleton_for_construction.png";
import Helmet from "~/assets/img/reconnaissance_helmet.png";
import MedicalDrone from "~/assets/img/small_floating_medical_drone.jpg";
import Tablet from "~/assets/img/tablet.jpg";
import MK1 from "~/assets/img/mk-i-no-bg.png";
</script>

<template>
  <section
    class="flex flex-col relative items-center lg:flex-row lg:justify-around gap-10 min-h-screen"
  >
    <div class="perspective-distant ">
      <div class="h-125 transform-3d transform-[rotateY(35deg)] relative">
        <div
          class="absolute w-200 h-170 transform-[translateZ(100px)] bg-(--kryos-bg-alt) trns hover:bg-(--kryos-bg) shadow-xl shadow-gray-800"
        >
          <h1 class="absolute section-title">Kryos Platform Catalog</h1>
        </div>

        <div
          class="w-100 absolute h-full transform-[translateX(30px)_translateZ(-140px)] bg-(--kryos-bg-alt) trns hover:bg-(--kryos-bg) shadow-xl shadow-gray-800"
        >
          <span class="absolute right-0 font-orbitron text-4xl">MK1</span>
          <img :src="MK1" alt="MK1" class="object-contain w-full h-full" />
        </div>

        <div
          class="w-100 absolute h-full transform-[translateX(30px)_translateZ(-460px)] bg-(--kryos-bg-alt) trns hover:bg-(--kryos-bg) shadow-xl shadow-gray-800"
        >
          <span class="absolute right-0 font-orbitron text-4xl"
            >Kryos EX-Frame Recon Helmet</span
          >
          <img
            :src="Helmet"
            alt="Kryos EX-Frame Recon Helmet"
            class="object-contain w-full h-full"
          />
        </div>
        <div
          class="w-100 absolute h-full transform-[translateX(30px)_translateZ(-660px)] bg-(--kryos-bg-alt) trns hover:bg-(--kryos-bg) shadow-xl shadow-gray-800"
        >
          <span class="absolute right-0 font-orbitron text-4xl"
            >Exoskeleton Construction</span
          >
          <img
            :src="ContructionDrone"
            alt="Contruction Drone"
            class="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>

    <div
      class="h-125 relative top-20 flex flex-col gap-2 border p-4 border-r-12"
    >
      <div class="absolute bottom-10 right-10 rotate-90 origin-bottom-right">
        <span class="font-bold text-4xl font-orbitorn uppercase">Kryos</span>
      </div>

      <p class="text-4xl max-w-2xl">
        Kryos Defense Solutions develops autonomous platforms engineered for
        long-duration deployment in high-risk, high-value environments. Each
        system is built on a shared core architecture, with configurations
        tailored to specific operational demands.
      </p>
      <p class="text-4xl max-w-2xl">
        This catalog summarizes the platforms currently available for
        procurement, starting with our flagship ground unit.
      </p>
    </div>

    <!-- <h1 class="section-title">Kryos Platform Catalog</h1> -->
    <!-- <p class="text-2xl max-w-2xl">
      Kryos Defense Solutions develops autonomous platforms engineered for
      long-duration deployment in high-risk, high-value environments. Each
      system is built on a shared core architecture, with configurations
      tailored to specific operational demands.
    </p>
    <p class="text-2xl max-w-2xl">
      This catalog summarizes the platforms currently available for procurement,
      starting with our flagship ground unit.
    </p> -->
  </section>
</template>
