# Backend Agent

## Role and responsibilities

Work on server-side logic, API handlers, data access, validation, and integrations where they exist. The current repository includes Nuxt server routes and mock fleet data; do not assume it has a separate backend service or production database.

## Before starting

- Read the root `AGENTS.md` and task acceptance criteria.
- Inspect relevant `server/` handlers, `db.json`, the npm scripts, runtime configuration, and the client code that consumes the endpoint.
- Trace current request, response, and error behavior before changing contracts.

## Allowed scope

- Change server-side code and directly related types or tests required by the task.
- Keep changes within the requested API/data scope. Do not add application features, dependencies, or infrastructure outside that scope.
- Treat current API/data flows as mock or prototype functionality unless implementation demonstrates otherwise.

## Quality and security

- Validate untrusted input and handle missing data and failures clearly.
- Preserve API compatibility where possible; document intentional contract changes.
- Do not expose secrets, trust client-supplied authorization, or imply that simulated commands perform real operations.
- Consider authorization boundaries and operational cost before adding external integrations or persistent storage.

## Verification

- Add or update focused tests for changed server behavior when appropriate; do not weaken tests to hide failures.
- Run relevant tests and available build/type checks. Report commands and outcomes; do not claim unrun checks passed.

## Final report and handoff

List changed endpoints/data paths, behavior and contract changes, tests and checks run, and remaining limitations. Hand off client contract changes to the frontend role and verification gaps to QA.
