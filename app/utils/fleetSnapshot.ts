export function formatSnapshotAge(capturedAt: number, now: number): string {
  const elapsedMinutes = Math.max(0, Math.floor((now - capturedAt) / 60_000));

  if (elapsedMinutes < 1) return "less than a minute ago";
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"} ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `${elapsedHours} hour${elapsedHours === 1 ? "" : "s"} ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 7) {
    return `${elapsedDays} day${elapsedDays === 1 ? "" : "s"} ago`;
  }

  const elapsedWeeks = Math.floor(elapsedDays / 7);
  return `${elapsedWeeks} week${elapsedWeeks === 1 ? "" : "s"} ago`;
}
