import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";

const { useQueryMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
}));

vi.mock("#imports", () => ({ useQuery: useQueryMock }));

import { useKryosFleet } from "../app/composables/useKryosFleet";
import type { FleetPageResponse, FleetPageSize } from "../app/types/FleetPage";

describe("useKryosFleet", () => {
  beforeEach(() => {
    useQueryMock.mockReset();
    vi.stubGlobal("$fetch", vi.fn());
  });

  it("keys cached pages by reactive page and page size", () => {
    const page = ref(0);
    const pageSize = ref<FleetPageSize>(25);

    useKryosFleet(page, pageSize);

    const options = useQueryMock.mock.calls[0][0];
    expect(options.queryKey.value).toEqual(["fleet", 0, 25]);

    page.value = 3;
    expect(options.queryKey.value).toEqual(["fleet", 3, 25]);

    pageSize.value = 50;
    expect(options.queryKey.value).toEqual(["fleet", 3, 50]);
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

    useKryosFleet(ref(2), ref<FleetPageSize>(5));

    const options = useQueryMock.mock.calls[0][0];
    await options.queryFn({ queryKey: options.queryKey.value });

    expect(fetchMock).toHaveBeenCalledWith("/api/fleet", {
      query: { page: 2, pageSize: 5 },
    });
  });
});
