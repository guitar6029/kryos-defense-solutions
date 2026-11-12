import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useFleetViewMode } from "../app/composables/useFleetViewMode";
import { formatSnapshotAge } from "../app/utils/fleetSnapshot";
import type { FleetPageResponse } from "../app/types/FleetPage";

const page = (unitId = "MK-I-001"): FleetPageResponse => ({
  devices: [{
    unitId,
    platform: "MK-I",
    status: "ONLINE",
    zone: "ALPHA",
    linkStatus: "STABLE",
    role: "SCOUT",
    powerPct: 80,
    signalQuality: 90,
    lastPingAt: "2026-11-12T12:00:00.000Z",
  }],
  total: 1,
  page: 0,
  pageSize: 25,
});

describe("fleet view mode", () => {
  it("starts in Live mode and exposes the live query data", () => {
    const liveData = ref(page());
    const state = useFleetViewMode(liveData, vi.fn(), () => 1_000);

    expect(state.mode.value).toBe("live");
    expect(state.displayedData.value).toBe(liveData.value);
    expect(state.capturedAt.value).toBeUndefined();
  });

  it("captures a copy of the displayed page and keeps it frozen", () => {
    const liveData = ref(page());
    const state = useFleetViewMode(liveData, vi.fn(), () => 72_000);

    expect(state.captureSnapshot()).toBe(true);
    liveData.value = page("MK-I-002");

    expect(state.mode.value).toBe("snapshot");
    expect(state.capturedAt.value).toBe(72_000);
    expect(state.displayedData.value?.devices[0].unitId).toBe("MK-I-001");
  });

  it("does not enter Snapshot mode when no displayed page is available", () => {
    const state = useFleetViewMode(ref(), vi.fn(), () => 72_000);

    expect(state.captureSnapshot()).toBe(false);
    expect(state.mode.value).toBe("live");
  });

  it("formats capture ages through minutes, hours, days, and weeks", () => {
    expect(formatSnapshotAge(1_000, 1_000)).toBe("less than a minute ago");
    expect(formatSnapshotAge(1_000, 61_000)).toBe("1 minute ago");
    expect(formatSnapshotAge(1_000, 12 * 60_000 + 1_000)).toBe("12 minutes ago");
    expect(formatSnapshotAge(1_000, 61 * 60_000 + 1_000)).toBe("1 hour ago");
    expect(formatSnapshotAge(1_000, 2 * 24 * 60 * 60_000 + 1_000)).toBe("2 days ago");
    expect(formatSnapshotAge(1_000, 7 * 24 * 60 * 60_000 + 1_000)).toBe("1 week ago");
    expect(formatSnapshotAge(1_000, 14 * 24 * 60 * 60_000 + 1_000)).toBe("2 weeks ago");
  });

  it("resumes Live mode and immediately requests fresh data", () => {
    const refetch = vi.fn();
    const liveData = ref(page());
    const state = useFleetViewMode(liveData, refetch, () => 1_000);
    state.captureSnapshot();
    liveData.value = page("MK-I-002");

    state.resumeLive();

    expect(state.mode.value).toBe("live");
    expect(state.displayedData.value?.devices[0].unitId).toBe("MK-I-002");
    expect(refetch).toHaveBeenCalledOnce();
  });
});
