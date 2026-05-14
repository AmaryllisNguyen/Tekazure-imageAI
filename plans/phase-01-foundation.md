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

## Execution Status
- Last updated (UTC): 2026-05-14 07:27
- Phase state: Blocked

### Task Updates
- Task 1: Completed
  - Evidence: Scaffolded `frontend/` with Vite React TypeScript and verified dev server startup at `http://127.0.0.1:5173/`.
  - Changed paths: `frontend/package.json`, `frontend/index.html`, `frontend/src/main.tsx`
  - Validation: `cd frontend && npm run dev -- --host 127.0.0.1 --port 5173` (started successfully)

- Task 2: Blocked
  - Evidence: Implemented two-zone layout and theme tokens in CSS; attempted automated screenshot capture but headless browser launch failed due missing shared library `libatk-1.0.so.0`.
  - Changed paths: `frontend/src/App.tsx`, `frontend/src/styles.css`
  - Validation: `cd frontend && node scripts/capture-phase01-evidence.mjs` failed with missing system dependency

- Task 3: Completed
  - Evidence: Added typed request/response contracts including `prompt`, `model`, `resolution`, `ratio`.
  - Changed paths: `frontend/src/types.ts`
  - Validation: `cd frontend && npm run build` (pass)

- Task 4: Completed
  - Evidence: Implemented `generateImage()` API client with configurable base URL and structured non-2xx parsing.
  - Changed paths: `frontend/src/services/api.ts`, `frontend/.env.example`, `src/server.js`
  - Validation: Backend API verified via curl success and error cases (`200`, `400 INVALID_PROMPT`, `400 INVALID_CONTENT_TYPE`); CORS preflight verified (`204` with allow-origin/methods/headers)

- Task 5: Blocked
  - Evidence: Composer submit flow implemented in code, but required short UI screen recording could not be generated because browser automation cannot start without `libatk-1.0.so.0`.
  - Changed paths: `frontend/src/components/Composer.tsx`, `frontend/src/App.tsx`
  - Validation: automation recording attempt failed due missing runtime library in environment

### Remaining Work
- Task 2: Capture and attach layout screenshots at 360px, 768px, and 1280px widths after system browser dependencies are installed.
- Task 5: Capture one successful end-to-end UI run video and confirm bubble rendering behavior manually (or via Playwright once dependencies are present).
- Validation checklist: complete unchecked manual checks in this phase document before marking phase complete.

## Blocked
- Blocked task: Task 2 and Task 5
- Reason: Cannot run headless browser automation for screenshot/video evidence because `chrome-headless-shell` fails to launch: missing shared library `libatk-1.0.so.0`.
- Required input: Install required Linux runtime libraries for Chromium/Playwright on this machine, or approve manual screenshot/recording as substitute evidence.
- Requested owner: Environment/Admin owner
- Impact: Phase 01 exit criteria cannot be met; cannot move to Phase 02 under current `doit` rules.
- Smallest unblocking answer: Can I mark manual UI evidence acceptable for Phase 01, or do you want me to wait for system library installation?
