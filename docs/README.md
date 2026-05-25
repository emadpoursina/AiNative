# Documentation

How this repo is organized.

## `systems/`

Universal workflows you reuse on every team. Copy as-is; tune tooling (board, CI) per project.

| File | Topic |
|------|--------|
| [task-management-system.md](./systems/task-management-system.md) | Board, tasks, WIP, meetings |
| [pr-review-system.md](./systems/pr-review-system.md) | AI-assisted PR review in Cursor |
| [release-management-system.md](./systems/release-management-system.md) | Branching and release flow |

## `reference/`

Long-lived technical notes: setup, tools, commands, processes — not tied to one team.

| File | Topic |
|------|--------|
| [programming-documentation.md](./reference/programming-documentation.md) | Project lifecycle, stack, Cursor, dev phases |

## `teams/`

Per-team overrides only: stack, branch names, board tool, meeting schedule, release approvers.

```text
teams/
└── <team-name>/
    └── README.md   # short setup + execution notes for that team
```

Keep universal rules in `systems/`; put local quirks here.
