import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { brandMarkDataUrl } from "./brand-mark";

const size = { width: 1200, height: 630 };

/* Imagen fija: se genera una vez en el build. */
export const dynamic = "force-static";

/**
 * Tarjeta de vista previa del portal (identidad de marca, sin fotos). Vive
 * en una URL estable (/og) para que cada página la declare en sus metadatos
 * (ver lib/seo.ts).
 */
export async function GET() {
  const mark = await brandMarkDataUrl();
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
          position: "relative",
          background: "linear-gradient(135deg, #17375e 0%, #0f2038 100%)",
          color: "#f7f7f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse usa <img> */}
          <img
            src={mark}
            width={72}
            height={72}
            alt=""
            style={{ borderRadius: "999px", background: "#f7f7f2", padding: "4px" }}
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
            maxWidth: "620px",
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
            maxWidth: "600px",
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
        <div
          style={{
            position: "absolute",
            right: "70px",
            top: "115px",
            width: "400px",
            height: "400px",
            borderRadius: "999px",
            background: "#f7f7f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse usa <img> */}
          <img src={mark} width={330} height={330} alt="" />
        </div>
      </div>
    ),
    { ...size }
  );
}
