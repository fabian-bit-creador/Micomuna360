# Imágenes en MiComuna360

Cómo elegir, citar y crear las imágenes del sitio. Aplica a portadas de
comuna, fichas de lugares, programas deportivos, negocios y tarjetas de
vista previa.

## Qué imagen usar en cada caso

| Qué se muestra | Imagen adecuada | Crédito |
|---|---|---|
| Un lugar real (plaza, CESFAM, estadio) | Foto real del lugar: propia o con licencia libre (Wikimedia Commons) | Autor, licencia y enlace |
| Un negocio real | Foto entregada por el dueño, con su autorización escrita | «Foto: gentileza de <negocio>» |
| Un programa o actividad municipal | Foto del municipio con permiso, o foto propia del lugar donde se hace | Según el permiso |
| Una idea general (salud, trámites, deporte) | Ilustración generada con IA o foto genérica de banco libre | «Ilustración generada con IA» o autor del banco |

La regla de fondo: **una imagen nunca debe hacer pasar por real algo que no
lo es**. Un lugar o negocio real se muestra con su foto real; si no hay, se
usa el ícono de la categoría, no una foto «parecida».

## De dónde se pueden sacar

- **Fotos propias**: la mejor opción. Evitar personas reconocibles (la imagen
  de una persona es un dato personal, Ley 21.719); con niños, nunca sin
  autorización de sus apoderados.
- **Wikimedia Commons**: fotos de La Pintana y otras comunas con licencias
  CC0, CC BY o CC BY-SA. Se pueden usar indicando autor, licencia y enlace;
  redimensionar o recortar está permitido (con CC BY-SA la versión
  modificada mantiene la misma licencia).
- **Unsplash y Pexels**: su licencia permite usarlas sin pedir permiso, pero
  son fotos de cualquier parte del mundo. Sirven solo como ilustración
  genérica, nunca para representar un lugar o negocio de la comuna.
  Igual se acredita al autor.
- **Sitios municipales, redes sociales, diarios, Google Maps**: tienen
  derecho de autor (Ley 17.336). Citar la fuente **no** basta para
  copiarlas: hace falta permiso por escrito (un correo de respuesta sirve).
  Sin permiso, se enlaza a la página original en vez de copiar la imagen.
  Las fotos de Google Maps y Street View no se pueden reutilizar.

## Cómo se guarda y se cita

- Archivos en `public/images/<comuna>/`, en WebP o JPG, de 1600 px de ancho
  como máximo y menos de 300 KB. Nombre descriptivo:
  `plaza-de-armas-la-pintana.webp`.
- Cada imagen se registra junto al dato que ilustra, con: texto alternativo
  (qué se ve, en una frase), autor, licencia, enlace de origen, fecha de
  consulta y tipo (`foto` o `ilustracion-ia`).
- El crédito se ve en la misma ficha o al pie de la imagen, en letra pequeña.
- Si el permiso vino por correo, se guarda una copia en
  `docs/fuentes/<comuna>-imagenes/`.

## Crear ilustraciones con IA (ChatGPT u otra)

Sirven para secciones y temas generales: «Salud», «Trámites», «Deporte en
tu barrio», la portada de un orientador. No para lugares, personas,
negocios ni eventos reales. Van rotuladas como «Ilustración generada con
IA».

### Estilo común

Para que todas se vean de la misma familia, usar siempre la misma
descripción de estilo:

> Ilustración editorial plana con textura suave de papel, formas simples
> y amables, luz cálida de tarde. Paleta: azul marino #17375E, verde
> azulado #1E8E89, celeste #67B7D1, terracota #C95B5B, ámbar #E9B949 y
> fondo marfil #F7F7F2. Sin texto, letras, números ni logos. Sin marcas
> comerciales. Composición despejada con espacio libre a la
> [izquierda/derecha] para poner un título encima.

Si se prefiere un estilo fotográfico:

> Fotografía realista, luz natural de mañana, colores cálidos y naturales,
> poca profundidad de campo. Sin texto, logos ni marcas. Personas de
> espaldas, lejanas o desenfocadas, sin rostros reconocibles.

### Plantilla de pedido

```
Crea una imagen [horizontal 16:9 | 3:2 | cuadrada 1:1].
Tema: [qué debe comunicar, p. ej. "vecinos que practican deporte en una
multicancha de barrio"].
Escena: [qué se ve, en 2 o 3 frases concretas].
Contexto chileno: barrio residencial de Santiago sur, casas de uno y dos
pisos con rejas y antejardín, árboles de plaza, cordillera de los Andes
al fondo en un día despejado.
[Estilo común, copiado tal cual]
Evita: texto, logos, banderas, uniformes oficiales (Carabineros, salud),
estereotipos de pobreza o peligro, rostros en primer plano.
```

### Ejemplos listos

- **Deporte en tu barrio** (16:9): «Multicancha de barrio al atardecer,
  un grupo de niñas juega básquetbol y un adulto mayor camina por el borde
  con ropa deportiva. Arcos de fútbol pintados, árboles alrededor,
  cordillera al fondo.»
- **Salud cerca de casa** (3:2): «Fachada genérica de un centro de salud
  de un piso, con jardín y bancas; una persona con un coche de bebé llega
  por la vereda. Sin cruces rojas ni letreros.»
- **Trámites sin vueltas** (1:1): «Manos que sostienen un celular con una
  pantalla en blanco, sobre una mesa de cocina con una taza y un cuaderno.
  Vista cenital.»
- **¿A qué puedo postular?** (16:9): «Una familia de tres generaciones
  conversa en la mesa del comedor revisando papeles y un celular; ambiente
  tranquilo, luz de ventana.»
- **Comunidad y organizaciones** (16:9): «Sede vecinal de barrio con
  puerta abierta, sillas en círculo adentro, guirnaldas de colores y un
  mural simple de hojas y pájaros en la pared exterior.»

### Revisión antes de publicar

- Sin letras deformes, carteles ilegibles ni números inventados.
- Manos, rostros y proporciones sin defectos visibles.
- Nada que parezca un lugar real identificable (monumentos, letreros de la
  comuna, fachadas conocidas).
- Colores dentro de la paleta; si no, pedir: «ajusta los colores a la
  paleta indicada».
- Exportar a WebP, 1600 px de ancho, y registrar el tipo `ilustracion-ia`.

## Íconos

Hay dos tipos de ícono, y cada uno tiene su lugar:

- **Íconos de interfaz** (botones, listas, menús, 16 a 24 px): vectoriales,
  de la librería Lucide que usa el sitio. Se ven nítidos en cualquier
  pantalla, cambian de color con el modo oscuro y pesan casi nada. No se
  reemplazan por imágenes.
- **Íconos de sección** (tarjetas de la portada, encabezados de Servicios,
  Beneficios, Deportes, Agenda, Teléfonos, Mapa, 64 a 160 px): aquí sí
  caben ilustraciones en relieve, en el mismo estilo del isotipo 3D.

### Pedido para íconos de sección en relieve

Sirve para Canva (así se hicieron los nueve actuales), ChatGPT o
Higgsfield (este último requiere el plan Basic o superior). Adjuntar
`docs/marca/fuentes/MiComuna360-logo-original-3D-2048.png` como referencia.

```
Crea un ícono 3D para la sección «[Deportes]» de una plataforma ciudadana
chilena. Mismo estilo que el logo adjunto: formas simples y redondeadas,
volumen suave, bisel discreto, material satinado mate, luz de estudio
suave desde arriba a la izquierda, sin sombras duras.
Objeto: [una pelota de fútbol simple sobre un pequeño podio redondeado].
Colores solo de la paleta: #17375E, #1E8E89, #67B7D1, #C95B5B, #E9B949
y #F7F7F2.
Fondo transparente, objeto centrado, vista frontal levemente elevada,
formato cuadrado 1024 × 1024.
Sin texto, letras, números, logos ni personas.
```

Objetos sugeridos por sección: Servicios → documento con un visto bueno;
Beneficios → regalo o mano con corazón; Deportes → pelota sobre podio;
Agenda → calendario de escritorio; Teléfonos → auricular; Mapa → mapa
plegado con pin; Transparencia → balanza; Datos → gráfico de barras.

Para que la serie se vea pareja, generar todos en la misma sesión, con la
misma referencia y el mismo texto, cambiando solo el objeto. Revisar que el
fondo sea de verdad transparente, exportar en WebP de 512 px y registrarlos
como `ilustracion-ia`.
