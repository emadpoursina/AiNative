# AiNative — AI Rules

## Project Context

- **Type**: Engineering operating system — structured knowledge repository (not an application)
- **Stack**: Markdown · Git · Mermaid · Cursor rules
- **Repo layout**:
  ```text
  AiNative/
  ├── CLAUDE.md                 # This file — Claude Code reads at session start
  ├── ENGINEERING-OS.md         # Architecture spec
  ├── .cursor/rules/            # Cursor rules (mirror of key constraints here)
  ├── scratch/                  # gitignored — raw capture during work
  └── docs/
      ├── 1. systems/           # Universal workflows (task, PR, release)
      ├── 2. ai-workflows/      # Generic AI templates (coordinator pattern, handoffs)
      ├── 8. agents/            # Per-task agents — agent.md, skill.md, rule.md
      ├── 3. reference/         # Evergreen setup, commands, architecture
      ├── 4. debugging/         # Bug pattern library
      ├── 6. decisions/       # ADRs
      └── 7. postmortems/       # Incident reviews
  ```

---

## Workflow

- Always follow: **Research → Plan → Execute** ([coordinator-worker.md](./docs/2.%20ai-workflows/coordinator-worker.md))
- Do not write code until the plan is confirmed if the change touches 2+ files
- For ambiguous tasks: ask, do not guess
- Commit style: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`) — short messages
- Capture raw notes in `scratch/` during work; promote to the right docs layer on Friday review

---

## Doc and Code Rules

- One canonical location per topic — do not duplicate content across layers
- Match existing naming, folder numbering, and markdown style exactly
- Never rewrite an entire file to change one section — surgical edits only
- Remove AI-style comments before finishing (`// This function handles...`, filler prose in docs)
- When editing TypeScript or config: strict mode, no `any`, validate external inputs with Zod when applicable
- After hard bugs: append to `docs/4. debugging/<domain>/` using [template.md](./docs/4.%20debugging/template.md)
- Significant decisions: new ADR in `docs/6. decisions/` using [template.md](./docs/6.%20decisions/template.md)

---

## Engineering OS pointers

When working in AiNative or repos using this OS:

- Architecture spec: [ENGINEERING-OS.md](./ENGINEERING-OS.md)
- PR review: [pr-review-system.md](./docs/1.%20systems/pr-review-system.md); prompts in [pr-reviewer agent](./docs/8.%20agents/pr-reviewer/) — run Phase 1.5 architecture compliance for feature PRs in existing subsystems
- Task grooming / meetings: [task-groomer agent](./docs/8.%20agents/task-groomer/)
- Multi-file features: [cursor-plan agent](./docs/8.%20agents/cursor-plan/) — overview in [coordinator-worker.md](./docs/2.%20ai-workflows/coordinator-worker.md)
- Multi-client releases: [client-compatibility-system.md](./docs/1.%20systems/client-compatibility-system.md) — pair with release management; run pre-tag check and post-deploy monitor
- Commands and setup: [docs/3. reference/](./docs/3.%20reference/) — navigate by domain, do not guess
- Local shared databases (Docker): [local-shared-services.md](./docs/3.%20reference/setup/local-shared-services.md) — compose at `/Users/emad/docker-infrastructure/docker-compose.yml`

---

## Constraints

- No new external dependencies without explicit approval
- Always output SQL / migration for manual review before suggesting `db push` or `migrate`
- Terminal commands: check mentally before suggesting — no destructive defaults
- Never expose secrets, tokens, or credentials in output
- Never commit `scratch/` contents
- Only create git commits when explicitly requested

---

## Out of Scope

- Do not modify committed migration files directly — create new migrations
- Do not change Docker network config in shared infrastructure without explicit approval
- Do not introduce team-specific URLs, approvers, or board links into this repo — keep those in project repos or local `scratch/`

---

## Bootstrap other projects

Copy [claude-md-template.md](./docs/2.%20ai-workflows/claude-md-template.md) to the project root as `CLAUDE.md` and fill in placeholders. For Cursor, copy the filled content into `.cursor/rules/ai-rules.mdc`.
