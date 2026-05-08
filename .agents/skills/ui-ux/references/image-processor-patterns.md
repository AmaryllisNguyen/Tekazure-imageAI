# Image Processor UX Patterns

Use these patterns for GPT-image style products.

## Core product architecture

Most image processor products need 4 zones:
- Input zone: upload, drag-drop, sample presets.
- Prompt zone: instruction editor, quality/fidelity toggles.
- Result zone: generated image, zoom, compare.
- Action zone: download, regenerate, branch, share.

## Recommended primary flow

1. Upload input image (or start from blank).
2. User enters prompt and selects model/profile.
3. System shows progress with cancellable generation.
4. Result appears with before/after comparison.
5. User chooses next action: refine, export, or restart.

## Essential controls

Expose only high-value controls first:
- Model selector (for example: speed vs quality)
- Output size/aspect ratio
- Fidelity/preservation level
- Background/format options

Put advanced controls behind a collapsible section.

## Critical system states

Design and implement these states explicitly:
- Empty state: explain accepted formats and examples.
- Upload in progress state: progress and cancel.
- Processing state: spinner + ETA or step-based status.
- Error state: plain language + retry + troubleshooting hint.
- Success state: preview + quick actions.

## Trust and transparency

Users need confidence with AI edits:
- Show which model/profile was used.
- Keep prompt history per image version.
- Support version compare (before/after and iteration history).
- Show failure causes without leaking sensitive internals.

## Mobile constraints

On mobile:
- Stack zones vertically.
- Keep primary CTA sticky at bottom.
- Move advanced controls into bottom sheet/modal.

## Accessibility notes

- Ensure all controls have text labels.
- Provide keyboard support for upload and actions.
- Do not encode status with color only.
- Keep focus visible in dark and light surfaces.
