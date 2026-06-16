# User Outcome Based Product Development (UOBPD)

A lightweight framework for building digital products where every decision traces back
to a documented user, market, or business outcome — and where humans decide, at any
moment, how much of the process is automated.

---

## Core Idea

You never say "build a table with these columns."
You say "users need to see all their applications at a glance" — and the system figures out the table.

The framework separates **what and why** (human judgment) from **how** (AI or human execution),
with a clear chain of specs connecting them.

---

## The Spec Chain

```
research/                              raw inputs — interviews, data, market signals
    ↓
outcomes/                              WHY — what users or the business needs to achieve
    ↓
design/foundations.md                  FEEL — product-wide UX principles, design goals + paradigm
    ↓
design/information-architecture.md     STRUCTURE — navigation, taxonomy, key pathways
    ↓
design/{feature}/experience.md         WHAT — user flow, local IA, interactions, evaluation metrics
design/components/                     WHAT (detail) — specific component behavior [optional]
    ↓
frontend/specs/                        HOW (browser) — component architecture, state, data flow
backend/specs/                         HOW (server) — API design, data models, business logic
    ↓
frontend/src/                          implementation
backend/src/                           implementation
```

Each level reads from the one above it. Nothing is built without a spec.

---

## Roles

Every role follows the same pattern:

```
reads  → specs from upstream roles
owns   → a folder in the project
writes → specs for downstream roles
mode   → manual | assisted | autonomous | both
```

Default roles:

| Role | Owns | Decides |
|---|---|---|
| PM | `outcomes/` | What gets built and when |
| Designer | `design/foundations.md`, `design/{feature}/`, `design/components/` | UX principles, design goals, how it feels/looks/flows |
| Frontend | `frontend/specs/` | How it's built in the browser |
| Backend | `backend/specs/` | How it's built on the server |

Roles are not fixed. Add new ones (QA, DevOps, Research, Security...) by defining a
role file in `roles/` and setting its automation level in `.outcome/config.yaml`.

---

## Automation Level

Each role can be set independently in `.outcome/config.yaml`:

```yaml
roles:
  pm:       manual       # human writes outcomes
  designer: assisted     # human writes, AI refines
  frontend: autonomous   # AI specs and implements, human reviews
  backend:  assisted     # human writes specs, AI implements
```

Change this at any time, even per-feature. You decide the level of automation.

---

## The Escape Hatch

By default, AI has creative freedom within a spec (`directive: low`).
When you need precise control, set `directive: high` on any spec — the AI follows it exactly.

Use `directive: high` only when `directive: low` didn't produce what you needed.

---

## Repository Structure

```
user-outcome-based-product-development/   ← open this as your VS Code workspace
│
├── CLAUDE.md                    Framework rules — Claude reads this for every session
├── .claude/
│   └── skills/                  Claude Code skills — process + spec format, all-in-one
│       ├── new-outcome.md
│       ├── new-design-foundations.md
│       ├── new-information-architecture.md
│       ├── new-experience.md
│       ├── new-frontend-spec.md
│       ├── new-backend-spec.md
│       ├── implement-frontend.md
│       └── implement-backend.md
├── roles/                       Role definitions
│   ├── pm.yaml
│   ├── designer.yaml
│   ├── frontend.yaml
│   ├── backend.yaml
│   └── _template.yaml           Copy this to add a new role
├── product-template/            Copy this to start a new product
└── products/
    ├── my-product-a/            ← git repo
    └── my-product-b/            ← git repo
```

**Why this structure:** Claude Code sees `CLAUDE.md` and `.claude/skills/` from every product
session automatically — no copying, no setup per product. MCPs configured globally in
`~/.claude/settings.json` are also available everywhere.

---

## Starting a New Product

```bash
# 1. Create the products folder if it doesn't exist
mkdir -p products

# 2. Copy the product template
cp -r product-template products/my-new-product
cd products/my-new-product
git init

# 3. Fill in CLAUDE.md with your product context and tech stack

# 4. Set automation levels in .outcome/config.yaml

# 5. Open the workspace root (user-outcome-based-product-development/) in VS Code
#    Skills and framework rules load automatically — no extra setup needed.

# 6. Start with an outcome
#    /new-outcome
```

---

## Adding a Future Role

1. Copy `roles/_template.yaml` → `roles/{role-name}.yaml`
2. Fill in what the role reads, owns, writes, and its skills
3. Create its folder in `product-template/`
4. Add skills for it in `.claude/skills/`
5. Add it to `.outcome/config.yaml` with its automation level

The framework core does not change. New roles plug in via the same pattern.

---

## Skills Quick Reference

| Skill | Role | What it does |
|---|---|---|
| `/new-outcome` | PM | Turns raw input into a well-formed outcome file |
| `/new-design-foundations` | Designer | Creates product-wide UX principles, design goals + metrics |
| `/new-information-architecture` | Designer | Defines navigation model, content taxonomy, key pathways |
| `/new-experience` | Designer | Drafts an experience spec from an outcome |
| `/new-frontend-spec` | Frontend | Translates experience spec into frontend architecture |
| `/new-backend-spec` | Backend | Translates experience spec into backend API spec |
| `/implement-frontend` | Frontend | Implements from frontend spec chain |
| `/implement-backend` | Backend | Implements from backend spec chain |

---

## Design Principles

- **Outcomes over features** — describe what is achieved, never what to build
- **Specs as the interface** — roles communicate through files, not direct orders
- **Escape hatches, not walls** — you can always go more directive when needed
- **Roles are pluggable** — any role can be human, AI, or both at any time
- **Light by default** — no tooling required beyond Claude Code and a text editor
