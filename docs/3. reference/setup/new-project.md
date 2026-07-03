# New project

## Planning

### Business model

- Who
- Problem
- Solution
- Name

### App structure

- Landing
- Signup
- App
  - Payment

### Tech stack

- Backend
  - Auth
- Frontend
  - Framework
- Database
- Devops
  - Git/Github
  - Docker
- Third-party service
  - Payment
  - Deployment
  - Ai
- Liberties

### PRD

1. Context
2. User journey
3. Page list
4. Tech stack
5. Design direction

## Setup

### Agent setup

Add persistent AI rules so agents read your stack and constraints once per session:

- Copy [claude-md-template.md](../../2.%20ai-workflows/claude-md-template.md) to the project root as `CLAUDE.md` (Claude Code) or into `.cursor/rules/ai-rules.mdc` (Cursor)
- Install [specs-planner agent](../../8.%20agents/specs-planner/) for planning and implementation: `npx specsmd@latest install` (default: FIRE flow) — this is the default planning tool for application repos
- Add a planning-gate rule that enforces `/specsmd-fire-planner` approval before multi-file implementation (adapt `.cursor/rules/planning-gate.mdc` from AiNative — swap the `cursor-plan` references for the specs.md FIRE commands)
- Fill in project context, stack, and out-of-scope items — see [CLAUDE.md](../../../CLAUDE.md) in AiNative for a live example
- `cursor-plan` is AiNative-specific (used only for editing this docs repo's own workflows) — do not install it in application repos

When an agent bootstraps a new project, include a local `scratch/` folder for reference files and raw notes during work:

- Add `scratch/` to `.gitignore` so nothing temporary is committed
- Use it for pasted logs, drafts, and other working material — not for canonical docs
- For agent-to-agent handoffs, use [agent-handoff-template.md](../../2.%20ai-workflows/agent-handoff-template.md); keep filled copies in `scratch/` until promoted or deleted
- Promote anything worth keeping into the proper docs layer; delete the rest (see [ENGINEERING-OS.md](../../../ENGINEERING-OS.md#scratch-scratch))

### Bootstrap checklist

- [Cursor setup](./cursor-setup.md) — MCP, rules, skills, indexing
- [Local shared services](./local-shared-services.md) — MariaDB, MongoDB, Adminer via Docker
- Git/Github
- Project setup
  - Backend
  - Database — use shared services; create a DB per project
  - Frontend

## Development

Overall process — use the [coordinator-worker pattern](../../2.%20ai-workflows/coordinator-worker.md) via [specs-planner](../../8.%20agents/specs-planner/): `/specsmd-fire-planner` to plan, `/specsmd-fire-builder` to execute. (`cursor-plan` is only used inside AiNative itself.)

1. **Research** — Coordinator agent analyzes the codebase for relevant files
2. **Synthesis** — Second pass creates a plan from research
3. **Implementation** — Worker agent writes code
4. **Verification** — Final check ensures correctness
5. **Update documents** — Sync docs with changes

## Design

- Style design guide
- Buttons
- Typography

## Deployment

Deploy checklists and release flow: [release-management-system.md](../../1.%20systems/release-management-system.md) — especially [Release Questions](../../1.%20systems/release-management-system.md#-release-questions) (before/after setup, backward compatibility).

<!-- Add stack-specific deploy steps here as you refine the stack. -->
