# Supabase (se conecta en Fase 3)

Por decisión de diseño, el MVP funciona con datos ficticios servidos por
`src/lib/repositories`. Supabase se conecta recién en la **Fase 3**, cuando el
modelo de datos y los flujos estén validados (ver `docs/modelo-datos.md`).

Cuando llegue el momento, aquí vivirán:

- `client.ts` — cliente de navegador (`createBrowserClient` de `@supabase/ssr`)
- `server.ts` — cliente de servidor con cookies (`createServerClient`)
- `middleware.ts` — refresco de sesión

Las dependencias (`@supabase/supabase-js`, `@supabase/ssr`) ya están
instaladas y las variables necesarias están documentadas en `.env.example`.

**Regla de seguridad:** antes de exponer cualquier tabla, activar RLS y
políticas por rol (vecino / funcionario / admin). Nunca subir datos personales
reales sin base legal (Ley 21.719).
