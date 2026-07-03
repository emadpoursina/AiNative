# specs.md

[specs.md](https://specs.md/) is an AI-native development framework for planning and implementation in application repos. Install per project — not in AiNative itself (this repo keeps [cursor-plan](./cursor-plan/) for OS maintenance).

Docs index: [specs.md/llms.txt](https://specs.md/llms.txt)

---

## When to use

| Context | Tool |
|---------|------|
| Application / product repos — feature planning and execution | **specs.md** |
| AiNative repo — editing workflows, systems, reference docs | **cursor-plan** (`@cursor-plan`) |
| Quick spec docs only, no execution tracking | specs.md **Simple** flow |
| Brownfield features, adaptive rigor, monorepos | specs.md **FIRE** flow |
| Full traceability, DDD, regulatory documentation | specs.md **AI-DLC** flow |

Default for most app work: **FIRE** — adaptive checkpoints, brownfield-aware, dynamic execution.

---

## Install (application repos)

Prerequisites: Node.js 18+, Cursor (or another supported AI tool).

```bash
npx specsmd@latest install
```

Select a flow when prompted. The installer adds agent definitions, standards templates, and Cursor slash commands under `.cursor/commands/`.

Optional: [IDE extension](https://specs.md/getting-started/ide-extension.md) for progress tracking in Cursor, VS Code, or Windsurf.

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
4. Repeat until intent is done; commit per your [Conventional Commits](../3.%20reference/commands/git.md) plan

FIRE overview: [fire-flow/overview](https://specs.md/fire-flow/overview.md)

---

## Map to coordinator-worker

specs.md implements the same Research → Plan → Implement → Verify rhythm as [coordinator-worker.md](./coordinator-worker.md):

| Coordinator-worker | specs.md (FIRE) |
|--------------------|-----------------|
| Research | Planner explores codebase, captures intent |
| Synthesis | Work items with execution order and complexity |
| Implementation | Builder runs (Autopilot / Confirm / Validate) |
| Verification | Walkthroughs + your test flows |
| Update documents | Standards and walkthrough artifacts |

Handoffs between agents or sessions: still use [agent-handoff-template.md](./agent-handoff-template.md) in `scratch/` when useful.

---

## AiNative conventions to keep

When using specs.md in app repos, align generated work with this OS:

- **Commits** — [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/); one complete file set per commit; agent drafts messages, you commit
- **PR review** — [pr-review-prompts.md](./pr-review-prompts.md) after implementation passes
- **Releases** — [release-management-system.md](../1.%20systems/release-management-system.md)
- **Scratch** — raw notes in `scratch/`; promote to project docs on review
- **Project rules** — copy [claude-md-template.md](./claude-md-template.md) to `CLAUDE.md` or `.cursor/rules/ai-rules.mdc`; specs.md standards live under `.specs-fire/standards/` (FIRE) or `memory-bank/standards/` (AI-DLC)

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

```
.specsmd/fire/          # flow definition and agents
.specs-fire/
├── state.yaml          # central state
├── standards/          # constitution, tech-stack, coding-standards
├── intents/            # intent briefs and work items
├── runs/               # run logs
└── walkthroughs/       # what changed and how to verify
```

Commit `.specsmd/` and `.specs-fire/` (or `memory-bank/` for AI-DLC) with the project so intent and standards persist across sessions.
