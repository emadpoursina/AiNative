# Skill — Planning gate

Enforce research and plan approval before multi-file implementation.

## When to use

Any task touching 2 or more files. Single-file tasks and typo/config fixes are exempt.

## Behavior

1. Run Phase 1 research — present report, wait for confirmation
2. Run Phase 2 synthesis — present plan, wait for explicit approval
3. Only then implement, one step at a time
4. If the task is ambiguous, ask one clarifying question before starting research

## Gate rules

- Do not write code before the plan is confirmed
- Do not skip research for multi-file tasks
- One implementation step per prompt in Phase 3
