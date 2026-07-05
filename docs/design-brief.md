# Design brief — MiComuna360 / MuniApp

Brief de diseño para usar junto al skill `.claude/skills/frontend-design`.
Toda decisión visual del proyecto debe derivarse de este documento.

## Sujeto y trabajo de la página

- **Sujeto**: portal comunal público de una municipalidad chilena (piloto:
  comuna ficticia "Los Aromos").
- **Audiencia**: vecinos de todas las edades, mayoritariamente en móvil, con
  distintos niveles de alfabetización digital. También: equipos municipales
  que evalúan adoptar la plataforma.
- **Trabajo único de la portada**: que un vecino encuentre en segundos algo
  útil para su vida diaria (un teléfono, un trámite, una noticia, reportar
  un problema) y perciba que su comuna "está viva".

## Identidad (fija, no negociable)

- **Paleta**: azul profundo `#17375E` (confianza), turquesa cívico `#1E8E89`
  (cercanía), celeste suave `#67B7D1` (claridad), rojo terracota `#C95B5B`
  (acento chileno sutil), blanco marfil `#F7F7F2` (fondo), gris pizarra
  `#4B5563` (texto), ámbar `#E9B949` (alertas).
- **Lema**: "Tu comuna en un solo lugar" · **Sublema**: "Conecta, participa
  y transforma tu entorno."
- **Tono**: simple, humano, esperanzador, profesional, claro, ciudadano, no
  burocrático, **no partidista**. Hablar de "tu comuna", "vecinos", nunca
  jerga administrativa.
- **Valores a transmitir**: cercanía, transparencia, participación,
  educación ciudadana, equidad territorial.

## Sistema tipográfico

- **Display** (títulos, cifras): Bricolage Grotesque — humanista con
  carácter, moderna sin frialdad tech.
- **Cuerpo**: Nunito — redondeada, cálida, muy legible en móvil.
- Escala generosa en móvil; los números de datos comunales se muestran
  grandes (display) con etiquetas pequeñas en cuerpo.

## Elemento firma

El **anillo 360°** del isotipo (arco segmentado teal → celeste → terracota
con puntos de unión) es el lenguaje visual de la plataforma:

- aparece como *eyebrow* de secciones (arco pequeño + etiqueta),
- como anillo de progreso/estado en indicadores,
- los tres colores del arco codifican las tres audiencias (vecinos = teal,
  información = celeste, territorio = terracota).

Segundo motivo: las **olas superpuestas** del brand board (celeste/teal/
terracota translúcidos) como transición hacia el footer.

## Reglas de ejecución

- El azul profundo se usa con peso (headers, footer, cifras); el marfil da
  aire; terracota y ámbar solo como acentos pequeños.
- Tarjetas: radio `--radius` (0.75rem), sombra suave, sin bordes duros.
- Motion: sutil y con propósito (hover de tarjetas, transición de olas);
  nada de parallax ni efectos decorativos gratuitos.
- Todo contenido de ejemplo debe ser ficticio pero verosímil para Chile
  (trámites, teléfonos, noticias comunales).
- Accesibilidad: contraste AA mínimo, targets táctiles ≥44px (los teléfonos
  útiles se marcan con un toque), textos reales, no lorem ipsum.
- Evitar los "looks" genéricos de IA que lista el SKILL.md; la personalidad
  sale del mundo municipal chileno: pin de mapa, territorio, barrio.
