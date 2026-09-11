---
name: end-user-content
description: Write and review visible product content for end users in plain, friendly, business-oriented language. Use for UX copy, data-story narratives, labels, empty states, and concise explanations.
---

# Skill: End-user content

## Purpose

Create visible product content that helps a real user understand a situation and decide what
to do next. Content should feel like a clear colleague explaining the signal, not like a system
describing its implementation.

This skill governs *wording and tone*. Whether the data point has the title, subtitle, unit, or
legend it needs to be read correctly at all is `data-legibility`'s job — use both together on
anything that shows a user a number.

## Audience-first rules

- Start with the user's decision, not the data structure.
- Use plain words a capable professional would use in conversation.
- Prefer "jobs we found" over "records ingested" and "companies we track" over "source rows".
- Explain what a number means before adding supporting detail.
- State the relevant time window and coverage limit without making the user decode it.
- Be useful to a business decision: what is happening, how confident we can be, and what is
  worth looking at next.

## Tone

- Friendly, calm, direct, and respectful.
- Business-oriented without sounding like marketing copy.
- Specific without sounding certain beyond the evidence.
- Neutral when the data is incomplete or mixed.

## Structure

For a data story, use this order:

1. One-sentence headline read.
2. Two or three supporting facts with simple labels.
3. One short coverage or limitation note.
4. Optional next step or question, only when the experience calls for it.

Keep the default visible answer short. Put detailed fields, query names, table names, model
names, and extraction mechanics behind the product's transparency surface.

## Language rules

- Avoid implementation terms such as API, endpoint, database, schema, row, query, ingestion,
  adapter, classification, model, token, pipeline, and LLM in visible copy.
- Avoid unexplained acronyms and internal taxonomy names.
- Use "about", "so far", and "in the roles we track" when precision requires a qualifier.
- Use proportions only with their denominator or sample context.
- Never turn missing data into a guess.
- Do not use urgency, verdict labels, or recommendations unless the approved experience asks
  for them.
- Use sentence case for headings and labels.

## Data-story review checklist

- Can the user understand the main point in under 15 seconds?
- Does the opening sentence answer "so what?" at a high level?
- Does every number have a time window or coverage qualifier where needed?
- Is the visible language free of implementation terminology?
- Are unknowns and limitations stated calmly?
- Is detailed provenance still available elsewhere in the experience?