export const LINK_STATUSES = ["STABLE", "WEAK", "LOST"] as const;

export type LinkStatus = (typeof LINK_STATUSES)[number];

export type LinkState = {
  status: LinkStatus;
  signalQuality: number;
};

export function isLinkStatus(value: unknown): value is LinkStatus {
  return (
    typeof value === "string" &&
    LINK_STATUSES.some((status) => status === value)
  );
}

export function isLinkState(value: unknown): value is LinkState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const link = value as Record<string, unknown>;
  return (
    isLinkStatus(link.status) &&
    typeof link.signalQuality === "number" &&
    Number.isFinite(link.signalQuality) &&
    Number.isInteger(link.signalQuality) &&
    link.signalQuality >= 0 &&
    link.signalQuality <= 100
  );
}
