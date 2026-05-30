import type { NextConfig } from "next";
import path from "node:path";

const FASTAPI_PORT = process.env.FASTAPI_PORT ?? "5329";
const FASTAPI_DEV_URL = `http://127.0.0.1:${FASTAPI_PORT}`;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    return [
      {
        source: "/api/py/:path*",
        destination: `${FASTAPI_DEV_URL}/api/py/:path*`,
      },
    ];
  },
};

export default nextConfig;
