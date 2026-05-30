import type { ChatMessage, ChatRole } from "@/lib/chat-types";

export function createChatMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}
