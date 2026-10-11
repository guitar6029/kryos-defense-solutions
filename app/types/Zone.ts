export const ZONES = ["ALPHA", "BRAVO", "CHARLIE", "DELTA"] as const;

export type Zone = (typeof ZONES)[number];

export function isZone(value: unknown): value is Zone {
  return (
    typeof value === "string" && ZONES.some((zone) => zone === value)
  );
}
