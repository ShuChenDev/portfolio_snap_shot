import { ChatProvider } from "./ChatProvider";
import { Chrome } from "./Chrome";
import { ChatIntro } from "./ChatIntro";
import { ChatSurface } from "./ChatSurface";
import type { ChatContent } from "@/lib/career-content";

type FeaturedChatProps = {
  chat: ChatContent;
  showIntro?: boolean;
};

export function FeaturedChat({
  chat,
  showIntro = true,
}: FeaturedChatProps) {
  return (
    <ChatProvider>
      <section
        id="chat"
        aria-label="Portfolio chat"
        className="relative h-[var(--hero-region-h)]"
      >
        <Chrome />
        <ChatSurface />
        {showIntro ? <ChatIntro chat={chat} /> : null}
      </section>
    </ChatProvider>
  );
}
