# Spec Delta

## ADDED Requirements

### Requirement: Columna AI Verify Testing Framework
El crosswalk SHALL tener una columna `aiverify` con el instrumento `sg-ai-verify` (AI Verify
Testing Framework, IMDA y AI Verify Foundation, versión para IA tradicional y generativa actualizada
el 29 de mayo de 2025), registrado en `frameworks.ts`. Una celda MUST llenarse solo cuando uno de
los crosswalks oficiales de 2025 (perfil de IA generativa del NIST, Código de Conducta del Proceso de
Hiroshima, ISO/IEC 42001) cita el identificador de comprobación; el crosswalk NIST AI RMF de 2023 usa
la numeración anterior a 2025 y MUST NOT citarse por identificador. Cada referencia MUST llevar una
nota que nombre el crosswalk oficial y la fila que la sostiene, y los cuatro crosswalks SHALL
figurar en `sources/SOURCES.md`.

#### Scenario: Tema sin respaldo
- **WHEN** ningún crosswalk oficial de 2025 cita una comprobación de AI Verify para un tema
  (identidad de agentes, sandboxes, evaluación de la conformidad, prácticas prohibidas)
- **THEN** la celda de la columna AI Verify de ese tema queda vacía

#### Scenario: Fuente de cada ficha
- **WHEN** el lector abre una ficha de la columna AI Verify
- **THEN** ve el principio, el número de comprobación y una nota con la fila del crosswalk oficial
