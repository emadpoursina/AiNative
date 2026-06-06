# Task grooming prompts

Copy-paste prompts for backlog grooming and meeting prep. Workflow context: [task-management-system.md](../systems/task-management-system.md).

---

## Todo-ready grooming

Use when a Backlog card is rough and you want it ready for **Todo**. Replace `ALL_CAPS` placeholders. Do not invent requirements.

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

## Monday planning prep

Run day before or morning of the meeting. Replace `ALL_CAPS` placeholders.

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

---

## Friday delivery prep

Run day before or morning of the meeting.

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
