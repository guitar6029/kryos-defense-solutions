# KRYOS Defense Solutions — Marketing Implementation Plan

**Status:** Approved marketing implementation complete · owner review before PR
**Prepared:** 2026-10-14 · **Updated:** 2026-10-14
**Scope:** Public marketing pages and shared marketing presentation only.

## Source of truth

This document records the approved implementation and the remaining review/follow-up items. The [Marketing Research and Redesign Proposal](./KRYOS-MARKETING-RESEARCH-AND-REDESIGN-PROPOSAL.md) preserves the 20-site competitor research, evidence limits, capability classification, and design rationale.

**Approved hierarchy:** Kryos Platform is the primary product; Kryos Multirotor is the flagship hardware concept; MK-I is a future ground-vehicle concept under review; EX-1 is deferred. The Multirotor is conceptual. Any Platform integration is planned/conceptual and is not implemented. Kryos is a fictional portfolio project and the software prototype uses sample data.

## Implemented marketing surface

- / leads with the Kryos Platform and its sample-data workflows. The Multirotor concept appears immediately after the Platform introduction, followed by product links and the future MK-I / deferred EX-1 note.
- /platform explains the implemented sample-data record workflow using a neutral diagram. It labels telemetry, geospatial views, real-time updates, and AI workflows as planned or unverified and explains the Multirotor relationship as planned/conceptual, not implemented.
- /products presents the Platform first, the Multirotor second as flagship hardware concept, MK-I as a future direction, and EX-1 as deferred.
- /products/kryos-multirotor presents the approved working label **Kryos Multirotor**, the conceptual hardware status, the planned/not-implemented Platform relationship, and the absence of approved technical specifications.
- /about describes the fictional portfolio and separates the software prototype from conceptual hardware.
- Shared navigation and footer provide in-scope marketing destinations and a concise fictional-project disclosure. The existing Systems destination is preserved; /systems and its functionality remain outside this work.

The committed implementation is recorded in 9bbab9f (feat(marketing): add platform and multirotor product pages) and f2a7dde (feat(marketing): refresh shared navigation and footer).

## Capability and status boundaries

| Subject | Current status | Approved description |
|---|---|---|
| Platform record workflows | **Implemented prototype** | Request/response retrieval of sample fleet/device records, search and available filters, pagination, sample status fields, and derived status/power summaries. This is not a production service or live equipment display. |
| Telemetry ingestion, geospatial views, real-time updates, and AI-assisted workflows | **Planned / unverified** | Not presented as implemented or available capabilities. |
| Kryos Multirotor | **Conceptual hardware** | Use the approved working label and describe only proposed design intent. Do not claim specifications, testing, performance, fielding, availability, or operation. |
| Platform / Multirotor relationship | **Planned / conceptual; not implemented** | The concept is intended to complement the Platform. No aircraft connection, data feed, telemetry, or control path is implemented. |
| MK-I | **Future concept / under review** | Keep secondary and avoid unverified role, performance, or specification claims. |
| EX-1 | **Deferred** | Do not present as an active product. |

## Approved image treatment

Use app/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png as the **sole approved Multirotor image** for this implementation phase. It is a 1672 × 941 PNG master. The homepage, catalog, and detail page reuse this file with responsive CSS sizing; no separate detail or catalog image is required. Preserve the master unchanged. Do not use the unused multi-view composite or generate additional aircraft views.

The master is approximately 2.09 MB. No image optimization was performed during implementation; if measured page-weight needs warrant it later, evaluate a derived delivery format while preserving this approved master and the same aircraft composition. Do not introduce a new visual or additional image generation as part of that optimization.

## Completed implementation and validation

The approved page hierarchy, route content, shared marketing navigation/footer, status disclosures, and single-master image usage are implemented. The Platform page uses a neutral workflow diagram and does not use a dashboard or /systems imagery.

The prior implementation review reported:

- Production build completed successfully using the bundled Node runtime and Nuxt CLI.
- Vitest: 7 test files and 69 tests passed.
- git diff --check passed.
- The build emitted a bundler timing notice and Node dependency-export deprecation notices; these did not fail the build.

These are results from the implementation review, not checks rerun while updating this document.

## Remaining follow-up

1. Review the two implementation commits and these current strategy documents before opening a PR.
2. Treat **Kryos Multirotor** as the approved working/display label for this phase. Revisit naming only if the owner requests a final commercial product name.
3. Consider image payload optimization only if measured performance justifies it; keep the approved PNG master and reuse the same design.
4. Keep future hardware integration, live telemetry, geospatial features, real-time updates, and AI workflows clearly unimplemented until they exist and are verified.

No backend, fleet/device, API, database, authentication, SSE, or /systems changes are part of the marketing implementation.
