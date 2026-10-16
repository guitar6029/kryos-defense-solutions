# Idempotency and Retries

## The problem

Clients, workers, and network layers may retry after a timeout even when the original request succeeded. Without an idempotency rule, retrying simulator run registration could allocate a second generation, replace authority again, or create confusing duplicate state.

Idempotency means that repeating the same logical request has the same intended effect as performing it once. It does not mean every retry returns the same transport response or that every operation in a system is duplicate-safe.

## What Kryos uses

`registerSimulatorRun` treats `runId` plus its target device set as the registration identity. It canonicalizes targets by sorting them and stores a hash. If the run already exists with the same targets and is active, registration returns the existing generation without allocating a new one. Sorting means the same set in a different input order is still the same request.

If the same run ID is reused with different targets, Kryos rejects it with `run-id-target-mismatch`. If the run is stopped, it rejects the request with `stopped-run`; a retry cannot silently reactivate it. A new run ID is required to establish new authority and receive a newer generation. The existing-run check and allocation happen inside the transaction described in [`transactions-and-row-level-locking.md`](transactions-and-row-level-locking.md), so concurrent retries use the same serialized decision.

Telemetry has a related but separate rule. For the current device projection, the persistence layer recognizes a repeated message as a `duplicate` when the run and message ID match the already persisted message. A same-run message at an already-used or lower sequence is otherwise `stale`. This is idempotent current-state advancement, not a promise that Kryos stores an append-only copy of every accepted message: the current schema stores the latest projection and sequence on `Device`, not a telemetry history table.

## Trade-offs and failure cases

The run ID must be stable across retries and should be unique for a genuinely new run. Hashing the target list detects accidental reuse, but it is not a general request-body idempotency system. A lost response can still require the caller to retry and inspect the returned existing registration.

The database transaction protects registration state, but it cannot undo an external side effect performed before commit. Likewise, a process-local event publication after telemetry persistence cannot make the database rollback if publication fails. The ingestion code deliberately treats database state as committed and catches publication failure separately.

Use idempotent commands for operations that callers reasonably retry. Use a separate deduplication key and retention policy when the requirement is duplicate-safe event or telemetry history rather than only a correct current projection.

