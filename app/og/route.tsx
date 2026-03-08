import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #eef2f7 100%)",
          color: "#0b1018"
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 18, color: "#2c3c52" }}>
          {SITE.role} · {SITE.location}
        </div>
        <div style={{ fontSize: 26, marginTop: 28, color: "#121a26", maxWidth: 900 }}>
          {SITE.headline}
        </div>
        <div style={{ fontSize: 22, marginTop: 40, color: "#546d8f" }}>
          {SITE.seo.siteUrl.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
