# Tasks

## 1. Idiomas, configuración y contenido

- [x] 1.1 `src/i18n/locales.ts`: `en` por defecto y `es`, `fr`, `de`, `pt`; nombres propios, locale
  de Open Graph e Intl; `localeOfPath`/`stripLocale`
- [x] 1.2 `astro.config.ts`: `i18n` (`defaultLocale: en`, `prefixDefaultLocale: false`), sitemap con
  `i18n` y `serialize` que empareja con `alternatesFor` (más `x-default`), `lastmod` de las rutas
  traducidas desde su fichero, `rehype-i18n` tras `rehype-slug`
- [x] 1.3 `src/content.config.ts`: colecciones `bokI18n`, `patternsI18n`, `thesisI18n` sobre
  `I18N_DIR` con el frontmatter del contrato; verificar que con la carpeta vacía la build pasa
- [x] 1.4 `src/lib/i18n-content.ts` (índice por escaneo, `alternatesFor`, `localizeHref`,
  `sourceHash`) y `src/lib/i18n-pages.ts` (validación, desfase, `allTranslations`,
  `assertSameAnchors`)

## 2. Markdown traducido

- [x] 2.1 `src/lib/rehype-i18n.ts`: ids por posición contra el render inglés
  (`@astrojs/markdown-remark`), fallo nombrando fichero y encabezado, enlaces internos en el idioma,
  glosario anclado por posición
- [x] 2.2 `rehype-diagrams`: páginas traducidas por el texto inglés del encabezado en la misma
  posición; `rehype-glossary` deja el glosario traducido a `rehype-i18n`
- [x] 2.3 `src/i18n/callouts.json` y `src/i18n/callouts.ts`; `remark-callouts` y `remark-lead`
  reconocen las etiquetas traducidas solo en ficheros de ese idioma

## 3. Rutas y páginas

- [x] 3.1 `pages/[lang]/bok/[slug].astro`, `pages/[lang]/patterns/[id].astro`,
  `pages/[lang]/thesis.astro` (fr, de, pt), `pages/[lang]/bok/index.astro`, `pages/[lang]/index.astro`
- [x] 3.2 `TranslationNotice` (modelo, inglés, reportar error, desfase) y `LangSwitcher` (`<details>`,
  sin JS, solo con dos o más idiomas)
- [x] 3.3 `hreflang` de las páginas inglesas con traducción (capítulos, patrones, `/bok`, Tesis)
  desde `alternatesFor`; `/thesis` y `/es/thesis` sin cambios en la salida

## 4. Cadenas de interfaz

- [x] 4.1 `src/i18n/ui.en.json` y `src/i18n/ui.ts` (`t`, caída al inglés, cadenas a mano de
  `/es/thesis`, validación de marcadores y raya)
- [x] 4.2 `Header`, `Footer`, `SearchDialog`, `Breadcrumb`, `PrevNext`, `Toc`, `SidebarNav`,
  `AtAGlance`, `ChapterHeader`, `Citation`, `EditOnGitHub`, `ThemeToggle`, `PatternFoot`, `Base`,
  `Doc`; `search.js`, `ui-doc.js`, `cite.js` leen sus mensajes de `data-*` en páginas no inglesas
- [x] 4.3 Comparar la salida inglesa con la build previa al cambio: solo espacios en blanco, salvo el
  selector y el par del sitemap de `/thesis` y `/es/thesis`

## 5. Calidad

- [x] 5.1 `content-lint`: fuentes traducidas y `ui.*.json` (raya, frases vetadas) y contrato de cada
  página traducida (idioma, aviso, canonical, alternativas)
- [x] 5.2 `check-links`: `hreflang` de cada página y pares `<xhtml:link>` del sitemap
- [x] 5.3 `tests/fixtures/i18n/generate.mjs`: pseudo-localización de dos capítulos y un patrón en `es`
  y `de` (más la Tesis en `de`) y de las cadenas de interfaz
- [x] 5.4 `tests/i18n.spec.ts`: unidades (alternativas, enlaces, marcadores, estructura), build
  comprometida (sin rutas traducidas) y build con fixtures (anclas, figuras, aviso, hreflang,
  selector, sitemap, búsqueda por idioma)
- [x] 5.5 `tests/nav.spec.ts`: las páginas de un idioma cuentan como detalle de su portada; el pie
  enlaza las portadas de idioma
- [x] 5.6 Build con fixtures y build comprometida verdes; `i18n`, `nav`, `shell` y `home` en verde en
  el puerto 4460
- [x] 5.7 `openspec validate i18n-site-rendering --strict`
