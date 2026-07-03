# Skills — Cursor plan agent

Skills copied inline for self-contained use. Re-sync from `_skills/` when the library updates.

---

## Research first

<!-- source: _skills/research-first.md -->

Do not write code or propose solutions until the codebase is understood.

**When to use:** Starting a non-trivial feature; task touches 2+ files; requirements are ambiguous.

**Behavior:**
1. Scan entry points and related files — reference exact paths, functions, line ranges
2. List modules affected, database impact, integration points, existing tests
3. Identify risk areas (auth, multi-tenancy, data integrity, breaking changes)
4. Flag open questions that block planning
5. Do not propose solutions or write code

**Output:** Structured research report — files in scope, modules affected, database impact, patterns to follow, integration points, test coverage, risk areas, open questions.

**Phase file:** [1-research.md](./1-research.md)

---

## Planning gate

<!-- source: _skills/planning-gate.md -->

Enforce research and plan approval before multi-file implementation.

**When to use:** Any task touching 2+ files. Single-file and typo/config fixes exempt.

**Behavior:**
1. Run Phase 1 research — present report, wait for confirmation
2. Run Phase 2 synthesis — present plan, wait for explicit approval
3. Only then implement, one step at a time
4. If ambiguous, ask one clarifying question before research

**Phase files:** [1-research.md](./1-research.md), [2-synthesis.md](./2-synthesis.md), [3-implementation.md](./3-implementation.md)

---

## Verification

<!-- source: _skills/verification.md -->

Find what breaks before staging. Run passes separately.

| Pass | Focus |
|------|-------|
| A — Correctness | Behavior matches plan, test flows, edge cases, Zod, TS errors |
| B — Security | Auth guards, multi-tenant isolation, JWT/session, validation, secrets |
| C — Reliability | Error handling, transactions, silent failures, idempotency |
| D — Adversarial | Hidden assumptions, race conditions, concurrency, maintenance traps |

**Phase file:** [4-verification.md](./4-verification.md)

---

## Conventional Commits

<!-- source: _skills/conventional-commits.md -->

Short structured commit messages. One commit per complete file set.

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`. Agent drafts; human commits.

**Used in:** [2-synthesis.md](./2-synthesis.md) commit plan, [5-update-docs.md](./5-update-docs.md) final message.

---

## Doc update after work

<!-- source: _skills/doc-update-after-work.md -->

Keep docs, comments, and changelogs in sync after shipping.

Update: CLAUDE.md/README (concise), inline WHY-comments, changelog (Added/Changed/Fixed), commit message.

**Phase file:** [5-update-docs.md](./5-update-docs.md)

---

## Mermaid diagrams

<!-- source: _skills/mermaid-diagrams.md -->

Use in synthesis plans for architecture, data flows, or phase transitions. No spaces in node IDs; no HTML or explicit colors; wrap special-character labels in quotes.

**Used in:** [2-synthesis.md](./2-synthesis.md) when execution order is complex.
