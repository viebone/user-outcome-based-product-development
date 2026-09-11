---
name: change-request
description: Universal entry point for ALL product changes — new features, user feedback, bugs, updates, or technical work. Creates a research signal, triages against outcomes, assesses which layers of the spec chain are affected, and outputs an ordered skill execution plan. Run this before touching any spec or code.
---

# Skill: change-request
# Role: PM (triage) → all downstream roles (execution)
# Purpose: Gate every change through the full spec chain before any spec or code is touched.

You are acting as the PM and change coordinator. Your job is to ensure that no change —
no matter how small — bypasses the spec chain. Every change must trace to an outcome,
and every affected layer must be updated top-down before implementation changes.

**This skill is the mandatory first step for every change to the product.**
No one should be editing specs or code without having first run this skill and
having a saved change request with an execution plan.

---

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`),
> not the workspace root. Before proceeding, list the directories under `products/`. If there is only
> one, use it as the product root. If there are multiple, ask: "Which product are you working on?"
> and wait for the answer before continuing.

---

### Step 1 — Capture the signal

Ask if not already provided:
> "What's the trigger for this change? Paste a user quote, bug description, stakeholder request,
> metric observation, or technical concern."

Save the raw signal to `research/{YYYY-MM-DD}-{slug}.md`. No interpretation yet — just the raw input,
labelled with the source type at the top:

```
source: user-feedback | bug | stakeholder-request | market-signal | internal
date: {YYYY-MM-DD}

{raw input — paste exactly as received}
```

If a closely related research file already exists in `research/`, note the link in the new file
rather than duplicating content. Every change still gets its own signal file.

---

### Step 2 — PM triage: classify against outcomes

Read all files in `outcomes/`. Determine which bucket this signal falls into:

**A. Maps to an existing outcome**
The signal is a refinement, counter-evidence, or new instance of something already framed
in `outcomes/`. → Note the outcome slug. Confirm with the user:
> "This looks related to `outcomes/{outcome-slug}.md`. Should this change be tracked against
> that outcome, or does it open a new area?"

If the outcome's success criteria or scope need updating based on this signal, note that in
the execution plan (Step 5).

**B. New area not covered by any existing outcome**
→ Stop. Say:
> "⚠️ This signal opens a new area with no existing outcome. Run `/new-outcome` first.
> Nothing moves forward without an outcome to anchor the change."

**C. Technical quality (refactor, performance, tech debt)**
The change has no new user-facing feature. → Check if a quality outcome exists in `outcomes/`.
If not:
> "Technical changes still need an outcome (e.g. 'Engineers can deploy without fear of breaking
> existing behaviour'). Run `/new-outcome` to create a quality outcome, then return here."

**D. Not worth pursuing**
After reviewing, the signal doesn't hold up against current priorities.
→ Add to the top of the research file: `disposition: rejected — {one-line reason}`. Stop here.

---

### Step 3 — Classify the change type

Based on what the user wants to achieve, assign one or more change types:

| Type | Description |
|---|---|
| `new-feature` | A capability that doesn't exist yet anywhere in the product |
| `ux-change` | Changing how an existing feature feels, flows, or responds to the user |
| `visual-change` | Changing colours, typography, spacing, or component aesthetics |
| `api-change` | Changing data models, endpoints, or backend business logic |
| `content-change` | Changing copy, labels, or empty states (no structural change) |
| `bug-fix` | Correcting behaviour that violates what an existing spec says |
| `technical-refactor` | Restructuring code with no user-facing change |

A change can have multiple types (e.g. a `ux-change` that also requires an `api-change`).
List all that apply and address each in the execution plan.

---

### Step 4 — Assess impact: which spec layers need updating?

Check which spec files currently exist for the relevant feature/area by reading the product root.
For each layer, assign an action:

| Layer | Spec file | Possible actions |
|---|---|---|
| Research | `research/` | Always: signal file created in Step 1 |
| Outcome | `outcomes/{slug}.md` | `update` if success criteria change; `no-change` otherwise |
| Design Foundations | `design/foundations.md` | `update` only if product-wide UX principles are affected |
| Information Architecture | `design/information-architecture.md` | `update` only if navigation structure or taxonomy changes |
| Visual Design | `design/visual-design.md` | `update` for `visual-change`; `no-change` otherwise |
| Experience Spec | `design/{slug}/experience.md` | `create` for new-feature; `update` for any change affecting flow, interactions, or states |
| Frontend Spec | `frontend/specs/{slug}/architecture.md` | `create` or `update` whenever the experience spec changes |
| Backend Spec | `backend/specs/{slug}/api.md` | `create` or `update` for `api-change` and `new-feature`; `no-change` for pure visual/content changes |
| Frontend Implementation | `frontend/src/` | Last — only after frontend spec is updated |
| Backend Implementation | `backend/src/` | Last — only after backend spec is updated |

**Cascade rule (mandatory):** A change at any layer cascades down. You may not update a lower
layer without first updating all affected layers above it.
- Outcome changes → review experience spec
- Experience spec changes → review both tech specs
- Visual design changes → review all experience specs that reference the changed tokens
- Backend spec changes → review frontend spec API contract

---

### Step 5 — Generate the skill execution plan

Based on Step 3 and Step 4, produce a concrete ordered checklist. Use the canonical sequences below.

**For `new-feature`:**
1. `/new-outcome` — if no outcome exists
2. `/new-design-foundations` — if `design/foundations.md` is missing or outdated
3. `/new-experience` — create the experience spec (before IA and visual design)
4. `/new-information-architecture` — if `design/information-architecture.md` is missing or outdated; informed by the experience spec
5. `/new-visual-design` — if `design/visual-design.md` is missing or outdated; informed by IA and experience
6. `/new-backend-spec` — backend contract defined first
7. `/new-frontend-spec` — reads the backend spec to align on API contract
8. `/implement-backend` — server side first
9. `/implement-frontend` — browser side against the working backend

**For `ux-change`:**
1. Update `outcomes/{slug}.md` — if success criteria change (note: manual edit, not a skill)
2. `/new-experience` — update the experience spec for the affected sections; read the existing spec first and revise in place
3. `/new-frontend-spec` — update the frontend spec if component structure or state changes
4. `/new-backend-spec` — update only if the UX change requires new or changed endpoints
5. `/implement-frontend`
6. `/implement-backend` — only if backend spec changed

**For `visual-change` (product-wide, e.g. colour system, typography):**
1. `/new-visual-design` — update the affected tokens in `design/visual-design.md`
2. Review all `design/{slug}/experience.md` files that reference the changed tokens — update each
3. `/implement-frontend` for each affected feature

**For `visual-change` (feature-scoped):**
1. `/new-experience` — update the Visual Design section of the experience spec
2. `/new-frontend-spec` — update the frontend spec
3. `/implement-frontend`

**For `api-change`:**
1. `/new-experience` — update if the change affects what users see or how they interact
2. `/new-backend-spec` — update data models, endpoints, and business logic
3. `/new-frontend-spec` — update the API contract section to match
4. `/implement-backend`
5. `/implement-frontend`

**For `content-change` (copy, labels, empty states only):**
1. `/new-experience` — update the affected sections of the experience spec
2. `/implement-frontend`

**For `bug-fix`:**
1. Read the experience spec and both tech specs for the affected feature
2. Determine root cause:
   - **Code is wrong, spec is correct** → no spec update needed; go directly to implementation
   - **Spec is ambiguous or incorrect** → update the spec first (`/new-experience` or the relevant tech spec), then implement
3. `/implement-frontend` and/or `/implement-backend` as appropriate

**For `technical-refactor`:**
1. Confirm a quality outcome exists in `outcomes/`
2. Update `backend/specs/{slug}/api.md` or `frontend/specs/{slug}/architecture.md` if the refactor changes structure that the spec documents (manual edit)
3. Implement — no experience spec changes unless user-facing behaviour changes

---

### Step 6 — Save the change request

Create `changes/` at the product root if it doesn't exist. Save to `changes/{YYYY-MM-DD}-{slug}.md`:

```markdown
---
id: {slug}
date: {YYYY-MM-DD}
trigger-type: user-feedback | bug | stakeholder-request | market-signal | internal
change-type: {one or more from step 3}
outcome: {outcome-slug}
status: triaged
---

# Change Request: {short title}

## Signal
See: `research/{YYYY-MM-DD}-{slug}.md`

## Outcome
See: `outcomes/{outcome-slug}.md`

## Change Type
{change-type(s)}

## Specs Affected

| Layer | File | Action |
|---|---|---|
| Outcome | `outcomes/{slug}.md` | create / update / no-change |
| Design Foundations | `design/foundations.md` | create / update / no-change |
| Information Architecture | `design/information-architecture.md` | create / update / no-change |
| Visual Design | `design/visual-design.md` | create / update / no-change |
| Experience Spec | `design/{slug}/experience.md` | create / update / no-change |
| Frontend Spec | `frontend/specs/{slug}/architecture.md` | create / update / no-change |
| Backend Spec | `backend/specs/{slug}/api.md` | create / update / no-change |
| Frontend Implementation | `frontend/src/` | update / no-change |
| Backend Implementation | `backend/src/` | update / no-change |

## Execution Plan

- [ ] Step 1: {skill or manual action}
- [ ] Step 2: {skill or manual action}
- [ ] Step 3: …

## Decision Log
- {YYYY-MM-DD}: {decision made during triage — why this outcome, why this change type}
```

Update `status` to `in-progress` when execution begins. Mark each checklist item with ✅ as it completes.
Update `status` to `complete` only when every item is done and all affected specs match the implementation.

---

### Step 7 — Confirm and hand off

Output:
> "Change request saved at `changes/{date}-{slug}.md`.
>
> **Your execution plan:**
> {numbered checklist from Step 5}
>
> Start with Step 1 — run `/{skill}` now, or review the change request first?"

---

## Anti-patterns to avoid

- Do not skip Step 1. Even a one-line bug report must be captured in `research/`.
- Do not allow changes that map to no outcome. Every change traces to an outcome, including technical work.
- Do not let "it's a small change" bypass this process. Small changes are where spec drift starts.
- Do not skip the cascade check. If the experience spec changes, tech specs must be reviewed.
- Do not mark a change request `complete` until every checklist item is done.
- Do not run `/implement-frontend` or `/implement-backend` before the relevant specs are updated.
- Do not create a new experience spec when updating an existing one — read the existing spec and revise in place.
