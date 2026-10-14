# KRYOS Defense Solutions — Marketing Strategy, Research, and Redesign Plan

**Prepared:** October 13, 2026

**Purpose:** Human review and approval before implementation

**Scope:** Public marketing routes and shared marketing components only
**Implementation status:** None. This report does not authorize the redesign.

> **Superseded strategy note:** This historical plan predates the owner-approved direction that the Kryos Platform is the primary product, the compact multirotor is the flagship hardware concept, MK-I is a future concept, and EX-1 is deferred. Its former MK-I-first, EX-1-active, and aerial-deferred recommendations are no longer current. Use the [approved Marketing Research and Redesign Proposal](./KRYOS-MARKETING-RESEARCH-AND-REDESIGN-PROPOSAL.md) for strategy and competitor research, and the [Marketing Implementation Plan](./KRYOS-MARKETING-IMPLEMENTATION-PLAN.md) for the current implementation sequence. This notice preserves the historical research below; it does not authorize implementation.

## 1. Executive summary

### Recommended positioning

Present Kryos as a **fictional product and brand concept exploring robotics for complex work**. The clearest concept-level story supported by the current portfolio is two distinct forms: a mobile ground-robot concept (MK-I) and a powered human-assist-frame concept (EX-1). A concise umbrella line for owner review is:

> **Robotics concepts for complex work.**

Supporting copy: “Kryos explores mobile ground robotics and powered human-assist systems through two product concepts. Product imagery and descriptions are illustrative.”

This language describes the project honestly without asserting that Kryos manufactures equipment, has customers, operates facilities, or has deployed systems. The portfolio recommendation is to keep MK-I as the lead concept, keep EX-1 as a clearly separate adjacent concept only if human-assist robotics is intentionally in scope, and defer the aerial family. The repository has aerial imagery but no named aerial product detail or substantiated model definition.

### Recommended visual direction

Build a premium **field-engineering editorial** identity: warm white and light stone for most content; selective graphite sections for product renders or technical diagrams; muted slate/olive neutrals; amber used sparingly for actions or safety labels. Use a readable sans-serif hierarchy, simple card geometry, calm spacing, consistent image crops, and realistic product renders. Replace neon, glowing outlines, sci-fi environments, and interface decoration with clear product form and useful explanation. Label every generated scene and product rendering as an illustrative concept.

### Immediate priorities

1. Remove or relabel fictional company, leadership, facility, partner, deployment, announcement, certification, and product-performance claims.
2. Align the catalog to one or two concept products; remove unsupported air/sea/digital “deployment” claims and inconsistent platform-family copy.
3. Replace placeholder links and select a real, owner-approved inquiry channel before adding a Contact action.
4. Rework the shared marketing components and replace images that imply a real company, real facility, live operation, or military deployment.

## 2. Repository review, scope, and confidence

### Routes reviewed

| Route | Source reviewed | Current content |
|---|---|---|
| `/` | `app/pages/index.vue`; `Hero.vue`, `CoreCapabilities.vue`, `KryosHighlightMKI.vue`, `Highlights.vue` | Company/robotics hero, capabilities, MK-I spotlight, announcements |
| `/about` | `app/pages/about.vue`; `About/LeadershipPanel.vue` | Company claims, branded building image, four leadership profiles |
| `/products` | `app/pages/products/index.vue`; `Products/ProductHero.vue`, `ProductFamiliesOverview.vue`, `DeploymentProfiles.vue`, `FullViewProduct.vue`, `SummaryProduct.vue` | Catalog image, three families, deployment profiles and capabilities, MK-I/EX-1 spotlights |
| `/products/mk-1` | `app/pages/products/[model].vue`; product gallery and video components | MK-I architecture claims, specifications, rotating renders/video |
| `/products/ex-1` | Same shared product detail template | EX-1 architecture claims, specifications, rotating renders/video |
| Shared | `app/components/Nav.vue`, `KryosFooter.vue`, `app/layouts/default.vue`, `app/assets/css/global.css` | Navigation/footer, shared page shell, typography and design tokens |

The `/systems` route and System-specific functionality were explicitly excluded. I did not inspect its page, components, implementation, or runtime and make no recommendations about that section. The shared navigation includes a Systems link; its destination is outside this review. Fleet/device interfaces, APIs, databases, authentication, and SSE are also outside scope.

### Evidence levels

- **Repository evidence:** Directly visible in the current README, source, route structure, or assets. The README explicitly says Kryos is fictional and this repository is a portfolio/engineering sandbox, not an actual defense product. The README also cautions that roadmap ideas are not necessarily implemented.
- **External observation:** Text, page structure, product pages, or visuals visible on the linked public company websites during this review. A company's claims are still that company's self-presentation, not independent verification.
- **Recommendation/assumption:** Proposed design or copy. It remains a recommendation until the owner approves it. “Use case,” audience, status, and facts that appear only in existing marketing copy are not upgraded to verified product information.

### Assessment limits

The local implementation was assessed from source and assets; a local app render was not available because `npm` is unavailable in the shell. No local route, breakpoint, interaction, keyboard behavior, reduced-motion behavior, or contrast ratio was runtime-tested. An in-app browser visual check was made of Helsing’s existing public homepage at a narrow viewport; the captured hero used stark black space and oversized white type, but its hero media was unavailable in that capture. Other external reviews use readable page content/DOM and linked product-page content, not a full visual/manual audit of every screen. The research table records those confidence limits.

## 3. Current-state audit

| Priority | Page/component | Source-verified current state | Problem | Recommended change and rationale |
|---|---|---|---|---|
| P0 | `README.md`; home, About, product pages | README says fictional project; marketing calls Kryos a privately held defense contractor and describes product systems and company operations as factual. | Material mismatch can mislead prospective customers and visitors. | Put a visible “Fictional product concept” disclosure in the site shell or page intro until the owner approves another truthful status. Review every claim before reuse. |
| P0 | `Hero.vue` | Lists “24+ Global Facilities,” “72 Active Deployment Zones,” and “Tier-1 Defense Contractor.” | Unsupported scale, facility, deployment, and contractor claims. | Remove the three stats. Use the project’s product-concept statement instead. |
| P0 | `Highlights.vue` | Claims limited deployment with partners, facility expansion, and a government research initiative. | Implies partners, deployments, a facility, and public-sector relationship with no evidence. | Remove the announcement module. Reintroduce a newsroom only for dated, attributable, approved updates. |
| P0 | `About/LeadershipPanel.vue`, `app/pages/about.vue` | Names Helena Voss, Dr. Rowan Ilyan, Col. Marcus Hale (Ret.), and Yara Chen; includes biographies and four portraits. About also claims a private contractor, global/field-proven work, and facilities. | These are fictional/unsupported identities and organization claims per project context. Portraits have synthetic, stylized details. | Remove profiles and corporate claims or retain only under an explicit fictional-world label. Prefer an honest “About the concept” story. |
| P0 | `app/pages/products/[model].vue`, `SummaryProduct.vue`, `DeploymentProductPanel.vue` | Product text claims wall/overhead traversal, 18–26 hour endurance, encrypted links, sensors, payloads, continuous operation, safety/control behavior, cross-platform compatibility, and restricted-site roles. | Existing marketing copy is not evidence. Several claims have consequential implications and must not be treated as facts. | Keep specifications out until individually verified. Separate “visible in current concept render,” “proposed design intent,” and “verified specification.” |
| P0 | `Hero.vue`, `KryosFooter.vue`, `FullViewProduct.vue`, `ProcurementIntegration.vue` | Multiple CTAs/links use `to="#"`; no inquiry form, Contact route, or approved business email was found in the scoped marketing pages. | Clicks do not provide the advertised path; procurement/dossier wording implies unavailable process. | Remove dead links. Use existing product/about routes for present CTAs. Add a Contact CTA only after its destination is approved and available. |
| P1 | `Hero.vue`, global CSS | Abstract 3D geometry; centered 96px-scale Orbitron wordmark, “[Autonomous Combat Robotics]”, large body text and angular metric frames. | Category and brand consume the first screen without explaining the concept portfolio; presentation reads as game fiction. | Lead with a short plain-language concept proposition, small status label, one primary CTA, and an approved product image/render. |
| P1 | `CoreCapabilities.vue` | Claims patrol, interdiction, perimeter security, target acquisition, threat classification, precision response, and seamless integration. Reuses a dark glowing abstract background. Three cards use `<h1>`. | Descriptions exceed project evidence; “target acquisition” and “precision response” imply consequential targeting functions. Multiple card-level h1 elements weaken hierarchy. | Replace with concept categories grounded in assets, use one page h1 followed by h2s, and remove targeting/engagement claims. |
| P1 | Products family/card/detail architecture | Families are Ground, Aerial Recon, and Integration Systems; deployment profile content spans air, land, sea, digital, campus, transit/subterranean, industrial, and “Black-Site” settings. Detail routes define only MK-I and EX-1. `FullViewProduct.vue` calls EX-1 “EX-I” in the card title while other files say EX-1. | Portfolio taxonomy, names, and capability breadth conflict. No aerial detail page exists. | Use a two-card concept catalog (MK-I and optional EX-1), standardize model names, remove non-product deployment taxonomy. Defer aerial. |
| P1 | `Products/ProductHero.vue` | Renders only a half-viewport `kryos_catalog.jpg`; no heading, description, or CTA. | Catalog route begins without text explaining what is listed. Artwork contains embedded pseudo-typographic branding. | Replace with a text-led heading and compact supporting paragraph, then a product grid. |
| P1 | `app/pages/products/[model].vue` | Artificial 2-second loading screen; product title; image gallery changes every 6.5 seconds; autoplay/loop video defaults on. | Delays content, offers no visible gallery controls, and motion is not shown as user-controlled; “technical specification” is unsubstantiated. | Render immediately; provide labeled static images or accessible manual gallery controls; pause video by default, honor reduced motion, and label concept status. |
| P1 | `Nav.vue`, `KryosToggleMenu.vue`, `KryosSidePanel.vue` | Desktop nav is tall and uses decorative brackets; mobile menu buttons have no accessible text names in source. | Header consumes excess space; screen-reader control names are not provided by the button markup. Mobile menu keyboard/focus behavior has not been runtime-checked. | Use compact logo/wordmark, Products/About, and a validated CTA. Add accessible names/state and verify keyboard/focus handling at implementation. No change recommendation is made for the excluded Systems destination. |
| P1 | `KryosFooter.vue` | Four dense link groups for partnerships, divisions, recruitment, compliance, corporate records; links point to `#`. | Implies unsupported programs and gives users dead ends. | Replace with a short brand description, valid in-scope links, concept disclosure, and approved contact/legal links only. |
| P1 | Product and company images/alt text | Hero alt is “KRYOS protects the entire world”; about alt says a Kryos tower; product/gallery alts are generic (“MKI Model with background”, “MK-model”). | Alt text repeats claims or fails to identify product/content; generated scenes can be mistaken for evidence. | Literal alt text for informative imagery, empty alt for decorative backgrounds, and nearby concept-render disclaimer. |
| P2 | Global styling and shared panels | `Orbitron`, `Exo 2`, `Rajdhani`, caps, brackets, angular frames, circuit art, cyan/amber glows recur; large heading and body sizes (`text-4xl`, `text-6xl`) are common. | Too many expressive devices compete with technical content and can create reflow/legibility issues. | Establish a type/spacing scale and simple card/grid system; keep technical labeling small and sparse. Validate contrast and zoom/reflow in implementation. |
| P2 | Home/products section lengths | Many sections use `min-h-screen` or `h-screen`, large decorative `Absolute` panels, and hover scaling. | Tall pages and motion are used as atmosphere rather than content hierarchy. Runtime/mobile effects are unverified. | Let content determine section height; use normal document flow and simple responsive two-column layouts. |

### Retain, revise, remove, add

| Retain | Revise | Remove | Add |
|---|---|---|---|
| Kryos name and product-concept framing; existing MK-I and EX-1 model assets as draft concepts; restrained graphite/amber accent as one optional dark palette; product-detail route structure if portfolio is approved. | Canonical naming, hero message, product taxonomy, specs, About narrative, alt text, image art direction, section density, navigation and footer. | Unsupported company scale, claims, deployment/news, fictional leadership/facility imagery, placeholder links, “Black-Site”/target-acquisition language, redundant family/deployment sections, decorative circuit framing and always-on animated media. | Visible fictional/concept status, evidence-status labels, clear product cards, contact destination after approval, consistent media captions/alt text, accessibility and responsive acceptance checks. |

## 4. Competitor research and methodology

### Method

Reviewed approximately 20 current company pages on October 13, 2026. For the most relevant companies, followed accessible homepage links to product/detail pages: Shield AI Hivemind; Saronic Vessels and Echelon; Epirus Leonidas and Kosmos Mission Suite; Helsing HX-2; DARPA RACER; Skydio X10 and DFR Command; Saildrone Spectre; AeroVironment’s linked Telemax result; and Quantum Systems Mandrill. Also reviewed the linked home and category/solution structure for Vantor, Planet Labs, Samsara, Datadog, and Grafana. Direct user-identified sites were used; no substitutes were needed.

The research is a lightweight marketing/structure scan, not an independent verification of competitor performance. Anduril’s page returned a JavaScript-required message in text extraction. Palantir’s Defense URL redirected to an AIP page with little readable body content. Rheinmetall redirected to German. Northrop Grumman exposed loading modules and limited text. Helsing product/home text was accessible, but the visual capture showed unavailable hero media. These are marked partial rather than filled with assumptions.

### Reference assessments

| Reference and inspected page(s) | Observed pattern; strength or limitation | Kryos lesson | Confidence |
|---|---|---|---|
| [ARX](https://www.arx-defense.com/) — homepage | Dark but visually restrained, text-led sequence: what it does, why, technology, system qualities, dual-use, research foundation, private briefing. It narrows the proposition and explains it in labeled steps. | Borrow the explanatory sequence and one clear briefing action; use Kryos’s own light/industrial art direction. | Medium-high; homepage text/structure accessible, full visual inspection limited. |
| [Anduril](https://www.anduril.com/) — homepage | The text endpoint required JavaScript and exposed no usable section/content detail. | No specific visual lesson recorded. Inspect page manually in a later design workshop if needed. | Low; partial. |
| [Palantir Defense](https://www.palantir.com/aip/defense/) — Defense/AIP page | Redirected to the AIP platform defense route; page text extraction showed only a sitemap link and iframe, so hero/product details were not verified. | No specific pattern attributed. Do not guess from the company’s reputation. | Low; partial. |
| [Shield AI](https://shield.ai/) and [Hivemind](https://shield.ai/hivemind/) — homepage/product page | Homepage groups named aircraft and software by mission. Hivemind detail distinguishes turnkey autonomy from an enterprise tool, then links proof, powered systems, application areas, timeline, and contact. Heavy claims are paired with named proof/customer references. | Differentiate hardware, software, and intended user. In Kryos, only use evidence links if approved proof exists; do not invent them. | High for page structure/content; competitor claims not independently validated. |
| [Saronic](https://www.saronic.com/), [Vessels](https://www.saronic.com/vessels), [Echelon](https://www.saronic.com/echelon) | Vessel listing gives each model a use description and comparable range/speed/payload table; separate software page has plan/simulate/execute steps and interface imagery. This is a clear hardware/software story but assumes a broad, proven portfolio. | Keep model comparisons consistent; give software its own page only if a real interface/product exists. Two Kryos concepts need much less navigation. | High for observed page content; claims belong to Saronic. |
| [Epirus](https://www.epirusinc.com/), [Leonidas](https://www.epirusinc.com/platforms/hpm-leonidas), [Kosmos Mission Suite](https://www.epirusinc.com/platforms/simulation-mission-planning) | Problem-first home and product pages; the product explains a single role, modular configurations, dated evidence links, related product architecture, and request-briefing CTA. Kosmos organizes software as named workflow stages. | Make product purpose obvious, keep cross-links meaningful, and make proof attributable. Do not borrow the defense-specific claims or terminology. | High for text structure; visual behavior not exhaustively assessed. |
| [Helsing](https://helsing.ai/) and [HX-2](https://helsing.ai/hx-2) | Product cards use consistent names, short category descriptions, and “Learn more.” HX-2’s page states features and concise specs, then explains relationship to Altra. In the in-app visual check, black hero space and very large white typography create a strong immersive opening; hero media was unavailable. The detail page’s categorical and numerical claims are specific but should not be copied. | Use one consistent card structure and connect product relationships only when factual. Keep Kryos copy modest; a two-product concept set does not need immersive media. | High for page text; medium for visual (single narrow viewport; unavailable media). |
| [DARPA](https://www.darpa.mil/) and [RACER](https://www.darpa.mil/research/programs/robotic-autonomy-in-complex-environments-with-resiliency) | Research/program page explains that RACER studies autonomy algorithms, not vehicle/sensor technology, then defines the environment and performance objective. It connects a technical goal to program context and media. | State exactly what the concept is and what it is not; separate product from research/aspiration. Do not imply DARPA affiliation. | High for accessible program text; not a corporate product-marketing analog. |
| [Vantor](https://vantor.com/) — homepage/platform/product taxonomy | Leads with “space to ground,” explains data fusion, groups users/industries and parts of a workflow, then names products. Metrics are separated under a “By the numbers” section. | Explain a concept with a simple proposition and a few clear categories; omit metrics without evidence. | Medium-high; readable homepage content, visuals not fully inspected. |
| [Planet Labs](https://www.planet.com/) — homepage/Insights platform | Uses visual examples at broader/closer/deeper scales with location/source captions, followed by “See. Decide. Act.” and product/action flow. | Caption concept imagery with what it depicts and how it supports the explanation; avoid generic decorative background art. | High for text/structure; visuals described by page labels. |
| [Skydio](https://www.skydio.com/), [X10](https://www.skydio.com/x10), [DFR Command](https://www.skydio.com/software/dfr-command) | Top-level navigation separates industries, products, software and resources. X10 page pairs claims with sample sensor imagery and technical capture metadata; DFR Command describes actual screen contents and data/evidence flow. Clear content depth, though the large menu is extensive. | Separate platform from software; show real image samples with labels and specs only when they are actual measurements. Keep Kryos navigation compact. | High for content/page structure; page is extensive and claims are vendor-supplied. |
| [Saildrone](https://www.saildrone.com/) and [Spectre](https://www.saildrone.com/platform/spectre) | Platform page connects variant configuration to payload/mission categories and puts vehicle dimensions, speed/range, payload, and power in a labeled spec section. A contact CTA follows product detail. | Use clear spec labels and group facts; only publish owner-verified fields. The breadth is more than Kryos currently supports. | High for accessible content; specifications not independently validated. |
| [AeroVironment](https://www.avinc.com/) and [Telemax result](https://www.avinc.com/solutions/?_product_lines=telemax-evo) | Navigation organizes solutions by domain/capability and separately exposes company, news, careers, and contact. The linked Telemax selection resolved to a filtered solutions page, not a readable dedicated detail page in this scan. Taxonomy is useful at scale but broad. | Use category filters only when product count justifies them; a short product list should be visible immediately. No detail-page lesson recorded for Telemax. | Medium for navigation; low for individual product page. |
| [Quantum Systems](https://quantum-systems.com/) and [Mandrill](https://quantum-systems.com/mandrill/) | Air/land/sea/cUAS/software navigation; Mandrill is identified simply as a modular high-mobility UGV. Resources, regional choices, contact, and sales actions are distinct. | Name the object plainly and distinguish concept family from delivery/status. Avoid a domain-spanning taxonomy for a two-product concept. | Medium-high; category/detail content accessible, some page content omitted by text extraction. |
| [Rheinmetall](https://www.rheinmetall.com/) — homepage | Redirected to German. The accessible page groups systems/products by land, sea, air, digital, training/service, industry, and mobility. | Broad categories support a large industrial group but would overstate Kryos’s scale. No English copy lesson claimed. | Low-medium; language redirect limits review. |
| [Northrop Grumman](https://www.northropgrumman.com/) — homepage | Mission-solution story links and topic cards are visible, but several sections remained “Loading component…” in text rendering. | Use one or two editorial explainers if real content exists; don’t imitate broad corporate-story volume. | Medium-low; partial page. |
| [RTX](https://www.rtx.com/) — homepage | Clear top-level businesses, customer outcome section, mission categories, and corporate/resources links. Structure helps visitors navigate a very large portfolio. | Keep useful outcomes and contact routes, but scale the information architecture to two concepts. | Medium; main structure/text accessible. |
| [Samsara](https://www.samsara.com/) — homepage | Large navigation groups products, outcomes, industries, integrations, resources, and contact. A clear connected-operations label makes platform scope legible, but the menu would be excessive for Kryos. | State a simple umbrella proposition and keep the menu small. Use sector navigation only once there are multiple real audiences and pages. | Medium-high for structure; full visual inspection limited. |
| [Datadog](https://www.datadoghq.com/) — homepage | A direct platform headline leads to a product catalog, dashboard imagery, trial/platform actions, and technical resource paths. Product taxonomy is deep and supports self-guided evaluation. | Show actual interface evidence if a real public software offering exists; choose only one next action. No mock/fake dashboard recommended for Kryos. | Medium-high for structure/content. |
| [Grafana Labs](https://grafana.com/) — homepage | Direct platform statement, “get started/compare plans,” product features, a demo link, customer stories, and open-source resources. The demo is a useful, direct way to inspect the software. | A real demo/screenshot can reduce ambiguity; if Kryos has no marketing-facing software, omit that section. | High for accessible structure; customer evidence is vendor-provided. |

### Most useful patterns for Kryos, ranked

1. **Lead with one proposition.** ARX and Helsing show a concise first message; Kryos should describe the concept portfolio and disclose its fictional status in the first view.
2. **Use consistent product cards that open meaningful detail.** Saronic and Helsing make portfolio names, categories, and routes legible. Kryos needs two cards at most, not a broad mega-menu.
3. **Structure detail pages around the product’s job, evidence, and facts.** Saildrone, Skydio, and Saronic separate purpose, configuration, technical fields, and contact. Do not fill a spec table with invented numbers.
4. **Pair visuals with literal captions and source/status.** Planet’s scale examples and Skydio’s image metadata show why a visual matters. Generated Kryos renders need a nearby concept label.
5. **Explain a workflow only when the product actually has one.** Epirus’s plan/sense/decide/effect and Saronic’s plan/simulate/execute work because they describe real product organization. Kryos should not claim operational workflows based on abstract copy.
6. **Separate hardware, software, and company information.** Skydio and Shield AI make distinctions explicit. No marketing software product/screenshot was verified in this scope, so do not fabricate a dashboard.
7. **Make inquiry an actual, reachable action.** ARX, Epirus, Saronic, and others use briefings/contact at useful points. Kryos needs an owner-approved email or contact destination first.
8. **Use evidence to earn trust, not decorative “proof” panels.** Company news, customer stories, certifications, specs, and metrics should have a date, source, and owner approval. Kryos has none verified in the current project context.
9. **Keep visual hierarchy stronger than the surrounding ornament.** Product form, readable text, and simple surfaces should carry the story; reduce outlines, glows, motion, and section-height theater.

## 5. Product portfolio recommendation

### Recommended portfolio: one lead concept plus one optional adjacent concept

No real-world product facts are verified by the repository. The README’s project disclaimer is explicit: Kryos is fictional, and its product/operational content is demonstration material. Product names, intended roles, and specifications below are source observations, not verified attributes of real equipment.

| Candidate | Repository evidence | Proposed audience/use (recommendation, not verified fact) | Role in the portfolio | Decision |
|---|---|---|---|---|
| **KRYOS MK-I** — mobile ground robotics concept | Existing `/products/mk-1` route; six-legged render `mk-i-no-bg.png`, side render `mk-i-side-a-trns.png`, video `mki.mp4`; page copy calls it an autonomous ground platform/drone. The render is dark and visibly sci-fi. The detailed claims (mobility, endurance, sensors, payload, secure link) are unverified. | Proposed audience: product/engineering stakeholders interested in ground robotics. Proposed framing: a mobile ground-robot concept for work in complex built environments. Do not claim it can inspect, traverse walls, or operate autonomously without owner approval. | **Lead concept.** The clearest focal product asset and the one most aligned with the autonomy/robotics story. | Retain as concept; revise image and copy; disclose “illustrative fictional concept.” Owner must approve intended use and canonical name. |
| **KRYOS EX-1** — powered human-assist frame concept | Existing `/products/ex-1` route; `ex-1-no-bg.png`, `ex-1-side-b-trns.png`, `EXO_LINE_1.png`, `ex-1-360-b.mp4`. Current rendered image reads as an armored humanoid robot rather than a wearable assist frame; the text asserts assisted lift, hazardous handling, integrated compute/power and common MK stack. | Proposed audience: engineering/human-factors stakeholders exploring wearable assistance. Proposed use language: “powered-frame design concept for physically demanding work.” Confirm whether this is an exoskeleton or a robotic suit before making more specific statements. | **Optional second concept**, shown below MK-I and labeled “adjacent concept exploration.” It broadens the portfolio and weakens a strictly autonomous-ground story; do not imply shared software or architecture. | Retain only if owner wants human-assist robotics as a Kryos category. Otherwise defer from catalog but preserve assets. |
| **Aerial reconnaissance / swarm concept** | Family copy says Aerial Recon Platforms; `kryos_aerial.jpg` shows a stylized uncrewed aircraft in a futuristic interior; `swarm_drones.jpg` shows a large fictional drone formation. No named aerial product detail route or approved product fact sheet was found. | No use or audience recommendation until a specific concept is defined. | Would create a third domain but make a small portfolio less coherent. | **Defer.** Do not create an aerial model name/page based on image assets alone. Revisit after an owner-approved design brief exists. |
| **Integration Systems / software** | Family copy describes embedded facility systems; no scoped public product route/details or verified software product material was identified. Marketing route does not establish a software dashboard or service. | No proposed audience/use until product owner supplies a real product definition. | Not a product in the recommended initial catalog. | Remove from current product-family claims; do not present invented dashboard/software. |

### Positioning statement for approval

**Recommended:** “Kryos is a fictional product concept exploring robotics for complex work, from mobile ground systems to powered human-assist designs.”

This can be shortened to “Robotics concepts for complex work.” Use “fictional” visibly while the README/project status remains unchanged. If the owner wants Kryos to represent a real company, that is a material status change and requires a separate fact-checked content brief before any factual company positioning is drafted.

## 6. Visual and brand system

### Surfaces, color, type, and layout

| Element | Recommendation | Reason / approval needed |
|---|---|---|
| Base backgrounds | Warm off-white or light stone for home, About, catalog, and most copy sections. Use graphite/charcoal selectively behind a lead product render, technical figure, or video. | Mixed surfaces keep text readable and let product media earn the darker stage; do not mechanically convert every current dark area to white. |
| Accent colors | Keep amber as a small action/safety accent; use warm gray, slate, and muted olive as supporting neutrals. Avoid cyan glow and red “critical” coding except where a real semantic status needs it. | Preserve a recognizable industrial cue without warning colors becoming decoration. Exact tokens and contrast need design approval and later measurement. |
| Typography | One modern sans family for headlines/body; optional restrained mono for small data labels. Use sentence case, a controlled scale, body 16–20px with comfortable line-height, readable line lengths. | Current Orbitron/Rajdhani/Exo 2 mix and caps/brackets creates game UI and large text blocks. Reuse available system/web fonts before adding dependencies. |
| Grid/spacing | Set a 12-column desktop grid, consistent max content width, 24–32px card spacing, and a mobile one-column stack. Let content set section height. | Replaces large absolute decorations and full-screen filler with a reusable responsive rhythm. |
| Cards/buttons | Simple rectangular or gently rounded cards, thin neutral border, clear title/body/action hierarchy; one filled primary CTA and quiet secondary links. Visible focus ring. | Reusable cards fit both model concepts without branded SVG frames or hover-only meaning. |
| Image language | Consistent 4:3 or 3:2 product renders on a warm neutral seamless backdrop; documentary workshop close-ups as supporting imagery only if they are authentic. Keep camera angle, surface, shadow, scale, and crop consistent across MK-I and EX-1. | Current assets mix cinematic dark renders, interior-facility imagery, and abstract art. Consistency communicates a considered concept, not a deployed fleet. |
| Technical visuals | Use simple labeled orthographic diagrams or callouts made from known concept geometry. Never use a fake telemetry map, “live” dashboard, invented facility plan, or false system architecture. | Site has no verified marketing interface/screens in the reviewed scope. |
| Motion/accessibility | Motion is optional and low amplitude; no auto-changing gallery by default. Provide pause/controls if animation is retained, respect `prefers-reduced-motion`, keep focus visible and labels accessible. | Source currently starts a timed gallery and looping product video. Actual interaction has not been tested. |

### Reuse opportunities

- Replace the angular `KryosFrame`/`KryosPanel` treatment in marketing components with a small system of simple `MarketingSection`, `ProductCard`, `ConceptStatus`, `PrimaryButton`, and `ImageWithCaption` patterns. Keep System-specific UI outside this work.
- Use one shared `ProductCard` on home and `/products`; one shared detail hero/content/specification pattern on both model routes; and a compact shared marketing header/footer.
- Consolidate product copy/data so card names, headlines, canonical model terms, status labels, and CTA paths do not diverge between `SummaryProduct.vue`, `FullViewProduct.vue`, and `[model].vue`.
- Keep the current global tokens as source reference; define scoped marketing tokens/components before any broader style changes. Do not change global visual behavior that belongs to the excluded section without a separate approved implementation scope.

## 7. Full image and media inventory

“Retain” below means retain the file pending status review; it does not mean the image is evidence of real hardware. For all generated content, use a nearby caption such as **“Illustrative fictional concept rendering.”** If the owner later supplies authentic approved photos, prioritize those over generated scenes. Alt suggestions are guidance for implementation.

| Page/section and current path | Decision and reason | Replacement art direction, format/ratio, generation | Alt/disclosure |
|---|---|---|---|
| Home hero — `app/assets/img/shapes/3d_shapes.png` | Replace. Abstract dark blocks with orange glow do not identify the concept or use. | Use MK-I lead concept render or a workshop photograph. Wide 16:9; warm neutral/graphite, soft practical light, unbranded, room for headline. Prefer approved photo if real product exists; otherwise generated concept render. | If product is shown: “Illustrative render of the KRYOS MK-I ground-robot concept.” Add visible concept disclaimer. Empty alt if it is only atmospheric background. |
| Home capability backdrop — `app/assets/img/shapes/shape3.jpg` | Remove as full background. Abstract glowing geometry reduces text clarity. | No replacement background needed. If section needs imagery, use two small, consistent labeled product crops or simple line diagrams on light surface. 4:3 crops. | Decorative background: `alt=""`. Product diagrams require literal, concise alt/caption and concept label. |
| Home lead MK-I — `app/assets/img/mk-i-no-bg.png` | Revise or replace. Current black, cyan-lit, red-sensor-looking sci-fi render may remain only as a labeled concept image; it is visually dark and aggressive. | Re-render current shape as plausible unarmed inspection/utility concept with matte graphite/aluminum, visible mechanical joints, no weapon-like payload, no emissive eyes; consistent 3/4 studio angle, 4:3 on warm gray. Generation appropriate if model remains fictional. | “Illustrative concept render of a six-legged ground-robot design.” Verify number/form before using description. Caption must say fictional concept. |
| Home announcements — `app/assets/img/shapes/shape5.jpg` | Remove with the unsupported announcement section. | No replacement until there are real, approved, dated updates. | No alt needed if removed. |
| Products intro — `app/assets/img/kryos_catalog.jpg` | Replace. It is a stylized catalog cover with embedded pseudo-text and the component shows no explanatory copy. | Text-led intro plus cards. Optional 3:2 paired studio render only after product set approved. Do not generate text inside the image. | Render alts say which model/concept; visible illustrative caption. |
| Product-family ground — `app/assets/img/kryos_ground.jpg` | Replace or re-render. It depicts a dark, blue-lit robot in an elaborate fictional interior; more cinematic than engineering evidence. | If supporting MK-I, use the same consistent neutral-background product render as home and detail; avoid a second invented facility. 4:3. | “Illustrative concept render of a mobile ground robot.” Label fictional. |
| Product-family aerial — `app/assets/img/kryos_aerial.jpg` | Defer/remove from current catalog. Stylized aircraft and sci-fi hangar imply a product/site without a named product definition. | No replacement until an aerial concept is approved. Later use consistent 3:2 render, same light/material direction as MK-I/EX-1. | If shown later: “Illustrative aerial-platform concept rendering”; no deployment context. |
| Product-family integration — `app/assets/img/kryos_system_lab.jpg` | Remove as a product-family image. It shows robotic arms in a futuristic factory and suggests Kryos-owned manufacturing capacity. | Replace family with EX-1 card only if approved. Otherwise omit the integration family. A generic engineering image is not needed. | Remove or, if reused as a generic illustration, label as generic generated art and avoid “Kryos facility” alt. |
| Product-family circuit art — `app/assets/img/kryos_circuit_1.jpg`, `kryos_circuit_2.jpg`, `kryos_circuit_3.jpg` | Remove from behind/cropped around marketing family cards. Bright circuit/circuit-board graphics repeat the old cyber aesthetic and obscure content. | No replacement. Use neutral card border and spacing. | Decorative art should not be announced to screen readers; preferably remove. |
| Products detail MK-I primary/side — `app/assets/img/mk-i-no-bg.png`, `app/assets/img/mk-i-side-a-trns.png` | Retain only as source concepts, then replace/re-render as a consistent pair. Current render’s cyan/red glow and black transparency suggest sci-fi rather than product documentation. | Main 3/4 view plus left side view with matching orthographic scale, plain light background, material lighting; 4:3 primary and 3:2 side view. Do not use image alternation without manual controls. | Specific descriptions: “Front three-quarter concept view of MK-I” and “Side concept view of MK-I.” Label both fictional. |
| Products detail EX-1 primary/side/line — `app/assets/img/ex-1-no-bg.png`, `ex-1-side-b-trns.png`, `EXO_LINE_1.png` | Replace/rework. Main render reads as a humanoid armored robot, not an accessible human-worn exoskeleton; verify `EXO_LINE_1.png` use before reuse. | If EX-1 is retained, generate a plausible wearable frame shown around a person in neutral work clothes, with visible human anatomy and mechanical support members; no armor, helmet, weapons, or luminous strips. Match MK-I studio background/lighting; 4:3 primary, 3:2 side/detail. | “Illustrative powered-frame concept worn by a person” only after product owner confirms actual wearable intent. Visible fictional-concept label. |
| About hero — `app/assets/img/kryos_building.jpg` | Remove. Image is a large branded tower with red screens and implies a real Kryos headquarters/facility. | Text-led About page. Optional generic workshop photo only if not presented as Kryos-owned; authentic photo preferred. Otherwise a close-up of materials/tools as illustration, 16:9. | Generic-photo caption must clarify it is illustrative/not a Kryos facility. Decorative image gets empty alt. |
| About leadership — `app/assets/img/leadership/helena_voss.png`, `dr_rowan_ilyan.png`, `col_marcus_hale.png`, `yara_chen.png` | Remove unless retained under explicit fictional-world labeling. Portraits have stylized/generated appearance and names/roles are not verified. | No replacement portraits for a concept page. If real people are later approved, use authentic consented portraits with consistent light/background and real biography. | Do not use invented names/portrait alts. If visibly fictional, mark each as fictional character; otherwise remove. |
| Product detail MK-I video — `app/assets/video/mki.mp4`, `mki-360.mp4` | Retain only as clearly illustrative asset after content review; current page autoplays one video by default. | Prefer a real turntable render; 8–15s, 16:9, neutral studio, no combat or fake field operation. Generated motion only if physically consistent and labeled. Autoplay off. | Provide poster/alt-like caption; video controls, captions if narration exists, reduced-motion and pause behavior. Label concept. |
| Product detail EX-1 video — `app/assets/video/ex-1-360-b.mp4`, `ex-1-360.mp4` | Retain only after verifying asset and model status; use no fake field footage. | Matching 8–15s turntable of approved wearable frame concept, same background and spin speed as MK-I. Use still poster by default. | Caption “Illustrative concept rotation”; accessible controls and no autoplay. |
| Unused or outside reviewed route assets — `digital_deployment.jpg`, `land_deployment.jpg`, `sea_deployment.jpg`, `swarm_drones.jpg`, `kryos_terrain.jpg`, `shapes/shape1.jpg`–`shape5.jpg`, `shapes/MetallicStructures.jpg` | Do not add to the new marketing plan by default. Some are referenced by non-reviewed components or unused by these routes; `swarm_drones.jpg` visibly depicts a large drone swarm over a futuristic city. | Keep out of the marketing portfolio until each route/use is approved. Do not repurpose deployment scenes as evidence. `shape3` and `shape5` have separate actions above because they are active on Home. | If any are later used, inspect and identify provenance/status first; do not imply authentic site, operation, or deployment. |

### Consistent generation prompts

Use the same art direction on all generated product assets: neutral seamless warm-gray studio, diffuse daylight/softbox lighting, matte graphite/gray materials, realistic joints/fasteners and scale cues, restrained olive or amber accent only on small non-emissive safety labels, no text/logos/insignia, no weapons, no battlefield, no glowing interfaces. Product images must be captions as concepts.

**MK-I primary render (4:3):**

> Product-design concept render of a compact six-legged unarmed mobile ground robot, plausible mechanical joints and serviceable panels, realistic industrial scale, matte graphite and brushed aluminum, small conventional sensor aperture with no glow, three-quarter front view, warm-gray seamless studio background, soft broad engineering-studio light, crisp but understated material detail, accurate contact shadow, centered object with comfortable margin, 4:3 landscape. No logo, no text, no weapons, no military insignia, no human-sized mech, no hologram, no neon, no fictional facility, no action scene. This is an illustrative fictional concept, not a real product.

**EX-1 primary render (4:3):**

> Industrial-design concept render of a wearable powered assist frame fitted around an adult worker in neutral workwear, visible human body proportions and face, frame members supporting hip and leg motion without covering the person in armor, plausible joints, battery/control pack and straps, realistic serviceable materials, matte graphite/brushed aluminum with one restrained muted-olive detail, warm-gray seamless studio background, same lighting, lens, object scale and visual art direction as a companion mobile ground-robot concept, full-body three-quarter view, 4:3 landscape. No helmet, armor, weapon, glowing strips, tactical insignia, text, logo, battlefield, dramatic pose, or claimed deployment. Clearly an illustrative fictional design concept.

**About detail image (16:9):**

> Neutral documentary-style close-up of hands measuring a machined robotics bracket at a generic engineering workbench, calipers, fasteners and notebook visible, natural soft window light, realistic industrial materials, muted slate and warm-gray palette, authentic candid composition, no branded facility, no military uniform, no readable text, no insignia, no dramatic sci-fi elements. This is generic illustrative imagery, not a Kryos facility.

## 8. Page-by-page redesign specification and copy

All copy below is **proposed concept language** and requires owner approval. It is not a statement that any product is available or capable. Shared layout conventions: one h1 per route, short 50–75 character body lines, visible status/disclosure, useful text links, no essential text inside images, and mobile content stacked in reading order.

### Home `/`

| Order / section | Current issue | Proposed content and visual | CTA/destination | Responsive, component, and approval notes |
|---|---|---|---|---|
| 1. Shared nav | 35-unit tall desktop nav; small icon-only mobile control; no contact route. | Compact wordmark at left; Products and About links; one right-side primary action only after valid inquiry destination exists. | “Explore concepts” → `/products` now. “Contact” awaits approved channel. | Mobile menu button needs accessible name and state; panel must support keyboard focus/close. Reuse shared header. Systems link target is excluded and receives no recommendation here. |
| 2. Hero | Brand name/category label and broad contractor/deployment claims over dark abstract image. | Small status chip “Fictional product concept.” h1 **“Robotics concepts for complex work.”** Paragraph: “Kryos explores mobile ground robotics and powered human-assist systems through two product concepts. Product imagery and descriptions are illustrative.” Use the approved MK-I render on the right or below. Light surface; one dark product media block is optional. | Primary “Explore product concepts” → `/products`; secondary “About the concept” → `/about`. | At mobile, status/headline/copy/action precede media. Reuse `ProductConceptStatus` and `MarketingButton`. Owner approves whether “two product concepts” remains accurate. |
| 3. Concept overview | Capability cards claim targeting, patrol, security, and integration. | h2 **“Two approaches to complex work.”** Card 1: “Mobile ground concept” / “A six-legged ground-robot design exploring movement through built environments.” Card 2: “Powered-frame concept” / “A wearable-frame design exploring physical assistance for demanding tasks.” | “View MK-I concept” → `/products/mk-1`; “View EX-1 concept” → `/products/ex-1`. | Stack cards on mobile, images/labels before text in DOM order. Reuse `ProductCard`. Owner must approve intended-use wording; remove “six-legged” if model changes. |
| 4. Lead product feature | Full-screen MK-I spotlight repeats unverified specs and decorative panels. | h2 **“MK-I: ground robotics concept.”** Copy: “A mobile ground-system concept. Its intended role and technical characteristics are still under review.” Use a matched studio render and 2–3 labeled design questions only if approved (e.g., mobility, sensing, operator interaction as questions, not capabilities). | “Explore the MK-I concept” → `/products/mk-1`. | Two columns desktop, stacked on mobile. `ProductFeature` can share detail content. No spec chips unless verified. |
| 5. Optional design approach | No factual engineering-process section; current claims are abstract. | Add only if owner supplies approved design principles. Candidate heading **“Designed around the operator.”** Copy: “The concept work asks how a system should communicate status, preserve human decision-making, and remain understandable during use.” | No CTA necessary; optionally “About the concept” → `/about`. | Proposed statement, not verified current behavior; require owner approval. If no principles are approved, omit this section. |
| 6. Closing CTA | Unsupported announcements instead of a useful next step. | Replace announcements with **“Explore the concepts.”** Copy: “Review the current designs and the open questions behind each one.” | “View product concepts” → `/products`. | Use light surface and simple text; no news until real updates exist. |
| 7. Footer | Four columns of fictional programs and dead links. | Short description, Products, About, project-status/disclaimer; privacy/legal only if pages exist; optional approved public email. | Existing links `/products`, `/about`; contact only after approval. | Compact one-column mobile and two-column desktop. Reuse with other routes. |

### Products `/products`

**Existing order:** image-only catalog intro → three platform-family sections (ground/aerial/integration) → deployment profiles and capability claims → separate MK-I and EX-1 spotlights.

**Proposed order:**

1. **Catalog intro:** h1 “Product concepts”; copy “Two design concepts exploring mobile ground robotics and powered human-assist systems. They are illustrative and do not represent available products.” CTA to first concept; no image-only banner.
2. **Product cards:** MK-I (lead) and EX-1 (optional adjacent concept), using same render aspect ratio, title/category/status label/short concept statement/detail CTA. Do not show aerial, integration, sea, digital, or black-site categories.
3. **Portfolio note:** “Concept status” with plain-language explanation that specifications and availability are not verified/defined. No capability checklist.
4. **Closing CTA:** “Questions about the concept?” Primary route to `/about` until an inquiry destination exists; after approval, replace with the named email/contact path.

| Element | Recommendation |
|---|---|
| Headline | **Product concepts** — content status: proposed concept language. |
| Supporting copy | “Explore the current Kryos designs: a mobile ground-robot concept and a powered-frame concept. These designs are illustrative; technical specifications and product availability have not been established.” — status: awaiting owner approval, grounded in repository fictional status. |
| CTA mapping | “View MK-I concept” → `/products/mk-1`; “View EX-1 concept” → `/products/ex-1`; “About this project” → `/about`. |
| Mobile behavior | Single-column cards, consistent image ratio and no clipped SVG frames; action remains visible without hover. |
| Components | Shared `ProductCard`, `StatusLabel`, `ImageWithCaption`, `MarketingSection`. Remove repeated FullView spotlights that duplicate cards. |
| Approval | Confirm whether EX-1 is in scope, canonical names, fictional disclaimer, intended-use wording, and whether a public contact path will exist. |

### Product detail template — MK-I and EX-1

**Consistent order:** breadcrumb/back to products → product name and concept status → short proposition → large labeled render → concept intent/design questions → specifications only if verified → optional diagram → concept limitations/status → catalog link and approved contact. No initial delay, fake dossier request, autoplay rotation, or invented common architecture.

| Section | MK-I proposed copy | EX-1 proposed copy | Visual/reuse and verification |
|---|---|---|---|
| Product hero/status | h1 “MK-I ground robotics concept”; status “Fictional concept.” Support: “A six-legged mobile-system design exploring robotic form for complex built environments.” | h1 “EX-1 powered-frame concept”; status “Fictional concept.” Support: “A wearable-frame design exploring how powered support could assist physically demanding work.” | Matched 4:3 studio renders, text-first on mobile, label adjacent to media. Confirm geometry and purpose. |
| Design intent | “The current concept focuses on a mobile ground platform. Its intended operating environment and operator workflow require owner definition.” | “The current concept explores a wearable powered frame. The intended user, task and human-safety constraints require owner definition.” | Use simple editorial panel, not “System Architecture.” These statements intentionally flag unknowns. |
| Key characteristics | **No specification table until facts are approved.** If useful, list “Concept form: six-legged ground platform” only after owner confirms. | **No specification table until facts are approved.** If useful, list “Concept form: wearable powered frame” only after owner confirms. | Replace spec list with “Design questions” (non-claims): terrain, operator control, serviceability; user, ergonomics, fail-safe behavior. Approve wording. |
| Gallery/video | Two static render views with captions; optional manually played turntable clip. | Same. | Consistent aspect/crop, semantic alt, keyboard-operable controls, no auto rotation or looping by default. |
| Close | “Return to all product concepts.” | “Return to all product concepts.” | CTA → `/products`; secondary contact only after approved destination. |

**Copy statuses:** model names and images are present in repository; concept status comes from README. “Six-legged” and “wearable powered frame” describe current designs/assets but still need owner confirmation. Specific capabilities, performance, common architecture, safety constraints, and availability are unverified and should not appear as facts.

### About `/about`

**Existing order:** building image and long company/contractor claim → stated mission → executive leadership panel with four named people.

**Proposed order:** (1) h1 “About this concept”; (2) short project context; (3) “What the concept explores” with two product categories; (4) design principles only if approved; (5) disclosure and link back to product concepts. Remove leader portraits and company/facility imagery while fictional status remains.

| Copy element | Proposed copy | Status/decision |
|---|---|---|
| Headline | **About this concept** | Proposed; accurate to current README. |
| Paragraph | “Kryos Defense Solutions is a fictional product concept and portfolio project. It explores how ground robotics and powered-frame designs might be presented for complex work. The designs and product claims shown here are illustrative, not real products or deployments.” | Proposed; confirm precise public disclosure wording. |
| Principles (optional) | “The concept work prioritizes clear operator communication, maintainable design, and honest descriptions of what is known.” | Awaiting owner approval; do not imply currently implemented product properties. |
| CTA | “Explore the product concepts” → `/products`. | Existing route. |

Do not publish history, headquarters, leadership, credentials, partners, certifications, research relationships, or recruitment content unless real and approved. If fictional characters are important to the creative direction, label the page/world clearly and keep it separate from a business-facing product catalog.

### Shared navigation and footer

- Navigation labels for in-scope marketing content: **Products**, **About**. The logo/wordmark links home. Primary action is **Explore concepts** → `/products`. No “Request information” or “Contact” label until a real destination is approved.
- Mobile: named menu button with expanded/collapsed state; predictable open/close; Escape and focus behavior validated; no focus trap unless the panel is implemented as a modal. Ensure links are keyboard accessible and focus is visible.
- Footer: short status/disclosure; Products; About; privacy/legal only when actual destinations exist; public email only after approval. Remove all `#` links and fictional program link groups.
- Shared components: `MarketingHeader`, `MobileNav`, `MarketingFooter`, `ProductCard`, `ConceptStatus`, `PrimaryAction`, `ImageWithCaption`, `ProductDetailSection`. Scope tokens under marketing styling so the excluded area is not unintentionally redesigned.

## 9. Conversion journey and CTA map

### Primary CTA

**Choose “Explore product concepts” → `/products`.** It is a real existing scoped destination, matches the project’s concept status, and lets visitors learn before an inquiry channel exists. It should be the primary CTA in the home hero and navigation.

| CTA label | Current/required destination | Status |
|---|---|---|
| Explore product concepts | `/products` | Existing route; recommended primary CTA. |
| View MK-I concept | `/products/mk-1` | Existing route. |
| View EX-1 concept | `/products/ex-1` | Existing route; keep only if EX-1 is approved for portfolio. |
| About this concept | `/about` | Existing route. |
| Contact / Request product information | No scoped route, form, or approved public email found. | **Blocked on owner decision.** Simplest option: show a supplied and approved business email as a `mailto:` link. If no public address is wanted, omit contact CTA. A form should be proposed only after deciding destination, privacy notice, ownership, and expected response process. |

Do not add “Request briefing,” “Get technical dossier,” demo, procurement, sales, or deployment-team CTAs unless a real workflow and responsible owner exist. No testimonials, customer logos, certifications, case studies, or social-proof counters are recommended.

## 10. Proposed copy library and content status

| Page/section | Current message | Proposed headline | Proposed support | CTA | Status |
|---|---|---|---|---|---|
| Home hero | “Kryos Defense Solutions” / “[Autonomous Combat Robotics]” and contractor/deployment claims | “Robotics concepts for complex work.” | “Kryos explores mobile ground robotics and powered human-assist systems through two product concepts. Product imagery and descriptions are illustrative.” | Explore product concepts → `/products` | Proposed concept language; approve disclosure and portfolio. |
| Home concept overview | Target acquisition, patrol/interdiction, secure integration | “Two approaches to complex work.” | “A mobile ground-system concept and a powered-frame concept, each with open design questions and no verified performance claims.” | View MK-I / EX-1 → detail routes | Proposed, subject to EX-1 decision. |
| Home MK-I | Flagship unit “maintains operational integrity where conventional systems fail” | “MK-I: ground robotics concept.” | “A six-legged mobile-system design exploring robotic form for complex built environments.” | Explore MK-I → `/products/mk-1` | Proposed; confirm appearance and purpose. |
| Home close | Unsupported deployment/facility announcements | “Explore the concepts.” | “Review the current designs and the questions still to be answered.” | View product concepts → `/products` | Proposed. |
| Products intro | Image-only “Kryos Catalog” | “Product concepts.” | “Explore a mobile ground-robot design and a powered-frame design. These are fictional concepts; technical specifications and availability have not been established.” | View concepts | Proposed; align with approved product count. |
| MK-I detail | Tactical product, wall traversal, 18–26h, sensors, encrypted communications, payload claims | “MK-I ground robotics concept.” | “A six-legged mobile-system design exploring robotic form for complex built environments. Intended use and specifications remain under review.” | Back to product concepts → `/products` | Proposed; no specs are verified. |
| EX-1 detail | Tactical exoframe with lift, sensor spine, safety and integration claims | “EX-1 powered-frame concept.” | “A wearable-frame design exploring how powered support could assist physically demanding work. Intended user, task, and technical characteristics remain under review.” | Back to product concepts → `/products` | Proposed; confirm exoskeleton form and role. |
| About | Privately held contractor, field proven, global facilities, named leadership | “About this concept.” | “Kryos Defense Solutions is a fictional product concept and portfolio project. Designs and product claims are illustrative, not real products or deployments.” | Explore product concepts → `/products` | Grounded in README; approve final public wording. |
| Contact | Dossier/briefing or deployment team | “Questions about the concept?” | “Use the approved public contact channel to discuss the project.” | No destination until owner supplies one. | Awaiting approval; do not publish a dead or invented link. |

## 11. Implementation roadmap and acceptance criteria

This is a proposed sequence for a later, explicitly approved implementation task. It intentionally excludes the System area and any backend/product-functionality work.

| Phase/task | Priority, routes/files | Dependencies | Acceptance criteria | Owner approval |
|---|---|---|---|---|
| **Phase 1 — Brand/product truth**: approve fictional status, exact disclaimer, portfolio count, canonical names, intended roles, approved claims, EX-1 scope, inquiry channel. | P0; content brief only; affects `/`, `/about`, `/products`, both detail routes. | None. Must precede production copy and asset choices. | Every public statement is tagged as repository fact, approved concept language, or verified claim; all unsupported facilities, metrics, partners, deployments, leadership, specs are removed/marked; one primary CTA/destination is named. | Required project-owner decision. |
| Product copy and taxonomy inventory | P0; `Hero.vue`, `CoreCapabilities.vue`, `SummaryProduct.vue`, `ProductFamiliesOverview.vue`, `DeploymentProfiles.vue`, `app/pages/products/[model].vue`, metadata in pages. | Phase 1 decisions. | MK-I/EX-1 names match across cards, detail, metadata and alts; unsupported families and “deployment profile” claims are not presented as offerings; no false `technical specification` label. | Product owner approves each statement/spec field. |
| **Phase 2 — Design foundation and shared components**: scoped marketing tokens and compact accessible shared header/footer, buttons, cards, status labels, image captions. | P1; `Nav.vue`, `KryosFooter.vue`, `global.css` or new scoped marketing CSS, shared marketing components. | Phase 1’s brand status and CTA. | Tokens cover surfaces/type/spacing/border/accent/focus; actual existing paths only; no `#` placeholders in scoped marketing links; control buttons have accessible names/states; testable focus/reduced-motion expectations documented. Systems destination remains outside redesign. | Approve art direction and primary CTA. |
| **Phase 3 — Home and catalog**: replace home hero/capability/announcement sections; text-led `/products`; shared product cards. | P1; `/`, `/products`; `Hero.vue`, `CoreCapabilities.vue`, `KryosHighlightMKI.vue`, `Highlights.vue`, `ProductHero.vue`, `ProductFamiliesOverview.vue`, `DeploymentProfiles.vue`, `FullViewProduct.vue`, `SummaryProduct.vue`. | Approved product taxonomy and copy; Phase 2 components. | Home h1 explains concept and disclosure appears in first view; primary CTA reaches `/products`; only approved product cards render; no unsupported metrics/news/deployment profiles; product-family/card/detail naming is consistent. | Approve final home/catalog copy and EX-1 placement. |
| **Phase 4 — Detail and About**: consolidate detail template; remove fake loading; revise About; remove or label leadership. | P1; `/products/mk-1`, `/products/ex-1`, `/about`; `app/pages/products/[model].vue`, `ImageGallery.vue`, `VideoFullPanel.vue`, `LeadershipPanel.vue`, `app/pages/about.vue`. | Approved concept labels, design intent and status; Phase 2 components. | Both detail routes share same sections and valid back link; no unverified specs; gallery has controls or remains static; video does not autoplay; About matches fictional/real status decision and contains only approved people/organization facts. | Approve fact and privacy review for people/photos if retained. |
| **Phase 5 — Media and accessibility/responsive polish**: replace/re-render media and validate all marketing routes. | P1/P2; paths in §7; all in-scope routes and marketing components. | Approved art direction and asset prompts; content complete. | All image provenance/status known; generated renders labeled; consistent crop/material/light; meaningful alt or empty decorative alt; no fake live data, customer logos, deployments or facilities; keyboard, mobile menu, visible focus, reduced motion, zoom/reflow, contrast, CTA targets checked at representative sizes. | Owner approves final image set and public contact/legal links. |

### Suggested validation checklist for the implementation task

- Inspect all five routes at desktop and narrow mobile widths; confirm headings, text, images, cards, nav, and CTAs reflow without horizontal scroll/clipping.
- Keyboard-only: open/close navigation, reach every link, see focus, activate detail/back actions; screen-reader labels for menu and gallery controls are meaningful.
- Verify reduced-motion behavior; no unexpected auto-changing gallery or autoplay video; provide pause and captions/alternative where required.
- Measure text/controls against WCAG contrast targets in rendered states; do not infer compliance from token names.
- Check every CTA resolves to its approved destination; no placeholder `#`, fake contact form, dossier, portal, or sales promise.
- Verify product copy against approved fact sheet; show status/disclosure near product media and in metadata as appropriate.
- Verify images’ sources, licenses/permissions, generated status, alt text, ratio/crop, loading behavior, and mobile focal point.
- Confirm the explicitly excluded System section has not been inspected or changed as part of the implementation.

## 12. Assumptions, risks, and required owner decisions

### Known repository facts

- The README identifies Kryos as fictional and says this is a portfolio project, not an actual defense product.
- The pages contain MK-I and EX-1 product routes; code includes the current claims and specs described above.
- Aerial, sea, digital and facility imagery exist, but asset existence does not establish a product or deployment.
- No scoped marketing Contact page, public email, briefing workflow, or inquiry form was found.
- No rendered local QA was available in this assessment; runtime behavior and visual compliance remain open.

### Risks

- Realistic product/facility imagery without nearby concept disclosure could still be mistaken for real hardware or deployments.
- Exo-frame claims can create safety expectations. Do not claim lift limits, control safety, compatibility, endurance, or human outcomes without engineering validation.
- Current file content and public copy conflict with the fictional README status; publication without correction could misrepresent a real-world defense company or capability.
- The market-facing “defense” category may imply procurement credibility. Consider whether the brand should explicitly present itself as a **portfolio/concept project** in the header/footer, browser metadata, and image captions.
- An invented contact path or fake lead-generation form would undermine trust and may create operational/privacy obligations. Select a real owner and endpoint first.

### Approval decisions before implementation

1. Should Kryos remain publicly and visibly a fictional portfolio/product concept? **Recommendation: yes, consistent with README.**
2. Approve the positioning “Robotics concepts for complex work,” or supply a different factually accurate positioning.
3. Keep EX-1 as an adjacent concept card, or narrow the catalog to MK-I only? **Recommendation: MK-I lead; EX-1 optional and explicitly adjacent.**
4. Confirm canonical names: MK-I vs MK-1; EX-1 vs EX-I; confirm whether EX-1 is truly a wearable exoskeleton concept.
5. Define intended environments/use cases for each concept, or authorize neutral “design intent under review” wording.
6. Are any current claims/specs supported by an approved fact sheet? If yes, identify exact fields and evidence; otherwise remove them.
7. Should fictional leadership characters remain as worldbuilding, be labeled fictional, or be removed? **Recommendation: remove from business-facing About.**
8. Is a public inquiry channel wanted? If yes, provide/approve a public business email or contact form owner/destination.
9. Approve the light-neutral/graphite/olive/amber direction and consistent generated-render brief; identify any authentic authorized photos before generating replacements.

## 13. Final recommendation and decisions for the project owner

Approve a marketing site that clearly says **Kryos is a fictional product concept**, presents MK-I as the lead ground-robotics design, optionally presents EX-1 as a separate human-assist exploration, and defers aerial/integration/sea/digital families. Use **“Robotics concepts for complex work”** as the working positioning. Replace sci-fi city/facility/circuit art with a matched set of restrained, studio-style concept renders and only generic engineering imagery that is clearly labeled. Make **“Explore product concepts” → `/products`** the primary action; add a Contact action only when an approved, real destination exists.

Before implementation, the owner should decide the brand status, whether EX-1 remains in the portfolio, the canonical product names and intended roles, any claim/specification that has evidence, leadership treatment, contact destination, and asset-generation policy. Once those decisions are approved, use the phased roadmap in §11 and validate all five in-scope routes without expanding into the excluded System section.

## Source index

Repository paths reviewed: `README.md`; `app/pages/index.vue`; `app/pages/about.vue`; `app/pages/products/index.vue`; `app/pages/products/[model].vue`; `app/components/Hero.vue`; `CoreCapabilities.vue`; `KryosHighlightMKI.vue`; `Highlights.vue`; `Nav.vue`; `KryosFooter.vue`; `Buttons/KryosToggleMenu.vue`; `Panels/KryosSidePanel.vue`; `About/LeadershipPanel.vue`; product components under `app/components/Products/`; `app/assets/css/global.css`; current product/marketing images under `app/assets/img/`; and product videos under `app/assets/video/`. External sources are directly linked in §4. The System section was intentionally not reviewed.
