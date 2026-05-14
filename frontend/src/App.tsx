import { useMemo, useState } from "react";
import { Composer } from "./components/Composer";
import { ApiClientError, generateImage } from "./services/api";
import type { ChatMessage, GenerateImageRequest } from "./types";

function formatErrorMessage(error: unknown) {
  if (error instanceof ApiClientError) {
    return `${error.message}${error.code ? ` (${error.code})` : ""}`;
  }
  return "Unable to generate image. Please try again.";
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  async function handleGenerate(input: GenerateImageRequest) {
    setError("");
    setLoading(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: input.prompt
    };
    setMessages((current) => [...current, userMessage]);

    try {
      const response = await generateImage(input);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: `Generated with model ${response.model} (${response.source})`,
        imageDataUrl: `data:image/png;base64,${response.imageBase64}`
      };
      setMessages((current) => [...current, assistantMessage]);
    } catch (err) {
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">Image Chat</header>
      <main className="message-feed" aria-live="polite">
        {!hasMessages && <p className="empty-state">Enter a prompt below to generate your first image.</p>}
        {messages.map((message) => (
          <article key={message.id} className={`message message-${message.role}`}>
            <p>{message.text}</p>
            {message.imageDataUrl ? <img src={message.imageDataUrl} alt={message.text} loading="lazy" /> : null}
          </article>
        ))}
      </main>
      <footer className="composer-wrap">
        {error ? <div className="error-banner">{error}</div> : null}
        <Composer loading={loading} onSubmit={handleGenerate} />
      </footer>
    </div>
  );
}
