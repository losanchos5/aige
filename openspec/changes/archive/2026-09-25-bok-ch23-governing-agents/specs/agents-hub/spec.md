# Spec Delta

## Purpose

La página `/agents` es la entrada del sitio para quien busca gobierno de agentes de IA: encuadra el
problema en pocas líneas y reparte al lector hacia el capítulo 23, los patrones, la tabla de controles
del capítulo 08, las categorías de herramientas y la tabla de amenazas.

## ADDED Requirements

### Requirement: Página /agents publicada y fechada
El sitio SHALL publicar `/agents` desde `site/src/pages/agents.astro` con un único H1, un título de
documento de 70 caracteres o menos y una meta descripción de entre 50 y 160 caracteres, y
`site/astro.config.ts` SHALL registrar la ruta en `SOURCE_BY_PATH` con la página, el capítulo 23 y los
datos que renderiza, para que el sitemap le dé un `lastmod` de git.

#### Scenario: Sitemap con fecha
- **WHEN** se construye el sitio
- **THEN** `/agents` aparece en el sitemap con un `lastmod` que procede de git y no de la fecha de
  build

### Requirement: Plano de control y enlaces al capítulo
La página SHALL listar los componentes del plano de control de agentes (registro, emisor de
identidad, pasarela de herramientas, guardrail, punto de control humano, circuit breaker, controles de
memoria, delegación, telemetría y almacén de evidencias), cada uno enlazado a su sección del capítulo
23, y SHALL enlazar a los patrones Agent Registry, Agent Identity & Scoped Credentials, Kill Switch /
Circuit Breaker, Human-in-the-loop Gate, Runtime Guardrail y Shadow-AI Discovery con sus anclas
`#pattern-*`. La página MUST NOT enlazar a rutas que no existan en la rama.

#### Scenario: Enlaces válidos
- **WHEN** se ejecuta check-links sobre `dist`
- **THEN** todos los enlaces internos de `/agents` resuelven, anclas incluidas

### Requirement: Tabla de amenazas y referencias cruzadas
La página SHALL mostrar una tabla con las diez entradas ASI01 a ASI10 del OWASP Top 10 for Agentic
Applications 2026, el control que las contiene y el patrón que lo implementa, SHALL enlazar a las
filas de controles de agentes del capítulo 08 y a las categorías de herramientas de
`/resources/tools`, y SHALL declarar que los mapeos son ilustrativos y no una afirmación de
conformidad, con fecha «as of 2026-09-24». El texto MUST NOT contener el carácter raya larga
(U+2014).

#### Scenario: Diez amenazas
- **WHEN** un lector abre la tabla de amenazas de `/agents`
- **THEN** ve diez filas, de ASI01 a ASI10, cada una con su control y un enlace a un patrón existente
