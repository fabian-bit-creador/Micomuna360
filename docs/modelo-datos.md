# Modelo de datos (Supabase — se implementa en Fase 3)

Esquema acordado en la Fase 0, basado en la sección 8 del documento maestro
del proyecto. Los tipos TypeScript de `src/types/index.ts` son el espejo de
este modelo; cualquier cambio debe hacerse en ambos lados.

## Enums

| Enum | Valores |
| --- | --- |
| `user_role` | `vecino`, `funcionario`, `admin` |
| `request_status` | `recibida`, `en_revision`, `asignada`, `en_proceso`, `resuelta`, `cerrada`, `rechazada` |
| `request_priority` | `baja`, `media`, `alta`, `urgente` |
| `task_status` | `pendiente`, `en_proceso`, `completada` |
| `news_type` | `noticia`, `anuncio`, `taller`, `beneficio` |
| `location_type` | `sector`, `barrio`, `unidad` |

## Tablas

### profiles
Extiende `auth.users` (FK 1:1). **Minimización de datos**: sin RUT ni
dirección exacta en el MVP.

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | FK → auth.users |
| full_name | text | |
| role | user_role | default `vecino` |
| sector_id | uuid | FK → locations, nullable |
| created_at | timestamptz | default now() |

### categories
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| name | text | |
| slug | text unique | |
| icon | text | nombre lucide-react |
| color | text | hex para mapa/gráficos |
| is_active | boolean | default true |

### locations
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| name | text | |
| type | location_type | |
| lat / lng | double precision | centroide |
| geojson | jsonb | polígono opcional (sin PostGIS por ahora) |

### requests
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| title | text | |
| description | text | |
| category_id | uuid | FK → categories |
| location_id | uuid | FK → locations |
| lat / lng | double precision | ubicación aproximada |
| status | request_status | default `recibida` |
| priority | request_priority | default `media` |
| is_public | boolean | si aparece en listados públicos |
| is_sensitive | boolean | denuncias sensibles: **nunca** en mapa público |
| created_by | uuid | FK → profiles |
| assigned_to | uuid | FK → profiles, nullable |
| created_at / updated_at | timestamptz | |

### request_photos
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| request_id | uuid | FK → requests, on delete cascade |
| storage_path | text | bucket privado, URLs firmadas |
| created_at | timestamptz | |

### tasks
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| request_id | uuid | FK → requests |
| assigned_to | uuid | FK → profiles |
| description | text | |
| due_date | date | nullable |
| status | task_status | default `pendiente` |

### news
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| title / slug / summary / body | text | slug unique |
| cover_image | text | nullable |
| type | news_type | |
| published_at | timestamptz | |
| author_id | uuid | FK → profiles |

### events
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| title / description | text | |
| starts_at / ends_at | timestamptz | ends_at nullable |
| location_id | uuid | FK → locations, nullable |
| category | text | |

### indicators
| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| name / area / unit / period | text | |
| value | numeric | |
| source | text | citar SINIM/INE cuando sean datos reales |

### audit_log
Escritura solo vía triggers/funciones; lectura restringida a admin.

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| actor_id | uuid | FK → profiles |
| action | text | ej. `cambio_estado`, `asignacion` |
| entity_type / entity_id | text / uuid | |
| old_value / new_value | jsonb | |
| created_at | timestamptz | |

## Principios RLS (obligatorios antes de producción)

1. **Vecino**: ve sus propias solicitudes + las públicas no sensibles.
2. **Funcionario**: ve todas las solicitudes; edita estado/asignación.
3. **Admin**: acceso total + lectura de audit_log.
4. El mapa público consume una **vista** que excluye `is_sensitive = true` y
   redondea coordenadas cuando corresponda.
5. Fotos en bucket privado; acceso por URL firmada solo a creador y staff.
6. `audit_log` sin INSERT/UPDATE/DELETE directo para ningún rol.

## Privacidad (Ley 21.719)

- Datos ficticios hasta tener base legal y medidas de seguridad.
- Minimización: solo los datos necesarios para el flujo.
- Anonimización o supresión cuando corresponda.
- Datos agregados separados de datos individuales.
