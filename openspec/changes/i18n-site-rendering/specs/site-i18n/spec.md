# Spec Delta

## Purpose

El sitio renderiza las traducciones automáticas del Body of Knowledge, los patrones y la Tesis que el
pipeline deja en `I18N_DIR` (por defecto `<repo>/i18n`), con las mismas anclas que el inglés, un
aviso de traducción en cada página y las alternativas de idioma declaradas de forma coherente en el
HTML, el selector de idioma y el sitemap. El inglés sigue siendo la referencia.

## ADDED Requirements

### Requirement: Idiomas y URLs

El sitio SHALL declarar los idiomas `en` (por defecto, sin prefijo), `es`, `fr`, `de` y `pt`. Ninguna
URL en inglés MUST cambiar. `/es/thesis` SHALL seguir sirviendo la traducción a mano
(`THESIS.es.md`) y ninguna traducción automática MUST sustituirla.

#### Scenario: Build sin traducciones
- **WHEN** se construye el sitio con `i18n/<lang>/` vacío
- **THEN** la build pasa, no existe ninguna ruta `/es/...`, `/fr/...`, `/de/...` ni `/pt/...` salvo
  `/es/thesis`, y el sitemap no lista ninguna otra

#### Scenario: Tesis española
- **WHEN** existe una traducción automática de la Tesis al francés, alemán o portugués
- **THEN** se publica en `/<lang>/thesis` y `/es/thesis` sigue mostrando `THESIS.es.md`

### Requirement: Rutas solo para traducciones existentes

El sitio SHALL emitir `/<lang>/bok/<slug>` por cada `<lang>/bok/<chapter-id>.md`,
`/<lang>/patterns/<slug>` por cada `<lang>/patterns/<slug>.md` y `/<lang>/thesis` por cada
`<lang>/THESIS.md` de `fr`, `de` o `pt`; `/<lang>/bok` cuando el idioma tenga al menos un capítulo, y
`/<lang>` cuando tenga al menos una traducción. Un idioma sin traducciones MUST NOT emitir ninguna
ruta. El índice `/<lang>/bok` SHALL listar todos los capítulos por partes, enlazando la traducción
cuando existe y el original inglés, marcado como inglés, cuando no.

#### Scenario: Capítulo sin traducir en el índice
- **WHEN** se abre `/de/bok` y el capítulo 05 no tiene traducción alemana
- **THEN** su fila enlaza `/bok/patterns` con el título inglés marcado `lang="en"` y la etiqueta de
  inglés

### Requirement: Frontmatter validado

Cada fichero traducido MUST abrir con `lang`, `source`, `sourceHash` (sha256 hexadecimal del inglés
con saltos LF), `translatedBy` (`machine: <modelo>`) y `translatedAt` (fecha ISO). `lang` MUST ser la
carpeta del fichero y `source` la ruta del fichero inglés que traduce. Un patrón MUST conservar `id`,
`layer`, `secondaryLayer` y `order` del inglés y solo traducir `title` y `summary`. Cualquier
incumplimiento MUST fallar la build nombrando el fichero.

#### Scenario: Idioma mal declarado
- **WHEN** `i18n/de/bok/03-values-principles.md` declara `lang: es`
- **THEN** la build falla con un mensaje que nombra el fichero y los dos idiomas

#### Scenario: Traducción desfasada
- **WHEN** el `sourceHash` de una traducción no coincide con el fichero inglés actual
- **THEN** la página se publica y su aviso añade que la versión inglesa ha cambiado desde la
  traducción

### Requirement: Anclas idénticas al inglés

Los encabezados de una página traducida SHALL llevar el id del encabezado inglés en la misma
posición, de modo que todo `#ancla` válido en la página inglesa lo sea en la traducida. Si el número
de encabezados o el nivel de alguno difiere del inglés, la build MUST fallar nombrando el fichero y el
primer encabezado distinto. Las figuras y diagramas colocados en un encabezado inglés SHALL aparecer
en la misma sección de la página traducida. En el glosario traducido cada término SHALL llevar el id
y el enlace a la página del término inglés en la misma posición.

#### Scenario: Estructura distinta
- **WHEN** una traducción convierte un `###` en `##` o elimina un encabezado
- **THEN** la build falla con un mensaje `i18n: <lang>/bok/<id>.md ... heading N "<texto>" ...`

#### Scenario: Enlace profundo
- **WHEN** un lector abre `/es/bok/governance-program#governance-culture`
- **THEN** la página se desplaza a la sección traducida que corresponde a "Governance culture"

### Requirement: Enlaces internos en el idioma de la página

Un enlace interno de una traducción a un capítulo, patrón, la Tesis o `/bok` SHALL apuntar a la
página del mismo idioma cuando exista y al inglés cuando no, conservando el fragmento. Un enlace con
ancla a `/thesis` desde una página en español SHALL quedarse en inglés.

#### Scenario: Capítulo traducido enlazado
- **WHEN** `/es/bok/values-and-principles` enlaza `/bok/governance-program#governance-culture` y ese
  capítulo está traducido al español
- **THEN** el enlace publicado es `/es/bok/governance-program#governance-culture` y resuelve

### Requirement: Aviso, idioma y alternativas

Cada página traducida SHALL llevar `<html lang="<lang>">`, un aviso en su idioma ("Machine
translation by <modelo>; the English version is the reference.") con enlace a la página inglesa y
enlace para reportar un error, un canonical que apunte a sí misma y `hreflang` para cada idioma en
que exista la página más `x-default` (el inglés). La página inglesa SHALL declarar las mismas
alternativas. El sitemap SHALL listar cada ruta traducida con esas mismas alternativas; la portada
`/<lang>` y `/` MUST NOT emparejarse.

#### Scenario: Alternativas recíprocas
- **WHEN** existen `/bok/definition`, `/es/bok/definition` y `/de/bok/definition`
- **THEN** las tres declaran `hreflang` `en`, `es`, `de` y `x-default` con las mismas URLs, y el
  sitemap las empareja igual

### Requirement: Búsqueda por idioma

Pagefind SHALL indexar cada idioma por separado según `<html lang>` y el diálogo de búsqueda de una
página SHALL buscar en el índice de su idioma.

#### Scenario: Buscar desde una página alemana
- **WHEN** se busca desde `/de/bok/values-and-principles`
- **THEN** todos los resultados son páginas con `lang="de"`

### Requirement: Cadenas de interfaz

Las cadenas visibles del cromo (cabecera, grupos de navegación, pie, migas, "At a glance", "Key
terms", cita, anterior/siguiente, aviso, selector, buscador) SHALL venir de
`site/src/i18n/ui.en.json` mediante `t(key, lang)`. Un `ui.<lang>.json` generado por el pipeline MUST
tener las mismas claves y marcadores `{name}` que el inglés y ninguna raya, o la build falla; una
clave o un fichero ausentes SHALL caer al inglés. Las etiquetas de callout traducidas SHALL ser las
de `site/src/i18n/callouts.json`. Sin traducciones, la salida de una página inglesa SHALL ser la misma
que antes del cambio salvo espacios en blanco, excepto el selector de idioma y el par del sitemap de
las páginas que ya existían en dos idiomas (`/thesis`, `/es/thesis`).

#### Scenario: Idioma sin cadenas
- **WHEN** existe `/pt/bok/x` pero no `ui.pt.json`
- **THEN** la página se construye con el cromo en inglés

### Requirement: Fechas, lint y enlaces de las traducciones

El `lastmod` de una ruta traducida SHALL salir de su fichero de traducción. `content-lint` SHALL
aplicar la regla de la raya y las frases vetadas a las fuentes traducidas y a `ui.*.json`, y exigir
en cada página traducida su idioma, el aviso, el canonical propio y las alternativas. `check-links`
SHALL resolver los enlaces de las páginas traducidas, sus `hreflang` y los pares del sitemap.

#### Scenario: Raya en una traducción
- **WHEN** un fichero de `i18n/<lang>/` contiene U+2014
- **THEN** `content-lint` falla nombrando el fichero

#### Scenario: Alternativa sin página
- **WHEN** una página declara `hreflang="fr"` hacia una URL que no se construyó
- **THEN** `check-links` falla nombrando la página y la URL
