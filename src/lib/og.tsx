import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link preview image (WhatsApp, Teams, Kevra...) shared by the site and each topic.
export const ogSize = { width: 1200, height: 630 };

const assets = join(process.cwd(), "src/assets");

export async function renderOg({ title, subtitle, label }: { title: string; subtitle: string; label?: string }) {
  const [badge, semibold, regular] = await Promise.all([
    readFile(join(assets, "brand/course-badge.png"), "base64"),
    readFile(join(assets, "fonts/Geist-SemiBold.ttf")),
    readFile(join(assets, "fonts/Geist-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#ffffff",
          padding: "0 80px",
          gap: 64,
          fontFamily: "Geist",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${badge}`} width={400} height={400} alt="" />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {label && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "#ebf0fe",
                color: "#1a3fb3",
                fontSize: 26,
                fontWeight: 600,
                padding: "8px 18px",
                borderRadius: 12,
                marginBottom: 28,
              }}
            >
              {label}
            </div>
          )}
          <div style={{ fontSize: 76, fontWeight: 600, color: "#14161b", letterSpacing: "-0.04em", lineHeight: 1.02 }}>
            {title}
          </div>
          <div style={{ fontSize: 32, color: "#474e5c", marginTop: 24, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: semibold, style: "normal", weight: 600 },
        { name: "Geist", data: regular, style: "normal", weight: 400 },
      ],
    },
  );
}
