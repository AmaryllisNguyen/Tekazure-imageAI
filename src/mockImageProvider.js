export const SAMPLE_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export function generateMockImage({ prompt, model }) {
  return {
    imageBase64: SAMPLE_PNG_BASE64,
    model,
    source: "mock",
    prompt
  };
}
