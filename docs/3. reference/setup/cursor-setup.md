# Cursor setup

## MCP

Configure MCP servers for tools the agent needs (database, Stripe, Firebase, etc.).

## Rules and skills

- Project rules live in `.cursor/rules/` (`engineering-os.mdc`, `ai-rules.mdc`, `Commit-style.mdc`, `piv-gate.mdc`)
- **App projects:** global commands + per-project symlinks from AiNative — [personal-agents-symlinks.md](./personal-agents-symlinks.md)
- Bootstrap new projects: copy [ai-rules-template.md](../../2.%20ai-workflows/ai-rules-template.md) into `.cursor/rules/ai-rules.mdc`
- Reusable prompt templates: [cursor-rules.md](../../2.%20ai-workflows/cursor-rules.md)
- PIV Plan + Implementation: [specs-planner agent](../../8.%20agents/specs-planner/) — install with `bunx specsmd@latest install`; use `/specsmd-fire-planner` then `/specsmd-fire-builder` (specs.md installs project commands under `.cursor/commands/`)
- PIV Validation: [critic](../../8.%20agents/critic/) and [tester](../../8.%20agents/tester/) agents; architecture in [validation-layer.md](../../2.%20ai-workflows/validation-layer.md); final gate via [pr-reviewer](../../8.%20agents/pr-reviewer/)
- Agent skills: `.cursor/skills/` or user skills directory

## Commands

| Scope | Path | Use for |
|-------|------|---------|
| Global | `~/.cursor/commands/` | AiNative agents (`/critic`, `/tester`, `/pr-reviewer`, …) — symlink once per machine |
| Project | `.cursor/commands/` | specs.md and other project-specific commands |

Global commands are available in every workspace. They still read project-relative paths (`docs/8. agents/...`), so each app project needs the doc symlinks from [personal-agents-symlinks.md](./personal-agents-symlinks.md).

## Indexing and docs

- Index the repo for `@codebase` references
- Point Cursor at `docs/` for engineering OS context
- Prefer `@files` over whole-codebase scans when possible

See also [ENGINEERING-OS.md](../../../ENGINEERING-OS.md), [ai-workflows/](../../2.%20ai-workflows/), and [agents/](../../8.%20agents/).
