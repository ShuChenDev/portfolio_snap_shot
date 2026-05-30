from deepagents import create_deep_agent
from langchain_core.messages import AIMessage, BaseMessage

from python.system_prompt import SYSTEM_PROMPT

_agent = create_deep_agent(
    model="anthropic:claude-haiku-4-5",
    system_prompt=SYSTEM_PROMPT,
)


def _message_text(content: object) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for block in content:
            if isinstance(block, str):
                parts.append(block)
            elif isinstance(block, dict) and isinstance(block.get("text"), str):
                parts.append(block["text"])
        return "".join(parts)
    return str(content)


def _last_ai_text(messages: list[BaseMessage]) -> str:
    for message in reversed(messages):
        if isinstance(message, AIMessage):
            return _message_text(message.content)
    raise ValueError("Agent did not return an AI message")


def run_agent(
    message: str,
    history: list[dict[str, str]] | None = None,
) -> str:
    messages: list[dict[str, str]] = []

    for item in history or []:
        role = item["role"]
        messages.append(
            {
                "role": "user" if role == "user" else "assistant",
                "content": item["content"],
            }
        )

    messages.append({"role": "user", "content": message})

    result = _agent.invoke({"messages": messages})
    return _last_ai_text(result["messages"])
