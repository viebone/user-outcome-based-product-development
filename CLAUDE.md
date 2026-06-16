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
design/information-architecture.md     ← STRUCTURE — navigation, taxonomy, key pathways (product-wide)
    ↓
design/{feature}/experience.md         ← WHAT — user flow, local IA, interactions, evaluation metrics
design/components/                     ← WHAT (detail) — specific component behavior (optional)
    ↓
frontend/specs/                        ← HOW (browser) — component architecture, state, data flow
backend/specs/                         ← HOW (server) — API design, data models, business logic
    ↓
frontend/src/                          ← implementation
backend/src/                           ← implementation
```

`design/foundations.md` and `design/information-architecture.md` are each written
**once per product** before any experience spec. Together they define the design contract
and structural skeleton that every experience spec must respect.

**Before implementing anything, always read up the full chain.**
If you are implementing a frontend feature, read:
`outcomes/{slug}` → `design/foundations.md` → `design/information-architecture.md`
→ `design/{feature}/experience.md` → `frontend/specs/{feature}/architecture.md`

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
- **Owns**: `design/foundations.md`, `design/information-architecture.md`, `design/{feature}/`, `design/components/`
- **Writes**: design foundations (once per product), information architecture (once per product), experience specs, component specs
- **Decides**: UX principles, design goals, product paradigm, navigation structure, content taxonomy, how it feels, looks, and flows

### Frontend Engineer
- **Reads**: `design/{feature}/experience.md`
- **Owns**: `frontend/specs/`
- **Writes**: frontend architecture specs
- **Decides**: component breakdown, state management, data flow

### Backend Engineer
- **Reads**: `design/{feature}/experience.md`
- **Owns**: `backend/specs/`
- **Writes**: API and data model specs
- **Decides**: endpoints, models, business logic

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
3. **Run `/new-design-foundations`** — Designer sets the product-wide UX principles, design goals, and metrics.
   Gate: must exist before any experience spec is written. Run once per product, revisit when the product
   direction changes. Skipping or using a generic placeholder is allowed but carries risk — experience specs
   written without grounded principles tend to diverge from each other over time.
4. **Run `/new-information-architecture`** — Designer defines the product's navigation model, content taxonomy,
   and key pathways. Gate: must exist before any experience spec is written. Run once per product, updated
   when the product structure changes. Experience specs define local IA for a single feature; this defines
   the skeleton they all hang on.
5. **Run `/new-experience`** — Designer turns the outcome into an experience spec, guided by design foundations
   and IA. Gate: no tech decisions until this exists.
6. **Run `/new-frontend-spec` and `/new-backend-spec`** — Engineers turn the experience into technical specs.
   Can happen in parallel.
7. **Run `/implement-frontend` and `/implement-backend`** — Build exactly what the specs say. Nothing invented.

Each step must be complete before the next begins. The first shippable slice is one outcome → design foundations → information architecture → one experience spec → two technical specs → implementation.

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

7. **Check design foundations and information architecture before writing any experience spec.**
   Read `design/foundations.md` and `design/information-architecture.md` first.
   If either does not exist, stop and prompt the Designer to create it
   (`/new-design-foundations` or `/new-information-architecture`).
   If design foundations is marked `generic: true`, warn that experience specs may diverge.
