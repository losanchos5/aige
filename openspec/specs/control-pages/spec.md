# control-pages Specification

## Purpose
Da a cada control `specified` una URL propia y citable con su registro completo, sus ejemplos de
observación y su contexto (casos, patrones, obligaciones, amenazas), sin crear páginas para los
controles en borrador.

## Requirements

### Requirement: Una página por control especificado
El sitio SHALL generar `/controls/<perfil>/<id-en-minúsculas>` para cada control con
`depth: 'specified'` y MUST NOT generar esa ruta para controles `stub` o `derived`. La página SHALL
usar el layout de documento y mostrar: H1 con el título del control, `StatusLine`, el registro
completo del control, casos relacionados, patrones, obligaciones, amenazas, las dos observaciones de
ejemplo renderizadas y descargables, la llamada "Review this control", la cita con la versión (y el
DOI si existe) del perfil y el enlace a su JSON por ítem.

#### Scenario: Solo controles especificados
- **WHEN** se ejecuta `site/tests/control-pages.spec.ts` sobre `dist`
- **THEN** existe una página por control `specified` del registro y ninguna para los `stub` o
  `derived`

#### Scenario: Ejemplos descargables
- **WHEN** se abre la página de un control especificado
- **THEN** muestra una observación `pass` y otra `fail` con enlaces a sus ficheros en
  `/controls/examples/`

### Requirement: Metadatos de la página de control
Cada página de control MUST tener `rel=canonical` a sí misma, un `<title>` único encabezado por la
palabra clave (por ejemplo "Network egress control for AI evaluation environments"), una descripción
única de 70 a 160 caracteres, un único ld+json `TechArticle` con `isPartOf` apuntando al
`TechArticle` del perfil, un twin `.md` con `canonical:` anunciado con `link[rel=alternate]`, su
entrada en `SOURCE_BY_PATH` generada desde el registro, su línea en `llms.txt` y una regla de
`public/_headers` que cubra `/controls/*/*.md`. La colección SHALL declararse en
`DETAIL_COLLECTIONS` de `tests/nav.spec.ts` con índice en la página de su perfil.

#### Scenario: Metadatos únicos
- **WHEN** se recorren todas las páginas de control construidas
- **THEN** cada una tiene canonical propio, un solo ld+json con `isPartOf`, twin `.md` y títulos y
  descripciones distintos entre sí

#### Scenario: Enlazada desde el perfil
- **WHEN** se abre la página del perfil
- **THEN** `<main>` contiene un enlace a cada página de control especificado del perfil
