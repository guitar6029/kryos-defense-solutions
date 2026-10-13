# Kryos Product Direction and Scale Considerations

**Status:** Product and engineering exploration  
**Type:** Living direction document  
**Scope:** Future considerations and learning plan, not a claim of production readiness or an immediate implementation commitment.

## 1. Product direction

Kryos is a fictional fleet operations console and an engineering sandbox for learning how to design, build, verify, and evolve a multi-domain application.

Potential product areas include:

- Fleet inventory and device health.
- Device command workflows and operational history.
- Telemetry and live status.
- Geospatial views, zones, routes, and geofences.
- Device assignments and shifts.
- AI-assisted operator workflows.
- Authentication, authorization, and organizational boundaries.

These areas introduce different technical concerns. Develop them incrementally, with explicit contracts between frontend, backend, storage, and external services.

A future scale target of hundreds of thousands or potentially millions of registered devices is a design scenario—not evidence that the current application supports that scale. Device count alone is insufficient to define workload; update rates, query patterns, concurrency, freshness requirements, and retention also matter.

## 2. Fleet UI and information design

The current dark operational-console aesthetic is a starting point, not a finished large-fleet design. The interface has been exercised with a small sample dataset, so information density, navigation, aggregate metrics, and table interactions need review before it is treated as suitable for large fleets.

### Fleet-wide overview

- Show server-derived fleet totals and status breakdowns.
- Distinguish online, offline, maintenance, and other agreed domain states.
- Define the meaning of each status and avoid ambiguous badge-only communication.
- Distinguish a genuine zero from unavailable, loading, stale, or partial data.
- Display freshness or last successful update where operationally relevant.
- Make aggregate scope explicit: fleet-wide, filtered results, or current page.

### Fleet inventory table

- Preserve a compact operational style while improving readability and usability.
- Review column priority, density, alignment, truncation, responsive behavior, and accessibility.
- Provide server-side pagination and, in separate work, server-side search, filtering, and sorting.
- Use clear loading, error, empty, stale-data, and no-results states.
- Make status, power, signal quality, link status, role, zone, and last-ping information useful without overwhelming the operator.
- Consider row details or a focused device dossier for information that does not need to occupy every table row.
- Ensure command targeting is not limited to devices on the current page.

### Geospatial view

- Consider marker clustering, viewport-based loading, and aggregation rather than attempting to render every device marker at once.
- Show location freshness and distinguish current, last-known, simulated, and historical positions.
- Design for spatial search, zones, routes, and geofence events only when the underlying data and domain rules are defined.

Treat UI/UX work as a separate story from API pagination so the redesign can be reviewed deliberately.

## 3. Data contracts and correctness boundaries

Pagination changes the meaning of the devices collection: it contains only the current page.

The current paginated fleet API contract is an object with these fields:

- devices: KryosNode array for the current page.
- total: total number of matching devices for the query scope.
- page: zero-based current page.
- pageSize: requested supported page size.

Supported page sizes are 5, 25, 50, and 100.

Consequences:

- The table consumes devices for the displayed page.
- Fleet-wide statistics must not be calculated by counting the current page.
- Command target lookup must not search only the currently displayed devices.
- Summary and lookup capabilities should be provided by appropriately scoped backend interfaces.
- Keep data contracts explicit and test their semantics, not just their TypeScript shapes.

### Pagination delivery status

- **#12 — TanStack Query integration** and **#13 — Nuxt UI pagination controls** were delivered together in **PR #18**.
- The fleet table uses a typed paginated response containing the current page's devices plus total, page, and page-size metadata. Supported page sizes are 5, 25, 50, and 100.
- The API uses deterministic server-side pagination. The current page is not the complete fleet.
- Keep fleet-wide summaries and command target lookup separate from the table's current-page data. A dedicated backend story should define their semantics, authorization scope, and tests before implementation.
- The table's visual density and responsive column sizing remain candidates for a separate UI/UX review; do not bundle that refinement into backend pagination work.

## 4. Scale concerns and candidate approaches

These are options to evaluate against actual workloads, not a list of infrastructure to adopt immediately.

| Concern | Initial direction | Revisit when evidence supports it |
|---|---|---|
| Fleet inventory | PostgreSQL, Prisma, deterministic server-side pagination | Query plans, indexing, query tuning, caching |
| Fleet summary | Server-side aggregates over defined semantics | Precomputed/materialized summaries if measured load warrants them |
| Device lookup | Indexed, permission-scoped server-side lookup | Dedicated search infrastructure only if needed |
| Live updates | Polling while freshness requirements are modest | SSE or WebSockets based on interaction, latency, connection count, and operational needs |
| Telemetry history | Define event shape, rate, retention, and query patterns first | Time-series capabilities or dedicated storage |
| High-volume ingestion | Simple controlled ingestion path for early experiments | Managed messaging or event-streaming platform when throughput, buffering, replay, or fan-out require it |
| Geospatial | Evaluate PostGIS and mapping options when location requirements are defined | Specialized geospatial services if requirements justify them |
| AI | Small evaluated prototype with curated documentation and controlled tools | RAG infrastructure, open-weight inference, fine-tuning, or model hosting only when justified |

Do not infer that one million registered devices means one million simultaneous updates per second. Model separate workloads for registration, telemetry ingestion, live delivery, table queries, summary queries, historical analysis, and map viewport queries.

## 5. Live-update design questions

Before selecting polling, Server-Sent Events (SSE), WebSockets, or a messaging platform, clarify:

- Required freshness and end-to-end update latency.
- Number of connected operators and devices actually visible to each operator.
- Telemetry ingestion rate, burstiness, and payload size.
- Whether communication is primarily server-to-client or bidirectional.
- Whether updates may be coalesced or dropped, or must be durably retained.
- Reconnect, duplicate, ordering, backpressure, and stale-data behavior.
- Database and application load, connection limits, and infrastructure cost.
- Whether the UI needs latest state, every historical event, or both.

A live connection does not replace durable storage. Define which data is persisted and which is merely a notification or transient update.

## 6. Geospatial design questions

A future discovery story should compare PostGIS and relevant mapping/geospatial options rather than prematurely choosing a vendor.

Investigate:

- Point representation, coordinate reference systems, and distance semantics.
- Spatial indexes and viewport/bounding-box queries.
- Geofences, area entry/exit, route planning, and route deviation.
- Marker clustering and rendering strategies for large device counts.
- Historical positions, timestamp semantics, location freshness, and retention.
- Mapping provider licensing, pricing, API limits, offline needs, and integration with Nuxt/Vue.
- Compatibility and cost constraints of the chosen PostgreSQL hosting environment.

Do not assume the current device schema is sufficient for historical location, route, or shift workflows.

## 7. Verification and engineering leverage

The number of feature areas makes it unrealistic for one person to manually inspect every implementation detail. The goal is not to remove review, but to make delegated work bounded and verifiable.

### Vitest

Use focused unit/component tests for parsing, validation, state transitions, composables, query-key behavior, pagination boundaries, and error handling.

### Storybook

Evaluate the official Nuxt Storybook integration as a separate tooling task. Use stories to inspect reusable UI states independently: populated tables, loading, errors, empty results, long identifiers, large counts, badges, and responsive layouts. Verify compatibility with the current Nuxt version before installing.

### End-to-end tests

Use a small number of critical user journeys to verify actual integration, such as opening the fleet, changing pages, filtering/searching when supported, inspecting a device, and seeing correct loading/error behavior.

### CI and review

- Run relevant tests and a production build in CI.
- Review diffs and test evidence, not just agent summaries.
- Define acceptance criteria and shared contracts before parallel implementation.
- Require agents to report changed files, assumptions, tests run, failures, and limitations.
- Use isolated branches/worktrees for parallel tasks and integrate deliberately.
- Keep security boundaries, permissions, and data semantics in human-reviewed acceptance criteria.

Test coverage is a tool for confidence, not a target of 100% by itself. Prioritize boundaries where errors could cause incorrect statistics, unauthorized commands, data leakage, or misleading operational status.

## 8. Incremental delivery and learning sequence

1. Define and implement fleet-wide summaries and server-side device lookup, including authorization and query scope.
2. Create a dedicated fleet UI/UX review story based on realistic large counts, representative states, and responsive table behavior.
3. Investigate device search, filtering, sorting, and refresh semantics as separate stories.
4. Introduce Storybook after verifying Nuxt compatibility; expand Vitest and add a small E2E suite around critical workflows.
5. Run a live-update comparison using defined workload assumptions before choosing SSE or WebSockets.
6. Investigate geospatial data, PostGIS, and mapping tools before selecting a provider.
7. Prototype AI assistance separately, beginning with curated documentation and evaluation before adding live tools or model customization.
8. Add load/performance experiments as query, ingestion, concurrency, and freshness requirements become measurable.

## 9. Decision principles

- Build only what the product needs; reuse managed services and established libraries where appropriate.
- Avoid premature infrastructure, expensive commitments, and dependency sprawl.
- Keep the database authoritative for persisted state and the backend authoritative for permissions and business rules.
- Prefer explicit contracts, measurable requirements, and reproducible tests over assumptions.
- Distinguish a learning prototype from a production-ready capability.
- Record material decisions and revisit them when workload measurements or product requirements change.

## 10. Open product and engineering questions

- Which operators, roles, and organizational boundaries must the product support?
- What are the most important fleet overview metrics and how are they defined?
- Which device fields are essential in the table versus a details view?
- What are the expected device counts, update rates, concurrent users, and freshness targets?
- Which commands and target-selection rules exist, and how should they be authorized?
- What location data is available, how often is it updated, and how long is it retained?
- Which workflows should be real-time, historical, simulated, or AI-assisted?
- What performance and cost budgets should guide each experiment?

This document is a direction-setting reference. Convert individual ideas into scoped issues with acceptance criteria when they are ready to be prioritized; do not treat every item as committed implementation work.
