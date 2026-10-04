"""Genera src/data/communes/la-pintana/sports-sectors.ts.

Uso: python3 docs/fuentes/la-pintana-deportes-2026-09/sectores.py

Lee sectores-direcciones.json (resultado de ubicar en OpenStreetMap las
direcciones de los talleres de barrio, ver metodologia.md) y escribe el
sector de cada dirección con su método. Las direcciones sin sector seguro
no se incluyen.
"""

import json
import unicodedata
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("src/data/communes/la-pintana/sports-sectors.ts")


def key(text: str) -> str:
    text = unicodedata.normalize("NFD", text.upper().replace("SECTOR ", ""))
    return "".join(c for c in text if not unicodedata.combining(c)).strip()


# Identificadores de territory.ts (sector-<nombre>).
IDS = {
    "ANTUMAPU": "sector-antumapu",
    "CENTRO": "sector-centro",
    "EL CASTILLO": "sector-el-castillo",
    "EL ROBLE": "sector-el-roble",
    "LA PLATINA": "sector-la-platina",
    "LAS ROSAS": "sector-las-rosas",
    "SANTO TOMAS": "sector-santo-tomas",
}


def main() -> None:
    data = json.loads((HERE / "sectores-direcciones.json").read_text())
    rows = []
    for address, v in sorted(data.items()):
        if not v.get("sector"):
            continue
        method = "numero" if v["method"] == "casa" else "calle"
        rows.append((address, IDS[key(v["sector"])], method))
    lines = [
        'import type { AddressSector } from "../types";',
        "",
        "/**",
        " * Sector de las direcciones de los talleres de barrio (los que no van en",
        " * un recinto del directorio). Ubicadas en OpenStreetMap el 2026-10-04:",
        " * «numero» = la dirección exacta cae en el sector; «calle» = la calle",
        " * completa está dentro de un solo sector. Archivo generado por",
        " * docs/fuentes/la-pintana-deportes-2026-09/sectores.py.",
        " */",
        "export const addressSectors: AddressSector[] = [",
    ]
    for address, sector_id, method in rows:
        lines.append(
            f'  {{ address: "{address}", sectorId: "{sector_id}", method: "{method}", sourceId: "osm-nominatim" }},'
        )
    lines += ["];", ""]
    OUT.write_text("\n".join(lines))
    print(f"{len(rows)} direcciones con sector de {len(data)} → {OUT}")


if __name__ == "__main__":
    main()
