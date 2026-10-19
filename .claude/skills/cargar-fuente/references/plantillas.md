# Plantillas para una carga

Cópialas y adáptalas; los ejemplos completos están en `docs/fuentes/`.

## Ficha de la fuente (`sources.ts`)

```ts
{
  id: "lp-geo-ferias",
  institution: "Municipalidad de La Pintana",
  pageName: "GeoPintana — ferias libres y persas",
  description:
    "Ferias libres y persas autorizadas, con sus días, horario y tramo de calle.",
  featured: false,
  url: "https://services7.arcgis.com/.../FERIAS_LIBRES/FeatureServer/1",
  publishedAt: "2022-12-19", // fecha de edición de la capa o de la página, si se conoce
  verifiedAt: "2026-10-04", // hoy
  status: "verificado",
  validUntil: "2027-01-04", // ~3 meses, o fin de semestre
  notes:
    "16 ferias y 3 persas (20 polígonos). Se excluyen ILEGALES y CACHUREO PERMISO. Datos de la capa al 2022-12-19. Respaldo en docs/fuentes/la-pintana-ferias-2026-10/.",
},
```

## Generador (`generar.py`)

```python
"""Genera src/data/communes/<comuna>/<archivo>.ts desde <fuente>.

Uso (desde la raíz del repositorio):
    python3 docs/fuentes/<carpeta>/generar.py

Lee <original>, escribe el dataset y <tema>.csv. Se detiene si cambia la
cantidad de elementos o aparece un valor que no está definido aquí.
"""

import csv
import json
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("src/data/communes/<comuna>/<archivo>.ts")
EXPECTED = 20  # elementos que llegaron en la consulta

# Nombres legibles: ortografía normal, sin cambiar el contenido. El
# original queda en el CSV.
READABLE = {
    # id_original: "Nombre publicado",
}


def main() -> None:
    items = json.loads((HERE / "<original>.geojson").read_text())["features"]
    if len(items) != EXPECTED:
        raise SystemExit(f"se esperaban {EXPECTED}; llegaron {len(items)}")
    rows, out = [], []
    for item in items:
        ...  # validar, transformar, excluir con motivo
    lines = [
        'import type { Tipo } from "@/types";',
        "",
        "/**",
        " * <Qué es> de <comuna>: <fuente> (<fecha>). Archivo generado por",
        " * docs/fuentes/<carpeta>/generar.py: no se edita a mano.",
        " */",
        "export const datos: Tipo[] = [",
        # ...
        "];",
        "",
    ]
    OUT.write_text("\n".join(lines))
    with (HERE / "<tema>.csv").open("w", newline="") as fh:
        csv.writer(fh).writerows(rows)
    print(f"{len(out)} registros → {OUT}")


if __name__ == "__main__":
    main()
```

## Metodología (`metodologia.md`)

```markdown
# <Tema> — <Comuna> (consulta del <aaaa-mm-dd>)

Qué se publica, en una frase, y dónde se ve en el sitio.

## Fuente
Institución, página o capa, URL, fecha de publicación o edición.

## Qué se publica y qué no
Campos publicados. Exclusiones y por qué. Campos en `null` porque la fuente
no los dice.

## Cómo se transforma
Pasos del generador: normalización de días y horas, nombres legibles,
cálculo de sector, etc.

## Diferencias entre fuentes
(Si las hay.) Qué dice cada una y cuál se usa.

## Validación
Qué revisa `data-integrity.ts` al compilar.

## Respaldo
- `<original>`: tal como llegó.
- `<tema>.csv`: lo publicado, con el original al lado.
- `SHA256SUMS.txt`: huella de ambos.

## Vigencia
Hasta cuándo se considera vigente y cómo se renueva.
```

## Fila del registro (`docs/fuentes-la-pintana.md`)

```markdown
| lp-geo-ferias | Municipalidad | [GeoPintana — ferias libres y persas](<url>) | verificado | 2026-10-04 | 2027-01-04 | 16 ferias libres y 3 persas autorizadas (capa al 2022-12-19). No se publican zonas no autorizadas. Respaldo en `docs/fuentes/la-pintana-ferias-2026-10/` |
```

## Prueba de recorrido (`e2e/recorridos.spec.ts`)

```ts
test.describe("<Sección>", () => {
  test("<lo que hace el vecino, en palabras>", async ({ page, isMobile }) => {
    await page.goto("/la-pintana/<seccion>");
    // Buscar por lo que ve una persona: roles, etiquetas y textos.
    const region = page.getByRole("region", { name: "<Título de la sección>" });
    await expect(region.getByRole("listitem").first()).toBeVisible();
    // Si depende del día, calcularlo con la hora de Chile:
    // new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/Santiago" })
  });
});
```

## Mensaje del commit

```
<Sección>: <qué se cargó>

- <Cuántos registros y de qué fuente.>
- <Qué quedó fuera y por qué.>
- <Validación y prueba nuevas.>
- Respaldo y metodología en docs/fuentes/<carpeta>/.

<líneas de atribución de la sesión>
```
