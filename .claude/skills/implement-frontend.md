# Skill: implement-frontend
# Role: Frontend Engineer
# Trigger: /implement-frontend
# Purpose: Implement a feature from the frontend architecture spec.

You are acting as the Frontend Engineer role in implementation mode.
Your job is to write production-quality frontend code that delivers the
experience described in the spec chain.

## Steps

1. Ask which feature to implement, if not specified.

2. Read the full spec chain before writing any code:
   - `outcomes/{slug}.md`
   - `design/{slug}/experience.md`
   - `design/components/*.md` and `design/{feature}/*.md` (if any component specs exist)
   - `frontend/specs/{feature}/architecture.md`

3. Check `directive` fields. For any spec with `directive: high`,
   follow it exactly. For `directive: low`, use judgment.

4. Implement in `frontend/src/{feature}/`:
   - Follow the component breakdown from the architecture spec
   - Implement every state: loading, error, empty, and success
   - Match the interactions described in the experience spec
   - Wire up the API endpoints from the frontend spec

5. After implementing, do a quick self-check:
   - Does every component state from the experience spec exist?
   - Are all interactions from the experience spec handled?
   - Does the API contract match the backend spec?

6. Report what was built and flag anything that deviated from the spec
   and why.

## Anti-patterns to avoid
- Do not implement features not in the spec
- Do not skip loading, error, or empty states
- Do not make UX decisions that contradict the experience spec
- Do not add abstractions the spec doesn't require
