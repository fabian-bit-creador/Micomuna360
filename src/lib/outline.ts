import type { CommuneBoundary, CommuneTerritory } from "@/data/communes";

/** Contorno de la comuna y de sus sectores, listo para dibujar en SVG. */
export interface CommuneOutlineShape {
  width: number;
  height: number;
  /** Límite comunal, como un trazo cerrado. */
  boundary: string;
  sectors: { id: string; name: string; d: string }[];
}

/* Simplificación de Douglas-Peucker: el límite oficial trae cientos de
   puntos que a este tamaño no se distinguen. */
function simplify(points: [number, number][], tolerance: number) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack: [number, number][] = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop()!;
    const [x1, y1] = points[first];
    const [x2, y2] = points[last];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy);
    let worst = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      /* Un anillo cerrado parte y termina en el mismo punto: ahí la
         distancia es al punto, no a una recta. */
      const distance = length
        ? Math.abs(dy * points[i][0] - dx * points[i][1] + x2 * y1 - y2 * x1) /
          length
        : Math.hypot(points[i][0] - x1, points[i][1] - y1);
      if (distance > worst) {
        worst = distance;
        index = i;
      }
    }
    if (index !== -1 && worst > tolerance) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/**
 * Proyecta el límite comunal y los sectores (anillos [lat, lng]) a un
 * dibujo de `width` unidades de ancho, con el norte arriba. A la escala de
 * una comuna basta corregir la longitud por el coseno de la latitud.
 */
export function communeOutline(
  boundary: CommuneBoundary,
  territory: CommuneTerritory | null,
  width = 400,
  padding = 6
): CommuneOutlineShape {
  const lats = boundary.coordinates.map((c) => c[0]);
  const lngs = boundary.coordinates.map((c) => c[1]);
  const north = Math.max(...lats);
  const south = Math.min(...lats);
  const west = Math.min(...lngs);
  const east = Math.max(...lngs);
  const squeeze = Math.cos((((north + south) / 2) * Math.PI) / 180);
  const scale = (width - padding * 2) / ((east - west) * squeeze);
  const height = Math.round((north - south) * scale + padding * 2);
  const project = ([lat, lng]: [number, number]): [number, number] => [
    padding + (lng - west) * squeeze * scale,
    padding + (north - lat) * scale,
  ];
  const path = (ring: [number, number][], tolerance: number) =>
    simplify(ring.map(project), tolerance)
      .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
      .join("") + "Z";

  return {
    width,
    height,
    boundary: path(boundary.coordinates, 0.6),
    sectors: (territory?.sectors ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      d: path(s.ring, 0.3),
    })),
  };
}
