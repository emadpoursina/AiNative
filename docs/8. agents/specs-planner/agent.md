# Specs planner agent

Guide for using [specs.md](https://specs.md/) — AI-native planning and implementation. Owns the **Plan** and **Implementation** phases of [PIV](../../2.%20ai-workflows/agentic-coding.md). Installed in every repo, including AiNative itself.

Docs index: [specs.md/llms.txt](https://specs.md/llms.txt)

## When to use

| Context | Tool |
|---------|------|
| Any repo (app or AiNative) — PIV Plan and Implementation | **specs.md** |
| Quick spec docs only, no execution tracking | specs.md **Simple** flow |
| Brownfield features, adaptive rigor, monorepos | specs.md **FIRE** flow |
| Full traceability, DDD, regulatory documentation | specs.md **AI-DLC** flow |

Default for most work: **FIRE**. Validation (the third PIV phase) is owned by the [critic](../critic/) and [tester](../tester/) agents, not specs.md.

## Inputs

- Bun, Cursor (or supported AI tool)
- Project repo with `bunx specsmd@latest install` completed

## Outputs

- Intent briefs and work items (FIRE planner)
- Executed runs with walkthroughs (FIRE builder)
- Standards under `.specs-fire/standards/` or `memory-bank/standards/` (AI-DLC)

Skills and install details: [skill.md](./skill.md). AiNative alignment rules: [rule.md](./rule.md).

## Quick start (FIRE)

1. `/specsmd-fire-planner` — capture intent, break into work items
2. Review work items and complexity (Autopilot / Confirm / Validate)
3. `/specsmd-fire-builder` — execute next run
4. Repeat until intent is done
