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
| Plana (SVG) | `public/isotipo.svg`, `src/app/icon.svg` | Cabecera, pie, favicon: es la versión del sitio |
| Íconos para el teléfono | `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png`, `src/app/apple-icon.png` | Acceso directo en la pantalla de inicio (manifiesto web) |
| En relieve, PNG | `public/brand/isotipo-3d-360.png` | Tarjetas de vista previa `/og` (WhatsApp, redes) |

En el sitio se usa el isotipo plano. Sobre fondos oscuros (pie, modo
oscuro) va en un círculo marfil, para que el pin no se pierda.

## Lo que cambió en noviembre de 2026

El sitio pasó a la dirección «señalética comunal» (`DESIGN.md`): campos
planos, placa azul y amarillo señal. Con eso dejaron de usarse en las
páginas, porque se leían como imágenes generadas:

- **El isotipo en relieve** de las portadas (`isotipo-3d-960.webp`). Las
  portadas abren con el nombre de la comuna y su contorno oficial. El PNG
  de 360 px sigue en las vistas previa `/og`.
- **Las nueve ilustraciones en relieve de sección** (`public/brand/iconos/`,
  hechas en Canva el 27 de septiembre de 2026). `SectionIcon` dibuja ahora
  un pictograma blanco sobre una placa azul, como una señal informativa.
- **Las olas** del pie de página.

Los archivos siguen en el repositorio y los originales en Canva: volver a
ellos es cambiar `src/components/shared/section-icon.tsx`.

| Ícono en relieve | Medio en Canva |
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
