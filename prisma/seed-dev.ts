import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { resolveDatabaseEnvironment } from "../server/utils/database-environment.mjs";

const expectedColumns = [
  ["unit_id", "text"],
  ["platform", "text"],
  ["status", "text"],
  ["zone", "text"],
  ["power_pct", "smallint"],
  ["link_status", "text"],
  ["signal_quality", "smallint"],
  ["last_ping_at", "timestamp with time zone"],
  ["role", "text"],
];

const expectedChecks = {
  devices_platform_check: ["'MK'", "'EX'"],
  devices_status_check: ["'ONLINE'", "'OFFLINE'", "'MAINTENANCE'", "'DEGRADED'"],
  devices_zone_check: ["'ALPHA'", "'BRAVO'", "'CHARLIE'", "'DELTA'"],
  devices_link_status_check: ["'STABLE'", "'WEAK'", "'LOST'"],
  devices_role_check: ["'SCOUT'", "'SUPPORT'", "'GUARD'", "'HAUL'"],
};

const pingAgeMinutesById = new Map();
const seedDevices = [
  ["DEV-MK-01", "MK", "ONLINE", "ALPHA", "SCOUT", 91, "STABLE", 96, 3],
  ["DEV-MK-02", "MK", "ONLINE", "BRAVO", "GUARD", 78, "STABLE", 88, 8],
  ["DEV-MK-03", "MK", "DEGRADED", "CHARLIE", "SCOUT", 46, "WEAK", 42, 37],
  ["DEV-MK-04", "MK", "OFFLINE", "DELTA", "GUARD", 63, "LOST", 0, 490],
  ["DEV-MK-05", "MK", "MAINTENANCE", "ALPHA", "SUPPORT", 100, "LOST", 0, 215],
  ["DEV-MK-06", "MK", "ONLINE", "CHARLIE", "HAUL", 69, "STABLE", 82, 12],
  ["DEV-MK-07", "MK", "DEGRADED", "BRAVO", "SUPPORT", 34, "WEAK", 51, 58],
  ["DEV-MK-08", "MK", "ONLINE", "DELTA", "GUARD", 84, "STABLE", 91, 5],
  ["DEV-MK-09", "MK", "OFFLINE", "ALPHA", "SCOUT", 22, "LOST", 0, 735],
  ["DEV-MK-10", "MK", "ONLINE", "BRAVO", "HAUL", 57, "WEAK", 64, 19],
  ["DEV-MK-11", "MK", "MAINTENANCE", "CHARLIE", "GUARD", 88, "LOST", 0, 168],
  ["DEV-MK-12", "MK", "DEGRADED", "DELTA", "SCOUT", 29, "WEAK", 35, 74],
  ["DEV-MK-13", "MK", "ONLINE", "ALPHA", "SUPPORT", 96, "STABLE", 99, 2],
  ["DEV-EX-01", "EX", "ONLINE", "BRAVO", "SUPPORT", 73, "STABLE", 86, 11],
  ["DEV-EX-02", "EX", "DEGRADED", "CHARLIE", "SCOUT", 51, "WEAK", 48, 44],
  ["DEV-EX-03", "EX", "OFFLINE", "DELTA", "HAUL", 17, "LOST", 0, 620],
  ["DEV-EX-04", "EX", "ONLINE", "ALPHA", "GUARD", 82, "STABLE", 93, 6],
  ["DEV-EX-05", "EX", "MAINTENANCE", "BRAVO", "SUPPORT", 100, "LOST", 0, 302],
  ["DEV-EX-06", "EX", "DEGRADED", "CHARLIE", "HAUL", 39, "WEAK", 57, 63],
  ["DEV-EX-07", "EX", "ONLINE", "DELTA", "SCOUT", 65, "STABLE", 79, 15],
  ["DEV-EX-08", "EX", "OFFLINE", "ALPHA", "GUARD", 43, "LOST", 0, 880],
  ["DEV-EX-09", "EX", "ONLINE", "BRAVO", "HAUL", 89, "STABLE", 95, 4],
  ["DEV-EX-10", "EX", "DEGRADED", "CHARLIE", "SUPPORT", 55, "WEAK", 61, 29],
  ["DEV-EX-11", "EX", "ONLINE", "DELTA", "GUARD", 76, "STABLE", 84, 9],
  ["DEV-EX-12", "EX", "MAINTENANCE", "ALPHA", "SCOUT", 94, "LOST", 0, 245],
].map(([unitId, platform, status, zone, role, powerPct, linkStatus, signalQuality, pingAgeMinutes]) => {
  pingAgeMinutesById.set(unitId, pingAgeMinutes);
  return {
    unitId,
    platform,
    status,
    zone,
    role,
    powerPct,
    linkStatus,
    signalQuality,
    lastPingAt: new Date(Date.now() - pingAgeMinutes * 60_000),
  };
});

const sampleIds = seedDevices.map(({ unitId }) => unitId);

class SeedSafetyError extends Error {}

function assertDevNeonEnvironment() {
  if (process.env.DB_ENV !== "dev") {
    throw new SeedSafetyError("Set DB_ENV=dev explicitly before running this command.");
  }

  const environment = resolveDatabaseEnvironment();
  if (environment.environment !== "dev") {
    throw new SeedSafetyError("The resolved database environment is not dev.");
  }

  const pooledUrl = new URL(environment.databaseUrl);
  const directUrl = new URL(environment.directUrl);
  const isNeonHost = (hostname) => hostname.endsWith(".neon.tech");
  const normalizePoolerHost = (hostname) => hostname.replace(/-pooler(?=\.)/, "");
  const pooledDatabase = decodeURIComponent(pooledUrl.pathname.slice(1));
  const directDatabase = decodeURIComponent(directUrl.pathname.slice(1));

  if (
    !isNeonHost(pooledUrl.hostname) ||
    !isNeonHost(directUrl.hostname) ||
    normalizePoolerHost(pooledUrl.hostname) !== directUrl.hostname ||
    pooledDatabase !== directDatabase
  ) {
    throw new SeedSafetyError("The configured dev pooled/direct endpoint pair could not be verified as the same Neon database.");
  }

  return { directUrl, expectedDatabase: directDatabase };
}

function assertColumns(columns) {
  const actual = columns.map(({ columnName, dataType, isNullable }) => [
    columnName,
    dataType,
    isNullable,
  ]);
  const expected = expectedColumns.map(([columnName, dataType]) => [
    columnName,
    dataType,
    "NO",
  ]);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new SeedSafetyError("public.devices columns differ from the expected Prisma Device schema.");
  }
}

function assertChecks(checks) {
  const byName = new Map(checks.map(({ name, definition }) => [name, definition]));
  const compact = (definition) => definition.toLowerCase().replace(/["\s()]/g, "");

  for (const [name, expectedValues] of Object.entries(expectedChecks)) {
    const definition = byName.get(name);
    if (!definition || expectedValues.some((value) => !definition.includes(value))) {
      throw new SeedSafetyError(`The ${name} constraint is missing or differs from the migration.`);
    }
  }

  for (const [name, column] of [
    ["devices_power_pct_check", "power_pct"],
    ["devices_signal_quality_check", "signal_quality"],
  ]) {
    const definition = byName.get(name);
    if (!definition) {
      throw new SeedSafetyError(`The ${name} constraint is missing.`);
    }
    const expression = compact(definition);
    const between = `${column}between0and100`;
    const lowerBound = new RegExp(`${column}>=0`).test(expression);
    const upperBound = new RegExp(`${column}<=100`).test(expression);
    if (!expression.includes(between) && !(lowerBound && upperBound)) {
      throw new SeedSafetyError(`The ${name} range differs from the migration.`);
    }
  }

  if (checks.length !== 7) {
    throw new SeedSafetyError("public.devices has an unexpected set of CHECK constraints.");
  }
}

async function inspectTarget(prisma, expectedDatabase) {
  const [identity] = await prisma.$queryRaw`
    SELECT current_database() AS "databaseName",
           current_schema() AS "schemaName",
           version() AS "serverVersion"
  `;
  if (
    identity?.databaseName !== expectedDatabase ||
    identity?.schemaName !== "public" ||
    !identity?.serverVersion?.toLowerCase().includes("postgresql")
  ) {
    throw new SeedSafetyError("Connected database identity does not match the configured Neon dev target.");
  }

  const columns = await prisma.$queryRaw`
    SELECT column_name AS "columnName",
           data_type AS "dataType",
           is_nullable AS "isNullable"
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'devices'
    ORDER BY ordinal_position
  `;
  assertColumns(columns);

  const checks = await prisma.$queryRaw`
    SELECT conname AS name, pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conrelid = 'public.devices'::regclass AND contype = 'c'
  `;
  assertChecks(checks);

  const tableCount = await prisma.device.count();
  const existingSamples = await prisma.device.findMany({
    where: { unitId: { in: sampleIds } },
    select: { unitId: true },
  });

  return { tableCount, existingSamples };
}

function summarizeDistribution(rows) {
  const fields = ["platform", "status", "zone", "role", "linkStatus"];
  return Object.fromEntries(fields.map((field) => [
    field,
    Object.fromEntries(
      [...new Set(rows.map((row) => row[field]))]
        .sort()
        .map((value) => [value, rows.filter((row) => row[field] === value).length]),
    ),
  ]));
}

async function verifySampleRows(prisma) {
  const rows = await prisma.device.findMany({
    where: { unitId: { in: sampleIds } },
    select: {
      unitId: true,
      platform: true,
      status: true,
      zone: true,
      role: true,
      powerPct: true,
      linkStatus: true,
      signalQuality: true,
      lastPingAt: true,
    },
  });
  if (rows.length !== seedDevices.length) {
    throw new SeedSafetyError("Read-only sample verification did not find all 25 expected device IDs.");
  }

  const expectedById = new Map(seedDevices.map((device) => [device.unitId, device]));
  const persistedFieldsMatch = rows.every((row) => {
    const expected = expectedById.get(row.unitId);
    return (
      expected !== undefined &&
      row.platform === expected.platform &&
      row.status === expected.status &&
      row.zone === expected.zone &&
      row.role === expected.role &&
      row.powerPct === expected.powerPct &&
      row.linkStatus === expected.linkStatus &&
      row.signalQuality === expected.signalQuality
    );
  });
  const inferredSeedTimes = rows.map((row) =>
    row.lastPingAt.getTime() + pingAgeMinutesById.get(row.unitId) * 60_000,
  );
  const timestampsAreValidAndVaried =
    rows.every(({ lastPingAt }) => Number.isFinite(lastPingAt.getTime())) &&
    new Set(rows.map(({ lastPingAt }) => lastPingAt.getTime())).size === rows.length &&
    Math.max(...inferredSeedTimes) - Math.min(...inferredSeedTimes) <= 60_000;

  if (!persistedFieldsMatch || !timestampsAreValidAndVaried) {
    throw new SeedSafetyError("Read-only sample verification found data that differs from the intended dataset.");
  }
  return rows;
}

async function main() {
  const { directUrl, expectedDatabase } = assertDevNeonEnvironment();
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: directUrl.toString() }),
  });

  try {
    const before = await inspectTarget(prisma, expectedDatabase);
    console.log("Target verified: DB_ENV=dev, Neon pooled/direct pair matches, database identity and public.devices schema/constraints match.");
    console.log(`Read-only preflight: ${before.tableCount} existing rows; ${before.existingSamples.length} of the ${sampleIds.length} sample IDs already exist.`);

    if (process.argv.includes("--verify-only")) {
      if (before.existingSamples.length === 0) {
        return;
      }
      const verifiedRows = await verifySampleRows(prisma);
      const totalRows = await prisma.device.count();
      console.log(`Read-only sample verification: ${verifiedRows.length} expected rows match every intended field; ${totalRows} total device rows.`);
      console.log(`Sample field distributions: ${JSON.stringify(summarizeDistribution(verifiedRows))}`);
      return;
    }
    if (process.argv.length > 2) {
      throw new SeedSafetyError("Unsupported seed script argument.");
    }

    const existingIds = new Set(before.existingSamples.map(({ unitId }) => unitId));
    await prisma.$transaction(
      seedDevices.map((device) =>
        prisma.device.upsert({
          where: { unitId: device.unitId },
          create: device,
          update: {
            platform: device.platform,
            status: device.status,
            zone: device.zone,
            role: device.role,
            powerPct: device.powerPct,
            linkStatus: device.linkStatus,
            signalQuality: device.signalQuality,
            lastPingAt: device.lastPingAt,
          },
        }),
      ),
    );

    const seededRows = await verifySampleRows(prisma);

    const totalRows = await prisma.device.count();
    console.log(`Upsert complete: ${seedDevices.length - existingIds.size} inserted; ${existingIds.size} updated; no other IDs were modified.`);
    console.log(`Read-only verification: ${seededRows.length} sample rows confirmed; ${totalRows} total device rows.`);
    console.log(`Sample field distributions: ${JSON.stringify(summarizeDistribution(seededRows))}`);
    console.log(`Sample numeric ranges: powerPct ${Math.min(...seededRows.map(({ powerPct }) => powerPct))}–${Math.max(...seededRows.map(({ powerPct }) => powerPct))}; signalQuality ${Math.min(...seededRows.map(({ signalQuality }) => signalQuality))}–${Math.max(...seededRows.map(({ signalQuality }) => signalQuality))}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  if (error instanceof SeedSafetyError) {
    console.error(error.message);
  } else {
    console.error("Dev database operation failed; details are suppressed to protect connection information.");
  }
  process.exitCode = 1;
});
