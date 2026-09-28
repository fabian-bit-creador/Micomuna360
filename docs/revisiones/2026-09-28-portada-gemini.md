# Revisión de la portada con Gemini (28-09-2026)

Revisión de diseño y uso de `/la-pintana` hecha con Gemini 3.7 Flash por
la API de Google AI Studio (nivel gratuito), a partir de capturas del sitio
publicado en celular (390 px) y escritorio (1280 px). Es una opinión
externa para priorizar, no una auditoría.

**Corrección de Claude:** el «ícono roto» de *Mapa de la comuna* que señala
en el punto 3 no es un error del sitio: el ícono carga cuando se llega a él
(las imágenes se cargan a medida que se baja) y la captura de página
completa se tomó antes. Verificado en producción.

---

### 1. Tres fortalezas concretas

1. **Claridad inmediata del rol y transparencia del sitio:** El recuadro informativo que explicita *"MiComuna360 es un sitio ciudadano independiente: no es el sitio oficial de la Municipalidad..."* junto con los microtextos *"con fuente y fecha de verificación"* genera confianza sin inducir a error al vecino.
2. **Redacción orientada a la tarea con lenguaje cotidiano:** Textos como *"¿A qué puedo postular? - Sin RUT ni clave"*, *"Teléfonos útiles - para llamar con un toque"* y *"En qué se gasta la plata de la comuna"* eliminan la fricción y el lenguaje técnico burocrático que suele alejar a usuarios con menor manejo digital.
3. **Estructura clara y accionable de las tarjetas de Agenda:** En la sección *"Lo que viene en la comuna"*, las tarjetas de eventos (*Donde viven los recuerdos*, *Romeo y Julieta Alamala*) resuelven de un vistazo la fecha (día y mes destacados), lugar, hora y una advertencia clave para el usuario: *"Entrada liberada, con entrada reservada en línea. Llegar 40 minutos antes"*.

---

### 2. Cinco problemas de jerarquía, legibilidad o flujo y sus mejoras

#### 1. Sobrecarga inicial de texto antes de la acción en móvil
* **Problema:** En la versión móvil, entre el título *"La Pintana en un solo lugar"*, la bajada, el aviso de sitio independiente y el buscador, la pantalla se satura de lectura pasiva. El usuario tarda en ver opciones interactivas.
* **Mejora:** Compactar el hero. Subir la barra de búsqueda *"Busca un trámite o lugar..."* inmediatamente bajo el título y convertir el aviso de "sitio independiente" en una pastilla discreta (pill) o banner colapsable bajo el buscador.

#### 2. La foto de la Plaza de Armas interrumpe el flujo de navegación
* **Problema:** La fotografía de la *Plaza de Armas de La Pintana* (con crédito de *Alexisaherven*) ocupa casi toda la pantalla inicial en el celular, pero no es interactiva ni aporta a una tarea directa, empujando los servicios fuera del primer pantallazo (*above the fold*).
* **Mejora:** Eliminar la foto gigante estática del inicio móvil o integrarla como fondo sutil del hero. Si se mantiene como imagen de contenido, debe vincularse directamente a una sección útil (ej. tarjeta del *"Directorio territorial"* o ficha de áreas verdes).

#### 3. Lista vertical homogénea y agotadora en "Empieza por aquí"
* **Problema:** Nueve tarjetas idénticas apiladas en vertical obligan a un scroll excesivo. Además, se observa un error visual en móvil donde el ícono de *"Mapa de la comuna"* aparece vacío/roto. Opciones críticas como *Teléfonos útiles* quedan perdidas al medio.
* **Mejora:** Pasar a un diseño en cuadrícula (grid de 2 columnas) con tarjetas más compactas, corregir el ícono faltante de *Mapa de la comuna* y separar los 4 servicios más urgentes (Trámites, Beneficios, Teléfonos, Deportes) del resto de opciones informativas (Cifras, Transparencia).

#### 4. Falta de jerarquía para urgencias en "Teléfonos útiles"
* **Problema:** La tarjeta de *Teléfonos útiles (Emergencias, oficinas municipales, CESFAM...)* tiene el mismo peso y color neutro que *La Pintana en cifras* o *Transparencia municipal*, dificultando su hallazgo rápido en situaciones de emergencia comunal.
* **Mejora:** Sacar *Teléfonos de emergencia / Salud* de la lista general y colocarlo como un botón de acción rápida destacado (con color de acento, ej. rojo suave o verde) fijo o visible en la parte superior.

#### 5. Ruido visual por repetición de metadatos en "Sitios oficiales"
* **Problema:** En el bloque de sitios oficiales (visible en escritorio), las 9 tarjetas repiten exactamente la misma frase: *"Sitio oficial externo · Enlace verificado el 27 de septiembre de 2026"*, lo que genera fatiga visual y distrae del nombre del servicio (DIDECO, Permisos de circulación, etc.).
* **Mejora:** Colocar un aviso global al inicio de la sección (*"Todos los enlaces conducen a plataformas oficiales verificadas"*) y simplificar las tarjetas dejando solo el nombre de la institución/trámite, una línea de descripción y el ícono de salida externa.

---

### 3. Propuesta de orden de bloques para la portada móvil

1. **Header:** Logo MiComuna360 + Selector de comuna (*La Pintana*) + Menú hamburguesa.
2. **Hero de búsqueda rápida:** Título breve + Barra de búsqueda visible (*"Busca trámites, CESFAM, subsidios..."*) + microtexto de sitio independiente.
3. **Botonera de Emergencia y Contacto Rápido:** Acceso directo a *Seguridad Comunal, Ambulancia/CESFAM y Teléfonos Útiles* (llamada directa con un toque).
4. **Accesos Directos Prioritarios (Grid 2x2):**
   * *Servicios y trámites*
   * *¿A qué puedo postular?*
   * *Deporte en tu barrio*
   * *Agenda comunal*
5. **Agenda "Lo que viene" (Carrusel horizontal / swipe):** Tarjetas de eventos con fecha destacada en carrusel para no alargar la página hacia abajo.
6. **Lugares y Territorio:** Ficha de acceso al *Mapa Comunal* y *Directorio Territorial* (centros de salud, canchas, sedes).
7. **Información y Transparencia Comunal:** Accesos a *Transparencia*, *Cifras comunales* y *Sitios oficiales*.
8. **Pie de página (Footer):** Explicación del proyecto, fecha de actualización comunal y enlaces de contacto/sugerencias.

---

### 4. Dos ideas de imágenes o ilustraciones cercanas (sin inventar lugares falsos)

1. **Ilustraciones vectoriales de escenas cotidianas barriales:**
   * **Concepto:** Viñetas en estilo plano y cálido que representen situaciones habituales de la comuna: vecinas organizadas en una sede social o junta de vecinos, jóvenes jugando básquetbol o fútbol en una multicancha de barrio, y familias en una feria libre o plaza arbolada con flora típica de la zona sur de Santiago (espinos, pimientos, álamos). 
   * **Uso:** Como cabeceras de categorías (*Deporte en tu barrio*, *Servicios sociales*) para dar calidez humana sin requerir fotos de personas específicas.

2. **Esquema gráfico e iconográfico de los macrosectores de La Pintana:**
   * **Concepto:** Una infografía territorial simplificada que muestre la silueta real del mapa comunal dividida por sus ejes y sectores reconocibles (como Av. Santa Rosa, San Rafael, El Roble, Pablo de Rokha, La Platina), usando marcadores e íconos amigables para ubicar servicios (cruz para CESFAM, pelota para recintos deportivos, libro para bibliotecas/cultura).
   * **Uso:** Como portada del bloque *Directorio territorial y Mapa*, facilitando la orientación espacial a quienes reconocen su sector antes que una dirección exacta.
