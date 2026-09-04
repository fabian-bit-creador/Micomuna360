import { ImageResponse } from "next/og";

import { getCommune, listCommunes } from "@/config/communes";

export const alt = "MiComuna360 — información de tu comuna en un solo lugar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return listCommunes().map((c) => ({ comuna: c.id }));
}

/**
 * Tarjeta de vista previa por comuna: deja claro desde el enlace compartido
 * si se trata del piloto informativo o de la comuna de demostración.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ comuna: string }>;
}) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  const name = commune?.name ?? "MiComuna360";
  const isDemo = commune?.isDemo ?? true;
  const label = isDemo
    ? "Comuna de demostración · datos ficticios"
    : "Piloto informativo · información pública con fuente y fecha";
  const accent = isDemo ? "#1e8e89" : "#c95b5b";

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
              width: "48px",
              height: "48px",
              borderRadius: "999px",
              border: "6px solid #1e8e89",
              borderRightColor: "#67b7d1",
              borderBottomColor: "#c95b5b",
              display: "flex",
            }}
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
      </div>
    ),
    { ...size }
  );
}
