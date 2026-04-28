# Azure OpenAI Image App (Mock-First)

Ung dung Node.js nho gon de test endpoint tao anh voi 2 lua chon model:
- `model=1.5` -> deployment `DEPLOYMENT_GPT_IMAGE_15`
- `model=2` -> deployment `DEPLOYMENT_GPT_IMAGE_2`

Khi chua deploy duoc model image tren Azure, dat `MOCK_IMAGE_MODE=true` de test full luong API.

## Run local

1. Tao file env:
   - `cp .env.example .env`
2. Chay server:
   - `npm start`
3. Health check:
   - `GET http://localhost:3000/health`

## Test generate-image

```bash
curl -s -X POST http://localhost:3000/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A watercolor fox in a forest","model":"1.5"}'
```

Response thanh cong:
- `imageBase64`: base64 cua anh
- `source`: `mock` hoac `azure`
- `model`: `1.5` hoac `2`

## Azure mode

Dat trong `.env`:
- `MOCK_IMAGE_MODE=false`
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_API_KEY`
- `DEPLOYMENT_GPT_IMAGE_15`
- `DEPLOYMENT_GPT_IMAGE_2`
- `AZURE_OPENAI_API_VERSION` (mac dinh: `2025-04-01-preview`)
- `AZURE_REQUEST_TIMEOUT_MS` (mac dinh: `15000`)
- `MAX_BODY_BYTES` (mac dinh: `1048576`)

## Error contract (safe response)

API `POST /generate-image` tra loi an toan theo ma:
- `400`: request JSON sai format hoac input sai (`prompt`, `model`)
- `413`: payload qua lon
- `502`: loi hoac timeout tu Azure image provider
- `500`: loi server noi bo

Server log se giu chi tiet ky thuat (da redact thong tin nhay cam), client chi nhan message tong quat.

## Git safety

- `RawDocuments/*` duoc ignore mac dinh, chi giu `RawDocuments/.gitkeep`.
- Truoc moi lan push, chay:
  - `git status`
  - `git diff --staged`
de dam bao khong lo du lieu nhay cam.

## GitHub steps

1. Dang nhap GH CLI:
   - `gh auth login -h github.com`
2. Tao repo:
   - `gh repo create tekazure-image-lab --private --source=. --remote=origin --push`
3. Moi collaborator:
   - `gh repo add-collaborator <owner>/tekazure-image-lab --user TimLuong --permission write`
