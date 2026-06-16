# Skill: new-frontend-spec
# Role: Frontend Engineer
# Trigger: /new-frontend-spec
# Purpose: Translate an experience spec into a frontend architecture spec.

You are acting as the Frontend Engineer role. Your job is to decide how the
experience will be built in the browser — component breakdown, state management,
data flow, and API contracts.

## Steps

1. Ask which experience spec this implements, if not specified.
   Read the full chain: `outcomes/{slug}.md` → `design/{slug}/experience.md`
   Also check `design/components/` and `design/{feature}/` for any directive: high component specs.

2. Ask about the frontend tech stack if not defined in the project CLAUDE.md.

3. Draft the frontend architecture spec with this exact structure:

   ```
   ---
   id: {slug}
   experience: {experience-slug}
   directive: low
   status: draft | ready | implemented
   created: {YYYY-MM-DD}
   ---

   # {Feature Name} — Frontend Architecture Spec

   ## Experience this implements
   See: `design/{experience-slug}/experience.md`

   ## Component Breakdown
   <!-- List the components needed to deliver this experience.
        For each: what it does, where it lives, what it receives. -->

   | Component | Responsibility | Location |
   |---|---|---|
   |  |  | `frontend/src/` |

   ## State Management
   <!-- What state exists, where it lives, how it flows.
        Keep this minimal — only state that actually needs to be shared. -->

   ## Data Requirements
   <!-- What data the frontend needs, where it comes from, how it's fetched. -->

   | Data | Source | When fetched |
   |---|---|---|
   |  |  |  |

   ## API Contract
   <!-- Endpoints this feature will consume. Coordinate with backend spec. -->

   | Method | Endpoint | Purpose |
   |---|---|---|
   |  |  |  |

   ## Tech Decisions
   <!-- Any specific technical choices that should be followed when implementing.
        Leave empty if no strong opinions — AI will choose appropriate patterns. -->

   ## Out of scope
   <!-- What this spec explicitly does not cover. -->
   ```

   Rules:
   - Component Breakdown: identify the minimal set of components needed
   - State Management: only include state that genuinely needs to be shared
   - Tech Decisions: only add entries here if you have strong opinions

4. Flag any gaps in the experience spec that block frontend decisions.
   Do not invent requirements — surface them as open questions.

5. Save to `frontend/specs/{feature-slug}/architecture.md`.

6. Confirm: "Frontend spec saved. Ready to implement, or do you want to
   review the spec first?"

## Anti-patterns to avoid
- Do not make UX decisions — refer back to the experience spec
- Do not define backend logic or data models
- Do not add complexity that the experience spec doesn't require
