# Spec Delta

## Purpose

Página de plazos del Reglamento (UE) 2024/1689 tras el Digital Omnibus (Reg. (UE) 2026/1744), en
inglés y en español, generada desde un único dato bilingüe, mantenida por hitos y con el estado
español (AESIA, sandbox RD 817/2023 y proyecto de ley en tramitación) como gancho.

## ADDED Requirements

### Requirement: Dato bilingüe único de hitos
El sitio SHALL mantener un único conjunto de hitos del AI Act del que salen las dos páginas y las
exportaciones. Cada hito MUST tener fecha ISO, título y texto de qué se aplica en inglés y en
español, artículos, base (`ai-act` u `omnibus`), estado (`applied` o `upcoming`), fecha de revisión y
al menos una fuente numerada con verificación `primary`, `secondary` o `reported`. Los hitos MUST ir
en orden de fecha sin duplicados. El conjunto MUST cubrir todas las fechas de la tabla "The
post-Omnibus timeline" del capítulo 18 y todas las fechas del Reglamento que usa el registro de
obligaciones (`appliesFrom` y fechas de hitos de las filas del EU AI Act). Un hito desplazado por el
Omnibus MUST declarar la fecha anterior y la nueva.

#### Scenario: Coherencia con el registro
- **WHEN** se compara el conjunto de fechas del registro para el EU AI Act con las fechas del dato
- **THEN** todas las fechas del registro están en el dato

#### Scenario: Próximos plazos con fecha fija
- **WHEN** se piden, a 2026-09-24, los próximos plazos del dato limitados a fechas que usa el registro
- **THEN** salen en el mismo orden que las fechas de la banda "What applies now" para ese día
  (2026-12-02, 2027-08-02, 2027-12-02, 2028-08-02)

### Requirement: Puerta de mantenimiento por hitos
Un hito cuya fecha ya ha pasado el día en que corren los tests MUST tener estado `applied` y una fecha
de revisión igual o posterior a su fecha; si no, los tests MUST fallar. El dato SHALL declarar la
fecha "a" de la página, la fecha de próxima revisión (el siguiente hito pendiente) y un registro de
actualizaciones con al menos una entrada.

#### Scenario: Un hito pasa sin revisar
- **WHEN** llega 2026-12-02 y el hito de esa fecha sigue `upcoming`
- **THEN** la suite falla nombrando el hito hasta que alguien lo revisa y lo marca `applied`

### Requirement: Páginas EN y ES
El sitio SHALL publicar `/resources/ai-act-deadlines` en inglés y `/es/resources/ai-act-deadlines` en
español escrito a mano. Cada página MUST tener un solo H1 en su idioma, `lang` de documento de su
idioma, canonical propio, alternates hreflang `en`, `es` y `x-default` en ambos sentidos, un enlace
visible a la otra versión y ningún aviso de traducción automática. Cada página SHALL mostrar el
próximo plazo calculado en build, la línea temporal como lista ordenada con un `<time datetime>` por
hito y su estado, la tabla de lo que cambió con el Omnibus, las entradas de España, cómo se actualiza
la página con su registro de cambios, las descargas y las fuentes numeradas. Las dos rutas MUST
aparecer en el sitemap con su par hreflang.

#### Scenario: Par de idiomas
- **WHEN** se abre `/es/resources/ai-act-deadlines`
- **THEN** el documento es `lang="es"`, el H1 dice "Plazos del Reglamento de IA (AI Act) tras el Digital
  Omnibus: qué se aplica y cuándo" y un enlace lleva a `/resources/ai-act-deadlines`

#### Scenario: Línea temporal completa
- **WHEN** se abre cualquiera de las dos páginas
- **THEN** hay tantos `<time datetime>` en la línea temporal como hitos tiene el dato

### Requirement: Estado español prudente
Las entradas de España SHALL cubrir AESIA, el espacio controlado de pruebas del RD 817/2023 y el
Proyecto de Ley Orgánica para el buen uso y la gobernanza de la IA. El proyecto de ley MUST aparecer
siempre como proyecto en tramitación parlamentaria, nunca como ley adoptada, en los dos idiomas, y
cada entrada MUST llevar fuente. content-lint MUST seguir rechazando "Spanish AI law" sin calificar.

#### Scenario: Proyecto no adoptado
- **WHEN** se lee la tarjeta del proyecto de ley en cualquiera de las páginas
- **THEN** dice que es un proyecto (bill) en tramitación y da su fecha de estado

### Requirement: Exportaciones JSON e ICS
El sitio SHALL publicar `/resources/ai-act-deadlines.json` con todos los hitos y las entradas de
España en los dos idiomas, la fecha "a" y las fuentes, y un calendario ICS por idioma
(`/resources/ai-act-deadlines.ics`, `/es/resources/ai-act-deadlines.ics`) con un evento de día
completo por hito pendiente, con UID estable. Ambos formatos MUST parsear.

#### Scenario: Calendario
- **WHEN** se descarga `/es/resources/ai-act-deadlines.ics`
- **THEN** contiene un `VEVENT` por hito `upcoming`, con el título en español

### Requirement: Descubrimiento
La página inglesa SHALL enlazarse desde el grupo Reference de la navegación (tras Obligations), el
índice de recursos, `llms.txt`, el capítulo 18 (§ "The post-Omnibus timeline") y el capítulo 21 (§
Spain); la española desde el pie ("Plazos del Reglamento de IA (español)"). Ambas SHALL llevar JSON-LD
`TechArticle` (con `inLanguage` y la relación de traducción entre ellas) y `BreadcrumbList`, y una
tarjeta OG propia.

#### Scenario: llms.txt
- **WHEN** se descarga `/llms.txt`
- **THEN** lista `/resources/ai-act-deadlines`
