<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import { h, resolveComponent } from "vue";
import {
  STATUS_BADGE_BASE,
  STATUS_BADGE_CLASS,
} from "~/utils/kryosStatusClasses";
const UBadge = resolveComponent("UBadge");
const DIVISOR_MSECONDS = 1000;

function formatPingTime(pingTime: number): string {
  const secondsFormat = pingTime / DIVISOR_MSECONDS;
  return `${
    secondsFormat < 10 ? secondsFormat.toFixed(2) : secondsFormat.toFixed(0)
  }`;
}

function getValueClass(val: number): string {
  if (val <= 20) {
    return "text-(--kryos-danger)";
  }

  if (val <= 45) {
    return "text-(--kryos-warn)";
  }

  if (val <= 70) {
    return "text-(--kryos-accent-bright)";
  }

  return "text-emerald-400";
}
const props = defineProps<{
  data: KryosNode[];
}>();

const columns: TableColumn<KryosNode>[] = [
  {
    accessorKey: "unitId",
    header: "UNIT ID",
  },
  {
    accessorKey: "platform",
    header: "PLATFORM",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.original.status;
      return h(
        UBadge,
        { class: [STATUS_BADGE_BASE, STATUS_BADGE_CLASS[status]] },
        () => status
      );
    },
  },
  {
    accessorKey: "zone",
    header: "ZONE",
  },
  {
    accessorKey: "powerPct",
    header: () => h("div", { class: " pr-2" }, "POWER"),
    cell: ({ row }) => {
      return h(
        "div",
        {
          class: [
            "w-12 text-right tabular-nums",
            getValueClass(row.getValue("powerPct")),
          ],
        },
        String(row.getValue("powerPct"))
      );
    },
  },
  {
    accessorKey: "link",
    header: "LINK",
    cell: ({ row }) => {
      const { status, signalQuality } = row.original.link;
      return h(
        "span",
        { class: [getValueClass(signalQuality)] },
        String(`${status} - ${signalQuality}`)
      );
    },
  },
  {
    accessorKey: "lastPingmsAgo",
    header: "LAST PING",
    cell: ({ row }) => {
      return h(
        "span",
        { class: [STATUS_BADGE_BASE] },
        formatPingTime(row.getValue("lastPingmsAgo"))
      );
    },
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      return h("span", { class: "font-bold" }, row.getValue("role"));
    },
  },
];
</script>

<template>
  <UTable :data="data" :columns="columns" />
</template>
