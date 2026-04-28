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

## GitHub steps

1. Dang nhap GH CLI:
   - `gh auth login -h github.com`
2. Tao repo:
   - `gh repo create tekazure-image-lab --private --source=. --remote=origin --push`
3. Moi collaborator:
   - `gh repo add-collaborator <owner>/tekazure-image-lab --user TimLuong --permission write`
