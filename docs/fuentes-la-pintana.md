# Registro de fuentes — Piloto La Pintana

Espejo legible de `src/data/communes/la-pintana/sources.ts` (ese archivo es
la fuente de verdad que consume la aplicación). Reglas:

- Todo dato publicado del piloto referencia una fuente de este registro.
- La fuente, el estado y la fecha de consulta **se muestran al ciudadano**.
- Nada con estado distinto de `verificado` se presenta como vigente.
- No se completa información faltante con supuestos: si un dato (horario,
  teléfono, coordenada) no está verificado, no se publica.

**Totales del registro (2026-09-27):** 31 fuentes — 30 verificadas y 1 pendiente de clasificación (el informe de pasivos). (Al cierre de P2 el registro tenía 16 fuentes: 15 verificadas y 1 pendiente; la ficha de Transparencia Activa pasó a verificada con el enlace directo entregado desde pintana.cl. El 2026-09-20 se sumaron las tres fuentes nacionales que usa el orientador «¿A qué puedo postular?», y el 2026-09-27 la ejecución presupuestaria de junio, las dos páginas de salud de pintana.cl, las capas de equipamiento del geoportal, OpenStreetMap, SINIM y la matrícula de MINEDUC.)

**Método de verificación (desde 2026-09-27):** navegación directa a cada
sitio y revisión de su contenido (dirección, horarios, enlaces de pago y de
reserva). La primera verificación (2026-07-19) se hizo sobre contenido
indexado por buscadores porque el entorno no alcanzaba estos dominios; la
re-verificación directa confirmó todos los datos publicados sin cambios.
Vigencia: 3 meses para sitios municipales y 6 para nacionales.

Dos sitios rechazan conexiones desde fuera de Chile (SmartDIDECO y la Bolsa
Nacional de Empleo). SmartDIDECO se da por vigente porque dideco.cl lo
enlaza hoy; conviene abrir ambos desde Chile en la próxima revisión.

| ID | Institución | Página/documento | Estado | Verificado | Vigencia | Observaciones |
|---|---|---|---|---|---|---|
| lp-muni-home | Municipalidad de La Pintana | [Sitio oficial](https://pintana.cl/) | verificado | 2026-09-27 | 2026-12-27 | — |
| lp-muni-direcciones | Municipalidad | [Direcciones Municipales](https://pintana.cl/?page_id=7033) | verificado | 2026-09-27 | 2026-12-27 | Dirección Santa Rosa 12.975 y horarios confirmados navegando directo el 2026-09-27 |
| lp-muni-tramites | Municipalidad | [Trámites](https://pintana.cl/?page_id=2460) | verificado | 2026-09-27 | 2026-12-27 | — |
| lp-muni-pagos | Municipalidad | [Pagos online](https://pintana.cl/?page_id=4122) | verificado | 2026-09-27 | 2026-12-27 | Pago permiso circulación con RUT + patente |
| lp-muni-permisos | Municipalidad | [Permisos de circulación](https://pintana.cl/?page_id=7910) | verificado | 2026-09-27 | 2026-12-27 | — |
| lp-muni-licencias | Municipalidad | [Licencias de conducir](https://pintana.cl/?page_id=8115) | verificado | 2026-09-27 | 2026-12-27 | Reserva en plataforma externa e-com; cupos el 1er día hábil del mes |
| lp-dideco | DIDECO | [dideco.cl](https://www.dideco.cl/) | verificado | 2026-09-27 | 2026-12-27 | — |
| lp-smartdideco | DIDECO | [SmartDIDECO](https://www.lapintana.smartdideco.cl/) | verificado | 2026-09-27 | 2026-12-27 | Plataforma de programas y atenciones. Vigente según el enlace publicado en dideco.cl; el servidor rechaza conexiones desde fuera de Chile |
| lp-deportes | Corp. de Deportes | [pintanadeportes.cl](https://www.pintanadeportes.cl/) | verificado | 2026-09-27 | 2026-12-27 | — |
| lp-deportes-recintos | Corp. de Deportes | Recintos (direcciones) | verificado | 2026-09-27 | 2026-12-27 | Direcciones de 4 recintos desde el sitio oficial; horarios/teléfonos NO publicados (no verificados) |
| lp-deportes-talleres | Corp. de Deportes | [Escuelas y talleres deportivos](https://www.pintanadeportes.cl/) | verificado | 2026-09-27 | 2026-12-31 | 71 escuelas y talleres del 2.º semestre 2026: recinto, dirección, días y horario. Sin nombres de profesores (ver `docs/fuentes/la-pintana-deportes-2026-09/`) |
| lp-deportes-inscripcion | Corp. de Deportes | [Inscripción a escuelas](https://www.pintanadeportes.cl/productos-categoria/inscripcion-escuelas/) | verificado | 2026-09-27 | 2026-12-31 | Inscripción por semestre; valor según escuela; RSH para acreditar residencia. Montos no publicados |
| lp-cultura | Corp. Cultural | [culturapintana.cl](https://www.culturapintana.cl/) | verificado | 2026-09-27 | 2026-12-27 | — |
| lp-geoportal | Municipalidad | [GeoPintana](https://geopintana-lapintana.hub.arcgis.com/) | verificado | 2026-09-27 | 2026-12-27 | Fuente candidata de coordenadas (etapa mapa) |
| lp-muni-salud | Municipalidad | [Centros de Salud Familiar](https://pintana.cl/?page_id=7115) | verificado | 2026-09-27 | 2026-12-27 | 7 CESFAM con dirección y teléfono; Juan Pablo II es de la Red Áncora UC. No se publican nombres ni correos de directivos |
| lp-muni-salud-servicios | Municipalidad | [Programas y servicios de salud](https://pintana.cl/?page_id=5229) | verificado | 2026-09-27 | 2026-12-27 | COSAM, CCR, UAPO, horarios de SAPU y SAR |
| lp-geo-equipamiento | Municipalidad | [GeoPintana — capas de equipamiento](https://services7.arcgis.com/Jc7ZuHKHcN6HGMlG/arcgis/rest/services) | verificado | 2026-09-27 | 2026-12-27 | Coordenadas de 23 lugares y límite comunal. Contrastado con OSM (1–125 m). Nunca se usan capas con datos personales o tributarios |
| osm-la-pintana | OpenStreetMap | [way 1036662021](https://www.openstreetmap.org/way/1036662021) | verificado | 2026-09-27 | 2027-03-27 | Solo coordenadas del Polideportivo (no está en el geoportal). ODbL |
| cl-sinim | SUBDERE — SINIM | [Datos municipales](https://datos.sinim.gov.cl/datos_municipales.php) | verificado | 2026-09-27 | 2027-03-27 | 6 variables para las 52 comunas de la RM, 2017–2025. Educación municipal descartada tras el traspaso al SLEP (ver `docs/fuentes/la-pintana-indicadores-2026-09/`) |
| cl-mineduc-matricula | MINEDUC — Datos Abiertos | [Resumen de matrícula por establecimiento](https://datosabiertos.mineduc.cl/resumen-de-matricula-por-establecimiento-educacional/) | verificado | 2026-09-27 | 2027-03-27 | Matrícula 2020–2025 por dependencia; en 2025 los establecimientos públicos figuran bajo el SLEP Del Pino |
| cl-chileatiende | ChileAtiende | [chileatiende.gob.cl](https://www.chileatiende.gob.cl/) | verificado | 2026-09-27 | 2027-03-27 | Sin logo hasta verificar condiciones de uso |
| cl-registro-social | MDSF | [registrosocial.gob.cl](https://www.registrosocial.gob.cl/) | verificado | 2026-09-27 | 2027-03-27 | — |
| cl-portal-transparencia | Consejo para la Transparencia | [portaltransparencia.cl](https://www.portaltransparencia.cl/) | verificado | 2026-09-27 | 2027-03-27 | Entrada a Transparencia Activa municipal |
| lp-ta-estados-financieros | Municipalidad de La Pintana | Estados financieros — Transparencia Activa (ficha MU124) | verificado | 2026-09-04 | 2027-03-16 | Índice CSV de 6 documentos del ejercicio 2025 (informe 16-03-2026) aportado por el responsable del proyecto; archivos alojados en cloud.pintana.cl |
| lp-ta-indice-ejecucion-2026 | Municipalidad de La Pintana | Balances de ejecución presupuestaria 2026 (28 enlaces) | verificado | 2026-09-04 | 2027-03-04 | 14 informes municipales + 14 de salud, enero–julio 2026. Las cifras se leyeron de los informes de junio (fila siguiente) |
| lp-ta-ejecucion-junio-2026 | Municipalidad de La Pintana | Balances presupuestarios de gastos e ingresos al 30 de junio de 2026 (municipal y salud) | verificado | 2026-09-27 | 2027-03-27 | 39 filas transcritas de PDF escaneados, en miles de pesos, conciliadas por código (ver `docs/fuentes/la-pintana-ejecucion-junio-2026/`) |
| lp-ta-balance-julio-2026 | Municipalidad de La Pintana | Balance de comprobación y saldos, julio 2026, área municipal | verificado | 2026-09-04 | 2027-03-04 | 109 cuentas; extracción conciliada contra los seis totales impresos |
| lp-ta-pasivos-julio-2026 | Municipalidad de La Pintana | Informe de pasivos, julio 2026, área municipal | **pendiente** | 2026-09-04 | — | 67 filas (58 con prefijo 215, 9 con 115). Falta confirmar la clasificación contable; las familias no se suman entre sí |
| cl-bne | Bolsa Nacional de Empleo | [bne.cl](https://www.bne.cl/) | verificado | 2026-09-20 | 2027-03-20 | Usada por el orientador de beneficios; enlazamos al catálogo, no a ofertas puntuales |
| cl-sence | SENCE | [sence.gob.cl/personas](https://www.sence.gob.cl/personas) | verificado | 2026-09-20 | 2027-03-20 | Usada por el orientador de beneficios; no se afirman requisitos ni cupos |
| cl-sercotec | SERCOTEC | [sercotec.cl](https://www.sercotec.cl/) | verificado | 2026-09-20 | 2027-03-20 | Usada por el orientador de beneficios; las convocatorias cambian, por eso solo enlazamos |
| cl-consejo-transparencia | Consejo para la Transparencia | [consejotransparencia.cl](https://www.consejotransparencia.cl/) | verificado | 2026-09-04 | 2027-03-04 | Fuente de los plazos del derecho de acceso (20 días hábiles, prórroga de 10, amparo en 15) |
| lp-transparencia-directa | Municipalidad | [Ficha La Pintana en Portal Transparencia](https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124) | verificado | 2026-09-27 | 2026-12-27 | Enlace directo obtenido desde el acceso «Ley de Transparencia» de pintana.cl |

## Datos pendientes de verificación (no publicados)

- Teléfono de la mesa central municipal (visto solo en sitios de terceros).
- Establecimientos educacionales (fuente: directorio oficial MINEDUC).
- Bibliotecas, puntos limpios, ferias libres (el geoportal tiene una capa de ferias; falta contrastarla).
- Sectores/unidades territoriales con capa geográfica confiable.
- Organizaciones comunitarias (requieren autorización escrita).
- Horarios y teléfonos de los recintos deportivos.
- Teléfonos de cada SAPU (el geoportal los trae, pintana.cl no los confirma).
- Horario del CESFAM Juan Pablo II (no pertenece a la red municipal).

## Acceso directo a las fuentes (desde 2026-09-27)

Hasta septiembre, el proxy de red del entorno de desarrollo bloqueaba
`pintana.cl`, `portaltransparencia.cl`, `geopintana` y las teselas de
OpenStreetMap, así que varios insumos debían aportarse a mano. Desde el
2026-09-27 esos dominios responden y el trabajo se hace directo contra la
fuente:

1. **Ejecución presupuestaria** → hecho. Se descargaron los 28 informes y se
   publicaron las cifras acumuladas al 30 de junio, conciliadas por código
   (`transparency/budget-execution.ts` y
   `docs/fuentes/la-pintana-ejecucion-junio-2026/`).
2. **Coordenadas de lugares** → hecho. 24 lugares con coordenadas (23 del
   geoportal comunal, 1 de OpenStreetMap) y el límite comunal oficial. El
   validador exige fuente de las coordenadas y rechaza cualquier punto fuera
   del polígono comunal. `realMap` encendido.

3. **Indicadores con contexto** → hecho para comuna, salud, educación y
   finanzas (SINIM y MINEDUC, con reglas de validez escritas en
   `docs/fuentes/la-pintana-indicadores-2026-09/metodologia.md`).

Siguen fuera de alcance desde este entorno: SmartDIDECO y la Bolsa Nacional
de Empleo (rechazan conexiones desde fuera de Chile) y el portal de
estadísticas delictuales del CEAD (no responde). Por eso **seguridad sigue
pendiente**: hace falta el archivo de casos policiales del CEAD descargado
desde Chile.

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

## Fotos

Las fotos publicadas se registran en `src/data/communes/la-pintana/photos.ts`
con autor, licencia y enlace de origen (criterios en `docs/imagenes.md`).

| Foto | Autor | Licencia | Origen |
|---|---|---|---|
| Cancha 2 del Estadio Municipal | Alexisaherven | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cancha_2_Estadio_Municipal_de_La_Pintana_(1).jpg) |
| Estadio Municipal | Alexisaherven | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Estadio_Municipal_de_La_Pintana_(1).jpg) |
| Polideportivo | Alexisaherven | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Polideportivo_Municipal_de_La_Pintana.jpg) |
