---
name: cursor-plan
description: Run the Coordinator-Worker planning cycle for features — research, synthesis, implementation, verification, and docs. Use when starting a non-trivial feature or refactor, the task touches 2+ files, or you want explicit phase-by-phase control with confirmed handoffs.
---

# Skill — Cursor Planning Workflow

Use this skill to run the full Coordinator-Worker planning cycle for a feature.

Phase prompts (canonical): `docs/8. agents/cursor-plan/`

## When to load this skill

Load with `@cursor-plan` or `@SKILL.md` when:

- Starting a non-trivial feature or refactor
- The task touches 2+ files or modules
- You want explicit phase-by-phase control with confirmed handoffs

## Phase loader

Tell the agent which phase to run:

```text
@cursor-plan phase=1

FEATURE: [description]
REPO: [repo name]
ENTRY POINTS: [src/module/]
```

### Phase map

| Command | Loads | Role |
|---------|-------|------|
| `phase=1` | `docs/8. agents/cursor-plan/1-research.md` | Coordinator — read only |
| `phase=2` | `docs/8. agents/cursor-plan/2-synthesis.md` | Coordinator — plan only |
| `phase=3` | `docs/8. agents/cursor-plan/3-implementation.md` | Worker — one step at a time |
| `phase=4` | `docs/8. agents/cursor-plan/4-verification.md` | Reviewer — find problems |
| `phase=5` | `docs/8. agents/cursor-plan/5-update-docs.md` | Coordinator — docs only |

In Cursor, `@` the phase file directly (e.g. `@docs/8. agents/cursor-plan/1-research.md`) instead of typing the full path.

## Handoff rules

The agent must follow these gates — do not skip them:

- **Phase 1 → 2:** Research report must list files, risks, and open questions. Paste output into Phase 2 `<context>`.
- **Phase 2 → 3:** Plan must be confirmed by the user before any code is written.
- **Phase 3 → 4:** All steps in the plan must be complete. Run each verification pass separately.
- **Phase 4 → 5:** All critical issues from verification must be resolved first.
- **Phase 5 → done:** Changelog and commit message written. PR is ready.

## Context handoff template

Between phases, pass context forward like this:

```text
@cursor-plan phase=2

FEATURE: [same as phase 1]

<context>
[paste phase 1 research report here]
</context>
```

## Agent behavior per phase

**Coordinator (phases 1, 2, 5)**

- Read and analyze only
- No code written or suggested
- Output is structured markdown

**Worker (phase 3)**

- One step per prompt
- Targeted edits only — never rewrite whole files
- Stops and flags if the plan has a gap

**Reviewer (phase 4)**

- Runs passes A → B → C → D separately
- Every issue includes file path and line number
- Returns PASS or FAIL verdict per pass

## Other projects

To use shorter `@` paths in an app repo, copy `docs/8. agents/cursor-plan/*.md` to `.cursor/plans/` and update this skill's phase map locally. Keep one canonical copy — do not maintain two diverging versions.
