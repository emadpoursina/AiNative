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
Paste the Phase 1 research report here, or reference it with @docs/2. ai-workflows/cursor-plan/1-research.md output or a filled handoff artifact.
</context>

<plan_requirements>
1. Break the work into small, ordered implementation steps
2. Each step must be atomic — one clear action, one file or one concern
3. Specify exact file paths for every change
4. Call out any new files that need to be created
5. List database migrations in order with the SQL or schema change
6. Identify which steps can be done independently and which are blocked by a prior step
7. Specify where Zod validation schemas are needed
8. Specify where unit or integration tests are needed and what they should cover
9. Flag any step that touches auth, permissions, or multi-tenancy for extra review
10. End with a commit plan using Conventional Commits style
</plan_requirements>

<constraints>
- No code yet — describe what to do, not how to write it
- If a step is ambiguous, resolve it in the plan rather than leaving it for the Worker
- Do not add steps that are not required by the feature
</constraints>

## Output format

```
## Implementation steps

### Step 1 — [Short title]
- File: path/to/file.ts
- Action: [what to do]
- Depends on: none / Step N
- Risk: low / medium / high

### Step 2 — ...

## Migration plan
- Migration 1: [description + SQL or Prisma schema snippet]

## Validation schemas needed
- [file] — [what the schema validates]

## Tests needed
- [file] — [what to test]

## Test flows
- [manual or automated flow to verify end-to-end behavior]

## Commit plan
- feat(scope): description
- feat(scope): description
- test(scope): description
```
