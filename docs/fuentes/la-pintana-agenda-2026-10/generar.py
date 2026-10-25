"""Genera src/data/communes/la-pintana/events-cultura.ts desde la cartelera.

Uso (desde la raíz del repositorio):
    python3 docs/fuentes/la-pintana-agenda-2026-10/generar.py

Lee fichas/*.txt (ver capturar.py y metodologia.md) y escribe la agenda
cultural y agenda.csv. Se detiene si cambia la cantidad de fichas, falta un
título o una descripción aquí, o aparece una forma de entrada que no sea
«entrada liberada».
"""

import csv
import re
from datetime import date, timedelta
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("src/data/communes/la-pintana/events-cultura.ts")
EXPECTED = 3

# Título legible y descripción propia (sin nombres del elenco ni de la
# dirección). El título conserva el nombre con que se anuncia la función.
TEXTS = {
    "la-princesa-panchita-duoc-uc": (
        "La Princesa Panchita (Duoc UC)",
        "Nueva versión del clásico del teatro familiar chileno: una princesa que se niega a casarse con el pretendiente más rico, con humor y folclor campesino.",
    ),
    "comunicar-con-poder-masterclass-nacho-gutierrez-lp": (
        "Comunicar con poder: clase magistral de Nacho Gutiérrez",
        "Charla abierta con herramientas para hablar en público y expresarse con más seguridad en lo personal, el estudio y el trabajo.",
    ),
    "soy-magia-jean-paul-olhaberry": (
        "Soy Magia, de Jean Paul Olhaberry",
        "Espectáculo de magia e ilusionismo para toda la familia, que mezcla mitos ancestrales con grandes ilusiones.",
    ),
}


MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
          "agosto", "septiembre", "octubre", "noviembre", "diciembre"]


def first_sunday(year: int, month: int) -> date:
    d = date(year, month, 1)
    return d + timedelta(days=(6 - d.weekday()) % 7)


def chile_offset(d: date) -> str:
    """Chile continental: horario de verano (-03:00) desde el primer domingo
    de septiembre hasta el primer domingo de abril; si no, -04:00."""
    start = first_sunday(d.year, 9)
    end = first_sunday(d.year, 4)
    return "-03:00" if d >= start or d < end else "-04:00"


def hhmm(text: str) -> str:
    """«17:00 -03», «11:00 a.m.», «12:10 p.m.» o «19:30» → «HH:MM»."""
    m = re.match(r"(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.)?", text.strip())
    if not m:
        raise SystemExit(f"hora no reconocida: {text!r}")
    h, mi, ampm = int(m.group(1)), m.group(2), m.group(3)
    if ampm == "p.m." and h < 12:
        h += 12
    if ampm == "a.m." and h == 12:
        h = 0
    return f"{h:02d}:{mi}"


def field(lines: list[str], key: str) -> str:
    values = [l.split(":", 1)[1].strip() for l in lines if l.startswith(key + ":")]
    if not values:
        raise SystemExit(f"falta «{key}»")
    return values[-1]


def main() -> None:
    files = sorted((HERE / "fichas").glob("*.txt"))
    if len(files) != EXPECTED:
        raise SystemExit(f"se esperaban {EXPECTED} fichas; hay {len(files)}")
    events, rows = [], []
    for f in files:
        slug = f.stem
        if slug not in TEXTS:
            raise SystemExit(f"falta el título y la descripción de {slug}")
        lines = f.read_text().splitlines()
        if "ENTRADA LIBERADA" not in lines:
            raise SystemExit(f"{slug}: la entrada no es liberada; revisar el acceso")
        url = field(lines, "Fuente")
        day = re.fullmatch(r"(\d{2})/(\d{2})/(\d{4})", field(lines, "Fecha"))
        if not day:
            raise SystemExit(f"{slug}: fecha no reconocida")
        d = date(int(day.group(3)), int(day.group(2)), int(day.group(1)))
        offset = chile_offset(d)
        start = f"{d.isoformat()}T{hhmm(field(lines, 'Hora de Inicio'))}:00{offset}"
        end = f"{d.isoformat()}T{hhmm(field(lines, 'Hora de Termino'))}:00{offset}"
        venue = field(lines, "Lugar").rstrip(".")
        access = "Entrada liberada, con entrada reservada en línea (máximo 4 por persona). Ingreso por orden de llegada; llegar 40 minutos antes."
        if "Sin existencias" in lines:
            seen = date.fromisoformat(field(lines, "Consultada"))
            access += f" Las entradas en línea figuraban agotadas el {seen.day} de {MONTHS[seen.month - 1]}."
        title, description = TEXTS[slug]
        events.append((start, slug, title, description, end, venue, access, url))
        rows.append([slug, field(lines, "Título"), title, d.isoformat(), start, end, venue, url])

    lines = [
        'import type { CommunalEvent } from "@/types";',
        "",
        "/**",
        " * Funciones de la cartelera de la Corporación Cultural de La Pintana,",
        " * leídas en la ficha de cada una. Archivo generado por",
        " * docs/fuentes/la-pintana-agenda-2026-10/generar.py: no se edita a mano.",
        " */",
        "export const culturalEvents: CommunalEvent[] = [",
    ]
    for start, slug, title, description, end, venue, access, url in sorted(events):
        lines += [
            "  {",
            f'    id: "lp-ev-{slug}",',
            f'    title: "{title}",',
            "    description:",
            f'      "{description}",',
            f'    startsAt: "{start}",',
            f'    endsAt: "{end}",',
            "    locationId: null,",
            '    category: "cultura",',
            f'    venue: "{venue}",',
            f'    access: "{access}",',
            f'    url: "{url}",',
            '    sourceId: "lp-cultura-cartelera",',
            "  },",
        ]
    lines += ["];", ""]
    OUT.write_text("\n".join(lines))
    with (HERE / "agenda.csv").open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["slug", "titulo_original", "titulo_publicado", "fecha", "inicio", "termino", "lugar", "url"])
        w.writerows(sorted(rows, key=lambda r: r[4]))
    print(f"{len(events)} funciones → {OUT}")


if __name__ == "__main__":
    main()
