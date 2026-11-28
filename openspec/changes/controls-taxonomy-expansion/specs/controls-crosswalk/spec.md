# Spec Delta

## ADDED Requirements

### Requirement: Tablas de referencia completas con fuente y fecha
Las tablas de referencia a las que mapean los controles SHALL estar completas para estos marcos:
ISO/IEC 42001:2023 Anexo A (los 38 controles de A.2 a A.10), el Código de buenas prácticas de IA de
uso general de la UE (sus 40 medidas, agrupadas en Transparencia, Derechos de autor y Seguridad y
protección) y CSA AI Controls Matrix v1.1 (los ids de control y sus 18 dominios). Cada fila MUST
llevar el id oficial, un título corto redactado por el sitio, la URL de la fuente y, cuando se haya
leído en la fuente primaria, la fecha de verificación. Una fila que no se haya podido leer en la
fuente primaria SHALL publicarse sin fecha de verificación y mostrarse como "no verificada en la
fuente primaria". El sitio MUST NOT reproducir el texto literal de una norma de pago.

#### Scenario: Anexo A completo
- **WHEN** se valida la tabla de ISO/IEC 42001 Anexo A
- **THEN** tiene 38 filas repartidas en 9 áreas con los recuentos 3, 2, 5, 4, 9, 5, 4, 3 y 3

#### Scenario: Medidas del Código GPAI
- **WHEN** se valida la tabla del Código GPAI
- **THEN** tiene 40 medidas, cada una con su capítulo, su compromiso y la URL del texto oficial

#### Scenario: Fila no verificada
- **WHEN** una fila no tiene fecha de verificación
- **THEN** el crosswalk y el JSON la marcan como no verificada en la fuente primaria

#### Scenario: Mapeo a una fila inexistente
- **WHEN** un control mapea a un id que no está en su tabla de referencia
- **THEN** el build falla y nombra el control y el id

### Requirement: Columnas del Código GPAI y de CSA AICM
El crosswalk de controles SHALL admitir el Código GPAI y CSA AICM como marcos propios, con las
mismas vistas, avisos y exportaciones que los marcos ya presentes. Como en los demás marcos, una
fila aparece cuando al menos un control mapea a ella; un marco sin ningún control mapeado no se
muestra. La exportación legible por máquina SHALL incluir, por cada fila de marco, la URL de la
fuente y la fecha de verificación cuando exista.

#### Scenario: Marco nuevo con controles mapeados
- **WHEN** al menos un control mapea a una medida del Código GPAI o a un id de CSA AICM
- **THEN** la página y la exportación del crosswalk contienen ese marco, y cada fila lleva su URL de
  fuente y su fecha de verificación

#### Scenario: Marco nuevo sin controles
- **WHEN** ningún control mapea al Código GPAI o a CSA AICM
- **THEN** ese marco no aparece en el crosswalk y el build no falla
