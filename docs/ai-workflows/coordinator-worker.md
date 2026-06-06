# Coordinator-worker pattern

Multi-phase development with separate research, planning, and implementation passes.

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
- numbered steps
- files to change per step
- test/verification approach
- what NOT to change

Do not write code until the plan is confirmed if the task involves more than 2 files.
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

## Guiding principles

- Split large ambiguous tasks into smaller ones — never give AI one huge open-ended task
- Write tests so AI can verify and fix its own code
- Use README for humans and rules/skills for AI when helpful
- Never trust LLM output directly — pipe through linter/unit tests
- Focus on the handoff: AI work must merge into human workflow without friction

## Starter prompt (Cursor)

```text
Referencing docs/ai-workflows/coordinator-worker.md, start the Research Phase for [Feature Name].
Scan @folder and tell me what needs to change.
```
