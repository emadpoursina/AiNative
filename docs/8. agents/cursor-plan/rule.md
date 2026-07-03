# Rules — Cursor plan agent

Constraints specific to the cursor-plan workflow. Generic repo rules live in `.cursor/rules/` and `CLAUDE.md`.

## Must

- Run Phase 1 before Phase 2; Phase 2 before any code in Phase 3
- Present research report and wait for confirmation before planning
- Present plan and wait for explicit approval before writing code (2+ file tasks)
- Implement one step per Phase 3 prompt — targeted edits only, never rewrite whole files
- Run verification passes A → B → C → D separately in Phase 4
- Resolve all critical verification issues before Phase 5
- Output migration SQL/schema for manual review — do not apply automatically
- Pass context between phases using `<context>` blocks or handoff artifacts

## Must not

- Write or suggest code in phases 1, 2, or 5
- Skip to implementation without an approved plan (multi-file tasks)
- Combine verification passes into one prompt
- Add dependencies not in the approved plan
- Refactor code outside the current step's scope

## Stop conditions

- Plan step is wrong or impossible — flag it, do not guess
- Task is ambiguous — ask one clarifying question before research
- Critical issues in verification — block Phase 5 until resolved

## Phase handoff gates

| Transition | Gate |
|------------|------|
| Phase 1 → 2 | Research lists files, risks, open questions |
| Phase 2 → 3 | Plan confirmed by user |
| Phase 3 → 4 | All plan steps complete |
| Phase 4 → 5 | All critical verification issues resolved |
| Phase 5 → done | Changelog and commit message written |

## Role behavior

| Role | Phases | Behavior |
|------|--------|----------|
| Coordinator | 1, 2, 5 | Read and analyze only; structured markdown output |
| Worker | 3 | One step per prompt; targeted edits; flag plan gaps |
| Reviewer | 4 | One pass per prompt; file:line for every issue; PASS/FAIL verdict |

## Related enforcement

- Cursor skill: `.cursor/skills/cursor-plan/SKILL.md` — loads phase files via `@cursor-plan phase=N`
- Auto gate: `.cursor/rules/planning-gate.mdc` — enforces research + plan approval for 2+ file tasks in this repo

## Other projects

Copy `docs/8. agents/cursor-plan/*.md` to `.cursor/plans/` for shorter `@` paths. Keep one canonical copy — do not maintain diverging versions.
