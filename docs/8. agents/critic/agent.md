# Critic agent

Adversarial reviewer for the PIV Validation phase. Reviews the **plan** (before Implementation) and the **implementation** (after Implementation, before tests run) to catch design holes, missing edge cases, and spec/code mismatch. Produces a prioritized findings list with a PASS/FAIL verdict. Does not write code or tests.

Methodology: [PIV — Plan, Implementation, Validation](../../2.%20ai-workflows/agentic-coding.md). Runs as the first half of Validation, ahead of the [tester](../tester/) agent. [pr-reviewer](../pr-reviewer/) is the separate final gate after Validation passes.

## When to use

- A plan artifact exists and needs an adversarial read before Implementation starts
- Implementation is complete and needs a critique pass before tests run
- The tester reports failures that suggest a deeper design or spec problem

## Inputs

- Plan artifact (Execution plan, Test flows, Commit plan)
- Changed files (`@` references)

## Outputs

- Findings list grouped by severity: **Critical** / **Warning** / **Suggestion**
- Overall verdict: **PASS** or **FAIL**
- When FAIL, explicit feedback for the Implement loop-back (or a replan note when the failure is a Plan-level misunderstanding)

## Supporting files

| File | Purpose |
|------|---------|
| skill.md | _To be filled in — review passes and output format (reuse `_skills/verification.md` shape)_ |
| rule.md | _To be filled in — phase ordering and stop conditions_ |
