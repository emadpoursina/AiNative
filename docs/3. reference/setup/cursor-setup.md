# Cursor setup

## MCP

Configure MCP servers for tools the agent needs (database, Stripe, Firebase, etc.).

## Rules and skills

- Project rules live in `.cursor/rules/` (`engineering-os.mdc`, `ai-rules.mdc`, `Commit-style.mdc`, `piv-gate.mdc`)
- Claude Code reads [CLAUDE.md](../../../CLAUDE.md) at repo root — same constraints as Cursor rules
- Bootstrap new projects: copy [claude-md-template.md](../../2.%20ai-workflows/claude-md-template.md) to project root
- Reusable prompt templates: [cursor-rules.md](../../2.%20ai-workflows/cursor-rules.md)
- PIV Plan + Implementation: [specs-planner agent](../../8.%20agents/specs-planner/) — install with `bunx specsmd@latest install`; use `/specsmd-fire-planner` then `/specsmd-fire-builder` under `.cursor/commands/`
- PIV Validation: [critic](../../8.%20agents/critic/) and [tester](../../8.%20agents/tester/) agents; final gate via [pr-reviewer](../../8.%20agents/pr-reviewer/)
- Agent skills: `.cursor/skills/` or user skills directory

## Indexing and docs

- Index the repo for `@codebase` references
- Point Cursor at `docs/` for engineering OS context
- Prefer `@files` over whole-codebase scans when possible

See also [ENGINEERING-OS.md](../../../ENGINEERING-OS.md), [ai-workflows/](../../2.%20ai-workflows/), and [agents/](../../8.%20agents/).
