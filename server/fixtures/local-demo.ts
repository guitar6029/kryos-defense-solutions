import type { PrismaClient } from "../../generated/prisma/client.js";

export const LOCAL_DEMO_FIXTURE_SIZES = [20, 500] as const;
export type LocalDemoFixtureSize = (typeof LOCAL_DEMO_FIXTURE_SIZES)[number];

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export class LocalDemoFixtureError extends Error {}

export type LocalDemoFixture = {
  unitId: string;
  platform: "MK" | "EX";
  status: "ONLINE";
  zone: "ALPHA" | "BRAVO" | "CHARLIE" | "DELTA";
  role: "SCOUT" | "SUPPORT" | "GUARD" | "HAUL";
  powerPct: number;
  linkStatus: "STABLE";
  signalQuality: number;
  lastPingAt: Date;
};

export function parseLocalDemoFixtureSize(value: string | undefined): LocalDemoFixtureSize {
  if (value !== "20" && value !== "500") {
    throw new LocalDemoFixtureError("Specify exactly one local demo fixture size: 20 or 500.");
  }
  return Number(value) as LocalDemoFixtureSize;
}

function parseLocalPostgresUrl(value: string | undefined, variableName: string, allowComposeService: boolean): URL {
  if (!value) throw new LocalDemoFixtureError(`${variableName} is required.`);
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new LocalDemoFixtureError(`${variableName} must be a valid PostgreSQL URL.`);
  }
  const isLocalHost = LOOPBACK_HOSTS.has(url.hostname) || (allowComposeService && url.hostname === "db");
  if ((url.protocol !== "postgres:" && url.protocol !== "postgresql:") || !isLocalHost || !url.pathname || url.pathname === "/") {
    throw new LocalDemoFixtureError(`${variableName} must target the local Docker PostgreSQL service.`);
  }
  return url;
}

/** Reject any non-local target before a fixture script can open a database connection. */
export function assertLocalDemoFixtureEnvironment(env: Record<string, string | undefined> = process.env): URL {
  if (env.DB_ENV !== "dev") throw new LocalDemoFixtureError("DB_ENV must be set to dev for local demo fixtures.");
  if (env.KRYOS_ALLOW_LOCAL_DEMO_FIXTURES !== "true") {
    throw new LocalDemoFixtureError("Set KRYOS_ALLOW_LOCAL_DEMO_FIXTURES=true to create local demo fixtures.");
  }
  const allowComposeService = env.KRYOS_LOCAL_DOCKER === "true";
  const databaseUrl = parseLocalPostgresUrl(env.DATABASE_URL_DEV, "DATABASE_URL_DEV", allowComposeService);
  const directUrl = parseLocalPostgresUrl(env.DIRECT_URL_DEV, "DIRECT_URL_DEV", allowComposeService);
  if (databaseUrl.hostname !== directUrl.hostname || databaseUrl.port !== directUrl.port || databaseUrl.pathname !== directUrl.pathname) {
    throw new LocalDemoFixtureError("DATABASE_URL_DEV and DIRECT_URL_DEV must identify the same local database.");
  }
  return directUrl;
}

const zones = ["ALPHA", "BRAVO", "CHARLIE", "DELTA"] as const;
const roles = ["SCOUT", "SUPPORT", "GUARD", "HAUL"] as const;

/** IDs intentionally match the simulator's DEV-(MK|EX)- platform convention. */
export function createLocalDemoFixtures(size: LocalDemoFixtureSize): LocalDemoFixture[] {
  const createdAt = new Date("2026-01-01T00:00:00.000Z");
  return Array.from({ length: size }, (_, index) => {
    const platform = index % 2 === 0 ? "MK" : "EX";
    const sequence = String(Math.floor(index / 2) + 1).padStart(3, "0");
    return {
      unitId: `DEV-${platform}-LOCAL-${sequence}`,
      platform,
      status: "ONLINE",
      zone: zones[index % zones.length]!,
      role: roles[index % roles.length]!,
      powerPct: 60 + (index % 36),
      linkStatus: "STABLE",
      signalQuality: 80 + (index % 21),
      lastPingAt: createdAt,
    };
  });
}

export async function createMissingLocalDemoFixtures(
  prisma: Pick<PrismaClient, "device">,
  size: LocalDemoFixtureSize,
): Promise<{ requested: number; created: number; existing: number }> {
  const fixtures = createLocalDemoFixtures(size);
  const existing = await prisma.device.findMany({
    where: { unitId: { in: fixtures.map(({ unitId }) => unitId) } },
    select: { unitId: true },
  });
  const existingIds = new Set(existing.map(({ unitId }) => unitId));
  const missing = fixtures.filter(({ unitId }) => !existingIds.has(unitId));
  if (missing.length === 0) return { requested: size, created: 0, existing: existing.length };
  const result = await prisma.device.createMany({ data: missing, skipDuplicates: true });
  return { requested: size, created: result.count, existing: existing.length };
}
