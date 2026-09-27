# Marca

## Isotipo

Tres arcos con sus nodos (vecinos, plataforma y municipio) alrededor de un
pin: la comuna en el centro. Colores oficiales:

| Uso | Color |
|---|---|
| Pin | `#17375E` |
| Arco y nodo izquierdo | `#1E8E89` |
| Arco y nodo derecho | `#67B7D1` |
| Arco y nodo inferior | `#C95B5B` |
| Centro y fondo | `#F7F7F2` |

## Versiones y dónde se usan

| Versión | Archivo en el sitio | Uso |
|---|---|---|
| Plana (SVG) | `public/isotipo.svg`, `src/app/icon.svg` | Cabecera, pie, favicon y todo tamaño chico: se lee mejor |
| Íconos para el teléfono | `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png`, `src/app/apple-icon.png` | Acceso directo en la pantalla de inicio (manifiesto web) |
| En relieve (render 3D) | `public/brand/isotipo-3d-960.webp` | Portadas: portal, portada de cada comuna y Nosotros (`BrandMark3D`) |
| En relieve, PNG | `public/brand/isotipo-3d-360.png` | Tarjetas de vista previa `/og` (WhatsApp, redes) |

El isotipo en relieve entra una sola vez con un giro de 14° y un descenso
suave (1,75 s) y queda quieto; con «reducir movimiento» aparece directo en su
posición final. En modo oscuro va sobre un círculo marfil, para que el pin no
se pierda contra el fondo azul.

## Archivos fuente

`docs/marca/fuentes/` guarda los originales (huellas en `SHA256SUMS.txt`):

- `MiComuna360-isotipo-original.svg` y su PNG de 2048 px.
- `MiComuna360-logo-original-3D-2048.png`: render del modelo, transparente.
- `MiComuna360-logo-original-3D.glb`: modelo con la animación de 3 s.
- `MiComuna360-logo-original-3D.blend`: escena editable de Blender.

El modelo se construyó en Higgsfield (3D Jutsu) a partir de las coordenadas
del SVG. Las versiones web se generan desde el render de 2048 px, recortado
al contenido y convertido a WebP.

## Pendiente de decidir

- **Modelo 3D interactivo** (GLB en la página): pesa unos 800 KB más la
  librería para mostrarlo; hoy no se justifica frente a una imagen de 58 KB.
- **Íconos de sección en el mismo estilo**: ver «Íconos» en
  `docs/imagenes.md`.
