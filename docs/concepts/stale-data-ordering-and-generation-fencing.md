# Stale Data, Ordering, and Generation-Based Fencing

## The problem

Telemetry can be delayed, duplicated, or delivered out of order. A message from an older simulator run might arrive after a replacement run has already updated the device. If the old message is accepted just because its timestamp is newer, it can overwrite state owned by the current run.

## Two different ordering values

A simulator **generation** identifies the run's authority epoch. A higher generation represents a later registration and can fence an older run from writing.

A per-device telemetry **sequence** orders samples within one run, such as 1, 2, and 3. It answers “is this message newer than the last sample from this run?” It is not a replacement for generation: a new run can start again at sequence 1 while still being newer because its generation changed.

## What Kryos uses

During registration, [`server/telemetry/run-authority.ts`](../../server/telemetry/run-authority.ts) stores the run generation and assigns each target device an `authorityRunId` and `authorityGeneration`. During ingestion, [`server/telemetry/ingestion.ts`](../../server/telemetry/ingestion.ts) requires all of the following before advancing the projection:

- the run exists and is active;
- the message generation matches the run generation;
- the device is still authoritative for that run and generation; and
- the sequence is greater than the stored sequence for the same run.

The final conditional update repeats the authority and sequence checks. This matters when registration or another telemetry update races with the earlier read. A superseded run is rejected even if its message has a later `occurredAt` timestamp. A same-run lower or repeated sequence is classified as stale or duplicate.

Timestamps remain useful for display and event meaning, but they are not sufficient concurrency control. Clocks can drift, messages can be delayed, and an old producer can report a future timestamp. Sequence and authority checks express the ordering rules directly.

## Limitations and failure cases

The current implementation protects the latest `Device` projection; it does not provide raw telemetry history or replay. It assumes the simulator contract supplies a trustworthy positive sequence per device and run. A producer that resets sequence unexpectedly under the same run ID would need a new policy. The database update also does not make process-local event delivery durable. These are separate concerns from fencing stale state.

See [`tests/telemetry-persistence.integration.test.ts`](../../tests/telemetry-persistence.integration.test.ts) for delayed old-run data, same-run ordering, and replacement-race cases.

