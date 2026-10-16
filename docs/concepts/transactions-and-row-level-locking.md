# Transactions and Row-Level Locking

## The problem

Run registration needs a unique generation number and must make several related changes together: create the run, validate every target device, and assign authority over those devices. Concurrent registrations must not receive the same generation or leave authority assignments inconsistent.

## Why it happens

A database transaction groups statements into one unit of work. With PostgreSQL's default `READ COMMITTED` isolation, each statement sees committed data, and a successful transaction commits all its changes together. A failed transaction rolls all of its changes back. A transaction does not automatically make every operation serial, prevent all races, or provide durable messaging after commit.

`SELECT ... FOR UPDATE` locks the selected rows. Another transaction trying to update or lock the same row waits until the first transaction commits or rolls back. In Kryos, registration runs:

```sql
SELECT current_generation
FROM simulator_generation_allocator
WHERE singleton = TRUE
FOR UPDATE;
```

The allocator has one singleton row. Locking it gives registrations a shared serialization point. The lock is held until the surrounding transaction finishes, not merely until the `SELECT` returns. The subsequent generation increment and authority updates therefore occur while that row is still locked.

## What Kryos uses

`registerSimulatorRun` in [`server/telemetry/run-authority.ts`](../../server/telemetry/run-authority.ts) uses `prisma.$transaction`. It locks the allocator, handles an existing run ID, increments the allocator, validates target devices, creates the run, and assigns device authority in one transaction. If target validation fails, the generation increment and any other writes in that transaction are rolled back. The persistence layer also uses transactions when checking run authority and advancing a device projection.

## Alternatives and limitations

An atomic `UPDATE ... RETURNING` can increment and return a counter without a separate read, but it still needs a transaction if other writes must succeed or fail with the allocation. Optimistic concurrency can avoid waiting by updating only when a version still matches, then retrying on conflict; it can be efficient under low contention but makes retry behavior more complex. Database sequences are excellent for unique numbers, but gaps are normal after rollback and a sequence alone does not coordinate device authority writes.

The allocator lock serializes registrations that use this allocator. It does not lock every device for all other operations, and it does not coordinate processes that bypass the database rules. PostgreSQL row locks are released on commit or rollback.

