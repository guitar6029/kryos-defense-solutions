# Neon database integration preparation

This document records a future migration path from the current mock fleet source to Neon PostgreSQL. No database connection or migration is implemented; the current application behavior remains unchanged. Initial scope is persistence for the current device/fleet records only. Telemetry history, geospatial features, alerts, automation, and the AI assistant are future phases and are not part of this integration.

## Current fleet data flow

1. `db.json` contains the mock `fleet` collection.
2. `npm run json:server` runs JSON Server on port 3001 and exposes that collection at `/fleet`.
3. `server/api/fleet.get.ts` reads the collection from the `jsonServerBaseUrl` private Nuxt runtime config value (`http://localhost:3001`) and returns it from the app's `/api/fleet` endpoint.
4. `app/composables/useKryosFleet.ts` fetches `/api/fleet` through Nuxt Query. `KryosSystemTerminal.vue` copies the returned nodes into the Pinia fleet store, which supplies the fleet table, command controller, and computed fleet statistics.

The browser-facing API is therefore already separated from the upstream mock source. The stable contract to preserve is `GET /api/fleet` returning an array of `KryosNode` objects: `unitId`, `platform`, `status`, `zone`, `powerPct`, `link`, `lastPingmsAgo`, and `role`. The composable's `fleet` query key and Pinia's fleet shape also currently rely on those records. JSON Server remains an optional local mock and is not started by `npm run dev` automatically. `package.json` includes `json-server` and the `json:server` script; the app does not currently depend on a Neon driver.

## Proposed migration steps

1. Agree on a PostgreSQL schema and mapping for `KryosNode`, including constraints, nullability, and treatment of nested `link` fields.
2. Select a migration and seeding workflow. Keep `db.json` as the known fixture source during implementation and cutover; use it to seed an isolated development database or for local mock-based tests. Do not make migration correctness depend on production-like data.
3. Add a server-only data access module and a database driver after confirming the target Nitro deployment runtime and query/transaction needs.
4. Configure a private Nuxt runtime key sourced from `DATABASE_URL`; keep the URL out of `runtimeConfig.public`, client bundles, logs, and committed files. Add the real value only in local ignored `.env` or the deployment secret manager.
5. Update the implementation behind `server/api/fleet.get.ts` to read from the repository module while preserving `GET /api/fleet` and its array-of-`KryosNode` response contract. Define and test error behavior before switching the source.
6. Run migration, seed, and endpoint checks against a development or disposable Neon database with dedicated, least-privilege credentials and isolated test data. Test mapping/validation, empty results, database failures, and that no credentials enter responses or logs. Keep deterministic fixture-based tests independent of cloud availability.
7. After a reviewed cutover, retain `db.json` and JSON Server during a stabilization/rollback window. Retire them only after the Neon path is the accepted source, fixture-based coverage has an intentional replacement or remains useful, and the team explicitly decides to remove the mock workflow. This preparation task does not authorize their removal.

## Connection approach and boundary

Keep database access in Nuxt/Nitro server code; the existing server route is the natural boundary, and the browser should continue to call the same app endpoint. A small server-only repository/data-access module can isolate SQL and row-to-`KryosNode` mapping from the route. For a serverless Nitro deployment, evaluate Neon’s `@neondatabase/serverless` driver first: it supports HTTP and WebSocket transports, and the HTTP query path can avoid keeping a traditional TCP pool alive between short-lived requests. It adds a dependency and its transport/API choice affects transactions and query patterns, so it should be selected only after the deployment runtime and transactional needs are known. A conventional PostgreSQL driver or pooled WebSocket connection may better fit a long-lived Node server or workflows needing multi-statement transactions, at the cost of connection lifecycle and runtime compatibility considerations.

When implemented, map a private `runtimeConfig.databaseUrl` to `DATABASE_URL` using Nuxt's runtime config convention. `.env.sample` documents the planned variable only; the current app does not read it. Never put credentials in client-visible config or source control.

## Security and decisions requiring human input

Use a server-only credential with only the permissions needed by the app and migration process; use separate credentials where practical. Keep local `.env` files ignored, never paste credentials into source or logs, and use the deployment platform's secret store. Neon MCP, if made available later, is an optional specialized database tool: Codex remains responsible for repository edits and must follow repository instructions and explicit authorization. This preparation task does not install or use MCP, authenticate, access cloud credentials, create cloud resources, or run database operations.

- Which Nitro deployment target and runtime must the connection support?
- Which Neon driver/transport is required, and will fleet operations need transactions or pooled connections?
- What schema should represent each `KryosNode`, especially whether nested `link` (`status`, `signalQuality`) is JSON or normalized columns, and whether `lastPingmsAgo` is a stored snapshot or derived from a timestamp?
- Which migration and seed tooling should be adopted, and how long should `db.json`/JSON Server remain available after cutover?
- Is the fleet endpoint read-only for the initial migration, or are write operations in scope?
- Which development/Neon branch and disposable test database are approved, and who provisions least-privilege credentials when implementation is authorized?
