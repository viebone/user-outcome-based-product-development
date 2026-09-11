---
name: new-experience
description: Translate an outcome into an experience spec — how the feature feels, looks, and flows (design/{slug}/experience.md). Run after foundations, IA, and visual design are all active. Gate — no tech specs until this exists.
---

# Skill: new-experience
# Role: Designer
# Purpose: Draft an experience spec from an outcome.

You are acting as the Designer role. Your job is to translate an outcome into
an experience spec — describing how the product feels, looks, and flows.
You do not make technical decisions. You do not describe implementation.

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`), not the workspace root. Before proceeding, list the directories under `products/`. If there is only one, use it as the product root. If there are multiple, ask: "Which product are you working on?" and wait for the answer before continuing.

0. **Check design foundations.**
   - Look for `design/foundations.md`.
   - If it **does not exist**: stop and say —
     > ⚠️ No design foundations found. Experience specs written without them tend to
     > diverge from each other over time. Run `/new-design-foundations` first, or
     > confirm you want to proceed without one (at your own risk).
   - If it exists and has `generic: true`: warn —
     > ⚠️ Design foundations are marked generic. This experience spec will not be
     > grounded in product-specific principles — features may feel inconsistent over time.
   - If it exists and is not generic: read it fully before proceeding.

0.5. **Check information architecture.**
   - Look for `design/information-architecture.md`.
   - If it **does not exist**: note this and continue —
     > ℹ️ No information architecture yet. The experience spec will define what structure is
     > needed — run `/new-information-architecture` after this spec is complete.
     > Do not invent zone or section names; use placeholders and note them as open questions.
   - If it exists: read it fully. Use exact terms from the content taxonomy.

0.6. **Check visual design.**
   - Look for `design/visual-design.md`.
   - If it **does not exist**: note this and continue —
     > ℹ️ No visual design spec yet. Describe the experience in terms of tone, hierarchy,
     > and layout intent — not specific tokens. Run `/new-visual-design` after this spec
     > and the IA are complete.
   - If it exists: read it fully. Every visual decision in this spec must follow its rules.

1. Ask which outcome this experience serves, if not specified.
   Read `outcomes/{slug}.md` fully before proceeding.

2. Ask if there are any existing design references, constraints, or visual
   direction to consider (design system, brand guidelines, existing patterns).

3. Draft the experience spec with this exact structure:

   ```
   ---
   id: {slug}
   outcome: {outcome-slug}
   directive: low
   status: draft | ready | implemented
   created: {YYYY-MM-DD}
   ---

   # {Feature Name} — Experience Spec

   ## Outcome this serves
   See: `outcomes/{outcome-slug}.md`

   ## Information Architecture
   <!-- Where this feature lives within the product's navigation model.
        Use exact section names and terms from design/information-architecture.md. -->

   **Location:** {Section name from IA} > {Sub-section if applicable}

   | Zone | Priority | Contains |
   |---|---|---|
   | {Zone name} | Primary | {What lives here} |
   | {Zone name} | Secondary | {What lives here} |

   ## Opening Prompt
   <!-- For agentic/conversational features: the exact prompt the system fires on load.
        State intent, constraints, and delegation boundary explicitly. -->

   ## User Flow
   <!-- Step-by-step. Written from the user's perspective. No technical terms. -->

   1.
   2.
   3.

   ## Visual Design
   <!-- Layout, hierarchy, tone. References visual-design.md tokens. No code. -->

   ## Chart Specification
   <!-- If the feature includes a data visualisation, data-story block, ranked list, meter, or
        any other data-facing surface, specify every visual property: type, title, subtitle,
        axis labels + units, axis tick format, series, colours (and what each one means),
        hover behaviour, loading state, empty state. Run the `data-legibility` skill's
        checklist before considering this section done. -->

   ## Interactions

   | User action | System response |
   |---|---|
   |  |  |

   ## Edge Cases

   ## Evaluation Metrics

   | Metric | How measured | Target |
   |---|---|---|
   | Task completion rate | Usability test | |
   | Time on task | Usability test | |
   | Error rate | Usability test / analytics | |
   | Comprehension accuracy | Post-task question | |

   ## Open Questions
   -
   ```

   Rules:
   - Information Architecture: use exact terms from the IA spec — never invent new section names
   - Visual Design: reference visual-design.md tokens; describe layout and tone, not code
   - Chart Specification: if a chart or any other data-facing block is present, every visual property must be named here — title, subtitle, axis labels and units, colours and what each means, hover — so implementation has no ambiguity and passes `data-legibility`'s checklist
   - User Flow: write from the user's perspective, no technical terms
   - Interactions: cover the happy path and 2–3 most important edge cases

4. Set `directive: low` by default. Only suggest `directive: high` if the
   user expresses very specific, non-negotiable requirements.

5. Show the draft and ask: "Does this capture the experience you have in mind?
   Any interactions, states, or evaluation metrics I'm missing?"

6. Save to `design/{slug}/experience.md`.

7. Confirm: "Experience spec saved. Ready to create frontend and backend specs with
   `/new-frontend-spec` and `/new-backend-spec`."

## Anti-patterns to avoid
- Do not describe components by their technical names (avoid: "a React component", "a modal")
- Do not mention APIs, databases, or data fetching
- Do not skip edge cases — empty states, errors, and loading states are part of the experience
- Do not invent section or zone names that don't appear in the information architecture
- Do not leave evaluation metrics empty
- Do not omit the Chart Specification section if the feature includes any data visualisation
- Do not leave a metric, ranked value, or colour/shape unexplained — see `data-legibility`
