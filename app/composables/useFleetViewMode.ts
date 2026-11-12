import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  type Ref,
} from "vue";
import type { FleetPageResponse } from "~/types/FleetPage";
import { formatSnapshotAge } from "../utils/fleetSnapshot";

export type FleetViewMode = "live" | "snapshot";

type Snapshot = {
  data: FleetPageResponse;
  capturedAt: number;
};

function cloneFleetPage(data: FleetPageResponse): FleetPageResponse {
  return {
    ...data,
    devices: data.devices.map((device) => ({ ...device })),
  };
}

export function useFleetViewMode(
  liveData: Readonly<Ref<FleetPageResponse | undefined>>,
  refetch: () => unknown,
  getNow: () => number = Date.now,
) {
  const mode = ref<FleetViewMode>("live");
  const snapshot = ref<Snapshot>();
  const now = ref(getNow());
  let interval: ReturnType<typeof setInterval> | undefined;

  const displayedData = computed(() =>
    mode.value === "snapshot" ? snapshot.value?.data : liveData.value,
  );
  const capturedAt = computed(() => snapshot.value?.capturedAt);
  const relativeAge = computed(() =>
    capturedAt.value === undefined
      ? ""
      : formatSnapshotAge(capturedAt.value, now.value),
  );

  function captureSnapshot() {
    if (!liveData.value) return false;

    snapshot.value = {
      data: cloneFleetPage(liveData.value),
      capturedAt: getNow(),
    };
    now.value = snapshot.value.capturedAt;
    mode.value = "snapshot";
    return true;
  }

  function resumeLive() {
    snapshot.value = undefined;
    mode.value = "live";
    return refetch();
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      interval = setInterval(() => {
        if (mode.value === "snapshot") now.value = getNow();
      }, 60_000);
    });

    onUnmounted(() => {
      if (interval) clearInterval(interval);
    });
  }

  return {
    mode,
    displayedData,
    capturedAt,
    relativeAge,
    captureSnapshot,
    resumeLive,
  };
}
