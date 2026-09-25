# Spec Delta

## Purpose

La página `/resources/contracts` publica la lista de comprobación de cláusulas de contratos y
licencias de IA del capítulo 15 como tablas accesibles, desde un módulo de datos tipado.

## ADDED Requirements

### Requirement: Datos tipados de cláusulas y licencias
El módulo `site/src/data/contracts.ts` SHALL exportar `clauses` (una fila por cláusula con `id`,
`clause`, `governs`, `risk`, `redFlag`, `fallback`, `evidence` y `mapsTo`), `licenceTypes` (familias
de licencia con obligaciones, riesgos y campos AIBOM) y `references` (etiqueta y URL https por id).
Cada id de `mapsTo` MUST existir en `references`, lo que comprueba el compilador de TypeScript. Las
señales de alerta MUST ser patrones parafraseados, nunca citas de contratos reales.

#### Scenario: Un id de referencia inexistente
- **WHEN** una fila de `clauses` usa en `mapsTo` un id que no está en `references`
- **THEN** `astro check` falla con un error de tipo

### Requirement: Página de recursos accesible
El sitio SHALL publicar `/resources/contracts` con el layout `Base`, el `PageHero` de recursos con
migas "Resources › Contracts", un aviso que diga que es una lista de comprobación de ingeniería y no
asesoramiento legal, y dos tablas semánticas (cláusulas y familias de licencia) con `caption`,
cabeceras `th scope="col"`, la primera celda de cada fila como `th scope="row"` y un `id` estable por
fila. Por debajo de 720 px las filas SHALL mostrarse como tarjetas apiladas con etiqueta por celda,
sin scroll horizontal de la página. La ruta MUST figurar en `SOURCE_BY_PATH` de `astro.config.ts`
para que el sitemap lleve un `lastmod` fechado.

#### Scenario: Enlace directo a una cláusula
- **WHEN** se abre `/resources/contracts#clause-change-deprecation`
- **THEN** el navegador se sitúa en la fila de la cláusula de aviso de cambios y retirada

#### Scenario: Título y descripción dentro de presupuesto
- **WHEN** se renderiza la página
- **THEN** el título completo mide como máximo 70 caracteres y la meta descripción entre 50 y 160
