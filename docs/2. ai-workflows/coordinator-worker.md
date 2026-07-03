# Coordinator-worker pattern

Multi-phase development with separate research, planning, and implementation passes.

**Cursor prompts:** Use the [cursor-plan agent](../8.%20agents/cursor-plan/) for copy-paste phase prompts with structured output formats. This file is the overview; the cursor-plan agent folder is canonical for Cursor sessions on AiNative itself.

**Application repos:** Use [specs-planner agent](../8.%20agents/specs-planner/) ([specs.md](https://specs.md/)) for planning and implementation — FIRE flow maps directly to the phases below.

**Concrete agents:** See [8. agents/](../8.%20agents/) for all per-task agent implementations of this pattern.

---

## Phase 1 — Research

```text
You are the Coordinator agent. Do not write code yet.

Scan the codebase for everything relevant to: [FEATURE_OR_TASK]

Output:
- relevant files and why
- existing patterns to follow
- constraints and risks
- open questions before planning
```

---

## Phase 2 — Synthesis (plan)

```text
Based on the research above, create an implementation plan.

Output:
- execution plan (parallel vs sequential steps)
- numbered implementation steps with file paths
- test flows to verify correctness
- commit plan (Conventional Commits, one complete file set per commit)
- what NOT to change

Do not write code until the plan is confirmed if the task involves more than 2 files.

Prompts: docs/8. agents/cursor-plan/2-synthesis.md
```

---

## Phase 3 — Implementation (worker)

```text
Execute step [N] of the approved plan only.

Constraints:
- match existing naming and indentation
- minimal diff — do not rewrite whole files for small changes
- no new dependencies unless the plan approved them
```

---

## Phase 4 — Verification

```text
Verify the implementation against the plan and acceptance criteria.

Check:
- linter/type errors
- missing imports
- edge cases from the plan
- tests to run

Report pass/fail and fixes needed.
```

---

## Phase 5 — Update documents

```text
List docs that changed behavior (README, API docs, ADRs).
Draft minimal updates only where the code change requires it.
```

---

## Agent handoff

When a phase finishes and another agent (or human) continues the work, fill out [agent-handoff-template.md](./agent-handoff-template.md). Save working copies in `scratch/` during active work; promote anything worth keeping after Friday review.

---

## Guiding principles

- Split large ambiguous tasks into smaller ones — never give AI one huge open-ended task
- Write tests so AI can verify and fix its own code
- Use README for humans and rules/skills for AI when helpful
- Never trust LLM output directly — pipe through linter/unit tests
- Focus on the handoff: AI work must merge into human workflow without friction

## Starter prompt (Cursor)

```text
Referencing docs/8. agents/cursor-plan/1-research.md, start Research for [Feature Name].

FEATURE: [one sentence]
REPO: [project name]
ENTRY POINTS: @folder/or/files
```

See [cursor-plan/agent.md](../8.%20agents/cursor-plan/agent.md) for all phase starter prompts.
