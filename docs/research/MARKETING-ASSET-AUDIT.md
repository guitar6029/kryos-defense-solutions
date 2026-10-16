# Kryos Marketing Asset and Component Audit

Date: 2026-10-16

Branch: `codex/marketing-asset-audit`

Baseline: `c5a96a50f315947606cd8565e82a7fb5eb6d5592` (`main` and `origin/main` after refresh)

## 1. Executive summary

The current marketing routes have been simplified substantially, but the repository still contains an older, largely disconnected visual/component system. The active public pages are mostly text-led and use the approved Kryos Multirotor master image, while the dynamic legacy product route (`/products/[model]`) and `/systems` still reach older product media and visual components.

The strongest cleanup opportunities are:

1. Review the unreferenced legacy media set, especially `app/assets/img/kryos_building.jpg`, `kryos_terrain.jpg`, `shapes/MetallicStructures.jpg`, `shapes/shape1.jpg`, and `shapes/shape2.jpg`.
2. Review the orphaned `app/components/RDivision.vue`; it has no callers, references three files that do not exist, and was explicitly commented out in historical Git work.
3. Decide whether the old marketing component family is retained as future concept work or should be retired as one bounded legacy subgraph. Do not remove it piecemeal without first deciding whether `/products/[model]` and the older `/systems` presentation remain supported.
4. Consolidate the typography and utility CSS after the component decision. Several custom classes and legacy tokens exist only for the older component family, while the current marketing pages mostly use Tailwind utilities directly.

No application files, assets, dependencies, tests, or configuration were modified by this audit. No deletion is recommended as an automatic follow-up.

## 2. Audit method and scope

Inspected:

- All tracked files under `app/assets`, `public`, `app/components`, `app/layouts`, `app/composables`, `app/utils`, `app/pages`, and relevant configuration.
- `nuxt.config.ts`, `package.json`, README, tests, scripts, and documentation references.
- Direct imports, Nuxt component tags, string-based/dynamic component patterns, `import.meta.glob`, `defineAsyncComponent`, runtime asset paths, and exact filename references.
- File sizes, media metadata, SHA-256 hashes, and recent Git history for marketing assets/components.
- The requested routes: `/`, `/platform`, `/products`, `/products/kryos-multirotor`, and `/about`; also `/products/[model]` and `/systems` because they retain reachable legacy UI.

There were no nested `AGENTS.md` files under the inspected application directories. No `import.meta.glob`, `defineAsyncComponent`, runtime component registry, or dynamic asset glob was found. Vue's normal Nuxt component auto-registration remains possible, so “no direct caller” is treated as strong static evidence, not proof that a future route or external consumer cannot use a file.

## 3. Inventory and confirmed usage

### Images and video

The asset tree contains 30 image files, 4 MP4 files, `public/favicon.ico`, and `public/robots.txt`. The image/video tree is approximately 67 MiB (about 68 MB on disk); the video directory alone is approximately 40 MiB.

| Resource family | Current evidence | Classification |
| --- | --- | --- |
| `app/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png` | Imported by `app/pages/index.vue`, `app/pages/products/index.vue`, and `app/pages/products/kryos-multirotor.vue`. Product documentation identifies it as the sole approved Multirotor image and says to preserve it unchanged. | **KEEP** |
| `app/assets/img/mk-i-no-bg.png`, `mk-i-side-a-trns.png` | Imported by the reachable dynamic product route and by older MK-I components; the side view is also used by `KryosCalloutContainer.vue`. | **KEEP / REVIEW MANUALLY** — keep until the legacy product route and MK-I concept status are resolved. |
| `app/assets/img/ex-1-no-bg.png`, `ex-1-side-b-trns.png` | Imported by the reachable dynamic product route's gallery/full-view components. EX-1 is deferred in the current product copy, but the route remains present. | **REVIEW MANUALLY** — do not remove solely because the product is deferred. |
| `app/assets/video/mki.mp4`, `ex-1-360-b.mp4` | Imported by `VideoFullPanel.vue`, which is rendered by `app/pages/products/[model].vue`. | **KEEP / REVIEW MANUALLY** |
| `app/assets/video/mki-360.mp4`, `ex-1-360.mp4` | No current code reference found. They are related to future/legacy MK-I and EX-1 product media, so the lack of a reference is not sufficient to delete them. | **DEFER** |
| `app/assets/img/leadership/*.png` (four portraits) | Imported by `About/LeadershipPanel.vue`, but that component is not called by the current `about.vue` page. | **REVIEW MANUALLY / DEFER** — fictional leadership content may have intentional historical or future-product value. |
| `app/assets/img/kryos_catalog.jpg` | Used by the legacy `Products/ProductHero.vue`, which currently has no caller in the active route graph. | **REVIEW MANUALLY** |
| `app/assets/img/kryos_ground.jpg`, `kryos_aerial.jpg`, `kryos_system_lab.jpg`, and `kryos_circuit_1/2/3.jpg` | Imported by `ProductFamiliesOverview.vue`, an orphaned legacy marketing component. The component is not called by current pages. | **REVIEW MANUALLY / DEFER** — future product-family work is explicitly out of scope for deletion based only on current page status. |
| `app/assets/img/swarm_drones.jpg`, `land_deployment.jpg`, `sea_deployment.jpg`, `digital_deployment.jpg` | Imported by `DeploymentPanel.vue`, reached by the orphaned `SectorDeployments.vue` component. | **REVIEW MANUALLY** |
| `app/assets/img/shapes/3d_shapes.png`, `shapes/shape3.jpg`, `shape4.jpg`, `shape5.jpg` | Used by `Hero.vue`, `CoreCapabilities.vue`, `SectorDeployments.vue`, and `Highlights.vue`; only `3d_shapes.png` is on the current route graph through `Hero.vue` if that older home composition is reintroduced. The current `index.vue` does not render `Hero.vue`. | **REVIEW MANUALLY** |
| `app/assets/img/EXO_LINE_1.png`, `kryos_building.jpg`, `kryos_terrain.jpg`, `shapes/MetallicStructures.jpg`, `shapes/shape1.jpg`, `shapes/shape2.jpg` | No current application code reference found. | **CANDIDATE FOR REMOVAL** for the five clearly unreferenced generic/legacy images, subject to manual approval; `EXO_LINE_1.png` is **DEFER** because it is future EX-1 concept media. |
| `public/favicon.ico`, `public/robots.txt` | Public static files with conventional runtime paths. | **KEEP** |

No exact duplicate file hashes were found among `app/assets` and `public`. Repeated use of the Multirotor master is intentional reuse, not duplication.

### Components and route reachability

The current marketing pages directly use the shared `Nav` and `KryosFooter` through `layouts/default.vue`, plus page-local markup and the Multirotor master image. The current `/products/[model]` route reaches the older `FullViewProduct`, `ImageGallery`, `VideoFullPanel`, `ProductCTA`, `SummaryProduct`, `KryosPanel`, and related wrappers. `/systems` reaches the older system UI. The `/app` routes use the newer platform workspace components.

The following components have no direct caller anywhere in the inspected application graph:

- `app/components/About/LeadershipPanel.vue`
- `app/components/CoreCapabilities.vue`
- `app/components/Highlights.vue`
- `app/components/KryosHighlightMKI.vue`
- `app/components/Products/DeploymentProfiles.vue`
- `app/components/Products/ProductFamiliesOverview.vue`
- `app/components/Products/ProductHero.vue`
- `app/components/Products/ProcurementIntegration.vue`
- `app/components/Products/Roadmap.vue`
- `app/components/RDivision.vue`
- `app/components/SectorDeployments.vue`

These are not all safe removal candidates. Many form a historical marketing subgraph and are referenced by one another; some contain future product concepts. They should be considered together under **REVIEW MANUALLY**, with `RDivision.vue` the highest-confidence obsolete component.

The following SVG components have no direct caller found:

- `app/components/svg/CircleComb.vue`
- `app/components/svg/PillDashed.vue`
- `app/components/svg/Systems/KryosTerminalCard.vue`

`PillDashed.vue` is indirectly related to the older animated SVG system only by shared styling conventions; no route or component import was found. Classify these as **REVIEW MANUALLY**, not confirmed unused, until the older visual system is formally retired.

## 4. Confirmed usage and dependency evidence

Important evidence:

- `nuxt.config.ts` registers `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/ui`, Pinia, and Nuxt Query. It configures Rajdhani, Exo 2, and Orbitron through `@nuxt/fonts`; no local font files are present.
- `app/assets/css/global.css` is the only globally registered stylesheet and imports `animations.css` and `transitions.css`.
- No frontend dependency is recommended for removal in this audit. `package.json` dependencies are not directly removable merely because individual imports are not obvious; the current Nuxt module configuration and transitive/runtime behavior need a separate dependency audit.
- `app/components/Products/VideoFullPanel.vue` imports the two videos that are currently reachable through the dynamic product route.
- `app/components/Products/ImageGallery.vue` imports both MK-I and EX-1 image pairs; `FullViewProduct.vue` imports the primary MK-I and EX-1 views.
- The current home, catalog, and Multirotor detail pages all import the same approved Multirotor master. This is intentional and documented in the marketing implementation proposals.
- No dynamic asset loading or component glob was found. Exact filename searches covered source, tests, scripts, README, and docs; proposal documents were inspected separately as product-intent evidence, not treated as runtime usage.

### Orphaned component and missing asset evidence

`app/components/RDivision.vue` has no caller. It contains runtime asset references to:

- `~/assets/img/protocol_01.jpg`
- `~/assets/img/protocol_02.jpg`
- `~/assets/img/interference_layers_01.jpg`

None of those files exists in the current asset tree. Git history also contains commit `663124f` with the message “commented out RDivision.” This supports **CANDIDATE FOR REMOVAL** for the component, but the decision should still account for whether the historical R&D concept section is intentionally preserved outside the active site.

## 5. Duplicates and consolidation opportunities

### High-value consolidation

- Keep one approved Multirotor image master and continue reusing it across the three active pages. Do not create page-specific copies.
- Decide whether `/products/[model].vue` is a supported legacy route. If it is retired, its complete media/component subtree can be reviewed as one unit; if it remains supported, its current image/video imports must remain.
- Decide whether the historical marketing component family (`Hero`, `CoreCapabilities`, `Highlights`, `KryosHighlightMKI`, `ProductFamiliesOverview`, `SectorDeployments`, `RDivision`, and related SVGs) is a future template or dead code. A single decision avoids leaving half of the old graph active and half orphaned.
- Consolidate typography only after that decision. The active pages use utility classes and semantic headings, while the older components depend on Orbitron, Rajdhani, and custom classes such as `section-title`, `nav-link`, `kryos-bracket`, and `trns`.

### CSS and design-token opportunities

The global stylesheet contains legacy custom classes with no exact class-literal use found outside the stylesheet: `.font-tech`, `.font-body`, `.hv-text`, and `.footer-section-title`. These are **CANDIDATE FOR CONSOLIDATION**, not automatic removal, because CSS usage can be generated or supplied by future components.

The token block includes several values used only by the older visual system or not found in current page markup. Token usage should be rechecked after component retirement rather than deleting individual variables now. The current pages also repeat large Tailwind utility strings for headings, borders, panels, and links; shared component extraction may reduce duplication, but that is a design refactor rather than an asset cleanup and is outside this audit.

## 6. Removal candidates and risk assessments

The table below distinguishes static evidence from recommendation. “No reference” means no source/test/script/config reference was found; it does not prove that a future product workflow will never need the file.

| Path | Evidence | Checks performed | Impact/risk | Recommended action |
| --- | --- | --- | --- | --- |
| `app/assets/img/kryos_building.jpg` | No current source reference; About page is now text-led and does not render it. | Exact filename search across app, server, tests, scripts, README, and docs; asset inventory; Git history. | Low runtime risk; possible historical/future marketing value. | **CANDIDATE FOR REMOVAL** after visual/content owner approval. |
| `app/assets/img/kryos_terrain.jpg` | No current source reference. | Same exact-reference and inventory checks. | Low runtime risk; could be retained for future concept work. | **CANDIDATE FOR REMOVAL** only if not retained as future concept art; otherwise **DEFER**. |
| `app/assets/img/shapes/MetallicStructures.jpg` | No current source reference. | Same exact-reference and inventory checks. | Low runtime risk; generic decorative asset. | **CANDIDATE FOR REMOVAL** after manual confirmation. |
| `app/assets/img/shapes/shape1.jpg` | No current source reference. | Same exact-reference and inventory checks. | Low runtime risk; historical decorative asset. | **CANDIDATE FOR REMOVAL** after manual confirmation. |
| `app/assets/img/shapes/shape2.jpg` | No current source reference. | Same exact-reference and inventory checks. | Low runtime risk; historical decorative asset. | **CANDIDATE FOR REMOVAL** after manual confirmation. |
| `app/components/RDivision.vue` | No callers; references three missing image files; historical commit says it was commented out. | Component graph search, missing-path check, Git history. | Low current route risk; medium historical/design risk if the concept section is intentionally retained. | **CANDIDATE FOR REMOVAL** as a component, pending product/design approval. |
| `app/assets/img/EXO_LINE_1.png` | No current source reference. | Exact filename search and asset inventory. | Medium future-product risk; EX-1 is deferred but intentionally retained as a concept. | **DEFER**, do not remove solely due to deferral. |
| `app/assets/video/mki-360.mp4` | No current source reference. | Exact filename search and asset inventory. | Medium future-product risk; MK-I concept remains under review. | **DEFER** or review with the dynamic product route decision. |
| `app/assets/video/ex-1-360.mp4` | No current source reference. | Exact filename search and asset inventory. | Medium future-product risk; EX-1 is deferred. | **DEFER** or review with the dynamic product route decision. |
| Unreferenced component subgraph listed in §3 | No active callers, but components reference each other and contain future/legacy product UI. | Component call graph, dynamic component search, route inventory. | Medium-to-high risk if a hidden/future route depends on it. | **REVIEW MANUALLY** as one bounded legacy subsystem; do not delete individual files yet. |

### Potential storage magnitude

The eight clearly unreferenced files listed for removal/defer review (`EXO_LINE_1.png`, `kryos_building.jpg`, `kryos_terrain.jpg`, `MetallicStructures.jpg`, `shape1.jpg`, `shape2.jpg`, `mki-360.mp4`, and `ex-1-360.mp4`) total approximately 24.69 MiB. This is a review pool, not claimed savings: the future-concept constraint means the videos and EX-1 image must not be deleted without explicit approval. The largest files in the repository are `mki.mp4` (11.63 MiB), `mki-360.mp4` (10.77 MiB), `ex-1-360.mp4` (10.74 MiB), and `ex-1-360-b.mp4` (8.27 MiB).

## 7. Uncertain items requiring manual review

- Whether `/products/[model]` is an intentionally supported legacy route, a hidden/future route, or obsolete code. This is the main decision controlling the status of the MK-I/EX-1 media and product components.
- Whether fictional leadership portraits and old product-family imagery are intentionally retained as world-building assets. The current About page does not render them.
- Whether any external deployment, CMS, design handoff, or future branch expects the unreferenced media. Repository search cannot establish that.
- Whether the three configured web font families are part of the desired visual identity or leftover from the old marketing system. No local font files are present, so `@nuxt/fonts` likely supplies them at runtime; dependency removal should not be inferred from unused local CSS class names.
- Whether the old `/systems` experience is intentionally maintained. It still reaches many older components and should be validated separately from the public marketing audit.

## 8. Recommended cleanup sequence

1. Product/design owner confirms the support status of `/products/[model]`, `/systems`, and the legacy marketing component family.
2. Archive or label future-concept media that is intentionally retained; record that decision in documentation so a later audit does not rediscover it as apparently unused.
3. If approved, remove the five generic unreferenced image candidates and `RDivision.vue` in a focused cleanup change. Keep this separate from any redesign or component refactor.
4. Re-run exact-reference and missing-path checks. Confirm that no route, documentation link, or external asset manifest expects the removed files.
5. If the legacy graph is retired, remove its components and only then consolidate the now-unused CSS classes, animations, transitions, and design tokens.
6. Audit dependencies separately. Do not edit `package.json` or `package-lock.json` as part of this asset cleanup without a dedicated dependency analysis.

## 9. Validation commands after approved cleanup

Run from the repository root after installing dependencies:

```bash
npm test
npm run build
npm run generate
```

For a focused post-cleanup reference check:

```bash
rg -n 'kryos_building|kryos_terrain|MetallicStructures|shape1|shape2|RDivision|protocol_01|protocol_02|interference_layers_01' app server tests scripts README.md docs
git diff --check
git status --short
```

If `/products/[model]` or `/systems` remains supported, manually exercise those routes in addition to `/`, `/platform`, `/products`, `/products/kryos-multirotor`, and `/about`. Verify responsive layout, image loading, video loading, and navigation. If the database-backed test suite is configured, follow the repository guard rules for `TEST_DATABASE_URL`; a missing guarded database configuration is a skipped integration suite, not a passing one.

## Verification performed for this audit

- Verified clean starting `main` and refreshed `origin/main`; both resolve to `c5a96a50f315947606cd8565e82a7fb5eb6d5592`.
- Created dedicated worktree and branch `codex/marketing-asset-audit`.
- Inspected all scoped asset/component/style/configuration paths and searched source, tests, scripts, README, and docs for references.
- Checked for dynamic asset/component loading patterns and exact duplicate file hashes.
- Collected file sizes and media metadata.
- `npm test`: not run successfully because `npm` and project `node_modules` are unavailable in the execution environment (`npm: command not found`).
- `npm run build`: not run for the same environment limitation.
- `npm run generate`: not run for the same environment limitation.
