# chapter-key-terms Specification

## Purpose
Cada capítulo dice qué términos del glosario necesita el lector y lleva a su definición en un clic.

## Requirements

### Requirement: Términos clave por capítulo
Cada capítulo de `site/src/data/chapters.ts`, salvo el glosario, SHALL declarar en `keyTerms` entre
5 y 10 slugs del glosario, sin repetir. Un slug que no exista en el glosario MUST hacer fallar la
build de la página del capítulo.

#### Scenario: Slug inexistente
- **WHEN** un capítulo declara en `keyTerms` un slug que `bok/09-glossary.md` no define
- **THEN** la build de `/bok/<slug>` falla con un mensaje que nombra el capítulo y el slug

#### Scenario: El glosario no se lista a sí mismo
- **WHEN** se lee la entrada del capítulo 09 en `chapters.ts`
- **THEN** no tiene `keyTerms`

### Requirement: Fila «Key terms in this chapter»
La página del capítulo SHALL renderizar, bajo el bloque «At a glance» y antes del primer H2, una fila
«Key terms in this chapter» con un enlace `a.term` por término a `/glossary/<slug>`, en el orden de
`keyTerms`, con el `data-term` que usan las tarjetas emergentes. Un capítulo con términos y sin
«At a glance» MUST mostrar la fila sola.

#### Scenario: Capítulo con «At a glance»
- **WHEN** se abre `/bok/risk-management`
- **THEN** bajo «At a glance» aparece la fila con diez enlaces a `/glossary/<slug>`, antes del primer H2

#### Scenario: Prefacio
- **WHEN** se abre `/bok/preface`
- **THEN** aparece la fila de términos clave aunque el prefacio no tiene «At a glance»
