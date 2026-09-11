---
name: data-legibility
description: Ensure every data point, chart, metric, colour, and shape shown to a user explains itself — title, subtitle, units, scope, and what a colour or shape means. Use when specifying, building, or auditing any chart, data-story block, ranked list, badge, meter, or metric.
---

# Skill: Data legibility

## Purpose

No data point ships without the reader being able to answer, unaided: what is this number,
what unit is it in, what time window or scope does it cover, and — if colour or shape carries
meaning — what that meaning stands for. This is a **framework-wide principle**, not a
per-product option: every UOBPD product follows it, the same way every product follows the
spec chain itself (see the workspace root `CLAUDE.md` — Rules for AI).

`end-user-content` governs *how* visible copy is worded (plain language, tone, structure).
This skill governs whether a data point is *complete* — the title, unit, scope, and legend it
needs to be read correctly at all, before wording is even a question. Use both together on
anything that shows a user a number.

## The principle

**A user must never have to guess what a number, colour, or shape means.** If a reader would
need to ask "of what?", "in what unit?", "compared to what?", or "why is this one a different
colour?" — the data point is incomplete, regardless of how accurate the underlying number is.

## Concrete rules

### Every chart or chart-like block (a literal chart, a ranked list, a meter, a data-story block)
- Has a **title** naming what it shows.
- Has a **subtitle** whenever the title alone doesn't convey scope, time window, or filter
  (e.g. "Last 12 months", "Companies with a reported name only", "EU + Norway").
- Every axis, column, and value states its **unit** visibly, once — never left to be inferred
  from context or house convention (people, %, USD, events, days).
- A **ranked or listed metric** states explicitly what is being ranked and by what measure — a
  label like "impact" is not a unit; "jobs affected, summed across reported events" is.

### Every colour or shape that carries meaning
- Has a legend, label, or inline caption explaining what it stands for — colour is never the
  only signal (same "pair colour with a text label, never colour alone" rule most product
  visual-design specs already state for status indicators — apply it everywhere, not only
  there).
- A semantic colour (e.g. red = decline, green = growth) states the direction it represents at
  least once per view, not assumed to be self-evident from the palette alone.

### Every metric or number in prose, a summary card, or a badge
- States what it counts, its scope (time window, geography, data source), and what "no value"
  means when applicable.

### Provenance
- When a number depends on a specific data source, or is scoped to less than "everything," the
  source/scope is named near the number itself, not only inside a separate reasoning/provenance
  panel — a passing reader must not have to dig for it to avoid misreading the headline.

## Checklist — apply before a data-facing spec or feature is considered done

- [ ] Does every chart/visualisation have a title?
- [ ] Does it have a subtitle wherever the title alone omits time window, scope, or filter?
- [ ] Does every axis/column/value name its unit?
- [ ] Does every ranked or listed metric state what is being measured, not just a bare label?
- [ ] Does every colour or shape used for meaning have a legend or inline explanation?
- [ ] Would a first-time reader, with no other context, correctly restate what a random data
      point on this view means?

If the last answer is no, the spec or implementation is not done.

## Where this plugs into the spec chain

- **`new-experience`**: the Chart Specification section — and any data-story/ranked-list/meter
  block — must pass this checklist before the spec is complete.
- **`new-visual-design`**: states the product's title/subtitle convention, unit-formatting
  convention, and legend pattern once, product-wide (Data Legibility section), so every
  experience spec inherits it rather than reinventing it per feature.
- **`implement-frontend`** / **`implement-backend`**: the self-check step includes this
  checklist before reporting a feature as built.
- **`change-request`**: a data point found to violate this principle in an already-shipped
  feature is triaged like any other change — `bug-fix` if a spec already required this and the
  implementation skipped it, `ux-change` if the spec itself needs a title/subtitle/legend/unit
  decision it never made. Never patched silently outside the change process.

## Anti-patterns to avoid

- Shipping a chart or ranked list with a metric label but no unit (e.g. "Companies with the
  most reported impact" — impact in what: jobs affected? filings? currency?).
- Relying on colour alone to carry meaning, with no legend or label nearby.
- Assuming "everyone on the team knows what this means" — the audience is the end user, not the
  people who built it.
- Burying the scope or source of a number only in a separate detail panel when it changes how
  the headline number should be read.
