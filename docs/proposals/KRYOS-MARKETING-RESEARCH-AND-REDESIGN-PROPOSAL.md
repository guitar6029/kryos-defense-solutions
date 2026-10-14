# KRYOS Defense Solutions — Marketing Research and Redesign Proposal

**Prepared:** 2026-10-13 · **Approved-direction revision:** 2026-10-14 · **Implementation update:** 2026-10-14
**Status:** Current strategy and research reference. The approved marketing implementation is complete; see the [Marketing Implementation Plan](./KRYOS-MARKETING-IMPLEMENTATION-PLAN.md) for the implemented pages, validation record, and remaining follow-up.

## Executive recommendation

Kryos Defense Solutions is a fictional engineering portfolio. The **Kryos Platform** is the primary product: an implemented software prototype using sample data. The homepage leads with its verifiable sample-record workflows, followed immediately by **Kryos Multirotor**, the flagship conceptual hardware design. The approved working label is Kryos Multirotor. The concept is intended to complement the Platform; integration is planned/conceptual and not implemented.

The implemented marketing routes are /, /platform, /products, /products/kryos-multirotor, and /about. MK-I remains a future ground-vehicle concept under review; EX-1 is deferred. The approved hero master is the sole drone image in this phase and is reused across the homepage, catalog, and detail page. The Platform page uses a neutral workflow diagram, not a dashboard.

Retain the restrained defense-engineering identity and clearly distinguish implemented prototype software, planned/unverified functionality, and conceptual hardware. Do not imply real customers, deployments, performance, specifications, live aircraft data, or operational integration.

## Implementation handoff

The implementation is recorded in commits 9bbab9f and f2a7dde. This proposal preserves the competitor research, repository-grounded capability matrix, research limitations, and design rationale. The [Marketing Implementation Plan](./KRYOS-MARKETING-IMPLEMENTATION-PLAN.md) is the current route and follow-up record.

## Scope, evidence, and limitations

### Pages and components reviewed

- `/` — `app/pages/index.vue`, `Hero.vue`, `CoreCapabilities.vue`, `KryosHighlightMKI.vue`, and `Highlights.vue`.
- `/products` — `app/pages/products/index.vue`, `Products/ProductHero.vue`, `ProductFamiliesOverview.vue`, `DeploymentProfiles.vue`, `DeploymentProductPanel.vue`, and `FullViewProduct.vue`.
- `/products/mk-1` and `/products/ex-1` — `app/pages/products/[model].vue`, `Products/ImageGallery.vue`, `VideoFullPanel.vue`, `SummaryProduct.vue`, and related model assets.
- `/about` — `app/pages/about.vue` and `About/LeadershipPanel.vue`.
- Shared marketing shell — `app/layouts/default.vue`, `Nav.vue`, `KryosFooter.vue`, and `app/assets/css/global.css`.
- Relevant local images and product videos, including a visual check of the hero, catalog, building, MK-I, EX-1, and geometric-shape assets.

### Exclusions

`/systems`, its components, and its functionality were excluded. No redesign recommendations are made for that section. To classify the software concept without opening that route, I read only selected non-`/systems` contracts and data-flow files (`app/composables/useKryosFleet.ts`, `useKryosFleetCriteria.ts`, `app/stores/kryosFleet.ts`, fleet types, `server/api/fleet.get.ts`, and its query/response helpers). These were read-only inspections; no fleet behavior, API, database, SSE, authentication, or application code was changed. The shared navigation's Systems destination is mentioned only as a boundary, not evaluated.

### Evidence labels

- **Repo observation:** directly visible in the checked source or asset.
- **External observation:** visible in the linked external page during a lightweight scan on 2026-10-13.
- **Recommendation:** proposed direction, not an implemented or verified Kryos capability.
- **Needs owner confirmation:** cannot be established from the repository.

This was a source and asset review, not a runtime audit. The updated capability matrix is based on read-only inspection of the README and selected non-`/systems` source files. I did not inspect the `/systems` route, its components, UI, or behavior; therefore no recommendations are made about its design or interaction. I did not run the app or verify route rendering, responsive behavior, keyboard operation, contrast, video playback, reduced-motion behavior, or form submissions. External pages were reviewed through browser accessibility/text structure and page extraction; visual styling, hidden modules, and every linked page could not be exhaustively tested. Confidence is marked per reference below. No external company claim is evidence of a Kryos capability.

### Software capability classification

“Implemented” below means there is supporting prototype code in the inspected repository. It does not mean production readiness, live operational data, a customer offering, or a connection to conceptual hardware.

| Capability | Status | Repository evidence and marketing limit |
|---|---|---|
| Fleet/device record retrieval | **Implemented — prototype** | `useKryosFleet.ts` queries `/api/fleet`; `server/api/fleet.get.ts` returns a paginated device response through Prisma. README states device data is sample/development use. Describe this as a software prototype workflow, not a real operational fleet service. The `/systems` presentation was excluded. |
| Search, filters, and pagination | **Implemented — prototype** | `useKryosFleetCriteria.ts` debounces search and exposes status, platform, zone, role, and link-status criteria; API helpers validate and apply these filters and pagination. Do not infer geospatial capability from a categorical `zone` field. |
| Status and device-health snapshot fields | **Implemented — prototype data model** | Fleet response/type includes status, zone, link status, power percentage, signal quality, and last-ping timestamp. `kryosFleet.ts` derives status counts and average power summaries. These fields do not establish that readings originate from connected hardware or update live. Use “sample device-status fields” or “prototype status summaries.” |
| Telemetry ingestion or live hardware feed | **Planned / not verified** | The README lists telemetry and device-health visualization as a longer-term direction. The inspected query is request/response with a 60-second stale time; no hardware source or stream was confirmed. Do not call these live telemetry. |
| Geospatial map and location queries | **Planned / not verified** | The README lists geospatial fleet views and location-based queries as a future direction. The inspected device contract has a zone label but no coordinates. No map implementation was reviewed or confirmed. |
| Real-time event delivery | **Planned / not verified** | The README describes reliable live-update patterns as a future direction. Real-time infrastructure and `/systems` behavior were not inspected for this task. Do not advertise event streaming or live updates. |
| AI-assisted workflow | **Planned** | README describes a potential assistant grounded in documentation and approved backend tools. No AI workflow was confirmed in the inspected code. Do not describe AI as part of the current platform. |
| Drone/platform relationship | **Conceptual direction; integration not implemented** | The approved strategy positions a future drone concept alongside the primary software product. No inspected code connects a physical platform to the prototype. Any future data exchange or integration must be labeled planned/conceptual until implemented and verified. |
| Physical drone, MK-I, and EX-1 | **Conceptual** | Product renders and marketing copy exist, but no inspected evidence substantiates manufactured hardware, tests, fielding, performance, or availability. |
| Command and control of real equipment | **Not an implemented claim** | README says command workflows are not real operational controls. This review did not inspect `/systems`; do not market real-world control. |

**Platform positioning guardrail:** describe the primary product as a **fleet-operations software prototype using sample data**. The marketing `/platform` page may explain the repository-verified record/search/filter/summary workflow. It must not present a live dashboard, real defense network, geospatial map, streaming feed, AI, or drone integration as implemented. The intended future relationship to the drone may be described as a conceptual/planned direction, with an adjacent status label such as **“Conceptual integration direction · not implemented.”** Screenshots from the excluded `/systems` experience require a separate approved review; this proposal does not select or redesign any such screen.

## Pre-implementation baseline audit

These findings describe the source before the approved marketing implementation. They are retained as dated research context, not as a description of the current pages.

### P0 — correct before public use

| Area | Repo observation | Recommended action |
|---|---|---|
| Company truth | Root `AGENTS.md` describes the brand as a fictional UI concept. The About route instead says privately held contractor, field-proven deployment, global partnerships, and facilities. Home panels state “24+ Global Facilities,” “72 Active Deployment Zones,” and “Tier-1 Defense Contractor.” | Until status is decided, label the project and products as fictional concepts. Remove all statements that imply actual operations, contracts, facilities, deployments, customers, or certification. If the owner confirms a real business, request substantiation and approval for each claim. |
| Product facts | MK-I and EX-1 pages assert specific autonomy, sensor, comms, endurance, mobility, payload, and integration properties. Their source is marketing copy in the repo; no product specification or evidence is supplied. | Do not publish these as facts. Keep only owner-confirmed design intent. Remove numeric specifications until supported by an approved fact sheet and testing context. |
| Announcements | `Highlights.vue` says the MK-I entered limited deployment, facilities expanded, and an undisclosed government research effort launched. No evidence is supplied. | Remove these announcements. Add a dated news module only when attributable, verifiable updates exist. |
| Leadership | `/about` renders four named leaders and biographies through `LeadershipPanel.vue`; names, credentials, and roles are not verified in the repo. | Remove the profiles unless the owner confirms real people and approves biographies/portraits. For a fictional world, mark them conspicuously as fictional characters. |
| Broken paths | `Hero.vue`, `KryosFooter.vue`, `FullViewProduct.vue`, and `ProcurementIntegration.vue` contain `to="#"` destinations. `FullViewProduct.vue` also builds detail URLs by appending `-1` to `mk-1` / `ex-1`, yielding `/products/mk-1-1` / `/products/ex-1-1`. | Replace placeholder CTAs with valid in-scope routes, or remove them. Correct generated product links when implementation is approved. Do not point CTAs to invented forms or email addresses. |
| Claim-like taxonomy | The product page introduces “Ground Platforms,” “Aerial Recon Platforms,” and “Integration Systems”; other content describes sea, digital, and multiple deployment profiles. Only MK-I and EX-1 have product detail routes. | Reduce the catalog to owner-approved concepts. Remove unapproved platform families and deployment settings. |

### P1 — highest-impact marketing and usability changes

1. **Lead with a clear proposition.** `Hero.vue` starts with the company name and “[Autonomous Combat Robotics]” rather than explaining what the visitor can explore. Its broad summary is followed by a three-stat panel and a placeholder R&D CTA. Replace with a text-first concept statement, status label, one primary action, and one useful secondary action.
2. **Reduce sci-fi visual noise.** Orbitron/Exo 2/Rajdhani, frequent bracket effects, angular clipped image panels, circuit imagery, dark overlays, glow accents, and oversized all-caps sections dominate `global.css` and marketing components. Retain only a restrained technical accent; make content, product form, and credible materials carry the visual identity.
3. **Give Products a usable introduction.** `ProductHero.vue` is an image-only half-screen banner. `ProductFamiliesOverview.vue` uses a very long alternating sequence and animated squares; `DeploymentProfiles.vue` adds four unsupported scenarios and further capabilities. Start with a short text intro and comparable concept cards.
4. **Make model pages comparable and honest.** `/products/[model].vue` uses a two-second loading screen and long architecture/specification/video sections. The shared template is a good basis, but each model needs an approved concept status, same section order, useful imagery, clear limitations, and no unsupported specification blocks.
5. **Rework the About page around what can be verified.** Replace the branded tower and leadership roster with a concise concept/company story, design principles, and real approved team information if available.
6. **Simplify shared navigation and footer.** Desktop navigation is 35 units tall and includes a route outside this assignment. `KryosFooter.vue` has four dense columns of invented divisions, recruitment paths, partnerships, portals, facilities, compliance, and disclosure links, all using `#`. For the marketing redesign, use Products and About plus a valid inquiry action when available. Keep excluded Systems work out of scope.

### P2 — refinements for implementation

- Define a type scale, readable line length, content max width, spacing rhythm, image aspect ratios, card and button patterns, visible focus treatment, and neutral border/surface tokens.
- Use sentence case and one `<h1>` per route. `CoreCapabilities.vue` currently renders each repeated capability title as an `<h1>`; correct heading semantics in the later implementation.
- `VideoFullPanel.vue` defaults to autoplay and loop without visible controls. `ImageGallery.vue` changes images on a timer with noninteractive indicator dots. Provide pause/next controls or a non-rotating image set; honor reduced motion.
- Replace generic or aspirational alt text (“KRYOS protects the entire world,” “Kryos Catalog,” `${model}-model`) with concise descriptions for meaningful images; decorative backgrounds should use empty alt text.
- Confirm mobile menu labels, focus/escape behavior, reading order, zoom/reflow, contrast, and motion in implementation. These are recommendations, not tests performed here.

## External reference review — 20 sites

The scan focused on proposition, portfolio organization, product explanation, imagery/software presentation, proof, and next action. I inspected available homepage structure and, for selected references, product pages. Text extraction does not establish the full visual experience. The confidence rating describes how much useful evidence was available, not whether a competitor's claims are independently verified.

| # | Company and pages scanned | External observation | Lesson for Kryos | Confidence / limitation |
|---:|---|---|---|---|
| 1 | [ARX](https://www.arx-defense.com/) — homepage | A restrained, numbered sequence moves from problem to protection layer, technical mechanism, system qualities, dual-use examples, research foundation, and private briefing. | Explain one product concept in a short ordered narrative before using technical language. Borrow the clarity, not its dark presentation or wording. | High for text structure; no independent review of claims. |
| 2 | [Anduril](https://www.anduril.com/) — homepage | The page returned “Please enable javascript”; title positions it as advanced defense technology. | No specific design lesson is asserted from this scan. Revisit manually if a visual benchmark is needed. | Low; body unavailable in extraction. |
| 3 | [Palantir AIP for Defense](https://www.palantir.com/aip/defense/) — redirected platform page | Redirected to `/platforms/aip/defense` with almost no extractable content. | Do not infer product or layout patterns from a page that did not load in this review. | Low; extraction was sparse. |
| 4 | [Shield AI](https://shield.ai/) — homepage; [V-BAT](https://shield.ai/v-bat/) detail | Portfolio cards tie system names to clear roles; V-BAT detail groups results, performance, safety, system features, evidence, approvals, payloads, and specifications, with qualifications on specifications. | Use the same product-page order across concepts. If evidence or facts are absent, state that rather than filling a specs table. | High for page structure; claims belong to Shield AI and do not transfer to Kryos. |
| 5 | [Saronic](https://www.saronic.com/) — homepage; [Vessels](https://www.saronic.com/vessels) | Vessel cards pair role descriptions with consistent range/speed/payload fields; the page separates hardware qualities from software capabilities and links to named vessels and contact. | If a portfolio is approved, compare the same fields across products and visibly separate verified hardware facts from concept notes. | High for page structure; no claim validation. |
| 6 | [Epirus](https://www.epirusinc.com/) — homepage; [Leonidas HPM](https://www.epirusinc.com/platforms/hpm-leonidas) | The page opens with a specific problem and solution, then uses Plan/Sense/Decide/Effect and links the component products. The detail page separates use cases, proof/news, and briefing. | Explain a complex idea with a plain-language sequence and connect claims to evidence. Use a simple diagram rather than decorative circuitry. | High for page structure; product claims are not independently checked. |
| 7 | [Helsing](https://helsing.ai/) — homepage; [HX-2](https://helsing.ai/hx-2) | The homepage pairs each product name with a short role and disclosure of company responsibility. HX-2 detail groups product proposition, design descriptors, system relationship, selected specifications, and ethics policy. | Give each approved concept a short role label and an explicit status. Put material limitations and concept disclosure next to the relevant product. | High; browser accessibility tree and page text reviewed, not all media. |
| 8 | [DARPA](https://www.darpa.mil/) — homepage | The portal emphasizes dated research stories, program examples, technical offices, and routes for industry, small businesses, government, and academia. | A dated, sourced story can explain technical work; omit a newsroom if no real updates exist. Do not imply affiliation with a public agency. | Medium; some imagery/modules are dynamic. |
| 9 | [Vantor](https://vantor.com/) — homepage | The proposition connects spatial intelligence to a data foundation, product groups, user industries, and explicit contact paths. | State the problem and intended user before listing product categories; keep Kryos taxonomy small. | High for extracted structure, not visual styling. |
| 10 | [Planet](https://www.planet.com/) — homepage and Defense & Intelligence navigation | A broad platform is organized into constellations, products, industries, customer stories, resources, and sales/support paths. | Use information hierarchy to separate products, use cases, and evidence. A two-concept site needs only a much smaller subset. | Medium-high; homepage structure available; no dedicated defense detail page inspected in depth. |
| 11 | [Skydio](https://www.skydio.com/) — homepage and product navigation | Navigation separates solutions, flying robots, software, integrations, support, resources, and customer stories. Homepage links drone imagery to clearly named software dashboard modules. | Keep a hardware concept separate from a software concept. Use real interface screenshots only if they exist; label any static mockup as illustrative. | High for navigation and extracted section structure; visual appearance not measured. |
| 12 | [Saildrone](https://www.saildrone.com/) — homepage | The page ties mission categories to named platforms and gives operational metrics with units and context. | Metrics can make a page concrete only when an owner can substantiate them and explain the measurement basis. | Medium-high; source scan only. |
| 13 | [AeroVironment](https://www.avinc.com/) — homepage | A large product organization is navigable by domains and capabilities, with distinct product, company, news, contact, and career paths. | Use a modest product taxonomy rather than creating unsupported Ground/Aerial/Integration/Sea divisions. | High for navigation structure; not a size/style template for Kryos. |
| 14 | [Quantum Systems](https://quantum-systems.com/) — homepage | Domain navigation spans air, land, sea, counter-UAS, and software; product entries carry short role labels and company/resources/contact paths. | A multi-domain catalog needs consistent labels and evidence. For Kryos, do not publish categories without matching product facts and route content. | High for extracted structure; no full visual audit. |
| 15 | [Rheinmetall](https://www.rheinmetall.com/) — homepage | Redirected to a German-language page; product taxonomy was visible by land, sea, air, digital, and industry. | Clear domain taxonomy can scale, but only after the actual portfolio exists. | Medium-low; language redirect limited copy review. |
| 16 | [Northrop Grumman](https://www.northropgrumman.com/) — homepage | The page's extracted structure includes mission stories, topics, corporate routes, and news; some modules remained in a loading state. | Editorial stories can help explain engineering when there is real, attributable work to show. | Medium-low; dynamic modules incomplete. |
| 17 | [RTX](https://www.rtx.com/) — homepage | Corporate content organizes business groups, mission areas, customer outcomes, news, and careers. | Reuse the scanning logic, but avoid corporate-scale divisions and claims for a concept project. | Medium; source scan only. |
| 18 | [Samsara](https://www.samsara.com/) — homepage | Operations software navigation is segmented by products, outcomes/industries, resources, and customer support. | Explain the visitor outcome, then show the product concept that relates to it. Keep the navigation short. | Medium; extracted site structure only. |
| 19 | [Datadog](https://www.datadoghq.com/) — homepage | The software-oriented hierarchy leads to product groups, platform actions, dashboards, customer proof, and documentation. | A real screenshot or labeled diagram should do explanatory work; never present invented telemetry as live Kryos data. | Medium; no dashboard workflow tested. |
| 20 | [Grafana Labs](https://grafana.com/) — homepage | The page presents a platform proposition, clear getting-started/product actions, feature modules, customer stories, and documentation/resources. | Choose one next action and make it obvious; support product explanation with a clearly labeled visual. | Medium; extracted structure only. |

### Patterns worth adapting, ranked

1. **Specific proposition first** (ARX, Epirus): one sentence states the problem and what the product concept is.
2. **Products with distinct roles** (Shield AI, Helsing, Saronic): short labels help visitors understand a portfolio before reading detail.
3. **Repeatable detail template** (Shield AI V-BAT, Saronic vessels, Helsing HX-2): same order for use, design, facts, limitations, and action.
4. **Evidence adjacent to claims** (Epirus, Shield AI, established platforms): link dated proof and qualify metrics; Kryos currently has none.
5. **Separate hardware, software, and company information** (Skydio, Saronic): do not present fictional integrations as product features.
6. **Real product imagery with context** (Skydio, Saildrone, Saronic): show the system at plausible scale, with caption and provenance.
7. **A single clear conversion path** (ARX, Epirus): briefing/contact works because the destination exists and has a defined purpose.
8. **Small controlled taxonomy** (Planet, Vantor): group products by user need only when the portfolio supports it.
9. **Responsible, human-centered explanation** (Helsing): explain where human authority sits when it is known and approved.
10. **Avoid copying scale signals** (AV, RTX, Northrop): a large navigation tree, facility photography, or customer wall would misrepresent a concept brand.

## Approved portfolio hierarchy and roadmap

| Rank | Offering | Current status | Treatment and limits |
|---:|---|---|---|
| 1 — primary | **Kryos Platform** | Implemented software prototype using sample data. | Describe record retrieval, search and filters, pagination, sample status fields, and derived summaries. Do not claim production readiness, live hardware data, geospatial views, event streaming, AI, or real-world control. |
| 2 — flagship hardware concept | **Kryos Multirotor** | Conceptual hardware; approved working label and hero render. | Prominent placement after the Platform introduction and a dedicated page. Use design-intent language only. Integration is planned/conceptual and not implemented. No specifications, testing, performance, availability, or fielding are established. |
| 3 — future expansion | **MK-I ground-vehicle concept** | Future concept under review. | Keep secondary; reassess before future promotion and do not retain inherited capability claims. |
| Deferred | **EX-1** | Deferred. | Omit from active product marketing. |

The implementation includes /, /platform, /products, /products/kryos-multirotor, and /about. The /platform route is a separate marketing explanation using a neutral workflow diagram; it does not redesign or source imagery from /systems.

## Platform and Multirotor relationship

The Multirotor is intended to complement the primary Platform product. No aircraft connection, aircraft data, telemetry feed, or control path is implemented. Keep the planned/conceptual and not implemented qualification beside any integration statement; do not depict an active data flow.

## Approved Multirotor visual

Use app/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png as the sole approved drone image in this phase. The homepage, catalog, and detail page reuse the same 1672 × 941 PNG. No separate detail or catalog image is required. Preserve the master; do not use the unused composite or generate alternate views. The master is approximately 2.09 MB; optimization was not performed.

## Approved brand and visual system

### Working direction: defense engineering with a software product and flagship hardware concept

- **Position:** defense-first robotics and software-platform concept. Explain the engineering project plainly and show what is implemented beside what remains conceptual. Never imply the organization is a real contractor, the devices are fielded, or the software operates defense missions.
- **Surfaces:** warm neutral and pale gray for readable content; selected graphite sections for product media and software visuals. Establish the Platform as the primary product, then give the drone a distinct, prominent flagship zone immediately after its introduction, using one coherent design system.
- **Palette:** graphite, neutral gray, muted olive/slate, and a small amber accent. Keep cyan only where an actual prototype interface uses it and only as a visual detail; avoid neon glows, red alert lighting used decoratively, holograms, targeting reticles, and fabricated military insignia.
- **Typography/layout:** one modern sans family for headings/body and optional mono for small labels. Use clear scale, short line lengths, orderly grids, consistent ratios, minimal borders, and accessible focus states. Reduce Orbitron/Exo 2/Rajdhani layering, brackets, and sharp clip-paths.
- **Drone and ground concept art:** the drone receives a hero-quality, large-format concept render and a dedicated product page. Use consistent studio lighting, plausible scale, matte engineering materials, and a simple neutral background; no tactical action, weapons, invented markings, or fake operational environments. Keep hardware renders distinct from real product photography through captions and “Concept” labels. MK-I art remains secondary and future-facing.
- **Platform presentation:** treat the software as the engineering centerpiece. Explain only code-verified prototype workflows. Use a real approved screenshot only after a separate review of the excluded console route; show an adjacent “Prototype · sample data” label. If no screenshot is approved, use a neutral diagram of the verified record/search/filter flow. Do not create fake dashboards, maps, activity feeds, or drone telemetry.
- **Relationship visual:** a simple diagram may show the primary “Kryos Platform · software prototype” and “Flagship drone · hardware concept” with a dotted, explicitly labeled relationship: **“Planned/conceptual integration · not implemented.”** Do not draw a live data arrow or depict aircraft telemetry in the software.
- **Motion:** static default imagery; no auto-rotating concept gallery or autoplay video. Keep all explanations readable without movement.

Contrast, responsive layouts, focus states, and reduced-motion behavior remain implementation checks, not results of this assessment.

## Implemented page hierarchy and follow-up

The page recommendations and routes below are implemented. For detailed page content and completed validation, see the [Marketing Implementation Plan](./KRYOS-MARKETING-IMPLEMENTATION-PLAN.md).

- **Home (/):** Platform introduction first; prominent Multirotor concept immediately after it; MK-I as a secondary future note; EX-1 deferred.
- **Platform (/platform):** verified sample-data workflow, neutral diagram, and planned/unverified capabilities distinguished from implemented behavior.
- **Products (/products):** Platform primary, Multirotor flagship concept, MK-I future direction, EX-1 deferred.
- **Multirotor detail (/products/kryos-multirotor):** approved working label, approved master image, concept disclosure, no approved specifications, and explicit planned/not-implemented integration status.
- **About (/about):** fictional portfolio framing and a distinction between the implemented software prototype and conceptual hardware.
- **Shared navigation/footer:** short, valid in-scope marketing links and fictional-project disclosure. Preserve the existing Systems link without reviewing or changing its destination or functionality.

### Copy and claim boundaries

Describe only implemented prototype workflows using sample-data language. Telemetry, geospatial views, real-time updates, and AI remain planned/unverified. The Multirotor is conceptual; its relationship to the Platform is planned, not implemented. MK-I is future/under review; EX-1 is deferred. Do not invent a contact destination or claims about real company operations, customers, facilities, or deployments.

### Visual rationale

Use a restrained graphite, neutral, muted olive/slate palette with restrained amber; readable typography; clear spacing; visible focus states; and image captions/status labels adjacent to relevant content. Prefer simple explanatory visuals and real evidence. Do not use fake dashboards, operational scenes, customer proof, or decorative panels in place of product explanation.

### Validation and remaining work

The prior implementation review reported a successful production build, 69 passing Vitest tests across 7 files, and a passing git diff --check. The build emitted a bundler timing notice and Node dependency-export deprecation notices without failing. These results were not rerun for this documentation update.

Remaining follow-up is owner review of the implementation and these strategy documents before PR preparation. The approved working label and hero master are sufficient for this phase. Any future image optimization should be based on measured performance and preserve the master. Do not present planned software capabilities or conceptual hardware integration as implemented.

## Research references

The external scan was performed 2026-10-13 using public company pages. Page availability and extracted content may change. The direct reference links are in the research table above. Relevant product detail pages inspected include Shield AI V-BAT, Saronic Vessels, Epirus Leonidas, and Helsing HX-2. Anduril and Palantir yielded insufficient readable content; Rheinmetall redirected to German; some Northrop modules were still loading. No substitutions were made for those cases.

## Research and implementation status

The 20-site competitor research, source/access limitations, repository-grounded capability matrix, and design rationale are retained. The approved marketing implementation is complete and is documented in the linked implementation plan. The earlier audit sections are historical baseline material, not a statement that routes or implementation remain pending. The /systems implementation was not inspected or changed.
