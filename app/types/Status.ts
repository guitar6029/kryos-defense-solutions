/** Persisted operational status values allowed by the Prisma Device model. */
export const DEVICE_STATUSES = [
  "ONLINE",
  "OFFLINE",
  "MAINTENANCE",
  "DEGRADED",
] as const;

export type Status = (typeof DEVICE_STATUSES)[number];

export function isStatus(value: unknown): value is Status {
  return (
    typeof value === "string" &&
    DEVICE_STATUSES.some((status) => status === value)
  );
}
