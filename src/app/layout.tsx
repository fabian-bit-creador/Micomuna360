import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
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
  title: {
    default: "MiComuna360 — Tu comuna en un solo lugar",
    template: "%s | MiComuna360",
  },
  description:
    "Plataforma digital que conecta vecinos, municipios y datos comunales en un solo lugar. Conecta, participa y transforma tu entorno.",
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
