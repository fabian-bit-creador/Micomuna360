"""Genera src/data/communes/la-pintana/street-markets.ts desde la capa de GeoPintana.

Uso (desde la raíz del repositorio):
    python3 docs/fuentes/la-pintana-ferias-2026-10/generar.py

Lee ferias.geojson (solo «FERIA LIBRE» y «FERIA PERSA», ver metodologia.md),
escribe el dataset y ferias.csv. Se detiene si cambia la cantidad de
polígonos o aparece uno sin nombre legible definido aquí.
"""

import csv
import json
import math
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("src/data/communes/la-pintana/street-markets.ts")
SECTORS = Path("docs/fuentes/la-pintana-territorio-2026-09/sectores.geojson")

EXPECTED_FEATURES = 20

# FID → (nombre, ubicación). Ortografía normal con tildes, sin cambiar el
# contenido; las calles se contrastaron con OpenStreetMap. El original queda
# en ferias.csv.
READABLE = {
    1: ("Vicente Llanos", "Vicente Llanos, desde San Francisco hasta pasaje Gala"),
    2: ("El Bosque", "Del Sembrador, entre El Bosque y Pedro Aguirre Cerda"),
    3: ("Santa Magdalena", "Pedro Aguirre Cerda, entre avenida El Observatorio y Violeta Parra"),
    4: ("Almirante Latorre", "Almirante Latorre, entre avenida El Observatorio y Violeta Parra"),
    5: ("San Francisco", "Celanova, entre San Francisco y pasaje San Matías"),
    6: ("Joaquín Edwards Bello", "Joaquín Edwards Bello, entre Santo Tomás y Pablo VI"),
    7: ("Santo Tomás (ex Concierto 1)", "Santo Tomás, entre Bahía Catalina y avenida La Serena (4 Oriente)"),
    8: ("General Arriagada", "General Arriagada, entre Bahía Catalina y pasaje Carmen"),
    9: ("El Fundador", "El Fundador, entre Batallón Chacabuco y El Ombú"),
    10: ("El Ombú", "El Ombú, entre Sexto de Línea y El Hualle"),
    11: ("21 de Mayo", "General Bernardino Parada, entre José Toribio Medina y Profesor Julio Chávez"),
    12: ("John Kennedy", "John Kennedy, entre Lo Martínez y Lo Blanco"),
    13: ("San Rafael", "Padre Pablo Laurín, entre Porto Alegre y Patagonia"),
    14: ("J. Ramírez", "Julio Barrenechea, entre San Francisco y Profesor Julio Chávez"),
    15: ("Las Águilas", "Las Águilas, desde Violeta Parra hasta Antonio Machado y al oriente hasta Francisco de Goya"),
    28: ("Avenida La Serena (ex Las Parcelas)", "Avenida La Serena (4 Oriente), entre Santo Tomás y General Arriagada"),
    33: ("Tongoy", "Tongoy, entre el límite oriente de la comuna y el pasaje 6"),
    41: ("El Lingue", "El Lingue, entre Juanita y pasaje El Lilén"),
    42: ("Juanita", "Juanita, entre El Ombú y Batallón Maipo"),
    # Segundo circuito de Joaquín Edwards Bello: misma calle y días que el 6.
    43: ("Joaquín Edwards Bello", "Joaquín Edwards Bello, entre Santo Tomás y Pablo VI"),
}

DAYS = {
    "LUNES": "lunes",
    "MARTES": "martes",
    "MIERCOLES": "miercoles",
    "JUEVES": "jueves",
    "VIERNES": "viernes",
    "SABADO": "sabado",
    "SABADOS": "sabado",
    "DOMINGO": "domingo",
    "DOMINGOS": "domingo",
}
ORDER = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]


def slug(text: str) -> str:
    table = str.maketrans("áéíóúñü", "aeiounu")
    out = "".join(c if c.isalnum() else "-" for c in text.lower().translate(table))
    return "-".join(p for p in out.split("-") if p)


def parse_days(text: str) -> tuple[list[str], bool]:
    """«MARTES, VIERNES Y DOMINGOS (CIRCUITO X)» → días y si incluye festivos."""
    base = text.split("(")[0].replace(",", " ").replace(" Y ", " ")
    days, holidays = [], False
    for word in base.split():
        if word == "FESTIVOS":
            holidays = True
        elif word in DAYS:
            days.append(DAYS[word])
        else:
            raise SystemExit(f"día no reconocido: {word!r} en {text!r}")
    return sorted(set(days), key=ORDER.index), holidays


def inside(lat, lng, ring) -> bool:
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


def edge_distance(lat, lng, ring) -> float:
    k = math.cos(math.radians(lat))
    best = math.inf
    for i in range(len(ring)):
        (ay, ax), (by, bx) = ring[i - 1], ring[i]
        ax, bx, px = ax * k, bx * k, lng * k
        dx, dy = bx - ax, by - ay
        t = 0.0 if dx == dy == 0 else max(0, min(1, ((px - ax) * dx + (lat - ay) * dy) / (dx * dx + dy * dy)))
        best = min(best, math.hypot(px - (ax + t * dx), lat - (ay + t * dy)))
    return best


def label_point(ring):
    """Punto interior más alejado del borde. Las ferias son franjas angostas
    sobre la calle, así que la grilla es fina (200 × 200)."""
    lats = [p[0] for p in ring]
    lngs = [p[1] for p in ring]
    best, best_d = None, -1.0
    steps = 200
    for a in range(1, steps):
        lat = min(lats) + (max(lats) - min(lats)) * a / steps
        for b in range(1, steps):
            lng = min(lngs) + (max(lngs) - min(lngs)) * b / steps
            if inside(lat, lng, ring):
                d = edge_distance(lat, lng, ring)
                if d > best_d:
                    best, best_d = (lat, lng), d
    if best is None:
        raise SystemExit("no se encontró un punto interior")
    return round(best[0], 6), round(best[1], 6)


def ring_of(geometry):
    if geometry["type"] != "Polygon":
        raise SystemExit(f"geometría inesperada: {geometry['type']}")
    ring = [(round(lat, 6), round(lng, 6)) for lng, lat in geometry["coordinates"][0]]
    return ring[:-1] if ring[0] == ring[-1] else ring


def sector_of(point, sectors):
    for name, ring in sectors:
        if inside(point[0], point[1], ring):
            return name
    return None


def main() -> None:
    features = json.loads((HERE / "ferias.geojson").read_text())["features"]
    if len(features) != EXPECTED_FEATURES:
        raise SystemExit(f"se esperaban {EXPECTED_FEATURES} polígonos; llegaron {len(features)}")
    sectors = [
        (f["properties"]["SECTOR"], ring_of(f["geometry"]))
        for f in json.loads(SECTORS.read_text())["features"]
    ]

    markets: dict[str, dict] = {}
    rows = []
    for f in sorted(features, key=lambda f: f["properties"]["FID"]):
        p = f["properties"]
        fid = p["FID"]
        if fid not in READABLE:
            raise SystemExit(f"falta el nombre legible del FID {fid} ({p['NOMBRE']})")
        name, location = READABLE[fid]
        kind = "persa" if p["TIPO"] == "FERIA PERSA" else "feria"
        days, holidays = parse_days(p["DIAS_FUNCI"])
        start, end = p["HORARIO"].split("-")
        stalls = int(p["TOTAL_PUES"]) if p["TOTAL_PUES"].strip().isdigit() else None
        ring = ring_of(f["geometry"])
        rows.append([fid, p["TIPO"], p["NOMBRE"], p["DIAS_FUNCI"], p["HORARIO"], p["TOTAL_PUES"],
                     p["SECTOR_"], p["UBICACION"], p["DOC"], name, location])

        key = slug(f"{kind} {name}")
        if key in markets:
            # Mismo tramo y días: un segundo circuito de la misma feria.
            m = markets[key]
            if m["days"] != days or m["location"] != location:
                raise SystemExit(f"{name}: dos polígonos con días o tramo distintos")
            m["circuits"] += 1
            m["stalls"] = (m["stalls"] or 0) + (stalls or 0) if stalls else m["stalls"]
            continue
        label = label_point(ring)
        sector = sector_of(label, sectors)
        if sector != p["SECTOR_"]:
            print(f"aviso: {name} cae en {sector}; la capa dice {p['SECTOR_']}")
        markets[key] = {
            "id": f"lp-{key}",
            "name": name,
            "kind": kind,
            "days": days,
            "holidays": holidays,
            "start": start,
            "end": end,
            "stalls": stalls,
            "location": location,
            "decree": p["DOC"].strip() or None,
            "circuits": 1,
            "label": label,
            "ring": ring,
        }

    items = sorted(markets.values(), key=lambda m: (m["kind"] != "feria", m["name"]))
    lines = [
        'import type { StreetMarket } from "@/types";',
        "",
        "/**",
        " * Ferias libres y persas autorizadas de La Pintana: capa FERIAS_LIBRES de",
        " * GeoPintana (datos editados el 2022-12-19). Archivo generado por",
        " * docs/fuentes/la-pintana-ferias-2026-10/generar.py: no se edita a mano.",
        " */",
        "export const streetMarkets: StreetMarket[] = [",
    ]
    for m in items:
        note = (
            f"Funciona en {m['circuits']} circuitos con el mismo horario."
            if m["circuits"] > 1
            else None
        )
        ring = "[" + ", ".join(f"[{lat}, {lng}]" for lat, lng in m["ring"]) + "]"
        lines += [
            "  {",
            f'    id: "{m["id"]}",',
            f'    name: "{m["name"]}",',
            f'    kind: "{m["kind"]}",',
            f"    days: {json.dumps(m['days'])},",
            f"    holidays: {'true' if m['holidays'] else 'false'},",
            f'    startTime: "{m["start"]}",',
            f'    endTime: "{m["end"]}",',
            f"    stalls: {m['stalls'] if m['stalls'] is not None else 'null'},",
            f'    location: "{m["location"]}",',
            f"    note: {json.dumps(note, ensure_ascii=False) if note else 'null'},",
            f"    label: [{m['label'][0]}, {m['label'][1]}],",
            f"    ring: {ring},",
            '    sourceId: "lp-geo-ferias",',
            "  },",
        ]
    lines += ["];", ""]
    OUT.write_text("\n".join(lines))

    with (HERE / "ferias.csv").open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["fid", "tipo", "nombre_original", "dias_original", "horario", "puestos",
                    "sector_capa", "ubicacion_original", "decreto", "nombre_publicado",
                    "ubicacion_publicada"])
        w.writerows(rows)

    print(f"{len(items)} ferias y persas ({len(features)} polígonos) → {OUT}")


if __name__ == "__main__":
    main()
