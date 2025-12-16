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
  // ───────── COMMAND STATES ─────────
  QUEUED:
    "border-sky-400/40 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.12)] hover:border-sky-400/70",

  SENDING:
    "border-(--kryos-accent) text-(--kryos-accent) animate-pulse shadow-[0_0_12px_rgba(120,170,255,0.18)]",

  ACKED:
    "border-emerald-400/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.18)]",

  FAILED:
    "border-(--kryos-danger)/70 text-(--kryos-danger) shadow-[0_0_12px_rgba(194,76,66,0.2)]",

  CANCELED: "border-neutral-500/40 text-neutral-400 italic opacity-80",
} satisfies Record<Status, string>;
