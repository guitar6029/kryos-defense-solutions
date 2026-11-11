import {
  assertLocalDemoFixtureEnvironment,
  createLocalDemoFixtures,
  parseLocalDemoFixtureSize,
} from "../server/fixtures/local-demo.js";

async function main() {
  const size = parseLocalDemoFixtureSize(process.argv[2]);
  if (process.argv.length !== 3) {
    throw new Error("Specify exactly one local demo fixture size: 20 or 500.");
  }
  assertLocalDemoFixtureEnvironment();
  process.env.SIMULATOR_TARGET_DEVICE_IDS = createLocalDemoFixtures(size)
    .map(({ unitId }) => unitId)
    .join(",");
  await import("./run-device-simulator.js");
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Local demo simulator failed to start.");
  process.exitCode = 1;
});
