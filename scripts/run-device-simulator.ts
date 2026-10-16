import { DeviceSimulatorRunner, parseSimulatorRunnerConfig } from "../server/simulator/runner";
import { createTelemetryIngestionService } from "../server/telemetry/ingestion";
import { processSimulationTick } from "../server/telemetry/runner-boundary";
import { registerSimulatorRun, stopSimulatorRun } from "../server/telemetry/run-authority";

try {
  const ingestion = createTelemetryIngestionService();
  const runner = new DeviceSimulatorRunner(parseSimulatorRunnerConfig(), {
    processTick: async (tick) => {
      const result = await processSimulationTick(tick, ingestion);
      console.log(
        `[simulator] ingestion generated=${result.generated} accepted=${result.accepted} ` +
          `rejected=${result.rejected} persisted=${result.persisted} failed=${result.failed}`,
      );
    },
    registerRun: async (runId, targetDeviceIds) => {
      const registration = await registerSimulatorRun(runId, targetDeviceIds);
      console.log(`[simulator] registered run=${runId} generation=${registration.generation} devices=${targetDeviceIds.length}`);
      return registration.generation;
    },
    stopRun: (runId) => stopSimulatorRun(runId),
  });
  const shutdown = async (signal: string) => {
    console.log(`[simulator] received ${signal}; finishing current tick`);
    await runner.stop();
    process.exitCode = 0;
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  void runner.start().catch((error) => {
    console.error(`[simulator] failed to register/start: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
} catch (error) {
  console.error(`[simulator] failed to start: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
