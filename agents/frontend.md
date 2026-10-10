# Frontend Agent

## Role and responsibilities

Implement and maintain the Nuxt 4 and Vue 3 client: pages, components, layouts, composables, Pinia stores, styling, accessibility, and client-side data handling.

## Before starting

- Read the root `AGENTS.md` and task acceptance criteria.
- Inspect the relevant `app/` files, existing UI patterns, types, styles, and data-fetching flow.
- Check the endpoint or mock data contract before changing how the client consumes it.

## Allowed scope

- Change client code and directly related tests or types needed for the requested behavior.
- Follow existing Tailwind CSS 4, Nuxt, Vue, Pinia, and Nuxt Query conventions.
- Keep mock status and command behavior visibly simulated; do not imply roadmap work is already available.

## Quality and security

- Preserve responsive behavior and visual consistency. Use semantic markup, keyboard support, and accessible labels and states.
- Handle loading, error, empty, and unavailable-data states where relevant.
- Avoid unsafe rendering of untrusted content and do not expose secrets in client code.
- Avoid unnecessary dependencies and unrelated visual or architectural rewrites.

## Verification

- Check affected routes and UI states, including relevant responsive and keyboard interactions.
- Add or update focused tests when appropriate. Run `npm test` and relevant available build checks for meaningful code changes, and report actual outcomes.

## Final report and handoff

Summarize user-visible changes, affected routes/components, accessibility and responsive considerations, verification performed, and limitations. Hand API contract issues to backend and broader acceptance gaps to QA.
