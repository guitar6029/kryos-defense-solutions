# Kryos Defense Solutions — Fleet Simulation and Event Architecture Research

**Status:** Research-only recommendation
**Repository basis:** `platform/research-fleet-simulation-event-driven`
**Scope:** Initial 100-device simulated fleet, five-second telemetry, local Docker Compose target, no geospatial prerequisite, `/systems` excluded

## 1. Executive summary

Kryos has a useful read-side foundation, but it does not yet have a device-operations platform. The repository currently contains a PostgreSQL/Prisma `Device` record, a validated paginated fleet read API, a Nuxt Query client, and a process-local SSE prototype. It does not contain a runtime telemetry writer, telemetry history, assignments, shifts, faults, maintenance records, durable events, authentication, organization scope, Docker Compose configuration, or a live frontend event consumer. The report treats those gaps as design work, not as implemented capabilities.

The recommended first build is a single-process, deterministic TypeScript simulator that owns 100 logical devices and emits a versioned telemetry envelope every five seconds. A server-side ingestion service should validate the envelope, persist raw telemetry and the current device projection in one PostgreSQL transaction, derive business events, and publish a durable notification after commit. The existing Nuxt application can initially consume a server-side SSE projection; the SSE layer should be backed by a database/outbox-driven publisher rather than the current in-memory set.

Kafka is not required to demonstrate the first vertical slice. At 100 devices and a five-second interval, the nominal load is 20 telemetry messages per second, or 1,728,000 messages per day before retries and additional event types. That is meaningful enough for backpressure, idempotency, stale-device detection, and observability exercises, but not enough by itself to justify operating Kafka locally. Kafka becomes justified when Kryos needs independently scalable consumers, replay across a durable retention window, multiple simulator instances, or measured throughput/lag that the database-backed boundary cannot meet.

The first useful story should be:

> Run 100 deterministic simulated devices; ingest and validate their telemetry; atomically store raw telemetry and current state; derive online/stale/low-battery events; publish a durable update; and show the updated device in the existing fleet UI.

Build this as a vertical slice before assignments, route planning, charging-hub logic, geospatial rendering, real-device protocols, or Kafka. Keep future coordinates, routes, zones, and charging hubs as optional contract extensions, not prerequisites.

## 2. Current-state repository assessment

### 2.1 Implemented

| Area | Evidence | Assessment |
| --- | --- | --- |
| Web application | `package.json:19-43`, `nuxt.config.ts` | Nuxt 4/Vue 3/TypeScript with Nuxt UI, Pinia, Nuxt Query, Tailwind, Prisma, PostgreSQL, and Vitest. |
| Device persistence | `prisma/schema.prisma:10-21` | One `Device` model mapped to `public.devices`; primary key is `unitId`. Current fields are platform, status, zone, power, link status, signal quality, last ping, and role. |
| Database migration | `prisma/migrations/20261010000000_create_devices/migration.sql:5-27` | One table with PostgreSQL types and seven check constraints. There are no telemetry, event, assignment, shift, fault, maintenance, notification, or outbox tables. |
| Fleet read API | `server/api/fleet.get.ts:27-84` | Server-only Prisma read, validated filters, offset pagination, stable `unitId` ordering, and sanitized 503 handling. There is no write or ingest endpoint. |
| Browser fleet query | `app/composables/useKryosFleet.ts:9-42` | Nuxt Query fetches `/api/fleet`, caches by page/size/filter, and does not subscribe to live events. |
| Fleet UI | `app/pages/app/fleet.vue:11-27` | The app page renders paginated records and filters. It describes the data as existing sample fleet data. |
| Process-local SSE | `server/api/events/fleet.get.ts:10-57`, `server/utils/fleet-events.ts:3-34` | `GET /api/events/fleet` sends `device.updated`, heartbeat comments, and cleanup on close. IDs are a process-local counter; no replay or durable publication exists. |
| Tests | `tests/*.test.ts` | Vitest coverage exists for contracts, pagination, fleet feedback, dashboard helpers, and SSE formatting/lifecycle. No end-to-end telemetry ingestion test exists. |
| Development seed | `prisma/seed-dev.ts` | Guarded development-only verification/seed workflow for 25 fixed sample rows. It is not a simulator and does not run at application startup. |

### 2.2 Partial foundations and placeholders

- `app/stores/kryosFleet.ts:10-16` declares `ingestPing`, `flagDegraded`, `assignZone`, and `scheduleMaintenance`, but each function body is empty. These are placeholders, not implemented domain behavior.
- `server/utils/fleet-events.ts:14-24` has a publish API, but the comment explicitly limits it to a single process. No current runtime write handler calls it. `README.md:73-77` documents the same limitation.
- The schema stores `lastPingAt`, but does not store a client timestamp, sequence number, event ID, heartbeat timestamp, receive timestamp, or telemetry history. A stale-device rule cannot be reconstructed reliably from history.
- `zone` is currently a required enum-like text field. This is a display/partitioning concept, not a geospatial model. No latitude/longitude, route, polygon, charging hub, coordinate reference system, or map integration is implemented.
- The current store statistics operate on the loaded `fleet` array. They are not fleet-wide database aggregates when the UI is paginated.

### 2.3 Explicitly absent

- No `docker-compose.yml`, `compose.yaml`, Dockerfile, or container orchestration configuration was found.
- No `.github` workflow or CI configuration was found in the repository file inventory.
- No Kafka, MQTT broker, Redis, WebSocket, Web Worker, job queue, or external simulator dependency is present in `package.json`.
- No authentication or organization/tenant authorization is present in the fleet schema or routes. The SSE prototype must not be treated as a production data boundary.
- No application-level database migration strategy exists for telemetry or events beyond the current Prisma migration workflow; a future change should continue the committed migration convention.

### 2.4 Development workflow and checks

`package.json:5-17` defines `npm run dev`, `npm test`, `npm run build`, `npm run generate`, Prisma generation/migration, and guarded database verification/seed commands. There are no lint or type-check scripts. The repository instructions identify `npm test`, `npm run build`, and `npm run generate` as the relevant application checks. Database commands were not run for this research task.

## 3. Research method and source quality

The recommendations below prioritize official documentation, project repositories, protocol specifications, and vendor documentation. Marketing pages are used only to identify workflows that are also corroborated by technical documentation. Product capabilities are not treated as Kryos capabilities. The sources were reviewed on 2026-10-14; tool versions and hosted product behavior can change.

## 4. Simulation technology comparison

### 4.1 Candidate comparison

| Candidate | What it actually simulates | TypeScript/Node integration | Operational and Docker cost | License / commercial note | 100-device fit now | Future geospatial value | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kryos custom simulator using plain TypeScript timers plus a pure state machine | Logical device lifecycle, telemetry generation, battery, connectivity, faults, assignments, and deterministic time. It does not claim flight physics or collision realism. | Native; the simulator can call an internal ingestion interface or HTTP endpoint. No foreign runtime required. | One Node process and one container. Easy to run with Compose. Must implement scheduling, seeded randomness, clock injection, and backpressure. | Project code is Kryos-owned; any added library must be reviewed separately. | Excellent. 100 devices at 5 seconds is only 20 messages/second nominally. | Good if contracts keep location/routes optional; the engine can later emit coordinates without making them mandatory. | **Use first.** It directly tests the platform behavior Kryos needs to learn. |
| [Eclipse SUMO](https://sumo.dlr.de/docs/) + [TraCI](https://sumo.dlr.de/docs/TraCI/) | Microscopic, continuous traffic and mobility simulation on a road/network model. TraCI lets an external client inspect and manipulate a running simulation; libsumo can embed the API. | Official clients are strongest in Python, C++, Java, and related bindings; Node would normally use a separate Python service or a community bridge. | Additional simulator process, network/route files, scenario authoring, and likely Python/Java tooling. Headless Docker is feasible, but scenario/debugging cost is substantial. | SUMO documentation states EPL 2.0, with secondary licensing conditions. Review current distribution terms before redistribution. | Technically capable, but disproportionate for non-geospatial telemetry/state testing. | Strong when road-network movement, route choice, traffic interactions, or coordinate truth becomes a real requirement. | **Defer.** Reconsider for a later mobility scenario, not the first slice. |
| [Gazebo Sim architecture](https://gazebosim.org/docs/harmonic/architecture/) | Physics, sensors, rendering, and robot-world interaction through systems/plugins and an entity-component model. It is a robotics simulator, not an operations-domain event processor. | Primarily C++/ROS-oriented; external processes communicate through Gazebo Transport or ROS. Node integration implies a bridge or custom plugin/process. | Heavy images, rendering/physics resources, model/world assets, and middleware. Headless operation is possible, but local Compose is no longer a small stack. | Gazebo is open source, but versioned libraries, plugins, and ROS distributions must be reviewed together. | Overqualified unless sensor/actuator physics is the learning objective. | Strong for robotics dynamics and sensor realism; weak as a fleet-management persistence/event architecture. | **Defer.** Use only for a separate robotics/physics experiment with a clear acceptance criterion. |
| [Eclipse MOSAIC](https://eclipse.dev/mosaic/) | Multi-domain, multi-scale co-simulation: application, traffic, and communication models coupled through federates. It is aimed at connected and automated mobility. | Java-based framework; the official getting-started guide requires a Java runtime and commonly SUMO. Node would be an external integration, not the primary development path. | Multiple simulators/federates, Java, scenario configuration, logs, and optional network simulators. | Eclipse Public License 2.0 per the project site. | Possible, but excessive for 100 logical devices sending application telemetry. | Valuable if Kryos later studies communication/network behavior together with mobility. | **Defer.** Keep as a research option for network/co-simulation work. |
| [AWS IoT Device Simulator](https://github.com/aws-solutions/iot-device-simulator) | Cloud-connected virtual IoT devices that publish test data to AWS IoT and can model many device instances. The repository currently carries a deprecation notice dated 2025-01-29. | AWS IoT SDKs and cloud-specific services; not a local, vendor-neutral platform boundary. | Cloud deployment and AWS account resources; it is not aligned with the local PostgreSQL/Compose target. | Repository identifies Apache-2.0, but the solution is deprecated and AWS-specific. | It could generate load, but adds cloud coupling and is not the right first tool. | Limited for Kryos domain behavior; it tests cloud connectivity more than fleet operations. | **Do not adopt.** Use its patterns as evidence for configurable device counts/frequencies only. |
| [ThingsBoard device model](https://thingsboard.io/docs/user-guide/devices/) and [telemetry HTTP API](https://thingsboard.io/docs/reference/http-api/telemetry/) | A mature IoT platform model: devices/virtual devices, attributes, time-series telemetry, dashboards, RPC, rules, and alarms. | HTTP/MQTT and REST APIs make it easy to drive from Node, but adopting it would replace a large part of Kryos's learning surface. | Additional platform, database, configuration, and operational boundary. Docker support exists in its ecosystem, but it is not a small library. | Community and commercial editions have separate terms; verify the edition and license. | More than capable, but too much product surface for the first Kryos slice. | Useful as a reference or later integration target, not as Kryos's domain model. | **Study, do not embed.** Borrow alarm lifecycle, device profile, telemetry timestamp, and API ideas. |

### 4.2 Decision

Kryos should implement a small simulation kernel rather than adopt a physical simulator. The required realism is operational: deterministic state transitions, stale telemetry, battery depletion, charging, fault injection, assignment completion, restart behavior, and measurable throughput. None of those require a road network, rigid-body physics, rendering, or a wireless propagation model.

The custom engine should be a pure module with an injected clock and seeded random source. A thin runner should schedule ticks; an adapter should translate state snapshots into the telemetry contract; and the ingestion service should remain independent. This keeps the door open to a future SUMO/Gazebo adapter without coupling the business rules to a simulator API.

## 5. Comparable platforms and recurring operational patterns

The following public systems are reference points, not implementation claims about Kryos.

| Source | Publicly documented pattern | Kryos implication |
| --- | --- | --- |
| [AWS IoT Core documentation](https://docs.aws.amazon.com/iot/) and [device SDKs](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sdks.html) | Device connectivity, MQTT/HTTPS, shadows, jobs, and integrations are distinct concerns. SDKs support device-side protocols while cloud APIs manage device state and operations. | Keep simulator identity, telemetry, current state, and future command/job workflows separate. Do not make a UI record double as a raw message log. |
| [AWS IoT Device Simulator repository](https://github.com/aws-solutions/iot-device-simulator) | Simulation is configured by device count, duration, frequency, topic, and data set; the repository now warns that the solution is deprecated. | Make count, interval, duration, seed, and fault profile explicit simulator configuration, while keeping the implementation local and vendor-neutral. |
| [ThingsBoard devices documentation](https://thingsboard.io/docs/user-guide/devices/) | Devices can be real or virtual, report telemetry/attributes, respond to RPC, belong to profiles, and feed dashboards/rules/integrations. | Distinguish identity/configuration from latest state and time-series telemetry. Define profile-like device configuration without cloning a whole IoT platform. |
| [ThingsBoard alarms](https://thingsboard.io/docs/user-guide/alarms/) | Alarms have originator, type, severity, lifecycle, assignee, acknowledgment, clearing, comments, and history. Inactivity can be an alarm trigger. | Model derived alerts as durable lifecycle records, not transient UI toasts. Start with low battery, stale telemetry, link loss, and fault conditions. |
| [ThingsBoard REST API](https://thingsboard.io/docs/reference/rest-api/) | Telemetry, entity queries, alarms, RPC, and real-time WebSocket subscriptions are separate API concerns. | Avoid one oversized `/api/fleet` response. Add bounded telemetry, event, alert, and live-update contracts with distinct read models. |
| [Open-RMF fleet integration](https://openrmf.readthedocs.io/en/latest/interfacing/index.html) | Fleet managers expose a narrow integration surface: fleet state, destination requests, mode requests, and path requests. Fleets may support different levels of control. | Design future assignment/command contracts around capability boundaries. Observation-only devices should remain valid; not every device needs every command. |
| [Open-RMF Python fleet adapter](https://github.com/open-rmf/rmf_ros2/tree/main/rmf_fleet_adapter_python) | A fleet adapter registers fleets and robots, accepts tasks, provides task-planner parameters, and accounts for battery behavior. | Treat assignment and task acceptance as domain workflows, not as fields appended to a device row. Battery policy belongs in the simulator/domain service. |
| [VDA 5050 specification](https://github.com/VDA5050/VDA5050) | A standardized order/state/event interface for automated mobile robots separates orders from state and supports vendor-neutral integration. | Use separate command/assignment and state/telemetry envelopes. Do not copy the full protocol until a real interoperability requirement exists. |
| [DJI FlightHub 2 product documentation](https://enterprise.dji.com/flighthub-2) | Public product material centers on fleet/mission coordination, live operational awareness, and connected aircraft workflows. | Validate workflows such as inventory, mission assignment, live state, and history, but do not infer protocol or persistence details that the public page does not specify. |
| [FlytBase platform documentation](https://docs.flytbase.com/) | Public documentation describes enterprise drone operations around fleet, mission, integrations, and telemetry-oriented workflows. | Use as a workflow comparison only; map claims to documented pages before turning them into requirements. |
| [DroneDeploy flight documentation](https://help.dronedeploy.com/hc/en-us) | Public help material covers planning, executing, and reviewing drone flights and captured data. | Separate a mission/shift lifecycle from device health and raw telemetry; flight history is an operational record, not merely the latest device row. |
| [Auterion documentation](https://docs.auterion.com/) | The platform documentation covers connected vehicle software, mission/vehicle operations, and integrations across an ecosystem. | Keep external integrations behind adapters and avoid embedding vendor-specific concepts in the core telemetry model. |
| [Eclipse Ditto documentation](https://eclipse.dev/ditto/) | Digital twins expose a managed representation of connected things, with state/feature separation and event-driven updates. | A future device projection can expose stable features while raw telemetry remains an append-only history. |
| [OpenTelemetry documentation](https://opentelemetry.io/docs/) | Traces, metrics, and logs are separate observability signals with common context propagation. | Instrument simulator tick latency, ingest latency, validation failures, DB commit latency, event lag, SSE clients, and stale-device counts from the first slice. |

### Recurring patterns worth adopting

1. Device inventory, configuration, current state, time-series telemetry, commands/jobs, alerts, and audit history are separate concepts.
2. Connectivity and freshness are first-class operational signals. “No message” is itself an event after a policy-defined threshold.
3. Alerts have lifecycle and ownership: active, acknowledged, cleared, and historically queryable.
4. Fleet integrations expose narrow capabilities. Observation, assignment, pause/resume, pathing, and command execution need not be all-or-nothing.
5. A live UI is a projection of server state; it should not become the source of truth.
6. Device-side time and server receive time must both be retained when ordering and freshness matter.

## 6. Recommended architecture

### 6.1 Initial local topology

```text
┌──────────────────────────────┐
│ simulator (one Node service) │
│ 100 logical devices          │
│ injected clock + seed        │
└──────────────┬───────────────┘
               │ telemetry envelope
               v
┌──────────────────────────────┐
│ Nuxt/Nitro ingestion boundary │
│ validate → dedupe → transact  │
└──────────────┬───────────────┘
               │ one DB transaction
               v
┌──────────────────────────────┐
│ PostgreSQL                    │
│ device projection             │
│ telemetry history             │
│ domain events / outbox        │
│ alert lifecycle               │
└──────────────┬───────────────┘
               │ committed event delivery
               v
┌──────────────────────────────┐
│ in-process projection worker  │
│ or later Kafka consumer       │
└──────────────┬───────────────┘
               │ live update
               v
┌──────────────────────────────┐
│ SSE endpoint → Nuxt UI        │
│ invalidate/refetch or patch   │
└──────────────────────────────┘
```

Compose should eventually run `web`, `simulator`, and `postgres`. Add Kafka only as a deliberate later profile after the direct path is measured. A local Compose environment is a target decision from the assignment, not an existing repository capability.

### 6.2 Responsibility boundaries

- **Simulation engine:** owns virtual time, device-local state transitions, seeded randomness, fault schedules, and emitted telemetry. It does not write PostgreSQL directly.
- **Ingestion boundary:** authenticates the source when that boundary exists, parses and validates the envelope, enforces size/range limits, records receive time, and rejects malformed or unsupported schema versions.
- **State projector:** updates the current device projection from accepted telemetry according to sequence/ordering rules.
- **Rule processor:** derives domain events and alert state from accepted telemetry and current state. Examples: `device.stale`, `battery.low`, `link.lost`, `fault.injected`, `assignment.completed`.
- **Persistence:** stores raw accepted telemetry and durable domain events; current state is a projection optimized for fleet reads.
- **Live-update adapter:** consumes committed domain events and sends a sanitized UI projection over SSE. It must not make the browser responsible for event ordering or durable recovery.
- **Frontend:** uses an event to invalidate/refetch the affected query or update an explicitly bounded cache. It does not infer operational truth from a timer.

### 6.3 Why not Kafka now

At the initial rate, PostgreSQL plus an outbox and one process-local consumer provides a smaller failure surface and preserves the learning goals. Kafka would add broker operations, topic/partition design, consumer-group behavior, local resource cost, and another serialization boundary before Kryos has a durable event contract.

Introduce Kafka when at least one of these is demonstrated:

- two or more independently deployed consumers need the same durable stream;
- replay from an event offset is required for rebuilding projections;
- simulator or ingestion throughput/lag measurements exceed the direct path's tested budget;
- multiple simulator instances need partitioned ownership and consumer-group coordination;
- event retention and cross-service integration are product requirements rather than learning hypotheses.

The first event transport should still use Kafka-compatible discipline: stable event IDs, explicit event types and versions, partition/order keys, idempotent consumers, retry classification, and observable lag.

## 7. Proposed data model

The current `devices` table should evolve into a current-state projection, not absorb every future concern.

| Relation | Initial responsibility | Key fields / notes |
| --- | --- | --- |
| `devices` | Identity, relatively stable configuration, and latest operational projection | `device_id`/existing `unit_id`, `device_type`, `role`, `status`, `connection_status`, `battery_percent`, `signal_quality`, `last_seen_at`, `last_heartbeat_at`, `current_assignment_id` nullable, `current_shift_id` nullable, `state_version`, `last_telemetry_sequence`, optional `latitude`/`longitude` nullable. Keep current `platform`, `zone`, and naming compatible during migration. |
| `device_configurations` (or versioned columns initially) | Simulator/profile settings and capabilities | Telemetry interval, battery model, fault profile, firmware/config version, enabled flag. Avoid putting rapidly changing values here. |
| `telemetry_samples` | Append-only accepted raw measurements | `telemetry_id`, `device_id`, `schema_version`, `device_timestamp`, `received_at`, `sequence`, normalized measurements, optional JSON payload for forward-compatible fields, unique `(device_id, sequence)` and/or source message ID. Time partitioning/retention can wait until measured. |
| `assignments` | Work/mission/shift-independent task lifecycle | `assignment_id`, type, requested/accepted/started/completed timestamps, status, target/capability requirements, device ID nullable until assigned. Do not confuse an assignment with a device's current state. |
| `shifts` | Operator/simulation operating window | Shift identity, start/end, status, and optional assignment grouping. A device may change assignments without changing shifts. |
| `faults` | Explicit injected or observed fault lifecycle | Fault ID, device, code, severity, source (`simulator`/`rule`/`operator`), opened/acknowledged/cleared timestamps, details. |
| `maintenance_records` | Work performed or required on a device | Device, reason, status, opened/scheduled/started/completed timestamps, notes, and optional fault link. |
| `domain_events` | Durable event envelope/outbox source | Event ID, aggregate/device ID, type, version, occurred/recorded timestamps, sequence/causation/correlation IDs, payload, processing status or consumer offset as needed. |
| `notifications` | User-facing delivery/read state | Notification ID, event/alert reference, recipient scope, channel, delivery/read timestamps, status. Defer external delivery channels until authentication and ownership exist. |
| `outbox` (can be `domain_events` initially) | Atomic handoff from DB commit to event delivery | Pending/claimed/published timestamps, attempt count, last error category. Polling is adequate for the first local implementation. |

### Primary versus derived data

- Keep identity and configuration in the primary device record.
- Keep the latest state in `devices` for fast fleet filtering and detail reads.
- Keep raw accepted telemetry separately; do not overwrite it when projecting state.
- Derive `stale`, `online`, `low battery`, and similar conditions from telemetry plus policy, then persist alert/event lifecycle when they matter operationally.
- Derive fleet-wide counts and averages in server-side queries. The current UI's page-local statistics should not be presented as fleet-wide metrics after the fleet grows beyond one page.
- Coordinates are optional future measurements. Store them with a stated coordinate reference system and source; do not make a map dependency part of the first schema migration.

## 8. Telemetry and event contracts

### 8.1 Telemetry envelope

The exact wire format should be versioned and validated at the ingestion boundary. A representative JSON contract is:

```json
{
  "schemaVersion": 1,
  "messageId": "sim-01/DEV-MK-001/000042",
  "deviceId": "DEV-MK-001",
  "deviceType": "MK",
  "sequence": 42,
  "occurredAt": "2026-10-14T15:00:05.000Z",
  "sentAt": "2026-10-14T15:00:05.010Z",
  "measurements": {
    "batteryPercent": 86,
    "signalQuality": 93,
    "connectionStatus": "CONNECTED",
    "status": "ONLINE"
  },
  "simulator": {
    "instanceId": "local-1",
    "runId": "seed-123"
  }
}
```

Rules:

- `messageId` is globally unique for the producer run; `deviceId + sequence` is the natural idempotency key for an ordered simulator.
- `occurredAt` is device/simulation time; `receivedAt` is assigned by Kryos at ingestion. Never use client time alone for server freshness.
- `sequence` is monotonic per device and run. A restart policy must define whether the run ID changes or sequence state is recovered.
- Accept duplicate delivery as normal. A unique constraint and idempotent upsert should make a repeated message a no-op.
- Define an out-of-order policy: persist the raw sample if valid, but only advance the current projection when the sequence/timestamp is newer according to the contract.
- Do not silently coerce unknown enum values or out-of-range measurements. Reject with a safe validation reason and metric.
- Add schema version and preserve unknown fields in a bounded payload only if the retention and privacy policy allows it.
- Keep payloads small and bounded; do not permit arbitrary unbounded simulator metadata.

### 8.2 Derived domain events

Raw telemetry describes what was received. Derived events describe Kryos decisions:

```json
{
  "eventId": "evt_01J...",
  "eventType": "device.stale",
  "eventVersion": 1,
  "aggregateType": "device",
  "aggregateId": "DEV-MK-001",
  "occurredAt": "2026-10-14T15:00:20.000Z",
  "recordedAt": "2026-10-14T15:00:20.015Z",
  "sequence": 7,
  "causationId": "sim-01/DEV-MK-001/000042",
  "correlationId": "run-seed-123",
  "payload": {
    "lastSeenAt": "2026-10-14T15:00:05.010Z",
    "staleAfterSeconds": 10,
    "observedAgeSeconds": 15
  }
}
```

Initial event types should be few and meaningful: `device.telemetry.accepted`, `device.state.changed`, `device.stale`, `device.recovered`, `battery.low`, `link.lost`, `fault.opened`, and `assignment.completed`. Do not emit a new alert every five seconds while the same condition remains active; use an alert identity such as `(deviceId, alertType)` and update/clear its lifecycle.

### 8.3 Topic/event organization if Kafka is introduced

Kafka's [delivery semantics documentation](https://kafka.apache.org/documentation/#semantics) makes the important boundary clear: delivery guarantees depend on producer, broker, and consumer behavior; they do not remove the need for idempotent application side effects. Kafka's [producer idempotence configuration](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence) can reduce duplicate records from producer retries, but Kryos consumers still need idempotency because database effects and offset commits are separate operations. The database handoff should follow an outbox pattern; [Debezium's outbox event router documentation](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html) is a useful mature reference even if Kryos initially uses a small polling worker instead of CDC.

Start with logical event names, not a large topic taxonomy. A later Kafka layout could use:

- `kryos.telemetry.v1` keyed by `deviceId`;
- `kryos.device-events.v1` keyed by `deviceId`;
- `kryos.assignment-events.v1` keyed by `assignmentId`;
- `kryos.dead-letter.v1` for non-retryable or exhausted messages.

Partition by aggregate ID to preserve per-device order. Do not assume global order. Consumers must be idempotent, commit offsets only after their side effects are durable, and distinguish transient database/broker errors from permanent schema/contract failures. Retry with bounded backoff; route poison messages to a dead-letter stream with a safe failure reason and original event reference.

### 8.4 Database consistency and outbox

For the first implementation, the ingestion transaction should:

1. Validate and deduplicate the telemetry message.
2. Insert the accepted raw sample.
3. Update `devices` only when the sample advances the projection.
4. Insert any state-change/alert/domain event and an outbox row.
5. Commit once.

A small worker then publishes outbox records to the process-local live-update adapter. This prevents the current failure mode where a process-local event can be emitted without a corresponding durable state change. If publication fails, the row remains pending for retry. If the worker publishes and crashes before marking published, downstream consumers must tolerate duplicate event delivery.

## 9. Realistic simulator behavior

### 9.1 Device lifecycle

Use a finite-state model with explicit transitions rather than scattered timer conditionals:

```text
REGISTERED → ONLINE ↔ DEGRADED
ONLINE/DEGRADED → OFFLINE (connectivity loss or stale policy)
ONLINE/DEGRADED → CHARGING → ONLINE
ONLINE/DEGRADED → FAULTED → MAINTENANCE → ONLINE
ONLINE/DEGRADED → ASSIGNED → COMPLETING → ONLINE
```

The exact status vocabulary should be reconciled with the current `ONLINE`, `OFFLINE`, `MAINTENANCE`, and `DEGRADED` database checks. `ASSIGNED`, `CHARGING`, and `FAULTED` may be separate domain state, assignment state, or future status values; decide before changing the database constraint. Do not overload `status` with every orthogonal concern.

Per-device behavior should include:

- five-second configurable telemetry interval, with jitter disabled by default for deterministic tests;
- battery drain based on state/assignment, minimum floor at 0, and charging rate when charging;
- scheduled connectivity loss and recovery windows;
- fault injection by seeded probability or explicit scenario schedule;
- maintenance entry and completion events;
- assignment start/progress/completion independent of raw device health;
- heartbeat emitted even when other measurements are unchanged;
- a policy for whether offline devices continue simulated battery progression;
- run ID and seed persisted in simulator logs/metrics, not hidden in random global state.

### 9.2 Determinism and restart

Inject `Clock.now()` and `Random.next()` into the state machine. A test should be able to advance virtual time by five seconds and receive exactly one tick per active device. The simulator should support:

- fixed seed and scenario file;
- accelerated clock for tests, such as 60 simulated seconds per real second;
- graceful shutdown with no partially acknowledged batch;
- explicit restart mode: either recover device sequence/run state from a checkpoint or start a new run ID and make duplicates safe;
- bounded concurrent ingestion requests so a slow database cannot create unbounded timers/promises.

### 9.3 Measurement targets

Do not claim scalability from device count alone. Record:

- generated messages/second;
- ingestion acceptance/rejection rate;
- p50/p95/p99 validation-to-commit latency;
- projection update latency;
- outbox publication latency and pending depth;
- SSE fan-out latency and connected clients;
- CPU/memory of web, simulator, and database containers;
- duplicate, out-of-order, retry, and dead-letter counts.

Acceptance for the initial scale should be a repeatable local run of 100 devices for at least 30 minutes with no unbounded memory growth, no lost accepted samples under the declared failure test, and a documented latency budget. The budget must be chosen and measured by the implementation team; this report does not invent a performance guarantee.

## 10. Live frontend updates

SSE is a good initial browser transport because updates are server-to-browser, the current prototype already uses it, and the UI primarily needs invalidation/refresh rather than bidirectional control. The current process-local bus must be replaced with an outbox-backed publisher or another shared transport before multiple Nitro instances are supported.

Recommended browser behavior:

1. Load paginated state from `/api/fleet`.
2. Open an authenticated, organization-scoped SSE stream when that boundary exists.
3. On `device.state.changed` or `device.stale`, invalidate the affected fleet/detail query or patch only a validated cache entry.
4. If the stream closes, reconnect with bounded backoff and refetch a snapshot.
5. Treat an event ID as a cursor only when the server supports replay; the current in-memory ID does not.

Use WebSockets later if the browser must send low-latency commands over the same session or requires high-frequency bidirectional updates. Do not use WebSockets merely because the word “real-time” appears in the roadmap.

## 11. Phased implementation plan

### Phase 0 — Audit and contract decision

**Objective:** Turn the current read-only fleet into an explicit baseline for the new vertical slice.

**Existing modules:** `prisma/schema.prisma`, committed migration, `server/api/fleet.get.ts`, `server/utils/fleet-events.ts`, `app/composables/useKryosFleet.ts`, `app/pages/app/fleet.vue`, current Vitest tests.

**Proposed changes:** Document the compatibility mapping from `unitId/platform/powerPct/linkStatus/lastPingAt` to the proposed names; decide whether to preserve legacy fields during a transition; define status/connection/assignment boundaries; define local Compose services as a separate implementation task.

**Dependencies:** Product decision on status vocabulary and retention; no Kafka.

**Acceptance criteria:** A reviewed contract note identifies every current field, every proposed new field, and every unsupported assumption. `/systems` remains excluded.

**Tests/validation:** Existing `npm test`; static schema/API review; no database write.

**Risks/open decisions:** Whether to rename current fields or add compatibility views; whether the first migration should add nullable columns or introduce normalized tables immediately.

### Phase 1 — Pure simulator kernel

**Objective:** Simulate 100 devices deterministically without any database or network dependency.

**Existing modules:** None should be coupled directly; keep the engine under a new bounded simulator/domain area.

**Proposed changes:** State machine, injected clock/randomness, scenario configuration, five-second tick, battery/link/fault/assignment transitions, telemetry envelope generation.

**Dependencies:** Phase 0 status contract.

**Acceptance criteria:** A fixed seed and virtual-clock test produces identical envelopes and transitions across runs; 100 devices can run for an accelerated test duration without leaked timers.

**Tests/validation:** Unit tests for transitions, clock advancement, seeded reproducibility, boundary values, fault/recovery, and sequence increments; `npm test`.

**Risks/open decisions:** Whether sequence resets on restart; whether assignment and device health are separate state machines.

### Phase 2 — Telemetry ingestion and persistence

**Objective:** Accept telemetry, validate it, deduplicate it, and persist raw plus current state.

**Existing modules:** `server/api/fleet.get.ts`, Prisma client setup, current migration convention, `tests/device-contract.test.ts`.

**Proposed changes:** Add versioned schema validation; add telemetry/current-state tables or a minimal compatible migration; add an ingestion service and test-only adapter; record `occurredAt`, `receivedAt`, message ID, and sequence.

**Dependencies:** Phase 1 envelope; local PostgreSQL service; explicit migration review.

**Acceptance criteria:** Valid samples are stored and update the projection; duplicates are safe; out-of-order samples do not regress current state; malformed samples return a safe error; no direct simulator-to-DB writes.

**Tests/validation:** Unit contract tests, repository integration tests against disposable local PostgreSQL, duplicate/out-of-order tests, transaction rollback test, `npm test`, `npm run build`.

**Risks/open decisions:** Retention/partition strategy; Prisma transaction shape; whether to keep raw payload JSON in addition to normalized columns.

### Phase 3 — Derived events, alert lifecycle, and outbox

**Objective:** Turn accepted telemetry into durable business events and visible alert state.

**Existing modules:** `server/utils/fleet-events.ts`, current SSE endpoint and tests.

**Proposed changes:** Add domain event/outbox records; implement stale, recovered, low-battery, link-loss, fault, and assignment-completed rules; make alerts idempotent and acknowledge/clear capable; replace direct in-memory publication with outbox polling.

**Dependencies:** Phase 2 transaction and event envelope.

**Acceptance criteria:** A single accepted sample can update state and create derived events atomically; retry does not duplicate active alerts; an outbox row survives publisher failure; the existing SSE contract is backed by committed state.

**Tests/validation:** Rule unit tests, transaction/outbox integration tests, publisher retry tests, alert lifecycle tests, SSE reconnect/snapshot tests; `npm test`, `npm run build`.

**Risks/open decisions:** Whether `domain_events` and `outbox` are one table initially; event retention; authentication/organization scope before exposing live data.

### Phase 4 — First visible vertical slice

**Objective:** Demonstrate `simulator → ingestion → validation → persistence → state update → event processing → visible platform update` locally.

**Existing modules:** `/api/fleet`, `/api/events/fleet`, `useKryosFleet`, `app/pages/app/fleet.vue`.

**Proposed changes:** Add the simulator service and local Compose; connect the UI to SSE; invalidate/refetch or patch the fleet query; add a small freshness/connection indicator without entering `/systems`.

**Dependencies:** Phases 1–3; local Postgres; no Kafka.

**Acceptance criteria:** Starting Compose produces 100 virtual devices; telemetry arrives every five simulated seconds; an injected fault or stale window becomes visible through the fleet API/UI; stopping/restarting the simulator does not corrupt state; logs and metrics show the end-to-end path.

**Tests/validation:** Compose smoke test, API integration test, browser/E2E or component-level live update test, 30-minute soak at the declared target, `npm test`, `npm run build`.

**Risks/open decisions:** Browser reconnection behavior; whether to show current-state updates on a paginated page when the device is not on the loaded page; local clock versus simulated clock in the UI.

### Phase 5 — Assignments, shifts, faults, and maintenance

**Objective:** Add operational workflows after telemetry correctness is proven.

**Existing modules:** Placeholder store methods in `app/stores/kryosFleet.ts`; current command UI is out of scope unless explicitly re-scoped.

**Proposed changes:** Normalized assignment/shift/fault/maintenance records, capability-aware assignment transitions, audit history, and server-side fleet aggregates.

**Dependencies:** Stable event IDs, authorization model, alert lifecycle.

**Acceptance criteria:** Assignment and maintenance histories are queryable; state transitions are auditable; simulator scenarios can complete assignments and enter/exit maintenance without corrupting telemetry.

**Tests/validation:** Domain transition tests, repository integration tests, authorization tests when auth exists, reporting query tests.

**Risks/open decisions:** Assignment semantics, operator roles, notification ownership, and whether “shift” is a user concept or simulation-run concept.

### Phase 6 — Measure and decide on Kafka

**Objective:** Use evidence to decide whether a broker is warranted.

**Existing modules:** Outbox/publisher and observability from Phases 3–4.

**Proposed changes:** Load-test multiple simulator instances and consumers; measure DB, outbox, and SSE limits; optionally add Kafka as a Compose profile with one migration path.

**Dependencies:** Stable versioned events, metrics, failure tests, and a concrete consumer topology.

**Acceptance criteria:** A written decision records measured rates, latency, resource use, replay needs, consumer count, and operational cost. Kafka is added only if the measurements or learning objective justify it.

**Tests/validation:** Load, restart, duplicate, out-of-order, consumer lag, retry, and dead-letter tests; compare direct and Kafka-backed paths.

**Risks/open decisions:** Topic/partition count, retention, schema registry choice, local developer experience, and operational ownership.

### Phase 7 — Optional geospatial and higher-fidelity simulation

**Objective:** Add coordinates/routes/zones/charging hubs only when an accepted product scenario needs them.

**Existing modules:** Future API and UI areas; no current map dependency should be assumed.

**Proposed changes:** Optional coordinate fields with CRS/source metadata; a simulator adapter for a selected mobility/robotics tool; geospatial indexes and map UI in a separate slice.

**Dependencies:** Stable device/telemetry/event contracts and a concrete geospatial requirement.

**Acceptance criteria:** The no-map telemetry path remains testable; simulator truth and platform projection define coordinate precision and update semantics; geospatial load is measured separately.

**Tests/validation:** Contract compatibility tests, coordinate validation, replay tests, and visual/E2E map tests.

**Risks/open decisions:** Coordinate system, privacy/retention, route authority, charging-hub semantics, and whether SUMO or Gazebo is actually the right tool.

## 12. Prioritized implementation backlog

| Priority | Story | Done when |
| --- | --- | --- |
| P0 | Record the compatibility mapping and state-machine vocabulary | Existing fields and proposed boundaries are reviewed; no `/systems` work is included. |
| P0 | Build deterministic simulator kernel for 100 logical devices | Seeded virtual-clock tests reproduce device transitions and envelopes. |
| P0 | Define and validate versioned telemetry envelope | Invalid, duplicate, and out-of-order behavior is tested and documented. |
| P0 | Add raw telemetry persistence and current-state projection | One transaction persists accepted input and advances state safely. |
| P0 | Add stale/low-battery/link-loss rules and alert lifecycle | Alerts are durable, idempotent, acknowledgeable, clearable, and queryable. |
| P0 | Add database-backed outbox publication | State and event creation commit atomically; publisher retries safely. |
| P0 | Connect SSE to committed events and the existing fleet UI | A simulator-generated change becomes visible without a manual page reload. |
| P1 | Add local Docker Compose for web, simulator, and PostgreSQL | A documented clean start runs the vertical slice without private services. |
| P1 | Add observability and a 30-minute 100-device soak test | Latency, errors, pending outbox, memory, and freshness are measured. |
| P1 | Add assignments and shifts as separate domain records | Assignment history and current assignment are distinct from telemetry. |
| P1 | Add fault injection and maintenance history | Simulated faults produce auditable lifecycle records and recover correctly. |
| P1 | Add server-side fleet aggregates | Counts and averages are correct across the entire fleet, not only the current page. |
| P2 | Add authentication and organization scope | Fleet/API/SSE access is authorized and tested before sensitive data use. |
| P2 | Benchmark multiple simulator instances and consumers | A Kafka decision is based on measured limits and replay/consumer needs. |
| P2 | Add Kafka profile only if justified | Topics, partitions, retries, dead letters, and ownership are documented and tested. |
| P3 | Add geospatial contract extensions | Coordinates/routes/zones/charging hubs are optional and do not block telemetry tests. |
| P3 | Evaluate SUMO/Gazebo/MOSAIC against a specific scenario | A chosen simulator proves a measurable mobility/physics/network requirement. |

## 13. Risks, trade-offs, and deferred decisions

### Risks

- **State ambiguity:** The current `status` mixes operational health concepts while future charging, assignment, and fault states are orthogonal. Adding enum values without a state model will create contradictory combinations.
- **Read/write mismatch:** The current API and seed workflow are intentionally read-oriented. A write path needs transaction, validation, authorization, and failure semantics rather than simply calling `publishDeviceUpdated`.
- **Event loss:** The current in-memory bus loses events on restart and cannot coordinate multiple Nitro instances. It is suitable as a tested prototype only.
- **Page-local metrics:** Current Pinia statistics can be misleading when data is paginated. Fleet-wide metrics must be server-derived.
- **Clock/order errors:** Client time, receive time, simulator time, duplicates, and out-of-order delivery can produce false stale/online transitions without explicit rules.
- **Premature infrastructure:** Kafka, MQTT, ROS, physics simulators, and geospatial databases can distract from the core ingestion/state/event learning objective and raise local setup cost.
- **Security boundary:** The repository has no auth or organization scope. Even simulated data should not be exposed as if it were a production operations system.

### Deferred decisions

- Final status taxonomy and whether connection, health, assignment, and maintenance become separate enums/tables.
- Telemetry retention, compression, partitioning, and raw payload policy.
- Authentication, organization/tenant model, and operator roles.
- SSE replay/cursor semantics and whether a browser needs WebSockets.
- Outbox polling versus PostgreSQL notifications before Kafka.
- Kafka schema registry and serialization format, if Kafka is adopted.
- Simulator restart/run identity policy.
- Coordinate reference system, geospatial retention, route ownership, and charging-hub model.
- Whether a future high-fidelity simulator is SUMO, Gazebo, MOSAIC, or none of them.

## 14. Final recommendation

Build the boring, testable platform boundary first: a deterministic TypeScript simulator, a versioned telemetry contract, PostgreSQL raw-history plus current-state persistence, derived alert/event rules, and an outbox-backed SSE projection. Keep the first Compose environment to the web app, simulator, and PostgreSQL. Use the existing `/api/fleet` and fleet page as the first read surface, but do not claim that the current process-local SSE prototype is durable or production-ready.

This path gives Kryos the engineering experience the project is meant to develop—contracts, validation, transactional consistency, idempotency, event processing, observability, resilience, and real-time UI behavior—at the confirmed initial scale without inventing infrastructure. After a measured vertical slice exists, add assignments and maintenance, then decide on Kafka from observed bottlenecks or a concrete replay/multi-consumer requirement. Add geospatial or physics simulation only when a product scenario requires it and can define what additional realism will be validated.

## 15. Source index

Important sources used in this report:

1. [SUMO documentation](https://sumo.dlr.de/docs/) and [TraCI](https://sumo.dlr.de/docs/TraCI/)
2. [Gazebo Sim architecture](https://gazebosim.org/docs/harmonic/architecture/)
3. [Eclipse MOSAIC](https://eclipse.dev/mosaic/) and [getting started](https://eclipse.dev/mosaic/tutorials/getting_started/)
4. [AWS IoT Core documentation](https://docs.aws.amazon.com/iot/) and [device SDKs](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sdks.html)
5. [AWS IoT Device Simulator repository](https://github.com/aws-solutions/iot-device-simulator)
6. [ThingsBoard devices](https://thingsboard.io/docs/user-guide/devices/), [telemetry API](https://thingsboard.io/docs/reference/http-api/telemetry/), and [alarms](https://thingsboard.io/docs/user-guide/alarms/)
7. [Open-RMF fleet integration](https://openrmf.readthedocs.io/en/latest/interfacing/index.html) and [Python fleet adapter](https://github.com/open-rmf/rmf_ros2/tree/main/rmf_fleet_adapter_python)
8. [VDA 5050](https://github.com/VDA5050/VDA5050)
9. [DJI FlightHub 2](https://enterprise.dji.com/flighthub-2)
10. [FlytBase documentation](https://docs.flytbase.com/)
11. [DroneDeploy help center](https://help.dronedeploy.com/hc/en-us)
12. [Auterion documentation](https://docs.auterion.com/)
13. [Eclipse Ditto](https://eclipse.dev/ditto/)
14. [Apache Kafka delivery semantics](https://kafka.apache.org/documentation/#semantics), [producer idempotence](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence), and [Debezium outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)
15. [OpenTelemetry documentation](https://opentelemetry.io/docs/)
