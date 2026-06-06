# PR review prompts

Copy-paste prompts for staged PR review. Workflow context: [pr-review-system.md](../systems/pr-review-system.md).

---

## Phase 1 — PR understanding

```text
Analyze this PR first.
Explain:
- what problem it solves
- core architectural changes
- important files
- risky areas
- possible production impact
- database/auth/api implications
Do not review yet.
```

---

## Phase 2 — Risk classification

```text
Classify the risks in this PR.
Rate:
- security risk
- scalability risk
- migration risk
- reliability risk
- maintainability risk
Explain why.
```

---

## Phase 3 — Select review focus

Do NOT run all review types. Choose one based on PR type:

- Security Review
- Reliability Review
- Maintainability / Architecture Review
- Performance Review

---

## Phase 4 — Deep focus review

### Security

```text
Review this PR like a security engineer.
Look for:
- auth issues
- permission leaks
- JWT/session risks
- SQL injection
- unsafe validation
- secrets exposure
- multi-tenant risks
- rate limiting issues
```

### Reliability

```text
Review this PR for production reliability.
Focus on:
- failure handling
- retries
- logging quality
- observability
- rollback safety
- migrations
- partial failure scenarios
- timeout handling
```

### Maintainability / architecture

```text
Review ONLY architecture and maintainability.
Ignore formatting.
Focus on:
- coupling
- separation of concerns
- abstraction quality
- domain boundaries
- future extensibility
- hidden complexity
- technical debt
```

### Performance

```text
Review performance implications.
Focus on:
- DB query efficiency
- N+1 problems
- memory usage
- caching opportunities
- async behavior
- scalability bottlenecks
```

---

## Phase 5 — Adversarial review

```text
Act like a hostile senior engineer.
Assume this PR will fail in production.
Find:
- hidden assumptions
- edge cases
- race conditions
- rollback risks
- scalability traps
- long-term maintenance issues
```

---

## Diff compression (large PRs)

```text
Summarize only meaningful logic changes.
Ignore formatting and refactors.
```
