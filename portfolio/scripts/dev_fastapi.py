"""Start uvicorn with port from .env.local (keeps Next rewrites in sync)."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _deps_installed() -> bool:
    try:
        import fastapi  # noqa: F401
        import uvicorn  # noqa: F401

        return True
    except ImportError:
        return False


def main() -> None:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
    load_dotenv(ROOT / ".env.local")

    port = os.environ.get("FASTAPI_PORT", "5329")

    if not _deps_installed():
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", "requirements.txt"],
            cwd=ROOT,
            check=True,
        )
    subprocess.run(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "python.index:app",
            "--reload",
            "--port",
            port,
        ],
        cwd=ROOT,
        check=True,
    )


if __name__ == "__main__":
    main()
