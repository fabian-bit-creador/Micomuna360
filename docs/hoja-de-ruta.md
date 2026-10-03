# Hoja de ruta

Qué sigue para MiComuna360, en orden. Cada etapa se apoya en la anterior.
El resumen de lo hecho y lo pendiente está en `docs/estado-2026-10.md`.

## Dónde estamos

La Pintana está publicada con servicios, beneficios, deportes, agenda,
teléfonos, directorio, mapa, transparencia e indicadores, todo con fuente y
fecha. El sitio no usa
cuentas ni base de datos: las páginas se generan desde los datasets del
repositorio y se regeneran cada hora.

Lo que falta para ser una plataforma «con funciones reales» son las cosas en
que el vecino **aporta** algo (una corrección, un negocio, un reporte) y
alguien **responde**. Eso necesita base de datos, reglas de privacidad y, para
los reportes, un acuerdo con el municipio.

## 1. Mantener lo publicado (siempre)

La información vieja es el mayor riesgo del sitio.

| Tarea | Detalle |
|---|---|
| Agenda | La cartelera cultural se revisa cada mes (su fuente vence el 2026-10-31). Las actividades pasadas se ocultan solas, pero las nuevas hay que cargarlas. |
| Números de emergencia | 131, 132, 133 y 134 confirmados desde Chile el 2026-10-03; se revisan de nuevo antes del 2027-04-03. |
| Revisión de fuentes | Cada fuente tiene `validUntil`. Deportes vence el 2026-12-31 (cambio de semestre) y la mayoría de las fuentes municipales el 2026-12-27. Al vencer, la ficha se muestra como «revisión vencida» sola. |
| Controles automáticos | Revisión en cada cambio con lint, build y validación de datos (GitHub Actions), y una rama estable protegida para producción. |
| Pruebas de recorridos | Pruebas automáticas de lo que usa un vecino: buscar, revisar beneficios, filtrar deportes, abrir el mapa, llamar. |
| Rendimiento | Medir en un celular de gama media con red móvil. Transparencia es la página más pesada: cargar sus tablas largas bajo demanda. |

## 2. Más información pública (sin cuenta)

Suma valor sin pedir datos a nadie. Cada una se publica solo con fuente
verificada.

1. **Más líneas de apoyo**: Fono Mayor, Fono Familia, violencia contra la
   mujer y drogas, cuando se confirmen en sus sitios oficiales.
2. **Agenda con más fuentes**: actividades del municipio y talleres
   vecinales, además de cultura y deporte.
3. **Cultura**: talleres de la Corporación Cultural, con el mismo formato de
   Deportes.
4. **Ferias libres**: días y calles, desde la información municipal.
5. **Seguridad**: casos policiales por 100.000 habitantes (CEAD), con
   contexto. En espera por decisión del 2026-10-03.
6. **Más fotos reales**: propias o con licencia libre, con crédito.
7. **Una segunda comuna real**: confirma que agregar comunas no requiere
   tocar las páginas.

## 3. Funciones con participación (requieren base de datos)

Antes de la primera, una base común:

- **Base de datos con aislamiento por comuna** (Supabase): cada registro
  pertenece a una comuna, cada usuario a las comunas donde tiene permisos,
  reglas de acceso por fila (RLS) en todas las tablas y registro de cambios.
- **Privacidad y términos** (Ley 21.719): qué datos se piden, para qué, por
  cuánto tiempo y cómo se borran; consentimiento explícito.
- **Moderación**: quién revisa lo que llega y en qué plazo.

Después, en este orden (de menor a mayor riesgo):

1. **«¿Este dato está mal?»**: botón en cada ficha para avisar un error,
   sin cuenta y con protección contra spam. Es lo más útil y lo más simple.
2. **Negocios locales**: el dueño pide aparecer y entrega su foto y datos de
   contacto, con autorización escrita; alguien verifica que el negocio exista
   (patente o visita). Sin reseñas ni estrellas al comienzo: exigen
   identidad, moderación y un cálculo justo.
3. **Avisos por correo**: fechas de postulación, inscripciones o cambios en
   una sección, con suscripción y baja en un clic.
4. **Reportes vecinales con seguimiento**: solo con un convenio con el
   municipio. Sin alguien que responda, un reporte es una promesa vacía.
5. **Panel municipal**: para el equipo del municipio que responde reportes y
   actualiza su información.

## 4. Ideas para potenciar lo que ya está

- **Orientador de beneficios**: sumar deporte y cultura según la edad
  («hay niños de 6 a 12 años» → mini atletismo, judo infantil).
- **Mapa comunal**: «cerca de mí», lista sincronizada, Street View y
  sectores con «¿en qué sector estoy?» (hechos). En el celular: hoja
  inferior, lugares cercanos, dos dedos, vista lista y descargas
  (publicado el 2026-10-03).
- **Instalable en el celular** (PWA), con teléfonos y direcciones disponibles
  sin conexión.
- **Portada v2**: buscador arriba con lo más buscado, emergencias a un
  toque, cuatro accesos, foto real y barra inferior en el celular
  (publicada el 2026-10-03).
- **Unir Directorio y Mapa** en una sola sección «Lugares».

## Auditoría de septiembre de 2026

| Punto | Estado |
|---|---|
| H01 dependencias, H02 vigencia, H03 contraste, H05 buscadores, H06 cabeceras, H07 validación de fechas y URL, H09 documentación, H11 ids fijos, H12 privacidad en URL, H14 celular | Resueltos |
| H13 rendimiento | Dependencias sin uso eliminadas y versión de Node fijada; falta medir |
| H10 cargas reproducibles | Deportes tiene captura y generador en `docs/fuentes/`; faltan los de las cargas anteriores |
| H04 controles del repositorio | Pendiente (etapa 1) |
| H08 aislamiento en base de datos | Condición previa de la etapa 3 |
