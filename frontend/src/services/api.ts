import type { ApiErrorPayload, GenerateImageRequest, GenerateImageResponse } from "../types";

const DEFAULT_API_BASE_URL = "http://localhost:3000";

function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

export class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  const response = await fetch(`${getApiBaseUrl()}/generate-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const raw = await response.text();
  let parsed: unknown = {};
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new ApiClientError("Invalid JSON response from server.", response.status || 500);
    }
  }

  if (!response.ok) {
    const payload = parsed as ApiErrorPayload;
    throw new ApiClientError(payload?.error || "Request failed.", response.status, payload?.code);
  }

  const data = parsed as Partial<GenerateImageResponse>;
  if (!data || typeof data.imageBase64 !== "string" || typeof data.source !== "string" || typeof data.model !== "string") {
    throw new ApiClientError("Invalid response shape from server.", 500, "INVALID_RESPONSE_SHAPE");
  }

  return {
    imageBase64: data.imageBase64,
    source: data.source as GenerateImageResponse["source"],
    model: data.model as GenerateImageResponse["model"]
  };
}
