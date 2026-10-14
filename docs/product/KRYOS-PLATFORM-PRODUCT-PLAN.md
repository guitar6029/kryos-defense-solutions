# KRYOS Platform Product Plan

Status: milestone one implemented on 2026-10-14 for review. This is a living plan, not a claim that the roadmap is implemented.

## Product direction

Kryos has two distinct experiences:

1. The public marketing website explains Kryos, the platform, and product concepts using the existing marketing navigation and layout. It links visitors to the platform.
2. The Kryos Platform is a separate SaaS-style application experience with a platform layout, workspace navigation, overview, and feature workflows. Authentication is deferred for this milestone, so the current workspace is explicitly a demo/sample-data experience.

The platform is the primary software product. The Kryos Multirotor remains a conceptual hardware product. No physical hardware, aircraft telemetry, or control path is integrated with the software.

## Status by area

### Implemented and verified in the repository

- Public routes and marketing layout remain available, including `/`, `/platform`, `/products`, and `/about`.
- `/systems` remains available with its existing terminal-style interface, fleet search/filter controls, pagination, command UI, and dossier UI.
- `GET /api/fleet` is a paginated, filterable fleet read path backed by the existing Prisma data layer. Its response is mapped to the `KryosNode` read model.
- A process-local SSE prototype exists at `GET /api/events/fleet`. It publishes `device.updated` events, sends keepalives, and cleans up subscriptions when the connection closes. There is no replay or durable event store.
- `/app` now provides a distinct platform shell and overview. Its metrics use the existing `/api/fleet` query and label page-level/sample-data limits.
- `/app/fleet` reuses the existing fleet composable, criteria handling, filters, table, pagination, loading/error/empty feedback, and API contract.
- `/app/zones`, `/app/notifications`, `/app/settings`, and `/app/sign-in` establish route boundaries with explicit future/empty states. They do not claim capabilities that do not exist.

### Currently in progress

- This platform-shell milestone is implemented and awaiting product-owner review. No authentication, organization scope, production notification history, zone reporting, or fleet-wide aggregation work is in progress in this repository.

### Proposed, not implemented

- Authentication and authenticated workspace sessions.
- Organization membership, authorization, and role-based access control.
- A fleet-wide summary endpoint separate from paginated device records.
- Durable notifications/event history and a production-grade event transport.
- Zone overview, maps, geofencing, and reporting.
- Device detail routes and richer device-health/telemetry workflows.
- Billing, subscriptions, and workspace administration.
- Live hardware integration, aircraft control, telemetry ingestion, AI assistants, and distributed infrastructure.

### Decisions requiring product-owner approval

- Whether `/app/fleet` should become the canonical fleet route and `/systems` should eventually redirect, remain as a legacy experience, or be retired in a separately approved migration.
- The intended authentication provider and the organization/membership model.
- Whether the product needs durable event history, replay semantics, and cross-instance delivery before expanding notifications.
- Which fleet-health aggregates, zone reports, and notification priorities are required for a first production-oriented dashboard.

## Initial platform information architecture

| Route | Purpose | Current state |
| --- | --- | --- |
| `/app` | Platform overview | Implemented with verified fleet read-model metrics and honest unsupported-feature states. |
| `/app/fleet` | Fleet/device management | Implemented by reusing the current query, filters, table, and pagination. |
| `/app/fleet/:id` | Device details | Proposed; no device-detail route is implemented yet. |
| `/app/zones` | Zone overview and future reporting | Route placeholder only; current data has zone labels but no reporting source. |
| `/app/notifications` | Notifications and event history | Route placeholder only; the current SSE stream is not durable history. |
| `/app/settings` | Future workspace settings | Route placeholder only; membership and authorization are deferred. |
| `/app/sign-in` | Future authentication entry point | Route placeholder only; no sign-in or registration exists. |

Existing marketing routes continue to use the public layout. `/systems` remains backward compatible and is linked from the public navigation and the new fleet page. A future migration should first measure usage and confirm parity, then choose redirect/legacy behavior in an approved story; this milestone does not silently remove or redirect it.

## Dashboard concept and data ownership

The eventual overview is expected to include the following widgets:

| Widget | Intended purpose | Source of truth | Availability now | Status |
| --- | --- | --- | --- | --- |
| Fleet health/counts | Show total fleet and health distribution | A future fleet summary API, not a paginated page | Only total and page-level derived values are available from `GET /api/fleet` | Partial, deliberately labeled |
| Devices needing attention | Surface records needing review | Future server-defined health/attention rules | Current page can identify non-`ONLINE` records | Partial, page-level only |
| Recent notifications/events | Show important recent activity | Future durable notification/event history | No suitable history source exists; SSE is process-local | Empty/forthcoming state |
| Zone summaries/reports | Link operational context to zones | Future zone/reporting API | Device rows contain zone labels only | Forthcoming |
| Recently active devices | Show recent device activity | Future query based on activity semantics | `lastPingAt` exists on device rows, but no dedicated activity query exists | Forthcoming |

The first milestone does not fabricate aggregate metrics. Remote data remains owned by the existing Nuxt Query composable and `/api/fleet`; no duplicate store or new state-management library was introduced.

## Architecture decisions

### Layouts and route boundaries

The public site keeps `default.vue`, while the legacy terminal experience keeps `systems.vue`. The new `app.vue` layout owns platform workspace navigation and account/workspace labeling. Nested `/app/*` pages use that layout. This makes the product boundary visible without coupling the marketing navigation to authenticated product concerns.

### API data ownership and caching

`useKryosFleet` remains the client entry point for fleet reads and uses Nuxt Query caching with the existing query key, 60-second stale time, and no focus refetch. `/app` uses the same composable; `/app/fleet` reuses it directly. A separate summary endpoint should be added only when dashboard requirements justify server-side aggregation.

### Search, filtering, and pagination

Search and filters are normalized in `useKryosFleet`/`useKryosFleetCriteria`, validated by the server handler, and passed to Prisma with pagination. The new route does not load the whole fleet or create a second filter implementation. Existing boundary tests cover malformed queries, filtering, pagination, empty results, and unavailable data.

### SSE lifecycle and event handling

The current stream is process-local and publishes updates from in-memory subscribers. It sends a connection comment and periodic keepalives, removes listeners on close/error, and has no replay because there is no event store. It must not be presented as durable notification history. Production work requires an explicit decision about authentication, organization scope, replay, cross-instance delivery, and loss/reconnect behavior.

### Organization scope and future membership

The current schema/API has no organization scope or authenticated user boundary. Future organization-scoped queries must be enforced server-side and carried through the data model/API contract; client route separation alone is not authorization.

### Authentication and authorization

Authentication, registration, membership, RBAC, and account settings are intentionally deferred. The platform shell uses a clearly labeled demo workspace and placeholder account area so the UI does not imply a real session.

### Testing and CI expectations

Vitest is the configured test runner. Existing tests cover fleet contracts, pagination, criteria, feedback, and SSE behavior. This milestone should retain those tests and add focused route/component coverage when the repository has suitable Vue component test tooling. There are currently no lint or type-check scripts in `package.json`; `npm test`, `npm run build`, and `npm run generate` are the relevant available application checks.

## Next reviewable stories

1. Add focused route/component tests for the platform shell, overview states, and `/app/fleet` reuse.
2. Decide whether a server-side fleet summary contract is needed for dashboard aggregation.
3. Define the `/app/fleet/:id` read contract and device detail acceptance criteria.
4. Product-owner decision on authentication and organization scope before implementing sign-in or settings.
5. Product-owner decision on durable notifications before extending the SSE prototype.
