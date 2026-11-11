import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import {
  assertLocalDemoFixtureEnvironment,
  createMissingLocalDemoFixtures,
  LocalDemoFixtureError,
  parseLocalDemoFixtureSize,
} from "../server/fixtures/local-demo.js";

async function main() {
  const size = parseLocalDemoFixtureSize(process.argv[2]);
  if (process.argv.length !== 3) {
    throw new LocalDemoFixtureError("Specify exactly one local demo fixture size: 20 or 500.");
  }
  const databaseUrl = assertLocalDemoFixtureEnvironment();
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl.toString() }) });
  try {
    const result = await createMissingLocalDemoFixtures(prisma, size);
    console.log(`Local demo fixtures: requested=${result.requested} created=${result.created} existing=${result.existing}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof LocalDemoFixtureError ? error.message : "Local demo fixture creation failed.");
  process.exitCode = 1;
});
