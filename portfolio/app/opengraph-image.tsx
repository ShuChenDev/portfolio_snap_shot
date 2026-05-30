import { ImageResponse } from "next/og";

/** Branded social card. Auto-wired by Next into OpenGraph + Twitter metadata. */
export const alt = "Shu Chen — Software Engineer & Developer in Ottawa, Canada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1f2937 100%)",
          color: "#fafaf9",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          Portfolio · shuchen.ca
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, lineHeight: 1 }}>
            Shu Chen
          </div>
          <div style={{ display: "flex", fontSize: 46, opacity: 0.92 }}>
            Software Engineer &amp; Developer
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 34, opacity: 0.8 }}>
          Ottawa · Ontario · Canada — AI &amp; Fintech
        </div>
      </div>
    ),
    { ...size },
  );
}
