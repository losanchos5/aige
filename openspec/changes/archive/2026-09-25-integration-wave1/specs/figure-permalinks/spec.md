# Spec Delta

## ADDED Requirements

### Requirement: Ancla y permalink en cada infografía
Cada infografía de `figures.ts` insertada en un capítulo o en una página editorial SHALL llevar
`id="figure-<id>"` en su `<figure>` y un enlace "Permalink, downloads and citation" a `/figures/<id>`
en su pie, salvo en la propia página del permalink. La lista "Where it appears" del permalink MUST
enlazar `/bok/<capítulo>#figure-<id>`, y la comprobación de enlaces MUST resolver esa ancla.

#### Scenario: Figura en un capítulo
- **WHEN** se abre `/bok/risk-management`
- **THEN** la figura `risk-matrix` tiene `id="figure-risk-matrix"` y su pie enlaza
  `/figures/risk-matrix`

### Requirement: Variante ancha de una infografía
Una infografía MAY tener una variante `src/figures/<id>-wide.svg`; cuando exista, el capítulo SHALL
incrustar ambas y mostrar exactamente una: la apilada por debajo de 834 px y la ancha desde 834 px.
La variante comparte el presupuesto de tamaño de su figura y no tiene entrada, permalink ni
exportaciones propias.

#### Scenario: Valores y principios en dos columnas
- **WHEN** se abre `/bok/values-and-principles` a 1440 px
- **THEN** solo la variante de dos columnas es visible y a 390 px solo la apilada

### Requirement: Descargas del mapa desde su permalink
La página `/map` SHALL enlazar `/figures/discipline-map#downloads` para citar o descargar el mapa, en
lugar de un PNG versionado a mano; `/downloads/figures/*` SHALL servirse con caché pública de un día y
`/fonts/*` con `Access-Control-Allow-Origin: *` para que un SVG descargado cargue las fuentes.

#### Scenario: Descargar el mapa
- **WHEN** el lector sigue "Cite or download this map" en `/map`
- **THEN** llega a `/figures/discipline-map#downloads`, que lista al menos dos PNG que responden 200
  con `image/png`
