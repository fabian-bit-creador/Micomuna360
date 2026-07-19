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

const nextConfig: NextConfig = {
  async redirects() {
    return legacyPublicPaths.map((path) => ({
      source: `/${path}/:rest*`,
      destination: `/los-aromos/${path}/:rest*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
