# Vibe Brainstorm Guidance

Source file: `C:\Codex\Tim\vibe-brainstorm-guidance.docx`

Source date: 2026-04-29

## Core recommendation

Create a dedicated brainstorm skill instead of folding this behavior into the global prompt. Keep the scope narrow: clarify the idea, compare options, lock the MVP, and produce a handoff prompt for the next build step.

## Why this skill exists

- Repeat this step often at the start of vibe coding when the user only has a rough idea.
- Reduce ambiguity before coding or artifact generation.
- Standardize the output so handoff into implementation is cleaner.
- Keep the brainstorm behavior easier to iterate and validate than a monolithic system prompt.

## Include

- Capture the rough idea, goals, constraints, and intended users.
- Ask 3 to 5 clarifying questions when the context is thin or contradictory.
- Offer 3 to 5 distinct directions.
- Recommend 1 direction and explain the main trade-off.
- Reduce the choice into MVP features, non-goals, assumptions, and risks.
- Produce the next build prompt.

## Exclude

- Do not start coding unless the user changes phase.
- Do not replace specialized implementation skills.
- Do not browse the web by default.
- Do not trigger for every creative request.
- Do not produce long output that still avoids making a decision.

## Output target

- Problem to solve
- Users or context
- Viable directions
- Recommended direction and why
- MVP features
- Non-goals
- Risks or open assumptions
- Next build prompt

## Validation target

- Generate at least 3 viable directions.
- Choose exactly 1 direction when context allows.
- State MVP features, non-goals, and risks clearly.
- Include a handoff prompt.

## Suggested forward-test cases

- Test an app idea.
- Test an automation idea.
- Test a refactor idea.
