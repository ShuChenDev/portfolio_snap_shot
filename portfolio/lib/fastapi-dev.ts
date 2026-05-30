export const FASTAPI_PORT = process.env.FASTAPI_PORT ?? "5329";

export const FASTAPI_DEV_URL = `http://127.0.0.1:${FASTAPI_PORT}`;

export const FASTAPI_SEND_CHAT_PATH = "/api/py/send_chat";

export function getFastApiSendChatUrl(): string {
  if (process.env.NODE_ENV === "development") {
    return `${FASTAPI_DEV_URL}${FASTAPI_SEND_CHAT_PATH}`;
  }

  const host = process.env.VERCEL_URL;
  if (host) {
    return `https://${host}${FASTAPI_SEND_CHAT_PATH}`;
  }

  return `${FASTAPI_DEV_URL}${FASTAPI_SEND_CHAT_PATH}`;
}
