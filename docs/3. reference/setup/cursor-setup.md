# Cursor setup

## MCP

Configure MCP servers for tools the agent needs (database, Stripe, Firebase, etc.).

## Rules and skills

- Project rules live in `.cursor/rules/` (`engineering-os.mdc`, `ai-rules.mdc`, `Commit-style.mdc`, `planning-gate.mdc`)
- Project skills live in `.cursor/skills/` — feature planning: `@cursor-plan` (`.cursor/skills/cursor-plan/SKILL.md`)
- Claude Code reads [CLAUDE.md](../../../CLAUDE.md) at repo root — same constraints as Cursor rules
- Bootstrap new projects: copy [claude-md-template.md](../../2.%20ai-workflows/claude-md-template.md) to project root
- Reusable prompt templates: [cursor-rules.md](../../2.%20ai-workflows/cursor-rules.md)
- Feature planning (research → plan → implement): [cursor-plan/](../../2.%20ai-workflows/cursor-plan/) — phase prompts; skill wires them together
- Agent skills: `.cursor/skills/` or user skills directory

## Indexing and docs

- Index the repo for `@codebase` references
- Point Cursor at `docs/` for engineering OS context
- Prefer `@files` over whole-codebase scans when possible

See also [ENGINEERING-OS.md](../../../ENGINEERING-OS.md) and [ai-workflows/](../../ai-workflows/).
