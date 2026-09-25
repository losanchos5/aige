# Design

## Context

Ver `proposal.md` (Why). Restricciones que condicionan el enfoque:

- El inglés es la referencia y su salida no debe cambiar mientras no haya traducciones. El sitio es
  estático (Astro 5, `build.format: 'file'`, `trailingSlash: 'never'`) con CSP estricta
  (`script-src 'self'`, sin JS en línea).
- Los anclajes del sitio (TOC, enlaces profundos entre capítulos, colocación de figuras y diagramas en
  `data/figures.ts` y `data/diagrams.ts`) se definen por el texto inglés de los encabezados.
- El contrato con el pipeline fija la estructura: mismos encabezados en el mismo orden y nivel,
  mismos enlaces (texto traducido, destino intacto), `## Sources` literal, sin raya (U+2014).
- La carpeta de traducciones se elige con `I18N_DIR` para que los tests usen una copia temporal.

## Goals / Non-Goals

**Goals:**
- Una ruta por fichero de traducción, ninguna más; mismas anclas que el inglés; build roja con un
  mensaje que nombre fichero y encabezado si la estructura no casa.
- `hreflang`, selector de idioma y sitemap derivados de una sola función (`alternatesFor`) para que
  nunca discrepen.
- Coste cero: nada de API en el sitio; fixtures pseudo-localizados deterministas.

**Non-Goals:**
- Traducir contenido real, el resto del sitio (toolkit, registros, landings) ni los datos editoriales
  (`chapters.ts` `glance`, figuras): enlazan al inglés.
- Detección de idioma del navegador o redirecciones automáticas.

## Decisions

1. **Índice por escaneo más colecciones.** `lib/i18n-content.ts` (Node puro) escanea `I18N_DIR` una
   vez por proceso y lo leen `astro.config.ts` (sitemap, `lastmod`), los plugins Markdown y los
   tests. Las páginas cargan los mismos ficheros por colecciones validadas; `allTranslations()`
   compara ambos conjuntos y falla si difieren.
2. **Ids por posición contra un render inglés fiel.** `rehype-i18n` renderiza la fuente inglesa con
   `createMarkdownProcessor` de `@astrojs/markdown-remark` (GFM y smartypants por defecto,
   `remark-lead`, `rehype-slug`), así los slugs son los que produce el sitio inglés, incluidos los
   sufijos `-1`. Las páginas vuelven a comparar los `headings` renderizados de ambos lados
   (`assertSameAnchors`) para cazar un render cacheado contra un inglés antiguo.
3. **Figuras por texto inglés.** Cada encabezado traducido guarda su texto inglés en
   `node.data.sourceHeading`; `rehype-diagrams` compara con él, así las colocaciones existentes no se
   duplican por idioma.
4. **Glosario traducido por posición.** El capítulo 09 traducido toma el id `t-…` y el enlace
   `/glossary/<slug>` del término inglés en la misma posición; si el número de términos difiere, la
   build falla.
5. **Cadenas de interfaz con caída al inglés.** `t()` lee a mano (`HAND`, el español que ya existía en
   `/es/thesis`) → `ui.<lang>.json` → `ui.en.json`; los marcadores `{name}` deben coincidir o la
   build falla. En inglés no se añade ningún atributo nuevo (los mensajes de estado del buscador y el
   "Copied" viajan como `data-*` solo en páginas no inglesas).
6. **Selector sin JS.** `<details>` con los idiomas de `alternatesFor`; se oculta si la página existe
   en un solo idioma, así las páginas inglesas sin traducción no cambian.
7. **La portada `/<lang>` no es traducción de `/`.** No declara alternativas ni se empareja en el
   sitemap; el pie enlaza las portadas que existan.
8. **Tesis española intacta.** La colección de Tesis solo lee `fr`, `de`, `pt`; `/es/thesis` es ruta
   estática y además gana por prioridad de rutas. Los enlaces a `/thesis#ancla` desde páginas en
   español se quedan en inglés porque la traducción a mano tiene sus propios encabezados.

## Risks / Trade-offs

- [Dependencia transitiva `@astrojs/markdown-remark`] → es el paquete que Astro usa para Markdown y
  llega con `astro`; si cambia su API, falla la build, no la salida.
- [Caché de contenido local] → una traducción sin cambios no se re-renderiza si cambia el inglés;
  `assertSameAnchors` lo detecta y el mensaje indica limpiar `ASTRO_CACHE_DIR`. En CI la build es
  limpia.
- [Enlaces automáticos del glosario en páginas traducidas] → los términos que se quedan en inglés
  (acrónimos, nombres propios) enlazan a su página inglesa; es el comportamiento buscado.
- [Espacios en blanco] → el texto del pie y varias etiquetas del cromo pasan de literal multilínea a
  `t()`: mismo texto visible, distinto espaciado en el HTML (comparado página a página con la build
  anterior al cambio: 26 ficheros con diferencias más allá del espaciado, todos esperados: el selector
  en `/thesis` y `/es/thesis`, sus pares en el sitemap y el espaciado de "Key terms in this chapter").
