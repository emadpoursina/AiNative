# **AI-Powered PR Review System (Cursor Workflow)**

A structured system to use AI effectively for reviewing pull requests without noise, overwhelm, or shallow feedback.  
---

## Core Principle

Do NOT ask AI to "review this PR" directly.  
Instead, run a staged workflow that builds understanding → risk awareness → deep analysis → adversarial testing → human judgment.  
AI is a thinking partner, not an authority.  
---

## Workflow Overview

### Phase 0 — Input Discipline

Before using AI:

* Do not review immediately  
* Do not request general feedback  
* Always structure the review into phases

---

### Phase 1 — PR Understanding

* Goal: Build a mental model of the change.  
* Prompt:  
  * Analyze this PR first.  
  * Explain:  
    * \- what problem it solves  
    * \- core architectural changes  
    * \- important files  
    * \- risky areas  
    * \- possible production impact  
    * \- database/auth/api implications  
* Do not review yet.

---

### Phase 2 — Risk Classification

* Goal: Identify where attention should go.  
* Prompt:  
  * Classify the risks in this PR.  
* Rate:  
  * \- security risk  
  * \- scalability risk  
  * \- migration risk  
  * \- reliability risk  
  * \- maintainability risk  
* Explain why.

---

### Phase 3 — Select Review Focus (IMPORTANT)

* Do NOT run all review types.  
* Choose based on PR type:  
  * Security Review  
  * Reliability Review  
  * Maintainability / Architecture Review  
  * Performance Review

---

### Phase 4 — Deep Focus Review

* Security Review  
  * Review this PR like a security engineer.  
  * Look for:  
    * \- auth issues  
    * \- permission leaks  
    * \- JWT/session risks  
    * \- SQL injection  
    * \- unsafe validation  
    * \- secrets exposure  
    * \- multi-tenant risks  
    * \- rate limiting issues

---

* Reliability Review  
  * Review this PR for production reliability.  
  * Focus on:  
    * \- failure handling  
    * \- retries  
    * \- logging quality  
    * \- observability  
    * \- rollback safety  
    * \- migrations  
    * \- partial failure scenarios  
    * \- timeout handling

---

* Maintainability / Architecture Review  
  * Review ONLY architecture and maintainability.  
  * Ignore formatting.  
  * Focus on:  
    * \- coupling  
    * \- separation of concerns  
    * \- abstraction quality  
    * \- domain boundaries  
    * \- future extensibility  
    * \- hidden complexity  
    * \- technical debt

---

* Performance Review  
  * Review performance implications.  
  * Focus on:  
    * \- DB query efficiency  
    * \- N+1 problems  
    * \- memory usage  
    * \- caching opportunities  
    * \- async behavior  
    * \- scalability bottlenecks

---

### Phase 5 — Adversarial Review

* Goal: Break the system mentally.  
* Prompt:  
  * Act like a hostile senior engineer.  
  * Assume this PR will fail in production.  
  * Find:  
    * \- hidden assumptions  
    * \- edge cases  
    * \- race conditions  
    * \- rollback risks  
    * \- scalability traps  
    * \- long-term maintenance issues

---

### Phase 6 — Human Review (Critical Step)

* AI does NOT finalize decisions.  
* Ask yourself:  
  * Would I deploy this on Friday night?  
  * What breaks under real traffic?  
  * Is this over-engineered?  
  * Will future engineers suffer?  
  * Does this align with product needs?

---

## PR Complexity Strategy

### Small PR (\<200 lines)

* Understanding  
* One focused review  
* Human pass

### Medium PR

* Understanding  
* Risk classification  
* 1–2 focused reviews  
* Adversarial review  
* Human pass

### Large PR

* Understanding  
* Diff compression (optional)  
* Risk classification  
* Multiple subsystem reviews  
* Adversarial review  
* Human architecture review

---

## Diff Compression Prompt

Use for large PRs:  
Summarize only meaningful logic changes.  
Ignore formatting and refactors.

---

## Key Mental Model

You are not asking:  
"Is this good?"  
You are asking:

* What can break?  
* Where are hidden risks?  
* What assumptions exist?  
* What becomes painful later?