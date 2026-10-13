import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";

const { useQueryMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
}));

vi.mock("#imports", () => ({ useQuery: useQueryMock }));

import { useKryosFleet } from "../app/composables/useKryosFleet";
import type {
  FleetPageResponse,
  FleetPageSize,
  FleetSearchCriteria,
} from "../app/types/FleetPage";
import { useKryosFleetCriteria } from "../app/composables/useKryosFleetCriteria";

describe("useKryosFleet", () => {
  beforeEach(() => {
    useQueryMock.mockReset();
    vi.stubGlobal("$fetch", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keys cached pages by reactive page and page size", () => {
    const page = ref(0);
    const pageSize = ref<FleetPageSize>(25);
    const criteria = ref<FleetSearchCriteria>({});

    useKryosFleet(page, pageSize, criteria);

    const options = useQueryMock.mock.calls[0][0];
    expect(options.queryKey.value).toEqual(["fleet", 0, 25, {}]);

    page.value = 3;
    expect(options.queryKey.value).toEqual(["fleet", 3, 25, {}]);

    pageSize.value = 50;
    expect(options.queryKey.value).toEqual(["fleet", 3, 50, {}]);

    criteria.value = { search: "  mk-1  ", status: "ONLINE", zone: "ALPHA" };
    expect(options.queryKey.value).toEqual([
      "fleet",
      3,
      50,
      { search: "mk-1", status: "ONLINE", zone: "ALPHA" },
    ]);
  });

  it("requests the page and size represented by the query key", async () => {
    const response: FleetPageResponse = {
      devices: [],
      total: 0,
      page: 2,
      pageSize: 5,
    };
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal("$fetch", fetchMock);

    const criteria = ref<FleetSearchCriteria>({
      search: "  mk-42  ",
      platform: "MK",
      linkStatus: "WEAK",
    });
    useKryosFleet(ref(2), ref<FleetPageSize>(5), criteria);

    const options = useQueryMock.mock.calls[0][0];
    await options.queryFn({ queryKey: options.queryKey.value });

    expect(fetchMock).toHaveBeenCalledWith("/api/fleet", {
      query: {
        page: 2,
        pageSize: 5,
        search: "mk-42",
        platform: "MK",
        linkStatus: "WEAK",
      },
    });
  });

  it("omits empty trimmed search and filters from the request", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      devices: [],
      total: 0,
      page: 0,
      pageSize: 25,
    });
    vi.stubGlobal("$fetch", fetchMock);

    useKryosFleet(ref(0), ref<FleetPageSize>(25), ref({ search: "   " }));
    const options = useQueryMock.mock.calls[0][0];
    await options.queryFn({ queryKey: options.queryKey.value });

    expect(options.queryKey.value).toEqual(["fleet", 0, 25, {}]);
    expect(fetchMock).toHaveBeenCalledWith("/api/fleet", {
      query: { page: 0, pageSize: 25 },
    });
  });

  it("keeps debounced search and immediate filters in the reactive query key", async () => {
    vi.useFakeTimers();
    const page = ref(2);
    const { criteria, effectiveCriteria } = useKryosFleetCriteria(page);
    const pageSize = ref<FleetPageSize>(25);
    useKryosFleet(page, pageSize, effectiveCriteria);
    const queryKey = useQueryMock.mock.calls[0][0].queryKey;

    criteria.search = "MK-2";
    expect(queryKey.value).toEqual(["fleet", 2, 25, {}]);

    criteria.status = "ONLINE";
    await nextTick();
    expect(queryKey.value).toEqual([
      "fleet",
      0,
      25,
      { status: "ONLINE" },
    ]);

    vi.advanceTimersByTime(300);
    expect(queryKey.value).toEqual([
      "fleet",
      0,
      25,
      { search: "MK-2", status: "ONLINE" },
    ]);
  });

  it("clearing search on a later page resets the query to the unfiltered fleet", async () => {
    vi.useFakeTimers();
    const page = ref(0);
    const { criteria, effectiveCriteria } = useKryosFleetCriteria(page);
    const pageSize = ref<FleetPageSize>(25);
    const fetchMock = vi.fn().mockResolvedValue({
      devices: [],
      total: 0,
      page: 0,
      pageSize: 25,
    });
    vi.stubGlobal("$fetch", fetchMock);
    useKryosFleet(page, pageSize, effectiveCriteria);
    const options = useQueryMock.mock.calls[0][0];

    criteria.search = "MK-8";
    vi.advanceTimersByTime(300);
    await nextTick();
    expect(options.queryKey.value).toEqual([
      "fleet",
      0,
      25,
      { search: "MK-8" },
    ]);

    page.value = 3;
    criteria.search = "";
    await nextTick();
    expect(options.queryKey.value).toEqual(["fleet", 0, 25, {}]);

    await options.queryFn({ queryKey: options.queryKey.value });
    expect(fetchMock).toHaveBeenCalledWith("/api/fleet", {
      query: { page: 0, pageSize: 25 },
    });
  });
});
