# Documentation

How this repo is organized. Full spec: [ENGINEERING-OS.md](../ENGINEERING-OS.md).

## Retrieval by mental path

| When you need... | Go to... |
|------------------|----------|
| A specific command | [reference/commands/](./reference/commands/) |
| Project or server setup | [reference/setup/](./reference/setup/) |
| Architecture patterns | [reference/architecture/](./reference/architecture/) |
| A bug you have seen before | [debugging/\<domain\>/](./debugging/) |
| A working config or script | [snippets/](./snippets/) |
| Why a decision was made | [decisions/](./decisions/) |
| What broke and why | [postmortems/](./postmortems/) |
| How to run a release | [1. systems/release-management-system.md](./1.%20systems/release-management-system.md) |
| Client/server compatibility | [1. systems/client-compatibility-system.md](./1.%20systems/client-compatibility-system.md) |
| A PR review prompt | [ai-workflows/pr-review-prompts.md](./ai-workflows/pr-review-prompts.md) |
| Task grooming / meeting prep | [ai-workflows/task-grooming-prompts.md](./ai-workflows/task-grooming-prompts.md) |
| Agent handoff between AI passes | [2. ai-workflows/agent-handoff-template.md](./2.%20ai-workflows/agent-handoff-template.md) |
| Coordinator-worker dev pattern | [2. ai-workflows/coordinator-worker.md](./2.%20ai-workflows/coordinator-worker.md) |
| Cursor plan agent (feature phases) | [2. ai-workflows/cursor-plan/](./2.%20ai-workflows/cursor-plan/) |
| specs.md (app planning & implementation) | [2. ai-workflows/specs-md.md](./2.%20ai-workflows/specs-md.md) |
| How to run planning / board setup | [1. systems/task-management-system.md](./1.%20systems/task-management-system.md) |

## `1. systems/`

Universal workflows — stable, rarely changes.

| File | Topic |
|------|--------|
| [task-management-system.md](./1.%20systems/task-management-system.md) | Board, tasks, WIP, meetings |
| [pr-review-system.md](./1.%20systems/pr-review-system.md) | AI-assisted PR review in Cursor |
| [release-management-system.md](./1.%20systems/release-management-system.md) | Branching, release flow, backward compatibility, deploy checklists |
| [client-compatibility-system.md](./1.%20systems/client-compatibility-system.md) | Server tags vs client adoption |

## `ai-workflows/`

Standalone prompts — see [ai-workflows/README.md](./ai-workflows/README.md).

## `reference/`

Evergreen technical knowledge — see [reference/README.md](./reference/README.md).

## `debugging/`, `decisions/`, `postmortems/`

Append-only operational records. Use templates in each folder.

## `snippets/`

Copy-paste code only — see [snippets/README.md](./snippets/README.md).

## Three rituals

1. **Capture during work** — write raw notes in `scratch/` (gitignored; run `mkdir scratch` locally)
2. **Friday review (15 min)** — promote scratch → right layer, update stale reference, delete junk
3. **After significant events** — debug note (hard bug), ADR (architecture decision), postmortem (incident)

See [ENGINEERING-OS.md](../ENGINEERING-OS.md) for layer contracts and migration notes.
