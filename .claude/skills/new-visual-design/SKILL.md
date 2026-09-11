---
name: new-visual-design
description: Define the product's visual language — colour system, typography, spacing, component aesthetics, and motion rules (design/visual-design.md). Run once per product after foundations and IA are complete, before any experience spec is written.
---

# Skill: new-visual-design
# Role: Designer
# Purpose: Define the product's complete visual language before any experience spec is written.

You are acting as the Designer role. Your job is to establish the visual contract
for this entire product — the colour system, type scale, spacing, component
aesthetics, and motion rules that every experience spec and implementation must follow.

This file is written once per product and revisited when the visual direction changes.
It sits between information architecture and experience specs in the chain.

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`), not the workspace root. Before proceeding, list the directories under `products/`. If there is only one, use it as the product root. If there are multiple, ask: "Which product are you working on?" and wait for the answer before continuing.

**Step 0 — Verify prerequisites**
Check that `design/foundations.md` exists and has `status: active`.
Check that `design/information-architecture.md` exists and has `status: active`.
If either is missing or not active, stop. Prompt the Designer to complete it first.

**Step 1 — Read foundations and IA**
Read `design/foundations.md` in full.
Read `design/information-architecture.md` in full.
The visual design must express the UX principles from foundations and fit the structural zones defined in the IA. Colour, type, and spacing choices are not neutral — they must reinforce what the product is trying to feel like.

**Step 2 — Define the colour system**
Choose a primary palette, surface colours, and semantic colours (success, warning, error, neutral).
State whether the product is dark-first, light-first, or both.
Define the exact values used — not ranges. Decisions, not options.

**Step 3 — Define typography**
Choose the typeface(s), scale, weights, and line heights.
Define heading, body, label, and caption styles by name.
State the base size and the scale ratio.

**Step 4 — Define spacing**
Choose a base unit and the spacing scale derived from it.
State which spacing tokens map to which roles (component padding, section gaps, page margins).

**Step 5 — Define component aesthetics**
Describe the visual character of the product's core surfaces: cards, panels, inputs, buttons, modals, dividers.
Include border radius, shadow approach, and elevation model.
These are not component specs — they are the aesthetic rules that all component specs must follow.

**Step 6 — Define motion and animation**
State the default easing curve and duration for transitions.
Name what types of motion are allowed and which are not.
Keep this short — most products need only 2–3 rules.

**Step 6.5 — Define data legibility standards**
Run the `data-legibility` skill. State, product-wide, once: the title/subtitle convention for
charts and data-story blocks, how units are formatted (e.g. "1,234 jobs", "€1.2M", "42%"), and
the legend/label convention for any colour or shape that carries meaning (how a semantic colour
is paired with a text label, where the legend lives). This is what every experience spec's
Chart Specification section inherits — decide it once here, not per feature.

**Step 7 — State what this rules out**
List visual anti-patterns this product must never use. Be specific.

**Step 8 — Save**
Write the completed spec to `design/visual-design.md`.
Set `status: active` only when the spec is complete enough to write experience specs against.

## Output format

```yaml
---
id: visual-design
version: 1.0
status: active
created: YYYY-MM-DD
---

# Visual Design — [Product Name]

## Colour System

### Mode
<!-- dark-first | light-first | both -->

### Palette
<!-- Surface, background, border, text, and accent colours with exact values -->

### Semantic colours
<!-- success, warning, error, neutral — exact values -->

## Typography

### Typeface
<!-- Family name(s), fallback stack -->

### Scale
| Role | Tailwind class | Size | Weight | Line height | Used for |
|---|---|---|---|---|---|
| Page title | | | | | |
| Section heading | | | | | |
| Body | | | | | |
| Label | | | | | |
| Caption | | | | | |

## Spacing

### Base unit
<!-- e.g. 4px — all spacing is a multiple of this -->

### Scale
| Token | Tailwind | Value | Used for |
|---|---|---|---|
| xs | | | |
| sm | | | |
| md | | | |
| lg | | | |
| xl | | | |

## Layout

### Column structure
| Zone | Width | Behaviour |
|---|---|---|
| | | |

## Component Aesthetics

### Surfaces
<!-- Cards, panels, modals — background colour, border, radius, shadow -->

### Message bubbles
<!-- AI turn and user turn styles -->

### Inputs
<!-- Background, border, focus state, placeholder style -->

### Buttons
<!-- Primary, ghost, tab/range selector -->

### Dividers
<!-- Colour and weight used to separate zones and sections -->

## Motion

### Default transition
<!-- Duration and easing for all standard transitions -->

### Loading states
<!-- Skeleton, streaming dots, spinner — when to use each -->

### Allowed motion types
<!-- List what is permitted -->

### Not allowed
<!-- List what is prohibited -->

## Data Legibility
<!-- Run the `data-legibility` skill first. Every chart, data-story block, ranked list, meter,
     and badge in this product must inherit these conventions — decided once here, not
     reinvented per experience spec. -->

### Titles & subtitles
<!-- When is a subtitle required (scope/time window/filter not obvious from the title alone)?
     Any standard phrasing, e.g. "Last {N} days", "{Source} only"? -->

### Units
<!-- How is every unit type formatted product-wide: counts, currency, percentages, dates,
     durations? One consistent format per unit type, not decided ad hoc per chart. -->

### Colour & shape legends
<!-- How is a semantic colour or shape always paired with a text label? Where does the legend
     live (inline, a caption, a fixed key)? Colour is never the only signal — state how this
     product enforces that. -->

## What this rules out
<!-- Visual anti-patterns this product must never use. Be specific. -->
```
