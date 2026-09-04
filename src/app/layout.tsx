import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";

import { siteConfig, siteUrl } from "@/config/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
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
    url: "/",
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
      className={`${nunito.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
