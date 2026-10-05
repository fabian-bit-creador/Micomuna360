import type { NextConfig } from "next";

/**
 * Rutas públicas previas a la arquitectura multicomuna. Redirigen de forma
 * permanente a la comuna demo Los Aromos para no romper enlaces compartidos.
 */
const legacyPublicPaths = [
  "noticias",
  "actividades",
  "tramites",
  "telefonos",
  "datos",
  "reportar",
  "comunidad",
  "directorio",
  "mapa",
];

const isDev = process.env.NODE_ENV === "development";

/*
 * Política de seguridad de contenido. Sin nonces para que las páginas sigan
 * siendo estáticas (ver la guía "Content Security Policy" de Next): scripts y
 * estilos propios más los inline que genera Next; imágenes propias y las
 * teselas de OpenStreetMap; nada de objetos incrustados ni de terceros que
 * puedan enmarcar el sitio. En desarrollo se permite 'unsafe-eval' (recarga
 * en caliente).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://tile.openstreetmap.org",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  /* Envía solo el origen a otros sitios: OpenStreetMap exige un Referer
     válido para usar sus teselas, pero no necesita la ruta completa. */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  /* Sin cámara, micrófono ni pagos. La ubicación solo para el propio sitio
     («Cerca de mí» en el mapa, que no la guarda ni la envía). */
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(self), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacyPublicPaths.map((path) => ({
      source: `/${path}/:rest*`,
      destination: `/los-aromos/${path}/:rest*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
