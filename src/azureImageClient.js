import { getConfig } from "./config.js";
import { createApiError } from "./errors.js";

function getDeploymentForModel(model, cfg) {
  if (model === "1.5") return cfg.deployment15;
  if (model === "2") return cfg.deployment2;
  return "";
}

export async function generateAzureImage({ prompt, model }) {
  const cfg = getConfig();
  if (!cfg.endpoint || !cfg.apiKey) {
    throw createApiError(
      500,
      "CONFIG_MISSING_AZURE",
      "Server configuration is incomplete.",
      "Missing AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY"
    );
  }

  const deployment = getDeploymentForModel(model, cfg);
  if (!deployment) {
    throw createApiError(
      500,
      "CONFIG_MISSING_DEPLOYMENT",
      "Server configuration is incomplete.",
      `Missing deployment env for model ${model}`
    );
  }

  const endpoint = cfg.endpoint.replace(/\/+$/, "");
  const url =
    `${endpoint}/openai/deployments/${encodeURIComponent(deployment)}` +
    `/images/generations?api-version=${encodeURIComponent(cfg.apiVersion)}`;

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), cfg.azureRequestTimeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": cfg.apiKey
      },
      body: JSON.stringify({
        prompt,
        size: "1024x1024"
      }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const compact = JSON.stringify(data).slice(0, 500);
      throw createApiError(
        502,
        "UPSTREAM_AZURE_ERROR",
        "Image provider is unavailable. Please retry later.",
        `Azure request failed (${response.status}): ${compact}`
      );
    }

    const imageBase64 = data?.data?.[0]?.b64_json;
    if (!imageBase64) {
      throw createApiError(
        502,
        "UPSTREAM_INVALID_RESPONSE",
        "Image provider returned an unexpected response.",
        "Azure response does not include data[0].b64_json"
      );
    }

    return {
      imageBase64,
      model,
      source: "azure",
      prompt
    };
  } catch (error) {
    if (error?.name === "AbortError") {
      throw createApiError(
        502,
        "UPSTREAM_TIMEOUT",
        "Image provider timeout. Please retry later.",
        `Azure request timed out after ${cfg.azureRequestTimeoutMs}ms`
      );
    }
    if (error?.code === "ENOTFOUND" || error?.code === "ECONNREFUSED" || error?.code === "ECONNRESET") {
      throw createApiError(
        502,
        "UPSTREAM_NETWORK_ERROR",
        "Image provider is unreachable. Please retry later.",
        `Azure network error: ${error.code}`
      );
    }
    if (error?.name === "TypeError") {
      throw createApiError(
        502,
        "UPSTREAM_NETWORK_ERROR",
        "Image provider is unreachable. Please retry later.",
        `Azure network error: ${error.message || "fetch failed"}`
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutHandle);
  }
}
