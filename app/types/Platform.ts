export const PLATFORMS = ["MK", "EX"] as const;

export type Platform = (typeof PLATFORMS)[number];

export function isPlatform(value: unknown): value is Platform {
  return (
    typeof value === "string" &&
    PLATFORMS.some((platform) => platform === value)
  );
}
