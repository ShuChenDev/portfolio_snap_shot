import type { ChatHistory } from "@/lib/chat-types";

/** Proxied to FastAPI in dev (next.config rewrite); Python on Vercel in prod. */
const SEND_CHAT_URL = "/api/py/send_chat";

export type SendChatResponse = {
  message: string;
};

export type SendChatPayload = {
  message: string;
  history: ChatHistory;
};

export class ChatApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ChatApiError";
  }
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as {
      detail?: string | { msg?: string }[];
      error?: string;
    };

    if (typeof data.error === "string") return data.error;
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail) && data.detail[0]?.msg) {
      return data.detail[0].msg;
    }
  } catch {
    // ignore JSON parse errors
  }

  if (response.status === 503) {
    return "Agent unavailable. Set ANTHROPIC_API_KEY in Vercel project settings (or .env.local for local dev).";
  }

  if (response.status === 500) {
    return "The agent failed to generate a reply. Check Vercel function logs for the Python backend.";
  }

  return `Chat request failed (${response.status})`;
}

export async function sendChat({
  message,
  history,
}: SendChatPayload): Promise<SendChatResponse> {
  let response: Response;
  try {
    response = await fetch(SEND_CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.map(({ role, content }) => ({ role, content })),
      }),
    });
  } catch {
    throw new ChatApiError(
      "Could not reach the agent backend. For local dev, run npm run dev and wait for FastAPI to start.",
      0,
    );
  }

  if (!response.ok) {
    throw new ChatApiError(await parseErrorMessage(response), response.status);
  }

  const data = (await response.json()) as SendChatResponse;

  if (!data.message?.trim()) {
    throw new ChatApiError("Agent returned an empty reply.", 502);
  }

  return data;
}

/** Entry point for the home-page “Ask me anything…” composer. */
export async function askMeAnything(
  message: string,
  history: ChatHistory,
): Promise<SendChatResponse> {
  return sendChat({ message, history });
}
