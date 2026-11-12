import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("fleet snapshot UI", () => {
  it("keeps the snapshot notice out of Live mode and labels the Resume Live action", () => {
    const fleetPage = read("../app/pages/app/fleet.vue");

    expect(fleetPage).toContain('v-if="isSnapshot && capturedAt !== undefined"');
    expect(fleetPage).toContain("NOTICE: VIEWING DATA IN SNAPSHOT MODE");
    expect(fleetPage).toContain("new Date(capturedAt).toLocaleString()");
    expect(fleetPage).toContain(">Resume Live</button>");
    expect(fleetPage).toContain("sticky top-3");
  });

  it("disables filter and pagination controls while a snapshot is displayed", () => {
    const fleetPage = read("../app/pages/app/fleet.vue");
    const filters = read("../app/components/Systems/FleetFilters.vue");
    const pagination = read("../app/components/Table/KryosFleetPagination.vue");

    expect(fleetPage).toContain(':disabled="isSnapshot"');
    expect(filters.match(/:disabled="props\.disabled"/g)).toHaveLength(6);
    expect(pagination).toContain("props.isLoading || props.isError || props.disabled");
  });
});
