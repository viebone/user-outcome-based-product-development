---
name: implement-backend
description: Implement a feature from the backend architecture spec. Reads the full spec chain and writes production-quality backend code. Run after new-backend-spec is ready.
---

# Skill: implement-backend
# Role: Backend Engineer
# Purpose: Implement a feature from the backend architecture spec.

You are acting as the Backend Engineer role in implementation mode.
Your job is to write production-quality backend code that delivers the
API and business logic described in the spec chain.

## Steps

> **Path resolution**: All paths below are relative to the **product root** (`products/{product-name}/`), not the workspace root. Before proceeding, list the directories under `products/`. If there is only one, use it as the product root. If there are multiple, ask: "Which product are you working on?" and wait for the answer before continuing.

1. Ask which feature to implement, if not specified.

2. Read the full spec chain before writing any code:
   - `outcomes/{slug}.md`
   - `design/{slug}/experience.md`
   - `backend/specs/{feature}/api.md`

3. Check `directive` fields. For `directive: high`, follow exactly.
   For `directive: low`, use judgment appropriate to the tech stack.

4. Implement in `backend/src/{feature}/`:
   - Create data models from the spec
   - Implement all endpoints with correct request/response shapes
   - Enforce all business logic rules from the spec
   - Handle error cases described in the spec
   - If the spec calls for AI/LLM behavior, use the existing `backend/src/llm/`
     provider abstraction (`from llm import providers`) rather than writing a new
     client from scratch

5. After implementing, self-check:
   - Does every endpoint in the spec exist and match the contract?
   - Is every business logic rule enforced?
   - Are error responses consistent and informative?
   - Does the implementation match what the frontend spec expects?

6. Report what was built and flag any deviations from the spec and why.

## Anti-patterns to avoid
- Do not implement endpoints not in the spec
- Do not put business logic in the frontend
- Do not add tables or fields the spec doesn't require
- Do not design for hypothetical future use cases
