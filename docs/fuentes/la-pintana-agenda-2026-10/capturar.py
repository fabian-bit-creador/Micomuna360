"""Extrae de cada ficha de la cartelera el bloque de fecha, hora, lugar y acceso.

Uso (desde la raíz del repositorio), con las fichas ya descargadas con curl
(ver metodologia.md):
    python3 -I docs/fuentes/la-pintana-agenda-2026-10/capturar.py <ficha.html>...

Escribe fichas/<slug>.txt. No guarda la descripción de la obra, porque
nombra a personas del elenco y la dirección; las descripciones publicadas
se escriben en generar.py.
"""

import html
import re
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).parent
KEEP = ("Fecha:", "Hora de Inicio:", "Hora de Termino:", "Lugar:", "Dirección:", "Acceso:")


def main() -> None:
    for path in sys.argv[1:]:
        s = Path(path).read_text(encoding="utf-8", errors="ignore")
        canonical = re.search(r'<link rel="canonical" href="([^"]+)"', s)
        if not canonical:
            raise SystemExit(f"{path}: sin enlace canónico")
        url = canonical.group(1)
        slug = url.rstrip("/").rsplit("/", 1)[-1]
        title = re.search(r'<h1[^>]*product_title[^>]*>(.*?)</h1>', s, re.S)
        if not title:
            raise SystemExit(f"{path}: sin título")
        body = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", s, flags=re.S)
        body = re.sub(r"<br\s*/?>|</p>|</li>|</h\d>|</div>|</span>", "\n", body)
        text = html.unescape(re.sub(r"<[^>]+>", " ", body))
        lines = [re.sub(r"\s+", " ", l).strip() for l in text.splitlines()]
        lines = [l for l in lines if l]
        out = [
            f"Fuente: {url}",
            f"Consultada: {date.today().isoformat()}",
            f"Título: {html.unescape(re.sub(r'<[^>]+>', '', title.group(1))).strip()}",
        ]
        flags = [l for l in lines if l in ("ENTRADA LIBERADA", "Sin existencias")
                 or l.startswith("– MÁXIMO") or l.startswith("IMPORTANTE : Llegar")]
        out += sorted(set(flags), key=flags.index)
        out += [l for l in lines if l.startswith(KEEP)]
        (HERE / "fichas" / f"{slug}.txt").write_text("\n".join(out) + "\n")
        print(f"{slug}: {len(out)} líneas")


if __name__ == "__main__":
    main()
