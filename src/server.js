import http from "node:http";
import { getConfig } from "./config.js";
import { generateAzureImage } from "./azureImageClient.js";
import { generateMockImage } from "./mockImageProvider.js";
import { ApiError, createApiError } from "./errors.js";

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function redactSensitive(input) {
  const message = String(input || "");
  return message
    .replace(/(api[-_ ]?key|token|authorization)\s*[:=]\s*([^\s,]+)/gi, "$1=[REDACTED]")
    .replace(/(Bearer)\s+[A-Za-z0-9._-]+/gi, "$1 [REDACTED]");
}

function logInternalError(error) {
  const details = {
    name: error?.name || "Error",
    code: error?.code || "UNKNOWN",
    status: error?.status || 500,
    message: redactSensitive(error?.internalMessage || error?.message || "unknown error")
  };
  console.error("[request-error]", details);
}

function getPublicErrorPayload(error) {
  if (error instanceof ApiError) {
    return {
      status: error.status,
      payload: {
        error: error.clientMessage,
        code: error.code
      }
    };
  }
  return {
    status: 500,
    payload: {
      error: "Internal server error.",
      code: "INTERNAL_ERROR"
    }
  };
}

async function readJsonBody(req, maxBodyBytes) {
  const contentLengthHeader = req.headers["content-length"];
  const declaredLength = Number(contentLengthHeader);
  if (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes) {
    throw createApiError(
      413,
      "PAYLOAD_TOO_LARGE",
      "Payload too large.",
      `Content-Length ${declaredLength} exceeds ${maxBodyBytes}`
    );
  }

  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    chunks.push(chunk);
    total += chunk.length;
    if (total > maxBodyBytes) {
      throw createApiError(
        413,
        "PAYLOAD_TOO_LARGE",
        "Payload too large.",
        `Body length ${total} exceeds ${maxBodyBytes}`
      );
    }
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw createApiError(400, "INVALID_JSON", "Invalid JSON body.");
  }
}

function validateRequest(body) {
  const prompt = String(body?.prompt || "").trim();
  const model = String(body?.model || "").trim();
  if (!prompt) {
    throw createApiError(400, "INVALID_PROMPT", "Field 'prompt' is required.");
  }
  if (model !== "1.5" && model !== "2") {
    throw createApiError(400, "INVALID_MODEL", "Field 'model' must be '1.5' or '2'.");
  }
  return "";
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "POST" && req.url === "/generate-image") {
    try {
      const cfg = getConfig();
      const body = await readJsonBody(req, cfg.maxBodyBytes);
      validateRequest(body);
      const result = cfg.mockMode
        ? generateMockImage(body)
        : await generateAzureImage(body);
      return sendJson(res, 200, result);
    } catch (error) {
      logInternalError(error);
      const { status, payload } = getPublicErrorPayload(error);
      return sendJson(res, status, payload);
    }
  }

  return sendJson(res, 404, { error: "Not found" });
});

const cfg = getConfig();
server.listen(cfg.port, () => {
  console.log(`Server listening on http://localhost:${cfg.port} (mock mode: ${cfg.mockMode})`);
});
