import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";

import { siteConfig, siteUrl } from "@/config/site";
import "./globals.css";

/*
 * Texto: Public Sans, hecha para sitios de servicio público: neutra, de
 * letras abiertas y con cifras claras (teléfonos, montos, horarios).
 * Títulos y cifras destacadas: Archivo, con el eje de ancho para usarla
 * algo condensada, como el rótulo de una señal (ver DESIGN.md).
 */
const text = Public_Sans({
  variable: "--font-text",
  subsets: ["latin"],
});

const display = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MiComuna360 — Tu comuna en un solo lugar",
    template: "%s | MiComuna360",
  },
  description:
    "Plataforma digital que conecta vecinos, municipios y datos comunales en un solo lugar. Conecta, participa y transforma tu entorno.",
  applicationName: siteConfig.name,
  /* Vista previa al compartir el enlace (WhatsApp, redes, mensajería). */
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "es_CL",
    title: "MiComuna360 — Tu comuna en un solo lugar",
    description: siteConfig.sublema,
  },
  twitter: {
    card: "summary_large_image",
    title: "MiComuna360 — Tu comuna en un solo lugar",
    description: siteConfig.sublema,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${text.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
