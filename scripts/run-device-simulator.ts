import { DeviceSimulatorRunner, parseSimulatorRunnerConfig } from "../server/simulator/runner";

try {
  const runner = new DeviceSimulatorRunner(parseSimulatorRunnerConfig());
  const shutdown = async (signal: string) => {
    console.log(`[simulator] received ${signal}; finishing current tick`);
    await runner.stop();
    process.exitCode = 0;
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  runner.start();
} catch (error) {
  console.error(`[simulator] failed to start: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
