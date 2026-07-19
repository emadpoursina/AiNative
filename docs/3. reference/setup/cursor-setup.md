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

## Global agent alert hook

Plays a short sound when the agent finishes a turn or needs your input (for example `AskQuestion` or `SwitchMode`).

| Scope | Path | Use for |
|-------|------|---------|
| Source | `.cursor/hooks/agent-alert.sh` | Canonical script in AiNative |
| Global | `~/.cursor/hooks.json` + `~/.cursor/hooks/agent-alert.sh` | Runs in every workspace |

Install with the same machine setup as global commands:

```bash
node "$AINATIVE_HOME/scripts/ainative-link.mjs" machine
```

Manual equivalent:

```bash
mkdir -p ~/.cursor/hooks
ln -sf "$AINATIVE_HOME/.cursor/hooks/agent-alert.sh" ~/.cursor/hooks/agent-alert.sh
# Merge .cursor/hooks/hooks.global.json into ~/.cursor/hooks.json (or copy if missing)
```

Options:

- `CURSOR_ALERT_SOUND` — custom `.aiff` / `.wav` path (default: macOS `Glass.aiff`)
- `CURSOR_ALERT_DISABLE=1` — disable alerts

Restart Cursor after the first install. Check the **Hooks** output channel if a hook does not fire.

## Indexing and docs

- Index the repo for `@codebase` references
- Point Cursor at `docs/` for engineering OS context
- Prefer `@files` over whole-codebase scans when possible

See also [ENGINEERING-OS.md](../../../ENGINEERING-OS.md), [ai-workflows/](../../2.%20ai-workflows/), and [agents/](../../8.%20agents/).
