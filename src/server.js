import http from "node:http";
import { getConfig } from "./config.js";
import { generateAzureImage } from "./azureImageClient.js";
import { generateMockImage } from "./mockImageProvider.js";
import { ApiError, createApiError } from "./errors.js";

const RATE_LIMIT_STORE = new Map();

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer"
  });
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

function requireJsonContentType(req) {
  const raw = String(req.headers["content-type"] || "").toLowerCase();
  const contentType = raw.split(";")[0].trim();
  if (contentType !== "application/json") {
    throw createApiError(400, "INVALID_CONTENT_TYPE", "Content-Type must be application/json.");
  }
}

function enforceRateLimit(req, cfg) {
  const ip = (req.socket?.remoteAddress || "unknown").slice(0, 200);
  const key = `${ip}:${req.url}`;
  const now = Date.now();
  const existing = RATE_LIMIT_STORE.get(key);
  if (!existing || now >= existing.resetAt) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + cfg.rateLimitWindowMs });
    return;
  }
  existing.count += 1;
  if (existing.count > cfg.rateLimitMaxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    throw createApiError(
      429,
      "RATE_LIMITED",
      "Too many requests. Please retry later.",
      `Rate limit exceeded for ${key}; retry-after=${retryAfterSeconds}s`
    );
  }
}

function validateRequest(body, maxPromptChars) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw createApiError(400, "INVALID_BODY", "Request body must be a JSON object.");
  }
  if (typeof body.prompt !== "string") {
    throw createApiError(400, "INVALID_PROMPT", "Field 'prompt' must be a string.");
  }
  if (typeof body.model !== "string") {
    throw createApiError(400, "INVALID_MODEL", "Field 'model' must be a string.");
  }
  const prompt = body.prompt.trim();
  const model = body.model.trim();
  if (!prompt) {
    throw createApiError(400, "INVALID_PROMPT", "Field 'prompt' is required.");
  }
  if (prompt.length > maxPromptChars) {
    throw createApiError(400, "INVALID_PROMPT", `Field 'prompt' exceeds max length ${maxPromptChars}.`);
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(prompt)) {
    throw createApiError(400, "INVALID_PROMPT", "Field 'prompt' contains unsupported control characters.");
  }
  if (model !== "1.5" && model !== "2") {
    throw createApiError(400, "INVALID_MODEL", "Field 'model' must be '1.5' or '2'.");
  }
  return { prompt, model };
}

const server = http.createServer(async (req, res) => {
  const cfg = getConfig();

  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.url === "/generate-image" && req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
  }

  if (req.method === "POST" && req.url === "/generate-image") {
    try {
      enforceRateLimit(req, cfg);
      requireJsonContentType(req);
      const body = await readJsonBody(req, cfg.maxBodyBytes);
      const validated = validateRequest(body, cfg.maxPromptChars);
      const result = cfg.mockMode
        ? generateMockImage(validated)
        : await generateAzureImage(validated);
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
