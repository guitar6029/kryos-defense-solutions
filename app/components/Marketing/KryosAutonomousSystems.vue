<script setup lang="ts">
const panels = { rails: "/assets/panels/panel-corner-rails.svg", stepped: "/assets/panels/panel-stepped-frame.svg" };
const systems = [
  { code: "01 // AIR", name: "AEROS", text: "Autonomous aerial systems.", image: "/assets/images/drones/kryos-armored-drone.png", alt: "Kryos armored autonomous aerial drone.", variant: "air" },
  { code: "02 // LAND", name: "TERRA", text: "Autonomous ground systems.", image: "/assets/images/land/kryos-armored-reconnaissance-vehicle.png", alt: "Kryos armored autonomous reconnaissance vehicle.", variant: "land" },
  { code: "03 // SEA", name: "ABYSS", text: "Autonomous maritime systems.", image: "/assets/images/sea/kryos-stealth-catamaran-warship.png", alt: "Kryos autonomous stealth catamaran warship.", variant: "sea" },
];
</script>

<template>
  <section class="showcase" aria-labelledby="systems-title">
    <header class="intro">
      <p class="eyebrow">KRYOS // SYSTEMS DIVISION</p>
      <div class="intro-heading"><h2 id="systems-title">AUTONOMOUS SYSTEMS.</h2><p>BUILT FOR AIR, LAND, AND SEA.</p></div>
      <p class="intro-copy">A unified family of autonomous platforms, engineered for operations across every domain.</p>
    </header>
    <div class="systems">
      <article v-for="system in systems" :key="system.name" class="system" :class="`system--${system.variant}`">
        <div class="info"><p class="code">{{ system.code }}</p><div class="title"><h3>{{ system.name }}</h3></div><p>{{ system.text }}</p><span aria-hidden="true">///</span></div>
        <figure class="art"><img :src="panels.rails" alt="" aria-hidden="true" class="rails" /><img :src="panels.stepped" alt="" aria-hidden="true" class="frame" /><img :src="system.image" :alt="system.alt" class="product" loading="lazy" decoding="async" /><figcaption>{{ system.code }} // {{ system.name }}</figcaption></figure>
      </article>
    </div>
  </section>
</template>

<style scoped src="./styles/kryos-autonomous-systems.css"></style>
