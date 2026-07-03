# Task groomer agent

Backlog grooming and meeting prep prompts for a small engineering team. AI drafts; humans confirm in meetings.

Workflow context: [task-management-system.md](../../1.%20systems/task-management-system.md).

## When to use

- A Backlog card is rough and needs to move to **Todo**
- Preparing for Monday planning meeting
- Preparing for Friday delivery review

## Inputs

- Rough card text, backlog candidates, or board snapshot (column + title per line)
- Optional: team names, WIP state, blockers, release deadline

## Outputs

- Groomed cards with Problem, Expected Result, Acceptance Criteria, priority, labels
- Monday agenda with recommended Backlog → Todo moves
- Friday talking points, slipped items, changelog bullets

Prompts: [skill.md](./skill.md). Constraints: [rule.md](./rule.md).

## Quick start

For todo-ready grooming, paste a rough Backlog card and run the **Todo-ready grooming** prompt in [skill.md](./skill.md).
