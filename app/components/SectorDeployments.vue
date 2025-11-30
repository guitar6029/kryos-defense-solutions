<script lang="ts" setup>
import Absolute from './Wrapper/Absolute.vue';
import KryosCard from './Cards/KryosCard.vue';
</script>
<template>
     <div
      class="flex flex-col min-h-screen items-center justify-center gap-2 relative"
    >
      <Absolute
        extra-class="bottom-10 -right-20 sm:w-100 lg:w-400  opacity-50 -z-1"
      >
        <KryosPanel :option="7" :stroke-width="1" />
      </Absolute>

      <h2 class="section-title">Deployed Across Critical Sectors</h2>
      <div class="flex flex-wrap items-center justify-center gap-6">
        <KryosCard
          title="Goverment & Defense"
          text="Perimeter defense, border control, urban operations support."
        />
        <KryosCard
          title="Corporate Security"
          text="High-value campus protection, data center security, logistics hubs."
        />
        <KryosCard
          title="Industrial & Energy"
          text="Refineries, mining facilities, off-shore platforms, and hazardous
        environments."
        />
        <KryosCard
          title="Research & Black-Site Operations"
          text="Compartmentalized deployments under classified directives."
        />
      </div>
    </div>
</template>