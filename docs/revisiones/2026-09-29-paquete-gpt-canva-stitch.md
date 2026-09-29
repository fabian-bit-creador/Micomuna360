# Revisión del paquete de GPT, Canva, Stitch y AI Studio (29-09-2026)

Análisis del paquete `MiComuna360-paquete-Claude.zip`, comparado con el sitio
publicado y con `DESIGN.md`. **No se implementó nada**: este documento
decide qué se integra, qué se adapta y qué se descarta.

## Qué trae el paquete

| Material | Origen | Veredicto |
|---|---|---|
| 5 láminas (portada, móvil, directorio, transparencia, componentes), PDF, HTML y `scene.json` | Maquetas hechas en Canva | Buena referencia: respetan la marca. Hay que adaptar varias cosas (abajo) |
| `AUDITORIA-COMPLETA-…md` | Google AI Studio | Útil en UX. En Google Maps y en el modelo SaaS tiene datos desactualizados y propuestas riesgosas |
| 8 imágenes PNG | GPT Images | Dos láminas de íconos muy útiles; el resto sirve poco o nada |
| `assets/` (íconos, foto, fuentes, isotipo) | Copias del sitio publicado | Nada nuevo: son nuestros archivos |

**No está en el paquete:** la propuesta de mapas interactivos de Stitch. Nada
de Stitch ni de AI Studio llegó al repositorio de GitHub: no hay ramas,
archivos ni PR nuevos, y tampoco otro repositorio. En Google Drive hay un
archivo compartido por otra persona, «WEB PARA INTEGRAR MICOMUNA360.rar»
(`dist/index.html`, `dist/data/comunas.json` y `README.md`). No se revisó
porque no se sabe si es parte de este encargo.

## 1. Maquetas de Canva

### Qué conviene integrar

1. **Buscador pegado al título** (lámina 1 y 2A). El título y el buscador
   quedan en el primer pantallazo del celular. En el sitio actual, en 390
   px, el buscador aparece recién a unos 580 px, después de la bajada y del
   aviso de independencia. La revisión de Gemini del 28-09 pidió lo mismo:
   dos fuentes distintas coinciden, así que es la mejora con más respaldo.
2. **Cuatro accesos por necesidad y teléfonos en una fila** (lámina 1). Los
   cuatro accesos son «Servicios y trámites», «¿A qué puedo postular?»,
   «Deporte en tu barrio» y «Agenda comunal», con «Teléfonos útiles» en una
   fila aparte. Encaja con la portada actual, que ya tiene tarjetas con
   ícono; es reordenar, no rehacer.
3. **Menú del celular con ícono por sección** (lámina 2C). Nuestro
   `mobile-nav.tsx` es una lista de texto. Sumar el ícono chico (32 px) de
   cada sección ayuda a quien lee poco. Cambio chico y de bajo riesgo.
4. **Temas sugeridos en el buscador** (lámina 2B). Es la fila «lo más
   buscado» que ya estaba en la hoja de ruta: licencia de conducir, permiso
   de circulación, Registro Social de Hogares y deporte.
5. **Lista o mapa en un mismo lugar** (lámina 3). Hoy «Directorio» y «Mapa»
   son dos páginas con los mismos 24 lugares. Conviene unirlas en una sola
   («Lugares»). En el celular, un selector Lista/Mapa. En escritorio, las
   dos lado a lado, como ya hace el mapa.
6. **Recuadro «Antes de comparar»** (lámina 4). Tres consejos: revisar el
   período, distinguir presupuesto de gasto real y consultar el documento
   de origen. Es un buen acompañamiento para Transparencia, que ya tiene
   cifras reales.
7. **«De cada $100»** (lámina 4). La maqueta usa datos inventados y lo
   dice. La idea es buena con cifras reales: «de cada $100 que gastó la
   Municipalidad hasta junio, $X fueron a…», calculado con la ejecución
   presupuestaria que ya está verificada.

### Qué se adapta o se descarta

- **Aviso de independencia al pie** (láminas 1 a 3). La maqueta lo baja a
  una línea en el pie de página. La auditoría de AI Studio lo marca como
  P0 visible, y es parte de la promesa del sitio. Se recomienda un término
  medio: una línea bajo el buscador («Sitio ciudadano independiente · no es
  el portal municipal», con enlace a *Nosotros*), en vez del recuadro de 4
  líneas.
- **Navegación de escritorio** (Inicio, Servicios, Agenda, Directorio,
  Transparencia y «Menú»). Deja fuera Beneficios, Deportes y Teléfonos, que
  son tareas frecuentes. Se mantiene la nuestra: 6 secciones y «Más».
- **Enlace activo en turquesa** (#1E8E89). Sobre blanco da 3,97:1, bajo AA
  para texto chico. Se usa la tinta `brand-teal-ink` (#136A66), como dice
  `DESIGN.md`.
- **Fondo gris azulado** (#ECF0F1) de las láminas. Es solo el fondo de la
  presentación: el sitio sigue en marfil (#F7F7F2).
- **Íconos mal asignados en el directorio.** «Salud» lleva el ícono de
  servicios y «Educación» el de beneficios; el mismo LEEME lo advierte. Se
  resuelve con los íconos nuevos de GPT (sección 2).
- **Foto grande al lado del título** (lámina 1). En escritorio funciona. En
  el celular la foto va después de los accesos, no antes, como también
  pidió la revisión de Gemini.

## 2. Imágenes de GPT

Revisadas una por una, sobre fondo marfil y sobre el azul del modo oscuro.
Tienen transparencia real y el estilo calza con los íconos de Canva (arcilla
3D, misma paleta). Son de mayor resolución: unos 280 px por ícono, contra
200 px de los de Canva.

| Imagen | Contenido | Uso recomendado |
|---|---|---|
| `00_42_05-1` (igual a `00_42_35`) | 16 íconos: 8 repiten los actuales y 8 son nuevos (salud, educación, trabajo, vivienda, transporte, accesibilidad, reciclaje, seguridad) | **Integrar los 8 nuevos**: categorías del directorio, orientador de beneficios y secciones futuras |
| `00_42_06-2` | 16 íconos: feria libre, cultura, música, parques, ciclovías, mascotas, organizaciones, voluntariado, infancia, personas mayores, votación, avisos, noticias, comercio local y conversación, más un balón que repite el de Deportes | **Integrar** feria libre, cultura, comercio local, organizaciones, personas mayores, infancia, parques y noticias. **No usar la urna**: se lee como elecciones y choca con la neutralidad |
| `00_42_07-3` | 12 edificios genéricos (municipio, CESFAM, escuela, hospital, bomberos, seguridad, biblioteca, sede social, polideportivo, registro, empleo, teatro) | Solo como ilustración de **categoría** o estado vacío, rotulada. Nunca en lugar de la foto de un lugar real (`docs/imagenes.md`). Tienen demasiado detalle para usarlos como marcadores de mapa |
| `00_42_08-4` | Números y signos en 3D | No en la interfaz: las cifras van como texto. A lo más, piezas para redes |
| `00_42_09-5` | Cuatro versiones del nombre en 3D | No en el sitio: la letra no es Bricolage y tres versiones cambian los colores de la marca. La primera (azul y turquesa) sirve para redes o impresos |
| `00_42_10-6` y `00_42_11-7` | Seis escenas sobre fondo oscuro con brillos (casi idénticas entre sí) | Descartar: el fondo y los brillos van pegados a la imagen y no son de la marca. Si gustan las escenas, pedirlas de nuevo sobre fondo blanco |

**Limpieza antes de usarlos:** recortar cada ícono y quitar los puntos
sueltos semitransparentes que quedaron alrededor. El botiquín trae además
una mancha roja en una esquina. Exportarlos a WebP de 256 px y guardar los
originales en `docs/marca/fuentes/`, como los de Canva. Van sobre la misma
ficha blanca (`SectionIcon`) para que no se note la diferencia de origen.

## 3. Auditoría de AI Studio

**Acierta en:**

- Urgencias a un toque, buscador arriba, beneficios por necesidad, agenda
  en lista (no calendario en cuadrícula), mapa sin atrapar el scroll y
  fuentes visibles. Todo eso ya lo hace el sitio o está en esta revisión.
- La arquitectura del mapa: Leaflet con OpenStreetMap y enlaces de Google
  Maps sin clave. Es la que tenemos.

**Hay que corregir:**

- **Precios de Google Maps.** El crédito mensual de US$200 dejó de existir
  en marzo de 2025. Hoy cada producto tiene una cuota gratis mensual (por
  ejemplo, 10.000 cargas del mapa dinámico). Lo correcto está en
  `docs/pedidos-por-etapa.md`.
- **Datos del sitio.** Dice «18 equipamientos»; el mapa tiene 24. Menciona
  un componente `SaasMarketplaceView.tsx` que no viene en el paquete.
- **Animación de 4 a 6 segundos del logo.** Ya se probó una presentación y
  se descartó. El isotipo entra en 1,75 s y se queda quieto; no alargarlo.

## 4. Modelo SaaS y monetización

La propuesta de AI Studio (plan gratis, $9.990 y $24.990 al mes para
comercios) tiene una base razonable, pero **tres puntos pueden dañar la
confianza, que es el principal activo del sitio**:

1. **«Kit QR de reseñas de 5 estrellas».** Las políticas de Google prohíben
   pedir solo reseñas positivas o premiarlas; un negocio que lo haga arriesga
   que le borren reseñas o le sancionen el perfil. Se puede ofrecer un
   **kit de reseñas honestas**: un QR al enlace oficial
   `search.google.com/local/writereview?placeid=…`, sin prometer estrellas.
2. **«Pin destacado» pagado en el mapa comunal.** Mezcla publicidad con
   servicios públicos. Los comercios van en una capa propia («Comercio
   local»), apagada por defecto. Lo pagado se rotula «Destacado» y nunca
   queda sobre un CESFAM, una comisaría o un teléfono de emergencia.
3. **«Comercio verificado» incluido en el plan pagado.** Verificar debe ser
   gratis para todos (patente, dirección y contacto confirmados). Si se
   cobra, el sello deja de significar algo.

**Lo que falta antes de cobrar:** cuentas de usuario y base de datos con
aislamiento por comuna (condición H08 de la auditoría). También un medio de
pago chileno (Webpay, Flow o Mercado Pago), boleta electrónica, términos y
política de privacidad según la Ley 21.719, y alguien que atienda a los
comercios. La tabla `local_businesses` que propone necesita además
`commune_id`, dueño, políticas RLS, `is_sponsored` con fecha de término y
estado de verificación, sin datos personales públicos del dueño.

**Proyección.** Los 120 comercios pagando (unos $1,2 millones al mes)
suponen convertir desde el primer día. Una estimación prudente parte con un
directorio gratis que crezca, y luego de 2 a 5 % de comercios en planes
pagados.

**Orden recomendado:**

1. **Directorio de comercio local gratis**, verificado y con foto propia
   del negocio. Suma contenido y visitas.
2. **Extras pagados rotulados**: ofertas del barrio, más fotos, kit de
   reseñas honestas y estadísticas de visitas a su ficha.
3. **Plan para municipios.** Es el SaaS más natural para esta
   arquitectura, porque ya es multicomuna. Incluye un panel para que el
   municipio mantenga sus datos con fuente y estadísticas de uso. Lo pagan
   municipios, no vecinos, y no toca la neutralidad hacia el comercio.
4. En paralelo, **fondos concursables** y aportes de fundaciones para lo
   cívico (mapa, transparencia y datos), que no debería depender de
   vender avisos.

## 5. Mapa interactivo: qué hacer cuando llegue la propuesta de Stitch

La propuesta de Stitch no vino en el paquete. Según la auditoría de AI
Studio, su mapa era un bloque grande que atrapa el scroll y sin lista
equivalente. Con eso a la vista, estos son los criterios para evaluarlo
(y para las próximas capas: ferias libres, comercio y talleres):

- **Capas, no más marcadores.** Cada tema es una capa que se activa: ferias
  libres, comercio local, cultura o puntos verdes. Por defecto se ven solo
  los servicios públicos.
- **Las ferias son un horario, no un punto.** Una feria libre es un tramo
  de calle en ciertos días. Se dibuja como línea sobre la calle y se filtra
  por «hoy» o por día. La capa `FERIAS_LIBRES` de GeoPintana es la fuente
  candidata.
- **Ficha lateral, no ventana emergente, en el celular.** Al tocar un lugar
  sube una hoja desde abajo con Cómo llegar, Ver la calle y Llamar, y el
  mapa sigue visible.
- **«Abierto ahora»** solo cuando la fuente publique horarios. Si no, no se
  muestra.
- **Nada que atrape el dedo.** Hoy la rueda del mouse no hace zoom, pero
  en el celular un dedo mueve el mapa en vez de bajar la página (mapa de
  480 px). Conviene que el mapa se mueva con dos dedos y que un aviso
  explique cómo, como en Google Maps. Esto sirve también para el mapa actual.
- **Mismo mapa base.** Nada de Google Maps sobre OpenStreetMap: los
  términos de Google no lo permiten.

**Para revisarla:** en Stitch, en cada pantalla, usar exportar código
(HTML) o copiar a Figma, o al menos capturas en 390 y 1280 px, y pasarlas
como las maquetas de Canva.

## Próximo paso propuesto

Una rama `propuesta-portada-v2`, revisada en vista previa antes de
producción, con los puntos 1 a 4 de la sección 1:

- Buscador bajo el título y aviso de independencia en una línea.
- Cuatro accesos por necesidad y fila de teléfonos con los números de
  emergencia (131, 132, 133 y 1441 ya están en `phones.ts` con fuente).
- Menú del celular con íconos.
- Temas sugeridos en el buscador.

Después, los íconos nuevos de GPT (limpios) en el directorio, y la unión de
Directorio y Mapa.
