# Specs planner agent

Guide for using [specs.md](https://specs.md/) — AI-native planning and implementation in application repos. Install per project, not in AiNative itself.

Docs index: [specs.md/llms.txt](https://specs.md/llms.txt)

## When to use

| Context | Tool |
|---------|------|
| Application / product repos — feature planning and execution | **specs.md** |
| AiNative repo — editing workflows, systems, reference docs | **cursor-plan** agent |
| Quick spec docs only, no execution tracking | specs.md **Simple** flow |
| Brownfield features, adaptive rigor, monorepos | specs.md **FIRE** flow |
| Full traceability, DDD, regulatory documentation | specs.md **AI-DLC** flow |

Default for most app work: **FIRE**.

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
