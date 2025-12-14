import type { Status } from "~/types/Status";

export const STATUS_BADGE_BASE =
  "uppercase tracking-wider text-[11px] px-3 py-1 rounded-md border bg-(--kryos-bg-alt) trns-color hover:bg-(--kryos-bg) cursor-default";

export const STATUS_BADGE_CLASS = {
  ONLINE:
    "border-emerald-500/40 hover:border-emerald-500/70 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
  DEGRADED:
    "border-(--kryos-accent)/50 hover:border-(--kryos-accent)/70 text-(--kryos-text-mid)",
  MAINTENANCE:
    "border-(--kryos-warn) hover:border-(--kryos-warn)/70 text-(--kryos-warn) shadow-[0_0_10px_rgba(215,164,41,0.15)]",
  OFFLINE:
    "border-(--kryos-danger) hover:border-(--kryos-danger)/70 text-(--kryos-danger) shadow-[0_0_10px_rgba(194,76,66,0.15)]",
} satisfies Record<Status, string>;
