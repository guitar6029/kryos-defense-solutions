# KRYOS Defense Solutions — Marketing UI Assessment and Redesign Proposal

**Status:** Assessment proposal for review; no redesign implementation is authorized by this document.

## 1. Executive summary

The marketing site has a coherent dark graphite/amber palette and clear interest in presenting engineered products, but its repeated sci-fi panel graphics, angular image masks, oversized display type, bracketed labels, and fictional deployment signals make it read like a game interface. The copy compounds this: it presents Kryos as an active defense contractor with facilities, deployments, partners, leadership, procurement access, and performance specifications, while repository instructions identify Kryos as a fictional UI concept.

Recommended direction: **an industrial engineering and autonomy brand**. Lead with the actual concept products and clear use-case framing; use restrained, documentary-style equipment and workshop photography; show only clearly labeled illustrative software concepts; use a light neutral foundation with charcoal product/software sections and small amber safety accents. Replace unverifiable claims with transparent concept language or facts the owner can substantiate. A proposed first-screen headline is **“Autonomous systems for complex operating environments.”**

The highest-priority work is claim integrity, clear navigation and working calls to action, and a more credible visual system. No product capability should be stated as fact until confirmed by the product owner.

## 2. Pages assessed and boundaries

Source and asset review covered these public marketing routes:

| Route | Included content |
|---|---|
| `/` | `Hero`, `CoreCapabilities`, `KryosHighlightMKI`, `Highlights`, shared navigation/footer |
| `/about` | Company description, building image, leadership panels, shared navigation/footer |
| `/products` | Product hero, platform families, deployment profiles, MK-I and EX-1 spotlights |
| `/products/mk-1` and `/products/ex-1` | Shared product detail template, gallery, architecture copy, specifications, video panel |

The `/systems` route and all System-specific functionality were explicitly excluded. I did not inspect its implementation or runtime. The shared header contains a Systems link, noted only as a boundary item; its destination was not assessed. No fleet/device pages, API, database, or SSE work was inspected.

**Assessment limits:** This is a source and asset review, not a rendered browser audit. `npm run dev` could not run because `npm` is unavailable in the shell. Responsive behavior, keyboard interactions, actual contrast ratios, animation preferences, and route rendering therefore need validation during implementation. Asset files were visually inspected for the home hero, home capability background, catalog hero, about building, and MK-I image; other identified assets are classified by their filenames/usages and should be visually checked before replacement.

## 3. Prioritized audit findings

### P0 — credibility, accessibility, and usability

1. **Fictional claims appear factual.** The home hero states “24+ Global Facilities,” “72 Active Deployment Zones,” and “Tier-1 Defense Contractor”; the home announcements describe limited deployment, new subterranean facilities, and a government research initiative. The About page calls Kryos a privately held contractor and shows named leaders. Footer links imply partnerships, divisions, career paths, compliance protocols, facilities, and disclosure archives. Repository guidance says Kryos is a fictional UI concept. Remove or explicitly mark all simulated content as illustrative unless the owner supplies evidence and approves publication.
2. **Product claims need owner verification.** The MK-I and EX-1 pages assert operational capabilities, resilience, sensor suites, encrypted links, integration, and numeric endurance. Treat all such statements as unverified product copy pending a fact sheet; do not preserve them by default.
3. **Calls to action and navigation are unreliable.** The home R&D link and most footer links use `#`; there is no functional contact path. The desktop navigation uses “Home / Products / About / Systems,” with no clear inquiry action. Replace placeholder links with real destinations or remove them; keep the excluded Systems area out of marketing redesign decisions.
4. **Image alternative text does not reliably describe images.** The home background says “KRYOS protects the entire world,” the catalog hero uses “Kryos Catalog,” and several capability/product images have generic or inaccurate descriptions. Write concise, literal alt text for informative images and empty alt text for decorative backgrounds.

### P1 — high-impact marketing and visual changes

1. **The hero says what the company is called and a broad category, not what the concept offers.** “Kryos Defense Solutions” and “[Autonomous Combat Robotics]” sit above a generic abstract graphic and broad claims. Explain the verified product concept and intended audience in one sentence; use one primary CTA.
2. **The visual language is heavily fictionalized.** `Orbitron`, “Exo 2,” `Rajdhani`, continuous bracket styling, angular SVG frames, glowing amber/cyan details, and decorative circuit/panel assets dominate. The dark palette can remain as a supporting surface, but use ordinary grids, readable body typography, and real material/engineering detail as the primary visual evidence.
3. **Product information architecture conflicts.** The family overview presents Ground, Aerial, and Integration Systems; separate product detail routes exist for MK-I and EX-1; deployment profiles and imagery add air, land, sea, and digital categories. Decide which are actual product families, concepts, or merely illustrative scenarios before designing the catalog.
4. **The Products hero is image-only.** `ProductHero.vue` renders a half-height catalog image with no heading, description, or CTA. The image itself includes a stylized “KRYOS // CATALOG” graphic. Add a text-led, scannable introduction and product anchors/cards.
5. **About mixes company claims and fictional bios without substantiation.** Reframe it as “About this concept” until the organization, people, and facilities can be verified. If the brand is meant to remain fictional, label bios and facilities as concept content.
6. **Announcements imply real events with no evidence links.** Remove the current deployment/facility/government-partner headlines. Add a news module only when there are dated, attributable updates; otherwise use a concise “Design principles” or “Explore the product concepts” section.

### P2 — refinements

- Reduce decorative section labels, repeated full-screen sections, hover scaling, and background art that competes with copy. Make page length reflect content rather than repeated `min-h-screen` sections.
- Establish one type scale, spacing scale, content width, button style, focus treatment, and image ratio. Reserve all caps/monospace styling for small technical labels.
- Test mobile navigation, heading order, visible focus, reduced-motion behavior, zoom/reflow, and text/background contrast. Prefer normal document flow and avoid text over busy photography.
- Consolidate product overview and flagship spotlights where they repeat the same information; keep detail pages focused on model-specific facts.

### Retain / revise / remove / add

| Action | Recommendation |
|---|---|
| Retain | Kryos name, MK-I and EX-1 concept assets, restrained graphite/amber accents, concise technical labels, product detail routes if the models remain in scope. |
| Revise | Hero proposition, About framing, capability descriptions, product taxonomy/specifications, image treatments, headings, navigation, footer, alt text, CTA destinations. |
| Remove | Unsupported facility/deployment/contract/partner/government claims, placeholder links, fake announcement headlines, repeated circuit framing and decorative sci-fi glow. |
| Add | Clear concept/fiction labeling where appropriate; real inquiry destination; product-family overview based on confirmed inventory; evidence/source links for any future real-world claims; clear illustrative labels on generated visuals. |

## 4. Lightweight reference review — 20 sites

The notes below describe only patterns visible in the referenced homepage/page text and accessible page structure on **October 13, 2026**. They are inspiration, not endorsements or templates. Some sites are JavaScript-heavy or returned sparse text; those limitations are called out. Lessons are recommendations for Kryos, not observed Kryos features.

| Company and page | Observed direction and useful pattern | Relevance and adaptable lesson |
|---|---|---|
| [ARX](https://www.arx-defense.com/) | Dark, restrained, text-led page; numbered sections explain a defined problem, mechanism, qualities, dual use, research, and briefing CTA. | High. State one narrow problem and explain the system in ordered, plain-language steps; avoid borrowing its dark art direction. |
| [Anduril](https://www.anduril.com/) | Page title describes advanced defense technology; text extraction returned “Please enable javascript,” so visual details and sections could not be verified. | High category relevance, low observed detail. Do not infer design patterns; inspect manually if a later visual benchmark is needed. |
| [Palantir Defense](https://www.palantir.com/aip/defense/) | Redirected to a platform page but returned almost no readable body text. | High category relevance, low observed detail. No pattern attributed; use only as a future manual reference. |
| [Shield AI](https://shield.ai/) | Product-led homepage names aircraft and Hivemind, then explains mission autonomy and presents mission, proof links, and contact CTA. | High. Organize by named product and supported use case; pair claims with linked evidence. |
| [Saronic](https://www.saronic.com/) | Maritime fleet products, software (Echelon), shipyard, news, and “proven” section make a hardware/software/manufacturing story. | High. Connect product, software, and production story only where those are verified; keep product pages and news distinct. |
| [Epirus](https://www.epirusinc.com/) | Problem-first headline, concise system description, a Plan/Sense/Decide/Effect sequence, products, press links, and briefing CTA. | High. A simple process diagram can explain a complex system more clearly than decorative panels. |
| [Helsing](https://helsing.ai/) | Product and domain navigation, product cards, company responsibility statement, manufacturing, careers, and newsroom. | High. Give each confirmed product a clear role and separate company/news content from product facts. |
| [DARPA](https://www.darpa.mil/) | Mission/research portal structure with program stories, technical offices, media, and routes for communities/performers. | Medium. Explain R&D using concrete program stories and pathways; Kryos should not imply public-sector affiliation. |
| [Vantor](https://vantor.com/) | “Space to ground” proposition, data-fusion explanation, distinct industries, product cycle, and metrics. | Medium-high for geospatial/enterprise clarity. Define a concise value proposition and group functions by user outcome; publish metrics only when evidenced. |
| [Planet Labs](https://www.planet.com/) | Demonstrates different imagery scales (“broader,” “closer,” “deeper”), then connects data to decisions and customers. | Medium-high. Use visual examples with captions that identify what each image shows and why it matters. |
| [Skydio](https://www.skydio.com/) | Navigation organizes use cases, products, software, and resources; homepage pairs robot imagery with software dashboards and customer stories. | High. Separate hardware from software and use labeled real screenshots or clearly labeled mockups. |
| [Saildrone](https://www.saildrone.com/) | Strong maritime proposition, named missions/platforms, operational metrics, payload/system detail, and linked news. | Medium-high. Make each metric attributable and product-specific; use field imagery that shows real operating context. |
| [AeroVironment](https://www.avinc.com/) | Large taxonomy by domain and capability, with product, company, news, careers, and contact destinations. | High. Use a modest, stable information architecture and make products discoverable by family/use. |
| [Quantum Systems](https://quantum-systems.com/) | Domain navigation for air/land/sea/cUAS/software and product lists; news and contact routes are prominent in extracted structure. | High. Taxonomy can handle mixed hardware/software, but only list domains Kryos actually intends to represent. |
| [Rheinmetall](https://www.rheinmetall.com/) | Redirected to German-language home; observed “Systems & Products” are grouped by land/sea/air/digital/industry. | Medium. Offer language choice and clear product categories if audience requires it; review English page separately before adopting tone. |
| [Northrop Grumman](https://www.northropgrumman.com/) | Page text shows mission solution stories, topic cards, corporate routes, and a news/story-driven structure; some page modules remained “Loading component…”. | Medium. Use editorial stories to make complex engineering approachable; do not mimic large-contractor scale or authority claims. |
| [RTX](https://www.rtx.com/) | Corporate overview uses business divisions, mission categories, customer outcomes, news, and careers. | Medium. Structure for scanning and proof; a fictional/small concept site should use fewer, more direct paths. |
| [Samsara](https://www.samsara.com/) | Connected-operations platform is segmented into products, outcomes, industries, resources, and customer support. | High for enterprise IA. Explain user outcomes, then show the product area that supports them; avoid oversized mega-menus. |
| [Datadog](https://www.datadoghq.com/) | Product categories, trial/platform CTAs, dashboard imagery, customer trust statement, reports, and deep documentation paths. | Medium-high for software presentation. Use realistic dashboard imagery and drill-down information hierarchy; label mock data. |
| [Grafana Labs](https://grafana.com/) | A direct platform proposition, clear get-started/pricing actions, feature modules, demo link, customer stories, and open-source/resources. | Medium-high for software clarity. Let a concrete demo screenshot do explanatory work, with one obvious next action. |

**Observed vs. proposed:** reference notes above are observations from the accessible pages. All implementation lessons are recommendations. The Anduril and Palantir pages yielded insufficient readable content for detailed visual assessment; Northrop Grumman had loading modules; Rheinmetall redirected to German. No unavailable page was silently substituted.

## 5. Recommended brand and visual direction

### Direction: field engineering, clearly explained

- **Base surfaces:** warm light gray/stone for most marketing pages; deep charcoal for selected product hero, software, or technical sections. Avoid making every section a full-screen dark scene.
- **Color:** graphite, off-white, muted field green or slate, and a restrained safety amber. Keep amber for small labels, key actions, and actual alert meanings. Remove cyan/neon glow as a default effect. Confirm contrast before implementation.
- **Typography:** readable modern sans for headings and body (a system stack is acceptable); one restrained mono face for small data labels. Replace display type that makes long copy difficult to read. Use sentence case for headlines.
- **Layout:** editorial grid, generous but consistent spacing, short readable line lengths, rectangular or lightly rounded cards, thin neutral dividers, and a consistent image crop. Remove decorative brackets and heavy angular SVG borders from most components.
- **Photography:** authentic photos are preferred if genuine prototypes/workshop locations/operators exist and can be shared. If not, use generated conceptual imagery labeled “Illustrative concept rendering.” Avoid uniforms, insignia, live operations, identifiable facilities, or markings that imply real deployment.
- **Software:** use actual product screenshots only when real interfaces exist. Otherwise show a labeled static concept diagram; do not make generated telemetry/map screens look like live Kryos software.
- **Motion:** subtle transitions only; respect reduced-motion preference and never animate essential content into view.
- **Tokens to define:** surface levels, text and muted text, border, accent/action, warning, spacing steps, content max width, type sizes/line heights, radii, shadow, focus ring, and image ratios. Preserve dark treatment as a purposeful option rather than the entire brand.

## 6. Page-by-page makeover plan

### Home `/`

**Before:** full-screen abstract dark image, company-name headline, combat robotics label, broad paragraph, two CTAs (one placeholder), and unsupported facilities/deployment/contractor metrics. Then capability cards, long MK-I spotlight, and unverified announcements.

**After / section order:** (1) compact global nav with Products, About, and a real contact action; (2) split hero with plain-language headline, one-sentence concept description, “Explore product concepts” and optional “About Kryos” links; (3) two or three confirmed product/capability cards; (4) concise MK-I/EX-1 concept comparison with links; (5) illustrative use-case/process diagram if it answers a real question; (6) contact CTA and minimal footer. Remove unsupported metrics and announcements unless documented.

**Copy proposal:** Headline “Autonomous systems for complex operating environments.” Support: “Kryos is a product concept exploring ground robotics and human-assist systems for industrial and defense contexts.” CTA: “Explore product concepts.” This wording explicitly describes a concept; if Kryos is later intended to represent a real organization, replace only after facts are supplied.

### About `/about`

**Before:** text describes a privately held contractor, claimed field deployments and purpose; branded tower image; named executive leadership panels.

**After:** introduce the project/company status honestly; explain design intent and confirmed team facts only. Use a real workshop/product image or a neutral materials/detail photograph. Keep leadership only if identities/roles are approved and real; for a fictional concept, label fictional bios visibly or remove them.

**Copy proposal:** Headline “A concept for practical autonomous systems.” Support: “Kryos explores how robotics and operator-centered design could support work in demanding industrial and defense environments.” CTA: “Explore the product concepts.”

### Product family `/products`

**Before:** image-only hero, then Ground/Aerial/Integration family cards, deployment profiles (air/land/sea/digital), and separate MK-I/EX-1 spotlights. Catalog imagery and family names imply broader built capability than the detail routes establish.

**After:** start with heading and short overview; show only confirmed product concepts in two consistent cards; state concept/status and top verified characteristics; link to details; consolidate duplicate spotlights. Remove the deployment-profile area unless each scenario has a substantiated relationship to a product. If families are aspirational, label them roadmap concepts and use the existing README roadmap only as context, never as delivered capability.

**Copy proposal:** Headline “Product concepts.” Support: “Explore two proposed systems: a mobile ground robotics concept and a powered human-assist frame. Descriptions are illustrative and subject to validation.” CTA: “View MK-I concept” / “View EX-1 concept.”

### Product detail `/products/mk-1`, `/products/ex-1`

**Before:** two-second “LOADING…” state, product title, repeated abstract SVG framing, product render/gallery, architecture prose, dense spec list, and video. The wording describes capabilities and specifications as established fact.

**After:** remove the artificial loading delay; lead with product name, concept/status badge, short purpose statement, and product image; present intended use, key design questions, and verified specifications in a readable two-column layout; label illustrative diagrams/screens; add back-to-products link and a working contact link. Do not publish endurance, sensor, encryption, mobility, payload, integration, or control claims until verified.

**Proposed MK-I heading:** “MK-I ground robotics concept.” Support: “A six-legged platform concept for inspection and remote assessment in complex built environments.” CTA: “Back to product concepts.” **Fact check:** six-legged form is visible in the current render; inspection and assessment are proposed framing, not confirmed product capability.

**Proposed EX-1 heading:** “EX-1 powered frame concept.” Support: “A powered exoskeleton concept exploring assisted movement and load handling.” CTA: “Back to product concepts.” **Fact check:** confirm intended use and whether the depicted device is a concept render before publication.

### Shared navigation and footer

Use a compact wordmark, Products, About, and one functional Contact action. The footer should contain only valid routes, a short accurate description, and legal/privacy details if available. Remove the four large groups of placeholder business units, partner portals, compliance claims, and recruitment programs unless they exist and are maintained.

## 7. Copywriting recommendations

| Current section | Issue | Proposed headline | Supporting sentence | CTA |
|---|---|---|---|---|
| Home hero: “Kryos Defense Solutions” / “[Autonomous Combat Robotics]” | Brand/category label is vague and “combat” heightens sci-fi tone; paragraph adds unsupported customers and environments. | “Autonomous systems for complex operating environments.” | “Kryos is a product concept exploring ground robotics and human-assist systems for industrial and defense contexts.” | Explore product concepts |
| Core capabilities: “Intelligent Target Acquisition” | Implies targeting/engagement capability and is not supported by the mock implementation. | “Robotics for remote assessment” *(only if this is the intended concept)* | “Explore how a mobile platform could inspect hard-to-reach spaces while keeping an operator in control.” | See MK-I concept |
| Products: “Platform Families” | Family taxonomy does not match named model detail routes. | “Product concepts” | “Two proposed systems, with current concept status and validated information clearly identified.” | View product concepts |
| About: “privately held defense technology contractor…” | Presents fictional company status, claims, and leadership as real. | “A concept for practical autonomous systems.” | “Kryos explores operator-centered robotics for demanding environments.” | Explore the product concepts |
| Product detail architecture: “Decision pipelines… threat posture…” | Abstract and potentially sensitive/unsupported operational assertion. | “Design approach” | “Describe only known architecture decisions; label open design questions separately.” | Back to product concepts |
| Home announcements: “enters limited deployment…” | Implies contracts, partners, deployment, and facilities. | Remove until verified; later use “News and updates.” | Publish dated, attributable updates with links and approval. | Read update |

**Missing facts to resolve before final copy:** Is Kryos intentionally fictional throughout the public-facing brand? Are MK-I and EX-1 concept renders, prototypes, or fictional products? Which product families are in scope? Are any capabilities/specs approved to present as facts? Is there a real audience/contact destination? Who, if anyone, is authorized to appear as leadership or customer/partner? No answer should be inferred from current marketing text.

## 8. Image replacement inventory and prompts

Prompts below are for optional concept imagery only. Generated images must be labeled illustrative and must not imply actual Kryos equipment, people, sites, customers, or operations. Prefer authentic photography for real assets and genuine screenshots for real software.

| Page/section; current asset | Why change | Recommended replacement and treatment |
|---|---|---|
| Home hero; `app/assets/img/shapes/3d_shapes.png` | Abstract dark blocks and amber glow repeat the game-like mood; alt text overclaims. | 16:9 authentic workshop/prototype photo if available. Otherwise generate a grounded, unbranded industrial robotics concept in a clean engineering lab; neutral daylight, graphite and muted olive, no neon, no text, generous copy-safe area. |
| Home capabilities; `app/assets/img/shapes/shape3.jpg` | Large dark metallic abstract geometry instead of relevant evidence. | Remove background or use a neutral light surface. Use three simple line diagrams/icons, or documentary crops of real sensors/materials with captions. |
| Home MK-I spotlight; `app/assets/img/mk-i-no-bg.png` | Current render is highly stylized, dark, cyan-lit and red-eyed, reading as combat sci-fi. | If this is the approved concept, retain a product render but relight/re-render against a neutral background with plausible proportions, matte industrial finish, no weapon or glowing “eyes.” Otherwise use a labeled silhouette/diagram. Square or 4:3. |
| Home announcements; `app/assets/img/shapes/shape5.jpg` | Decorative geospatial-like background supports unsupported news claims. | Remove section or replace with a dated editorial card module after real updates exist. No generated press imagery. |
| Products hero; `app/assets/img/kryos_catalog.jpg` | Header is just a cropped catalog image; artwork has stylized text and no product introduction. | Replace with page title and structured product cards. Optional 3:2 product-family lineup of the approved concept renders on a studio-neutral background. No embedded text. |
| Products family cards; `kryos_ground.jpg`, `kryos_aerial.jpg`, `kryos_system_lab.jpg`, `kryos_circuit_1.jpg`–`kryos_circuit_3.jpg` | Mixed fictional imagery and decorative circuit assets; categories may not be confirmed. | Keep only confirmed product families. Prefer consistent 4:3 real prototype/workshop photos. For concepts, use a matched set of generated, clearly illustrative concept renders with consistent lighting/materials. Remove circuit textures behind text. |
| About hero; `app/assets/img/kryos_building.jpg` | Branded skyscraper with red digital screens implies an actual facility and repeats fictional corporate imagery. | Authentic team/workbench photo only if real and approved; otherwise neutral close-up of mechanical fabrication/material testing or a simple text-led page. 16:9, natural industrial light, no visible logos or insignia. |
| Detail product galleries/videos; `ex-1*`, `mk-i*`, `EXO_LINE_1.png`, `app/assets/video/*` | Product media plausibly mixes concept renders and turntable video; its status is not stated. | Keep only after concept/prototype status is disclosed. Use clean studio product views and simple annotated diagrams; add “Illustrative concept rendering” label where appropriate. Do not generate fake operational footage. |

### Ready-to-use image prompts

1. **Home hero:** “Editorial documentary photograph for a fictional robotics design concept: a compact unarmed multi-legged inspection robot prototype on a test bench in a real industrial engineering workshop, engineers’ hands adjusting a sensor mount in the background, believable fabricated metal and wiring, practical scale, neutral daylight with soft shadows, graphite, warm gray and muted olive palette, candid and technically credible, wide 16:9 composition with clear negative space on the left for website text, no logos, no readable text, no weapons, no holograms, no neon, no battlefield, no implied customer or deployment. Illustrative concept image.”
2. **MK-I concept product view:** “Studio product concept render of a compact six-legged unarmed inspection robot, plausible mechanical joints and serviceable panels, matte charcoal and brushed aluminum, small non-emissive sensor cluster, neutral warm-gray seamless backdrop, soft broad industrial lighting, accurate contact shadow, three-quarter view, 4:3, no logos or text, no weapons, no glowing eyes, no sci-fi styling. Clearly illustrative fictional concept.”
3. **About / engineering detail:** “Documentary close-up of a mechanical engineering workbench with a technician measuring a machined aluminum robotics bracket using calipers, realistic workshop tools and subtle depth of field, natural daylight, neutral gray and muted olive palette, no visible face required, no company logos, no readable labels, horizontal 16:9, credible and understated. Illustrative generic scene; not a Kryos facility.”

## 9. Suggested implementation sequence

1. **Confirm product truth and brand status.** Decide whether Kryos stays fictional; classify each page statement and product as fact, concept, or remove. Approve contact target and leadership treatment.
2. **Set the content and navigation model.** Confirm product families; remove dead links; define page-level headlines, CTA destinations, and concept labels.
3. **Define design tokens and shared components.** Typography, light/dark surfaces, spacing, content widths, cards, buttons, navigation/footer, focus and reduced-motion behavior.
4. **Redesign home and product family page.** These establish the proposition and product discovery path. Use approved or clearly illustrative assets.
5. **Redesign product detail template and About.** Apply consistent evidence labels and accessible image descriptions.
6. **Replace/retire assets.** Track source/license, authenticity, generation status, crop, alt text, and concept disclaimer for each file.
7. **Validate rendered pages.** Review desktop/mobile routes, keyboard focus, reduced motion, zoom, contrast, image crops, heading structure, and all CTA destinations. No checks were run for this assessment.

## 10. Risks, approvals, and open decisions

- **Trust/legal risk:** unsupported deployment, customer, contract, facility, certification, leadership, and performance claims may misrepresent the concept. Obtain owner review before publication.
- **Product accuracy:** do not transform proposed copy into a capability claim. Confirm product status, intended roles, specifications, safety/control model, and allowed imagery.
- **Generated imagery:** realistic generated scenes can still be mistaken for evidence. Label concept visuals close to the image and avoid fabricated patches, logos, documentation, dashboards, or identifiable locations.
- **Responsive/accessibility:** source review cannot confirm actual layout or contrast; interactive verification is a required implementation step.
- **Naming:** current page content includes MK-I and EX-1, while internal copy varies between “MK-I,” “MK-1,” “Tactical Platform,” “Tactical Drone,” and “ExoFrame.” Approve canonical model names and terms.
- **Approval needed before implementation:** brand status; final product taxonomy; which, if any, claims can remain factual; whether fictional leadership stays; contact destination; asset authenticity/generation policy; final headline and CTA wording.

## Research and project evidence

Reference sites are linked individually in §4. Repository evidence reviewed included `app/pages/index.vue`, `app/pages/about.vue`, `app/pages/products/index.vue`, `app/pages/products/[model].vue`, shared marketing components under `app/components/`, global styling in `app/assets/css/global.css`, and image assets under `app/assets/img/` and `app/assets/video/`. The task deliberately excluded `/systems` and its implementation. No application source, copy, style, asset, dependency, or configuration file was changed as part of the assessment; this report is the only intended repository change.
