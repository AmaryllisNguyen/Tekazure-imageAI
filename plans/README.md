# Frontend-Only Image App Plan (ChatGPT-like UI)

## Context Summary
- Project currently provides backend API at `POST /generate-image` and no frontend app.
- Target product is a frontend-first web app with ChatGPT-like interaction: prompt input, generated image output, and controls for resolution and ratio.
- MVP should integrate with existing local backend and support mock mode through backend config.

## Recommended Direction
- Direction selected: Build a React + Vite frontend that calls existing backend endpoint `/generate-image` through a small API client layer.
- Why: fastest path to a working product, validates user flow and existing backend contract in one pass, and avoids rework from mock-only UI.

## Assumptions and Confidence
- A1: Backend remains available at `http://localhost:3000` during development. (Confidence: High)
- A2: Backend can accept new optional fields `resolution` and `ratio`, or can ignore unknown fields safely. (Confidence: Medium)
- A3: Team accepts "ChatGPT-like" as interaction pattern, not exact visual clone. (Confidence: High)
- A4: Browser target is modern Chromium/Firefox/Safari latest stable. (Confidence: Medium)

## Phase Dependency Graph
- `phase-01-foundation` -> `phase-02-build` -> `phase-03-hardening`
- Phase 2 cannot start until Phase 1 exit criteria are met.
- Phase 3 cannot start until Phase 2 integration checkpoints are passed.

## Phase Status Table
| Phase | Goal | Status | Owner | Start Gate | Exit Gate |
|---|---|---|---|---|---|
| Phase 1 | Scaffold frontend and lock API contract | Blocked | Frontend Engineer | Repo ready | Local UI sends valid request and renders response |
| Phase 2 | Complete UX flow and option controls | Planned | Frontend Engineer | Phase 1 done | End-to-end happy path + error/retry path pass |
| Phase 3 | Harden reliability/release readiness | Planned | Frontend + QA | Phase 2 done | Accessibility, perf, and release checklist pass |

## Milestones and Target Outcomes
- M1: Local app runs via `npm run dev` in frontend workspace and can submit prompt.
- M2: Response image renders with selected `resolution` and `ratio` settings.
- M3: UX includes loading, error, retry, and download actions.
- M4: Release-ready baseline with test checklist and rollback plan.
