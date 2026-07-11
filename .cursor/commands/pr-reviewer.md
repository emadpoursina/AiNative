# PR Reviewer Command

This file defines the pr-reviewer command, which activates the pr-reviewer agent.

## Command Definition

```yaml
name: pr-reviewer
description: Staged PR review — the final gate after Validation passes
```

## Invocation

When this command is invoked, the agent should:

1. **Load Context**
   - Read `docs/8. agents/pr-reviewer/agent.md` (purpose, when to use, inputs/outputs)
   - Read `docs/8. agents/pr-reviewer/skill.md` (inline skills and prompts)
   - Read `docs/8. agents/pr-reviewer/rule.md` (constraints and stop conditions)

2. **Parse Arguments**
   - `$ARGUMENTS` contains user input after command
   - If empty, determine intent from the agent's "When to use" triggers; prompt the user only if needed

3. **Activate Agent**
   - Adopt the persona and constraints from the loaded files
   - Treat `$ARGUMENTS` as the task input
   - Do not redefine behavior already specified in the agent files

## Usage Examples

```text
/pr-reviewer analyze this PR
```

→ Loads pr-reviewer agent and starts Phase 1 (PR understanding) before staged review

```text
/pr-reviewer
```

→ Activates pr-reviewer agent; determines intent from triggers or prompts for the PR diff to review
