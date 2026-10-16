import type { SimulationTick } from "../simulator/device-simulator";
import type { TelemetryIngestionResult, TelemetryIngestionService } from "./ingestion";

export type TelemetryBatchResult = {
  generated: number;
  accepted: number;
  rejected: number;
  persisted: number;
  failed: number;
  results: TelemetryIngestionResult[];
};

/** The only boundary the simulator runner needs to know about: a tick becomes ingestion work. */
export async function processSimulationTick(
  tick: SimulationTick,
  ingestion: Pick<TelemetryIngestionService, "ingest">,
): Promise<TelemetryBatchResult> {
  const results = await Promise.all(tick.telemetry.map((telemetry) => ingestion.ingest(telemetry)));
  return {
    generated: tick.telemetry.length,
    accepted: results.filter((result) => result.accepted).length,
    rejected: results.filter((result) => result.rejected).length,
    persisted: results.filter((result) => result.persisted).length,
    failed: results.filter((result) => result.outcome === "failed").length,
    results,
  };
}
