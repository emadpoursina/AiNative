# Rules — Specs planner agent

AiNative conventions to keep when using specs.md in application repos.

## Must

- Align commits with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) — one complete file set per commit
- Run [pr-reviewer](../pr-reviewer/) after implementation passes
- Follow [release-management-system.md](../../1.%20systems/release-management-system.md) for releases
- Capture raw notes in `scratch/`; promote to project docs on Friday review
- Copy [claude-md-template.md](../../2.%20ai-workflows/claude-md-template.md) to `CLAUDE.md` or `.cursor/rules/ai-rules.mdc` in app repos
- Commit `.specsmd/` and `.specs-fire/` (or `memory-bank/` for AI-DLC) with the project

## Must not

- Install specs.md in AiNative itself — use [cursor-plan](../cursor-plan/) for OS maintenance
- Maintain two diverging copies of standards or intent files

## Tool selection

| Repo | Use |
|------|-----|
| Application / product repos | specs.md (default: FIRE) |
| AiNative repo | cursor-plan agent |

## Stop conditions

- Unclear which flow to use — consult [choose-flow](https://specs.md/architecture/choose-flow.md) before installing
- Work item complexity unclear — set Confirm or Validate checkpoint before Autopilot
