export type ChatRole = "user" | "agent";

/** One message in the conversation (user or agent). */
export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
};

export type ChatHistory = ChatMessage[];
