# GPT-Image-1.5 Edit Docs Index

Last updated: 2026-04-30 (Asia/Bangkok)

## Current status note
- As of 2026-04-30, OpenAI docs position `gpt-image-2` as the latest image generation model.
- `gpt-image-1.5` is documented as a previous model and is still relevant for existing validated workflows and image editing paths.

## Tier 1 (Must Read for edit API)

1. **Create image edit (API reference)**  
   Canonical: https://developers.openai.com/api/reference/resources/images/methods/edit  
   Why: Authoritative contract for `POST /images/edits`, including key edit parameters (`image`, `mask`, `input_fidelity`, `output_format`, `quality`, `size`, streaming/partial images).

2. **Image generation guide**  
   Canonical: https://developers.openai.com/api/docs/guides/image-generation  
   Why: Defines generate vs edit flows and clarifies when to use Image API vs Responses API for editable workflows.

3. **Tools: image generation (Responses API)**  
   Canonical: https://developers.openai.com/api/docs/guides/tools-image-generation  
   Why: Documents image generation tool behavior in Responses API, including `action=auto|generate|edit` behavior for iterative edits.

## Tier 2 (Model-specific for gpt-image-1.5)

1. **GPT Image 1.5 model page**  
   Canonical: https://developers.openai.com/api/docs/models/gpt-image-1.5  
   Why: Model positioning, endpoint support, and migration context for teams still running 1.5.

2. **Gpt-image-1.5 Prompting Guide (Cookbook)**  
   Canonical: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide  
   Why: Prompting patterns for controllable edits and fidelity-sensitive use cases on `gpt-image-1.5`.

## Tier 3 (Practical edit workflows)

1. **Generate images with GPT Image (Cookbook)**  
   Canonical: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image  
   Why: End-to-end examples including reference-image edits and mask-based edit flow.

2. **Generate images with high input fidelity (Cookbook)**  
   Canonical: https://developers.openai.com/cookbook/examples/generate_images_with_high_input_fidelity  
   Why: Focused guidance on `input_fidelity="high"` for preserving identity/details during edits.

## Validation checklist (from plan)

- [x] Each included document has at least one direct `edit image` connection.
- [x] All 3 required paths are covered:
  - [x] Image API edits (`/images/edits`)
  - [x] Responses image tool edits (`action=edit`)
  - [x] Prompting/fidelity guidance for edit stability and preservation
- [x] Excluded broad vision pages unless they add concrete edit behavior.

## Scope and assumptions used

- Sources limited to official OpenAI docs and OpenAI Cookbook.
- No third-party blog/community references included.
- If duplicates exist across `platform` and `developers`, `developers.openai.com` is treated as canonical.