# Spec Delta

## MODIFIED Requirements

### Requirement: Capítulos por partes en la portada
La sección de capítulos de la portada SHALL mostrar las cinco partes como un índice: cada parte con su número mono, su título, su rango y una fila por capítulo (número y título corto) separada por una línea fina. El título de la sección SHALL calcular el número de capítulos desde los datos. La sección SHALL destacar las partes Foundations, The lifecycle y Law and standards en su entradilla, y MUST NOT alterar el hero.

#### Scenario: Todos los capítulos enlazados
- **WHEN** se carga `/`
- **THEN** la sección de capítulos contiene un grupo por parte y un enlace por cada capítulo de `chapters.ts`

#### Scenario: Rango calculado
- **WHEN** se carga `/`
- **THEN** cada grupo muestra el rango de capítulos de su parte tal como lo calculan los datos
