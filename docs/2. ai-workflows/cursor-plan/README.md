# Cursor plan agent

Five-phase prompts for feature work in Cursor: research → plan → implement → verify → document.

Workflow overview: [coordinator-worker.md](../coordinator-worker.md). Handoffs between phases: [agent-handoff-template.md](../agent-handoff-template.md).

---

## Phases

| Phase | File | Agent role | Output |
|-------|------|------------|--------|
| 1 | [1-research.md](./1-research.md) | Coordinator | Research report — files, risks, open questions |
| 2 | [2-synthesis.md](./2-synthesis.md) | Coordinator | Implementation plan — steps, migrations, tests, commits |
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

## Starter prompts (Cursor)

**Phase 1 — Research**

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
