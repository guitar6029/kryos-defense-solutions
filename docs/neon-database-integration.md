# Neon database integration preparation

This document records a future migration path from the current mock fleet source to Neon PostgreSQL. No database connection or migration is implemented; the current application behavior remains unchanged. Initial scope is persistence for the current device/fleet records only. Telemetry history, geospatial features, alerts, automation, and the AI assistant are future phases and are not part of this integration.

## Current fleet data flow

1. `db.json` contains the mock `fleet` collection.
2. `npm run json:server` runs JSON Server on port 3001 and exposes that collection at `/fleet`.
3. `server/api/fleet.get.ts` reads the collection from the `jsonServerBaseUrl` private Nuxt runtime config value (`http://localhost:3001`) and returns it from the app's `/api/fleet` endpoint.
4. `app/composables/useKryosFleet.ts` fetches `/api/fleet` through Nuxt Query. `KryosSystemTerminal.vue` copies the returned nodes into the Pinia fleet store, which supplies the fleet table, command controller, and computed fleet statistics.

The browser-facing API is therefore already separated from the upstream mock source. The stable contract to preserve is `GET /api/fleet` returning an array of `KryosNode` objects: `unitId`, `platform`, `status`, `zone`, `powerPct`, `link`, `lastPingmsAgo`, and `role`. The composable's `fleet` query key and Pinia's fleet shape also currently rely on those records. JSON Server remains an optional local mock and is not started by `npm run dev` automatically. `package.json` includes `json-server` and the `json:server` script; the app does not currently depend on a Neon driver.

## Proposed device schema — not yet implemented

This is a minimal proposal for the current fleet snapshot only. It does not create history tables or persist commands, telemetry events, alerts, or geospatial data.

`KryosNode` declares eight required (non-optional) fields and no explicit nullable values. The sample `db.json` has seven records, all with concrete values. Its current value sets are:

| API field | Type and observed values | Current usage |
| --- | --- | --- |
| `unitId` | `string`; `MK-1A`…`MK-1D`, `EX-1A`…`EX-1C` | Fleet table identity; command controller filters/keys devices and places the value in `targetUnitId`; store action signatures also accept it. |
| `platform` | `"MK" \| "EX"` | Rendered in fleet and command target UI. |
| `status` | `ONLINE`, `OFFLINE`, `MAINTENANCE`, `DEGRADED` in device records | Fleet filters and computed counts; rendered in fleet and command UI. The shared TypeScript `Status` union also includes command lifecycle values, but those do not occur in device records and should not be admitted as device statuses by default. |
| `zone` | `ALPHA`, `BRAVO`, `CHARLIE`, `DELTA` | Present in fleet records; a Pinia action accepts a zone for future assignment but has no implementation. |
| `powerPct` | `number`; sample range 0–100 | Used for fleet averages and shown with threshold styling in the fleet table. |
| `link` | required `LinkState` object {`status`, `signalQuality`}; status is `STABLE`, `WEAK`, or `LOST`; quality samples 0–92 | Fleet table reads both nested properties directly and styles by signal quality. No code filters or sorts by these properties. |
| `lastPingmsAgo` | `number`; sample values 120–45000 | Static relative-age values in the fixture; fleet table formats the value as seconds. There is no current ping ingestion implementation or timestamp source. |
| `role` | `SCOUT`, `SUPPORT`, `GUARD`, `HAUL` | Rendered in fleet and command target UI. |

Although the UI calls several fields device state, the repository does not define which values are immutable device attributes versus periodically updated readings. For an initial table, persist the entire current fleet snapshot per device: `platform`, `role`, `zone`, `status`, `powerPct`, link state/quality, and last-ping time. They are required in today's API type and fixture. Introduce no database defaults that silently invent values; require the writer/seed to provide all fields. If future requirements allow never-reported fields, settle nullable API semantics explicitly before relaxing the current contract.

### Proposed table and API mapping

Use one `devices` table with `unit_id TEXT PRIMARY KEY`, since it is the current domain identifier used by the UI and command target payload. This makes the identifier unique and indexed. If identifiers can be renamed or reused, approve an immutable generated key plus a unique `unit_id` before migration; current code supplies no separate ID or rename behavior.

| PostgreSQL column | Type / constraint | `KryosNode` mapping |
| --- | --- | --- |
| `unit_id` | `TEXT PRIMARY KEY` | `unitId` |
| `platform` | `TEXT NOT NULL CHECK (platform IN ('MK','EX'))` | `platform` |
| `status` | `TEXT NOT NULL CHECK (status IN ('ONLINE','OFFLINE','MAINTENANCE','DEGRADED'))` | `status` |
| `zone` | `TEXT NOT NULL CHECK (zone IN ('ALPHA','BRAVO','CHARLIE','DELTA'))` | `zone` |
| `power_pct` | `SMALLINT NOT NULL CHECK (power_pct BETWEEN 0 AND 100)` | `powerPct` |
| `link_status` | `TEXT NOT NULL CHECK (link_status IN ('STABLE','WEAK','LOST'))` | `link.status` |
| `signal_quality` | `SMALLINT NOT NULL CHECK (signal_quality BETWEEN 0 AND 100)` | `link.signalQuality` |
| `last_ping_at` | `TIMESTAMPTZ NOT NULL` if every device must have a known ping time; nullability is a human decision | Calculated to `lastPingmsAgo` in the server data-access mapping. |
| `role` | `TEXT NOT NULL CHECK (role IN ('SCOUT','SUPPORT','GUARD','HAUL'))` | `role` |

The current API has no optional or nullable fields, and every fixture supplies all values. Make the mapped device fields `NOT NULL` to preserve that contract; `last_ping_at` is the exception pending agreement on whether a never-pinged device is possible. The primary key and constrained percentage/status values guard known data invariants. These checks are intentionally ordinary `CHECK` constraints instead of PostgreSQL enum types, keeping a small prototype schema easier to evolve through SQL migrations. No secondary index is currently justified: the only request returns the whole fleet, while filtering and aggregation happen in Pinia. Add an index only with a demonstrated server-side query.

Relational columns are recommended for `link`, rather than JSONB: it is a fixed two-property object with typed finite status and numeric quality, and the UI consumes both properties directly. The server mapper can rebuild the nested object, preserving the API shape. JSONB would preserve arbitrary future link payloads more flexibly, but would weaken per-field type/range constraints and offers no current usage benefit. Revisit only if the link payload becomes genuinely variable.

Prefer storing `last_ping_at TIMESTAMPTZ` and deriving elapsed milliseconds for the response. `lastPingmsAgo` is a moving duration, not a stable persisted fact, and has no timestamp or update behavior in the current code. Derive a non-negative millisecond number on each fleet response and map it to `lastPingmsAgo`; keep the field name and numeric type unchanged for the frontend. The existing fixture values cannot reveal the original absolute times. A one-time seed can approximate each timestamp as seed time minus the fixture's millisecond age, but that makes seeded ages start at roughly the fixture values and then increase. If no real ping timestamp exists, the project must choose whether to store the supplied age snapshot instead or allow `last_ping_at` to be null; current API types do not express that nullability.

Use `TEXT` plus checks rather than native enum types for `platform`, device `status`, `zone`, `link_status`, and `role`. This avoids enum alteration friction for a small prototype schema while still validating the values observed in the declared unions and fixtures. The `Status` type is broader than device records, so the device constraint deliberately covers only the four device states currently present. Confirm before adding another state to the device set.

## Proposed migration steps

1. Review and approve the proposed device table and response mapping above, including constraints, nullability, identity, nested `link`, and last-ping semantics.
2. Keep versioned SQL files in a small `db/migrations/` sequence for schema changes. For this repository's single-table starting scope, plain SQL plus `psql` is a reasonable first approach and avoids an ORM/migration dependency; use a migration ledger (for example, a `schema_migrations` table recording applied filenames) so each version is applied once. Adopt a migration library only if multiple environments/contributors make tracking and rollback materially harder to maintain manually.
3. Load `db.json` into a development-only seed operation. Use an `INSERT ... ON CONFLICT (unit_id) DO UPDATE` keyed by the primary key for repeatable fixture refreshes, and keep the seed limited to a development/disposable database so refreshing intentionally overwrites those device snapshots. For deterministic tests, keep fixture-based checks independent of a live database. The initial timestamp conversion from `lastPingmsAgo` is an approximation (seed time minus the duration), not historical telemetry.
4. Add a server-only data access module and a database driver after confirming the target Nitro deployment runtime and query/transaction needs.
5. Configure a private Nuxt runtime key sourced from `DATABASE_URL`; keep the URL out of `runtimeConfig.public`, client bundles, logs, and committed files. Add the real value only in local ignored `.env` or the deployment secret manager.
6. Update the implementation behind `server/api/fleet.get.ts` to read from the repository module while preserving `GET /api/fleet` and its array-of-`KryosNode` response contract. Define and test error behavior before switching the source.
7. Run migration, seed, and endpoint checks against a development or disposable Neon database with dedicated, least-privilege credentials and isolated test data. Test mapping/validation, empty results, database failures, and that no credentials enter responses or logs. Keep deterministic fixture-based tests independent of cloud availability.
8. After a reviewed cutover, retain `db.json` and JSON Server during a stabilization/rollback window. Retire them only after the Neon path is the accepted source, fixture-based coverage has an intentional replacement or remains useful, and the team explicitly decides to remove the mock workflow. This preparation task does not authorize their removal.

## Connection approach and boundary

Keep database access in Nuxt/Nitro server code; the existing server route is the natural boundary, and the browser should continue to call the same app endpoint. A small server-only repository/data-access module can isolate SQL and row-to-`KryosNode` mapping from the route. For a serverless Nitro deployment, evaluate Neon’s `@neondatabase/serverless` driver first: it supports HTTP and WebSocket transports, and the HTTP query path can avoid keeping a traditional TCP pool alive between short-lived requests. It adds a dependency and its transport/API choice affects transactions and query patterns, so it should be selected only after the deployment runtime and transactional needs are known. A conventional PostgreSQL driver or pooled WebSocket connection may better fit a long-lived Node server or workflows needing multi-statement transactions, at the cost of connection lifecycle and runtime compatibility considerations.

When implemented, map a private `runtimeConfig.databaseUrl` to `DATABASE_URL` using Nuxt's runtime config convention. `.env.sample` documents the planned variable only; the current app does not read it. Never put credentials in client-visible config or source control.

## Security and decisions requiring human input

Use a server-only credential with only the permissions needed by the app and migration process; use separate credentials where practical. Keep local `.env` files ignored, never paste credentials into source or logs, and use the deployment platform's secret store. Neon MCP, if made available later, is an optional specialized database tool: Codex remains responsible for repository edits and must follow repository instructions and explicit authorization. This preparation task does not install or use MCP, authenticate, access cloud credentials, create cloud resources, or run database operations.

- Which Nitro deployment target and runtime must the connection support?
- Which Neon driver/transport is required, and will fleet operations need transactions or pooled connections?
- What schema should represent each `KryosNode`, especially whether nested `link` (`status`, `signalQuality`) is JSON or normalized columns, and whether `lastPingmsAgo` is a stored snapshot or derived from a timestamp?
- Should `unitId` remain the database primary key, or can IDs be renamed/reused such that an immutable generated key is needed?
- Is the proposed plain-SQL migration sequence and `psql` workflow sufficient, or is a migration library preferred? Should repeat seeding overwrite existing development rows as proposed?
- What should the API do for a device with no known ping time: preserve a numeric snapshot, or permit `last_ping_at` to be null and define a new API behavior?
- How long should `db.json`/JSON Server remain available after cutover?
- Is the fleet endpoint read-only for the initial migration, or are write operations in scope?
- Which development/Neon branch and disposable test database are approved, and who provisions least-privilege credentials when implementation is authorized?
