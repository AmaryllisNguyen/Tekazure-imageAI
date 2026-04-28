import http from "node:http";
import { getConfig } from "./config.js";
import { generateAzureImage } from "./azureImageClient.js";
import { generateMockImage } from "./mockImageProvider.js";

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Invalid JSON body");
  }
}

function validateRequest(body) {
  const prompt = String(body?.prompt || "").trim();
  const model = String(body?.model || "").trim();
  if (!prompt) return "Field 'prompt' is required";
  if (model !== "1.5" && model !== "2") return "Field 'model' must be '1.5' or '2'";
  return "";
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "POST" && req.url === "/generate-image") {
    try {
      const body = await readJsonBody(req);
      const validationError = validateRequest(body);
      if (validationError) return sendJson(res, 400, { error: validationError });

      const cfg = getConfig();
      const result = cfg.mockMode
        ? generateMockImage(body)
        : await generateAzureImage(body);
      return sendJson(res, 200, result);
    } catch (error) {
      return sendJson(res, 500, { error: error.message || "Unexpected server error" });
    }
  }

  return sendJson(res, 404, { error: "Not found" });
});

const cfg = getConfig();
server.listen(cfg.port, () => {
  console.log(`Server listening on http://localhost:${cfg.port} (mock mode: ${cfg.mockMode})`);
});
