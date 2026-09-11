# [Project Name] — Project Instructions

This project follows the **User Outcome Based Product Development (UOBPD)** framework.
See `CLAUDE.md` at the workspace root for the full framework rules. This file adds project-specific context.

---

## Workspace Setup

This project lives inside the UOBPD framework repo, which acts as the VS Code workspace root:

```
user-outcome-based-product-development/   ← open this as your VS Code workspace
├── CLAUDE.md                             ← framework rules (workspace root)
├── .claude/skills/                       ← skills available to all products (spec formats embedded)
├── roles/                                ← role definitions
└── products/
    └── [this project]/                   ← you are here (its own git repo)
```

**Skills** live in `.claude/skills/` at the workspace root and are available in every
product session automatically. To update a skill, edit it there — no copying needed.

**MCPs** are configured globally in `~/.claude/settings.json` and available in every
product session. Project-specific MCP overrides go in this project's `.claude/settings.json`.

**Framework rules** live in `CLAUDE.md` at the workspace root.
Always read that file before making decisions about spec hierarchy, roles, or directive levels.

**Change management**: all changes — new features, bug fixes, feedback, updates — must start
with `/change-request`. Change requests are saved in `changes/` at this product root and serve
as the audit trail for every decision. Nothing moves to specs or implementation without one.

---

## What we're building
<!-- One sentence describing the product and who it's for. -->

## Tech Stack

### Frontend
- Framework: [e.g. React, Vue, Svelte]
- Styling: [e.g. Tailwind, CSS Modules]
- State: [e.g. Zustand, Pinia, Redux]
- HTTP: [e.g. fetch, axios, TanStack Query]

### Backend
- Language/Framework: [e.g. Python/FastAPI, Node/Express, Go]
- Database: [e.g. PostgreSQL, SQLite, MongoDB]
- Auth: [e.g. JWT, sessions, OAuth]

### AI / LLM
- Provider abstraction: `backend/src/llm/` — pre-provisioned, provider-agnostic
  adapters (Gemini, Anthropic, OpenAI) ready to use. Provider and model are
  always declared explicitly at the call site, never hidden behind config.
- Enabled: <!-- set by design/foundations.md → AI Involvement -->

## Running Locally
<!-- Fill in once the tech stack is chosen and the first implementation exists. -->

## Automation Level
See `.outcome/config.yaml` for current role automation settings.

## Active Outcomes
<!-- Keep this updated as outcomes are added/delivered. -->
See `outcomes/` — current active outcomes are marked `status: active`.

## Spec Chain Status
Current state of the spec chain for this product:

| Layer | Status |
|---|---|
| Design Foundations | ⚠️ Not started — run `/new-design-foundations` |
| Experience Specs | ⚠️ Not started — blocked on design foundations |
| Information Architecture | ⚠️ Not started — blocked on first experience spec |
| Visual Design | ⚠️ Not started — blocked on information architecture |
| Backend Specs | ⚠️ Not started — blocked on experience specs |
| Frontend Specs | ⚠️ Not started — blocked on backend specs |

Update this table as each layer is completed.

## Change Log
See `changes/` — every change request is saved here with its signal, outcome reference,
impact map, and skill execution plan. Check here before starting any new change to avoid
duplicating work in progress.

## Key Constraints
<!-- Anything the AI must know to avoid wrong decisions. -->
- 
