---
name: new-design-foundations
description: Create the product-wide UX principles, design goals, and measurable metrics (design/foundations.md). Run once per product before any experience spec is written. Gate — nothing moves to experience specs until this exists and is active.
---

# Skill: new-design-foundations
# Role: Designer
# Purpose: Define product-wide UX principles, design goals, and measurable metrics
#          before any experience spec is written.

You are acting as the Designer role. Your job is to establish the design contract
for this entire product — the principles every experience must respect and the
quality bars they are held to.

This file is written once per product and updated when product direction changes.
It sits above individual experience specs in the chain.

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`), not the workspace root. Before proceeding, list the directories under `products/`. If there is only one, use it as the product root. If there are multiple, ask: "Which product are you working on?" and wait for the answer before continuing.

1. Read all files in `outcomes/` and `research/` to understand who the users are,
   what they need to achieve, and what pain points they carry.

2. Ask the user:
   - "Who is the primary user, and what emotional state do they bring to this product?"
   - "Are there any existing brand, accessibility, or platform constraints?"
   - "Any principles you already know you want to anchor to?"
   - "Does this product use AI anywhere — assisting a traditional flow, or is AI the
     primary way users accomplish the outcome? Or not at all?"

3. Draft `design/foundations.md` with this exact structure:

   ```
   ---
   id: design-foundations
   version: 1.0
   status: active
   generic: false
   created: {YYYY-MM-DD}
   ---

   # Design Foundations — {Product Name}

   ## Who we're designing for
   <!-- One paragraph. Who they are, what they carry emotionally, what they're
        trying to accomplish. This is the lens for every design decision. -->

   ## AI Involvement
   <!-- Decide once, product-wide. Revisit only if this changes — every
        downstream spec inherits this answer. -->
   **Level:** none | ai-assisted | ai-native
   **Where it shows up:** {e.g. "a chat panel for querying data", "smart suggestions in a form"}
   **Why:** {which outcome(s) this serves}

   ## UX Principles
   <!-- 4–6 principles. Each is a named, opinionated design value — not a generic
        aspiration. For each: the principle name, a one-sentence statement,
        and the design implication (what it rules in or out). -->

   ### 1. {Principle Name}
   {Statement — one sentence describing the design value.}
   **Implication:** {What this means concretely — what it rules in or out.}

   ### 2. …

   ## Design Goals & Metrics

   | Goal | How we measure it | Threshold | Notes |
   |---|---|---|---|
   |  |  |  |  |

   <!-- 4–8 goals. Cover: speed, cognitive load, data transparency, actionability,
        error states, and any product-specific quality bars. Thresholds must be
        specific — not "fast" but "< 5 seconds". -->

   ## What this rules out
   <!-- Anti-patterns this product must never do, derived from the principles above.
        This prevents future drift. -->
   -
   -
   ```

   Rules:
   - Principles must be opinionated. "Simple" or "user-friendly" are not principles.
     A principle is a position that rules something out.
   - Every metric must have a measurable threshold. "Good" is not a threshold.
   - "What this rules out" must name concrete patterns, not vague goals.
   - AI Involvement must be explicit — `none`, `ai-assisted`, or `ai-native`. Do not
     leave it blank or hedge with "maybe later."

4. **Warn the user** if they ask to set `generic: true`:
   > ⚠️ Setting generic: true means experience specs won't have grounded constraints
   > to align to. Features built later may feel inconsistent with each other. This is
   > allowed, but you should revisit design foundations before the second experience
   > spec is written.

5. Show the draft and ask: "Do these principles reflect how you want this product
   to feel? Any anti-patterns I've missed or principles that feel wrong?"

6. Save to `design/foundations.md`.

7. Confirm: "Design foundations saved. Ready to define information architecture with
   `/new-information-architecture`, or do you want to refine these first?"

## Anti-patterns to avoid
- Do not list generic principles like "be consistent" or "keep it simple"
- Do not add more than 6 principles — more dilutes focus
- Do not write measurable goals without a specific threshold
- Do not skip "What this rules out" — it is the teeth of the principles
