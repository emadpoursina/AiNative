# Agent Handoff Artifact

Use when passing work between agents (coordinator, worker, reviewer, groomer). Fill every section so the next agent can continue without asking for missing context.

Phase prompts: [cursor-plan/](./cursor-plan/) — coordinator (Phases 1, 2, 5), worker (Phase 3), reviewer (Phase 4).

---

## Frontmatter

```yaml
---
task_id: feat/TASK_NAME
agent: coordinator | worker | reviewer | groomer
status: in_progress | complete | failed | blocked
output_type: plan | code | review | groomed_task | release_notes
next_agent: worker | reviewer | coordinator | human
timestamp: YYYY-MM-DD
---
```

---

## Input

> What this agent received. Paste the task card, rough requirement, or previous agent's output.

```
PASTE_INPUT_HERE
```

---

## Skills Used

> List the skills/tools this agent was given.

- skill:
- skill:

---

## Output

> The artifact this agent produced. Must be self-contained — the next agent should need nothing else.

When `output_type: plan`, include all three sections from [2-synthesis.md](./cursor-plan/2-synthesis.md): **Execution plan**, **Test flows**, **Commit plan**.

```
PASTE_OUTPUT_HERE
```

---

## Decisions Made

> Key choices made during execution that the next agent must know.

- 
- 

---

## Assumptions

> What this agent assumed that was NOT in the input.

- 
- 

---

## Blockers / Flags

> Anything that stopped full completion or needs human review.

- [ ] 

---

## Next Agent Instructions

> Explicit instruction for the next agent. No ambiguity.

```
PASTE_NEXT_PROMPT_HERE
```

---

## Validation Checklist

> Must pass before handing off.

- [ ] Output is self-contained
- [ ] No missing context for next agent
- [ ] Assumptions are documented
- [ ] Blockers are flagged
- [ ] `next_agent` field is set
