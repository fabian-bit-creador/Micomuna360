# Formulario «¿Viste un dato cambiado?»

Formulario de Google para que un vecino avise que un dato del sitio está
mal o cambió. No pide datos personales (Ley 21.719): el enlace del sitio
llega con la página y la fuente ya escritas.

## Cómo crearlo

1. En https://forms.google.com crea un formulario **en blanco**.
2. **Título**: «MiComuna360 — ¿Viste un dato cambiado?»
3. **Descripción**: «Cuéntanos qué dato está mal o cambió. No escribas tu
   nombre, RUT, teléfono, correo ni otros datos personales: no los
   necesitamos. Revisamos cada aviso con la fuente oficial antes de
   corregir.»
4. **Preguntas**, en este orden:

   | # | Pregunta | Tipo | Obligatoria |
   |---|---|---|---|
   | 1 | Página donde viste el dato | Respuesta corta | No |
   | 2 | Dato o fuente | Respuesta corta | No |
   | 3 | ¿Qué está mal o qué cambió? | Párrafo | **Sí** |
   | 4 | ¿Dónde viste el dato correcto? (enlace, oficina o cartel) | Respuesta corta | No |

5. En **Configuración → Respuestas**:
   - «Recopilar direcciones de correo electrónico»: **No recopilar**.
   - «Limitar a 1 respuesta»: **desactivado**. Si queda activado, exige
     iniciar sesión con Google.
6. En **Configuración → Presentación**, escribe como mensaje de
   confirmación: «Gracias. Revisaremos el dato con la fuente oficial.»
7. En la pestaña **Respuestas**:
   - Vincúlalo a una hoja de cálculo, si quieres.
   - Activa el aviso por correo (⋮ → «Recibir notificaciones por correo
     electrónico para nuevas respuestas»).

## Enlace para el sitio

1. En el menú ⋮ del formulario, elige **«Obtener enlace prellenado»**.
2. Escribe `PAGINA` en la pregunta 1 y `DATO` en la 2.
3. Presiona «Obtener vínculo» y copia el enlace.

El enlace se ve así:

```
https://docs.google.com/forms/d/e/<id>/viewform?usp=pp_url&entry.1111=PAGINA&entry.2222=DATO
```

Con él se completa `reportForm` en `src/config/site.ts`:

```ts
export const reportForm = {
  url: "https://docs.google.com/forms/d/e/<id>/viewform",
  page: "entry.1111",
  source: "entry.2222",
};
```

Desde ese momento, el enlace aparece junto a cada fuente y en el pie de
página de las comunas reales.

## Qué hacer con cada aviso

- Revisar el dato con la fuente oficial.
- Si cambió, corregirlo con la habilidad `cargar-fuente`.
- No responder al vecino: el formulario no guarda cómo contactarlo.
