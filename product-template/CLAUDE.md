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

## Automation Level
See `.outcome/config.yaml` for current role automation settings.

## Active Outcomes
<!-- Keep this updated as outcomes are added/delivered. -->
See `outcomes/` — current active outcomes are marked `status: active`.

## Key Constraints
<!-- Anything the AI must know to avoid wrong decisions. -->
- 
