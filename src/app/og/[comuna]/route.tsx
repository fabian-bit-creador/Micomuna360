import { ImageResponse } from "next/og";

import { getCommune, listCommunes } from "@/config/communes";
import { brandMarkDataUrl } from "../brand-mark";

const size = { width: 1200, height: 630 };

/* Solo comunas registradas; cada tarjeta se genera en el build. */
export const dynamicParams = false;

export function generateStaticParams() {
  return listCommunes().map((c) => ({ comuna: c.id }));
}

/**
 * Tarjeta de vista previa por comuna: deja claro desde el enlace compartido
 * si se trata de información pública o de la comuna de ejemplo. Vive en
 * una URL estable (/og/<comuna>) que declara cada página (ver lib/seo.ts).
 */
export async function GET(
  _request: Request,
  { params }: RouteContext<"/og/[comuna]">
) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  const name = commune?.name ?? "MiComuna360";
  const isDemo = commune?.isDemo ?? true;
  const label = isDemo
    ? "Comuna de ejemplo · datos ficticios"
    : "Información pública con fuente y fecha";
  const accent = isDemo ? "#1e8e89" : "#c95b5b";
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
            width={64}
            height={64}
            alt=""
            style={{ borderRadius: "999px", background: "#f7f7f2", padding: "4px" }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            MiComuna<span style={{ color: "#67b7d1" }}>360</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -3,
            marginTop: "40px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "#67b7d1",
            marginTop: "10px",
          }}
        >
          en un solo lugar
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: "14px",
            marginTop: "48px",
            padding: "14px 26px",
            borderRadius: "999px",
            border: `2px solid ${accent}`,
            fontSize: 24,
            color: "#e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: accent,
            }}
          />
          {label}
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
