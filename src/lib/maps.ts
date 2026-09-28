/**
 * Enlaces a Google Maps con las coordenadas de un lugar (Maps URLs): no usan
 * API ni clave y no traen contenido de Google al sitio; abren la app o la web
 * de Google Maps.
 */
export function googleMapsUrls({ lat, lng }: { lat: number; lng: number }) {
  const q = `${lat},${lng}`;
  return {
    ver: `https://www.google.com/maps/search/?api=1&query=${q}`,
    llegar: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    /* Street View en el punto más cercano con imágenes. */
    calle: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${q}`,
  };
}

/** Distancia en línea recta entre dos puntos, en metros (fórmula de haversine). */
export function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** "350 m" o "1,2 km". */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters / 10) * 10} m`;
  return `${(meters / 1000).toLocaleString("es-CL", { maximumFractionDigits: 1 })} km`;
}

/** Punto dentro de un anillo [lat, lng] (algoritmo de trazado de rayos). */
export function insideRing(
  lat: number,
  lng: number,
  ring: [number, number][]
): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [latI, lngI] = ring[i];
    const [latJ, lngJ] = ring[j];
    if (
      latI > lat !== latJ > lat &&
      lng < ((lngJ - lngI) * (lat - latI)) / (latJ - latI) + lngI
    ) {
      inside = !inside;
    }
  }
  return inside;
}

/** Primera área (sector o unidad vecinal) que contiene el punto, si hay. */
export function findArea<T extends { ring: [number, number][] }>(
  { lat, lng }: { lat: number; lng: number },
  areas: T[]
): T | null {
  return areas.find((area) => insideRing(lat, lng, area.ring)) ?? null;
}
