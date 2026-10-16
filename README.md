# KRYOS Defense Solutions — Operations Console

KRYOS Defense Solutions is a fictional fleet-operations console and engineering sandbox. It is a portfolio project for learning and demonstrating full-stack engineering, system design, UI architecture, testing, and responsible AI integration.

> **Project status:** Work in progress. This is not a production-ready system. Device data is for development/demo use, and command workflows are not real operational controls.

## What we're building

Kryos is evolving from a UI concept into a full-stack fleet-management prototype. The longer-term direction includes:

- Fleet inventory, status summaries, and paginated device views.
- Telemetry and device-health visualization.
- Geospatial fleet views and location-based queries.
- Reliable live-update patterns where requirements justify them.
- A potential Kryos AI assistant grounded in product documentation and approved backend tools.
- A disciplined engineering workflow using automated tests, visual component review, CI, and bounded agent delegation.

These are product directions, not claims that every capability is implemented today. See the planning documents below for scope and tradeoffs.

## Current technology

- **Nuxt 4** and **Vue 3** with TypeScript.
- **Tailwind CSS 4** and **Nuxt UI**.
- **Pinia** for application state.
- **TanStack Query via Nuxt Query** for server-state fetching and caching.
- **Prisma 7** and **PostgreSQL** for server-side fleet data.
- **Vitest** for automated tests.
- **Neon** for hosted PostgreSQL development environments.

## Data and environment safety

The backend resolves its database connection from the explicit `DB_ENV` setting and environment-specific connection variables. Development seeding is guarded and intended only for the Neon development database.

- Keep credentials in your local ignored `.env` file; never commit secrets.
- Use `.env.sample` for placeholder variable names only.
- Verify the selected database environment before running database commands.
- The development seed scripts are specifically named `db:verify:dev` and `db:seed:dev`; do not use them as a substitute for understanding the target environment.
- Never run migrations, seeds, or destructive database operations against staging or production without explicit authorization and target verification.

## Local development

Requirements: a compatible Node.js/npm environment and local environment configuration for the feature you're working on.

```bash
npm install
npm run dev
```

The application runs using Nuxt's development server. Database-backed routes require valid environment configuration.

### Useful commands

```bash
npm test                 # Run the Vitest suite
npm run build            # Create a production build
npm run db:generate      # Generate the Prisma client
DB_ENV=dev npm run db:verify:dev  # Read-only verification of the dev database
DB_ENV=dev npm run db:seed:dev    # Seed the guarded dev dataset
DB_ENV=dev SIMULATOR_TARGET_DEVICE_IDS=DEV-MK-01,DEV-EX-01 npm run simulator:run
```

Only run database commands when you understand their effect and have verified the target environment. `npm run db:migrate:dev` invokes Prisma's development migration workflow; review migration guidance and the selected database before using it.

The simulator defaults to generated `SIM-0001`-style identities. To run it against the guarded development seed inventory, set `SIMULATOR_TARGET_DEVICE_IDS` to a comma-separated list of existing IDs; the simulator emits telemetry for those exact IDs and uses the list size as its fleet size. Registration fails before telemetry starts if any configured target does not exist.

### Local Docker Compose environment

Docker Compose runs the Nuxt development server and a local PostgreSQL 16 database. This is a development environment only; it is not production-ready and does not include the future simulator or any message broker.

Prerequisites: Docker Engine with Compose v2, the Doppler CLI, and access to the `kryos-defense-solutions` project and `dev` config. The Doppler config must provide `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD`. `POSTGRES_PORT` and `APP_PORT` are optional and default to `5432` and `3000`.

```bash
npm run doppler -- docker compose -f compose.yaml -f compose.dev.yaml up --build -d
npm run doppler -- docker compose -f compose.yaml -f compose.dev.yaml run --rm app npx prisma migrate deploy
```

The first command builds the app image and starts PostgreSQL plus Nuxt in development mode. `compose.dev.yaml` bind-mounts the source tree, keeps container-owned dependency and generated-output volumes, and enables polling for reliable file watching from supported host filesystems. Ordinary source edits do not require a rebuild or container restart. The wrapper supplies `DB_ENV=dev` explicitly. The app container also derives URL-encoded local Prisma URLs from `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD`. It connects through `db:5432`; host port overrides do not change that internal connection. Doppler's existing Neon URL values are not used by the local container. Run migrations after the database is healthy.

The base Compose file starts the production-style Nuxt server from the image's built `.output` directory. Use it when you want to validate the built container rather than hot reload:

```bash
npm run doppler -- docker compose up --build -d
npm run doppler -- docker compose run --rm app npx prisma migrate deploy
```

Use the development override for daily coding and the base file for production-style container checks. A Dockerfile, dependency, or lockfile change requires `--build`; ordinary source changes do not.

Open <http://localhost:3000>. The database is reachable from the host at `localhost:${POSTGRES_PORT:-5432}`. Use the existing Doppler wrapper for any separately authorized host-side development command, keeping `DB_ENV=dev` explicit.

Use the same `-f compose.yaml -f compose.dev.yaml` flags for development status and logs. `docker compose stop` stops containers while preserving the named database volume. To remove the local database data, use `docker compose down -v` only when that deletion is intentional; it does not affect hosted databases.

The app waits for PostgreSQL's health check, but the health check does not apply Prisma migrations. If PostgreSQL was initialized earlier with a different `POSTGRES_PASSWORD`, changing the Doppler value will not update the existing named volume; stop and inspect the local volume before considering any recovery action. Do not remove the volume unless deleting its local data is intentional. The current guarded `db:seed:dev` command is for the Neon development database and must not be used against this local Compose database; after migration, `/api/fleet` is expected to return an empty fleet until local fixture support is added. If the app cannot connect, inspect the resolved Compose configuration and service logs without printing credentials.

`.env.sample` remains as a placeholder reference for the supported non-Docker host workflow and does not need to be copied for Doppler-backed Docker development.

## Engineering approach

Kryos is being developed incrementally, with an emphasis on explicit API contracts, clear feature boundaries, automated verification, and avoiding premature infrastructure.

- Keep paginated table data separate from fleet-wide statistics and device-target lookup.
- Prefer server-side filtering, aggregation, and pagination for large datasets instead of loading the whole fleet into the browser.
- Choose polling, SSE, WebSockets, streaming, geospatial extensions, and other infrastructure based on requirements and measured needs.
- Use unit/component tests, visual previews, integration checks, and end-to-end tests for different kinds of confidence. Storybook and broader E2E coverage are future workflow improvements, not assumed to be configured already.
- Agents may implement bounded tasks, but their changes must be reviewed and verified before integration.

### Fleet event stream prototype

`GET /api/events/fleet` provides a process-local SSE stream. Server-side device update handlers can call `publishDeviceUpdated` from `server/utils/fleet-events.ts`; the current application has no runtime device-write handler, so no live device events are produced yet. Events use the `device.updated` name and include an ID, ISO timestamp, and one device payload. The stream sends keepalive comments and closes its subscription when the client disconnects. `Last-Event-ID` does not provide replay because there is no event store.

The publisher is in memory: a restart loses events, and separate Nitro instances do not share them. The current schema and API have no authentication or organization scope, so this prototype must not be used to deliver sensitive fleet data. Production use requires verified authentication, organization-scoped authorization, and a shared durable or explicitly lossy event transport appropriate to deployment.

## Planning documents

- [Product direction and scalability](docs/product/KRYOS-PRODUCT-DIRECTION-AND-SCALE.md) — fleet UI, large datasets, geospatial and telemetry directions, testing, delegation, and architecture tradeoffs.
- [Kryos AI assistant concept](docs/proposals/KRYOS-AI-ASSISTANT.md) — potential AI capabilities, retrieval, tool calling, evaluation, open-weight models, and a phased learning path.
- [Product and technical backlog](docs/PRODUCT-TECHNICAL-BACKLOG.md) — planned engineering work, where available in the current branch.

These documents describe possible future work; they do not mean those features are already implemented or approved for production.

## Disclaimer

KRYOS Defense Solutions is fictional. This repository is a learning and portfolio project, not an actual defense product. Any device data is sample/development data, and simulated commands must not be treated as real-world control operations.
