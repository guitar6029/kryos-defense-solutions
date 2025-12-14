<script lang="ts" setup>
import { useKryosFleetStore } from "#imports";
import {
  STATUS_BADGE_BASE,
  STATUS_BADGE_CLASS,
} from "~/utils/kryosStatusClasses";
const kryosFleetStore = useKryosFleetStore();
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <!-- status -->
    <div class="flex flex-col gap-1 border border-(--kryos-accent) p-4">
      <h2 class="text-(--kryos-accent-bright) text-[.6rem]">[status]</h2>
      <div class="flex items-center gap-2">
        <span
          :class="[
            'uppercase text-[.8rem]',
            STATUS_BADGE_BASE,
            STATUS_BADGE_CLASS['ONLINE'],
          ]"
          >online - {{ kryosFleetStore.stats.totalOnline }}</span
        >
        <span
          :class="[
            'uppercase text-[.8rem]',
            STATUS_BADGE_BASE,
            STATUS_BADGE_CLASS['OFFLINE'],
          ]"
          >offline - {{ kryosFleetStore.stats.totalOffline }}</span
        >
        <span
          :class="[
            'uppercase text-[.8rem]',
            STATUS_BADGE_BASE,
            STATUS_BADGE_CLASS['MAINTENANCE'],
          ]"
          >maintenance - {{ kryosFleetStore.stats.totalMaintenance }}
        </span>
      </div>
    </div>
    <!-- end status -->

    <!-- power -->
    <div class="flex flex-col gap-1 border border-(--kryos-accent) p-4">
      <h2 class="text-(--kryos-accent-bright) text-[.6rem]">[power]</h2>
      <div class="flex items-center gap-2">
        <span :class="[STATUS_BADGE_BASE]"
          ><Icon name="icomoon-free:power" /> avg power -
          {{ kryosFleetStore.stats.avgPower.toFixed(2) }}</span
        >
        <span :class="[STATUS_BADGE_BASE]"
          >active power -
          {{ kryosFleetStore.stats.avgPowerOnline.toFixed(2) }}</span
        >
      </div>
    </div>
    <!-- end power -->
  </div>
</template>
