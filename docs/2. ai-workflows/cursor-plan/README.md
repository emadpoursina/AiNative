# Cursor plan agent

Five-phase prompts for feature work in Cursor: research → plan → implement → verify → document.

Workflow overview: [coordinator-worker.md](../coordinator-worker.md). Handoffs between phases: [agent-handoff-template.md](../agent-handoff-template.md).

**Cursor integration:** Project skill `@cursor-plan` (`.cursor/skills/cursor-plan/SKILL.md`). Auto gate for 2+ file tasks: `.cursor/rules/planning-gate.mdc`.

---

## Phases

| Phase | File | Agent role | Output |
|-------|------|------------|--------|
| 1 | [1-research.md](./1-research.md) | Coordinator | Research report — files, risks, open questions |
| 2 | [2-synthesis.md](./2-synthesis.md) | Coordinator | Plan — execution order (parallel/sequential), steps, test flows, commit plan |
| 3 | [3-implementation.md](./3-implementation.md) | Worker | Code for one plan step at a time |
| 4 | [4-verification.md](./4-verification.md) | Reviewer | Pass/fail review (correctness, security, reliability, adversarial) |
| 5 | [5-update-docs.md](./5-update-docs.md) | Coordinator | CLAUDE.md, changelog, commit message |

---

## When to use

- Multi-file features or ambiguous tasks — run Phase 1 and 2 before any code
- Confirm the plan with a human before Phase 3 when more than two files change
- One implementation step per prompt in Phase 3
- Run verification passes A–D separately in Phase 4

---

## How to use (quick start)

1. Open a new Agent chat for the feature.
2. Run `@cursor-plan phase=1` with FEATURE, REPO, and ENTRY POINTS.
3. Confirm the research report, then `@cursor-plan phase=2` with Phase 1 output in `<context>`.
4. Review the plan (execution order, test flows, commit plan). Approve explicitly.
5. Run `@cursor-plan phase=3` once per implementation step.
6. Run `@cursor-plan phase=4` — one pass (A, B, C, D) per prompt.
7. Run `@cursor-plan phase=5` for docs and final commit message.

The `planning-gate` rule applies automatically in this repo for 2+ file tasks — the agent should not skip to code without an approved plan.

---

## Starter prompts (Cursor)

**Phase 1 — Research**

```text
@cursor-plan phase=1

FEATURE: [one sentence]
REPO: [project name]
ENTRY POINTS: @folder/or/files
```

Or without the skill:

```text
Referencing docs/2. ai-workflows/cursor-plan/1-research.md, start Research for [Feature Name].

FEATURE: [one sentence]
REPO: [project name]
ENTRY POINTS: @folder/or/files
```

**Phase 2 — Synthesis**

```text
Referencing docs/2. ai-workflows/cursor-plan/2-synthesis.md, write the implementation plan.

FEATURE: [same as Phase 1]
Context: [paste Phase 1 output or @handoff artifact]
```

**Phase 3 — Implementation**

```text
Referencing docs/2. ai-workflows/cursor-plan/3-implementation.md, implement Step [N] only.

[paste step from synthesis plan]
Files: @path/to/file.ts
```

**Phase 4 — Verification**

```text
Referencing docs/2. ai-workflows/cursor-plan/4-verification.md Pass [A|B|C|D], review the implementation.

Files: @path/to/changed/files
```

**Phase 5 — Update docs**

```text
Referencing docs/2. ai-workflows/cursor-plan/5-update-docs.md, update documentation for this feature.

Files: @path/to/changed/files
```
