---
name: brainstorm
description: Structured idea framing and MVP shaping for vague product, automation, app, refactor, or coding concepts. Use when the user wants to brainstorm an idea, compare build directions, narrow scope, define an MVP, surface trade-offs, or generate the next build prompt before implementation.
---

# Brainstorm

## Overview

Turn a rough concept into a concrete build direction before coding. Keep the scope narrow: clarify the problem, explore a few viable approaches, recommend one, define an MVP, and hand off to the next build step.

Read [references/guidance.md](references/guidance.md) only when you need the deeper rationale, rollout notes, or completion criteria behind the v1 design.

## Workflow

1. Clarify the frame

- Extract the goal, user, constraints, and success signal.
- Ask 3 to 5 concise clarifying questions only when the context is missing, ambiguous, or contradictory.
- Skip extra questions when the request is already clear enough to decide.

2. Open directions

- Propose 3 to 5 materially different approaches for the same idea.
- Keep each direction short and decision-oriented.
- Vary the product or workflow angle enough that the trade-offs are real.

3. Compare and recommend

- Recommend exactly 1 direction when the context is sufficient.
- Explain the main trade-offs in practical terms such as speed, scope, complexity, maintenance, or user friction.
- If the context is still insufficient, state what decision is blocked and ask only for the missing input.

4. Shape the MVP

- Reduce the recommendation into MVP features, non-goals, assumptions, and open risks.
- Keep the first version tight enough to build in one focused implementation pass.
- Push nice-to-haves out of scope.

5. Hand off

- End with a next prompt that can be passed directly into implementation or a more specific skill.
- Name the likely next skill or build track if it is obvious from the request.
- Treat the task as incomplete if there is no recommendation or no handoff prompt.

## Boundaries

- Do not start coding unless the user explicitly switches to implementation.
- Do not replace specialized skills for frontend, API, docs, data, testing, or research.
- Do not browse the web by default; only research when the user asks or the idea depends on current external facts.
- Do not trigger for generic creative writing or broad ideation that is not trying to become a buildable artifact.
- Do not produce long, vague brainstorming. Prefer clear decisions and the next action.

## Response Shape

Use this structure when the context is sufficient:

- Problem to solve
- Users or context
- Viable directions
- Recommended direction and why
- MVP features
- Non-goals
- Risks or open assumptions
- Next build prompt

When the context is not sufficient, ask the clarifying questions first, then return to the structure above.

## Completion Check

Before finishing, verify that the response:

- Lists at least 3 viable directions.
- Recommends exactly 1 direction when the context is sufficient.
- States MVP features, non-goals, and risks or assumptions clearly.
- Ends with a prompt that hands off to the next build step.

## Example Prompts

- I want to build a task app for a small team but I do not know where to start.
- Help me brainstorm an automation tool for handling support emails.
- I have an idea for an internal dashboard; help me lock the MVP before we code.
- Compare a few ways to build an AI note-taking app.
- Turn this rough idea into a plan I can hand off to the next build skill.
- Help me narrow this refactor idea into a small first milestone.
- Help me choose between a browser extension, script, or small web app for this workflow.
- Turn this vague side-project idea into something I can implement today.
- Help me frame a lightweight internal tool idea before I start building.
- Compare a few implementation directions for this automation idea and recommend an MVP.
