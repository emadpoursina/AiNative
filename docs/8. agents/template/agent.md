# [Agent name]

[One paragraph: what this agent does and what it produces.]

## When to use

- [Trigger 1]
- [Trigger 2]
- [Trigger 3]

## Inputs

- [What the user provides]

## Outputs

- [What the agent produces]

## Supporting files

| File | Purpose |
|------|---------|
| [optional phase or prompt files] | [description] |

## Cursor Command

Pair this agent with a Cursor Command at `.cursor/commands/<agent-name>.md` in AiNative, then symlink it to `~/.cursor/commands/` so it is available in every project (e.g. `/my-agent`). Use an existing command file as a template. Skip if the agent is owned by a framework that registers its own command (e.g. specs.md / `specs-planner`). See [personal-agents-symlinks.md](../../3.%20reference/setup/personal-agents-symlinks.md).
