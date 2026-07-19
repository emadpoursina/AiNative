# Ponytail

**Date:** 2026-07-19
**Status:** Queued
**Category:** context

## Hypothesis

Ponytail's YAGNI ladder (reuse → stdlib → native → dependency → minimum code) could reduce over-engineering during PIV **Implementation** in Cursor — smaller diffs, lower token cost, faster review — without cutting validation, security, or accessibility. Benchmarks claim ~54% less LOC and ~20% lower cost vs no-skill baseline on real agentic sessions.

Relevant agentic parts: **Context** (rules/skills injected every turn), **Agents** (subagent injection via hooks).

## Source

- https://github.com/DietrichGebert/ponytail
- https://ponytail.dev
- MIT license; Cursor: copy rules from `.cursor/rules/` in the repo

## Test plan

- [ ] Install for Cursor: copy `.cursor/rules/ponytail.md` (or equivalent) into a test project; confirm activation
- [ ] Run 2–3 bounded Implementation tasks (medium feature, not trivial typo) with ponytail **on** vs **off** — same model tier
- [ ] Measure: LOC in diff, files touched, unnecessary dependencies added, acceptance criteria still met
- [ ] Run `/ponytail-review` (or manual critic pass) on diffs — confirm safety guards held (validation, auth, error handling)
- [ ] Test interaction with existing AiNative rules (`engineering-os`, `piv-gate`, `ai-rules`) — conflicts or reinforcement?
- [ ] Success criteria: meaningfully smaller diffs on over-build-prone tasks; no missed acceptance criteria; no safety regressions
- [ ] Baseline: current `.cursor/rules/` without ponytail

## Results

_Fill after testing._

| Run | Date | Task | Outcome | Notes |
|-----|------|------|---------|-------|
| 1 | | | | |

### Summary

What worked, what did not, surprises.

## Verdict

**Adopted** / **Rejected** / **More testing needed**

If adopted, where it was promoted:

- [ ] [agentic-system.md](../2.%20ai-workflows/agentic-system.md) — Context section
- [ ] [ai-rules-template.md](../2.%20ai-workflows/ai-rules-template.md)
- [ ] `.cursor/rules/` in target projects
- [ ] [tools.md](../3.%20reference/tools.md)
- [ ] [decisions/](../6.%20decisions/) — ADR if architectural
- [ ] Other: _link_

If rejected, why not worth another look (or when to re-open).
