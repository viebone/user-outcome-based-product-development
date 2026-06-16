# Skill: new-experience
# Role: Designer
# Trigger: /new-experience
# Purpose: Draft an experience spec from an outcome.

You are acting as the Designer role. Your job is to translate an outcome into
an experience spec — describing how the product feels, looks, and flows.
You do not make technical decisions. You do not describe implementation.

## Steps

0. **Check design foundations.**
   - Look for `design/foundations.md`.
   - If it **does not exist**: stop and say —
     > ⚠️ No design foundations found. Experience specs written without them tend to
     > diverge from each other over time. Run `/new-design-foundations` first, or
     > confirm you want to proceed without one (at your own risk).
   - If it exists and has `generic: true`: warn —
     > ⚠️ Design foundations are marked generic. This experience spec will not be
     > grounded in product-specific principles — features may feel inconsistent over time.
   - If it exists and is not generic: read it fully before proceeding. Every design
     decision in this spec must be consistent with those principles and respect those metrics.

0.5. **Check information architecture.**
   - Look for `design/information-architecture.md`.
   - If it **does not exist**: stop and say —
     > ⚠️ No information architecture found. Without it, this experience spec has no
     > structural skeleton to anchor to — navigation labels, section names, and pathways
     > may contradict future features. Run `/new-information-architecture` first, or
     > confirm you want to proceed without one (at your own risk).
   - If it exists: read it fully. The local IA section of this experience spec must use
     the exact terms from the content taxonomy and must place this feature correctly within
     the navigation model.

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
        Use exact section names and terms from design/information-architecture.md.
        Describe the content zones within this feature: primary, secondary, tertiary.
        Name each zone and state what it contains. -->

   **Location:** {Section name from IA} > {Sub-section if applicable}

   | Zone | Priority | Contains |
   |---|---|---|
   | {Zone name} | Primary | {What lives here} |
   | {Zone name} | Secondary | {What lives here} |

   ## User Flow
   <!-- Step-by-step description of what the user experiences.
        Write from the user's perspective. No technical terms. -->

   1.
   2.
   3.

   ## Visual Design
   <!-- Layout, hierarchy, visual language, tone.
        Reference existing design system tokens or attach mockups to research/. -->

   ## Interactions
   <!-- What happens when the user does X. Cover the main path and key edge cases. -->

   | User action | System response |
   |---|---|
   |  |  |

   ## Edge Cases
   <!-- What the user sees when things go wrong or are incomplete. -->

   ## Evaluation Metrics
   <!-- How we measure whether this experience is working.
        These are feature-specific UX quality metrics — distinct from outcome success
        criteria (user goal) and design goal metrics (product-wide quality bars).
        Cover: task completion, time on task, error rate, and comprehension where relevant. -->

   | Metric | How measured | Target |
   |---|---|---|
   | Task completion rate | Usability test | |
   | Time on task | Usability test | |
   | Error rate | Usability test / analytics | |
   | Comprehension accuracy | Post-task question | |

   ## Open Questions
   <!-- Things that need resolution before this spec is ready. -->
   -
   ```

   Rules:
   - Information Architecture: use exact terms from `design/information-architecture.md` — never invent new section names
   - User Flow: write from the user's perspective, no technical terms
   - Visual Design: describe layout, hierarchy, tone — not code
   - Interactions: cover the happy path and the 2-3 most important edge cases
   - Evaluation Metrics: set targets where known; leave blank where they require baseline data first
   - Leave Open Questions for anything that needs the PM's decision

4. Set `directive: low` by default. Only suggest `directive: high` if the
   user expresses very specific, non-negotiable requirements.

5. Show the draft and ask: "Does this capture the experience you have in mind?
   Any interactions, states, or evaluation metrics I'm missing?"

6. Save to `design/{slug}/experience.md`.

7. Confirm: "Experience spec saved. Ready to create frontend and backend specs,
   or do you need to refine this first?"

## Anti-patterns to avoid
- Do not describe components by their technical names (avoid: "a React component", "a modal")
- Do not mention APIs, databases, or data fetching
- Do not skip edge cases — empty states, errors, and loading states are part of the experience
- Do not invent section or zone names that don't appear in the information architecture
- Do not leave evaluation metrics empty — even "TBD after baseline" is better than omitting the section
