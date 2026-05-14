export type ImageModel = "1.5" | "2";
export type ImageResolution = "512" | "1024";
export type ImageRatio = "1:1" | "16:9" | "9:16" | "4:3";

export interface GenerateImageRequest {
  prompt: string;
  model: ImageModel;
  resolution: ImageResolution;
  ratio: ImageRatio;
}

export interface GenerateImageResponse {
  imageBase64: string;
  source: "mock" | "azure";
  model: ImageModel;
}

export interface ApiErrorPayload {
  error: string;
  code?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  imageDataUrl?: string;
}
