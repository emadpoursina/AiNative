# **🚀 Universal Release Management Workflow**

This is a simple, repeatable release system you can apply to any project (web, backend, SaaS, WordPress, etc.).

It is designed to help you ship safely, predictably, and without confusion.

---

## 🧠 Core Idea

* A **release** is not just code being pushed.  
* It is: A conscious decision to turn a stable version of your system into production.

---

## 🌳 Branch Structure (Simple & Universal)

* You use 3 main branches:  
  1. master        → production (live users)  
  2. development   → integration / staging base  
  3. feature/\*     → individual work

---

## 🔁 FULL WORKFLOW OVERVIEW

feature/\* → development → staging → master → production

---

## 🔵 PHASE 1 — DEVELOPMENT (Build)

* Goal: Build features safely without affecting others.  
* Steps:  
  * Create a feature branch from `development`  
  * Implement ONE feature per branch  
  * Keep changes small and focused  
  * Do basic self-testing locally  
* Rule: One feature \= one branch

---

## 🟡 PHASE 2 — PULL REQUEST (Quality Check)

* Goal: Ensure code is safe before integration.  
* Steps:  
  * Open PR → `development`  
  * Run automated checks (if available)  
  * Self-review first  
  * AI or human review  
* Checklist:  
  * Does it break existing functionality?  
  * Are edge cases handled?  
  * Is the code readable?

---

## 🟠 PHASE 3 — INTEGRATION (development branch)

* Goal: Combine features into a testable system.  
* Steps:  
  * Merge feature → `development`  
  * Deploy `development` to staging  
  * Run full tests  
  * Fix issues immediately if found  
* Rule: `development` should always be close to release-ready

---

## 🔴 PHASE 4 — RELEASE PREPARATION

* Goal: Freeze a stable version for production.  
* Steps:  
  1. Ensure staging is stable  
  2. Verify all tests passed  
  3. Confirm what is currently in `development` is ready  
  4. Run the **Pre-Tag Compatibility Check** — [client-compatibility-system.md](./client-compatibility-system.md#phase-4--pre-tag-compatibility-check) (multi-client projects)  
  5. Create a version tag: v1.0.0  
  6. Write release notes:  
     * \#\# v1.0.0  
     *   
     * \#\#\# Added  
     * \- Feature A  
     *   
     * \#\#\# Fixed  
     * \- Bug B  
     *   
     * \#\#\# Changed  
     * \- Improvement C

---

* Important Concept  
  * You are NOT selecting features.  
  * You are selecting a **snapshot in time** of `development` that is stable enough.

---

## 🚀 PHASE 5 — PRODUCTION RELEASE

* Goal: Ship intentionally to users.  
* Steps:  
  * Confirm staging is stable  
  * Confirm release notes  
  * Deploy tagged version (`vX.Y.Z`) to `master`  
  * Monitor system after release  
* Rule: Every deployment must be a conscious decision

---

## 🟣 PHASE 6 — POST-RELEASE MONITORING

* Goal: Ensure everything works in production.  
* Steps:  
  * Monitor logs and errors  
  * Watch key metrics  
  * Check user feedback  
  * Validate critical flows  
  * Run the **Post-Deploy Compatibility Monitor** — [client-compatibility-system.md](./client-compatibility-system.md#phase-6--post-deploy-compatibility-monitor) (multi-client projects)

---

## 🔁 PHASE 7 — ROLLBACK (Safety Net)

* Goal: Recover quickly if something breaks.  
* Steps:  
  * Identify issue  
  * Revert to previous version OR disable feature  
  * Fix forward in new branch  
* Rule: You must always be able to go back to last stable version

---

## 🧾 CORE RULES (IMPORTANT)

1. Staging is mandatory  
   * Nothing goes to production without passing staging.  
2. Every release has a version  
   * Example: v1.2.3  
3. Releases are intentional  
   * You decide when a version becomes production.  
4. Always keep rollback available  
   * Never lose the previous stable version.  
5. Small releases \> big releases  
   * Smaller changes \= safer system.

---

## 🧠 MENTAL MODEL

* Think of your system like this:  
  * feature/\*   → idea  
  * development → draft system  
  * staging     → rehearsal  
  * master      → live show  
  * release tag → episode name  
  * rollback    → undo button for reality

---

## 📌 QUICK WALKTHROUGH (HOW TO USE THIS EVERY TIME)

1. Create feature branch  
2. Build feature  
3. Open PR → development  
4. Review \+ test  
5. Merge → development  
6. Deploy to staging  
7. Fix issues if any  
8. When stable → create version tag  
9. Deploy to production (master)  
10. Monitor  
11. Rollback if needed

---

## 🎯 FINAL RESULT

* If you follow this system, you will:  
  * Ship more safely  
  * Reduce production bugs  
  * Have predictable releases  
  * Gain real engineering discipline

---

