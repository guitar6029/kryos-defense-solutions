# Race Conditions and Concurrency

## The problem

A race condition occurs when the result depends on the timing of concurrent operations. For example, two simulator registrations can both target `SIM-0001`. If both read the same generation, compute the next generation, and write later, they can select the same value or overwrite each other's authority assignment.

The same shape appears in telemetry. Two messages from one run can arrive concurrently. If both read `lastTelemetrySequence = 1` before either writes, a lower sequence could overwrite a higher one unless the write itself checks the ordering rule.

## Why checking and updating separately is unsafe

Application code that does “read the current value, decide, then update” has a gap between the read and the write. Another transaction can change the row during that gap. A JavaScript mutex would only protect one process and would not protect a second server process or a direct database client.

## Possible solutions

- A transaction plus row lock makes a contended critical section explicit. It is straightforward, but callers wait and a long transaction reduces concurrency.
- A conditional update such as `WHERE last_telemetry_sequence < $sequence` lets the database decide whether the write still applies. It avoids a broad lock, but callers must handle a zero-row result as a rejected or stale message.
- Optimistic versioning adds a version predicate and retries or reports conflicts. It scales well when collisions are uncommon, at the cost of more application logic.
- Unique constraints and check constraints reject invalid states, but constraints cannot express every business ordering rule. They are a safety net, not a complete concurrency strategy.

## What Kryos uses

Run registration locks the singleton generation allocator row in [`server/telemetry/run-authority.ts`](../../server/telemetry/run-authority.ts), so concurrent registrations serialize generation allocation and authority replacement. Telemetry persistence in [`server/telemetry/ingestion.ts`](../../server/telemetry/ingestion.ts) checks run status, generation, device authority, and the current sequence inside a transaction. Its final `updateMany` repeats the authority and sequence conditions in the database write. If another operation wins first, the update affects zero rows and the message is treated as stale.

The integration tests in [`tests/telemetry-persistence.integration.test.ts`](../../tests/telemetry-persistence.integration.test.ts) exercise concurrent registrations, same-run updates, and replacement races.

## Limitations

These protections cover the implemented PostgreSQL paths. They do not make simulator generation equal persisted throughput, provide distributed messaging, or protect code that ignores the schema and service rules. Waiting on locks can also increase latency, so the critical sections should remain small.

