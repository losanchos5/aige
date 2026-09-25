# Proposal

## Why

La v0.5.0 abre la traducción del Body of Knowledge, los patrones y la Tesis al español, francés,
alemán y portugués. La traducción la produce un pipeline aparte (bloque `i18n-pipeline`, que corre
en GitHub Actions con un presupuesto acotado); este cambio es su otra mitad: que el sitio sepa
renderizar lo que el pipeline deja en `i18n/<lang>/`, sin romper nada del sitio en inglés, que sigue
siendo la referencia. En esta ola no se traduce nada real (el inglés aún puede cambiar): el sitio
debe construir igual con la carpeta vacía y demostrarse con fixtures pseudo-localizados.

## What Changes

- Configuración i18n de Astro (`defaultLocale: en`, `locales: en, es, fr, de, pt`,
  `prefixDefaultLocale: false`) y sitemap con alternativas de idioma. Las URLs en inglés no cambian;
  `/es/thesis` sigue siendo la traducción a mano (`THESIS.es.md`) y gana siempre a una máquina.
- Colecciones de contenido para las traducciones (`bokI18n`, `patternsI18n`, `thesisI18n`) que leen
  de `I18N_DIR` (por defecto `<repo>/i18n`) y validan el frontmatter del contrato (`lang`, `source`,
  `sourceHash`, `translatedBy`, `translatedAt`, y los campos del patrón con ids, capas y orden
  idénticos al inglés).
- Rutas nuevas, emitidas solo para ficheros que existen: `/<lang>/bok/<slug>`,
  `/<lang>/patterns/<slug>`, `/<lang>/thesis` (fr, de, pt), `/<lang>/bok` (índice que enlaza al
  inglés lo no traducido) y `/<lang>` (portada corta del idioma). Ningún idioma sin traducciones
  emite rutas.
- `rehype-i18n`: los encabezados traducidos toman el id del encabezado inglés en la misma posición
  (la build falla, nombrando fichero y encabezado, si la estructura difiere); los enlaces internos se
  quedan en el idioma cuando la página existe; el glosario traducido ancla cada término por posición.
  `rehype-diagrams` coloca figuras y diagramas en las páginas traducidas por el texto inglés del
  encabezado en esa posición; `remark-callouts`/`remark-lead` reconocen las etiquetas de callout
  traducidas (`site/src/i18n/callouts.json`).
- Cada página traducida lleva `<html lang>`, el aviso de traducción automática en su idioma (modelo,
  enlace al inglés, enlace para reportar un error y, si el inglés cambió, aviso de desfase), canonical
  propio, `hreflang` para cada idioma disponible y `x-default`, y entra en el sitemap con sus pares.
  La cabecera gana un selector de idioma (sin JS) que solo aparece cuando la página existe en más de
  un idioma. Pagefind indexa cada idioma por separado y el buscador busca en el de la página.
- Cadenas de la interfaz extraídas a `site/src/i18n/ui.en.json` con `t(key, lang)`; el pipeline
  genera `ui.<lang>.json`; lo que falte cae al inglés. Mapa de etiquetas de callout en
  `site/src/i18n/callouts.json`.
- `lastmod` de las rutas traducidas desde su fichero de traducción; `content-lint` y `check-links`
  cubren las páginas y fuentes traducidas; generador de fixtures pseudo-localizados
  (`site/tests/fixtures/i18n/generate.mjs`) y `site/tests/i18n.spec.ts`.

Sin cambios **BREAKING**: con `i18n/<lang>/` vacío no se emite ninguna ruta traducida y la salida en
inglés es la misma salvo espacios en blanco en algunos textos del cromo; solo `/thesis` y `/es/thesis`,
que ya existían en dos idiomas, ganan el selector de idioma y su par en el sitemap.

## Capabilities

### New Capabilities
- `site-i18n`: renderizado de las traducciones automáticas (colecciones, rutas, anclas, enlaces,
  aviso, hreflang, sitemap, búsqueda por idioma, cadenas de interfaz, lint y enlaces).

### Modified Capabilities
- `site-navigation`: la cabecera gana el selector de idioma, el pie enlaza las portadas de idioma que
  existan y el test de cobertura del pie trata las páginas de un idioma como detalle de su portada.

## Impact

- Código: `site/astro.config.ts`, `site/src/content.config.ts`, `site/src/i18n/` (nuevo),
  `site/src/lib/{i18n-content,i18n-pages,rehype-i18n}.ts` (nuevos),
  `site/src/lib/{rehype-diagrams,rehype-glossary,remark-callouts,remark-lead}.ts`,
  `site/src/pages/[lang]/` (nuevo), `site/src/pages/{bok,patterns}/*`, `site/src/pages/thesis.astro`,
  `site/src/pages/es/thesis.astro`, `site/src/layouts/{Base,Doc}.astro`, componentes de cromo
  (`Header`, `Footer`, `SearchDialog`, `Breadcrumb`, `PrevNext`, `Toc`, `SidebarNav`, `AtAGlance`,
  `ChapterHeader`, `Citation`, `EditOnGitHub`, `ThemeToggle`, `PatternFoot`) y nuevos
  (`LangSwitcher`, `TranslationNotice`), `site/public/{search,ui-doc,cite}.js`,
  `site/scripts/{content-lint,check-links}.mjs`, `site/tests/{i18n,nav}.spec.ts`,
  `site/tests/fixtures/i18n/generate.mjs`.
- Dependencias: ninguna nueva. `rehype-i18n` usa `@astrojs/markdown-remark` (dependencia de Astro)
  para renderizar la fuente inglesa con los mismos valores por defecto.
- Coste: cero llamadas a la API en este cambio; todo se prueba offline con fixtures.
