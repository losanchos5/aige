# Proposal

## Why

La v0.5.0 quiere que el sitio sea la referencia del gobierno de la IA, y los lectores piden piezas que
se puedan imprimir, colgar y citar: el calendario del Reglamento de IA tras el Ómnibus, qué rol de
operador tiene una organización para un sistema, en qué peldaño de riesgo cae ese sistema y qué
control añade cada combinación de tipo de modelo y opción de despliegue. Hoy esa información está en
tablas de los capítulos 08, 15, 18 y 21 y en tres módulos de datos (`frameworks.ts`, `roles.ts`,
`deployment-options.ts`), pero no existe una imagen de conjunto que un equipo pueda llevarse, y el
único póster del sitio (el mapa de la disciplina) no está en ningún capítulo. Hay además demanda de
versiones en español para equipos hispanohablantes.

## What Changes

- **Cuatro pósteres de referencia generados en el build** desde los datos por un módulo nuevo,
  `site/scripts/lib/posters.mjs`, que `site/scripts/figures-build.mjs` invoca para cada id declarado en
  `figures.ts`. Todos en vertical A (1000 × 1414 unidades, 1 : √2), con tipografía mínima de 16
  unidades, sin enlaces (`role="img"`), sin hexadecimales, con el sello «As of 2026-09-24» dentro de la
  imagen y la banda de atribución en las exportaciones:
  - `eu-ai-act-timeline`: un carril por familia de obligaciones (prácticas prohibidas, alfabetización
    y datos de sesgo, modelos de uso general, transparencia, alto riesgo por uso, alto riesgo por
    producto, sistemas heredados de autoridades públicas) con las fechas `appliesFrom` y `milestones`
    de `frameworks.ts` y las tres fechas que solo da el capítulo 18 (entrada en vigor, Ómnibus en vigor,
    modelos de uso general anteriores a 2025-08-02); colocado en la cabeza de «The post-Omnibus
    timeline» (cap. 18) y de «EU AI Act, post-Omnibus» (cap. 08);
  - `eu-ai-act-operator-roles`: siete preguntas en un eje, cada una hacia su rol (proveedor, proveedor
    de modelos de uso general, fabricante del producto, importador, distribuidor, representante
    autorizado, responsable del despliegue) con obligaciones y evidencia, el bucle del `Art. 25` desde
    los roles que `roles.ts` marca y la entrada del registro como nodo terminal; en la cabeza de «Who you
    are in the value chain» (cap. 18);
  - `eu-ai-act-risk-ladder`: cuatro peldaños (prohibido, alto riesgo por el anexo I o el anexo III con
    el filtro del `Art. 6(3)` y la excepción de elaboración de perfiles, transparencia, mínimo), la vía
    aparte de los modelos de uso general y notas laterales solo con lo que dice el capítulo 21 (Corea,
    IA de alto impacto; Texas; California SB 53; Colorado solo como nota de transparencia), con fechas
    de `frameworks.ts`; en la cabeza de «The risk ladder» (cap. 18);
  - `deployment-option-matrix`: la matriz tipo de modelo × opción de despliegue de
    `deployment-options.ts`, girada un cuarto para caber en vertical; en la cabeza de «The model-type by
    deployment-option matrix» (cap. 15).
- **Tres ediciones en español** (`-es`) de los tres primeros: mismo diseño y datos, texto traducido con
  los términos oficiales de la versión española del Reglamento (UE) 2024/1689, raíz `lang="es"`,
  `<title>` y `<desc>` en inglés marcados `lang="en"` y sello «A fecha de 2026-09-24»; listadas en
  `/figures` y sin colocación en capítulos en inglés.
- **Pósteres en los capítulos**: `rehype-diagrams.ts` envuelve un `kind: 'poster'` en una región
  enfocable y etiquetada que se desplaza en horizontal por debajo de 760 px, con enlace a su permalink;
  `figures.css` añade esas reglas y cuatro clases de marca (`dot-on`, `dot-off`, `dot-mask`, `inv-tx`)
  mapeadas a tokens.
- **Validación**: `figures-build.mjs` acepta el sello en español en una figura `lang="es"` y conserva
  ese idioma en sus SVG descargables; `figures-gallery.spec.ts` acepta lo mismo.
- **Pruebas**: `site/tests/figures-posters.spec.ts` (contrato de póster, fechas y celdas contra los
  datos, colocación, móvil y ediciones en español).
- Fuera de alcance: `FigureDef` (sin campo de idioma: queda en el handoff), la galería `/figures` y la
  página de permalink, que muestran las ediciones españolas con metadatos en inglés.

## Capabilities

### New Capabilities
- `reference-posters`: pósteres de referencia generados desde los datos, en inglés y en español,
  imprimibles en formato A y colocados en los capítulos que resumen.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: sin cambios en `bok/`; los pósteres no añaden hechos, cifras ni fechas que los
  capítulos 08, 15, 18 y 21 no digan.
- **Código**: `site/scripts/lib/posters.mjs` (nuevo), `site/scripts/figures-build.mjs`,
  `site/src/data/figures.ts` (siete entradas al final), `site/src/lib/rehype-diagrams.ts`,
  `site/src/styles/figures.css`, `site/src/figures/*.svg` (siete generados),
  `site/tests/figures-posters.spec.ts`, `site/tests/figures-gallery.spec.ts`.
- **Sitio**: siete permalinks nuevos en `/figures/<id>` con sus descargas SVG y PNG; los capítulos 08,
  15 y 18 ganan cuatro pósteres (entre 9 y 14 KB cada uno).
- **Build**: `bash D:/Documents/aige-wt/build.sh` en verde.
