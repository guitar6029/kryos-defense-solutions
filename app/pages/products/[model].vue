<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosPanel from "~/components/Panels/KryosPanel.vue";
import FullViewProduct from "~/components/Products/FullViewProduct.vue";
import SummaryProduct from "~/components/Products/SummaryProduct.vue";
import VideoFullPanel from "~/components/Products/VideoFullPanel.vue";
import ImageGallery from "~/components/Products/ImageGallery.vue";

const route = useRoute();
let timeoutId: number | null = null;

onMounted(() => {
  timeoutId = window.setTimeout(() => {
    isLoading.value = false;
  }, 4000);
});

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
});

const isLoading = ref(true);

type KryosSlug = "mk-1" | "ex-1";
type KryosModel = "mk1" | "ex1";

type SpecItem = {
  label: string;
  value: string;
};

type ProductConfig = {
  title: string;
  subtitle: string;
  systemArchitecture: {
    heading: string;
    paragraphs: string[];
  };
  specsHeading: string;
  specs: SpecItem[];
};

const model = computed(() => route.params.model as KryosSlug);

const slugToKey: Record<KryosSlug, KryosModel> = {
  "mk-1": "mk1",
  "ex-1": "ex1",
};

const productKey = computed(() => slugToKey[model.value]);

const products: Record<KryosModel, ProductConfig> = {
  mk1: {
    title: "KRYOS MK-I Tactical Platform",
    subtitle:
      "Autonomous six-legged ground platform engineered for dense urban, industrial, and subterranean environments.",
    systemArchitecture: {
      heading: "System Architecture",
      paragraphs: [
        "MK-I units are built on a hardened core chassis with isolated compute, power, and mobility subsystems. Critical functions are distributed across redundant modules, ensuring continued operation under partial damage or signal disruption.",
        "Decision pipelines are designed to preserve operator intent while allowing low-latency autonomous adjustments to terrain, threat posture, and local conditions.",
      ],
    },
    specsHeading: "Core Specifications",
    specs: [
      {
        label: "Configuration",
        value: "Six-legged autonomous ground platform",
      },
      {
        label: "Mobility Envelope",
        value: "Floor, wall, and overhead structural traversal",
      },
      {
        label: "Endurance",
        value: "18-26 hours continuous operation (environment dependent)",
      },
      {
        label: "Sensor Suite",
        value: "Thermal, LIDAR, acoustic, and inertial mapping",
      },
      {
        label: "Communications",
        value: "Encrypted, multi-channel command and telemetry link",
      },
      {
        label: "Payload",
        value: "Two modular hardpoints, configurable per deployment",
      },
    ],
  },
  ex1: {
    title: "KRYOS EX-1 Tactical ExoFrame",
    subtitle:
      "Humanoid powered exoskeleton platform for assisted lift, hazardous-material handling, and tactical support in constrained environments.",
    systemArchitecture: {
      heading: "System Architecture",
      paragraphs: [
        "EX-1 frames are built around a reinforced exoskeletal spine with distributed actuation across major load-bearing joints. Power and compute subsystems are compartmentalized to preserve motion fidelity under partial system degradation.",
        "Control pipelines blend operator motion input with amplification and constraint layers, maintaining human intent while enforcing safety limits and tactical posture.",
      ],
    },
    specsHeading: "Core Specifications",
    specs: [
      {
        label: "Configuration",
        value: "Humanoid powered exoskeleton platform",
      },
      {
        label: "Primary Role",
        value:
          "Assisted lift, hazardous-material handling, and tactical support in constrained environments",
      },
      {
        label: "Augmentation Channel",
        value:
          "Full-body mechanical linkage with spine, shoulder, and leg actuation",
      },
      {
        label: "Control Model",
        value:
          "Operator-in-the-loop with motion amplification and safety constraint layers",
      },
      {
        label: "Compatibility",
        value:
          "Shares compute, power, and telemetry stack with Kryos MK-series ground platforms",
      },
    ],
  },
};

const currentProduct = computed(() => products[productKey.value]);
</script>

<template>
  <div
    v-if="isLoading"
    class="relative flex flex-col items-center justify-center gap-2 min-h-screen"
  >
    <Absolute extra-class="top-0 left-0 w-200 -z-1">
      <KryosPanel :option="3" :stroke-width="0.5" />
    </Absolute>
    <Absolute extra-class="bottom-10 right-0 w-200 -z-1">
      <KryosPanel :option="3" :stroke-width="0.5" />
    </Absolute>
    <div class="text-8xl font-orbitron">LOADING...</div>
  </div>
  <div v-else class="flex flex-col gap-16 relative min-h-screen">
    <!-- Title / intro -->
    <section
      class="flex flex-col items-center justify-center gap-4 mt-20 min-h-[50vh] relative p-4"
    >
      <Absolute extra-class="top-0 left-0 w-full -z-1">
        <KryosPanel :option="13" :stroke-width="0.5" />
      </Absolute>
      <Absolute extra-class="top-0 right-0 w-200 -z-2 rotate-90">
        <KryosPanel :option="3" :stroke-width="1" />
      </Absolute>
      <Absolute extra-class="top-0 -left-100 w-200 -z-2 rotate-90">
        <KryosPanel :option="3" :stroke-width="1" />
      </Absolute>
      <h1 class="section-title">
        {{ currentProduct.title }}
      </h1>
      <p class="text-4xl max-w-4xl text-center">
        {{ currentProduct.subtitle }}
      </p>
    </section>

    <!-- Hero + summary -->
    <section class="flex flex-col items-center gap-10 relative">
      <FullViewProduct :model="productKey" :has-title="false" />
      <SummaryProduct :model="productKey" />
      <ImageGallery :model="productKey" />
    </section>

    <!-- System Architecture -->
    <section class="flex flex-col items-center gap-4 relative">
      <Absolute extra-class="bottom-50 -left-100 w-200 -z-2 rotate-90">
        <KryosPanel :option="4" :stroke-width="1" />
      </Absolute>

      <Absolute extra-class="bottom-50 -right-100 w-200 -z-2 rotate-90">
        <KryosPanel :option="4" :stroke-width="1" />
      </Absolute>

      <h3 class="text-6xl">
        {{ currentProduct.systemArchitecture.heading }}
      </h3>
      <p
        v-for="(paragraph, idx) in currentProduct.systemArchitecture.paragraphs"
        :key="idx"
        class="max-w-4xl text-2xl"
      >
        {{ paragraph }}
      </p>
    </section>

    <!-- Core Specs with panels -->
    <section
      class="flex flex-col justify-center gap-4 mb-50 relative w-full min-h-[70vh]"
    >
      <Absolute extra-class="absolute bottom-0 left-0 w-100 -z-1">
        <KryosPanel :option="6" />
      </Absolute>
      <Absolute extra-class="absolute bottom-0 right-0 w-100 -z-1 rotate-45">
        <KryosPanel :option="6" />
      </Absolute>
      <Absolute extra-class="absolute top-10 -right-10 w-150 -z-1 rotate-45">
        <KryosPanel :option="8" />
      </Absolute>
      <Absolute extra-class="absolute top-0 left-0 w-200 -z-1">
        <KryosPanel :option="8" />
      </Absolute>

      <h3 class="text-6xl text-center">
        {{ currentProduct.specsHeading }}
      </h3>

      <ul class="flex flex-col items-center gap-4 text-4xl">
        <li v-for="spec in currentProduct.specs" :key="spec.label">
          <span class="font-bold">{{ spec.label }}:</span>
          {{ " " + spec.value }}
        </li>
      </ul>
    </section>

    <!-- Video teaser -->
    <section class="flex flex-col items-center gap-10 mb-50">
      <VideoFullPanel :model="productKey" />
    </section>
  </div>
</template>
