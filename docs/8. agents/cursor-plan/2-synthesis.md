# Phase 2 — Synthesis (Coordinator)

> **Role:** Coordinator — plan only. No code changes.
> **Goal:** Turn the research report into a concrete, sequenced implementation plan.

---

## Instructions for Cursor

You are in the **Synthesis Phase**. You have the research report from Phase 1. Do not write implementation code yet.

Produce a detailed plan the Worker agent can execute step by step without needing to make architectural decisions.

<task>
FEATURE: [SAME AS PHASE 1]
</task>

<context>
Paste the Phase 1 research report here, or reference it with @docs/8. agents/cursor-plan/1-research.md output or a filled handoff artifact.
</context>

<plan_requirements>
1. Break the work into small, ordered implementation steps
2. Each step must be atomic — one clear action, one file or one concern
3. Specify exact file paths for every change
4. Call out any new files that need to be created
5. List database migrations in order with the SQL or schema change
6. Produce an execution plan that shows which steps run in sequence and which can run in parallel
7. Specify where Zod validation schemas are needed
8. Specify where unit or integration tests are needed and what they should cover
9. Flag any step that touches auth, permissions, or multi-tenancy for extra review
10. Write test flows — step-by-step checks to confirm the implementation is correct (manual or automated)
11. End with a commit plan using Conventional Commits — one commit per complete file set, no partial-file commits
</plan_requirements>

<constraints>
- No code yet — describe what to do, not how to write it
- If a step is ambiguous, resolve it in the plan rather than leaving it for the Worker
- Do not add steps that are not required by the feature
</constraints>

## Output format

Every plan must include all three sections below: **Execution plan**, **Test flows**, and **Commit plan**.

```
## Execution plan

Sequential chain:
Step 1 → Step 2 → Step 5

Parallel (after Step 2 completes):
- Step 3 || Step 4

Notes:
- [why these steps block each other, or why parallel is safe]

## Implementation steps

### Step 1 — [Short title]
- File: path/to/file.ts
- Action: [what to do]
- Depends on: none / Step N
- Risk: low / medium / high
- Parallel group: none / group-name (steps in the same group may run together)

### Step 2 — ...

## Migration plan
- Migration 1: [description + SQL or Prisma schema snippet]

## Validation schemas needed
- [file] — [what the schema validates]

## Tests needed
- [file] — [what to test]

## Test flows

Run these after implementation to confirm the feature works. Number each flow; include expected result per step.

### Flow 1 — [happy path title]
1. [setup / precondition]
2. [action]
3. [assert expected result]

### Flow 2 — [edge case or failure path]
1. ...
2. ...
3. Expected: [error or behavior]

## Commit plan

One commit per complete file set. List files included in each commit.

- feat(scope): [subject] — files: path/a.ts, path/b.ts
- feat(scope): [subject] — files: path/c.ts
- test(scope): [subject] — files: path/a.spec.ts
```
