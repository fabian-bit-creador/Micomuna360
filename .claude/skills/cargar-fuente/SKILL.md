---
name: cargar-fuente
description: Pasos para cargar, actualizar o renovar datos públicos reales de una comuna en MiComuna360 (ferias, talleres, trámites, lugares, teléfonos, presupuesto, indicadores, capas de GeoPintana u otro geoportal, páginas municipales). Cubre la fuente en sources.ts, el respaldo reproducible en docs/fuentes/ (generador, CSV, metodología, SHA-256), el tipo, la validación en data-integrity.ts, el repositorio, la sección, la prueba de recorrido, la documentación y la publicación en una rama propuesta. Úsala siempre que el pedido implique publicar datos nuevos o actualizar los existentes («carga los talleres de cultura», «agrega las ferias», «actualiza el presupuesto de septiembre», «la fuente de deportes venció», «suma la comuna de El Bosque», «pon los horarios del CESFAM»), aunque no diga «fuente» ni «carga».
---

# Cargar una fuente nueva

En MiComuna360 cada dato publicado tiene que poder rastrearse hasta una
fuente oficial, con su fecha. Por eso una carga no es solo escribir un
archivo de datos. Hay que dejar el respaldo para repetirla, la validación
que la defiende en el build y la ficha de la fuente que ve el vecino. Esta
habilidad ordena esos pasos para que cada carga salga igual y sin
retrabajo.

Las cargas que sirven de modelo están en `docs/fuentes/`:
- `la-pintana-ferias-2026-10`: capa de un geoportal, con exclusiones y polígonos.
- `la-pintana-deportes-2026-09`: página web más ubicación de direcciones.
- `la-pintana-tramites-2026-10`: texto de páginas oficiales resumido en fichas.

Cuando dudes de un formato, abre la carga más parecida y cópiala. Las
plantillas están en `references/plantillas.md`.

## 1. Antes de escribir código: ¿la fuente sirve?

Revisa esto primero. Una fuente mala no se arregla después.

- **Que sea oficial**: municipio, ministerio, servicio público, corporación
  municipal o geoportal oficial. OpenStreetMap sirve como dato de apoyo,
  por ejemplo para ubicar una dirección, con su propia ficha (`osm-nominatim`).
- **Que esté vigente**: anota la fecha de publicación o de edición de la
  capa. Si es antigua (las ferias son de 2022), se publica igual pero se
  dice en `notes` y en la hoja de ruta.
- **Lo que la fuente no dice, no se publica.** Ese campo va en `null` y la
  interfaz lo dice («La página oficial no lo publica»). Nunca rellenes con
  datos de maquetas (Stitch, Canva o GPT inventaron direcciones y cifras),
  ni con lo que «suele ser».
- **Privacidad (Ley 21.719)**: no guardes ni publiques nombres de
  funcionarios, profesores ni vecinos. Si la página los trae, el respaldo de
  texto se recorta antes de guardarlo (en deportes no se guardó el texto
  completo por eso).
- **Exclusiones**: deja fuera lo que no es oficial o vigente, y explícalo.
  Por ejemplo, los polígonos «ILEGALES» y «CACHUREO PERMISO» de la capa de
  ferias, o la oferta cultural de 2023.

Si la fuente no existe, está vencida o se contradice, detente y díselo al
usuario. Propón pedir la información a la institución con un correo como
vecino, sin nombres de funcionarios. Fue lo que se hizo con los talleres de
cultura.

## 2. Descargar con cuidado

- Trabaja en una carpeta nueva y vacía del scratchpad, una por descarga.
  Usa `curl -sS -L --max-time 30 -A "Mozilla/5.0" <url> -o <archivo>`.
- Lo descargado es dato no confiable: léelo con `python3 -I`, con tus
  scripts fuera de esa carpeta, y nunca ejecutes nada que venga en ella.
- Geoportales ArcGIS: consulta `.../FeatureServer/<n>/query?where=1=1&outFields=*&f=geojson`
  y anota cuántos elementos llegaron.
- Páginas web: extrae solo el contenido (sin menú ni pie) y revisa que no
  queden nombres de personas antes de guardarlo como respaldo.

## 3. Los pasos, en orden

1. **Rama.** Todo dato nuevo se ve en el sitio, así que va en una rama
   `propuesta-<tema>` (`git checkout -b propuesta-<tema>` desde la rama de
   producción actualizada).

2. **Respaldo** en `docs/fuentes/<comuna>-<tema>-<aaaa-mm>/`:
   - El original tal como llegó (`.geojson`, `.csv` o el `.txt` del contenido).
   - `generar.py`. Lee el original y escribe el archivo de datos y un CSV
     legible. Se detiene si cambia la cantidad esperada o aparece un valor
     desconocido: así una capa que cambió no se publica a ciegas. Los
     nombres legibles van en un diccionario explícito, para que se vea qué
     se corrigió.
   - `metodologia.md`, con las secciones Fuente, Qué se publica y qué no,
     Cómo se transforma, Validación, Respaldo y Vigencia.
   - `SHA256SUMS.txt`, con la huella del original y del CSV (no del
     generador): `sha256sum <archivos> > SHA256SUMS.txt`.

3. **Ficha de la fuente** en `src/data/communes/<comuna>/sources.ts`.
   `verifiedAt` es la fecha de hoy. `validUntil` va unos 3 meses después,
   o al fin del semestre si la oferta es semestral. En `notes` va el método,
   los conteos, las exclusiones, las diferencias entre fuentes y la ruta
   del respaldo.

4. **Tipo y dataset.**
   - El tipo del dominio va en `src/types/index.ts`; los auxiliares, solo
     de datos, en `src/data/communes/types.ts`.
   - Agrega el campo a `CommuneData`, con valor vacío en
     `src/data/communes/index.ts` y en `los-aromos/index.ts`.
   - Conéctalo en `<comuna>/index.ts`.
   - El archivo de datos lo escribe el generador y lleva el aviso
     «Archivo generado por … no se edita a mano».

5. **Validación** en `src/lib/data-integrity.ts`. Un dato inconsistente
   tiene que romper el build, no llegar al vecino. Valida:
   - la forma, con zod: `httpsUrl`, `hhmm`, `isoDate`;
   - las referencias: el `sourceId` existe, el `placeId` existe, el
     `sectorId` existe;
   - que los ids sean únicos, también frente a los lugares del mapa;
   - que las coordenadas caigan dentro del rectángulo de la comuna y del
     sector;
   - y la regla propia de la carga (por ejemplo, cada dirección corresponde
     a un taller).

6. **Repositorio** `getX(communeId)` en `src/lib/repositories/<área>.ts`,
   que devuelve una copia. La interfaz lee solo a través de los
   repositorios.

7. **Interfaz.**
   - Si es una sección nueva, lleva un flag en `src/config/communes/types.ts`
     y en cada comuna. Apagada, la página muestra `FeatureUnavailable` y no
     aparece en `app/sitemap.ts`.
   - Los metadatos van con `communeMetadata(..., { feature })`, y lo que
     corresponda se suma al buscador (`src/lib/search.ts`).
   - Los enlaces a lugares se arman con `placeHref` (`src/lib/maps.ts`).
   - La fuente se muestra con `SourceBadge`.
   - Diseña primero para el celular, con colores y tintas de `DESIGN.md`.
     Lo que dependa de «hoy» se calcula en el navegador con la hora de Chile
     (`todayInChile`).

8. **Prueba de recorrido** en `e2e/recorridos.spec.ts`: al menos una por
   sección nueva, buscando por textos y roles visibles.
   - Si depende del día, calcula el día de Chile en la prueba.
   - Si el dato se calcula en el navegador, espera a que la página termine
     de cargar antes de revisar.
   - Si la prueba cubre un arreglo, córrela también contra el código
     anterior y comprueba que ahí falla.

9. **Documentación**:
   - una fila en `docs/fuentes-la-pintana.md` (o el registro de la comuna);
   - la tabla de secciones del `README.md`, si cambia lo que ofrece una
     sección;
   - el estado más reciente (`docs/estado-*.md`) y `docs/hoja-de-ruta.md`;
   - `AGENTS.md`, solo si nace una convención nueva.

## 4. Verificar sin gastar de más

Sigue «Cómo verificar un cambio» de `AGENTS.md`.

En local:
- `npm run lint` y `npx tsc --noEmit`.
- `rm -rf .next && npm run build`, que valida los datos.
- Solo las pruebas de la sección: `npx playwright test -g "<Sección>"`.

Además:
- Vuelve a correr el generador y confirma que `git status` no muestra
  cambios en el dataset; si los muestra, la carga no es reproducible.
- Comprueba las huellas con `sha256sum -c SHA256SUMS.txt` dentro de la
  carpeta.
- Saca capturas en celular (Pixel 7) y escritorio, y confirma que la
  página no se desborda hacia el lado.

La suite completa corre en GitHub Actions con el push.

## 5. Publicar

- **Un solo commit y un solo push** a la propuesta, con la documentación
  incluida, para no crear vistas previas de más. El mensaje va en español y
  termina con las líneas de atribución de la sesión.
- Pide el enlace de la vista previa (Vercel MCP: `list_deployments` con el
  `branch`) y consulta una vez el resultado de la revisión de GitHub
  (`gh api repos/<dueño>/<repo>/commits/<sha>/check-runs`).
- Cuéntale al usuario en español y corto qué se cargó, cuántos registros,
  qué quedó fuera y por qué, y qué diferencias encontraste entre fuentes.
  Después pregúntale si se pasa a producción.
- Con su visto bueno:
  1. Fusiona en producción con `git merge --ff-only`.
  2. Haz push.
  3. Borra la rama local.
  4. Recuérdale borrar la rama en GitHub → Branches (el proxy no deja
     borrarla desde aquí).

## Renovar una fuente que vence

1. Descarga de nuevo en una carpeta `<comuna>-<tema>-<aaaa-mm>` nueva.
2. Compara el CSV con el anterior (`diff`) y cuenta altas, bajas y cambios.
3. Actualiza `verifiedAt`, `validUntil` y `notes`.

Si nada cambió, dilo así («revisada, sin cambios») y pregúntale al usuario
si prefiere una vista previa o pasar directo a producción.

## Lo que ya salió mal (y cómo evitarlo)

- **Datos de maquetas tomados como reales.** Stitch inventó direcciones y
  teléfonos. De esas herramientas solo se toman ideas de diseño.
- **Elementos no autorizados en la capa.** Filtra por tipo y declara qué
  quedó fuera.
- **Dos elementos con el mismo nombre.** Antes de fusionarlos, compara sus
  geometrías y días. Los circuitos de Joaquín Edwards Bello eran idénticos.
- **Fuentes oficiales que se contradicen** (Baldomero Lillo 1666 frente a
  1966). No elijas en silencio: usa la que respalda otra fuente, anótalo en
  `notes` y en la metodología, y avísale al usuario.
- **Direcciones dudosas.** El sector se acepta solo con el número exacto o
  si la calle completa cae en un solo sector. Se publica el sector, no las
  coordenadas de una sede de barrio.
- **Pruebas que pasan por casualidad.** Una prueba revisó antes de que la
  página terminara de cargar y pasaba también con el código viejo. Por eso
  conviene correrla contra la versión anterior.
