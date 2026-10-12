# Neon fleet reads

The Prisma `Device` model and its committed initial migration define the fleet data contract. The Nuxt server reads the existing `public.devices` table through Prisma; it does not create, seed, or update device rows.

## Fleet read flow

1. `GET /api/fleet` calls the server-only Prisma client.
2. The Prisma client selects `DATABASE_URL_<DB_ENV>` through `resolveDatabaseEnvironment()`. `DB_ENV` must be explicitly set to `dev`, `staging`, or `production`; development work uses `DB_ENV=dev`.
3. The handler selects all `Device` rows ordered by `unitId` and returns `[]` when the table is empty. Database and contract failures return a sanitized service-unavailable response.
4. `useKryosFleet()` fetches `/api/fleet` through Nuxt Query. `KryosSystemTerminal.vue` copies the response into the Pinia fleet store, used by the fleet table, command controller, and statistics.

The Prisma-to-API mapping preserves the model fields. `lastPingAt` is serialized as an ISO 8601 timestamp; elapsed age is not derived. Link data stays flat because the model stores two independent fields.

| Prisma `Device` field | API field | Representation |
| --- | --- | --- |
| `unitId` | `unitId` | string |
| `platform` | `platform` | string validated against the supported platform values |
| `status` | `status` | string validated against the persisted device statuses |
| `zone` | `zone` | string validated against the supported zones |
| `linkStatus` | `linkStatus` | string validated against supported link statuses |
| `signalQuality` | `signalQuality` | integer percentage |
| `powerPct` | `powerPct` | integer percentage |
| `lastPingAt` | `lastPingAt` | ISO 8601 timestamp |
| `role` | `role` | string validated against supported roles |

## Database and migration safety

`prisma.config.ts` and `server/utils/database-environment.mjs` select the Prisma CLI's direct URL and the application's pooled URL from the same explicit environment. Keep both private and server-side. Never put database URLs in public Nuxt runtime configuration or browser code.

The current Prisma schema already contains every field returned by the API. This fleet read change does not add a schema migration. Do not run Prisma Migrate or seed commands against Neon as part of this task. Any future schema change or database write requires separate review and authorization.

Prisma Client is generated into the ignored `generated/prisma/` directory. Run `npm run db:generate` when regenerating it; Prisma CLI commands require `DB_ENV` and valid URLs for the selected environment, but client generation itself does not connect to PostgreSQL.

The former file-based mock fixture and its local seed workflow have been removed. The explicit development dataset described below is maintained separately and is written only by its guarded command.

## Explicit development sample data

`prisma/seed-dev.ts` contains 25 fictional sample devices and only upserts those fixed `DEV-*` unit IDs. It checks that `DB_ENV=dev`, that the selected pooled and direct URLs resolve to the same Neon database, and that the connected database identity, `public.devices` columns, and all seven checks match the committed migration before writing. It reports sanitized verification details and never prints endpoint URLs.

Run the read-only preflight first, then the explicit seed command:

```sh
DB_ENV=dev npm run db:verify:dev
DB_ENV=dev npm run db:seed:dev
```

The seed is not run by app startup, development server startup, or builds. It updates only those sample IDs and leaves all other device rows untouched. It does not apply migrations.
