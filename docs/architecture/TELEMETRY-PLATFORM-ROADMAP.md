# Kryos Telemetry Platform Roadmap

## 1. Vision

Build Kryos into an event-driven fleet operations and telemetry platform that can simulate, monitor, and manage a growing fleet of devices.

The platform will begin with simulated devices running locally in Docker. We will progressively introduce telemetry ingestion, event processing, operational workflows, analytics, observability, and load testing.

The goal is not simply to make the application work. The goal is to understand how a distributed system behaves under load, how failures propagate, how to measure bottlenecks, and how to scale deliberately.

**Core principle: Build locally, measure first, introduce complexity when justified.**

## 2. Engineering Principles

- Local Docker is the primary development and experimentation environment.
- Local development must not accidentally access or modify Neon or production resources.
- The database is the source of truth for current operational state.
- Live events, current state, historical telemetry, and analytical aggregates have different purposes and retention requirements.
- Critical operational events require durable handling.
- Streaming and real-time delivery do not automatically imply durable storage or replay.
- Performance decisions must be based on measurements rather than assumptions.
- Kafka, specialized analytics storage, and distributed orchestration are future options, not initial requirements.
- Keep the system modular enough to introduce additional services without prematurely distributing every component.
- Prefer open-source tooling where practical and keep cloud costs controlled.

## 3. Initial Simulation Target

The first target is a configurable fleet of 500 simulated devices.

| Parameter | Initial target |
|---|---|
| Default fleet size | 500 devices |
| Telemetry interval | 5 seconds per device |
| Expected telemetry rate | Approximately 100 messages/second |
| Expected daily volume | 8.64 million snapshots if sustained |
| Execution environment | Local Docker |
| Operational database | Local PostgreSQL |
| Live delivery | Existing SSE foundation |
| Raw telemetry retention | Not enabled by default |
| Message broker | Not required initially |

These figures describe the intended workload, not a proven capacity limit. Actual performance must be measured.

The simulator should support changing the fleet size through configuration without modifying application code.

## 4. Device Operational Model

Each simulated device should have a stable identity and a reproducible starting profile.

The initial fleet should start in a mixture of states rather than having every device online, healthy, and available.

### Initial behaviors

- Telemetry generation and last-seen tracking.
- Battery level changes and charging behavior.
- Connectivity changes, including degraded and offline states.
- Device health and simulated faults.
- Assignment and availability states.
- Shift and off-shift transitions.
- Return-to-charge behavior when battery levels require it.
- Maintenance and recovery transitions.
- Meaningful event generation when operational state changes.

Keep independent state dimensions separate where appropriate. A device can be connected but faulted, or disconnected while still assigned to a task.

Avoid designing a single status enumeration that must represent every possible combination.

### Initial exclusions

The first version does not require:

- Real-world geospatial coordinates.
- A live map.
- Complex physical movement simulation.
- Real device integrations.
- Kafka.
- A dedicated time-series database.
- Multi-region deployment.

These can be introduced as separate milestones.

## 5. Telemetry and Event Architecture

The architecture separates ingestion, operational state, events, and analytics.

### Logical flow

1. Simulated devices generate telemetry and operational events.
2. An ingestion component validates incoming messages and their device identity.
3. The backend updates the current operational state.
4. Meaningful operational changes produce events.
5. The live-delivery pathway sends relevant updates to connected clients.
6. Historical telemetry and aggregate metrics can be introduced according to defined retention policies.

The simulator must not manipulate frontend state directly or bypass backend validation.

### Current state

PostgreSQL initially stores the latest operational projection of each device, including relevant fields such as:

- Last-seen timestamp.
- Battery level.
- Connection health.
- Device health and faults.
- Assignment and availability.
- Charging or maintenance state.

Current state should be updated efficiently. Repeated heartbeats do not necessarily require separate permanent database records.

### Operational events

Examples include:

- Device became unavailable.
- Device went offline or recovered.
- Battery crossed a configured threshold.
- A fault occurred or cleared.
- An assignment changed.
- Charging began or completed.
- A device entered maintenance.

Important operational events must not be treated as disposable live notifications. Their persistence and recovery behavior should be designed explicitly.

### Live streaming

The existing SSE foundation can deliver live updates to the UI.

SSE is a delivery mechanism, not a durable event log. Connected clients may disconnect, and events can be missed unless replay or recovery is implemented.

For important events, introduce durable event persistence or a transactional outbox when the ingestion architecture is ready.

## 6. Data Retention and Analytics

Not every incoming message needs to be retained forever.

The platform should distinguish four categories.

### Operational state

Store the latest state needed to operate the fleet.

### Critical event history

Persist meaningful operational transitions and faults for troubleshooting, reliability analysis, and audit requirements.

### Raw telemetry

Detailed sensor readings may be retained for a limited period if they are needed for investigations or specific analytical queries.

Raw-history persistence is not enabled by default in the initial simulator.

### Aggregated metrics

Periodic aggregation can reduce long-term storage requirements.

Potential hourly metrics include:

- Minimum and maximum temperature.
- Average temperature and sample count.
- Minimum and maximum battery level.
- Estimated battery consumption.
- Time online and offline.
- Fault counts.
- Charging duration.
- Active and available time.
- Missing or invalid sample counts.

Aggregates must preserve sufficient information for correct calculations. For example, averages should account for differing sample counts, and battery consumption must account for charging, missing readings, and device resets.

Hourly summaries do not replace critical event history. A temporary fault or outage can be lost if only the final reading of each hour is retained.

Cost estimates must distinguish measured values from estimates. Battery percentage alone is not a direct measurement of electrical energy consumed.

## 7. Performance and Scale Testing

The simulator is also a workload generator for learning and measuring system behavior.

### Establish a baseline

At 500 devices, measure:

- Messages generated.
- Messages accepted.
- Messages processed.
- State updates persisted.
- Operational events generated and recorded.
- Processing latency.
- End-to-end latency where measurable.
- Error and rejection rates.
- Duplicate and dropped-message counts.
- Database write rate and query latency.
- CPU and memory usage.
- Database connections and connection-pool saturation.

Generated, accepted, processed, and persisted counts must be distinguishable. A high ingestion rate is not useful if messages are silently dropped.

### Increase the load progressively

Use configurable scenarios such as:

- 500 devices.
- 1,000 devices.
- 5,000 devices.
- Higher counts as local hardware permits.

These are test scenarios, not guaranteed supported capacities.

Increase load gradually and identify the first bottleneck. Avoid changing multiple architectural components at once, so the impact of each change can be measured.

### Test types

- **Load testing:** verify expected operating traffic.
- **Stress testing:** increase traffic until throughput degrades or the system fails.
- **Soak testing:** run sustained workloads to find memory leaks, resource exhaustion, and gradual degradation.
- **Fault injection:** introduce dependency failures, network delays, and unavailable consumers.
- **Recovery testing:** verify retries, reconnection, backpressure, and recovery after interruption.
- **Multi-region testing:** later evaluate latency, replication, regional failures, and consistency.

Local testing can establish system behavior and bottlenecks, but it does not prove production network capacity or multi-region resilience.

## 8. Observability and Testing Tools

Introduce tools as the implementation needs them.

| Tool | Purpose |
|---|---|
| k6 | HTTP/API load and stress testing |
| Prometheus | Metrics collection |
| Grafana | Dashboards and operational visualization |
| OpenTelemetry | Instrumentation, traces, and metrics |
| Toxiproxy | Controlled network fault injection |

Initially, lightweight application metrics and existing Docker metrics may be sufficient. A full observability stack should be added when it provides useful insight into the running system.

Security testing, DDoS resilience, and high-volume external tests must only be performed against systems we own or are explicitly authorized to test. Local stress tests do not establish resistance to a distributed attack.

## 9. Infrastructure Evolution

### Stage 1: Local foundation

- Dockerized Nuxt application.
- Local PostgreSQL.
- Doppler-backed configuration.
- Prisma migrations.
- Nuxt hot reload.
- Reproducible local setup.

### Stage 2: Simulator kernel

- Configurable device count.
- Deterministic device profiles.
- Operational lifecycle rules.
- Five-second telemetry generation.
- Mixed starting states.
- Repeatable tests.

### Stage 3: Backend ingestion

- Validated telemetry contract.
- Current-state persistence.
- Efficient updates and batching where appropriate.
- Idempotency and duplicate handling.
- Explicit error handling.

### Stage 4: Operational events and live delivery

- Meaningful state-transition events.
- Durable handling of critical events.
- Integration with SSE.
- Reconnection and recovery behavior.
- Initial processing metrics.

### Stage 5: Operational workflows

- Assignments and shifts.
- Fault handling and recovery.
- Charging workflows.
- Availability and utilization calculations.
- Maintenance lifecycle.

### Stage 6: Aggregation and measurement

- Hourly aggregate metrics.
- Retention policies.
- Throughput and latency benchmarks.
- Resource utilization measurements.
- Load, stress, and soak testing.

### Stage 7: Distributed architecture when justified

Evaluate additional components based on observed requirements:

- Kafka or another durable event-streaming system.
- Multiple consumers and independent processing workloads.
- Transactional outbox and replay mechanisms.
- Specialized time-series or analytical storage.
- Object-storage archives.
- Workflow orchestration for long-running processes.
- Advanced observability and distributed tracing.
- Multi-region deployment and recovery.

Do not introduce these components solely because the platform may eventually need them.

## 10. Scaling Decisions

The platform should evolve through measured decisions.

Examples:

- Introduce batching when per-message database writes become a bottleneck.
- Introduce connection pooling when connection overhead or concurrency requires it.
- Introduce durable buffering when producers and consumers need to operate independently or survive temporary outages.
- Introduce Kafka when measured throughput, replay requirements, or multiple independent consumers justify it.
- Introduce specialized analytics storage when historical query patterns or data volume exceed the practical capabilities of the current database.
- Introduce distributed workflow orchestration when long-running processes require durable timers, retries, and recovery.

Every major change should have a documented problem, a proposed solution, and a measurable outcome.

## 11. Production Readiness — Future Scope

Production deployment will introduce requirements that local Docker cannot fully validate:

- Authentication and authorization.
- Tenant and organization isolation.
- Secret management and environment separation.
- Rate limiting and resource protection.
- Durable processing and recovery.
- Monitoring, alerting, and incident response.
- Backup, restore, and disaster recovery.
- Data retention and deletion policies.
- Cost monitoring and capacity planning.
- Security assessments and controlled load testing.
- Regional availability and consistency decisions.

These requirements must be addressed before production workloads depend on the platform.

## 12. Definition of Progress

Each milestone should produce observable evidence that the system works.

For example:

- The simulator generates the expected number of messages.
- The backend reports how many messages were accepted and processed.
- Current state reflects the latest valid update.
- Important state transitions are recorded reliably.
- Live clients receive relevant updates.
- Tests cover duplicate messages, invalid data, and dependency failures.
- Load tests report throughput, latency, and errors.
- Recovery tests demonstrate what happens when a component fails.
- Architectural changes improve a measured limitation.

The objective is not to claim a particular device capacity prematurely. It is to understand and document the conditions under which Kryos achieves its measured capacity.

## 13. Immediate Next Step

Create the first simulator-kernel implementation on the dedicated feature branch.

Keep the first change focused on:

1. Configurable device count, defaulting to 500.
2. Deterministic device profiles and mixed initial states.
3. Operational state transitions.
4. Five-second telemetry generation.
5. Testable time and randomness.
6. Unit tests and basic simulation counters.

Do not introduce Kafka, a new analytics database, geospatial infrastructure, or a broad schema redesign in this milestone.

Once the simulator is reliable, implement ingestion, persistence, and event delivery as subsequent steps.

**Guiding principle: Start small, make behavior observable, measure under load, and scale in response to evidence.**
