import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

const size = { width: 1200, height: 630 };

/* Imagen fija: se genera una vez en el build. */
export const dynamic = "force-static";

/**
 * Tarjeta de vista previa del portal (identidad de marca, sin fotos). Vive
 * en una URL estable (/og) para que cada página la declare en sus metadatos
 * (ver lib/seo.ts).
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #17375e 0%, #0f2038 100%)",
          color: "#f7f7f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              border: "7px solid #1e8e89",
              borderRightColor: "#67b7d1",
              borderBottomColor: "#c95b5b",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            MiComuna<span style={{ color: "#67b7d1" }}>360</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -3,
            marginTop: "44px",
            maxWidth: "900px",
          }}
        >
          Tu comuna en un solo lugar
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a9c4dd",
            marginTop: "28px",
            maxWidth: "880px",
          }}
        >
          {siteConfig.sublema}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "44px",
            fontSize: 24,
            color: "#67b7d1",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#1e8e89",
            }}
          />
          Plataforma ciudadana · información con fuente y fecha
        </div>
      </div>
    ),
    { ...size }
  );
}
