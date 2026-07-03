# Phase 4 — Verification

> **Role:** Reviewer — read and critique. No new features.
> **Goal:** Find what breaks before it reaches staging.

---

## Instructions for Cursor

You are in the **Verification Phase**. Implementation is complete. Your job is to find problems.

<task>
FEATURE: [SAME AS PHASE 1]
</task>

<context>
Reference the implemented files: @path/to/changed/files
Reference test flows from the synthesis plan: @docs/8. agents/cursor-plan/2-synthesis.md output
</context>

## Review passes

Run each pass as a separate prompt. Do not combine them.

---

### Pass A — Correctness

```
Referencing docs/8. agents/cursor-plan/4-verification.md Pass A, review the implementation for correctness.

Check:
- Does the code match the intended behavior from the plan?
- Do all test flows from the synthesis plan pass (happy path and edge cases)?
- Are all edge cases from the synthesis plan handled?
- Are there any missing branches or unhandled nulls?
- Are Zod schemas validating all external inputs?
- Are there any TypeScript errors or implicit `any` types?

Files: @path/to/file.ts
```

---

### Pass B — Security & Auth

```
Referencing docs/8. agents/cursor-plan/4-verification.md Pass B, review for security issues.

Check:
- Auth guards applied to every new endpoint?
- Multi-tenant isolation — can a user access another org's data?
- JWT/session handling correct?
- Any input that bypasses validation?
- Secrets or tokens exposed in logs or responses?
- Rate limiting missing on sensitive endpoints?

Files: @path/to/file.ts
```

---

### Pass C — Reliability

```
Referencing docs/8. agents/cursor-plan/4-verification.md Pass C, review for production reliability.

Check:
- All database operations wrapped in try/catch or handled by NestJS exception filters?
- Are transactions used where multiple writes happen together?
- Will this fail silently under high load or partial failure?
- Are queue jobs (BullMQ) idempotent?
- Are there any missing rollback paths?

Files: @path/to/file.ts
```

---

### Pass D — Adversarial

```
Referencing docs/8. agents/cursor-plan/4-verification.md Pass D, act as a hostile senior engineer.

Assume this code will fail in production. Find:
- Hidden assumptions that break under real traffic
- Race conditions
- Data integrity issues
- Anything a future engineer will curse you for
- What breaks if this is called concurrently?
- What breaks if the database is slow?

Files: @path/to/file.ts
```

---

## Output format for each pass

```
## Issues found

### Critical (must fix before merge)
- [file:line] — description

### Warning (should fix)
- [file:line] — description

### Suggestion (optional improvement)
- [file:line] — description

## Verdict
PASS / FAIL — one sentence summary
```

<constraints>
- Be specific: file path and line number for every issue
- Do not suggest improvements outside the feature scope
- Critical issues block the PR — do not skip them
</constraints>
