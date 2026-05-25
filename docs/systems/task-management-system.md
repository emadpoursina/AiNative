# Task Management System

A lightweight engineering task management system for small teams, startups, freelance projects, and personal development workflows.

Designed for:
- small software teams
- startup environments
- technical leads
- solo developers
- hybrid developer/managers

---

# Goals of This System

This system is designed to:

- reduce mental overload
- improve delivery predictability
- reduce communication friction
- improve PR quality
- improve release stability
- reduce context switching
- make work visible
- scale small teams without bureaucracy

---

# Core Principles

## 1. Simplicity Over Complexity

Do not over-engineer process.

The system should:
- help work move faster
- reduce confusion
- improve visibility

If a process becomes annoying, simplify it.

---

## 2. Visibility Over Memory

Nothing important should live only in someone’s head.

Track:
- tasks
- blockers
- release status
- ownership
- priorities
- technical decisions

---

## 3. Finish Work Before Starting New Work

Too much parallel work destroys delivery quality.

Focus on:
- smaller tasks
- fewer active items
- finishing before starting

---

# Recommended Workflow

```text
Backlog
→ Todo
→ In Progress
→ In Review
→ Testing
→ Ready For Release
→ Released
→ Archived
```

---

# Column Definitions

## Backlog

Unprioritized ideas, bugs, or requests.

Rules:
- no detailed discussion required
- not committed for development
- can be rough

---

## Todo

Approved and ready for development.

Rules:
- task must be clear
- acceptance criteria must exist
- ownership assigned

---

## In Progress

Currently being worked on.

Rules:
- only active development tasks
- avoid too many simultaneous tasks

Recommended:
- max 1 active feature task per developer

---

## In Review

Code review stage.

Rules:
- PR opened
- self-tested
- follows review checklist

---

## Testing

QA/testing stage.

Can include:
- manual testing
- staging verification
- regression testing
- product owner review

---

## Ready For Release

Completed and approved tasks waiting for deployment.

Useful for:
- grouping release scope
- avoiding accidental deployment
- release planning

---

## Released

Successfully deployed tasks.

---

## Archived

Completed historical tasks.

Used to:
- reduce board clutter
- preserve history

---

# Task Card Standard

Every technical task should follow a standard structure.

---

# Recommended Task Template

```md
## Problem
What is happening?

---

## Expected Result
What should happen?

---

## Platform
- Backend
- Desktop
- Android
- iOS
- Website

---

## Acceptance Criteria
- [ ]
- [ ]
- [ ]

---

## Technical Notes
Optional implementation notes.

---

## Dependencies
Optional blockers or related tasks.
```

---

# Task Creation Rules

## Good Tasks

Good tasks are:
- clear
- measurable
- scoped
- testable

Example:

```text
Add validation for login API when password is empty.
```

---

## Bad Tasks

Bad tasks are:
- vague
- broad
- unclear

Example:

```text
Fix login
```

---

# Priority System

Use only 4 priority levels.

| Priority | Meaning |
|---|---|
| P0 | Production issue |
| P1 | Critical feature/blocker |
| P2 | Normal development |
| P3 | Improvement/nice-to-have |

---

# Labels System

Recommended labels:

| Label | Purpose |
|---|---|
| Bug | Existing issue |
| Feature | New functionality |
| Improvement | Enhancement |
| Refactor | Code cleanup |
| Release Blocker | Must fix before release |
| Tech Debt | Maintenance work |

---

# Ownership Rules

Every task should have:
- one owner
- one reviewer

Avoid:
- shared responsibility
- unclear ownership

---

# PR Review Workflow

## Before Moving Task To Review

Developer checklist:

```text
- self-tested
- no debug logs
- branch updated
- no merge conflicts
- follows task scope
- screenshots added for UI changes
- acceptance criteria completed
```

---

# PR Review Checklist

## General

```text
- naming consistency
- no dead code
- readability
- duplication avoided
- proper error handling
- validation exists
- no unnecessary complexity
```

---

## Backend

```text
- API consistency
- migration safety
- response structure valid
- security concerns checked
- logging handled properly
```

---

## Desktop

```text
- loading states
- crash handling
- IPC safety
- UI consistency
- release compatibility
```

---

# Work In Progress (WIP) Limits

Avoid excessive parallel work.

Recommended rules:

```text
- max 1 active feature task per developer
- finish reviews before starting new work
- avoid multiple unfinished branches
- urgent bugs can interrupt only when necessary
```

---

# Weekly Meeting System

---

# Monday Meeting — Planning

Purpose:
- align priorities
- identify blockers
- define weekly targets

Questions:
- What must be finished this week?
- What is blocked?
- What is highest risk?
- What should not be worked on?

Avoid:
- deep technical discussions
- debugging sessions

---

# Friday Meeting — Delivery Review

Purpose:
- review completed work
- evaluate delays
- prepare releases
- report status

Questions:
- What was completed?
- What slipped?
- Why?
- What requires management decision?

---

# Release Management Integration

Recommended release workflow:

```text
Testing
→ Ready For Release
→ Released
```

---

# Release Checklist

```text
1. verify target branch
2. pull latest changes
3. run tests
4. build production
5. verify environments
6. tag version
7. upload release assets
8. smoke test
9. update changelog
```

---

# Recommended Team Rules

## Communication Rules

- tasks before chat messages
- document decisions
- avoid verbal-only agreements
- use comments inside tasks

---

## Development Rules

- small PRs preferred
- avoid large unreviewable changes
- complete work before starting new tasks

---

## Review Rules

- review quickly
- avoid review bottlenecks
- request changes clearly
- explain architectural concerns

---

# Documentation System

Every team should maintain:

- environment setup guide
- deployment guide
- architecture notes
- debugging notes
- recurring fixes
- release procedures

---

# Personal Productivity Recommendations

For technical leads and hybrid roles:

## Time Blocking

Separate:
- coding
- reviews
- management
- releases

Avoid mixing all simultaneously.

---

## Personal Knowledge Base

Store:
- debugging solutions
- deployment fixes
- useful commands
- architecture notes
- AI prompts
- recurring patterns

Recommended tools:
- Obsidian
- Notion
- Markdown repository

---

# Recommended Tooling

## Small Teams

- Trello
- GitHub Projects
- Notion

---

## Medium Teams

- Jira
- Linear
- ClickUp

---

# Anti-Patterns To Avoid

## 1. Over-Engineering Process

Do not build enterprise bureaucracy for small teams.

---

## 2. Too Many Meetings

Meetings should support work, not replace it.

---

## 3. Massive Tasks

Large unclear tasks create:
- delays
- review problems
- merge conflicts

Break tasks down.

---

## 4. Hidden Work

Operational work should be visible:
- release prep
- deployments
- reviews
- bug investigations

---

# New Team Implementation (Step by Step)

Use this sequence when rolling out the task management system on a new team. Keep universal rules in this document; record team-specific choices in [`docs/teams/<team-name>/README.md`](../teams/README.md).

Estimated time: one working day for setup, one sprint for habit formation.

---

## Phase 1 — Decide Scope (Day 0, ~30 minutes)

**Step 1.1 — Confirm the team fits this system**

Check:
- team size is small (roughly 2–15 engineers)
- work is tracked in software (features, bugs, releases)
- at least one person can own process (tech lead or PM)

If the team is larger or needs compliance workflows, start with a subset (one product squad) before expanding.

**Step 1.2 — Name roles**

| Role | Responsibility |
|---|---|
| Process owner | Sets up board, templates, meetings; simplifies when friction appears |
| Default reviewer | First reviewer when task owner does not specify one |
| Release approver | Moves tasks to Released; signs off on production deploy |

One person can hold multiple roles on small teams.

**Step 1.3 — Pick tooling**

Choose one board tool (see [Recommended Tooling](#recommended-tooling)). Prefer what the team already uses over migrating for perfection.

Record in the team README:
- board URL
- who has admin access
- whether tasks link to GitHub/GitLab issues or PRs

---

## Phase 2 — Board Setup (Day 0, ~1 hour)

**Step 2.1 — Create columns in order**

Create exactly these columns (left to right):

```text
Backlog → Todo → In Progress → In Review → Testing → Ready For Release → Released → Archived
```

Do not add extra columns until the team has used this flow for at least two weeks.

**Step 2.2 — Configure WIP limits (if the tool supports them)**

| Column | Suggested limit |
|---|---|
| In Progress | 1 card per developer (features) |
| In Review | 2× team size (temporary queue) |
| Testing | same as In Review |

Urgent P0 bugs may bypass the feature WIP limit; document that exception in the team README.

**Step 2.3 — Add priorities**

Create four priority levels only: P0, P1, P2, P3 (see [Priority System](#priority-system)).

**Step 2.4 — Add labels**

Minimum set: Bug, Feature, Improvement, Refactor, Release Blocker, Tech Debt (see [Labels System](#labels-system)).

Add team-specific labels only when a type of work appears repeatedly (for example `Infra`, `Docs`).

**Step 2.5 — Save the task template**

In the board tool (or team wiki), paste the [Recommended Task Template](#recommended-task-template) as the default description for new cards.

---

## Phase 3 — Team Documentation (Day 0, ~30 minutes)

**Step 3.1 — Create the team folder**

```text
docs/teams/<team-name>/README.md
```

**Step 3.2 — Fill required fields**

Include:
- stack and repositories
- board tool and link
- branch names (if different from [release-management-system.md](./release-management-system.md))
- meeting day/time and required attendees
- release approver name or role
- any adapted checklists (shorter PR checklist, extra platforms in the template)

**Step 3.3 — Link related systems**

In the team README, point to:
- this document (task board and meetings)
- [pr-review-system.md](./pr-review-system.md) (review before merging)
- [release-management-system.md](./release-management-system.md) (branching and deploy)

---

## Phase 4 — Workflow Rules (Day 0, ~30 minutes)

**Step 4.1 — Agree on task creation rules**

Share with the team:
- [Task Creation Rules](#task-creation-rules) (good vs bad tasks)
- every Todo card must have owner, reviewer, and acceptance criteria
- Backlog items stay rough; Todo items must be ready to build

**Step 4.2 — Agree on column movement rules**

| Transition | Rule |
|---|---|
| Backlog → Todo | Prioritized in planning; acceptance criteria written |
| Todo → In Progress | Owner starts work; only one active feature per developer |
| In Progress → In Review | PR opened; [developer checklist](#before-moving-task-to-review) done |
| In Review → Testing | PR approved and merged (or merged to integration branch per release doc) |
| Testing → Ready For Release | QA or staging sign-off |
| Ready For Release → Released | Deployed to production per release checklist |
| Released → Archived | After release notes or sprint close |

**Step 4.3 — Agree on communication rules**

Adopt [Recommended Team Rules](#recommended-team-rules):
- create or update a task before long chat threads
- decisions go in task comments, not only verbal

---

## Phase 5 — Integrate PR and Release (Day 0–1, ~1 hour)

**Step 5.1 — Map PR state to the board**

```text
PR opened        → move card to In Review
PR approved      → keep in In Review until merged
Merged           → move to Testing (or Ready For Release if no separate QA)
```

**Step 5.2 — Adopt the PR review checklist**

Use [PR Review Checklist](#pr-review-checklist) for human review. Optionally adopt the staged AI workflow in [pr-review-system.md](./pr-review-system.md).

**Step 5.3 — Adopt release columns**

Align Testing → Ready For Release → Released with [Release Management Integration](#release-management-integration) and the release doc’s staging/production phases.

Release approver owns the Ready For Release → Released transition.

---

## Phase 6 — Meetings (Week 1)

**Step 6.1 — Schedule recurring meetings**

| Meeting | When | Duration | Owner |
|---|---|---|---|
| Monday planning | Start of week | 30–45 min | Process owner |
| Friday delivery review | End of week | 30–45 min | Process owner |

Use agendas from [Monday Meeting — Planning](#monday-meeting--planning) and [Friday Meeting — Delivery Review](#friday-meeting--delivery-review).

**Step 6.2 — First Monday (kickoff)**

1. Walk through columns and WIP limits (15 min).
2. Groom Backlog → Todo for the week (20 min).
3. Assign owners and reviewers on Todo cards (10 min).
4. Note blockers and what not to work on (5 min).

**Step 6.3 — First Friday (retro light)**

1. Move completed cards to Released or Archived.
2. Review what slipped and why (no blame; adjust scope or WIP).
3. Confirm what is Ready For Release for the next deploy.

---

## Phase 7 — Pilot Sprint (Week 1–2)

**Step 7.1 — Start with a thin slice**

For the first sprint:
- limit active Todo items to what the team can finish
- require the task template on every Todo card
- enforce In Progress WIP strictly

**Step 7.2 — Daily hygiene (async, 5 minutes per person)**

Each developer:
- update card position when work state changes
- comment on blockers the same day
- link PR URL on the card when opening review

**Step 7.3 — Process owner checks mid-week**

- Are cards in the wrong column?
- Are there tasks without owners?
- Is In Progress overloaded?

Fix process, not people: simplify before adding rules.

---

## Phase 8 — Stabilize and Improve (Week 3+)

**Step 8.1 — Retrospect on friction**

After two weeks, ask:
- Are meetings too long?
- Are tasks still vague?
- Is review the bottleneck?

Adjust one thing at a time (fewer labels, shorter checklist, different meeting time).

**Step 8.2 — Add documentation habits**

Ensure the team maintains items from [Documentation System](#documentation-system) in repo or wiki, linked from the team README.

**Step 8.3 — Onboard new members**

New engineer checklist:
1. Read team README and this system doc.
2. Get board access.
3. Shadow one Monday and one Friday meeting.
4. Take one small P2 task through the full column flow with a buddy reviewer.

---

## Implementation Checklist (Copy for Team README)

```text
[ ] Board created with 8 columns
[ ] Priorities P0–P3 configured
[ ] Core labels added
[ ] Task template saved in board tool
[ ] docs/teams/<team-name>/README.md created
[ ] PR and release docs linked
[ ] Monday and Friday meetings scheduled
[ ] WIP limits communicated
[ ] Pilot sprint started with scoped Todo column
[ ] First release used Ready For Release → Released columns
```

---

## Test Flows (Verify Rollout)

Run these once after setup and again after the first sprint.

**Flow A — Happy path task**

1. Create a small P2 Feature in Backlog.
2. Move to Todo with full template and owner + reviewer.
3. Move to In Progress; open a PR; move to In Review.
4. Complete review checklist; merge; move to Testing.
5. Sign off on staging; move to Ready For Release.
6. Deploy; move to Released; then Archived.

**Flow B — Urgent bug**

1. Create P0 Bug; skip deep Backlog grooming.
2. Assign owner immediately; allow WIP exception if needed.
3. Fast-path through In Review with abbreviated checklist only if production is down (document in card).
4. Release approver confirms deploy before Released.

**Flow C — Blocked task**

1. Task in In Progress; add blocker in Dependencies / comment.
2. Move back to Todo or leave in place with clear blocker label (team choice — document in team README).
3. Monday meeting surfaces blocker; Friday meeting confirms resolution or slip.

**Flow D — Meeting discipline**

1. Monday: no card moves during meeting except Backlog → Todo and priority changes.
2. Friday: all cards in Released for the week are Archived or left for history per team preference.

---

# Final Goal of This System

The goal is not:
- more management
- more process
- more meetings

The goal is:

- predictable delivery
- lower stress
- higher quality
- better visibility
- scalable teamwork
- sustainable development pace
