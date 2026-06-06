# Engineering Operating System

A personal knowledge system for developers transitioning into technical operator and engineering lead roles. This document describes the full structure, the reasoning behind each layer, and the rituals that keep it alive.

---

## What this is

This is not a second brain. It is not a productivity system. It is an **engineering operating system** — a structured repository of knowledge, decisions, and operational patterns that compounds over time.

The goal is to reduce the cognitive overhead of repeated work, preserve the knowledge that normally evaporates after a bug is fixed or a decision is made, and give you fast retrieval under pressure.

It works inside Git. It requires no external tools. It stays alive through three weekly rituals, not through discipline alone.

---

## Repository structure

```text
AiNative/
├── README.md
├── .cursor/rules/
│
└── docs/
    ├── README.md
    │
    ├── systems/                       # Universal workflows — stable, rarely changes
    │   ├── task-management-system.md
    │   ├── pr-review-system.md
    │   └── release-management-system.md
    │
    ├── ai-workflows/                  # Reusable AI prompts — extracted and versioned
    │   ├── README.md
    │   ├── coordinator-worker.md
    │   ├── pr-review-prompts.md
    │   ├── task-grooming-prompts.md
    │   └── cursor-rules.md
    │
    ├── reference/                     # Evergreen technical knowledge — updated in place
    │   ├── README.md
    │   ├── setup/
    │   │   ├── new-project.md
    │   │   ├── cursor-setup.md
    │   │   └── server-setup.md
    │   ├── commands/
    │   │   ├── linux.md
    │   │   ├── git.md
    │   │   ├── docker.md
    │   │   ├── postgres.md
    │   │   ├── mongodb.md
    │   │   ├── nginx.md
    │   │   └── tmux.md
    │   ├── architecture/
    │   │   ├── backend-patterns.md
    │   │   ├── database-patterns.md
    │   │   └── infra-patterns.md
    │   ├── backup-system.md
    │   └── tools.md
    │
    ├── debugging/                     # Bug pattern library — append-only, grows over time
    │   ├── README.md
    │   ├── template.md
    │   ├── postgres/
    │   ├── docker/
    │   ├── nginx/
    │   ├── auth/
    │   └── desktop/
    │
    ├── snippets/                      # Copy-paste patterns — no prose, just working code
    │   ├── sql/
    │   ├── docker-compose/
    │   ├── nginx-configs/
    │   ├── bash-scripts/
    │   └── php/
    │
    ├── decisions/                     # Architecture Decision Records — dated, append-only
    │   ├── README.md
    │   ├── template.md
    │   └── YYYY-MM-title.md
    │
    ├── postmortems/                   # Incident reviews — dated, append-only
    │   ├── README.md
    │   ├── template.md
    │   └── YYYY-MM-DD-title.md
    │
    └── teams/                         # Per-team overrides only
        └── <team-name>/README.md

scratch/                               # Gitignored — raw capture, no quality bar
└── .gitignore
```

---

## The five layers

### Layer 1 — Systems (`docs/systems/`)

**What it holds:** Universal operational workflows. How to run a release. How to review a PR. How to manage a task board.

**Why it exists:** These are the processes you repeat on every team. Writing them once and running them everywhere eliminates reinvention and gives you a baseline to iterate on rather than a blank page every time.

**How it compounds:** Each time you run a workflow and notice friction, you update the system doc. Over time the docs become refined by real use, not theoretical best practice. When you join a new team, you bring a proven playbook rather than starting from scratch.

**Rule:** These docs change rarely. If you are editing them frequently, they have become operational notes, which belong elsewhere.

---

### Layer 2 — AI Workflows (`docs/ai-workflows/`)

**What it holds:** Standalone, versioned AI prompts. The coordinator-worker development pattern. PR review phases. Task grooming. Cursor rules templates.

**Why it exists:** AI prompts buried inside system documents are hard to find and impossible to reuse across contexts. Extracting them into their own folder gives them a canonical location you can reference from Cursor rules, paste into any tool, and improve independently of the workflow doc they originally came from.

**How it compounds:** This becomes your prompt library. Every time you write a prompt that works well — for release notes, architecture review, onboarding docs, debugging assistance — you add it here. Over time it encodes your thinking patterns in a reusable form. It is the most leveraged folder in the repo.

**Rule:** Each file in this folder is a standalone prompt or prompt system. No prose explanations mixed in — those belong in `systems/`.

---

### Layer 3 — Reference (`docs/reference/`)

**What it holds:** Evergreen technical knowledge organized by domain. Commands for every tool you use. Setup guides for projects and servers. Architecture patterns for backend, database, and infrastructure work.

**Why it exists:** During an incident or a late-night deploy you need one thing: the exact command, fast. A single flat file does not scale. Domain folders give you a three-second mental path to any piece of information: `reference/commands/postgres.md` for Postgres, `reference/commands/nginx.md` for Nginx.

The `architecture/` subfolder is where you move from "I know commands" to "I know patterns." It holds opinionated notes about backend patterns, database design choices, and infrastructure decisions — updated as your views evolve. This is how senior technical knowledge compounds.

**How it compounds:** Every time you learn a command you have had to look up three times, you add it. Every time you discover a pattern that works reliably, you add it. The reference layer grows slowly and stays trustworthy because it only contains things that have been tested in production.

**Rule:** Reference docs have no dates. They are updated in place. If information is time-sensitive or context-specific, it does not belong here.

---

### Layer 4 — Debugging (`docs/debugging/`)

**What it holds:** A library of bugs you have solved, organized by domain. Each entry records the symptom, the root cause, the fix, and what would have caught it earlier.

**Why it exists:** This is the highest-leverage layer for engineering growth. The difference between a mid-level and a senior engineer is not raw ability — it is pattern recognition built from accumulated, organized experience. Without a system, every hard bug you solve leaves your head within a week. With this layer, every solved bug becomes a permanent asset.

**How it compounds:** After six months, you stop re-solving problems. After a year, you recognize incident patterns before they escalate. You can say "I have seen this before" and point to evidence. This is what debugging speed actually looks like at a senior level.

**Rule:** Write the note immediately after solving the bug, while the context is fresh. A note written a week later is worth 20% of one written the same day. Each domain folder is a single growing file or small collection of files — never overwrite, only append.

**Template:**

```md
## [Short title of the bug]

**Date:** YYYY-MM-DD
**Domain:** postgres / docker / nginx / auth / desktop

### Symptom
What you saw. Exact error messages if available.

### Root cause
What was actually wrong.

### Fix
What resolved it.

### How to detect early
What would have caught this sooner.

### Related patterns
Links to similar issues or decisions.
```

---

### Layer 5 — Snippets (`docs/snippets/`)

**What it holds:** Working, copy-pasteable code patterns. Docker Compose files. Nginx configs. SQL queries. Bash scripts. No prose explanations.

**Why it exists:** Reference documents explain how things work. Snippets are ready to use. Keeping them separate means you never confuse "reading to understand" with "copying to deploy." A snippet file opens, you copy, you close.

**How it compounds:** Every time you write a configuration or script that works and that you will need again, it goes here. Over time this becomes a personal template library that eliminates setup time on new projects.

**Rule:** No prose in snippet files. A one-line comment above a block is acceptable. Full explanations belong in `reference/`.

---

### Layer 6 — Decisions (`docs/decisions/`)

**What it holds:** Architecture Decision Records. One file per significant technical decision. Dated. Append-only.

**Why it exists:** Architectural decisions made without a record leave no trace of their reasoning. Six months later, when someone asks "why did we use PostgreSQL instead of MongoDB?" or "why is this service structured this way?", the answer is either a long explanation or a shrug. An ADR takes fifteen minutes to write and prevents that conversation from happening repeatedly.

**How it compounds:** The decisions folder becomes institutional memory. It protects you from re-litigating settled debates, helps new team members understand the codebase without interrogating you, and forces clarity at the moment of decision — which itself improves the quality of decisions.

**Rule:** One file per decision. Files are dated and never modified after the fact. If a decision is reversed, a new ADR is written that references the original.

**Template:**

```md
# ADR-NNN: [Title]

**Date:** YYYY-MM-DD
**Status:** Accepted / Deprecated / Superseded by ADR-NNN

## Context
What was the situation that required a decision. What constraints existed.

## Decision
What we decided.

## Consequences
What this enables. What trade-offs we accepted. What becomes harder.

## Rejected alternatives
What we considered and why we said no.
```

---

### Layer 7 — Postmortems (`docs/postmortems/`)

**What it holds:** Incident reviews for production failures. One file per incident. Dated. Append-only.

**Why it exists:** The real cost of a production incident is not the downtime — it is the lost knowledge about why it happened, what the early warning signs were, and what would have prevented it. A postmortem captures this in a way that a closed ticket and a Git commit never do.

**How it compounds:** After a handful of postmortems, patterns emerge. You start recognizing the shape of incidents before they escalate. You have a concrete answer when someone asks "has this happened before?" You build a track record of operational reliability that is visible and auditable.

**Rule:** Write the postmortem before you close the incident ticket. Even two paragraphs is better than nothing. The template below takes fifteen minutes to fill in.

**Template:**

```md
# YYYY-MM-DD: [What broke]

**Severity:** P0 / P1 / P2
**Duration:** X hours
**Services affected:** ...

## Timeline
- HH:MM — first symptom observed
- HH:MM — investigation started
- HH:MM — root cause identified
- HH:MM — fix deployed
- HH:MM — confirmed resolved

## Root cause
...

## What we did to fix it
...

## What would have prevented it
...

## Follow-up tasks
- [ ] ...
```

---

### Layer 8 — Teams (`docs/teams/`)

**What it holds:** Per-team overrides only. Stack, repos, board tool, meeting schedule, release approver, adapted checklists.

**Why it exists:** The `systems/` layer is universal. The `teams/` layer holds everything that differs per context — the board URL for this team, the branch naming convention for this project, the person who approves production releases here. Universal rules stay in `systems/`; local quirks go here.

**Rule:** If you are writing something in a team README that should apply to all teams, it belongs in `systems/` instead.

---

### Scratch (`scratch/`)

**What it holds:** Raw capture. Meeting notes, pasted error logs, half-formed ideas, anything that happens during work.

**Why it exists:** Most knowledge systems fail because people try to write final-quality notes during raw work. The friction is too high and nothing gets written. Scratch has no quality bar. Write badly. The goal is to not lose the information, not to organize it immediately.

**Rule:** Add `scratch/` to `.gitignore`. Nothing in scratch is retrieved directly — it only exists as a source to promote into real docs. Every Friday, spend ten minutes reviewing scratch and either promoting valuable content to the right layer or deleting it.

---

## Retrieval by mental path

The structure is designed so retrieval requires no search. The folder names are the retrieval system.

| When you need... | Go to... |
|---|---|
| A specific command | `reference/commands/<tool>.md` |
| Project or server setup | `reference/setup/` |
| An architecture pattern | `reference/architecture/` |
| A bug you have seen before | `debugging/<domain>/` |
| A working config or script | `snippets/<type>/` |
| Why a decision was made | `decisions/` |
| What broke and why | `postmortems/` |
| How to run a release | `systems/release-management-system.md` |
| A PR review prompt | `ai-workflows/pr-review-prompts.md` |
| How to run a planning meeting | `systems/task-management-system.md` |
| This team's board and approvers | `teams/<team-name>/README.md` |

If you find yourself searching instead of navigating, a document is in the wrong place.

---

## The three rituals

The system does not stay alive through organization alone. It stays alive through three short rituals.

### Ritual 1 — Capture during work (zero friction)

During active work, write in `scratch/`. Write badly. One file per day or per topic. The only goal is to not lose the information.

When you solve a hard bug, stop for ten minutes and write the debug note immediately. Context degrades fast — a note written the same day is worth ten written a week later.

### Ritual 2 — Friday review (15 minutes)

Every Friday, open `scratch/` and do three things:

1. Promote anything valuable to the right layer (`reference/`, `debugging/`, `decisions/`, `postmortems/`, `snippets/`).
2. Update any reference doc that was out of date during the week.
3. Delete everything that does not need to be kept.

This is the entropy prevention ritual. Without it, the system drifts toward a graveyard of stale notes.

### Ritual 3 — After every significant event (10–30 minutes)

Three triggers, each with a specific response:

| Event | Action |
|---|---|
| Solved a hard bug | Write a debug note in `debugging/<domain>/` |
| Made a significant architectural decision | Write an ADR in `decisions/` |
| Production incident | Write a postmortem in `postmortems/` before closing the ticket |

These three responses are what separate a knowledge system that compounds from one that stagnates.

---

## Information entropy prevention

Three rules that do the most work:

**One canonical location per type of information.** Each layer has a contract. `debugging/` only accepts bug patterns. `decisions/` only accepts ADRs. `snippets/` only accepts working code with no prose. When you are not sure where something goes, the answer is `scratch/` followed by a Friday review.

**Promote, do not duplicate.** If you find yourself copying a snippet from one document to another, that is a signal: the snippet belongs in `snippets/` and both documents should link to it. Duplication is how knowledge systems rot.

**Date operational notes, not reference notes.** Files in `reference/` are evergreen — no dates, updated in place. Files in `decisions/` and `postmortems/` are dated and append-only. Debug notes are also append-only. This distinction tells you at a glance whether a note is "current" or "historical record." You never need to wonder whether a reference doc is stale — you just update it.

---

## How each layer maps to engineering growth

| Layer | What it builds |
|---|---|
| `systems/` | Operational reliability and consistency |
| `ai-workflows/` | Thinking leverage and automation |
| `reference/commands/` | Tool fluency and fast recall |
| `reference/architecture/` | Architectural judgment |
| `debugging/` | Pattern recognition and debugging speed |
| `snippets/` | Execution speed on familiar problems |
| `decisions/` | Decision quality and institutional memory |
| `postmortems/` | Incident pattern recognition and production confidence |

The compounding effect is real but takes time. After three months the system starts paying back. After six months it is indispensable. After a year it is the clearest record of how you think and how you build.

---

## Migration from a flat structure

If you are starting from a single large reference document, migrate in this sequence without trying to do everything at once:

**Week 1** — Create the folder structure. Move existing files without changing content. Add `debugging/template.md`, `decisions/template.md`, `postmortems/template.md`. Add `scratch/` with a `.gitignore`.

**Week 2** — Split the large reference file into domain files under `reference/commands/` and `reference/setup/`. Keep the original as a redirect for one week, then delete it.

**Week 3** — Extract AI prompts from system documents into `ai-workflows/`. Update references in the system docs to point to the new location.

**Ongoing** — Write a debug note after every hard bug. Write an ADR after every significant decision. Write a postmortem after every incident. Run the Friday review.

The migration is complete when you never need to search — only navigate.

---

## Core principles

These apply across every document in the system:

1. **Retrieval over storage** — a note you cannot find in under ten seconds does not exist.
2. **Capture now, organize Friday** — friction at capture time kills the system.
3. **Append operational records, update reference records** — the distinction prevents stale data from hiding behind fresh files.
4. **One canonical location** — duplication is how systems become untrustworthy.
5. **The system serves real work** — if a layer adds no value to actual engineering, remove it.

---

*This document describes the Engineering Operating System for AiNative. It should be treated as a living document: updated when the structure evolves, referenced when onboarding new contributors, and consulted when the purpose of any layer is unclear.*
