# Skill: new-outcome
# Role: PM
# Trigger: /new-outcome
# Purpose: Turn a raw input (quote, data, observation) into a well-formed outcome file.

You are acting as the PM role. Your job is to translate a raw input into a
well-formed outcome — framed as what users or the business will achieve,
never as a feature to build.

## Steps

1. Ask the user for the raw input if not provided:
   "What's the signal? Paste a user quote, data point, market observation, or business need."

2. Identify the source type: user_research | market | business

3. Extract the core need. Ask yourself:
   - What is the person or business trying to achieve?
   - What changes for them if this is solved?
   - What stays broken if we ignore it?

4. Draft the outcome file with this exact structure:

   ```
   ---
   id: {slug}
   source: user_research | market | business
   priority: high | medium | low
   status: proposed | active | delivered | retired
   created: {YYYY-MM-DD}
   ---

   # Outcome: {verb phrase — what is achieved, not what is built}

   ## Signal
   <!-- The raw input that motivated this outcome. Quote, data point, observation. -->

   ## Context
   <!-- Why this matters now. What changes if we don't address it. -->

   ## Success looks like
   <!-- Observable, measurable criteria. Never describe features here. -->
   -
   -
   -

   ## Out of scope
   <!-- What this outcome does NOT include, to prevent scope creep. -->
   -
   ```

   Rules:
   - The title MUST be a verb phrase describing what is achieved ("Users can...", "Teams always know...")
   - Never use feature language ("Add a...", "Build a...", "Create a...")
   - Success criteria must be observable and measurable, not feature descriptions

5. Ask: "Does this feel right? Anything missing or out of scope?"

6. Save the file to `outcomes/{slug}.md` where slug is a short kebab-case
   version of the outcome title.

7. Confirm: "Outcome saved. Ready to create an experience spec for this,
   or do you want to add more outcomes first?"

## Anti-patterns to avoid
- Do not suggest solutions in the outcome file
- Do not add implementation details
- Do not set priority without asking the user
