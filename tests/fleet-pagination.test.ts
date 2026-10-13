import { beforeEach, describe, expect, it, vi } from "vitest";
import { createEvent, getQuery } from "h3";
import type { IncomingMessage, ServerResponse } from "node:http";
import { MAX_FLEET_OFFSET } from "../server/utils/fleet-pagination";

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
  return fleetHandler(
    createEvent(
      { url: path, method: "GET", headers: {} } as IncomingMessage,
      { writableEnded: false, headersSent: false } as ServerResponse,
    ),
  );
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
      where: {},
      skip: 0,
      take: 25,
      orderBy: { unitId: "asc" },
    });
    expect(count).toHaveBeenCalledWith({ where: {} });
  });

  it.each([5, 25, 50, 100])("accepts page size %i", async (pageSize) => {
    await request(`/api/fleet?page=2&pageSize=${pageSize}`);
    expect(findMany).toHaveBeenCalledWith({
      where: {},
      skip: 2 * pageSize,
      take: pageSize,
      orderBy: { unitId: "asc" },
    });
  });

  it("accepts leading zeros in non-negative integer values", async () => {
    await request("/api/fleet?page=002&pageSize=005");
    expect(findMany).toHaveBeenCalledWith({
      where: {},
      skip: 10,
      take: 5,
      orderBy: { unitId: "asc" },
    });
  });

  it("accepts the configured maximum offset", async () => {
    await request("/api/fleet?page=100&pageSize=100");
    expect(MAX_FLEET_OFFSET).toBe(10_000);
    expect(findMany).toHaveBeenCalledWith({
      where: {},
      skip: MAX_FLEET_OFFSET,
      take: 100,
      orderBy: { unitId: "asc" },
    });
  });

  it("rejects an offset above the configured maximum before querying Prisma", async () => {
    await expect(request("/api/fleet?page=101&pageSize=100")).rejects.toMatchObject({
      statusCode: 400,
    });
    expect(findMany).not.toHaveBeenCalled();
    expect(count).not.toHaveBeenCalled();
  });

  it.each(["?paeg=2", "?debug=true", "?page=2&debug=true"])(
    "returns HTTP 400 for unknown query parameters: %s",
    async (query) => {
      await expect(request(`/api/fleet${query}`)).rejects.toMatchObject({
        statusCode: 400,
      });
      expect(findMany).not.toHaveBeenCalled();
      expect(count).not.toHaveBeenCalled();
    },
  );

  it("parses repeated query keys as arrays with the installed H3 parser", () => {
    const event = createEvent(
      {
        url: "/api/fleet?page=0&page=1",
        method: "GET",
        headers: {},
      } as IncomingMessage,
      { writableEnded: false, headersSent: false } as ServerResponse,
    );

    expect(getQuery(event)).toEqual({ page: ["0", "1"] });
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

  it("keeps the filtered total for an out-of-range page", async () => {
    findMany.mockResolvedValue([]);

    await expect(
      request("/api/fleet?page=3&pageSize=25&status=OFFLINE"),
    ).resolves.toEqual({
      devices: [],
      total: 27,
      page: 3,
      pageSize: 25,
    });
    expect(findMany.mock.calls[0][0].where).toEqual({ status: "OFFLINE" });
    expect(count.mock.calls[0][0].where).toBe(findMany.mock.calls[0][0].where);
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

  it("combines search and exact categorical filters in one where for rows and count", async () => {
    await request(
      "/api/fleet?search=%20mk-1%20&status=ONLINE&platform=MK&zone=ALPHA&role=SCOUT&linkStatus=STABLE",
    );

    const where = {
      unitId: { contains: "mk-1", mode: "insensitive" },
      status: "ONLINE",
      platform: "MK",
      zone: "ALPHA",
      role: "SCOUT",
      linkStatus: "STABLE",
    };
    expect(findMany).toHaveBeenCalledWith({
      where,
      skip: 0,
      take: 25,
      orderBy: { unitId: "asc" },
    });
    expect(count).toHaveBeenCalledWith({ where });
    expect(findMany.mock.calls[0][0].where).toBe(count.mock.calls[0][0].where);
  });

  it.each(["", "%20%20%20"])(
    "treats empty or whitespace search as absent (%s)",
    async (search) => {
      await request(`/api/fleet?search=${search}`);
      expect(findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 25,
        orderBy: { unitId: "asc" },
      });
      expect(count).toHaveBeenCalledWith({ where: {} });
    },
  );

  it.each([
    "?search=MK-1&search=MK-2",
    "?status=ONLINE&status=OFFLINE",
    "?status=online",
    "?platform=MK1",
    "?zone=UNKNOWN",
    "?role=UNKNOWN",
    "?linkStatus=UNKNOWN",
  ])("rejects invalid or repeated filter parameters: %s", async (query) => {
    await expect(request(`/api/fleet${query}`)).rejects.toMatchObject({
      statusCode: 400,
    });
    expect(findMany).not.toHaveBeenCalled();
    expect(count).not.toHaveBeenCalled();
  });

  it("returns the accurate zero total when filters match no devices", async () => {
    findMany.mockResolvedValue([]);
    count.mockResolvedValue(0);

    await expect(request("/api/fleet?status=OFFLINE")).resolves.toEqual({
      devices: [],
      total: 0,
      page: 0,
      pageSize: 25,
    });
    expect(findMany.mock.calls[0][0].where).toEqual({ status: "OFFLINE" });
    expect(count.mock.calls[0][0].where).toBe(findMany.mock.calls[0][0].where);
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
