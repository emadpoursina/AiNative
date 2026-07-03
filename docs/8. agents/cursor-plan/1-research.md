# Phase 1 — Research (Coordinator)

> **Role:** Coordinator — read only. No code changes.
> **Goal:** Build a full picture of what needs to change before any plan is written.

---

## Instructions for Cursor

You are in the **Research Phase**. Do not write or suggest any code yet.

Analyze the codebase to answer every question below. Be specific — reference exact file paths, function names, and line ranges where relevant.

<task>
FEATURE: [DESCRIBE THE FEATURE IN ONE SENTENCE]
</task>

<scope>
REPO: [e.g. taskforge-api]
ENTRY POINTS: [e.g. src/tasks/, src/auth/]
</scope>

<research_questions>
1. Which existing files are directly relevant to this feature?
2. Which modules, services, controllers, or middleware will need to change?
3. Are there any database models or migrations involved? List the tables and columns affected.
4. Are there any existing patterns in the codebase I should follow (naming, structure, error handling)?
5. What are the integration points — other modules, third-party services, queues, events?
6. Are there any existing tests that cover the area being changed?
7. What are the riskiest parts of this change? (auth, multi-tenancy, data integrity, breaking changes)
8. Is anything ambiguous or missing from the feature description that needs clarification before planning?
</research_questions>

<constraints>
- Do not propose solutions yet
- Do not write code
- If a file is not in context, say so — do not guess its contents
- Flag any assumption you make
</constraints>

## Output format

Return a structured research report:

```
## Files in scope
- path/to/file.ts — reason

## Modules affected
- ModuleName — what changes

## Database impact
- table_name — columns affected, migration needed: yes/no

## Existing patterns to follow
- pattern description

## Integration points
- description

## Test coverage
- existing tests: yes/no — file path if yes

## Risk areas
- risk description

## Open questions
- question
```
