# Agents

Per-task AI agents. Each agent is a folder with three core files tuned for one job.

## File contract

| File | Purpose |
|------|---------|
| `agent.md` | What the agent does, when to invoke it, inputs/outputs — read this first |
| `skill.md` | Skills copied inline from `_skills/` so the folder is self-contained |
| `rule.md` | Constraints and stop conditions specific to this agent |

Supporting files (phase prompts, etc.) live in the same folder when the workflow is multi-step.

## Agents

| Agent | Command | Purpose |
|-------|---------|---------|
| [specs-planner](./specs-planner/) | *(specs.md framework)* | specs.md planning and implementation (Plan + Implementation phases of PIV) |
| [critic](./critic/) | `/critic` | Adversarial review of plan and implementation (first half of PIV Validation) |
| [tester](./tester/) | `/tester` | Prove the code works via the Plan's test flows (second half of PIV Validation) |
| [pr-reviewer](./pr-reviewer/) | `/pr-reviewer` | Staged PR review — the final gate after Validation passes |
| [task-groomer](./task-groomer/) | `/task-groomer` | Backlog grooming and Monday/Friday meeting prep |
| [project-bootstrapper](./project-bootstrapper/) | `/project-bootstrapper` | New-project environment setup from a single spec doc, up to the point specs-planner takes over |

## Skill library

Reusable skills in [`_skills/`](./_skills/). When tuning an agent, copy needed skills into its `skill.md`. New skills discovered during tuning go into `_skills/` first, then copy to other agents that need them.

| Skill | Use for |
|-------|---------|
| [research-first](./_skills/research-first.md) | Codebase scan before planning |
| [mermaid-diagrams](./_skills/mermaid-diagrams.md) | Architecture and flow diagrams in plans |
| [conventional-commits](./_skills/conventional-commits.md) | Commit message format |
| [verification](./_skills/verification.md) | Post-implementation review passes (critic) |
| [test-execution](./_skills/test-execution.md) | Unit and system test execution (tester) |
| [doc-update-after-work](./_skills/doc-update-after-work.md) | Docs, changelog, comments after shipping |

## Add a new agent

1. Copy [`template/`](./template/) to `docs/8. agents/<task-name>/`
2. Write `agent.md` — purpose, when to use, inputs/outputs
3. Pick skills from `_skills/` and copy into `skill.md` (add `<!-- source: _skills/... -->` comments)
4. Capture agent-specific constraints in `rule.md`
5. Add supporting prompt files if the workflow has phases
6. Register the agent in this README table
7. Create a matching Cursor Command at `.cursor/commands/<agent-name>.md` (use an existing command as a template), unless the agent is owned by a framework that ships its own command (e.g. specs.md / `specs-planner`)
8. Tune all three files as you use the agent

## Related

- Methodology: [PIV — Plan, Implementation, Validation](../2.%20ai-workflows/agentic-coding.md)
- Generic templates (not agents): [ai-workflows/](../2.%20ai-workflows/)
