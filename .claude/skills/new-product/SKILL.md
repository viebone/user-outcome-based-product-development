---
name: new-product
description: Scaffold a brand-new product from product-template and walk it through the entire spec chain — first research signal, first outcome, design foundations, experience spec, information architecture, visual design, backend spec, frontend spec, backend implementation, frontend implementation. Use when starting an entirely new product in this framework, not for changes to an existing one.
---

# Skill: new-product
# Role: Orchestrator — spans PM → Designer → Backend Engineer → Frontend Engineer
# Purpose: Take a new product idea from nothing to a working first slice, in order,
#          by scaffolding the product and then driving the framework's own skills
#          through the canonical chain end to end.

You are acting as the orchestrator for a brand-new product. Unlike every other skill,
you are not confined to one role's domain — your job is to set the product up correctly
and then hand off to each role's own skill, one gate at a time, exactly as documented in
the workspace root `CLAUDE.md` under "How to Build a Feature."

**This skill does not replace the individual skills.** It sequences them. Each stage
below is still executed by invoking the real skill (`/new-outcome`, `/new-experience`,
etc.), which asks its own questions and writes its own file. Do not shortcut a stage by
drafting its file yourself.

---

## Steps

### Step 0 — Name and locate the product

1. List the `products/` directory (create it if it doesn't exist).
2. Ask, if not already provided: "What's the product called, and in one sentence, what
   does it do and who is it for?"
3. Derive a kebab-case slug from the name. Check `products/{slug}` doesn't already exist.
   - If it does exist, stop: "`products/{slug}` already exists. If you want to continue
     that product, use `/new-outcome`, `/change-request`, or whichever stage it's at —
     not `/new-product`."

### Step 1 — Scaffold the product folder

1. Copy `product-template/` to `products/{slug}/`, preserving everything: `CLAUDE.md`,
   `.outcome/config.yaml`, `design/foundations.md`, `design/information-architecture.md`,
   `design/visual-design.md`, `outcomes/`, `research/`, `frontend/`, and `backend/`
   (including the pre-provisioned AI provider abstraction in `backend/src/llm/`).
2. Initialize it as its own git repository: `cd products/{slug} && git init`. Products are
   independent repos nested under the framework repo — the root `.gitignore` already
   excludes `products/` so this never collides with the framework's own history.
3. Do **not** create or push to a remote. That's a separate, user-owned decision — ask
   about it in Step 7, at the end, not now.

### Step 2 — Fill in product identity

Ask, one at a time:
- "One sentence: what are you building, and who is it for?" → `## What we're building`
- "What's the frontend stack — framework, styling, state management, HTTP client? Say
  'undecided' for any of these if you don't know yet." → `## Tech Stack → Frontend`
- "What's the backend stack — language/framework, database, auth?" → `## Tech Stack → Backend`
- "Do you already know whether this product will use AI, or is that a decision for
  later?" (It's fine to defer — the real answer is decided in `design/foundations.md`
  during Step 6.2. This is just a placeholder note for the AI/LLM tech stack line.)

Fill in `products/{slug}/CLAUDE.md`:
- `## What we're building`
- `## Tech Stack` (Frontend, Backend, AI/LLM subsections)
Leave `## Running Locally` and `## Key Constraints` for later — they get filled once
there's something to run and any hard constraints have surfaced.

### Step 3 — Set automation levels

Show the default from `product-template/.outcome/config.yaml`
(`pm: manual, designer: assisted, frontend: assisted, backend: assisted`) and ask:
"Keep these defaults, or change any role's automation level for this product?"
(`manual` | `assisted` | `autonomous` | `both` — see the comments in the file for what
each means.) Write the result to `products/{slug}/.outcome/config.yaml`.

### Step 4 — Capture the first research signal

Ask: "What's the first signal for this product? A user quote, a market observation, a
business need — whatever made you want to build this."

Save it to `products/{slug}/research/{YYYY-MM-DD}-{slug}.md`:

```
source: user-feedback | bug | stakeholder-request | market-signal | internal
date: {YYYY-MM-DD}

{raw input — paste exactly as received}
```

Every outcome must trace to a signal — this is the first one, and it feeds directly into
`/new-outcome` in Step 6.1.

### Step 5 — Confirm the plan and initialize progress tracking

Show the user the full sequence you're about to run:

1. `/new-outcome` — turn the Step 4 signal into the product's first outcome
2. `/new-design-foundations` — product-wide UX principles
3. `/new-experience` — first feature's experience spec
4. `/new-information-architecture` — product-wide navigation and taxonomy
5. `/new-visual-design` — product-wide visual language
6. `/new-backend-spec` — backend contract for the first feature
7. `/new-frontend-spec` — frontend architecture for the first feature
8. `/implement-backend` — server-side implementation
9. `/implement-frontend` — browser-side implementation

Confirm the `## Spec Chain Status` table already in `products/{slug}/CLAUDE.md` (copied
from the template) reflects "Not started" for every layer — this is what you'll update as
each gate completes.

Ask: "Ready to run the full chain now, stage by stage — or would you rather stop here and
run these yourself later?" If they want to stop, tell them to resume with `/new-outcome`
whenever ready, and end here.

### Step 6 — Run the chain, one gate at a time

For each stage in the sequence above:

1. Say which stage is starting and why it comes next (one sentence).
2. Invoke the real skill for that stage. Since `products/` may now contain more than one
   product, if the invoked skill asks "which product are you working on," answer with
   `{slug}` — don't let it guess.
3. Let the skill run its own questions and save its own file. Do not pre-fill or skip its
   questions on the user's behalf.
4. When it finishes, update the matching row in `products/{slug}/CLAUDE.md`'s
   `## Spec Chain Status` table from "⚠️ Not started" to "✅ Done".
5. Ask: "Continue to the next stage (`/{next-skill}`), or pause here?" If they pause,
   stop and tell them exactly which skill resumes the chain, and note that `/new-product`
   should not be re-run for this product — later stages resume with their own skill, or
   with `/change-request` once the first slice is live.

Special notes for two stages:
- **Step 6.2 (`/new-design-foundations`)**: this is where **AI Involvement** gets decided
  (`none` / `ai-assisted` / `ai-native`). Make sure it doesn't get skipped or left blank —
  it determines whether Steps 6.6–6.9 touch `backend/src/llm/` at all.
- **Step 6.6 (`/new-backend-spec`)**: if AI Involvement is not `none` and the experience
  spec calls for AI-facing behavior, the backend spec should wire into the existing
  `backend/src/llm/` provider abstraction rather than proposing a new one.

### Step 7 — Wrap up

Once `/implement-frontend` finishes:

1. Ask what commands run the backend and frontend locally, and fill in
   `## Running Locally` in `products/{slug}/CLAUDE.md` (mirror the structure used by
   other products in `products/` if any exist, for consistency).
2. Ask: "Want to connect this to a remote git repo now, or leave it local for now?" Only
   add or push to a remote if they explicitly say yes — never do this automatically.
3. Report what was built: the product's path, the outcome delivered, and the current
   `## Spec Chain Status`. From here on, all further changes to this product go through
   `/change-request` — not `/new-product`.

---

## Anti-patterns to avoid

- Do not draft any spec file yourself — always invoke the real skill for that stage.
- Do not invent the product name, tech stack, or automation levels — always ask.
- Do not scaffold a product folder that collides with an existing one.
- Do not skip capturing the first research signal — the first outcome must trace to one.
- Do not create a remote repository or push without explicit confirmation.
- Do not let a stage's skill guess which product it's working on if more than one exists
  under `products/` — always supply `{slug}` explicitly.
- Do not treat a pause mid-chain as failure — stopping after any completed stage is a
  valid outcome; just leave the Spec Chain Status table accurate so resuming is obvious.
