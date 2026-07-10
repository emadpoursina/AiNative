# CLAUDE.md template

Copy to a project root as `CLAUDE.md` (Claude Code) or into `.cursor/rules/ai-rules.mdc` (Cursor). Fill in placeholders; keep it short.

See live example: [CLAUDE.md](../../CLAUDE.md) in this repo.

---

```markdown
# [PROJECT_NAME] — AI Rules

## Project Context

- **Type**: [e.g. REST API / Full-stack SaaS / CLI tool]
- **Stack**: [e.g. NestJS · PostgreSQL · Redis · Docker]
- **Repo layout**:
  ```
  src/
  ├── modules/      # NestJS feature modules
  ├── common/       # Shared guards, pipes, interceptors
  └── config/       # Config service and env schema
  ```

---

## Workflow

- Always follow: **PIV — Plan → Implementation → Validation** (Plan + Implementation via specs.md; Validation via critic and tester agents)
- Do not write code until the plan is confirmed if the change touches 2+ files
- For ambiguous tasks: ask, do not guess
- Commit style: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`)

---

## Code Rules

- TypeScript strict mode — no `any`, no implicit types
- Validate all external inputs with Zod
- Never rewrite an entire file to change one function — surgical edits only
- Match existing naming conventions and indentation exactly
- Remove all AI-style comments before finishing (`// This function handles...`)
- Remove unused imports and variables before finalizing

---

## Constraints

- No new external dependencies without explicit approval
- Always output SQL / migration for manual review before suggesting `db push` or `migrate`
- Terminal commands: check mentally before suggesting — no destructive defaults
- Never expose secrets, tokens, or credentials in output

---

## Project-Specific Notes

<!-- Add anything the AI needs to know that is unique to this project -->
<!-- Examples: -->
<!-- - Auth is JWT with refresh token rotation — do not change the token flow -->
<!-- - Multi-tenant: always scope queries by organizationId -->
<!-- - BullMQ queues are defined in src/queues/ — follow the existing processor pattern -->

---

## Out of Scope

<!-- Things the AI should never touch or suggest in this repo -->
<!-- Examples: -->
<!-- - Do not modify the migration files directly -->
<!-- - Do not change the Docker network config -->
```
