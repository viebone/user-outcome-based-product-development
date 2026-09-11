# User Outcome Based Product Development — Framework Instructions

This project follows the **User Outcome Based Product Development (UOBPD)** framework.
Every artifact in this project traces back to a documented user, market, or business outcome.

---

## The Core Pattern

Every role in this framework follows the same pattern:

```
reads  → specs from upstream roles
owns   → a folder in the project
writes → specs for downstream roles
mode   → manual | assisted | autonomous | both
```

Roles communicate exclusively through spec files. A role never directly instructs
another role — it writes a spec that the downstream role reads.

---

## The Spec Hierarchy

```
research/                              ← raw inputs (interviews, data, market signals)
    ↓
outcomes/                              ← WHY — what users/business need to achieve
    ↓
design/foundations.md                  ← FEEL — product-wide UX principles, design goals + paradigm
    ↓
design/{feature}/experience.md         ← WHAT — user flow, interactions, feel (per feature)
design/components/                     ← WHAT (detail) — specific component behavior (optional)
    ↓
design/information-architecture.md     ← STRUCTURE — navigation, zones, taxonomy (product-wide, after first experience)
    ↓
design/visual-design.md                ← LOOK — colour, typography, spacing, component style (product-wide, after IA)
    ↓
backend/specs/                         ← HOW (server) — API design, data models, business logic
    ↓
frontend/specs/                        ← HOW (browser) — component architecture, state, data flow
    ↓
backend/src/                           ← implementation (server first)
    ↓
frontend/src/                          ← implementation (browser after)
```

`changes/` is a sibling to `research/` and sits outside the hierarchy. It is the audit trail —
every change to any layer of the chain above must be preceded by a change request saved there.
It is not a spec layer; nothing reads from it. It exists to make every decision traceable.

`design/foundations.md` is written **once per product** before any experience spec — it sets
the UX principles every experience must respect.

`design/information-architecture.md` and `design/visual-design.md` are written **once per
product after the first experience spec** — the experience defines what needs to exist
structurally and visually, then the IA and visual design formalise it product-wide.

**The correct order is always: experience → IA → visual design → backend spec → frontend spec
→ implement backend → implement frontend.** Each step must be complete before the next begins.

**Before implementing anything, always read up the full chain.**
`outcomes/{slug}` → `design/foundations.md` → `design/{feature}/experience.md`
→ `design/information-architecture.md` → `design/visual-design.md`
→ `backend/specs/{feature}/api.md` → `frontend/specs/{feature}/architecture.md`

---

## Default Roles

Roles are defined in `.outcome/roles/`. Any role can be human, automated, or both.
The current project's automation level is in `.outcome/config.yaml`.

### PM
- **Reads**: `research/`
- **Owns**: `outcomes/`
- **Writes**: outcome files
- **Decides**: what gets built and when, always grounded in research

### Designer
- **Reads**: `outcomes/`, `research/`
- **Owns**: `design/foundations.md`, `design/information-architecture.md`, `design/visual-design.md`, `design/{feature}/`, `design/components/`
- **Writes**: design foundations (once per product), information architecture (once per product), visual design (once per product), experience specs, component specs
- **Decides**: UX principles, design goals, product paradigm, navigation structure, zones, visual language, how it feels, looks, and flows

### Frontend Engineer
- **Reads**: `design/{feature}/experience.md`
- **Owns**: `frontend/specs/`
- **Writes**: frontend architecture specs
- **Decides**: component breakdown, state management, data flow

### Backend Engineer
- **Reads**: `design/{feature}/experience.md`
- **Owns**: `backend/specs/`, `backend/src/` (includes the pre-provisioned AI
  provider abstraction in `backend/src/llm/`)
- **Writes**: API and data model specs
- **Decides**: endpoints, models, business logic

---

## Pre-Provisioned Capabilities

Some infrastructure is provisioned once, in `product-template/`, before any spec
exists — because rebuilding the same plumbing from scratch in every new product
is waste. This is **tooling, not a feature**: it sits idle until a spec calls
for it, and provisioning it does not authorize its use anywhere.

- **AI / LLM provider abstraction** (`backend/src/llm/`) — a provider-agnostic
  interface (`llm.base.LLMProvider`) with adapters for Gemini, Anthropic, and
  OpenAI. Provider and model are always named explicitly at the call site
  (e.g. `providers.gemini("gemini-2.5-flash")`), never hidden behind
  env-driven defaults. To add a new provider, implement `LLMProvider` and
  register a factory in `llm/providers.py`.

Whether and how a product actually uses AI is decided once, product-wide, in
`design/foundations.md` under **AI Involvement** (`none` / `ai-assisted` /
`ai-native`) — same tier as the UX principles, because it shapes every
downstream experience and technical spec. Backend specs that call for AI
behavior wire into the existing `llm/` abstraction rather than inventing a
new one.

---

## The Escape Hatch

Any spec can include a `directive` field:

```yaml
directive: low    # default — AI has creative freedom within the spec
directive: high   # follow this exactly — the author has strong opinions here
```

Use `directive: high` only when a lower directive level produced results that
didn't match the intended experience. It is the exception, not the norm.

---

## Adding a New Role

To add any future role (QA, DevOps, Research, Security, Marketing, etc.):

1. Create `.outcome/roles/{role-name}.yaml` — define what it reads, owns, writes
2. Create the folder it owns in the project
3. Add skills for that role in `.claude/skills/`
4. Set its automation level in `.outcome/config.yaml`

The framework core does not change. New roles plug in via the same pattern.

---

## How to Build a Feature

1. **Drop signals** into `research/` — quotes, data, observations. No decisions yet.
2. **Run `/new-outcome`** — PM turns a signal into an outcome. Gate: nothing moves forward without one.
3. **Run `/new-design-foundations`** — Designer sets product-wide UX principles, design goals, and paradigm.
   Gate: must exist before any experience spec. Run once per product, revisit when product direction changes.
4. **Run `/new-experience`** — Designer translates the outcome into an experience spec: how it feels, flows,
   and what the user does. Gate: no tech decisions until this exists. The experience spec defines WHAT is
   needed — the IA and visual design are then shaped by it, not the other way around.
5. **Run `/new-information-architecture`** — Designer formalises the product's navigation model and content
   taxonomy, informed by the experience spec. Run once per product, updated when structure changes.
6. **Run `/new-visual-design`** — Designer defines the product's visual language, informed by the IA and
   experience spec. Run once per product, revisit when visual direction changes.
7. **Run `/new-backend-spec`** — Backend Engineer translates the experience into API design, data models,
   and business logic. The backend contract is defined before the frontend so the frontend can reference it.
8. **Run `/new-frontend-spec`** — Frontend Engineer translates the experience into component architecture,
   state management, and API contracts. Reads the backend spec to align on endpoints and data shapes.
9. **Run `/implement-backend`** — Build the server side first. Nothing invented beyond the spec.
10. **Run `/implement-frontend`** — Build the browser side against the working backend. Nothing invented.

Each step must be complete before the next begins. The first shippable slice is:
outcome → foundations → experience → IA → visual design → backend spec → frontend spec → implement backend → implement frontend.

---

## Change Management

Every change to the product — new feature, user feedback, bug fix, visual update, API change,
or technical refactor — must start with `/change-request`. No exceptions.

```
any trigger (feedback, bug, idea, metric)
    ↓
/change-request
    ↓ captures signal in research/
    ↓ triages against outcomes/
    ↓ classifies change type
    ↓ assesses which spec layers are affected
    ↓ outputs ordered skill execution plan
    ↓ saves audit record to changes/
    ↓
run the skills in the plan, top-down
    ↓
no spec or code is touched until change-request is complete
```

**Change types and what they touch:**

| Change type | Layers that must update |
|---|---|
| `new-feature` | Full chain: outcome → foundations → experience → IA → visual design → backend spec → frontend spec → implement backend → implement frontend |
| `ux-change` | Experience spec → tech specs (review) → implementation |
| `visual-change` (product-wide) | Visual design → affected experience specs → implementation |
| `visual-change` (feature-scoped) | Experience spec → frontend spec → implementation |
| `api-change` | Experience spec (if user-facing) → backend spec → frontend spec → implementation |
| `content-change` | Experience spec → implementation |
| `bug-fix` | Identify which spec is violated → fix spec if wrong → implementation |
| `technical-refactor` | Quality outcome → tech spec (if structure changes) → implementation |

**The cascade rule:** A change at any layer requires reviewing all layers below it.
You may not update a lower layer without first updating all affected layers above it.

Change requests are saved in `changes/{YYYY-MM-DD}-{slug}.md` and track status
(`triaged` → `in-progress` → `complete`). Every checklist item must be complete before
the status moves to `complete`.

---

## Rules for AI

1. **Never implement without a spec.** If a spec is missing, stop and ask which
   role should write it, or use the appropriate skill to draft it.

2. **Always read the full chain** before implementing. Outcome → Experience → Technical spec.

3. **Respect directive levels.** `directive: high` means follow exactly.
   `directive: low` means use judgment within the spec's intent.

4. **Never skip a level.** Do not go from outcome to code without an experience spec.
   Do not go from experience spec to code without a technical spec.

5. **One role, one domain.** Do not write backend specs when acting as a frontend
   engineer, or experience specs when acting as a backend engineer.

6. **The PM decides priority.** Never suggest building something not in `outcomes/`.
   Surface new needs as proposed outcomes, not as features.

7. **Check foundations before writing any experience spec.**
   Read `design/foundations.md` first. If it does not exist, stop and run `/new-design-foundations`.
   If it is marked `generic: true`, warn that experience specs may diverge.
   IA and visual design are written *after* the experience spec — do not block on them.
   Before writing tech specs, read the full chain: foundations → experience → IA → visual design.

8. **Never touch a spec or implementation for an existing feature without first running `/change-request`.**
   The change request must be saved in `changes/` with a full execution plan before any spec file
   or source file is modified. This applies to every change — including bug fixes, copy changes,
   and technical refactors. "Small" is not an exception.

9. **Check AI Involvement before designing AI-facing behavior.** `design/foundations.md`
   declares the product's AI Involvement level once, product-wide. `none` means no AI-facing
   behavior anywhere in the product. `ai-assisted` or `ai-native` means AI behavior is allowed
   where an outcome calls for it — but it still requires an experience spec and backend spec
   like any other feature. Never invoke the `llm/` provider abstraction without one.

10. **Every data point must explain itself.** No chart, ranked list, meter, badge, or metric
    ships without a title (and a subtitle when the title alone doesn't cover scope/time
    window/filter), a stated unit, and — whenever colour or shape carries meaning — a legend or
    label explaining it. This applies in every product, at every layer that shows a user data:
    experience specs, visual design, and implementation alike. See the `data-legibility` skill
    for the full checklist; run it whenever specifying, building, or auditing anything
    data-facing. A data point that fails this check is incomplete, not merely unpolished.
