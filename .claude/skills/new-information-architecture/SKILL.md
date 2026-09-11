---
name: new-information-architecture
description: Define the product's navigation model, content taxonomy, key pathways, and entry points (design/information-architecture.md). Run once per product after design foundations are complete, before any experience spec is written.
---

# Skill: new-information-architecture
# Role: Designer
# Purpose: Define the product's navigation model, content taxonomy, key pathways,
#          and entry points before any experience spec is written.

You are acting as the Designer role. Your job is to establish the structural skeleton
of the product — how it is organised, how users move through it, and how information
is named and grouped across the whole product.

This file is written once per product and updated when the product structure changes.
Individual experience specs define local IA for a single feature; this defines what
they hang on.

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`), not the workspace root. Before proceeding, list the directories under `products/`. If there is only one, use it as the product root. If there are multiple, ask: "Which product are you working on?" and wait for the answer before continuing.

1. Check that `design/foundations.md` exists and is not in `draft` status.
   If it does not exist or is still a draft, stop and say:
   > ⚠️ Design foundations must be complete before defining information architecture.
   > Run `/new-design-foundations` first.

2. Read `design/foundations.md` fully — especially the Product Paradigm section.
   Read all files in `outcomes/` to understand the scope of what the product must support.

3. Ask the user:
   - "What are the main areas or jobs-to-be-done this product covers?"
   - "Are there any navigation patterns already decided (sidebar, top nav, hub-and-spoke)?"
   - "Will any sections be role-gated or conditionally shown?"

4. Draft `design/information-architecture.md` with this exact structure:

   ```
   ---
   id: information-architecture
   version: 1.0
   status: draft | active
   created: {YYYY-MM-DD}
   ---

   # Information Architecture — {Product Name}

   ## Navigation Model
   <!-- The top-level sections of the product, their hierarchy, and the persistent
        navigation elements. Name each section and describe what it contains.
        Include a simple hierarchy diagram if sections nest. -->

   ## Content Taxonomy
   <!-- How information is named and grouped across the product. Define the key
        content types and the vocabulary the product uses for them consistently. -->

   | Term | Definition | Where it appears |
   |---|---|---|
   |  |  |  |

   ## Key Pathways
   <!-- The 3–5 primary journeys users take across sections. Write each as a
        linear sequence of steps. Name the trigger and the end state. -->

   1. {Trigger} → {Step} → {Step} → {End state}
   2.
   3.

   ## Entry Points
   <!-- Where users land and how they orient themselves. Cover: direct navigation,
        notification/alert deep-links, conversational entry (if applicable). -->

   -
   ```

   Rules:
   - Navigation model: name every top-level section; one sentence on what it contains
   - Content taxonomy: every term that will appear as a label, heading, or status must be defined here — downstream specs must use these exact terms
   - Key pathways: cover the journeys that cross section boundaries; single-section flows belong in experience specs
   - Entry points: if the product has a conversational or agentic entry, describe how orientation works from there

5. Show the draft and ask: "Does this reflect how you see the product organised?
   Any sections missing, renamed, or reordered?"

6. Save to `design/information-architecture.md` and set `status: active`.

7. Confirm: "Information architecture saved. Ready to define visual design with
   `/new-visual-design`, or do you want to refine this first?"

## Anti-patterns to avoid
- Do not define per-feature layout here — that belongs in individual experience specs
- Do not invent section names that differ from what the outcomes and design foundations imply
- Do not leave the content taxonomy empty — every label used across the product must be defined here
- Do not skip entry points for agentic or conversational products — how the user orients from a conversation start is part of the IA
