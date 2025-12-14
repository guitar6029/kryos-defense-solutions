<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import { h, resolveComponent } from "vue";
import type { Status } from "~/types/Status";
const UBadge = resolveComponent("UBadge");
const DIVISOR_MSECONDS = 1000;

const base =
  "uppercase tracking-wider text-[11px] px-3 py-1 rounded-md border bg-(--kryos-bg-alt) trns-color hover:bg-(--kryos-bg) cursor-default";

const statusClass = {
  ONLINE:
    "border-emerald-500/40 hover:border-emerald-500/70 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
  DEGRADED:
    "border-(--kryos-accent)/50 hover:border-(--kryos-accent)/70 text-(--kryos-text-mid)",
  MAINTENANCE:
    "border-(--kryos-warn) hover:border-(--kryos-warn)/70  text-(--kryos-warn) shadow-[0_0_10px_rgba(215,164,41,0.15)]",
  OFFLINE:
    "border-(--kryos-danger) hover:border-(--kryos-danger)/70 text-(--kryos-danger) shadow-[0_0_10px_rgba(194,76,66,0.15)]",
} satisfies Record<Status, string>;

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
      return h(UBadge, { class: [base, statusClass[status]] }, () => status);
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
        { class: [base] },
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
