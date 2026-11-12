import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";

const { useAsyncDataMock } = vi.hoisted(() => ({
  useAsyncDataMock: vi.fn(),
}));

vi.mock("#imports", () => ({ useAsyncData: useAsyncDataMock }));

import { useKryosFleet } from "../app/composables/useKryosFleet";
import type {
  FleetPageResponse,
  FleetPageSize,
  FleetSearchCriteria,
} from "../app/types/FleetPage";
import { useKryosFleetCriteria } from "../app/composables/useKryosFleetCriteria";

const response: FleetPageResponse = {
  devices: [],
  total: 0,
  page: 2,
  pageSize: 5,
};

describe("useKryosFleet", () => {
  const data = ref<FleetPageResponse>();
  const pending = ref(false);
  const status = ref<"idle" | "pending" | "success" | "error">("idle");
  const error = ref();
  const refresh = vi.fn();

  function options() {
    return useAsyncDataMock.mock.calls[0][2];
  }

  function key() {
    return useAsyncDataMock.mock.calls[0][0];
  }

  function handler() {
    return useAsyncDataMock.mock.calls[0][1];
  }

  beforeEach(() => {
    useAsyncDataMock.mockReset();
    useAsyncDataMock.mockReturnValue({ data, pending, status, error, refresh });
    data.value = undefined;
    pending.value = false;
    status.value = "idle";
    error.value = undefined;
    refresh.mockReset();
    vi.stubGlobal("$fetch", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses a reactive native-data key for page, size, and normalized filters", () => {
    const page = ref(0);
    const pageSize = ref<FleetPageSize>(25);
    const criteria = ref<FleetSearchCriteria>({});

    useKryosFleet(page, pageSize, criteria);
    expect(key().value).toBe('fleet:{"page":0,"pageSize":25,"criteria":{}}');

    page.value = 3;
    pageSize.value = 50;
    criteria.value = { search: "  mk-1  ", status: "ONLINE", zone: "ALPHA" };

    expect(key().value).toBe(
      'fleet:{"page":3,"pageSize":50,"criteria":{"search":"mk-1","status":"ONLINE","zone":"ALPHA"}}',
    );
  });

  it("passes the live-mode enabled state to Nuxt async data", () => {
    const liveUpdatesEnabled = ref(true);

    useKryosFleet(ref(0), ref<FleetPageSize>(25), ref({}), liveUpdatesEnabled);

    expect(options().enabled).toBe(liveUpdatesEnabled);
  });

  it("requests the current page, size, and normalized filters", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal("$fetch", fetchMock);
    const criteria = ref<FleetSearchCriteria>({
      search: "  mk-42  ",
      platform: "MK",
      linkStatus: "WEAK",
    });

    useKryosFleet(ref(2), ref<FleetPageSize>(5), criteria);
    await handler()(undefined, { signal: new AbortController().signal });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/fleet",
      expect.objectContaining({
        query: {
          page: 2,
          pageSize: 5,
          search: "mk-42",
          platform: "MK",
          linkStatus: "WEAK",
        },
      }),
    );
  });

  it("omits an empty trimmed search from the request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal("$fetch", fetchMock);

    useKryosFleet(ref(0), ref<FleetPageSize>(25), ref({ search: "   " }));
    await handler()(undefined, { signal: new AbortController().signal });

    expect(key().value).toBe('fleet:{"page":0,"pageSize":25,"criteria":{}}');
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/fleet",
      expect.objectContaining({ query: { page: 0, pageSize: 25 } }),
    );
  });

  it("keeps debounced search and immediate filters in the reactive request key", async () => {
    vi.useFakeTimers();
    const page = ref(2);
    const { criteria, effectiveCriteria } = useKryosFleetCriteria(page);
    useKryosFleet(page, ref<FleetPageSize>(25), effectiveCriteria);

    criteria.search = "MK-2";
    expect(key().value).toBe('fleet:{"page":2,"pageSize":25,"criteria":{}}');

    criteria.status = "ONLINE";
    await nextTick();
    expect(key().value).toBe(
      'fleet:{"page":0,"pageSize":25,"criteria":{"status":"ONLINE"}}',
    );

    vi.advanceTimersByTime(300);
    expect(key().value).toBe(
      'fleet:{"page":0,"pageSize":25,"criteria":{"search":"MK-2","status":"ONLINE"}}',
    );
  });

  it("exposes loading, success, and error states through the existing contract", () => {
    const fleet = useKryosFleet(ref(0), ref<FleetPageSize>(25), ref({}));

    status.value = "pending";
    pending.value = true;
    expect(fleet.isLoading.value).toBe(true);
    expect(fleet.isFetching.value).toBe(true);

    data.value = response;
    status.value = "success";
    pending.value = false;
    expect(fleet.isLoading.value).toBe(false);
    expect(fleet.isError.value).toBe(false);

    status.value = "error";
    error.value = new Error("Fleet unavailable");
    expect(fleet.isError.value).toBe(true);
  });

  it("refreshes manually with native cancellation deduplication", async () => {
    const fleet = useKryosFleet(ref(0), ref<FleetPageSize>(25), ref({}));

    await fleet.refetch();

    expect(refresh).toHaveBeenCalledWith({ dedupe: "cancel" });
    expect(options().dedupe).toBe("cancel");
  });

  it("uses distinct keys and cancellation signals for rapid parameter changes", async () => {
    const page = ref(0);
    useKryosFleet(page, ref<FleetPageSize>(25), ref({}));
    const firstKey = key().value;
    const firstController = new AbortController();
    const firstRequest = handler()(undefined, { signal: firstController.signal });

    page.value = 1;
    const secondKey = key().value;
    const secondController = new AbortController();
    const secondRequest = handler()(undefined, { signal: secondController.signal });

    expect(firstKey).not.toBe(secondKey);
    expect(options().dedupe).toBe("cancel");
    expect(($fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].signal).toBe(firstController.signal);
    expect(($fetch as ReturnType<typeof vi.fn>).mock.calls[1][1].signal).toBe(secondController.signal);
    await Promise.all([firstRequest, secondRequest]);
  });
});
