export type FleetFeedback =
  | { kind: "loading"; message: string }
  | { kind: "error"; message: string }
  | { kind: "empty-filtered"; message: string }
  | null;

export function getFleetFeedback(options: {
  isLoading: boolean;
  isError: boolean;
  total?: number;
  hasCriteria: boolean;
}): FleetFeedback {
  if (options.isLoading) {
    return { kind: "loading", message: "Loading fleet…" };
  }
  if (options.isError) {
    return {
      kind: "error",
      message: "Fleet data is temporarily unavailable. Check the connection and retry.",
    };
  }
  if (options.total === 0 && options.hasCriteria) {
    return {
      kind: "empty-filtered",
      message: "No units match this search and filter combination.",
    };
  }
  return null;
}
