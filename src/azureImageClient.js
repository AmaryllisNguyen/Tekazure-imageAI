import { getConfig } from "./config.js";

function getDeploymentForModel(model, cfg) {
  if (model === "1.5") return cfg.deployment15;
  if (model === "2") return cfg.deployment2;
  return "";
}

export async function generateAzureImage({ prompt, model }) {
  const cfg = getConfig();
  if (!cfg.endpoint || !cfg.apiKey) {
    throw new Error("Missing AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY");
  }

  const deployment = getDeploymentForModel(model, cfg);
  if (!deployment) {
    throw new Error(`Missing deployment env for model ${model}`);
  }

  const endpoint = cfg.endpoint.replace(/\/+$/, "");
  const url =
    `${endpoint}/openai/deployments/${encodeURIComponent(deployment)}` +
    `/images/generations?api-version=${encodeURIComponent(cfg.apiVersion)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": cfg.apiKey
    },
    body: JSON.stringify({
      prompt,
      size: "1024x1024"
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = JSON.stringify(data);
    throw new Error(`Azure request failed (${response.status}): ${details}`);
  }

  const imageBase64 = data?.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("Azure response does not include data[0].b64_json");
  }

  return {
    imageBase64,
    model,
    source: "azure",
    prompt
  };
}
