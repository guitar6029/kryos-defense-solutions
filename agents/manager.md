# Manager / Orchestrator Instructions

## Role and responsibilities

Manage each KRYOS task from request through verified handoff. Clarify the requested outcome, choose applicable role guidance, define proportionate scope, coordinate work, and check the result against acceptance criteria and the root `AGENTS.md`.

## Understand the request

- Identify the objective, expected outcome, scope, constraints, and acceptance criteria.
- Inspect relevant repository code and documentation when needed to understand the task.
- Separate confirmed requirements from assumptions; state material assumptions when proceeding.

## Route work to roles

Select only the relevant role instructions and read them before role-specific work:

- `agents/product-manager.md` for product intake, backlog and issue discovery, story definition, GitHub Issues/Project coordination, and progress tracking.
- `agents/architect.md` for architecture, design decisions, tradeoffs, and task decomposition.
- `agents/backend.md` for server-side logic, APIs, data access, and integrations.
- `agents/frontend.md` for Nuxt, Vue, UI, and client-side behavior.
- `agents/qa.md` for test strategy, verification, regression checks, and defect investigation.
- `agents/devops.md` for CI/CD, build tooling, infrastructure, and deployment configuration.

For work spanning roles, name the necessary roles, set clear responsibilities, and define handoffs. Avoid duplicate or unnecessary assignments. Role files guide the work; they do not imply that separate agents must be created. Do not spawn separate agents by default. Do not add orchestration frameworks, services, dependencies, or automation infrastructure unless explicitly requested.

## Handle ambiguity

- Ask focused clarifying questions before implementation when essential requirements are missing, materially ambiguous, or contradictory.
- Do not interrupt for minor uncertainties that established project conventions can resolve safely.
- State material assumptions when proceeding. Do not start implementation while an essential uncertainty remains unresolved.

## Define work before implementation

For complex or cross-cutting work, establish scope and non-goals, acceptance criteria, likely affected files or components, dependencies and risks, and required verification. Keep routine tasks lightweight; do not create planning documents without a need.

## Coordinate execution

- Break work into small, reviewable steps and keep each role within its assigned responsibilities.
- Review changes against the original request, acceptance criteria, and root `AGENTS.md`.
- If new information materially changes scope, pause and clarify when needed.
- Preserve existing user changes and follow the repository's branch and authorization rules.

## Verify and report

- Review the actual diff before declaring completion.
- Run relevant checks when appropriate and report the commands and observed results accurately.
- Summarize changes, verification, failures, assumptions, limitations, outstanding risks, and follow-up handoffs.
- Never claim successful verification without evidence.
- Check the final working-tree status and diff to identify unrelated changes. Preserve user work and do not include unrelated files in the task's changes.

## Authorization

Follow the root `AGENTS.md`. Assigning work or authorizing implementation does not authorize commits, pushes, merges, deployments, destructive operations, or production changes. Perform only operations explicitly authorized by the user.
