# Proposal

## Why

El Body of Knowledge solo trata los incidentes de IA en el umbral más alto: el patrón Incident
Pipeline (`bok/05-patterns.md`) y la tabla de plazos del Art. 73 del capítulo 08. Falta todo lo que
queda por debajo y alrededor: qué es un incidente frente a un peligro (hazard) o una incidencia
(issue), cómo se gradúa la severidad, cómo se responde, quién decide qué, cómo se busca la causa raíz,
cómo vuelve la causa al registro de riesgos y a los evals, qué debe hacer un deployer y, sobre todo,
qué pasa cuando un mismo evento arranca varios relojes de notificación (AI Act, GDPR, NIS2, DORA, CRA,
leyes estatales de EE. UU.). El capítulo 17, hoy un esqueleto, es el sitio previsto para cerrarlo en
la release v0.5.0.

## What Changes

- `bok/17-incidents.md` pasa de esqueleto a capítulo completo (unas 7.000 palabras con tablas),
  manteniendo el H1 «17. Incidents, issues and root causes» y una entradilla de dos líneas.
- Definiciones: AI incident y AI hazard de la OCDE, serious incident (`Art. 3(49)`) y widespread
  infringement (`Art. 3(61)`) del AI Act, más dos definiciones de la casa (issue y near miss) con una
  tabla comparativa; separación explícita entre severidad y notificabilidad.
- Escala de severidad SEV-1 a SEV-4 más «Issue», mapeada a las clases del Art. 73, a los valores de
  severidad del marco común de la OCDE y a una respuesta por defecto; la escala se expresa como
  política ejecutable.
- Ciclo de respuesta (detectar, clasificar, contener, erradicar, recuperar, revisión posterior)
  alineado con NIST SP 800-61r3 y CSF 2.0, con el paso «freeze before you fix» que exige el
  `Art. 73(6)`.
- Playbook de ejemplo, matriz RACI y simulacros (tabletop) tratados como los simulacros del kill
  switch, con MTTD, MTTC y MTTR.
- Tabla de modos de fallo propios de la IA (brittleness, falta de robustez, datos pobres, drift,
  prompt injection, tool misuse, alucinación con daño, fallos en cascada, agentes fuera de alcance).
- Análisis de causa raíz: junta de revisión, cinco porqués, árbol de fallos (IEC 61025), post-mortem
  sin culpa y una taxonomía de causas que apunta a la capa y al patrón que debió detectarla; relación
  con los campos de causa de la plantilla GPAI, NIS2 y la agregación de incidentes recurrentes de
  DORA.
- CAPA con enlace bidireccional incidente–riesgo y regresión en el eval gate.
- Deberes del deployer del `Art. 26(5)`: informar al proveedor, suspender el uso, heredar el reloj
  del `Art. 73` si el proveedor no responde.
- Tabla única de relojes superpuestos (AI Act Art. 73, Art. 26(5), Art. 55(1)(c) con el Compromiso 9
  del Código de Buenas Prácticas, GDPR Arts. 33 y 34, NIS2 Art. 23, DORA Art. 19 con el RTS
  2025/301, CRA Art. 14, California SB 53, RAISE Act de Nueva York y marco común de la OCDE), con
  lectura de disparadores, deferencias entre regímenes y fechas en movimiento a 2026-09-24.
- Esquema del registro de incidente alineado por nombre con los diez campos de la plantilla de la
  Comisión (4 nov 2025) y con los 29 criterios de la OCDE; salida como `POA&M` de OSCAL.
- Bases de datos públicas (AIID, OECD AIM, AIAAIC, MIT AI Risk Repository): cómo usarlas y sus
  límites.
- Cierre «What you can do this week», línea «Maps to» y 33 fuentes numeradas con tag de verificación.
- Fuera de alcance: ficheros compartidos (`chapters.ts`, glosario, capítulo 08, `crosswalk.ts`,
  `frameworks.ts`, `sources/SOURCES.md`), cuyos cambios se entregan en el handoff del orquestador.

## Capabilities

### New Capabilities
- `bok-incidents`: el capítulo 17 del Body of Knowledge sobre gestión de incidentes de IA de
  extremo a extremo, con su escala de severidad, ciclo de respuesta, análisis de causa raíz, CAPA,
  deberes del deployer, tabla de relojes superpuestos y esquema de registro.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: solo `bok/17-incidents.md`. Enlaza a anclas existentes de los capítulos 04, 05, 08
  y 10 y a las rutas de los capítulos 13 y 15 (sin anclas internas, porque se escriben en paralelo).
- **Ficheros compartidos**: ninguno se modifica aquí. El resumen, el «at a glance», los términos de
  glosario, las filas de obligaciones y de crosswalk, las filas de `sources/SOURCES.md`, los enlaces
  cruzados y una corrección detectada en la tabla del Art. 73 del capítulo 08 van en
  `D:/Documents/aige-wt/handoffs/c17-incidents.json`.
- **Build**: `astro check`, `astro build`, content-lint (sin rayas largas) y check-links deben pasar.
- Sin dependencias nuevas ni cambios de código del sitio.
