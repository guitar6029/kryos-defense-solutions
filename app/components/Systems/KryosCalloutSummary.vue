<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
</script>
<template>
  <Absolute
    extra-class="hidden md:block top-0 left-[clamp(1rem,4vw,10rem)] flex flex-col gap-2 w-100 items-center justify-center"
  >
    <div class="relative flex flex-col gap-1 z-1 max-w-2xl top-10">
      <div class="absolute inset-0">
        <svg
          class="w-full h-auto"
          viewBox="0 0 700 427"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0.5 426.5L27.7487 386.256V189.683L0.5 157.952V47L71.25 0.5H210.25L268.75 47H434.75L452.75 24.5H699.25"
            stroke="var(--kryos-accent)"
            stroke-width="6"
          />
        </svg>
      </div>
      <div class="relative z-10 top-8 left-8">
        <h2 class="model-title">[MK-I Tactical Platform]</h2>
        <p>
          Autonomous six-legged ground platform engineered for dense urban,
          industrial, and subterranean environments.
        </p>
      </div>
    </div>
  </Absolute>
</template>

<style scoped>
.model-title {
  font-family: "Orbitron", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
