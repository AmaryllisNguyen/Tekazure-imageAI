# UI UX Examples (TekAzure ImageAI)

Use these as product-specific blueprints for your image processor stack.

## Implementation note

- These examples are framework-agnostic and intended to be implemented with plain `HTML + CSS + vanilla JS` first.
- Bootstrap is optional if the team needs faster assembly.
- Do not require `Next.js`, `Tailwind`, or build tooling unless the user explicitly asks.

## Brand Tone

- Positioning: professional AI studio for teams, not a toy generator.
- Voice: clear, confident, technical but human.
- Emotional target: users feel in control, fast, and safe to iterate.
- Visual style: Technical Studio + Soft Premium.

## Hero Copy Bank (Use As-Is or Adapt)

## Primary headline options
- "Transform product images in seconds with controlled AI edits."
- "Your image pipeline, upgraded with GPT-powered precision."
- "From raw upload to production-ready visuals, in one workspace."

## Supporting copy options
- "Upload, prompt, compare, and export with full version history."
- "Switch between speed and quality profiles without leaving your flow."
- "Built for teams that care about consistency, quality, and delivery time."

## CTA copy options
- Primary CTA: "Start Processing"
- Primary CTA: "Try Studio"
- Secondary CTA: "See Live Demo"
- Secondary CTA: "View Sample Outputs"

## Screen 1: Landing and Conversion

## Goal
Convert visitors into trial users and route qualified users into the studio.

## Layout blocks
- Top nav: logo, product, pricing, docs, sign in, primary CTA.
- Hero: headline, support copy, primary CTA, secondary CTA, product mockup.
- Trust strip: model support badges, uptime/latency proof, customer logos.
- Capability grid: "Generate", "Edit", "Compare", "Export" with mini previews.
- Before/after gallery: slider cards showing real transformation outcomes.
- Workflow timeline: upload -> prompt -> generate -> review -> export.
- Pricing teaser + FAQ + final CTA band.

## Component list
- `AppHeader`, `HeroSplit`, `CTAGroup`, `TrustBadges`, `FeatureCard`.
- `BeforeAfterSlider`, `WorkflowStepper`, `PricingPreview`, `FAQAccordion`, `FooterCTA`.

## Visual and interaction notes
- Keep one dominant CTA color across page.
- Use subtle section reveal on scroll; avoid heavy parallax.
- Keep hero above fold with visible preview and action within 3 seconds.

## Screen 2: Processing Studio (Core Workspace)

## Goal
Let users upload, edit with prompt + model settings, compare outputs, and export.

## Layout blocks
- Header bar: project name, credits/usage, save status, profile.
- Left rail: uploads, asset list, version history.
- Center canvas: active image viewer with zoom, pan, and compare toggle.
- Right controls: prompt editor, model selector (`1.5` / `2`), quality controls.
- Bottom action bar: generate, regenerate, undo, export, branch.
- State overlays: upload progress, processing state, recoverable error, success toast.

## Component list
- `ProjectHeader`, `AssetDropzone`, `AssetList`, `VersionTimeline`.
- `ImageCanvas`, `CompareHandle`, `ZoomControls`.
- `PromptEditor`, `ModelSelector`, `QualityPanel`, `AdvancedToggle`.
- `ActionRail`, `JobStatusPill`, `ErrorPanel`, `ToastStack`.

## Visual and interaction notes
- Canvas area should remain visually dominant at all sizes.
- Keep advanced settings collapsed initially.
- Preserve prompt + settings per version so users can reproduce outputs.
- Provide cancel action while processing.

## Screen 3: Batch Jobs and History

## Goal
Support team workflows with queue visibility, retry actions, and predictable delivery.

## Layout blocks
- Filter bar: status, model, date range, owner.
- Jobs table: thumbnail, prompt excerpt, model, status, duration, actions.
- Side drawer details: full prompt, parameters, failure reason, output artifacts.
- Bulk action row: retry selected, export selected, archive selected.

## Component list
- `FilterChips`, `SearchInput`, `DateRangePicker`.
- `JobsDataTable`, `StatusBadge`, `InlineActions`.
- `JobDetailDrawer`, `PromptBlock`, `ParameterList`, `FailureReason`.
- `BulkActionBar`, `Pagination`.

## Visual and interaction notes
- Status must use both icon and text, not color only.
- Keep retry action available directly in row for failed jobs.
- Provide "copy prompt/settings" action for reproducibility.

## Screen 4: Analytics and Operations

## Goal
Give product/ops teams visibility into quality, performance, and cost.

## Layout blocks
- KPI row: requests, success rate, p95 latency, avg cost/image.
- Trend section: requests over time, success/error trend.
- Quality breakdown: model performance and failure categories.
- Operational feed: recent incidents, timeouts, retries.

## Component list
- `KPIStatCard`, `TrendChart`, `StackedBarChart`, `DonutBreakdown`.
- `InsightCaption`, `AlertFeed`, `IncidentItem`, `RefreshControl`.

## Visual and interaction notes
- Every chart should include one sentence of interpretation.
- Defaults should show last 7 days and team-wide scope.
- Keep filters sticky so cross-chart comparisons are easy.

## Mobile Behavior (All Screens)

- Landing: stack hero text then preview; keep primary CTA pinned above fold.
- Studio: convert side panels into drawers/bottom sheets.
- Jobs: prioritize status and actions; defer non-critical columns to details view.
- Analytics: one chart per row with concise legends.
