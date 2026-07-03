# Skills — Specs planner agent

specs.md integration skills copied inline for self-contained use.

---

## Install (application repos)

Prerequisites: [Bun](https://bun.sh), Cursor (or another supported AI tool).

```bash
bunx specsmd@latest install
```

Select a flow when prompted. Installer adds agent definitions, standards templates, and Cursor slash commands under `.cursor/commands/`.

After install, run `/specsmd-fire` in Cursor to initialize the project — the orchestrator sets up `.specs-fire/state.yaml` and standards. Install alone does not initialize specs.md.

Optional: [IDE extension](https://specs.md/getting-started/ide-extension.md) for progress tracking.

---

## Cursor commands

After install, invoke with `/` in Agent chat:

| Flow | Commands |
|------|----------|
| Simple | `/specsmd-agent` |
| FIRE | `/specsmd-fire`, `/specsmd-fire-planner`, `/specsmd-fire-builder` |
| AI-DLC | `/specsmd-master-agent`, `/specsmd-inception-agent`, `/specsmd-construction-agent`, `/specsmd-operations-agent` |

---

## FIRE quick start

1. `/specsmd-fire-planner` — capture an intent and break it into work items
2. Review work items and complexity (Autopilot / Confirm / Validate)
3. `/specsmd-fire-builder` — execute the next run; walkthrough generated under `.specs-fire/walkthroughs/`
4. Repeat until intent is done; commit per Conventional Commits plan

FIRE overview: [fire-flow/overview](https://specs.md/fire-flow/overview.md)

---

## Map to coordinator-worker

| Coordinator-worker | specs.md (FIRE) |
|--------------------|-----------------|
| Research | Planner explores codebase, captures intent |
| Synthesis | Work items with execution order and complexity |
| Implementation | Builder runs (Autopilot / Confirm / Validate) |
| Verification | Walkthroughs + your test flows |
| Update documents | Standards and walkthrough artifacts |

Handoffs between agents or sessions: use [agent-handoff-template.md](../../2.%20ai-workflows/agent-handoff-template.md) in `scratch/` when useful.

---

## Flow comparison

| Aspect | Simple | FIRE | AI-DLC |
|--------|--------|------|--------|
| Optimized for | Spec generation | Adaptive execution | Full traceability |
| Checkpoints | 3 phase gates | 0–2 per work item | Comprehensive |
| Agents | 1 | 3 | 4 |
| Execution tracking | No | Yes | Yes |
| Brownfield / monorepo | Limited | First-class | Limited |

Choose flow: [architecture/choose-flow](https://specs.md/architecture/choose-flow.md)

---

## Project artifacts (FIRE)

```text
.specsmd/fire/          # flow definition and agents
.specs-fire/
├── state.yaml          # central state
├── standards/          # constitution, tech-stack, coding-standards
├── intents/            # intent briefs and work items
├── runs/               # run logs
└── walkthroughs/       # what changed and how to verify
```

Commit `.specsmd/` and `.specs-fire/` (or `memory-bank/` for AI-DLC) with the project.

---

## Conventional Commits

<!-- source: _skills/conventional-commits.md -->

One commit per complete file set. Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`. Agent drafts messages; you commit.

---

## Verification

<!-- source: _skills/verification.md -->

After builder runs, verify via walkthroughs and your test flows. For PRs, hand off to [pr-reviewer](../pr-reviewer/) agent.
