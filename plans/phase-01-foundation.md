# Phase 01 - Foundation

## Objective
Build the frontend foundation and establish a verified contract between frontend UI and existing `/generate-image` backend endpoint.

## In Scope
- Create frontend project skeleton.
- Define UI shell with chat layout and bottom composer.
- Implement API client and response parsing for image rendering.
- Define and validate request payload structure.

## Out of Scope
- Advanced conversation history persistence.
- Authentication and multi-user support.
- Production deployment pipeline.

## Inputs and Dependencies
- Existing backend server in `src/server.js` and API contract in `README.md`.
- Node.js/npm runtime available locally.
- Access to repository root for creating frontend workspace.

## Blockers
- Backend unavailable at local runtime endpoint.
- Missing agreement on accepted `resolution` and `ratio` enum values.

## Detailed Tasks
- Task 1: Create frontend workspace with Vite + React + TypeScript
  - Owner: Frontend Engineer
  - Artifact: `frontend/package.json`, `frontend/src/main.tsx`, `frontend/index.html`
  - Steps: scaffold Vite React TS app; set scripts for `dev`, `build`, `preview`; verify startup.
  - Done when: `npm run dev` starts without errors and serves app page.
  - Evidence: terminal output shows local dev URL and successful compile.

- Task 2: Add base app layout and global theme tokens
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/App.tsx`, `frontend/src/styles.css`
  - Steps: build two-zone layout (message area + fixed composer); define typography, spacing, and color variables.
  - Done when: layout remains stable at 360px, 768px, and 1280px widths.
  - Evidence: screenshots for all three breakpoints.

- Task 3: Define typed API request/response contracts
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/types.ts`
  - Steps: add TypeScript interfaces for request with `prompt`, `model`, `resolution`, `ratio`; response with `imageBase64`, `source`, `model`.
  - Done when: app compiles and API client uses only typed payloads.
  - Evidence: `npm run build` passes with no TS errors.

- Task 4: Implement API client for `/generate-image`
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/services/api.ts`
  - Steps: add `generateImage()` wrapper using `fetch`; support configurable base URL via env; parse non-2xx errors.
  - Done when: manual request returns parsed image payload on success and structured error on failure.
  - Evidence: devtools network record and console log snapshots.

- Task 5: Wire composer submit to API call
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/components/Composer.tsx`, `frontend/src/App.tsx`
  - Steps: collect prompt + options; submit payload; append user and assistant entries in feed.
  - Done when: submit creates one user prompt bubble and one assistant image bubble for successful request.
  - Evidence: short screen recording of one complete request.

## Risks and Mitigations
- Risk: frontend/backend payload mismatch.
- Mitigation: freeze payload schema in `frontend/src/types.ts` and verify with sample curl + UI request.

- Risk: design drift from expected chat interaction.
- Mitigation: enforce fixed composer placement and message feed behavior before visual refinements.

## Validation Checklist
- [ ] `frontend` app boots locally.
- [ ] Empty prompt cannot submit.
- [ ] Submit generates request to `/generate-image`.
- [ ] Base64 response renders valid image element.
- [ ] Non-2xx responses surface user-safe error message.

## Deliverables
- Frontend scaffold in `frontend/`.
- Minimal chat-like UI.
- Typed API integration.

## Exit Criteria
- User can enter prompt, choose basic options, submit, and see generated image in UI.
- Local build passes and core flow is demonstrable end-to-end.

## Fallback / Rollback
- If API integration blocks progress, temporarily switch `generateImage()` to deterministic local mock response to continue UI implementation.

## Handoff to Phase 2
Proceed to Phase 2 after one successful end-to-end demo and validated payload structure.
