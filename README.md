# Azure OpenAI Image App (Mock-First)

Lightweight Node.js app for image generation with two model options:
- `model=1.5` -> deployment `DEPLOYMENT_GPT_IMAGE_15`
- `model=2` -> deployment `DEPLOYMENT_GPT_IMAGE_2`

If Azure image deployments are not ready yet, set `MOCK_IMAGE_MODE=true` for end-to-end API testing.

## Run locally

1. Create env file:
   - `cp .env.example .env`
2. Start the server:
   - `npm start`
3. Health check:
   - `GET http://localhost:3000/health`

## Test `POST /generate-image`

```bash
curl -s -X POST http://localhost:3000/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A watercolor fox in a forest","model":"1.5"}'
```

Successful response:
- `imageBase64`: image bytes in base64
- `source`: `mock` or `azure`
- `model`: `1.5` or `2`

## Configuration

Set these in `.env`:
- `MOCK_IMAGE_MODE` (default: `true`)
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_API_KEY`
- `DEPLOYMENT_GPT_IMAGE_15`
- `DEPLOYMENT_GPT_IMAGE_2`
- `AZURE_OPENAI_API_VERSION` (default: `2025-04-01-preview`)
- `AZURE_REQUEST_TIMEOUT_MS` (default: `15000`)
- `MAX_BODY_BYTES` (default: `1048576`)
- `MAX_PROMPT_CHARS` (default: `4000`)
- `RATE_LIMIT_WINDOW_MS` (default: `60000`)
- `RATE_LIMIT_MAX_REQUESTS` (default: `60`)

## API contract

Endpoint:
- `POST /generate-image`

Security behavior:
- Requires `Content-Type: application/json`
- Enforces server-side validation for `prompt` and `model`
- Applies request body size limit and basic in-memory rate limiting
- Uses safe error payloads and redacted internal logs

Safe error status codes:
- `400`: invalid JSON/content type/input
- `405`: method not allowed
- `413`: payload too large
- `429`: too many requests
- `502`: Azure provider timeout/network/upstream error
- `500`: internal server error

## Security compliance notes

- No hardcoded secrets. Keep secrets in `.env` (local) or a secret manager (non-local).
- Do not expose API keys or raw authorization headers in logs/responses.
- Do not trust frontend validation; all inputs are validated again on the backend.
- Middleware/policies currently cover:
  - `/generate-image`: method guard, content-type guard, rate limit, body-size gate, schema validation
  - `/health`: read-only endpoint
- Database/RLS: not applicable in the current app because there is no database layer yet.
- Dependency hygiene: run periodic dependency updates/audits as part of maintenance.

## Git safety

- `RawDocuments/*` is ignored by default, except `RawDocuments/.gitkeep`.
- Before push, run:
  - `git status`
  - `git diff --staged`
