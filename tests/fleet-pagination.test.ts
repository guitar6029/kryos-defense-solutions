import { beforeEach, describe, expect, it, vi } from "vitest";
import type { H3Event } from "h3";

const { count, findMany } = vi.hoisted(() => ({
  count: vi.fn(),
  findMany: vi.fn(),
}));

vi.mock("../server/utils/prisma", () => ({
  getPrismaClient: () => ({ device: { count, findMany } }),
}));

import fleetHandler from "../server/api/fleet.get";

const device = {
  unitId: "MK-1A",
  platform: "MK",
  status: "ONLINE",
  zone: "ALPHA",
  linkStatus: "STABLE",
  role: "SCOUT",
  powerPct: 82,
  signalQuality: 92,
  lastPingAt: new Date("2026-10-10T12:00:00.000Z"),
};

function request(path = "/api/fleet") {
  return fleetHandler({ path } as H3Event);
}

describe("GET /api/fleet pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findMany.mockResolvedValue([device]);
    count.mockResolvedValue(27);
  });

  it("defaults to the first page of 25 and returns the approved envelope", async () => {
    await expect(request()).resolves.toEqual({
      devices: [expect.objectContaining({ unitId: "MK-1A" })],
      total: 27,
      page: 0,
      pageSize: 25,
    });
    expect(findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 25,
      orderBy: { unitId: "asc" },
    });
    expect(count).toHaveBeenCalledOnce();
  });

  it.each([5, 25, 50, 100])("accepts page size %i", async (pageSize) => {
    await request(`/api/fleet?page=2&pageSize=${pageSize}`);
    expect(findMany).toHaveBeenCalledWith({
      skip: 2 * pageSize,
      take: pageSize,
      orderBy: { unitId: "asc" },
    });
  });

  it.each([
    "?page=-1",
    "?page=1.5",
    "?page=abc",
    "?page=9007199254740992",
    "?page=9007199254740991&pageSize=100",
    "?pageSize=10",
    "?pageSize=0",
    "?pageSize=5&pageSize=25",
    "?page=0&page=1",
  ])("returns HTTP 400 for invalid parameters: %s", async (query) => {
    await expect(request(`/api/fleet${query}`)).rejects.toMatchObject({
      statusCode: 400,
    });
    expect(findMany).not.toHaveBeenCalled();
    expect(count).not.toHaveBeenCalled();
  });

  it("returns empty devices and the accurate total for an out-of-range page", async () => {
    findMany.mockResolvedValue([]);

    await expect(request("/api/fleet?page=3&pageSize=25")).resolves.toEqual({
      devices: [],
      total: 27,
      page: 3,
      pageSize: 25,
    });
  });

  it("returns empty results and zero total for an empty fleet", async () => {
    findMany.mockResolvedValue([]);
    count.mockResolvedValue(0);

    await expect(request()).resolves.toEqual({
      devices: [],
      total: 0,
      page: 0,
      pageSize: 25,
    });
  });

  it("preserves the existing 503 behavior when fleet data is unavailable", async () => {
    findMany.mockRejectedValue(new Error("database unavailable"));

    await expect(request()).rejects.toMatchObject({
      statusCode: 503,
      statusMessage: "Fleet data is temporarily unavailable.",
    });
  });

  it("returns 503 when the total-count query fails", async () => {
    count.mockRejectedValue(new Error("count query unavailable"));

    await expect(request()).rejects.toMatchObject({
      statusCode: 503,
      statusMessage: "Fleet data is temporarily unavailable.",
    });
  });

  it("returns 503 when a persisted device cannot be mapped to the API contract", async () => {
    findMany.mockResolvedValue([{ ...device, status: "UNKNOWN" }]);

    await expect(request()).rejects.toMatchObject({
      statusCode: 503,
      statusMessage: "Fleet data is temporarily unavailable.",
    });
  });
});
