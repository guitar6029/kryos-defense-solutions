# Transactions, Atomicity, and Failure Recovery in Run Registration

This note focuses on the end-to-end Kryos workflow. The general locking mechanism is explained in [`transactions-and-row-level-locking.md`](transactions-and-row-level-locking.md).

## The registration workflow

`registerSimulatorRun` performs these operations inside one Prisma transaction:

1. Lock the singleton generation allocator.
2. Look up the requested run ID and return its existing active registration when the target set matches.
3. Increment the allocator for a new run.
4. Confirm that every requested `unitId` exists.
5. Create the active `SimulatorRun` record with the generation and canonical target set.
6. Assign the run and generation as authority on every target device.

Atomicity means these changes commit as one unit or none of them become visible. The goal is to avoid states such as a run record without device authority, authority pointing at a run that was never created, or an allocator advanced by a registration that failed.

## Failure recovery

If any target device is unknown, the function raises `unknown-target-device`. Because the allocator increment occurs in the same transaction, rollback restores the previous generation and no run record is created. The integration test in [`tests/telemetry-persistence.integration.test.ts`](../../tests/telemetry-persistence.integration.test.ts) verifies both facts.

If the final authority update does not affect every target, registration also fails. Database constraints provide additional protection: run generations are unique, the allocator is a singleton, and device authority stores a paired run ID and generation.

Stopping is a separate workflow. `stopSimulatorRun` marks the run stopped and clears authority only from devices that still point to that exact run and generation. It is idempotent for an already stopped or unknown run. A stopped run cannot be registered again under the same ID and its telemetry is rejected, while a later run can take authority with a new generation.

## Trade-offs and boundaries

Coordinating all registration writes in one transaction provides a clear recovery boundary, but it holds the allocator lock while validation and writes occur. The current target validation is a database lookup, so the critical section is small and understandable. For a different scale or access pattern, an atomic allocation plus retryable writes, an explicit state machine, or optimistic concurrency could be appropriate, but each would need to preserve the same invariants.

Atomic database registration does not include external work such as durable message publication or simulator process startup. Those actions need their own retry and reconciliation design. It also does not claim exactly-once processing or historical telemetry persistence; it guarantees the consistency of the run and current device-authority records managed by this workflow.

