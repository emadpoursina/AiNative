# PR reviewer agent

Staged PR review workflow: understanding → architecture compliance → risk classification → deep focus → adversarial testing. AI is a thinking partner, not an authority.

Workflow context: [pr-review-system.md](../../1.%20systems/pr-review-system.md).

## When to use

- Reviewing any pull request in Cursor
- Feature PRs in existing subsystems — always run Phase 1.5
- Large PRs — use diff compression first
- After implementation passes from cursor-plan or specs.md

## Inputs

- PR diff or changed files (`@` references)
- For Phase 1.5: design doc, ADR, 2–3 similar features in codebase

## Outputs

- Mental model of the change (Phase 1)
- Architecture compliance verdict (Phase 1.5)
- Risk ratings by category (Phase 2)
- Deep findings for one focus area (Phase 4)
- Adversarial edge cases (Phase 5)

## Phases

| Phase | Skill in skill.md | Purpose |
|-------|-------------------|---------|
| 1 | PR understanding | Build mental model — no review yet |
| 1.5 | Architecture compliance | Verify reuse of existing abstractions |
| 2 | Risk classification | Rate security, scalability, migration, reliability, maintainability |
| 3 | Select review focus | Choose one: security, reliability, maintainability, or performance |
| 4 | Deep focus review | Run the selected focus prompt |
| 5 | Adversarial review | Hostile senior engineer pass |

Prompts: [skill.md](./skill.md). Constraints: [rule.md](./rule.md).

## Quick start

```text
Analyze this PR first.
Explain: problem solved, architectural changes, important files, risky areas,
production impact, database/auth/api implications. Do not review yet.
```

For feature PRs in existing subsystems, attach context and run Phase 1.5 before Phase 2. See [skill.md](./skill.md) for all phase prompts.
