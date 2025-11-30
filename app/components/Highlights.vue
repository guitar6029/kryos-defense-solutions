<script lang="ts" setup>
import Absolute from "./Wrapper/Absolute.vue";
import KryosPanel from "./Panels/KryosPanel.vue";
</script>
<template>
  <div
    class="flex flex-col items-center justify-center gap-2 h-screen relative"
  >
    <Absolute extra-class="bottom-10 left-0 w-200  opacity-50 -z-1">
      <KryosPanel :stroke-width="1" :option="6" />
    </Absolute>

    <Absolute
      extra-class="bottom-120 -right-40 w-250 opacity-50 -z-1 rotate-270"
    >
      <KryosPanel :stroke-width="2" :option="3" />
    </Absolute>

    <h2 class="section-title">Recent Announcements</h2>
    <ul
      class="text-4xl font-bold flex flex-col items-center gap-4 text-(--kryos-text-high)"
    >
      <li>
        Kryos MK-I enters limited deployment with Tier-1 security partners.
      </li>
      <li>
        Kryos Defense Solutions announces expansion of subterranean testing
        facilities.
      </li>
      <li>
        Joint research initiative launched with undisclosed government entity.
      </li>
    </ul>
  </div>
</template>
