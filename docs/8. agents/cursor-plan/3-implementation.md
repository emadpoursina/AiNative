# Phase 3 — Implementation (Worker)

> **Role:** Worker — write code only. Follow the plan exactly.
> **Goal:** Execute the synthesis plan step by step. One step at a time.

---

## Instructions for Cursor

You are in the **Implementation Phase**. The plan is already decided. Your job is to execute it.

<task>
FEATURE: [SAME AS PHASE 1]
CURRENT STEP: [e.g. Step 3 — Add RolesGuard to TasksController]
</task>

<context>
Paste the relevant steps from the Phase 2 synthesis plan here, or reference with @docs/8. agents/cursor-plan/2-synthesis.md output.
</context>

<implementation_rules>
- Implement ONE step per prompt — do not jump ahead
- Never rewrite an entire file to change one function — use targeted edits only
- Strict TypeScript: no `any`, no implicit types
- Use Zod for all external input validation
- Follow the naming conventions already in the codebase
- Remove all AI-typical comments (e.g. "This function was generated to...")
- Match existing indentation, import order, and file structure exactly
- If a migration is needed, output the SQL or schema change separately for manual review — do not apply it automatically
- After writing code, check mentally: missing imports? unused variables? broken types?
</implementation_rules>

<constraints>
- Do not add dependencies not in the plan
- Do not refactor code outside the scope of the current step
- If something in the plan is wrong or impossible, stop and flag it — do not guess
- Do not move to the next step until the current one is confirmed
</constraints>

## How to use this file

Run one step at a time:

```
Referencing docs/8. agents/cursor-plan/3-implementation.md, implement Step [N]:
[paste the step description from the synthesis plan]

Files involved: @path/to/file.ts
```

When the step is done, confirm it works before running the next prompt.
