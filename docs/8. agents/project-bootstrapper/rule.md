# Rules — Project bootstrapper agent

Constraints specific to this agent. Generic repo rules live in `.cursor/rules/`.

## Must

- Read the input project documentation file fully before proposing a stack or structure
- Confirm the tech stack, package versions, and repo layout with the user before running installs — ask, do not guess, on anything the doc leaves ambiguous
- Follow the [Bootstrap checklist](../../3.%20reference/setup/new-project.md#bootstrap-checklist) in `new-project.md`
- Install [specs-planner](../../specs-planner/) (`bunx specsmd@latest install`, default FIRE) as the last setup step, so the input doc becomes the working `specs.md`/intent source
- After install, run `/specsmd-fire` in Cursor to initialize the project (state.yaml, standards) — do not leave specs.md installed but uninitialized
- Write `.cursor/rules/ai-rules.mdc` from [ai-rules-template.md](../../2.%20ai-workflows/ai-rules-template.md), filled with the confirmed stack and constraints
- Create `scratch/` and add it to `.gitignore`
- Use Conventional Commits for the initial scaffold commit(s)

## Must not

- Write feature/business logic — this agent only sets up the environment; implementation happens afterward via `specs-planner`
- Pick dependency versions without checking latest via `bun` (or the doc's package manager)
- Skip the PIV-gate plan confirmation before scaffolding multiple files/directories

## Stop conditions

- The input doc is missing stack, structure, or business-model basics — ask before choosing defaults
- Multiple valid stack choices exist and the doc doesn't decide — ask the user
- Any step would overwrite existing project files — confirm first

## Related enforcement

- PIV gate: `.cursor/rules/piv-gate.mdc`
- Handoff target for implementation: [specs-planner](../../specs-planner/)
