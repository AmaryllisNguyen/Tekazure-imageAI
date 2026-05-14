import { useState } from "react";
import type { GenerateImageRequest, ImageRatio, ImageResolution } from "../types";

interface ComposerProps {
  loading: boolean;
  onSubmit: (input: GenerateImageRequest) => Promise<void>;
}

const RESOLUTION_OPTIONS: ImageResolution[] = ["512", "1024"];
const RATIO_OPTIONS: ImageRatio[] = ["1:1", "16:9", "9:16", "4:3"];

export function Composer({ loading, onSubmit }: ComposerProps) {
  const [prompt, setPrompt] = useState("");
  const [resolution, setResolution] = useState<ImageResolution>("1024");
  const [ratio, setRatio] = useState<ImageRatio>("1:1");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const normalizedPrompt = prompt.trim();
    if (!normalizedPrompt || loading) {
      return;
    }

    await onSubmit({
      prompt: normalizedPrompt,
      model: "1.5",
      resolution,
      ratio
    });
    setPrompt("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-controls">
        <label>
          Resolution
          <select value={resolution} onChange={(event) => setResolution(event.target.value as ImageResolution)}>
            {RESOLUTION_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ratio
          <select value={ratio} onChange={(event) => setRatio(event.target.value as ImageRatio)}>
            {RATIO_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Describe the image you want..."
        rows={3}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !prompt.trim()}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
