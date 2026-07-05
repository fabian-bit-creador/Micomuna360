<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MiComuna360 / MuniApp

Plataforma web comunal para municipios y vecinos en Chile. Dos capas: ciudadana
(`src/app/(public)`) y municipal (`src/app/(admin)`).

## Reglas del proyecto

- **Enfoque**: la comunidad primero. El producto principal es el portal
  ciudadano público, usable sin iniciar sesión. El panel municipal
  (`(admin)`) se mantiene como estructura/demo secundaria y su acceso en la
  UI debe ser discreto (no protagonista de la navegación) hasta la Fase 4.
- **Idioma**: UI, contenido, commits y docs en español (Chile). Código
  (identificadores) en inglés.
- **Datos**: solo datos ficticios hasta la Fase 3. Nunca datos personales
  reales (Ley 21.719). La UI accede a datos únicamente vía
  `src/lib/repositories` (nunca importa `src/lib/data` directo).
- **Supabase**: NO conectar hasta la Fase 3. El modelo de datos acordado está
  en `docs/modelo-datos.md`; los tipos espejo en `src/types/index.ts`.
- **Fases**: seguir el roadmap del README. No construir módulos de fases
  futuras sin acuerdo explícito.
- **UI**: componentes shadcn/ui vendorizados en `src/components/ui` (la red
  puede bloquear `ui.shadcn.com`; escribirlos a mano siguiendo sus
  convenciones). Paleta y tokens de marca en `src/app/globals.css`; tono de
  textos: simple, humano, cercano, no burocrático ni partidista
  (`docs/arquitectura.md`).
- **Mapas**: Leaflet solo con `next/dynamic` + `ssr: false`.
- **Privacidad**: solicitudes con `is_sensitive = true` jamás se muestran en
  mapa o listados públicos.

## Comandos

- `npm run dev` / `npm run build` / `npm run lint`
