"""Genera src/data/communes/la-pintana/territory.ts desde las capas de GeoPintana.

Uso (desde la raíz del repositorio):
    python3 docs/fuentes/la-pintana-territorio-2026-09/generar.py

Lee sectores.geojson y unidades-vecinales.geojson (descargados del geoportal,
ver metodologia.md), escribe el dataset y resumen.csv. Se detiene si una capa
no trae la cantidad de polígonos esperada.
"""

import csv
import json
import math
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("src/data/communes/la-pintana/territory.ts")

EXPECTED_SECTORS = 12
EXPECTED_UNITS = 24

# Nombre oficial → nombre legible (ortografía normal, sin el prefijo «SECTOR»).
SECTOR_NAMES = {
    "SECTOR ANTUMAPU": "Antumapu",
    "SECTOR CENTRO": "Centro",
    "SECTOR EL CASTILLO": "El Castillo",
    "SECTOR EL ROBLE": "El Roble",
    "SECTOR EX FUNDO LA ESPERANZA": "Ex Fundo La Esperanza",
    "SECTOR EX FUNDO LA PRIMAVERA": "Ex Fundo La Primavera",
    "SECTOR EX FUNDO SAN ANTONIO": "Ex Fundo San Antonio",
    "SECTOR HUERTOS JOSE MAZA DE LA PINTANA": "Huertos José Maza",
    "SECTOR LA PLATINA": "La Platina",
    "SECTOR LAS ROSAS": "Las Rosas",
    "SECTOR MAPUHUE": "Mapuhue",
    "SECTOR SANTO TOMAS": "Santo Tomás",
}


def slug(text: str) -> str:
    table = str.maketrans("áéíóúñ", "aeioun")
    return "-".join(text.lower().translate(table).split())


def outer_ring(geometry) -> list[tuple[float, float]]:
    """Anillo exterior en [lat, lng], sin repetir el punto de cierre."""
    if geometry["type"] != "Polygon" or len(geometry["coordinates"]) != 1:
        raise SystemExit(f"geometría inesperada: {geometry['type']}")
    ring = [(round(lat, 5), round(lng, 5)) for lng, lat in geometry["coordinates"][0]]
    if ring[0] == ring[-1]:
        ring = ring[:-1]
    return ring


def inside(lat: float, lng: float, ring) -> bool:
    result = False
    j = len(ring) - 1
    for i in range(len(ring)):
        (lat_i, lng_i), (lat_j, lng_j) = ring[i], ring[j]
        if (lat_i > lat) != (lat_j > lat) and lng < (lng_j - lng_i) * (lat - lat_i) / (
            lat_j - lat_i
        ) + lng_i:
            result = not result
        j = i
    return result


def edge_distance(lat: float, lng: float, ring) -> float:
    """Distancia (en grados, con la longitud corregida) al borde más cercano."""
    k = math.cos(math.radians(lat))
    best = math.inf
    for i in range(len(ring)):
        (ay, ax), (by, bx) = ring[i - 1], ring[i]
        ax, bx, px = ax * k, bx * k, lng * k
        dx, dy = bx - ax, by - ay
        t = 0.0 if dx == dy == 0 else max(0, min(1, ((px - ax) * dx + (lat - ay) * dy) / (dx * dx + dy * dy)))
        best = min(best, math.hypot(px - (ax + t * dx), lat - (ay + t * dy)))
    return best


def label_point(ring) -> tuple[float, float]:
    """Punto interior más alejado de los bordes (búsqueda en grilla): ahí va
    el rótulo, que así nunca cae fuera de un polígono cóncavo."""
    lats = [p[0] for p in ring]
    lngs = [p[1] for p in ring]
    best, best_d = None, -1.0
    steps = 60
    for a in range(1, steps):
        for b in range(1, steps):
            lat = min(lats) + (max(lats) - min(lats)) * a / steps
            lng = min(lngs) + (max(lngs) - min(lngs)) * b / steps
            if inside(lat, lng, ring):
                d = edge_distance(lat, lng, ring)
                if d > best_d:
                    best, best_d = (lat, lng), d
    return round(best[0], 5), round(best[1], 5)


def area_km2(ring) -> float:
    """Superficie aproximada (proyección local equirectangular)."""
    lat0 = sum(p[0] for p in ring) / len(ring)
    k = math.cos(math.radians(lat0)) * 111.32
    s = 0.0
    for i in range(len(ring)):
        (y1, x1), (y2, x2) = ring[i - 1], ring[i]
        s += (x1 * k) * (y2 * 110.57) - (x2 * k) * (y1 * 110.57)
    return abs(s) / 2


def ts_ring(ring) -> str:
    return "[" + ", ".join(f"[{lat}, {lng}]" for lat, lng in ring) + "]"


def main() -> None:
    sectors_raw = json.loads((HERE / "sectores.geojson").read_text())["features"]
    units_raw = json.loads((HERE / "unidades-vecinales.geojson").read_text())["features"]
    if len(sectors_raw) != EXPECTED_SECTORS or len(units_raw) != EXPECTED_UNITS:
        raise SystemExit(
            f"se esperaban {EXPECTED_SECTORS} sectores y {EXPECTED_UNITS} unidades vecinales; "
            f"llegaron {len(sectors_raw)} y {len(units_raw)}"
        )

    sectors = []
    for f in sectors_raw:
        official = f["properties"]["SECTOR"]
        name = SECTOR_NAMES[official]
        ring = outer_ring(f["geometry"])
        sectors.append(
            {"id": f"sector-{slug(name)}", "name": name, "official": official, "ring": ring}
        )
    sectors.sort(key=lambda s: s["name"])

    units = []
    for f in units_raw:
        official = f["properties"]["UN_VECINAL"]
        number = int(official.removeprefix("UV "))
        ring = outer_ring(f["geometry"])
        units.append({"id": f"uv-{number}", "number": number, "official": official, "ring": ring})
    units.sort(key=lambda u: u["number"])
    if [u["number"] for u in units] != list(range(1, EXPECTED_UNITS + 1)):
        raise SystemExit("la numeración de las unidades vecinales no es 1…24")

    lines = [
        'import type { CommuneTerritory } from "../types";',
        "",
        "/**",
        " * Sectores y unidades vecinales de La Pintana: capas SECTORES_LA_PINTANA y",
        " * UNIDADES_VECINALES del geoportal GeoPintana, en [lat, lng] con 5",
        " * decimales. Archivo generado por",
        " * docs/fuentes/la-pintana-territorio-2026-09/generar.py: no se edita a mano.",
        " */",
        "export const territory: CommuneTerritory = {",
        '  sourceId: "lp-geo-territorio",',
        "  sectors: [",
    ]
    for s in sectors:
        lat, lng = label_point(s["ring"])
        lines += [
            "    {",
            f'      id: "{s["id"]}",',
            f'      name: "{s["name"]}",',
            f"      label: [{lat}, {lng}],",
            f"      ring: {ts_ring(s['ring'])},",
            "    },",
        ]
    lines += ["  ],", "  neighborhoodUnits: ["]
    for u in units:
        lat, lng = label_point(u["ring"])
        lines += [
            "    {",
            f'      id: "{u["id"]}",',
            f'      name: "Unidad vecinal {u["number"]}",',
            f'      shortName: "UV {u["number"]}",',
            f"      label: [{lat}, {lng}],",
            f"      ring: {ts_ring(u['ring'])},",
            "    },",
        ]
    lines += ["  ],", "};", ""]
    OUT.write_text("\n".join(lines))

    with (HERE / "resumen.csv").open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["capa", "id", "nombre_oficial", "nombre_publicado", "puntos", "superficie_km2"])
        for s in sectors:
            w.writerow(["sector", s["id"], s["official"], s["name"], len(s["ring"]), f"{area_km2(s['ring']):.2f}"])
        for u in units:
            w.writerow(["unidad_vecinal", u["id"], u["official"], f"Unidad vecinal {u['number']}", len(u["ring"]), f"{area_km2(u['ring']):.2f}"])

    total_s = sum(area_km2(s["ring"]) for s in sectors)
    total_u = sum(area_km2(u["ring"]) for u in units)
    print(f"{len(sectors)} sectores ({total_s:.2f} km²) y {len(units)} unidades vecinales ({total_u:.2f} km²) → {OUT}")


if __name__ == "__main__":
    main()
