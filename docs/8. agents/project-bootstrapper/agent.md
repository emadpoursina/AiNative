# Project bootstrapper agent

Bootstraps a brand-new project repo from a single project documentation file (spec/PRD). Handles everything between "I have an idea written down" and "I can run `/specsmd-fire-planner` against `specs.md`": stack setup, git init, dependency install, and agent config — no feature code.

## When to use

- Starting a new project repo and you have one project doc (spec, PRD, or `specs.md` draft) describing what to build
- You want git, dependencies, and AI agent config (`.cursor/rules/ai-rules.mdc`, specs.md) set up in one pass before implementation starts

## Inputs

- One project documentation file (spec/PRD) describing the product, tech stack, and structure — see [new-project.md](../../3.%20reference/setup/new-project.md#planning) for the shape expected (business model, app structure, tech stack, PRD)

## Outputs

- Initialized git repo with the confirmed stack scaffolded and dependencies installed
- `.cursor/rules/ai-rules.mdc` filled in from [ai-rules-template.md](../../2.%20ai-workflows/ai-rules-template.md)
- specs.md installed via [specs-planner](../../specs-planner/) (default: FIRE flow), ready to plan work items from the input spec
- `scratch/` folder + `.gitignore` entry
- Handoff: user runs `/specsmd-fire-planner` against the spec to break it into sections/work items, then `/specsmd-fire-builder` to implement

## Supporting files

| File | Purpose |
|------|---------|
| `skill.md` | Bootstrap steps, stack-confirmation checklist, specs.md handoff |
| `rule.md` | Constraints — confirm before installing, no feature code, hand off to specs-planner |
