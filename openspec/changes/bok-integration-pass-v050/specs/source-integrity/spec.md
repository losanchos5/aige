# Spec Delta

## Purpose

Un instrumento sustituido no se presenta como vigente: el libro cita el sucesor y, si el nombre
antiguo designa una tradición conocida, dice los dos.

## ADDED Requirements

### Requirement: Referencias sustituidas
Cuando una guía, norma o edición citada ha sido sustituida, el texto SHALL citar la vigente con su
fecha y fuente, y MAY conservar el nombre antiguo solo como etiqueta de una tradición. A 2026-09-24
esto cubre SR 11-7 (sustituida por SR 26-2 el 17 de abril de 2026), ISO Guide 73:2009 (retirada en
favor de ISO 31073:2022), ISO 9001:2015 (sustituida por ISO 9001:2026) e ISO/IEC 27701:2019
(sustituida por ISO/IEC 27701:2025). `STYLEGUIDE.md` MUST recoger la regla.

#### Scenario: SR 11-7 en la desambiguación
- **WHEN** el capítulo 01 contrasta la disciplina con la gestión del riesgo de modelos
- **THEN** conserva la etiqueta «Model risk management (SR 11-7 style)» y dice, con fuente primaria
  de la Reserva Federal, que SR 26-2 sustituyó a SR 11-7 el 17 de abril de 2026 y deja fuera de su
  alcance los modelos de IA generativa y agéntica

#### Scenario: Guía de estilo
- **WHEN** un autor lee la sección 10 de `STYLEGUIDE.md`
- **THEN** la gestión del riesgo de modelos figura como «the SR 11-7 tradition» con la mención de
  SR 26-2, y la sección 7 lista las referencias sustituidas
