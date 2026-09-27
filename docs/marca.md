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

| Íconos de sección | `public/brand/iconos/*.webp` | Tarjetas de la portada y encabezado de cada sección (`SectionIcon`, prop `icon` de `SectionHeader`) |

El isotipo en relieve entra una sola vez con un giro de 14° y un descenso
suave (1,75 s) y queda quieto; con «reducir movimiento» aparece directo en su
posición final. En modo oscuro va sobre un círculo marfil, para que el pin no
se pierda contra el fondo azul.

## Íconos de sección

Nueve ilustraciones en relieve generadas con Canva (Canva Pro, 27 de
septiembre de 2026) con la paleta de la marca y el mismo texto de estilo
para todas (ver «Íconos» en `docs/imagenes.md`). Se muestran sobre una
ficha blanca de 56 px; en el sitio se usa la versión de 200 px en WebP.
Los originales de 1264 px quedan en Canva:

| Ícono | Medio en Canva |
|---|---|
| servicios | [MAHWbyWrvBs](https://www.canva.com/M/MAHWbyWrvBs) |
| beneficios | [MAHWb9WWtIE](https://www.canva.com/M/MAHWb9WWtIE) |
| deportes | [MAHWb8JF3dM](https://www.canva.com/M/MAHWb8JF3dM) |
| agenda | [MAHWbzSsdK4](https://www.canva.com/M/MAHWbzSsdK4) |
| telefonos | [MAHWb96teJA](https://www.canva.com/M/MAHWb96teJA) |
| mapa | [MAHWb05wOmA](https://www.canva.com/M/MAHWb05wOmA) |
| transparencia | [MAHWb3t9cFM](https://www.canva.com/M/MAHWb3t9cFM) |
| datos | [MAHWb2WdrcA](https://www.canva.com/M/MAHWb2WdrcA) |
| directorio | [MAHWb03buog](https://www.canva.com/M/MAHWb03buog) |

Son ilustraciones de temas generales (no de lugares reales), por eso no
llevan rótulo de IA en cada tarjeta. Los íconos chicos de botones y menús
siguen siendo los vectoriales de Lucide.

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
