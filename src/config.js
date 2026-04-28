import fs from "node:fs";
import path from "node:path";

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnvFile(path.resolve(process.cwd(), ".env"));

function parseRequiredInt(name, fallbackValue, min, max) {
  const raw = process.env[name];
  const value = raw === undefined || raw === "" ? fallbackValue : Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max}`);
  }
  return value;
}

export function getConfig() {
  return {
    port: parseRequiredInt("PORT", 3000, 1, 65535),
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || "",
    apiKey: process.env.AZURE_OPENAI_API_KEY || "",
    deployment15: process.env.DEPLOYMENT_GPT_IMAGE_15 || "",
    deployment2: process.env.DEPLOYMENT_GPT_IMAGE_2 || "",
    apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2025-04-01-preview",
    mockMode: String(process.env.MOCK_IMAGE_MODE || "true").toLowerCase() === "true",
    azureRequestTimeoutMs: parseRequiredInt("AZURE_REQUEST_TIMEOUT_MS", 15000, 1000, 120000),
    maxBodyBytes: parseRequiredInt("MAX_BODY_BYTES", 1048576, 1024, 10485760)
  };
}
