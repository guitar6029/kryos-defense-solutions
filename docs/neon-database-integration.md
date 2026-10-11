# Neon database integration foundation

This document describes the Prisma foundation for a future move from the JSON-backed fleet API to PostgreSQL on Neon. The schema and migration are implemented locally. A read-only catalog inventory has been run against the configured Neon `dev` branch; no database objects or records were changed. The application API still reads through JSON Server. Its handler verifies that the upstream value is an array of non-null objects with supported device statuses and returns HTTP 502 otherwise; it does not validate the remaining device fields at runtime.

The initial scope is device persistence only. Telemetry history, geospatial features, alerts, automation, and the AI assistant are future phases.

## Current fleet data flow

1. `db.json` contains the mock `fleet` collection.
2. `npm run json:server` runs JSON Server on port 3001 and exposes that collection at `/fleet`.
3. `server/api/fleet.get.ts` reads the collection from the private `jsonServerBaseUrl` Nuxt runtime config (`http://localhost:3001`) and returns it from `/api/fleet`.
4. `app/composables/useKryosFleet.ts` fetches `/api/fleet` through Nuxt Query. `KryosSystemTerminal.vue` copies the returned nodes into the Pinia fleet store, which supplies the fleet table, command controller, and computed fleet statistics.

Keep `GET /api/fleet` returning the existing `KryosNode[]` contract: `unitId`, `platform`, `status`, `zone`, `powerPct`, `link`, `lastPingmsAgo`, and `role`. The composable query key and Pinia fleet shape depend on this contract. `db.json`, JSON Server, the handler, and frontend callers remain in place through the future migration and cutover.

## Prisma foundation

Prisma is added for a typed schema/client and versioned PostgreSQL migration workflow. Prisma ORM 7 is pinned because Prisma ORM 8 is currently a release candidate and changes the CLI/schema workflow. Prisma 7.10 uses the `prisma-client` generator with an explicit output and requires a driver adapter when constructing Prisma Client. The generated client is written to the ignored root `generated/prisma/` directory so it is not part of Nuxt's application source and is not committed.

`prisma/schema.prisma` is the model source. `prisma.config.ts` supplies the Prisma CLI's schema/migration paths, explicit seed command, and selected direct datasource URL. Set `DB_ENV` to exactly `dev`, `staging`, or `production`; there is no default or fallback. The shared server-side resolver maps that selector to the matching `DATABASE_URL_<ENV>` pooled URL and `DIRECT_URL_<ENV>` direct URL. Prisma CLI schema and migration operations use the selected `DIRECT_URL_<ENV>`. Future application database access must use the selected `DATABASE_URL_<ENV>` through server-only code. The current API does not consume either URL. Keep both private; do not put them in Nuxt `runtimeConfig.public` or browser code.

The standalone fixture seed intentionally remains separate from `DB_ENV`: it reads the unsuffixed `DATABASE_URL` and retains its exact `127.0.0.1/kryos_dev` plus connected-loopback checks. Selecting `DB_ENV=dev` does not authorize seeding Neon. A Neon URL passed to the seed is rejected before writes.

### Environment selector and URL mapping

The ignored local `.env` holds the six environment-specific URLs and `DB_ENV` selects one pair. `.env.sample` lists all names with empty placeholders. `server/utils/database-environment.mjs` accepts only the exact selector values `dev`, `staging`, or `production`; it requires both selected values to be valid PostgreSQL URLs and reports missing/invalid variable names without including URL contents. It never falls back to another environment. Prisma CLI uses only the selected direct URL; the resolved pooled URL is available for future server-only application access. The current fleet API does not instantiate a database client.

Treat each selector change as a target change: verify the selected branch before running any database command. A selector name is configuration intent, not an independent authorization or safety boundary.

### Proposed initial device schema — implemented locally, not applied

The initial Prisma model maps one `Device` to the existing `devices` table. It retains `unitId` as the primary key and maps the fixed `link` object to the relational `link_status` and `signal_quality` columns. The API adapter, when separately authorized, must reconstruct `link: { status, signalQuality }`.

| Database column | Prisma field and type | API field |
| --- | --- | --- |
| `unit_id TEXT PRIMARY KEY` | `unitId String` | `unitId` |
| `platform TEXT NOT NULL` | `platform String` | `platform` |
| `status TEXT NOT NULL` | `status String` | `status` |
| `zone TEXT NOT NULL` | `zone String` | `zone` |
| `power_pct SMALLINT NOT NULL` | `powerPct Int` | `powerPct` |
| `link_status TEXT NOT NULL` | `linkStatus String` | `link.status` |
| `signal_quality SMALLINT NOT NULL` | `signalQuality Int` | `link.signalQuality` |
| `last_ping_at TIMESTAMPTZ(6) NOT NULL` | `lastPingAt DateTime` | derive `lastPingmsAgo` |
| `role TEXT NOT NULL` | `role String` | `role` |

All fields are required because the current `KryosNode` type and seven fixture records provide values. Its `status` is the persisted device status and is limited to `ONLINE`, `OFFLINE`, `MAINTENANCE`, or `DEGRADED`, matching the migration constraint. Command lifecycle values (`QUEUED`, `SENDING`, `ACKED`, `FAILED`, and `CANCELED`) belong only to `CommandStatus` and are not valid device statuses. The migration adds PostgreSQL `CHECK` constraints for the currently observed platform, device status, zone, link status, role, and 0–100 percentages. These checks are appended as SQL because Prisma Schema Language has no native `CHECK` declaration; review them in the migration alongside any schema changes. No secondary indexes are justified by the current whole-fleet query.

Persist `last_ping_at` and calculate elapsed milliseconds in the eventual server mapper. The fixture only provides `lastPingmsAgo`, so the development seed approximates a timestamp as one captured seed time minus that age. This is simulated fixture data, not historical telemetry. Each rerun resets the ping timestamps relative to its new seed time.

The `TEXT` fields (rather than native PostgreSQL enums) retain simple schema evolution, with check constraints enforcing the current device value sets. `unitId` remains the primary key because no separate immutable ID or rename flow exists today. Whether never-pinged devices should be allowed remains an API/schema decision; the initial table currently requires a timestamp to match today's non-null API shape.

## Local development setup and commands

Use a disposable local PostgreSQL database named `kryos_dev` only for the fixture seed. The environment selector variables represent Neon branches; in particular, `DB_ENV=dev` selects Neon dev and does not select a local database. The seed script checks both the unsuffixed URL target (`127.0.0.1/kryos_dev`) and the connected server's database name and loopback address, but operators must still select and verify their local disposable database.

1. Install dependencies with `npm install`.
2. Create the disposable database using local PostgreSQL administration, for example `createdb -h 127.0.0.1 -U <local-user> kryos_dev`.
3. For the separate fixture seed, set unsuffixed `DATABASE_URL` to the local `kryos_dev` URL; the seed's localhost guard remains authoritative. Keep values private and do not pass them as literal command arguments or print them. The current application API consumes none of these URLs.
4. Generate the client without connecting to a database:

   ```sh
   npm run db:generate
   ```

   Prisma CLI commands require a valid selector and both matching environment URLs through `prisma.config.ts`, even for schema-only commands. The sample selects Neon dev; client generation does not connect to that database.
5. Seed the seven fixture devices into local `kryos_dev`:

   ```sh
   npm run db:seed
   ```

   Prisma invokes `tsx prisma/seed.ts`. The seed validates each fixture, verifies the selected database and loopback server before writing, then performs all `unitId` upserts in a single transaction. Reseeding updates matching fixture rows (including simulated timestamps) and leaves unrelated rows alone. The seed does not create/delete the schema and is not a production seed.
6. Verify locally with a read-only query, for example:

   ```sh
   psql -h 127.0.0.1 -U <local-user> -d kryos_dev -c 'SELECT count(*) FROM devices;'
   ```

   This is a read-only diagnostic, not a migration or seed step. The expected fixture count is seven. Avoid putting credentials in shell history; configure local PostgreSQL authentication appropriately.

`prisma/schema.prisma` and `prisma/migrations/` are the sole schema and migration workflow; `npm run db:seed` is the sole development seed entry point. `db.json` remains the JSON Server fixture. Prisma Migrate commands are not run as part of this preparation task.

The sample environment does not configure a local Prisma Migrate target. Do not run `npm run db:migrate:dev` while `DB_ENV=dev` points to Neon; a reviewed first Neon migration should use `migrate deploy` only after separate approval.

### Read-only Neon dev inventory

On 2026-10-10, `DB_ENV=dev` selected the configured matching pooled/direct Neon endpoint pair for database `neondb`. The direct URL was unpooled, the pooled and direct URLs identified the same database and endpoint, and server metadata identified a Neon branch endpoint. The branch label `dev` comes from the explicitly selected environment mapping; the SQL metadata did not independently provide a friendly branch name.

Catalog-only queries found no tables in `public`, including no `devices` and no `_prisma_migrations` table. No application tables were found in other non-system, non-Neon-managed schemas. No application records were queried. This is a point-in-time inventory; no migration was run and the first table has not been created. The initial migration appears suitable for an empty `public` schema based on this inventory, but must still be reviewed and explicitly approved before application.

### Future Neon migration workflow (not authorized or executed)

For an explicitly approved migration, set `DB_ENV` to the intended branch and verify both matching URLs in the private environment. For the current authorized development branch, that means `DB_ENV=dev`, `DATABASE_URL_DEV` for pooled application access, and `DIRECT_URL_DEV` for Prisma CLI operations. `npx prisma migrate deploy` applies pending checked-in migrations using `DIRECT_URL_DEV`; it connects to the selected database and must only run after independently verifying the target. Do not use `prisma migrate dev` against production. Do not run `npm run db:seed` against Neon: the seed remains guarded for local `127.0.0.1/kryos_dev` only.

## Driver, runtime boundary, and future cutover

`@prisma/adapter-pg` with `pg` is selected for the Prisma 7 foundation. It works with local PostgreSQL and standard Node.js/Nitro server runtimes; it also provides a conventional PostgreSQL path for Neon. For a later serverless Nitro deployment, compare it with Prisma's Neon adapter / Neon serverless driver. Neon-specific HTTP/WebSocket transports and pooled/direct URLs have different transaction, connection lifecycle, and deployment constraints. Choose after the actual Nitro deployment target and transaction requirements are known. Migrations use the selected direct Neon connection; future application traffic should use the selected pooled endpoint. The selector/resolver is configured, but the application API does not consume it yet.

When API integration is separately authorized, keep database access behind a server-only repository used by `server/api/fleet.get.ts`; map database rows to the existing response contract and keep client code unchanged. Compare the DB-backed endpoint with fixture expectations in development before cutover. Retain JSON Server and `db.json` for a stabilization/rollback period, then retire them only after an explicitly reviewed cutover and replacement of fixture-dependent coverage.

## Security and human decisions

- Use a private server-side secret store for deployment URLs. Keep `.env` ignored; do not log or expose `DATABASE_URL_*` or `DIRECT_URL_*`. Use least-privilege application and migration roles when deployment is designed.
- The seed's loopback guard is a useful safeguard, not proof that a developer's local PostgreSQL server is disposable. Do not configure a tunnel or proxy to a remote database at the allowed loopback target.
- No Neon MCP, CLI, or cloud control-plane API was used. The configured dev database was contacted only for the read-only catalog inventory above; no schema or data changes were made.

Decisions still requiring human review before API integration or Neon use:

- Confirm the deployment runtime and select the Neon driver/transport plus pooled application and direct migration URL policy.
- Approve the required `last_ping_at` semantics, including how a device with no known ping should be represented.
- Confirm `unitId` is stable and non-reusable as the primary key and approve the fixed relational `link` mapping.
- Define which device fields are authoritative device attributes versus mutable reported state, and whether the initial endpoint is read-only.
- Approve the disposable local/Neon development environment and least-privilege role provisioning before any database operations.
- Set the JSON fixture/JSON Server retirement and rollback criteria after a future endpoint cutover.
