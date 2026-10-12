# Product and Technical Backlog

This is the living backlog for Kryos product ideas, engineering features, and technical spikes. Items are ideas, not commitments to immediate implementation. Add new ideas as they arise. When work begins, move an item to an in-progress section if useful; when complete, remove it from the active backlog or retain a short completed entry when the decision is useful context. Write implementation details and acceptance criteria when a story is ready to start. Break larger items into stories when prioritized, and update this document in the same PR as meaningful backlog changes when practical. Keep the active list concise.

## Next stories

### Fleet API pagination

- [ ] Add server-side pagination with initial page sizes of 5, 25, 50, and 100.
- [ ] Return total count, current page, and page size; enforce a maximum page size and deterministic ordering.
- [ ] Evaluate offset versus cursor pagination against expected dataset size and update patterns.

### Reusable table pagination

- [ ] Investigate pagination built into the existing Nuxt UI table and add navigation and page-size controls without unnecessary dependencies.
- [ ] Keep the controls reusable for future device-data tables.

## Subsequent stories

### Device search, sorting, and filters

- [ ] Add server-side device search, initially by unit ID, and explicitly supported sorting options.
- [ ] Make search and sorting compose correctly with pagination.
- [ ] Add server-side filters for device status, platform, zone, role, and link status. Counts should reflect active filters; preserve filters across page changes and reset pagination when filters change.

### Configurable data refresh

- [ ] Let users choose polling intervals of 30 seconds, 1 minute, or 5 minutes; consider paused and manual refresh options.
- [ ] Refresh only the current page and active query/filter criteria. Show last successful update time and indicate stale data.
- [ ] Handle overlapping requests, tab visibility, network errors, and retries deliberately.

## Technical spikes

### Live-update delivery comparison

- [ ] Compare periodic HTTP polling, Server-Sent Events (SSE), WebSockets, and other suitable change-notification approaches.
- [ ] Evaluate update latency, database load, API request volume, connection count, reconnect behavior, infrastructure complexity, and cost.
- [ ] Model realistic scenarios with 25,000 devices, 100 visible devices per user, and multiple concurrent users. Distinguish fetching the current page from streaming updates for devices actually visible.

### Geospatial platform research

- [ ] Explore PostGIS and spatial queries; open-source and paid mapping/geospatial platforms; and Nuxt/Vue integration options.
- [ ] Compare support for map markers, operational areas, geofences, and routes, including licensing, pricing, integration effort, and operational tradeoffs.
- [ ] Do not select a provider or commit to an implementation before the spike.

## Future capabilities

### Device movement simulation

- [ ] Explore a development-only simulator that moves fictional devices through routes or waypoints.
- [ ] Consider area entry/exit, route patrols, position changes over time, simulated status and telemetry updates, and historical movement/route playback.
- [ ] Keep simulated data clearly distinguishable from real telemetry.

### Device shifts and assignments

- [ ] Explore assigning devices to shifts, operational assignments, or scheduled activities.
- [ ] Resolve during design: whether a shift is a time window, roster, assignment, or combination; whether devices can have multiple scheduled shifts; how devices relate to shifts, routes, zones, and areas; and how scheduled, active, completed, and cancelled assignments are represented.
- [ ] Resolve time zones, shift boundaries, overlapping assignments, and reassignment during an active shift. Do not invent final domain rules in the backlog.

### Location tracking and shift visualization

- [ ] Explore locating an assigned device on a map, showing its current or most recently reported position, designated area, planned route, actual movement versus plan, and historical movement for a selected shift.
- [ ] Consider zone entry/exit and show the freshness and source of location information.
- [ ] Determine how position data is generated, timestamped, stored, queried, and delivered to the frontend. Do not assume the current `Device` schema is sufficient.

### Geofences and operational events

- [ ] Explore events for area entry/exit, route deviation, loss of location reporting, and shift start/end.
- [ ] Determine which events can be simulated initially and which require actual telemetry ingestion.

## Ongoing learning

### Prisma schema and migration workflow

- [ ] Continue learning through incremental Prisma schema changes: edit `schema.prisma`, validate it, generate and review migrations, and apply them only to the intended development environment.
- [ ] Inspect migration history and actual database structure; understand generated Prisma Client changes.
- [ ] Distinguish schema validation, migration status, migration application, and client generation. Never apply migrations to staging or production without explicit review and authorization.
