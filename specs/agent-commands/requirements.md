# Requirements Document

## Introduction

This feature adds a Cursor command for each agent defined in `docs/8. agents/`, so any agent can be invoked directly from a project via a slash command (e.g. `/critic`, `/tester`). Today only the specsmd flow has a command (`/specsmd-agent`); the workflow agents must be loaded manually by pointing the model at their `agent.md`. Per-agent commands make agents discoverable, consistent, and portable across projects that share this repo's `docs/` and `.cursor/` layout.

The `specs-planner` agent is excluded — specs.md is a self-contained framework that registers its own command on initialization, so this feature must not create a command for it.

## Glossary

- **Agent**: A per-task AI role defined as a folder under `docs/8. agents/` containing `agent.md`, `skill.md`, and `rule.md`. The five in-scope agents are: `critic`, `tester`, `pr-reviewer`, `task-groomer`, `project-bootstrapper`. The `specs-planner` agent is out of scope because the specs.md framework ships its own command.
- **Cursor Command**: A markdown file under `.cursor/commands/` that Cursor exposes as a slash command. It tells the model what context to load and how to behave when the command is invoked.
- **Agent Command**: A Cursor Command whose purpose is to activate a specific Agent and route user arguments to it.
- **Agent File Contract**: The three required files per agent — `agent.md` (purpose, triggers, I/O), `skill.md` (inline skills), `rule.md` (constraints and stop conditions).
- **Command Payload**: The user text supplied after the slash command (e.g. `/critic review the auth plan` → payload "review the auth plan").
- **Invocation**: The act of running a slash command in Cursor, which injects the command file's instructions plus any payload into the model.

## Requirements

### Requirement 1: One command per agent

**User Story:** As a developer, I want a slash command for each agent in `docs/8. agents/`, so that I can activate any agent without manually pointing the model at its files.

#### Acceptance Criteria

1. WHEN the feature is complete, THE repository SHALL contain one Cursor Command file in `.cursor/commands/` for each of the five in-scope agents: `critic`, `tester`, `pr-reviewer`, `task-groomer`, `project-bootstrapper`.
2. WHEN a new agent folder is added under `docs/8. agents/`, THE repository SHALL be able to gain a matching command by following the documented convention (one command file per agent folder), unless the agent is owned by a framework that registers its own command (e.g. specs.md / `specs-planner`).
3. THE command filename SHALL match the agent folder name (e.g. agent `critic` → `.cursor/commands/critic.md`) for predictable invocation.

### Requirement 2: Context loading

**User Story:** As a developer, when I invoke an agent command, I want the model to automatically load that agent's definition, skills, and rules, so that the agent behaves the same as if I had pointed at the files manually.

#### Acceptance Criteria

1. WHEN an agent command is invoked, THE command instructions SHALL direct the model to read the agent's `agent.md` first (purpose, triggers, inputs/outputs).
2. WHILE activating the agent, THE command instructions SHALL also direct the model to read the agent's `skill.md` and `rule.md` from the same agent folder.
3. THE command instructions SHALL reference agent files by their canonical path under `docs/8. agents/<agent-name>/`, not by copying file contents into the command.

### Requirement 3: Argument routing

**User Story:** As a developer, I want to pass a task or question to an agent right after the slash command, so that the agent can act on it immediately.

#### Acceptance Criteria

1. WHEN a payload is supplied after the command (e.g. `/critic review the plan`), THE command SHALL pass that payload to the agent as the task input.
2. WHEN no payload is supplied, THE command SHALL instruct the agent to determine intent from its own activation triggers and prompt the user only if needed.
3. THE command SHALL use the standard `$ARGUMENTS` placeholder (consistent with the existing `specsmd-agent.md` command) for payload forwarding.

### Requirement 4: Behavioral consistency with existing command

**User Story:** As a developer, I want agent commands to follow the same structure as the existing `/specsmd-agent` command, so that they feel uniform and are easy to maintain.

#### Acceptance Criteria

1. THE each agent command file SHALL follow the same structural sections as `.cursor/commands/specsmd-agent.md`: Command Definition (yaml), Invocation steps, and Usage Examples.
2. THE command `description` field SHALL state the agent's one-line purpose so commands are identifiable in Cursor's command picker.
3. WHEN invoked, THE command SHALL NOT redefine the agent's behavior; it SHALL defer behavior to the loaded `agent.md` and `rule.md`.

### Requirement 5: Discoverability and documentation

**User Story:** As a developer, I want to see which agent commands exist and how to use them, so that I can pick the right agent for the job.

#### Acceptance Criteria

1. WHEN the feature is complete, THE `docs/8. agents/README.md` agents table SHALL reference each agent's slash command alongside its purpose.
2. THE each command file SHALL include at least two usage examples showing a no-argument invocation and a payload invocation.
3. WHERE an agent has a multi-step workflow (e.g. critic, pr-reviewer), THE command usage examples SHALL reflect the documented phases from that agent's folder.
4. WHEN the feature is complete, THE `docs/8. agents/README.md` "Add a new agent" steps SHALL include a step directing the author to create a matching Cursor Command in `.cursor/commands/`, so the convention is self-documenting for future agents.
5. WHEN the feature is complete, THE `docs/8. agents/template/` folder SHALL note (in `agent.md` or an accompanying file) that a new agent should be paired with a Cursor Command unless owned by a framework that ships its own.

### Requirement 6: Non-destructive addition

**User Story:** As a developer, I want the new commands added without altering existing agent behavior or the existing `specsmd-agent` command, so that current workflows keep working.

#### Acceptance Criteria

1. THE feature SHALL NOT modify any file under `docs/8. agents/<agent-name>/` for the five in-scope agents (the agents themselves remain the source of truth). Updates to `docs/8. agents/README.md` and `docs/8. agents/template/` for discoverability/convention are permitted.
2. THE feature SHALL NOT modify `.cursor/commands/specsmd-agent.md` and SHALL NOT create a command for the `specs-planner` agent (specs.md framework owns its command).
3. THE feature SHALL only add new files under `.cursor/commands/` and update `docs/8. agents/README.md` plus `docs/8. agents/template/` for the command convention.
