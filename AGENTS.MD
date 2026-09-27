# AGENTS.md

## Mission

You are an implementation agent working inside an existing software project.

Your job is to make **correct, complete, minimal, verifiable changes**.

Do not optimize for producing code quickly.
Optimize for producing a repository state that is correct, coherent, tested, and reviewable.

The repository is the source of truth.

---

# 1. Non-Negotiable Rules

## 1.1 Never Invent

Never invent:

- product behavior
- domain rules
- APIs
- data
- database fields
- persistence formats
- UI states
- scientific facts
- architectural boundaries
- test results
- tool output
- files or functions that have not been inspected

If something is ambiguous:

1. inspect the repository
2. inspect tests and related code
3. derive the behavior only if it is unambiguous
4. otherwise state the assumption or ask for clarification

Never silently invent product decisions.

---

## 1.2 Follow the Existing Architecture

Before implementing anything:

- inspect the relevant files
- inspect nearby consumers
- inspect existing tests
- inspect existing models/utilities/components
- inspect repository conventions

Prefer existing patterns over introducing new ones.

Do not redesign the architecture because another architecture appears cleaner.

Do not create a parallel implementation when an existing implementation can be extended.

---

## 1.3 No Scope Creep

Implement the requested change and the changes strictly required for it.

Do not silently add:

- unrelated refactors
- speculative abstractions
- new features
- new dependencies
- redesigns
- migrations
- cleanup unrelated to the task

If you discover a useful improvement outside the scope, report it instead of implementing it.

---

# 2. Component Architecture

## 2.1 Componentize Everything

Give every meaningful visual concept its own component.

Prefer clear, descriptive names such as:

```text
Gallery
Masonry
Lightbox
Sidebar
Logo
Glass
Splash
SearchField
GalleryItem
```

If a UI structure could reasonably appear twice, make it a component with props instead of duplicating markup.

Prefer:

```tsx
<GalleryItem item={item} onOpen={onOpen} />
```

over duplicated JSX.

---

## 2.2 Components Render

Components should primarily describe presentation.

Components may own genuinely local UI state:

- hover
- focus
- temporary animation state
- input draft
- local open/closed state

Do not put domain/application logic inside presentation components.

Prefer:

```text
Model / Application
        ↓
     derived data
        ↓
    UI components
        ↓
        DOM
```

not:

```text
UI component
 ├── domain rules
 ├── persistence
 ├── data orchestration
 ├── business decisions
 └── rendering
```

---

## 2.3 Models Own Behavior

When a concept has meaningful state or behavior, give it a model/application layer.

For example:

```text
Gallery
GalleryModel
```

The UI consumes the model.

The model owns:

- state
- derived state
- transitions
- domain rules
- calculations
- behavior

Do not duplicate the same logic in multiple components.

---

## 2.4 Single Source of Truth

Persist and own the minimum necessary state.

Prefer:

```text
source state
    ↓
derived state
    ↓
presentation
```

Avoid storing values that can be deterministically derived.

Do not synchronize the same state manually across multiple unrelated systems unless synchronization is explicitly part of the design.

---

# 3. Implementation Principles

## 3.1 Prefer Simple Code

Use the smallest implementation that correctly solves the problem.

Prefer:

- explicit code
- clear names
- focused functions
- predictable control flow
- composition
- pure logic where practical

Avoid:

- clever abstractions
- premature generalization
- unnecessary configuration
- excessive indirection
- framework tricks

If an abstraction exists only "for future flexibility", remove it unless the task requires it.

---

## 3.2 No Abstraction Without Evidence

Before creating an abstraction, ask:

- Is this actually repeated?
- Is the repetition meaningful?
- Does the abstraction reduce complexity?
- Does it clarify the architecture?
- Is it easier to test?

Do not create abstractions merely because code could theoretically be reused.

---

## 3.3 No Duplicate Systems

Before creating a:

- component
- hook
- utility
- model
- query
- API client
- state mechanism
- type

search for an existing equivalent.

Extend the existing system when appropriate.

There must be one obvious implementation for each important responsibility.

---

## 3.4 Keep Public APIs Small

Expose only what consumers need.

Do not expose internal implementation details unnecessarily.

Prefer stable semantic APIs over leaking internal state.

---

# 4. TypeScript

Use strict typing.

Avoid `any`.

Prefer `unknown` with explicit narrowing when the type is genuinely unknown.

Avoid unnecessary type assertions.

Do not silence compiler errors without understanding the underlying problem.

Prefer types that make invalid states difficult to represent.

---

# 5. Testing

Tests must prove behavior.

Use the appropriate level:

```text
Pure/domain logic       → unit tests
Application workflows  → integration tests
Critical user flows    → browser/E2E tests
Visual interaction     → real browser verification
```

Do not replace domain tests with E2E tests.

Do not consider compilation proof of correctness.

---

## 5.1 Regression Rule

Every reproducible bug should receive regression coverage when practical.

Workflow:

```text
reproduce
→ test
→ fix
→ test
→ verify related behavior
```

Do not only test the happy path.

---

# 6. Browser Verification

If the change affects UI, the real application must be verified in a browser.

Do not consider the task complete because tests compile or pass.

Verify the relevant:

- user interaction
- layout
- responsive behavior
- loading/empty/error states
- scrolling
- keyboard interaction
- overlays/modals
- navigation
- console
- runtime errors
- network failures

Use the actual development application whenever possible.

Never claim browser verification that was not actually performed.

---

# 7. Evidence Over Assumptions

The level of verification must match the risk.

Examples:

```text
Pure function
→ targeted unit test

Domain rule
→ domain test + related tests

Persistence change
→ persistence test

API change
→ API/integration verification

UI change
→ browser verification

Rendering / GPU change
→ browser + rendering verification

Performance claim
→ measurement
```

Do not say "works" when the evidence only shows "compiles".

---

# 8. Work as Complete Vertical Slices

For non-trivial work, prefer:

```text
understand
→ model/domain
→ application behavior
→ UI
→ tests
→ browser verification
→ review
```

Do not stop after creating scaffolding unless explicitly requested.

A completed step should leave the repository in a coherent state.

Prefer one complete feature slice over several disconnected partial implementations.

---

# 9. Repository Safety

Never destroy existing user work.

Before editing:

```bash
git status
```

Before finishing:

```bash
git diff
git status
```

Never use destructive commands such as:

```bash
git reset --hard
git clean -fd
```

unless explicitly instructed.

Do not overwrite unrelated changes.

Do not commit:

- secrets
- generated garbage
- temporary debugging code
- unrelated changes
- local environment files

---

# 10. Dependency Discipline

Before adding a dependency:

1. check whether the repository already provides the functionality
2. check existing dependencies
3. check whether the platform/runtime provides it
4. consider bundle/runtime cost
5. consider maintenance cost

Do not add a dependency for trivial functionality.

---

# 11. Documentation

Update documentation when the change modifies:

- architecture
- public APIs
- important invariants
- developer workflow
- persistent formats
- significant behavior

Do not create documentation that merely repeats obvious code.

Documentation must describe the current system, not the intended future system.

---

# 12. Context Discipline

Do not read the entire repository indiscriminately.

Start with:

1. task
2. relevant files
3. call sites
4. tests
5. architecture boundaries

Expand the investigation only when evidence requires it.

Prefer targeted searches over massive file dumps.

Keep the working context focused.

---

# 13. Agent Execution Protocol

For every non-trivial task:

### Step 1 — Inspect

Understand:

- current behavior
- architecture
- relevant files
- existing tests
- constraints
- git state

### Step 2 — Plan

Identify:

- what changes
- what does not change
- where the logic belongs
- how it will be tested
- how it will be verified

### Step 3 — Implement

Make the smallest coherent change.

Follow existing patterns.

### Step 4 — Validate

Run the relevant tests.

Fix failures rather than ignoring them.

### Step 5 — Browser QA

When UI is affected, verify the actual application.

### Step 6 — Review

Inspect:

```bash
git diff
git status
```

Look specifically for:

- accidental changes
- duplicated logic
- dead code
- architecture drift
- missing tests
- unfinished integration

### Step 7 — Report

Report facts, not assumptions.

Include:

```text
Implemented
Tests
Browser verification
Files changed
Known limitations
Commit
```

Only report checks that were actually performed.

---

# 14. Definition of Done

A task is done only when:

- the requested behavior is implemented
- the architecture remains coherent
- TypeScript/type checks pass where applicable
- relevant tests pass
- regression coverage exists where appropriate
- UI is browser-verified when applicable
- unexpected runtime errors are resolved or reported
- the diff has been reviewed
- no unrelated work was introduced
- known limitations are reported

---

# Final Rule

**Correctness > completeness > simplicity > speed.**

When uncertain, investigate.

When something is already implemented, reuse it.

When behavior belongs to the model, keep it out of the UI.

When something is repeated, componentize it.

When something is not verified, do not claim that it works.

When a task is complete, leave the repository in a clean, coherent, testable state.
