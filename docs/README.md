# Documentation

How this repo is organized. Full spec: [ENGINEERING-OS.md](../ENGINEERING-OS.md).

## Retrieval by mental path

| When you need... | Go to... |
|------------------|----------|
| A specific command | [reference/commands/](./3.%20reference/commands/) |
| Project or server setup | [reference/setup/](./3.%20reference/setup/) |
| Architecture patterns | [reference/architecture/](./3.%20reference/architecture/) |
| A bug you have seen before | [debugging/\<domain\>/](./4.%20debugging/) |
| A working config or script | [snippets/](./5.%20snippets/) |
| Why a decision was made | [decisions/](./6.%20decisions/) |
| What broke and why | [postmortems/](./7.%20postmortems/) |
| How to run a release | [1. systems/release-management-system.md](./1.%20systems/release-management-system.md) |
| Client/server compatibility | [1. systems/client-compatibility-system.md](./1.%20systems/client-compatibility-system.md) |
| A per-task AI agent | [8. agents/](./8.%20agents/) — start with `agent.md` |
| PIV methodology (Plan, Implementation, Validation) | [2. ai-workflows/agentic-coding.md](./2.%20ai-workflows/agentic-coding.md) |
| specs.md planning & implementation (PIV Plan + Implementation) | [8. agents/specs-planner/](./8.%20agents/specs-planner/) |
| PIV Validation — adversarial review | [8. agents/critic/](./8.%20agents/critic/) |
| PIV Validation — prove the code works | [8. agents/tester/](./8.%20agents/tester/) |
| PR review prompts | [8. agents/pr-reviewer/](./8.%20agents/pr-reviewer/) |
| Task grooming / meeting prep | [8. agents/task-groomer/](./8.%20agents/task-groomer/) |
| New-project scaffolding | [8. agents/project-bootstrapper/](./8.%20agents/project-bootstrapper/) |
| Reusable agent skills | [8. agents/_skills/](./8.%20agents/_skills/) |
| Agent handoff between AI passes | [2. ai-workflows/agent-handoff-template.md](./2.%20ai-workflows/agent-handoff-template.md) |
| How to run planning / board setup | [1. systems/task-management-system.md](./1.%20systems/task-management-system.md) |

## `1. systems/`

Universal workflows — stable, rarely changes.

| File | Topic |
|------|--------|
| [task-management-system.md](./1.%20systems/task-management-system.md) | Board, tasks, WIP, meetings |
| [pr-review-system.md](./1.%20systems/pr-review-system.md) | AI-assisted PR review in Cursor |
| [release-management-system.md](./1.%20systems/release-management-system.md) | Branching, release flow, backward compatibility, deploy checklists |
| [client-compatibility-system.md](./1.%20systems/client-compatibility-system.md) | Server tags vs client adoption |

## `2. ai-workflows/`

Generic AI templates — see [ai-workflows/README.md](./2.%20ai-workflows/README.md).

## `8. agents/`

Per-task AI agents — see [agents/README.md](./8.%20agents/README.md).

## `3. reference/`

Evergreen technical knowledge — see [reference/README.md](./3.%20reference/README.md).

## `4. debugging/`, `6. decisions/`, `7. postmortems/`

Append-only operational records. Use templates in each folder.

## `5. snippets/`

Copy-paste code only — see [snippets/README.md](./5.%20snippets/README.md).

## Three rituals

1. **Capture during work** — write raw notes in `scratch/` (gitignored; run `mkdir scratch` locally)
2. **Friday review (15 min)** — promote scratch → right layer, update stale reference, delete junk
3. **After significant events** — debug note (hard bug), ADR (architecture decision), postmortem (incident)

See [ENGINEERING-OS.md](../ENGINEERING-OS.md) for layer contracts and migration notes.
