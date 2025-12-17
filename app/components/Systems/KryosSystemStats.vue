<script lang="ts" setup>
import { useKryosFleetStore } from "#imports";
import {
  STATUS_BADGE_BASE,
  STATUS_BADGE_CLASS,
} from "~/utils/kryosStatusClasses";
import KryosLabel from "../Labels/KryosLabel.vue";
const kryosFleetStore = useKryosFleetStore();
</script>

<template>
  <div class="flex flex-col md:flex-row items-center gap-2 p-4">
    <!-- status -->
    <div class="flex flex-col gap-1 border border-(--kryos-accent) p-6 w-full md:max-w-100">
      <KryosLabel labelText="status" />
      <div class="flex items-center gap-2">
        <Icon name="pajamas:status-health" />
        <span
          :class="[
            'uppercase kryos-text',
            STATUS_BADGE_BASE,
            STATUS_BADGE_CLASS['ONLINE'],
          ]"
          >online - {{ kryosFleetStore.stats.totalOnline }}</span
        >
        <span
          :class="[
            'uppercase kryos-text',
            STATUS_BADGE_BASE,
            STATUS_BADGE_CLASS['OFFLINE'],
          ]"
          >offline - {{ kryosFleetStore.stats.totalOffline }}</span
        >
        <span
          :class="[
            'uppercase kryos-text',
            STATUS_BADGE_BASE,
            STATUS_BADGE_CLASS['MAINTENANCE'],
          ]"
          >maintenance - {{ kryosFleetStore.stats.totalMaintenance }}
        </span>
      </div>
    </div>
    <!-- end status -->

    <!-- power -->
    <div class="flex flex-col gap-1 border border-(--kryos-accent) p-6 w-full md:max-w-100">
      <KryosLabel labelText="power" />
      <div class="flex flex-col md:flex-row md:items-center gap-2">
        <Icon name="icomoon-free:power" />
        <span :class="[STATUS_BADGE_BASE]"
          >avg power - {{ kryosFleetStore.stats.avgPower.toFixed(2) }}</span
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
