# **AI-Powered PR Review System (Cursor Workflow)**

A structured system to use AI effectively for reviewing pull requests without noise, overwhelm, or shallow feedback.  
---

## Core Principle

Do NOT ask AI to "review this PR" directly.  
Instead, run a staged workflow that builds understanding → architecture compliance → risk awareness → deep analysis → adversarial testing → human judgment.  
AI is a thinking partner, not an authority.  

**Prompts:** [pr-review-prompts.md](../2.%20ai-workflows/pr-review-prompts.md)

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
* Use **Phase 1** prompt in [pr-review-prompts.md](../2.%20ai-workflows/pr-review-prompts.md).

---

### Phase 1.5 — Architecture Compliance

* Goal: Verify the PR reuses existing design and abstractions — not just "good code" in isolation.  
* **Run for any feature PR** in an existing subsystem. Skip typo-only or dependency-only changes.  
* Attach design docs, ADRs, and 2–3 similar features with `@` before pasting the prompt.  
* Use **Phase 1.5** prompt in [pr-review-prompts.md](../2.%20ai-workflows/pr-review-prompts.md).  
* If verdict is **blocking**, stop and request rework before Phase 2.

---

### Phase 2 — Risk Classification

* Goal: Identify where attention should go.  
* Use **Phase 2** prompt in [pr-review-prompts.md](../2.%20ai-workflows/pr-review-prompts.md).

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

Run **one** focus prompt from [pr-review-prompts.md](../2.%20ai-workflows/pr-review-prompts.md) matching the PR type (security, reliability, maintainability, or performance).

---

### Phase 5 — Adversarial Review

* Goal: Break the system mentally.  
* Use **Phase 5** prompt in [pr-review-prompts.md](../2.%20ai-workflows/pr-review-prompts.md).

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

### Small PR (<200 lines)

* Understanding  
* Architecture compliance (if feature touches an existing subsystem)  
* One focused review  
* Human pass

### Medium PR

* Understanding  
* Architecture compliance  
* Risk classification  
* 1–2 focused reviews  
* Adversarial review  
* Human pass

### Large PR

* Understanding  
* Diff compression (optional — see prompts doc)  
* Architecture compliance (per subsystem if needed)  
* Risk classification  
* Multiple subsystem reviews  
* Adversarial review  
* Human architecture review

---

## Key Mental Model

You are not asking:  
"Is this good?"  
You are asking:

* What can break?  
* Does this reuse what we already built?  
* Where are hidden risks?  
* What assumptions exist?  
* What becomes painful later?
