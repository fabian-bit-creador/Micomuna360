"""Genera sports.ts y el respaldo CSV desde el listado oficial de
pintanadeportes.cl (texto de la portada, sección «Escuelas y talleres
deportivos»). Excluye el nombre de los profesores (dato personal)."""
import json, re, csv, hashlib, sys, unicodedata

raw = open('home.txt', encoding='utf-8').read()
start = raw.index('Número de talleres o escuelas')
body = raw[start:]
total = int(re.search(r'Número de talleres o escuelas: (\d+)', body).group(1))
blocks = re.findall(
    r'\n([^\n]+)\n\n([^\n]+)\nLa Pintana, Región Metropolitana\nDías: ([^\n]+)\n'
    r'Horario: De (\d\d:\d\d) a (\d\d:\d\d) hrs\.\nProfesor: [^\n]*\n[^\n]*\n'
    r'(TALLERES DEPORTIVOS|ESCUELAS DEPORTIVAS)', body)
assert len(blocks) == total, (len(blocks), total)

DAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
def strip(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
def parse_days(s):
    s = strip(s).lower()
    m = re.fullmatch(r'(\w+) a (\w+)', s)
    if m:
        a, b = DAYS.index(m.group(1)), DAYS.index(m.group(2))
        return DAYS[a:b + 1]
    parts = [p.strip() for p in re.split(r',| y ', s)]
    for p in parts: assert p in DAYS, (s, p)
    return sorted(parts, key=DAYS.index)

# Disciplina y nombre legible (ortografía de la RAE, sin mayúsculas sostenidas).
DISCIPLINES = [
    ('ACONDICIONAMIENTO FÍSICO', 'Acondicionamiento físico'),
    ('ATLETISMO LANZAMIENTO', 'Atletismo'), ('MINI ATLETISMO', 'Atletismo'),
    ('BASQUETBOL', 'Básquetbol'), ('BMX', 'BMX'), ('BOXEO', 'Boxeo'),
    ('CICLISMO', 'Ciclismo'), ('CROSS TRAINING', 'Cross training'),
    ('ESCALADA', 'Escalada'), ('FREESKATE', 'Freeskate'),
    ('FÚTBOL', 'Fútbol'), ('FUTBOL', 'Fútbol'), ('HALTEROFILIA', 'Halterofilia'),
    ('JUDO', 'Judo'), ('KARATE DO', 'Karate do'), ('PATÍN CARRERA', 'Patín carrera'),
    ('PATIN CARRERA', 'Patín carrera'), ('PATINAJE ARTÍSTICO', 'Patinaje artístico'),
    ('POWER TRAINING', 'Power training'), ('RUGBY', 'Rugby'), ('RUNNING', 'Running'),
    ('TAEKWONDO', 'Taekwondo'), ('TENIS DE MESA', 'Tenis de mesa'),
    ('VOLEIBOL', 'Vóleibol'), ('YOGA', 'Yoga'), ('ZUMBA', 'Zumba'),
]
NAMES = {  # nombre base (sin recinto ni día) -> nombre legible
    'ACONDICIONAMIENTO FÍSICO': 'Acondicionamiento físico',
    'ATLETISMO LANZAMIENTO': 'Atletismo: lanzamiento', 'MINI ATLETISMO': 'Mini atletismo',
    'BASQUETBOL BULLTERRIERS': 'Básquetbol Bullterriers', 'BASQUETBOL LA CURVA': 'Básquetbol La Curva',
    'BMX': 'BMX', 'BOXEO COMPETITIVO': 'Boxeo competitivo', 'BOXEO RECREATIVO': 'Boxeo recreativo',
    'CICLISMO': 'Ciclismo', 'CROSS TRAINING': 'Cross training', 'ESCALADA': 'Escalada',
    'FREESKATE': 'Freeskate', 'FUTBOL': 'Fútbol', 'FÚTBOL': 'Fútbol',
    'FÚTBOL FEMENINO JUVENIL': 'Fútbol femenino juvenil',
    'FÚTBOL MASCULINO SUB 11': 'Fútbol masculino sub 11–13',
    'FÚTBOL MASCULINO SUB 15': 'Fútbol masculino sub 15–17',
    'FÚTBOL MASCULINO SUB 7': 'Fútbol masculino sub 7–9',
    'HALTEROFILIA ADULTO': 'Halterofilia adultos', 'HALTEROFILIA INFANTIL': 'Halterofilia infantil',
    'JUDO': 'Judo', 'KARATE DO': 'Karate do', 'PATIN CARRERA': 'Patín carrera',
    'PATÍN CARRERA': 'Patín carrera',
    'PATINAJE ARTÍSTICO AVANZADO': 'Patinaje artístico avanzado',
    'PATINAJE ARTÍSTICO INICIACIÓN': 'Patinaje artístico iniciación',
    'PATINAJE ARTÍSTICO INTERMEDIO': 'Patinaje artístico intermedio',
    'POWER TRAINING': 'Power training', 'RUGBY ADULTOS': 'Rugby adultos',
    'RUGBY FEMENINO': 'Rugby femenino', 'RUGBY INFANTIL': 'Rugby infantil',
    'RUGBY JUVENIL MASCULINO': 'Rugby juvenil masculino', 'RUNNING LA PINTANA': 'Running La Pintana',
    'TAEKWONDO': 'Taekwondo', 'TENIS DE MESA ADULTOS': 'Tenis de mesa adultos',
    'TENIS DE MESA FORMATIVO': 'Tenis de mesa formativo', 'VOLEIBOL': 'Vóleibol',
    'YOGA': 'Yoga', 'ZUMBA': 'Zumba',
}
VENUE_NAMES = {  # sufijo del listado -> nombre del lugar
    'CLUB DE CAMPO': 'Club de Campo', 'ANTICURA': 'Anticura', 'SANTO TOMÁS': 'Santo Tomás',
    'CANCHA JAMAICA': 'Cancha Jamaica', 'DIEGO DE ALMAGRO': 'Diego de Almagro',
    'EL REMANZO': 'El Remanzo', 'ELEUTERIO RAMÍREZ': 'Eleuterio Ramírez', 'LOS MAYAS': 'Los Mayas',
    'VILLA CONCIERTO 1': 'Villa Concierto 1', 'VILLA LOS ALMENDROS': 'Villa Los Almendros',
    'VILLA MAGDALENA 1': 'Villa Magdalena 1', 'VILLA NACIMIENTO': 'Villa Nacimiento',
    'VILLA SALVADOR DALI': 'Villa Salvador Dalí', 'VILLA SAN GABRIEL': 'Villa San Gabriel',
    'ESTADIO MUNICIPAL': 'Estadio Municipal', 'CEDECO LA PLATINA': 'Cedeco La Platina',
    'CLUB EL DINAMO': 'Club El Dínamo', 'CONDOMINIO NUEVA ESPERANZA': 'Condominio Nueva Esperanza',
    'JJVV 7-1': 'Junta de vecinos 7-1', 'RAÚL DEL CANTO': 'Raúl del Canto',
    'SEDE CAS SUSANA MENARES': 'Sede CAS Susana Menares', 'SEDE HEMISFERIO': 'Sede Hemisferio',
    'SEDE JAIME SILVA': 'Sede Jaime Silva', 'SEDE VILLA GABRIELA': 'Sede Villa Gabriela',
}
# Recintos de la Corporación ya publicados en el directorio (misma dirección).
PLACES = {
    'Ciudad de México 1589': ('lp-pl-estadio', 'Estadio Municipal'),
    'Santa Rosa 10812': ('lp-pl-club-campo', 'Club de Campo'),
    'Patagonia 12980': ('lp-pl-polideportivo', 'Polideportivo'),
    'Avenida Gabriela 3343': ('lp-pl-las-rosas', 'Complejo Las Rosas'),
}

rows, ids = [], set()
for name, address, days, start_t, end_t, kind in blocks:
    base, suffix = (name.split(' - ', 1) + [None])[:2]
    venue = None
    if suffix and re.fullmatch(r'\d+', suffix):  # "SUB 11 - 13"
        base = base; suffix = None
    elif suffix == 'SÁBADO':
        suffix = None
    elif suffix:
        venue = VENUE_NAMES[suffix]
    display = NAMES[base]
    discipline = next(d for k, d in DISCIPLINES if base.startswith(k))
    place_id, place_venue = PLACES.get(address, (None, None))
    venue = venue or place_venue
    d = parse_days(days)
    assert start_t < end_t, name
    slug = re.sub(r'[^a-z0-9]+', '-', strip(f'{display} {venue or ""} {"-".join(x[:3] for x in d)}').lower()).strip('-')
    pid = f'lp-dep-{slug}'
    assert pid not in ids, pid
    ids.add(pid)
    rows.append(dict(id=pid, name=display, discipline=discipline,
                     kind='escuela' if kind.startswith('ESCUELAS') else 'taller',
                     venue=venue, address=address, placeId=place_id, days=d,
                     startTime=start_t, endTime=end_t, officialName=name))

rows.sort(key=lambda r: (strip(r['discipline']), strip(r['name']), r['venue'] or '', DAYS.index(r['days'][0])))
out = sys.argv[1]
def ts(v):
    return json.dumps(v, ensure_ascii=False)
with open(out, 'w', encoding='utf-8') as f:
    f.write('''import type { SportsProgram } from "@/types";

/**
 * Escuelas y talleres deportivos de la Corporación Municipal de Deportes,
 * segundo semestre 2026.
 *
 * Generado desde el listado «Escuelas y talleres deportivos» de
 * pintanadeportes.cl (consultado el 2026-09-27); respaldo y metodología en
 * docs/fuentes/la-pintana-deportes-2026-09/. Se publican nombre, recinto,
 * dirección, días y horario tal como los informa la Corporación; el nombre
 * de cada profesor se omite (dato personal).
 */
export const sportsPrograms: SportsProgram[] = [
''')
    for r in rows:
        f.write('  {\n')
        f.write(f'    id: {ts(r["id"])},\n    name: {ts(r["name"])},\n    discipline: {ts(r["discipline"])},\n')
        f.write(f'    kind: {ts(r["kind"])},\n    venue: {ts(r["venue"])},\n    address: {ts(r["address"])},\n')
        f.write(f'    placeId: {ts(r["placeId"])},\n    days: {ts(r["days"])},\n')
        f.write(f'    startTime: {ts(r["startTime"])},\n    endTime: {ts(r["endTime"])},\n')
        f.write('    sourceId: "lp-deportes-talleres",\n  },\n')
    f.write('];\n')
with open(sys.argv[2], 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['id', 'nombre_oficial', 'nombre', 'disciplina', 'tipo', 'recinto', 'direccion', 'dias', 'inicio', 'termino'])
    for r in rows:
        w.writerow([r['id'], r['officialName'], r['name'], r['discipline'], r['kind'], r['venue'] or '', r['address'], ' '.join(r['days']), r['startTime'], r['endTime']])
print(len(rows), 'programas;', collections.Counter(r['kind'] for r in rows) if (collections:=__import__('collections')) else '')

