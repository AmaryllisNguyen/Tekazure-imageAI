# Phase 02 - Build

## Objective
Complete the full MVP interaction flow for image generation, including resolution/ratio options, robust UX states, and integration reliability.

## In Scope
- Complete componentized UI flow.
- Add resolution and ratio selectors with clear defaults.
- Implement loading, error, retry, and download actions.
- Improve API handling and response state management.

## Out of Scope
- User accounts and server-side history storage.
- Multi-image batch generation.
- Advanced prompt templates/presets.

## Inputs and Dependencies
- Phase 1 frontend workspace and API client.
- Agreed option sets for resolution and ratio.
- Stable backend behavior for success and error responses.

## Blockers
- No agreed schema for `resolution` and `ratio` accepted by backend.
- Intermittent backend timeout behavior not yet documented.

## Detailed Tasks
- Task 1: Build chat feed and message item components
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/components/ChatFeed.tsx`, `frontend/src/components/MessageItem.tsx`
  - Steps: render prompt and image entries with role-aware styling; auto-scroll feed on new message.
  - Done when: latest message auto-scrolls into view after each submit.
  - Evidence: short capture showing repeated submits and auto-scroll behavior.

- Task 2: Build settings controls for resolution and ratio
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/components/SettingsBar.tsx`
  - Steps: add controlled selects for `resolution` (`512`, `1024`) and `ratio` (`1:1`, `16:9`, `9:16`, `4:3`); persist selection per session.
  - Done when: selected values are included in every request payload.
  - Evidence: devtools payload snapshot for each option change.

- Task 3: Implement request state machine
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/state/useGenerationState.ts`
  - Steps: model states `idle`, `loading`, `success`, `error`; disable submit in loading state; keep retry payload.
  - Done when: no duplicate submit occurs during active request.
  - Evidence: manual rapid-click test shows single in-flight request.

- Task 4: Add error and retry UX
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/components/ErrorBanner.tsx`, `frontend/src/components/Composer.tsx`
  - Steps: show safe error text; include retry button with previous payload.
  - Done when: failed request can be retried successfully without retyping prompt.
  - Evidence: demo with forced error then successful retry.

- Task 5: Add output actions (download and copy prompt)
  - Owner: Frontend Engineer
  - Artifact: `frontend/src/components/ImageResult.tsx`
  - Steps: decode base64 to downloadable image; expose download action; keep originating prompt visible.
  - Done when: clicking download saves image file locally with timestamped name.
  - Evidence: downloaded file present in local Downloads folder.

- Task 6: Document frontend setup and env contract
  - Owner: Frontend Engineer
  - Artifact: `frontend/README.md`
  - Steps: describe setup, env (`VITE_API_BASE_URL`), run commands, known limits.
  - Done when: another developer can run app from docs without verbal guidance.
  - Evidence: clean-run validation by a second local shell session.

## Integration Checkpoints
- Checkpoint A: Composer -> API client payload includes prompt/model/resolution/ratio.
- Checkpoint B: API response -> image renderer displays output and metadata.
- Checkpoint C: Error path -> UI shows retry and retains previous payload.

## Performance/Cost Checkpoints (if applicable)
- Keep max one in-flight request per user action.
- Do not auto-regenerate on option change; generate only on explicit submit.
- Constrain image render dimensions to avoid excessive browser memory usage.

## Risks and Mitigations
- Risk: UI latency feels unresponsive during generation.
- Mitigation: loading skeleton + disabled submit + progress microcopy.

- Risk: base64 payloads cause browser memory spikes.
- Mitigation: cap preview dimensions and clear stale image URLs on new requests.

## Validation Checklist
- [ ] All settings fields are keyboard accessible.
- [ ] Submit path works with each ratio option.
- [ ] Error path tested with simulated 400 and 502.
- [ ] Retry path succeeds without manual re-entry.
- [ ] Download action saves valid image file.

## Deliverables
- Full MVP frontend flow with option controls.
- Stable request lifecycle handling.
- Setup documentation for frontend workspace.

## Exit Criteria
- Happy path and error/retry path verified with evidence.
- UX is usable on desktop and mobile widths.
- No critical runtime errors in browser console during manual tests.

## Fallback / Rollback
- If settings integration breaks API contract, fallback to sending only prompt+model while retaining UI controls disabled behind a feature flag.

## Handoff to Phase 3
Proceed to hardening once all integration checkpoints are passed and documentation is complete.
