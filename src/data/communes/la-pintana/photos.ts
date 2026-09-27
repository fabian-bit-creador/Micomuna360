import type { Photo } from "@/types";

/**
 * Fotos reales de La Pintana con licencia libre (Wikimedia Commons),
 * redimensionadas a 1280 px y convertidas a WebP sin otros cambios.
 * Criterios en docs/imagenes.md.
 */
export const photos: Photo[] = [
  {
    id: "lp-foto-plaza",
    src: "/images/la-pintana/plaza-de-la-pintana.webp",
    width: 1280,
    height: 576,
    alt: "Plaza de Armas de La Pintana: senderos de ladrillo, palmeras y árboles en un día nublado.",
    caption: "Plaza de Armas de La Pintana",
    author: "Alexisaherven",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Plaza_de_La_Pintana_25-05-2025_(1).jpg",
    retrievedAt: "2026-09-27",
    placeId: null,
  },
  {
    id: "lp-foto-estadio-cancha-2",
    src: "/images/la-pintana/estadio-municipal-cancha-2.webp",
    width: 1280,
    height: 576,
    alt: "Cancha de pasto del Estadio Municipal de La Pintana, con árboles y la cordillera al fondo.",
    author: "Alexisaherven",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cancha_2_Estadio_Municipal_de_La_Pintana_(1).jpg",
    retrievedAt: "2026-09-27",
    placeId: null,
  },
  {
    id: "lp-foto-estadio",
    src: "/images/la-pintana/estadio-municipal.webp",
    width: 1280,
    height: 576,
    alt: "Cancha principal y pista atlética del Estadio Municipal de La Pintana, con sus graderías.",
    author: "Alexisaherven",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Estadio_Municipal_de_La_Pintana_(1).jpg",
    retrievedAt: "2026-09-27",
    placeId: "lp-pl-estadio",
  },
  {
    id: "lp-foto-polideportivo",
    src: "/images/la-pintana/polideportivo.webp",
    width: 1280,
    height: 576,
    alt: "Edificio del Polideportivo de La Pintana visto desde la calle, con una micro pasando.",
    author: "Alexisaherven",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Polideportivo_Municipal_de_La_Pintana.jpg",
    retrievedAt: "2026-09-27",
    placeId: "lp-pl-polideportivo",
  },
];
