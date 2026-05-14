---
name: plan
description: Universal vibecoding planning skill that produces specific, execution-ready phase plans and writes comprehensive artifacts under plans/.
---

# Plan

## Overview

Turn a rough implementation request into concrete, phase-by-phase execution artifacts.

This skill is project-agnostic and must produce specific plans that can be executed directly.

## When To Use

Use this skill when the user asks to:
- plan implementation work before coding,
- break work into detailed phases,
- generate a roadmap with risks, validation, and handoff,
- create structured plan files in `plans/`.

Do not use this skill when:
- the user asks for immediate coding only,
- the request is non-technical ideation,
- the task is purely UI copy/content without implementation planning.

## Workflow

1. Clarify only if blocked
- Extract goal, users, constraints, and success criteria.
- Ask at most 3 concise questions only if missing inputs block a reliable plan.
- If enough context exists, proceed without extra questions.

2. Compare options
- Propose 2 to 4 viable implementation directions.
- Make trade-offs explicit: speed, complexity, maintenance, risk, cost.

3. Recommend exactly one direction
- Choose one approach and state why it is best for this context.
- Document key assumptions.

4. Scope the MVP
- Define must/should/later scope.
- Push non-essential items to later phases.

5. Generate comprehensive phase plans in `plans/`
- Always produce:
  - `plans/README.md`
  - `plans/phase-01-foundation.md`
  - `plans/phase-02-build.md`
  - `plans/phase-03-hardening.md`

6. End with implementation handoff prompt
- Provide one next prompt that can be passed directly into coding.

## Specificity Rules (Mandatory)

- No vague tasks (e.g., "improve", "optimize", "handle errors") without measurable criteria.
- Each task must include: owner type, artifact/path, and done condition.
- Each phase must include explicit dependencies, blockers, risks, and validation checks.
- Each phase must include fallback/rollback notes.
- If assumptions are required, list them explicitly and mark confidence.

## Required File Structure

### `plans/README.md`
Must include:
- Context summary
- Recommended direction
- Assumptions and confidence
- Phase dependency graph
- Phase status table
- Milestones and target outcomes

### `plans/phase-01-foundation.md`
Must include:
- Objective
- In scope / out of scope
- Inputs and dependencies
- Detailed tasks (numbered)
- Risks and mitigations
- Validation checklist
- Deliverables
- Exit criteria
- Handoff to phase 2

### `plans/phase-02-build.md`
Must include same sections as phase 1, plus:
- Integration checkpoints
- Performance/cost checkpoints (if applicable)

### `plans/phase-03-hardening.md`
Must include same sections as phase 1, plus:
- Security/reliability hardening checklist
- Rollback and incident readiness
- Release readiness checklist

## Task Line Format (Use for every detailed task)

Use this exact pattern:
- `Task <N>: <action>`
- `Owner:`
- `Artifact:`
- `Steps:`
- `Done when:`
- `Evidence:`

## Response Contract

When returning the plan, include:
- Problem summary
- Viable directions (2 to 4)
- Recommended direction (exactly 1)
- MVP scope (must/should/later)
- Paths of generated/updated `plans/*` files
- Next implementation prompt

## Completion Check

Before finishing, verify:
- At least 2 viable directions are compared.
- Exactly 1 recommended direction is chosen.
- All required `plans/` files are present.
- Every phase includes detailed tasks with done conditions.
- Risks, validations, and handoff are included per phase.
