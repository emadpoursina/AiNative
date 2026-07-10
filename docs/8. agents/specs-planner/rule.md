# Rules — Specs planner agent

AiNative conventions to keep when using specs.md in application repos.

## Must

- Align commits with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) — one complete file set per commit
- Run [critic](../critic/) then [tester](../tester/) as the PIV Validation phase after the builder passes; run [pr-reviewer](../pr-reviewer/) only after Validation passes
- Follow [release-management-system.md](../../1.%20systems/release-management-system.md) for releases
- Capture raw notes in `scratch/`; promote to project docs on Friday review
- Copy [ai-rules-template.md](../../2.%20ai-workflows/ai-rules-template.md) into `.cursor/rules/ai-rules.mdc` in app repos
- Commit `.specsmd/` and `.specs-fire/` (or `memory-bank/` for AI-DLC) with the project

## Must not

- Maintain two diverging copies of standards or intent files

## Tool selection

| Repo | Use |
|------|-----|
| All repos (app and AiNative) | specs.md (default: FIRE) for Plan + Implementation; critic + tester for Validation |

## Stop conditions

- Unclear which flow to use — consult [choose-flow](https://specs.md/architecture/choose-flow.md) before installing
- Work item complexity unclear — set Confirm or Validate checkpoint before Autopilot
