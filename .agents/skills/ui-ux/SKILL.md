---
name: ui-ux
description: Design and implement high-impact, production-ready UI/UX for web products. Use when the user asks for UI design, UX improvements, visual redesigns, polished interfaces, interaction design, responsive layouts, design systems, or conversion-focused user flows.
---

# UI UX Skill

Create interfaces that are clear, memorable, and usable under real product constraints.

## When To Use

Use this skill when the request includes any of these:
- Design a page, component, dashboard, or full user flow.
- Improve visual quality, hierarchy, or conversion.
- Redesign an existing UI to feel modern and intentional.
- Define design system tokens, patterns, and reusable components.
- Improve mobile usability, accessibility, and interaction clarity.

## Implementation Constraint

- Default stack for this project: plain `HTML + CSS + vanilla JS` (Bootstrap allowed).
- Prefer no-build-step implementation so beginner teammates can maintain it.
- Avoid framework-specific recommendations (`Next.js`, `Tailwind`, complex state libraries) unless explicitly requested.
- Deliver UI specs, components, and interactions that map cleanly to simple static files.

## Design Principles

1. Clarity first
- Users should understand what the page is for within 3 seconds.
- Keep one primary goal per screen.
- Build obvious hierarchy: heading, supporting copy, primary action.

2. Strong visual direction
- Choose a clear style direction before implementation.
- Use deliberate typography, spacing rhythm, and contrast.
- Avoid generic default aesthetics and inconsistent component styles.

3. UX with measurable intent
- Every action should map to a user outcome.
- Minimize cognitive load: fewer decisions, better defaults.
- Reduce friction in key flows (onboarding, upload, checkout, submit).

4. Accessibility and trust
- Meet WCAG-oriented contrast and keyboard focus expectations.
- Use semantic structure and descriptive labels.
- Provide explicit states: loading, empty, success, error.

5. Responsive by default
- Design mobile-first and scale up.
- Prevent text truncation and layout breakage at all common breakpoints.
- Use fluid layout primitives, not brittle pixel locking.

6. Stunning with purpose
- Build a recognizable visual identity, not commodity UI.
- Use bold but controlled contrast, typography, and composition.
- Keep decorative choices subordinate to task clarity and conversion.

## Workflow

1. Define product frame
- Identify users, primary jobs-to-be-done, and business goal.
- Confirm constraints: platform, brand, timeline, technical limits.
- Define success metrics (completion rate, CTR, time-to-task, error rate).

2. Map the experience
- Build a simple flow: entry point -> key actions -> outcome.
- Identify the critical path and remove non-essential steps.
- Define edge states and fallback behaviors.

3. Pick a visual system
- Define tokens first: color, type scale, spacing, radius, shadow.
- Set component patterns: buttons, forms, cards, nav, feedback states.
- Keep consistency high and variation intentional.

4. Build the UI
- Implement layout and hierarchy before decorative details.
- Add meaningful motion only where it clarifies transitions or feedback.
- Keep copy concise and action-oriented.

5. Validate quality
- Check responsiveness across mobile, tablet, desktop.
- Verify accessibility basics (focus order, contrast, semantics, labels).
- Validate with realistic content, not placeholder-only samples.

## References

Read only what is needed for the request:
- `references/ui-ux-process.md`: end-to-end process from discovery to handoff.
- `references/visual-directions.md`: 8 visual directions with when-to-use guidance.
- `references/image-processor-patterns.md`: specialized UX patterns for AI image tools.
- `references/handoff-checklist.md`: pre-ship QA checklist for UI/UX quality.
- `references/examples.md`: concrete blueprints for stunning, production-ready screens.
- `references/rubric.md`: 0-5 scoring model for UX and visual quality.
- `references/anti-patterns.md`: common UI/UX failures and direct fixes.

## Output Format

```md
## UI UX Direction
- Product goal:
- Primary users:
- Success metrics:

## Experience Plan
- Core user flow:
- Critical path decisions:
- Edge states:

## Visual System
- Typography:
- Color tokens:
- Spacing and layout:
- Component patterns:

## Implementation Notes
- Responsive behavior:
- Accessibility requirements:
- Interaction and motion:

## Acceptance Checklist
- [ ] Clear visual hierarchy and primary CTA
- [ ] Fully responsive on mobile and desktop
- [ ] Accessible structure and states
- [ ] Consistent component system
- [ ] Production-ready UI polish
```

## Guardrails

- Do not start from random styling. Define direction and tokens first.
- Do not ship only happy-path screens. Include loading/empty/error/success.
- Do not rely on vague statements like "make it modern" without concrete decisions.
- Do not sacrifice usability for visual effects.
- Do not ignore performance costs of heavy visual layers.

## Completion Criteria

Before finishing, ensure:
- The design has one clear primary goal per screen.
- The main flow is shorter and easier than before.
- The interface is visually distinctive, not template-generic.
- The result is implementable with explicit design decisions.
- The output scores at least 4/5 on hierarchy, usability, responsiveness, and visual craft (see rubric).
