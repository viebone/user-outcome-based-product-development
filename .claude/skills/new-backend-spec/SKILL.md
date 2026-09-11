---
name: new-backend-spec
description: Translate an experience spec into a backend architecture spec — data models, API endpoints, and business logic (backend/specs/{slug}/api.md). Run after the experience spec is ready, in parallel with new-frontend-spec.
---

# Skill: new-backend-spec
# Role: Backend Engineer
# Purpose: Translate an experience spec into a backend architecture spec.

You are acting as the Backend Engineer role. Your job is to decide how the
experience will be built on the server — data models, API endpoints,
and business logic.

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`), not the workspace root. Before proceeding, list the directories under `products/`. If there is only one, use it as the product root. If there are multiple, ask: "Which product are you working on?" and wait for the answer before continuing.

1. Ask which experience spec this implements, if not specified.
   Read the full chain: `outcomes/{slug}.md` → `design/{slug}/experience.md`
   → `design/foundations.md` (check the **AI Involvement** field).

2. Ask about the backend tech stack if not defined in the project CLAUDE.md.

3. Draft the backend architecture spec with this exact structure:

   ```
   ---
   id: {slug}
   experience: {experience-slug}
   directive: low
   status: draft | ready | implemented
   created: {YYYY-MM-DD}
   ---

   # {Feature Name} — Backend Architecture Spec

   ## Experience this implements
   See: `design/{experience-slug}/experience.md`

   ## Data Models
   <!-- Entities needed for this feature. Describe fields and relationships.
        No need for exact SQL unless directive: high. -->

   ### {ModelName}
   | Field | Type | Description |
   |---|---|---|
   |  |  |  |

   ## API Endpoints
   <!-- All endpoints this feature exposes. -->

   ### {METHOD} /path
   **Purpose**:
   **Auth required**: yes | no
   **Request**:
   ```json
   {}
   ```
   **Response**:
   ```json
   {}
   ```
   **Errors**:
   | Code | Reason |
   |---|---|
   |  |  |

   ## Business Logic
   <!-- Rules, validations, and decisions the backend enforces.
        This is where domain logic lives — not in the frontend. -->

   ## External Dependencies
   <!-- Third-party services, queues, storage, or other systems this feature touches. -->

   ## Tech Decisions
   <!-- Specific technical choices to follow during implementation.
        Leave empty if no strong opinions. -->
   ```

   Rules:
   - Data Models: describe entities and relationships, not exact SQL (unless directive: high)
   - API Endpoints: one section per endpoint with request/response shape
   - Business Logic: rules and validations the server enforces
   - If the experience spec calls for AI-facing behavior, confirm `design/foundations.md`
     AI Involvement is not `none`, then wire into the existing `backend/src/llm/` provider
     abstraction — name the provider and model explicitly under Tech Decisions (e.g.
     `providers.gemini("gemini-2.5-flash")`) rather than inventing a new client.

4. Coordinate the API contract with the frontend spec:
   Check `frontend/specs/{feature}/architecture.md` if it exists.
   Align on endpoint paths and response shapes.

5. Save to `backend/specs/{feature-slug}/api.md`.

6. Confirm: "Backend spec saved. Ready to implement with `/implement-backend`,
   or do you want to review the spec first?"

## Anti-patterns to avoid
- Do not make UX or visual decisions
- Do not duplicate business logic in the frontend
- Do not design for hypothetical future requirements — implement what the spec needs
