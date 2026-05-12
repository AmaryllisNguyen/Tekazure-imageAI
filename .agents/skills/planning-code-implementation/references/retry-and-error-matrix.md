# Retry and Error Matrix

Use this matrix to standardize retry behavior and user-facing error handling.

## Error Classification

| Error Class | Typical Cause | Retry? | API Mapping | Notes |
|---|---|---|---|---|
| Invalid input (backend validation) | Missing/invalid request data, malformed JSON, semantic validation failure | No | 400 | Backend is source of truth; do not trust frontend-only checks |
| Payload too large | Request body exceeds configured limit | No | 413 | Include limit guidance |
| Upstream timeout | Provider delay/network timeout | Yes (bounded) | 502 | Apply exponential backoff + jitter |
| Transient upstream error | Temporary provider/network issue | Yes (bounded) | 502 | Retry with cap and fallback messaging |
| Rate limit | Burst traffic exceeds limits | Yes (with delay) | 429 or mapped policy | Respect retry-after when available |
| Internal server error | Unhandled exception | No immediate blind retry | 500 | Log correlation ID, safe message only |

## Retry Policy Baseline
- Retry only transient categories.
- Use bounded retries (example: 2-3 attempts max).
- Use exponential backoff with jitter.
- Enforce total request timeout budget.
- Stop retrying when request is not idempotent or policy forbids repeat.

## Response Contract Guidance
- Always return safe, non-sensitive error messages.
- Include machine-readable error code for client branching.
- Include correlation/request ID for support and tracing.
- Keep provider-specific details in logs, not in user response.
- Never log secrets, environment variable values, API keys, or raw authorization headers.

## Observability Signals
- `generation_request_total` by status class
- `generation_upstream_latency_ms`
- `generation_retry_count`
- `generation_timeout_total`
- `generation_failure_rate`
