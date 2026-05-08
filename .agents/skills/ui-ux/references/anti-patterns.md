# UI UX Anti-Patterns and Fixes

Use this file during review to identify fast improvements.

## 1) Too many primary actions
- Symptom: multiple buttons compete for attention.
- Fix: keep one primary CTA per screen region; demote others.

## 2) Generic visual style
- Symptom: interface looks interchangeable with any template.
- Fix: commit to one visual direction and explicit token system.

## 3) Decoration over clarity
- Symptom: heavy effects reduce readability and trust.
- Fix: simplify backgrounds; increase contrast; prioritize content.

## 4) Hidden system status
- Symptom: users do not know if processing, failed, or done.
- Fix: explicit loading/error/success blocks with next actions.

## 5) Overexposed advanced controls
- Symptom: first-time users get overwhelmed.
- Fix: progressive disclosure; advanced panel collapsed by default.

## 6) Fragile responsive layout
- Symptom: clipped text, overlapping controls on mobile.
- Fix: stack sections, use min/max widths, remove fixed heights.

## 7) Poor form guidance
- Symptom: unclear prompts and validation errors.
- Fix: examples, helper text, inline validation, clear error copy.

## 8) Accessibility afterthought
- Symptom: no focus states, low contrast, icon-only controls.
- Fix: keyboard-first checks, visible focus ring, text labels.

## 9) No version confidence in AI editing
- Symptom: users fear losing good outputs.
- Fix: history timeline, compare mode, reversible actions.

## 10) Inconsistent component behavior
- Symptom: same control looks/acts differently across screens.
- Fix: central component patterns and interaction rules.
