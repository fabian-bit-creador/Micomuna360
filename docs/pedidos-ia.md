# Trabajo con otras herramientas de IA

MiComuna360 se trabaja con varias herramientas. Esta guía dice qué pedirle a
cada una y cómo devolver el resultado al repositorio sin romper nada.

## Quién hace qué

| Herramienta | Para qué conviene | Cómo vuelve al proyecto |
|---|---|---|
| Claude Code | Cambios en el sitio, datos con fuente, publicación | Rama de propuesta → vista previa → producción |
| Codex (ChatGPT) | Tareas paralelas acotadas sobre el repositorio | Pull request a una rama `codex/<tema>` |
| GPT Image 2.5 (ChatGPT) | Ilustraciones, íconos y piezas para redes | PNG que se sube a `public/` y se registra |
| Canva Pro | Íconos en relieve, piezas para redes e impresos | Conectado a Claude: se generan desde aquí |
| Google Stitch (gratis) | Explorar diseños de pantalla completos | Captura o exportación a HTML/Figma como referencia |
| Google AI Studio (gratis) | Revisiones de diseño, lectura de documentos, maquetas con «Build» | Clave en el entorno de Claude (texto e imágenes de entrada; generar imágenes requiere facturación) |

### Reglas para todas

- Leer `AGENTS.md` y `DESIGN.md` antes de empezar: idioma, fuentes,
  privacidad, colores (para texto, las «tintas») y componentes.
- Nunca trabajar ni hacer push directo en la rama de producción
  (`claude/micomuna360-architecture-gadm7s`): cada push publica el sitio.
- Datos reales solo con fuente oficial registrada en `sources.ts`.
- Imágenes según `docs/imagenes.md`: un lugar real va con foto real; la IA
  solo para temas generales.

## GPT Image 2.5

Adjuntar siempre `docs/marca/fuentes/MiComuna360-logo-original-3D-2048.png`
como referencia de estilo.

**1. Ilustración para el portal** (16:9, sin texto):

```
Ilustración editorial en relieve suave, en el estilo del logo adjunto
(formas redondeadas, material satinado mate, luz suave de estudio).
Escena: un barrio residencial de Santiago sur visto desde arriba en
diagonal, casas de uno y dos pisos, una plaza con árboles, una multicancha,
un consultorio y una sede vecinal, unidos por senderos que forman un
círculo, como los arcos del logo. Cordillera suave al fondo.
Paleta exclusiva: #17375E, #1E8E89, #67B7D1, #C95B5B, #E9B949, #F7F7F2.
Fondo marfil liso. Sin texto, letras, números, logos ni personas en
primer plano.
```

**2. Íconos que faltan** (1:1, fondo transparente): usar el pedido de
«Íconos» de `docs/imagenes.md` para Noticias, Buscar, Organizaciones y
Reportar.

**3. Pieza de difusión** (4:5, para Instagram): el logo adjunto al centro,
el texto «La Pintana en un solo lugar» y «micomuna360.vercel.app», con los
nueve íconos de sección alrededor. Revisar que el texto salga bien escrito.

## Codex

Pedidos listos para pegar. Cada uno termina en un pull request.

Los pedidos 1 y 2 ya están hechos (03-10-2026): `.github/workflows/revision.yml`
y `e2e/`. Quedan como ejemplo de cómo pedirle algo a Codex.

**1. Revisión automática en cada pull request** (auditoría H04):

```
En fabian-bit-creador/Micomuna360, crea .github/workflows/revision.yml
que en cada pull request instale dependencias con npm ci y corra
npm run lint y npm run build (la validación de datos va dentro del build).
Node 22. No toques la rama de producción. Abre el PR desde codex/revision.
```

**2. Pruebas de recorridos** (auditoría H14):

```
Agrega pruebas con Playwright para los recorridos principales de
/la-pintana: buscar "licencia" y ver resultados, marcar una situación en
/beneficios, filtrar Rugby el sábado en /deportes, abrir un lugar en /mapa
y que /telefonos tenga enlaces tel:. Deja un script npm run test:e2e.
PR desde codex/pruebas-recorridos.
```

**3. Investigación de datos** (sin publicar): «Busca en fuentes oficiales
los talleres de la Corporación Cultural de La Pintana y las ferias libres
de la comuna. Entrega una tabla con cada dato, su URL oficial y la fecha
de consulta, sin nombres de personas, en docs/investigacion/». Claude los
carga después con el mismo formato de Deportes.

## Google Stitch

Sirve para ver alternativas de diseño antes de programarlas.

```
Diseña la portada móvil de un sitio ciudadano chileno llamado MiComuna360
para la comuna de La Pintana. Arriba: nombre de la comuna, buscador grande
y una foto de la plaza. Luego una grilla de 2 columnas con 9 accesos
(servicios, beneficios, deportes, teléfonos, agenda, transparencia, datos,
directorio, mapa), cada uno con un ícono 3D en ficha blanca. Después
«Lo que viene en la comuna» con dos actividades. Estilo cálido y claro,
tipografía redondeada, colores #17375E, #1E8E89, #67B7D1, #C95B5B,
#E9B949 y fondo #F7F7F2. Accesible, contraste alto, sin textos políticos.
```

Pasar a Claude la captura o el HTML exportado: se toma como referencia y se
construye con los componentes del sitio.

## Google AI Studio

La clave ya está en el entorno de Claude. En el nivel gratuito sirve para
texto y análisis de imágenes (revisiones de diseño, pasar documentos a
tablas); generar imágenes o usar datos de Google Maps requiere activar la
facturación. Pedidos concretos por etapa en `docs/pedidos-por-etapa.md`.

## Ideas tomadas de otros portales

- **Íconos grandes para las tareas más buscadas** (Mesa, Arizona): la
  portada ya lo hace con los nueve accesos; se puede sumar una fila de
  «lo más buscado» con enlaces directos (licencia, permiso de circulación,
  RSH).
- **Un solo lugar para ayudas** (James City County, portal de vivienda):
  el orientador de beneficios va en esa línea; sumar deporte y cultura por
  edad lo haría más completo.
- **Navegación fija y carga rápida** (Occoquan): mantener el sitio liviano;
  medir en celular de gama media.
- **Aviso de fechas**: una franja «Postulaciones abiertas» con la fecha de
  cierre, que desaparece sola, como la agenda.
