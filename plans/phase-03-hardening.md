# Phase 03 - Hardening

## Objective
Raise MVP to release-ready quality with accessibility, reliability, security hygiene, and operational readiness for frontend delivery.

## In Scope
- Accessibility and responsive quality pass.
- Reliability hardening for timeout/error handling.
- Security hygiene for frontend config and safe logging.
- Release checklist and rollback readiness.

## Out of Scope
- Full observability platform setup.
- Internationalization and localization.
- Enterprise SSO/auth flows.

## Inputs and Dependencies
- Completed MVP flow from Phase 2.
- Defined release channel for frontend artifact.
- Agreement on rollback target versioning.

## Blockers
- No defined deployment target (e.g., Vercel/Netlify/static host).
- Missing QA ownership for release gate approval.

## Detailed Tasks
- Task 1: Accessibility audit and remediation
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/components/*`, `frontend/src/styles.css`
  - Steps: ensure focus states, labels, contrast, keyboard navigation, and screen-reader friendly error text.
  - Done when: keyboard-only navigation can complete full generate flow without trap.
  - Evidence: accessibility checklist report with pass/fail marks.

- Task 2: Reliability and timeout UX improvements
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/services/api.ts`, `frontend/src/components/ErrorBanner.tsx`
  - Steps: add client timeout guard; map timeout/network failures to actionable UI messages.
  - Done when: forced timeout produces deterministic message and retry option.
  - Evidence: simulation log showing timeout handling path.

- Task 3: Frontend security hygiene review
  - Owner: Frontend Engineer
  - Artifact: `frontend/.env.example`, `frontend/README.md`
  - Steps: ensure no secrets in frontend bundle; document only public envs; remove sensitive logs.
  - Done when: grep scan finds no keys/tokens in frontend source and docs.
  - Evidence: command output from secret-pattern scan.

- Task 4: Add lightweight QA regression script
  - Owner: QA Engineer
  - Artifact: `frontend/docs/manual-test-checklist.md`
  - Steps: define repeatable manual test script for happy path, invalid input, timeout, retry, download.
  - Done when: checklist can be executed in under 15 minutes with deterministic expected outcomes.
  - Evidence: completed checklist from one dry-run.

- Task 5: Prepare release package and rollback notes
  - Owner: Frontend Engineer
  - Artifact: `frontend/README.md`, `plans/release-notes-v1.md`
  - Steps: document build command, deploy steps, rollback command/path, known issues.
  - Done when: release candidate can be built and reverted to prior version in one documented sequence.
  - Evidence: successful build artifact and rollback rehearsal note.

## Security/Reliability Hardening Checklist
- [ ] No hardcoded secrets in frontend repository paths.
- [ ] Only public runtime config exposed to browser.
- [ ] Timeout and network failure messages are user-safe.
- [ ] Retry does not duplicate stale pending requests.
- [ ] Error details avoid exposing backend internals.

## Rollback and Incident Readiness
- Rollback trigger: >10% generation failures for 15 minutes or blocking UI regression.
- Rollback method: redeploy previous stable frontend artifact; disable latest release tag.
- Incident triage owner: Frontend Engineer on-call.
- Communication artifact: `plans/release-notes-v1.md` incident section.

## Release Readiness Checklist
- [ ] Build passes with zero TypeScript compile errors.
- [ ] Core manual regression checklist passes.
- [ ] Mobile and desktop smoke checks complete.
- [ ] Accessibility critical issues addressed.
- [ ] Release and rollback notes finalized.

## Risks and Mitigations
- Risk: regressions from late visual changes.
- Mitigation: freeze layout before release candidate and permit text-only tweaks.

- Risk: poor behavior on low-end devices.
- Mitigation: constrain render size and test on throttled CPU/network profile.

## Validation Checklist
- [ ] 15-minute manual regression run passes.
- [ ] Timeout/retry scenario verified.
- [ ] Downloaded image integrity spot-check passed.
- [ ] No high-severity accessibility issue remains.

## Deliverables
- Hardened frontend ready for first release.
- QA checklist and release documentation.
- Rollback and incident handling notes.

## Exit Criteria
- Release checklist fully completed and signed off.
- Rollback rehearsal completed successfully.
- First release candidate approved.

## Fallback / Rollback
- If release checklist fails near launch window, release Phase 2 artifact with known limitations and defer hardening deltas to patch release.

## Handoff
Handoff to implementation/execution track for coding tasks and release operations.
