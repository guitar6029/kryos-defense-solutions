import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const developmentDatabaseName = "kryos_dev";
const statuses = new Set(["ONLINE", "OFFLINE", "MAINTENANCE", "DEGRADED"]);
const platforms = new Set(["MK", "EX"]);
const zones = new Set(["ALPHA", "BRAVO", "CHARLIE", "DELTA"]);
const linkStatuses = new Set(["STABLE", "WEAK", "LOST"]);
const roles = new Set(["SCOUT", "SUPPORT", "GUARD", "HAUL"]);

type FixtureDevice = {
  unitId: string;
  platform: string;
  status: string;
  zone: string;
  powerPct: number;
  link: { status: string; signalQuality: number };
  lastPingmsAgo: number;
  role: string;
};

function parseLocalDevelopmentTarget(connectionString: string) {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL URL. Its value is not displayed.");
  }

  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error("DATABASE_URL must use the postgres or postgresql scheme.");
  }
  if (url.search || url.hash) {
    throw new Error("DATABASE_URL query parameters and fragments are not supported by the local seed.");
  }

  const databaseName = decodeURIComponent(url.pathname.slice(1));
  if (url.hostname !== "127.0.0.1" || databaseName !== developmentDatabaseName) {
    throw new Error(
      `Refusing to seed. Only 127.0.0.1/${developmentDatabaseName} is allowed.`,
    );
  }

  return { databaseName };
}

function validateDevice(device: FixtureDevice): void {
  if (
    !device ||
    typeof device.unitId !== "string" ||
    !platforms.has(device.platform) ||
    !statuses.has(device.status) ||
    !zones.has(device.zone) ||
    !Number.isInteger(device.powerPct) ||
    device.powerPct < 0 ||
    device.powerPct > 100 ||
    !device.link ||
    !linkStatuses.has(device.link.status) ||
    !Number.isInteger(device.link.signalQuality) ||
    device.link.signalQuality < 0 ||
    device.link.signalQuality > 100 ||
    !Number.isInteger(device.lastPingmsAgo) ||
    device.lastPingmsAgo < 0 ||
    !roles.has(device.role)
  ) {
    throw new TypeError("db.json contains a device outside the approved fixture shape.");
  }
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    `Set DATABASE_URL to the explicitly selected local ${developmentDatabaseName} database. Its value is never printed.`,
  );
}

const { databaseName } = parseLocalDevelopmentTarget(connectionString);
const fixturePath = fileURLToPath(new URL("../db.json", import.meta.url));
const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as {
  fleet: FixtureDevice[];
};
if (!Array.isArray(fixture.fleet) || fixture.fleet.length === 0) {
  throw new Error("db.json must contain a non-empty fleet array.");
}
fixture.fleet.forEach(validateDevice);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

try {
  const [target] = await prisma.$queryRaw<Array<{ name: string; address: string | null }>>`
    SELECT current_database() AS name, inet_server_addr()::text AS address
  `;
  const loopbackAddress =
    target.address === "::1" || target.address?.startsWith("127.");
  if (target.name !== databaseName || !loopbackAddress) {
    throw new Error("Refusing to seed: the connected PostgreSQL server is not the permitted local development target.");
  }

  // One reference time keeps fixture ages comparable within this seed run.
  const seedTime = new Date();
  await prisma.$transaction(
    fixture.fleet.map((device) => {
      const data = {
        platform: device.platform,
        status: device.status,
        zone: device.zone,
        powerPct: device.powerPct,
        linkStatus: device.link.status,
        signalQuality: device.link.signalQuality,
        lastPingAt: new Date(seedTime.getTime() - device.lastPingmsAgo),
        role: device.role,
      };

      return prisma.device.upsert({
        where: { unitId: device.unitId },
        create: { unitId: device.unitId, ...data },
        update: data,
      });
    }),
  );

  console.log(`Seeded ${fixture.fleet.length} fixture devices into local ${developmentDatabaseName}.`);
} catch {
  console.error("Development seed failed; database error details are omitted to avoid exposing connection details.");
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
