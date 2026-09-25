# Spec Delta

## Purpose

Los capítulos que describen una práctica cierran con lo que el lector puede hacer ya, como los
capítulos 11 a 23.

## ADDED Requirements

### Requirement: «What you can do this week» en los capítulos 04 a 08
Los capítulos 04, 05, 06, 07 y 08 SHALL cerrar, antes de `## Sources`, con un H2 «What you can do this
week» de tres a cinco acciones numeradas, cada una con un arranque en negrita, concretas y coherentes
con el capítulo. Los recuadros de 05 y 08 MUST insertarse después de fusionar los bloques que editan
esos capítulos en esta oleada, con el texto que entrega el handoff.

#### Scenario: Capítulo 04
- **WHEN** se abre `/bok/the-stack`
- **THEN** la última sección antes de las fuentes es «What you can do this week» con cinco acciones

#### Scenario: Capítulos 05 y 08 tras la integración
- **WHEN** el integrador fusiona los bloques de patrones y de obligaciones
- **THEN** inserta los recuadros de 05 y 08 del handoff `w2-cross-links.json` antes de `## Sources`
