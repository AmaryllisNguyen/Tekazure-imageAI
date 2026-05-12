# API Parameter Playbook (GPT-Image-2)

Use this as a decision aid when recommending API parameters.

## Decision Priorities
1. Output quality target
2. Latency target
3. Cost ceiling
4. Stability and repeatability requirements

## Recommendation Table

| Scenario | Suggested Parameter Direction | Why | Tradeoffs |
|---|---|---|---|
| Fast prototype | Prefer lower-cost/default options, conservative output size | Quick feedback loop | Lower fidelity and less control |
| Production user-facing image generation | Balance quality settings with timeout budget | Better user-perceived quality | Higher compute cost |
| High-volume batch generation | Optimize for throughput and bounded runtime | Predictable operations | Potential quality reduction |
| Strict brand or style consistency | Use tighter prompt constraints and stable generation settings | More consistent outputs | Less creative variation |
| Mobile/low-bandwidth clients | Prefer smaller output payload strategy | Faster delivery and lower transfer cost | Lower visual detail |

## Practical Guidance
- Start from a baseline profile, then tune one variable at a time.
- Document parameter decisions per feature, not globally.
- Keep environment-specific defaults (dev/staging/prod) explicit.
- Track parameter changes with outcome metrics (latency, error rate, user acceptance).

## Anti-Patterns
- Changing multiple parameters at once without controlled evaluation.
- Optimizing only for quality while ignoring timeout and cost constraints.
- Using the same parameter profile for real-time UI and offline batch workloads.
