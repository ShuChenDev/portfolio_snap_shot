import os
from pathlib import Path
from typing import Literal

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, Field

# Next.js keeps secrets in .env.local; load it for local FastAPI dev.
_root = Path(__file__).resolve().parent.parent
load_dotenv(_root / ".env")
load_dotenv(_root / ".env.local")

from python.agent import run_agent

app = FastAPI()
api = APIRouter()


class HistoryItem(BaseModel):
    role: Literal["user", "agent"]
    content: str


class SendChatRequest(BaseModel):
    message: str
    history: list[HistoryItem] = Field(default_factory=list)


@api.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "agent": "deepagents-haiku"}


@api.post("/send_chat")
def send_chat(body: SendChatRequest) -> dict[str, str]:
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="message is required")

    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise HTTPException(
            status_code=503,
            detail="ANTHROPIC_API_KEY is not configured on the server.",
        )

    try:
        reply = run_agent(
            message=body.message.strip(),
            history=[item.model_dump() for item in body.history],
        )
    except Exception as exc:
        print(f"[send_chat] agent error: {exc!r}", flush=True)
        detail = (
            f"Agent error: {exc}"
            if not os.environ.get("VERCEL")
            else "Agent failed to generate a reply."
        )
        raise HTTPException(status_code=500, detail=detail) from exc

    print(f"[send_chat] ok ({len(reply)} chars)", flush=True)
    return {"message": reply}


# Vercel Services strips routePrefix (/api/py) before forwarding.
app.include_router(api)
# Local uvicorn and legacy single-function deploy use the full path prefix.
app.include_router(api, prefix="/api/py")
