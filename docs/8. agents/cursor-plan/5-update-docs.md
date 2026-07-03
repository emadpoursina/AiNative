# Phase 5 — Update Docs

> **Role:** Coordinator — documentation only. No code changes.
> **Goal:** Keep docs, comments, and changelogs in sync with what shipped.

---

## Instructions for Cursor

You are in the **Update Docs Phase**. The feature is implemented and verified. Your job is to update all documentation so the next engineer (or your future self) understands what changed and why.

<task>
FEATURE: [SAME AS PHASE 1]
</task>

<context>
Reference changed files: @path/to/changed/files
Reference synthesis plan: @docs/8. agents/cursor-plan/2-synthesis.md output
</context>

---

## What to update

### 1. CLAUDE.md / README.md

```
Referencing docs/8. agents/cursor-plan/5-update-docs.md, update the repo CLAUDE.md to reflect this feature.

Add or update:
- Any new environment variables introduced
- Any new npm scripts
- Any new module or architectural pattern added
- Any new external service or dependency

Keep it short. CLAUDE.md is for AI context, not a tutorial.
```

---

### 2. Inline code comments

```
Referencing docs/8. agents/cursor-plan/5-update-docs.md, add or update inline comments for the changed code.

Rules:
- Comment the WHY, not the WHAT
- Flag any non-obvious business logic with a one-line explanation
- Mark any temporary workarounds with TODO: [reason]
- Do not add comments to self-explanatory code

Files: @path/to/file.ts
```

---

### 3. Changelog entry

```
Referencing docs/8. agents/cursor-plan/5-update-docs.md, write a changelog entry for this feature.

Format:
## [Unreleased]

### Added
- [what was added and why it matters to the user or developer]

### Changed
- [what existing behavior changed]

### Fixed
- [any bugs fixed as part of this work]

Keep each bullet to one sentence. No implementation details.
```

---

### 4. Commit message

```
Referencing docs/8. agents/cursor-plan/5-update-docs.md, write the final commit message for this feature.

Follow Conventional Commits:
- Type: feat / fix / refactor / test / docs / chore
- Scope: the module or area changed (e.g. auth, tasks, billing)
- Subject: imperative, lowercase, no period, max 72 chars
- Body (optional): what changed and why, not how

Example:
feat(auth): add role-based access control to task endpoints

Guards all task routes by org membership. Roles: owner, admin, member.
Introduces RolesGuard and @Roles() decorator. Migration adds role column to org_members.
```

---

<constraints>
- Do not document implementation details that are already clear from the code
- Do not update docs for files that were not changed
- CLAUDE.md changes must stay concise — it is read by AI on every session
</constraints>
