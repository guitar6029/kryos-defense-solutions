import { describe, expect, it, vi } from "vitest";
import {
  assertLocalDemoFixtureEnvironment,
  createLocalDemoFixtures,
  createMissingLocalDemoFixtures,
  parseLocalDemoFixtureSize,
} from "../server/fixtures/local-demo";

const safeEnvironment = {
  DB_ENV: "dev",
  KRYOS_LOCAL_DOCKER: "true",
  KRYOS_ALLOW_LOCAL_DEMO_FIXTURES: "true",
  DATABASE_URL_DEV: "postgresql://demo:demo@db:5432/kryos_demo",
  DIRECT_URL_DEV: "postgresql://demo:demo@db:5432/kryos_demo",
};

describe("local demo fixtures", () => {
  it("creates deterministic simulator-compatible 20 and 500 device inventories", () => {
    const small = createLocalDemoFixtures(20);
    const full = createLocalDemoFixtures(500);

    expect(small).toHaveLength(20);
    expect(full).toHaveLength(500);
    expect(small).toEqual(createLocalDemoFixtures(20));
    expect(new Set(full.map(({ unitId }) => unitId)).size).toBe(500);
    expect(full[0]).toMatchObject({ unitId: "DEV-MK-LOCAL-001", platform: "MK" });
    expect(full[1]).toMatchObject({ unitId: "DEV-EX-LOCAL-001", platform: "EX" });
  });

  it("accepts only the explicit fixture sizes", () => {
    expect(parseLocalDemoFixtureSize("20")).toBe(20);
    expect(parseLocalDemoFixtureSize("500")).toBe(500);
    expect(() => parseLocalDemoFixtureSize("21")).toThrow(/20 or 500/);
    expect(() => parseLocalDemoFixtureSize(undefined)).toThrow(/20 or 500/);
  });

  it("rejects non-opted-in, remote, Neon, and mismatched database targets", () => {
    expect(assertLocalDemoFixtureEnvironment(safeEnvironment).hostname).toBe("db");
    expect(() => assertLocalDemoFixtureEnvironment({ ...safeEnvironment, KRYOS_ALLOW_LOCAL_DEMO_FIXTURES: undefined })).toThrow(/KRYOS_ALLOW_LOCAL_DEMO_FIXTURES/);
    expect(() => assertLocalDemoFixtureEnvironment({ ...safeEnvironment, KRYOS_LOCAL_DOCKER: undefined })).toThrow(/local Docker/);
    expect(() => assertLocalDemoFixtureEnvironment({ ...safeEnvironment, DATABASE_URL_DEV: "postgresql://demo:demo@ep-demo.neon.tech/kryos_demo" })).toThrow(/local Docker/);
    expect(() => assertLocalDemoFixtureEnvironment({ ...safeEnvironment, DIRECT_URL_DEV: "postgresql://demo:demo@example.com/kryos_demo" })).toThrow(/local Docker/);
    expect(() => assertLocalDemoFixtureEnvironment({ ...safeEnvironment, DIRECT_URL_DEV: "postgresql://demo:demo@db:5432/other" })).toThrow(/same local database/);
  });

  it("creates only missing fixture IDs and does not use updates", async () => {
    const findMany = vi.fn().mockResolvedValue([{ unitId: "DEV-MK-LOCAL-001" }]);
    const createMany = vi.fn().mockResolvedValue({ count: 19 });
    const result = await createMissingLocalDemoFixtures({ device: { findMany, createMany } } as never, 20);

    expect(result).toEqual({ requested: 20, created: 19, existing: 1 });
    expect(createMany).toHaveBeenCalledWith(expect.objectContaining({ skipDuplicates: true }));
    expect(createMany.mock.calls[0][0].data).toHaveLength(19);
  });

  it("does not write when every requested fixture already exists", async () => {
    const findMany = vi.fn().mockResolvedValue(createLocalDemoFixtures(20).map(({ unitId }) => ({ unitId })));
    const createMany = vi.fn();
    await expect(createMissingLocalDemoFixtures({ device: { findMany, createMany } } as never, 20)).resolves.toEqual({ requested: 20, created: 0, existing: 20 });
    expect(createMany).not.toHaveBeenCalled();
  });
});
