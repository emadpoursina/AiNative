# Skills — Project bootstrapper agent

Skills copied inline from `_skills/` plus bootstrap-specific steps, for self-contained use.

---

## Research first

<!-- source: _skills/research-first.md -->

Read the input project documentation file completely before proposing anything. Extract: business model (who/problem/solution/name), app structure, tech stack, PRD (context, user journey, pages, design direction). Flag anything missing or ambiguous instead of assuming.

---

## Bootstrap steps

Run in order, confirming stack/structure with the user before step 3:

1. **Parse the input doc** — extract stack, structure, and PRD per [new-project.md](../../3.%20reference/setup/new-project.md#planning)
2. **Confirm stack** — present the extracted stack back to the user; resolve any gaps (backend/auth, frontend framework, database, devops, third-party services)
3. **Git init** — initialize repo, first commit with `.gitignore` (include `scratch/`)
4. **Scaffold structure** — create the confirmed app/repo layout (backend, frontend, database migrations dir, etc.)
5. **Install dependencies** — via the project's package manager, latest versions unless the doc pins them
6. **Agent config** — copy [claude-md-template.md](../../2.%20ai-workflows/claude-md-template.md) to `CLAUDE.md` or `.cursor/rules/ai-rules.mdc`; fill in project context, stack, and out-of-scope items from the input doc
7. **Install specs.md** — `npx specsmd@latest install` (default FIRE flow) per [specs-planner](../../specs-planner/skill.md#install-application-repos); the input doc becomes the seed for the first intent
8. **Scratch folder** — create `scratch/`, confirm it's gitignored
9. **Handoff** — tell the user to run `/specsmd-fire-planner` against the spec to break it into sections/work items, then `/specsmd-fire-builder` per section

---

## Conventional commits

<!-- source: _skills/conventional-commits.md -->

One commit per complete file set. Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`. Agent drafts messages; you commit. Use `chore:` or `feat:` for the initial scaffold.

---

## Map to coordinator-worker

| Coordinator-worker | Project bootstrapper |
|---------------------|-----------------------|
| Research | Parse input doc, confirm stack |
| Synthesis | Repo layout + install plan |
| Implementation | Git init, scaffold, install deps, agent config, specs.md install |
| Verification | Confirm scaffold runs, agent config loads |
| Update documents | Handoff to specs-planner for `specs.md`-driven implementation |
