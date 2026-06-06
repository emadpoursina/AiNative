# Cursor setup

## MCP

Configure MCP servers for tools the agent needs (database, Stripe, Firebase, etc.).

## Rules and skills

- Project rules live in `.cursor/rules/`
- Reusable prompt templates: [cursor-rules.md](../../ai-workflows/cursor-rules.md)
- Agent skills: `.cursor/skills/` or user skills directory

## Indexing and docs

- Index the repo for `@codebase` references
- Point Cursor at `docs/` for engineering OS context
- Prefer `@files` over whole-codebase scans when possible

See also [ENGINEERING-OS.md](../../../ENGINEERING-OS.md) and [ai-workflows/](../../ai-workflows/).
