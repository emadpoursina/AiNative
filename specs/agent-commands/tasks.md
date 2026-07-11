# Implementation Plan

- [x] 1. Create agent command files
  - [x] 1.1 Create `.cursor/commands/critic.md`
    - Use the design's command skeleton; `name: critic`, description from `docs/8. agents/critic/agent.md` first paragraph
    - Invocation: read `agent.md` → `skill.md` → `rule.md` under `docs/8. agents/critic/`; forward `$ARGUMENTS`; no-payload fallback to critic's "When to use" triggers
    - Two usage examples: `/critic review the plan` (payload) and `/critic` (no payload)
    - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.2, 5.3_
  - [x] 1.2 Create `.cursor/commands/tester.md`
    - Same skeleton; `name: tester`; description from tester `agent.md`
    - Usage examples reflect tester's unit/system sub-role phases from `skill.md`
    - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.2, 5.3_
  - [x] 1.3 Create `.cursor/commands/pr-reviewer.md`
    - Same skeleton; `name: pr-reviewer`; description from pr-reviewer `agent.md`
    - Usage examples reflect pr-reviewer's staged review phases from `skill.md`
    - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.2, 5.3_
  - [x] 1.4 Create `.cursor/commands/task-groomer.md`
    - Same skeleton; `name: task-groomer`; description from task-groomer `agent.md`
    - Usage examples: `/task-groomer Monday` and `/task-groomer` (no payload)
    - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.2_
  - [x] 1.5 Create `.cursor/commands/project-bootstrapper.md`
    - Same skeleton; `name: project-bootstrapper`; description from project-bootstrapper `agent.md`
    - Usage examples: `/project-bootstrapper <spec doc>` and `/project-bootstrapper` (no payload)
    - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.2_

- [x] 2. Checkpoint - Verify command files conform to schema
  - Confirm each of the five files has Command Definition (yaml `name` + `description`), Invocation, and Usage Examples sections
  - Confirm each `name` equals its filename stem and matches the agent folder name
  - Confirm each `loadContext` references resolve to existing files under `docs/8. agents/<agent-name>/`
  - Confirm `.cursor/commands/specsmd-agent.md` is unchanged and no `specs-planner.md` was created
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 4.1, 4.2, 6.1, 6.2_

- [x] 3. Update agent convention docs
  - [x] 3.1 Update `docs/8. agents/README.md`
    - Add a `Command` column to the Agents table referencing each agent's slash command (`/critic`, `/tester`, `/pr-reviewer`, `/task-groomer`, `/project-bootstrapper`); mark `specs-planner` as framework-owned (specs.md)
    - Insert a new step in "Add a new agent" (after "Register the agent in this README table") directing authors to create `.cursor/commands/<agent-name>.md` using an existing command as a template, unless the agent is owned by a framework that ships its own command
    - _Requirements: 5.1, 5.4_
  - [x] 3.2 Update `docs/8. agents/template/agent.md`
    - Append a short section noting a new agent should be paired with a Cursor Command under `.cursor/commands/`, unless owned by a framework that registers its own command (e.g. specs.md / `specs-planner`)
    - _Requirements: 5.5_

- [x] 4. Add parity check script
  - [x] 4.1 Create `scripts/check-agent-commands.sh`
    - Iterate `docs/8. agents/` directories excluding `template` and `_skills`
    - For each, expect `.cursor/commands/<dir>.md`; skip allowlist `frameworkOwned=("specs-planner")`
    - Print missing commands and orphan commands; exit non-zero on any mismatch
    - Make executable (`chmod +x`)
    - _Requirements: 1.2, 6.1, 6.3_

- [x] 5. Final Checkpoint - Full verification
  - Run `scripts/check-agent-commands.sh` and confirm zero missing/orphan commands (excluding `specs-planner`)
  - Re-verify all six requirements have at least one covering task (traceability matrix below)
  - Spot-check one command end-to-end: open `/critic` in Cursor and confirm it loads `agent.md` + `skill.md` + `rule.md`
  - Confirm no files under `docs/8. agents/<agent-name>/` were modified (agents remain source of truth)
  - _Requirements: 1.1, 1.2, 2.1, 3.1, 4.1, 5.1, 5.4, 5.5, 6.1, 6.2, 6.3_

## Traceability Matrix

| Requirement | Covering Tasks |
|-------------|----------------|
| 1.1 one command per agent (five) | 1.1–1.5, 2, 5 |
| 1.2 convention for new agents | 3.1, 4.1, 5 |
| 1.3 filename matches folder | 1.1–1.5, 2 |
| 2.1 read agent.md first | 1.1–1.5, 2 |
| 2.2 read skill.md + rule.md | 1.1–1.5, 2 |
| 2.3 reference by path, no copy | 1.1–1.5, 2 |
| 3.1 forward payload | 1.1–1.5 |
| 3.2 no-payload fallback | 1.1–1.5 |
| 3.3 use `$ARGUMENTS` | 1.1–1.5 |
| 4.1 same sections as specsmd-agent | 2 |
| 4.2 description states purpose | 1.1–1.5, 2 |
| 4.3 defer behavior to agent files | 1.1–1.5 |
| 5.1 README table references command | 3.1, 5 |
| 5.2 two usage examples each | 1.1–1.5 |
| 5.3 multi-phase examples | 1.1, 1.2, 1.3 |
| 5.4 README "Add a new agent" step | 3.1, 5 |
| 5.5 template note | 3.2, 5 |
| 6.1 no agent-folder edits | 2, 5 |
| 6.2 no specsmd-agent / no specs-planner command | 2, 5 |
| 6.3 only additions + README/template | 2, 4.1, 5 |
