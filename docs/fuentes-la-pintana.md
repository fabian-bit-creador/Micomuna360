# Registro de fuentes — Piloto La Pintana

Espejo legible de `src/data/communes/la-pintana/sources.ts` (ese archivo es
la fuente de verdad que consume la aplicación). Reglas:

- Todo dato publicado del piloto referencia una fuente de este registro.
- La fuente, el estado y la fecha de consulta **se muestran al ciudadano**.
- Nada con estado distinto de `verificado` se presenta como vigente.
- No se completa información faltante con supuestos: si un dato (horario,
  teléfono, coordenada) no está verificado, no se publica.

**Totales del registro (2026-09-04):** 21 fuentes — 20 verificadas y 1 pendiente de clasificación (el informe de pasivos). (Al cierre de P2 el registro tenía 16 fuentes: 15 verificadas y 1 pendiente; la ficha de Transparencia Activa pasó a verificada con el enlace directo entregado desde pintana.cl.)

**Método de verificación de esta etapa (2026-07-19):** revisión de los
sitios oficiales y de su contenido indexado por buscadores, ya que el
entorno de desarrollo en la nube no permite navegación directa a estos
dominios. Recomendado: re-verificación navegando directamente antes de
presentar el piloto a terceros.

| ID | Institución | Página/documento | Estado | Verificado | Vigencia | Observaciones |
|---|---|---|---|---|---|---|
| lp-muni-home | Municipalidad de La Pintana | [Sitio oficial](https://pintana.cl/) | verificado | 2026-07-19 | 2026-10-19 | — |
| lp-muni-direcciones | Municipalidad | [Direcciones Municipales](https://pintana.cl/?page_id=7033) | verificado | 2026-07-19 | 2026-10-19 | Dirección Santa Rosa 12.975 y horarios confirmados en contenido indexado del sitio oficial |
| lp-muni-tramites | Municipalidad | [Trámites](https://pintana.cl/?page_id=2460) | verificado | 2026-07-19 | 2026-10-19 | — |
| lp-muni-pagos | Municipalidad | [Pagos online](https://pintana.cl/?page_id=4122) | verificado | 2026-07-19 | 2026-10-19 | Pago permiso circulación con RUT + patente |
| lp-muni-permisos | Municipalidad | [Permisos de circulación](https://pintana.cl/?page_id=7910) | verificado | 2026-07-19 | 2026-10-19 | — |
| lp-muni-licencias | Municipalidad | [Licencias de conducir](https://pintana.cl/?page_id=8115) | verificado | 2026-07-19 | 2026-10-19 | Reserva en plataforma externa e-com; cupos el 1er día hábil del mes |
| lp-dideco | DIDECO | [dideco.cl](https://www.dideco.cl/) | verificado | 2026-07-19 | 2026-10-19 | — |
| lp-smartdideco | DIDECO | [SmartDIDECO](https://www.lapintana.smartdideco.cl/) | verificado | 2026-07-19 | 2026-10-19 | Plataforma de programas y atenciones |
| lp-deportes | Corp. de Deportes | [pintanadeportes.cl](https://www.pintanadeportes.cl/) | verificado | 2026-07-19 | 2026-10-19 | — |
| lp-deportes-recintos | Corp. de Deportes | Recintos (direcciones) | verificado | 2026-07-19 | 2026-10-19 | Direcciones de 4 recintos desde el sitio oficial; horarios/teléfonos NO publicados (no verificados) |
| lp-cultura | Corp. Cultural | [culturapintana.cl](https://www.culturapintana.cl/) | verificado | 2026-07-19 | 2026-10-19 | — |
| lp-geoportal | Municipalidad | [GeoPintana](https://geopintana-lapintana.hub.arcgis.com/) | verificado | 2026-07-19 | 2026-10-19 | Fuente candidata de coordenadas (etapa mapa) |
| cl-chileatiende | ChileAtiende | [chileatiende.gob.cl](https://www.chileatiende.gob.cl/) | verificado | 2026-07-19 | 2027-01-19 | Sin logo hasta verificar condiciones de uso |
| cl-registro-social | MDSF | [registrosocial.gob.cl](https://www.registrosocial.gob.cl/) | verificado | 2026-07-19 | 2027-01-19 | — |
| cl-portal-transparencia | Consejo para la Transparencia | [portaltransparencia.cl](https://www.portaltransparencia.cl/) | verificado | 2026-07-19 | 2027-01-19 | Entrada a Transparencia Activa municipal |
| lp-ta-estados-financieros | Municipalidad de La Pintana | Estados financieros — Transparencia Activa (ficha MU124) | verificado | 2026-09-04 | 2027-03-16 | Índice CSV de 6 documentos del ejercicio 2025 (informe 16-03-2026) aportado por el responsable del proyecto; archivos alojados en cloud.pintana.cl |
| lp-ta-indice-ejecucion-2026 | Municipalidad de La Pintana | Balances de ejecución presupuestaria 2026 (28 enlaces) | verificado | 2026-09-04 | 2027-03-04 | 14 informes municipales + 14 de salud, enero–julio 2026. Son enlaces, no cifras |
| lp-ta-balance-julio-2026 | Municipalidad de La Pintana | Balance de comprobación y saldos, julio 2026, área municipal | verificado | 2026-09-04 | 2027-03-04 | 109 cuentas; extracción conciliada contra los seis totales impresos |
| lp-ta-pasivos-julio-2026 | Municipalidad de La Pintana | Informe de pasivos, julio 2026, área municipal | **pendiente** | 2026-09-04 | — | 67 filas (58 con prefijo 215, 9 con 115). Falta confirmar la clasificación contable; las familias no se suman entre sí |
| cl-consejo-transparencia | Consejo para la Transparencia | [consejotransparencia.cl](https://www.consejotransparencia.cl/) | verificado | 2026-09-04 | 2027-03-04 | Fuente de los plazos del derecho de acceso (20 días hábiles, prórroga de 10, amparo en 15) |
| lp-transparencia-directa | Municipalidad | [Ficha La Pintana en Portal Transparencia](https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124) | verificado | 2026-07-19 | 2026-10-19 | Enlace directo obtenido desde el acceso «Ley de Transparencia» de pintana.cl |

## Datos pendientes de verificación (no publicados)

- Teléfono de la mesa central municipal (visto solo en sitios de terceros).
- CESFAM y centros de salud: nombres, direcciones, horarios (fuente: DEIS
  MINSAL + pintana.cl/salud).
- Establecimientos educacionales (fuente: directorio oficial MINEDUC).
- Bibliotecas, puntos limpios, ferias libres.
- Coordenadas geográficas de todos los lugares (fuente: GeoPintana/OSM).
- Sectores/unidades territoriales con capa geográfica confiable.
- Organizaciones comunitarias (requieren autorización escrita).
- Horarios y teléfonos de los recintos deportivos.

## Datos que este entorno no puede descargar

El proxy de red del entorno de desarrollo bloquea `pintana.cl`,
`portaltransparencia.cl`, `geopintana` y las teselas de OpenStreetMap. Por
eso dos insumos de P3 deben aportarse manualmente:

1. **Cifras de ejecución presupuestaria** → alimentan `budget`. Los 28
   informes mensuales de ingresos y gastos ya están inventariados y enlazados
   (`transparency/budget-index.ts`), pero su contenido no se ha leído: viven en
   `portaltransparencia.cl` y `cloud.pintana.cl`, ambos bloqueados. Sin ese
   contenido no se puede afirmar porcentaje de ejecución, gasto por área ni
   comparación interanual, y no se estima.
2. **Coordenadas de lugares** (geoportal comunal, CSV/GeoJSON) → completa
   `lat`/`lng` en `places` y enciende el flag `realMap`.

Mientras no lleguen, la sección de presupuesto y el mapa muestran un estado
"en preparación" explícito, nunca cifras ni pines aproximados.

## Paquete de trabajo incorporado (julio 2026)

`docs/fuentes/la-pintana-transparencia-julio-2026/` guarda los CSV
normalizados, el informe de control de calidad, el diccionario de datos y el
manifiesto SHA-256 del paquete aportado por el responsable del proyecto. Los
PDF originales quedan en su poder como respaldo de auditoría.

Verificaciones reproducidas de forma independiente antes de publicar:

- Balance: 109 filas y las seis sumas de columna calzan exactamente con los
  totales impresos. La conciliación quedó escrita como código en
  `transparency/accounting-balance.ts`: si la extracción se altera, el build
  falla.
- Pasivos: 67 filas — 58 con prefijo 215 ($1.499.437.503) y 9 con prefijo 115
  ($31.279.639). Nunca se suman entre sí.
- Índice: 28 enlaces (14 municipales, 14 de salud), 7 meses × 2 tipos por área.
- El PDF rotulado "Estado de situación financiera" es una segunda generación
  del mismo balance: se excluye para no contarlo dos veces.
- El balance contiene montos negativos legítimos (asientos de reversa) y se
  conservan tal cual.

**Nota de arquitectura:** este registro (`sources.ts`) es la única fuente de
verdad de fuentes oficiales. La portada, el buscador, los servicios y los
futuros módulos consumen el mismo registro (las fuentes con `featured:
true` aparecen como sitios oficiales en la portada de la comuna). Una
verificación con `validUntil` vencida se muestra como «Revisión vencida»,
nunca como verificada vigente.
