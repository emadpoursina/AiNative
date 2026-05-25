# Task Management System

Lightweight task board for small software teams (roughly 2–15 people). Pair with [PR review](./pr-review-system.md) and [release management](./release-management-system.md).

---

## Goals

- Reduce mental overload and context switching
- Make work, blockers, and ownership visible
- Improve delivery predictability without heavy process

---

## Principles

1. **Simplicity** — If a rule annoys the team, remove or shorten it.
2. **Visibility** — Tasks, blockers, priorities, and decisions live on the board (not only in chat).
3. **Finish before starting** — Fewer active items; smaller tasks.

---

## Board

```text
Backlog → Todo → In Progress → In Review → Testing → Ready For Release → Released → Archived
```

| Column | Purpose | Rules |
|---|---|---|
| **Backlog** | Ideas, bugs, requests | Rough is fine; not committed |
| **Todo** | Ready to build | Clear scope, acceptance criteria, owner assigned |
| **In Progress** | Active development | Dev work only; max 1 feature per developer |
| **In Review** | PR open | Self-tested; follow [PR review system](./pr-review-system.md) |
| **Testing** | QA / staging | Manual, regression, or PO sign-off |
| **Ready For Release** | Approved, not deployed | Groups release scope; see [release system](./release-management-system.md) |
| **Released** | In production | Deploy complete |
| **Archived** | History | Move here to reduce clutter |

### WIP limits

```text
- max 1 active feature per developer (In Progress)
- finish or hand off reviews before starting new feature work
- P0 production bugs may interrupt; note exception on the card
```

### Backlog → Todo

Before moving a card: meet the [Tasks](#tasks) standard (template, priority, label, owner + reviewer). Groom rough Backlog items using [AI — Todo-ready grooming](#ai--todo-ready-grooming) or manually.

---

## Tasks

### Template

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

---

## Technical Notes
Optional.

---

## Dependencies
Optional blockers or related tasks.
```

### Good vs bad

| Good | Bad |
|---|---|
| Clear, scoped, testable | Vague, huge, unclear |
| `Add validation when login password is empty` | `Fix login` |

### Priority (use only these four)

| Priority | Meaning |
|---|---|
| P0 | Production issue |
| P1 | Critical feature / blocker |
| P2 | Normal development |
| P3 | Nice-to-have |

### Labels

| Label | Purpose |
|---|---|
| Bug | Existing issue |
| Feature | New functionality |
| Improvement | Enhancement |
| Refactor | Cleanup |
| Release Blocker | Must ship before release |
| Tech Debt | Maintenance |

### Ownership

- One **owner** and one **reviewer** per task
- No shared or unnamed ownership

### AI — Todo-ready grooming

Use when a Backlog card is rough and you want it ready for **Todo**. Read [template](#template), [good vs bad](#good-vs-bad), [priority](#priority-use-only-these-four), and [labels](#labels) first — then run this prompt.

AI drafts; you fix assumptions, assign owner + reviewer, then move to Todo. Replace `ALL_CAPS` placeholders. Do not invent requirements.

**Prompt:**

```text
You are helping groom a task board. Do not invent product requirements.

INPUT — rough Backlog card:
"""
PASTE_ROUGH_CARD_TEXT
"""

OPTIONAL CONTEXT (stack, repo, constraints):
"""
PASTE_OR_DELETE
"""

OUTPUT:

1. Say if this card is too large. If yes, split into 2–4 smaller cards (title + one-line scope each).

2. For each card that can move to Todo, fill this template exactly:

## Problem
...

## Expected Result
...

## Platform
- (check only what applies)

## Acceptance Criteria
- [ ] measurable criterion
- [ ] ...

## Technical Notes
(only if inferred from input; otherwise "TBD in planning")

## Dependencies
(only if known)

3. For each card recommend:
   - Priority: P0 | P1 | P2 | P3 (use our definitions: P0 production, P1 critical/blocker, P2 normal, P3 nice-to-have)
   - Label: Bug | Feature | Improvement | Refactor | Release Blocker | Tech Debt
   - Suggested owner/reviewer: leave blank unless names were in INPUT

4. Flag anything still ambiguous as questions for the team (bullet list).

Do not write implementation steps or code. Keep acceptance criteria testable.
```

---

## Related workflows

| Stage on board | Doc |
|---|---|
| **In Review** | [pr-review-system.md](./pr-review-system.md) — when to move a card, review checklists, AI-assisted review |
| **Testing → Released** | [release-management-system.md](./release-management-system.md) — branches, staging, deploy, rollback |

**Column ↔ PR (summary)**

```text
PR opened   → In Review
Merged      → Testing (or Ready For Release if no separate QA)
Deployed    → Released (release approver)
```

---

## Meetings

### Monday — planning (30–45 min)

- What must finish this week?
- What is blocked or highest risk?
- What should we *not* start?
- Groom [Backlog → Todo](#backlog--todo) ([task standard](#tasks)); assign owners

No deep debugging or architecture debates.

#### AI — Monday planning prep (async)

Run day before or morning of the meeting. AI drafts; team confirms in the meeting. Replace `ALL_CAPS` placeholders.

**Prompt:**

```text
You are preparing a Monday planning meeting for a small engineering team.

CONSTRAINTS:
- Max 1 active feature per developer in In Progress
- Todo cards need owner, reviewer, and acceptance criteria before work starts
- No deep technical design in this meeting

TEAM:
- Developers: LIST_NAMES_AND_ROLES
- Already in Todo: PASTE_TITLES_OR_EMPTY
- Already in In Progress: PASTE_TITLES_OR_EMPTY
- In Review / Testing (carryover): PASTE_TITLES_OR_EMPTY

BACKLOG CANDIDATES (title + priority if known + one line each):
"""
PASTE_BACKLOG_ITEMS
"""

KNOWN BLOCKERS / P0 / RELEASE DEADLINE:
"""
PASTE_OR_NONE
"""

OUTPUT:

1. Recommend up to N cards to move Backlog → Todo this week (N = number of developers × 1 feature, minus items already in Todo/In Progress). Rank by impact and risk.

2. For each recommended card: one sentence why now, and what must be clarified before Todo.

3. "Do not start" list — work that should stay in Backlog or be deprioritized.

4. Top 3 risks for the week (delivery, blockers, review bottleneck).

5. Suggested 30–45 min agenda (time boxes in minutes).

Do not assign people unless names were provided. Flag if WIP would be exceeded.
```

After AI: confirm shortlist in the meeting; run [Todo-ready grooming](#ai--todo-ready-grooming) on any card still rough.

### Friday — delivery (30–45 min)

- What shipped? What slipped? Why?
- Move done cards to Released / Archived
- What is Ready For Release for the next deploy?

#### AI — Friday meeting prep (async)

Run day before or morning of the meeting. AI drafts; team validates in the meeting.

**Prompt:**

```text
You are preparing a Friday delivery review for a small engineering team.

BOARD SNAPSHOT — paste titles and column per line, e.g. "In Progress | Fix login validation":

"""
PASTE_COLUMN_AND_TITLE_LIST
"""

OPTIONAL — cards moved to Released this week:
"""
PASTE_OR_EMPTY
"""

OPTIONAL — Ready For Release queue:
"""
PASTE_OR_EMPTY
"""

OPTIONAL — notes from the week (blockers, slips, decisions):
"""
PASTE_OR_EMPTY
"""

OUTPUT:

1. Shipped — bullet list (Released / done this week) with one-line outcome each.

2. Slipped — cards that did not reach expected column; plausible reason (scope, blocker, review, testing) — mark guesses as guesses.

3. Still active — In Progress / In Review / Testing that rolls into next week; flag WIP or review risk.

4. Ready For Release — what is queued for deploy; anything missing for release approver (tests, staging, notes).

5. Suggested talking points for Friday (5–7 bullets): what shipped, what slipped, why, what needs a decision, what to archive.

6. Draft changelog bullets (Added / Fixed / Changed) only from shipped items — no invention.

Keep it factual. If data is missing, say what to paste next time.
```

After AI: validate in the meeting; move cards; confirm deploy per [release system](./release-management-system.md).

---

## Team documentation

Each team keeps [`docs/teams/<team-name>/README.md`](../teams/README.md) with stack, board link, meeting schedule, release approver, and links to the three system docs.

Also maintain: setup guide, deploy guide, architecture notes, recurring fixes.

---

## New team rollout

Record team-specific choices in [`docs/teams/<team-name>/README.md`](../teams/README.md). Universal rules stay here.

**Day 0 — setup (~2–3 hours)**

1. **Roles** — Process owner (board + meetings), default reviewer, release approver (can be same person).
2. **Board** — Create the 8 columns above; add P0–P3 and core labels; paste the task template as the default card body.
3. **WIP** — In Progress: 1 feature per developer; P0 exception documented in team README.
4. **Team README** — Stack, repos, board URL, meetings, release approver; link [PR](./pr-review-system.md) and [release](./release-management-system.md) docs.
5. **Rules** — Todo needs owner, reviewer, acceptance criteria; tasks before long chat threads; decisions in card comments.

**Column transitions**

| Transition | Rule |
|---|---|
| Backlog → Todo | Prioritized; groomed ([AI](#ai--todo-ready-grooming) or manual); acceptance criteria written |
| Todo → In Progress | Owner starts; respect WIP |
| In Progress → In Review | PR opened; [PR review](./pr-review-system.md) pre-move checks done |
| In Review → Testing | PR approved and merged per release doc |
| Testing → Ready For Release | QA / staging sign-off |
| Ready For Release → Released | Production deploy per [release system](./release-management-system.md) |
| Released → Archived | After sprint close or release notes |

**Week 1**

- Schedule Monday planning and Friday delivery (agendas above).
- First Monday: walk columns + WIP; groom week’s Todo; assign owners.
- First Friday: archive done work; review slips; confirm Ready For Release queue.
- Pilot: few Todo items; template on every card; daily card updates + PR link on card.

**Week 2+**

- Process owner mid-week check: wrong column, missing owner, overloaded In Progress.
- Retrospect: shorten one rule at a time if friction appears.
- New member: read team README + this doc; board access; shadow one Monday/Friday; one P2 task end-to-end with buddy.

**Checklist (copy to team README)**

```text
[ ] 8 columns, P0–P3, core labels, task template
[ ] docs/teams/<team-name>/README.md
[ ] PR + release docs linked
[ ] Monday + Friday scheduled; WIP communicated
[ ] Pilot sprint; first release used Ready For Release → Released
```

### Test flows

**A — Happy path** — P2 Feature: Backlog → Todo (template + owner) → In Progress → PR → In Review → merge → Testing → Ready For Release → deploy → Released → Archived.

**B — P0 bug** — Assign immediately; WIP exception if needed; fast review per [PR doc](./pr-review-system.md); release approver before Released.

**C — Blocked** — Note in Dependencies; surface on Monday; resolve or slip by Friday.

**D — Meetings** — Monday: Backlog → Todo and priorities only. Friday: archive week’s Released cards per team preference.

---

## Outcome

Predictable delivery, visible work, and sustainable pace — not more meetings or bureaucracy for its own sake.
