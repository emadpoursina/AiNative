# Agentic coding system

An agentic coding system has two main parts.

## AI layer (Specs.md)

1. Markdown files about the project (standards in the specs.md framework) that explain different parts of the codebase to an AI — plus your rules, policies, and conventions.
2. **Progressive disclosure** — two parts: an index main file and detail files.
   1. The AI uses the index to find and load only what it needs instead of filling context with irrelevant information.
   2. Keep file size in check: each file should point to a specific part of the code so an agent working on that part loads only that file.
   3. Keep the AI from loading unnecessary material so the context window stays free for actual coding.
3. Rules for how you code and what policies or agreements you have about style.
   1. Rules matter: a bad rule means bad code across all features.
   2. Start small and grow step by step as agents make mistakes — fix not only the problem but also the specs/standards files.
4. When using MCPs, avoid filling context with poorly scoped MCP server handling.
5. Developers use the terminal as their environment for better control and lower context consumption.

## PIV: Plan — Implementation — Validation

### Plan

1. Brainstorm with AI and explain the idea.
   1. Interrogation with ~20 multiple-choice questions.
2. Define the blast radius.
   1. How much autonomy the task needs.
   2. A good measure is number of files touched.
      1. Based on complexity, configure how autonomous the AI should be.
      2. Based on complexity, configure how much the AI should plan and ask.
3. Plan each agent so they do not touch the same areas and create conflicts. Use small atomic commits.
4. Define tests and validation strategy here:
   - unit tests
   - integration tests
   - E2E tests with browser automation
   - Customer/User flow test

### Implementation

1. **Context reset:** start a new empty chat with only implementation-needed docs.
2. The developer only answers specific questions the AI has.
3. Delegate the *how*; keep thinking about the *why* of the feature or architecture.

### Validation

1. Multi-layer pyramid for catching bugs and problems before they reach PR.
2. Prove the code actually works.
3. Use test flows defined in the planning phase.
4. Browser automation tools for E2E.
5. Three important loops when a problem is found:
   1. **Loop back to Implement:** give the agent the specific validation failure as feedback and let it fix the issue. Be explicit: “The function returns undefined when the input array is empty — fix this so it returns an empty array instead.”
   2. **Loop back to Plan:** if the failure reveals a misunderstanding about the task itself, do not patch it in Implement. Revise the spec and run a new cycle.
   3. When the AI misses something, fix the problem and update the project AI layer. Also update the universal overall AI layer (AiNative repo) when the lesson applies globally.
   4. Ask the agent to write unit/integration/E2E tests after implementation.
   5. PR review is the final gate. If the validation layer works correctly there should be little surprise in PR review — problems there mean something slipped through validation.

**Related:** [coordinator-worker.md](./coordinator-worker.md) (phase prompts), [specs-planner agent](../8.%20agents/specs-planner/) (specs.md in app repos).
