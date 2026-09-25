# Proposal

## Why

El Body of Knowledge define la disciplina y su pila de cinco capas, pero no define su objeto: qué
cuenta como sistema de IA a efectos de gobierno. Sin esa definición, la intake no puede decidir qué
entra en el registro, los tipos de IA (predictiva, generativa, RAG, agéntica) se gobiernan con el
mismo juego de controles y las características que rompen el gobierno clásico de TI (opacidad,
autonomía, salidas probabilísticas, deriva) quedan implícitas. Tampoco hay un puente entre los
conjuntos publicados de principios de IA responsable (OCDE, UNESCO, HLEG, G7) y los artefactos que
los evidencian. Para que la web sea la referencia de gobierno de IA en la v0.5.0, el capítulo 11
debe cerrar ese hueco con la voz de ingeniería de la casa.

## What Changes

- **Capítulo 11 `bok/11-ai-defined.md`** ("AI, defined for governance"), que sustituye al esqueleto:
  - las cuatro definiciones que fijan el alcance (OCDE 2023, AI Act art. 3(1) con las directrices de
    la Comisión, ISO/IEC 22989, NIST AI 100-1) comparadas elemento a elemento;
  - cada elemento convertido en campo del registro y en la decisión de alcance o control que activa,
    con una escala ilustrativa de autonomía y el registro de alcance de `csa-01`;
  - IA frente a software determinista convencional;
  - tipos de IA que cambian el problema de gobierno (capacidad, paradigma de aprendizaje, familias
    tecnológicas, predictiva frente a generativa, modelos fundacionales y GPAI, LLM frente a SLM,
    multimodal, RAG, agéntica) y el juego de controles por tipo;
  - tabla de ocho características (complejidad, opacidad, autonomía, velocidad y escala, salidas
    probabilísticas, dependencia de datos, doble uso, adaptatividad y deriva) con por qué falla el
    gobierno clásico, la capa y el patrón que responden y la evidencia que emiten, más pares de
    contraste;
  - gobierno de salidas probabilísticas (umbral como política, calibración, certeza por nivel de
    riesgo, no determinismo generativo);
  - "Responsible-AI principle sets, engineered": OCDE, UNESCO, HLEG/ALTAI y G7 Hiroshima cruzados
    con los 8 valores y 6 principios de la casa y con el artefacto que evidencia cada principio,
    sin redefinir el sentido de "principio" de la casa;
  - "What you can do this week", línea "Maps to" y 39 fuentes numeradas y verificadas.
- **`sources/SOURCES.md`**: nueva sección `bok/11-ai-defined.md` con las 39 filas.
- **Handoff** fuera del repo (`D:/Documents/aige-wt/handoffs/c11-ai-defined.json`) con el resumen,
  las ideas clave, términos de glosario, filas de obligaciones y crosswalk, figuras, patrones
  pendientes, enlaces cruzados y lecturas para los ficheros compartidos que este bloque no toca.
- Fuera de alcance: `site/src/data/*.ts`, `bok/09-glossary.md`, `bok/08-regulatory-map.md` y otros
  capítulos (se aplican vía handoff); figuras nuevas; patrones nuevos del capítulo 05.

## Capabilities

### New Capabilities
- `bok-ai-defined`: el capítulo 11 del Body of Knowledge y sus requisitos de contenido, fuentes y
  enlaces.

### Modified Capabilities
- Ninguna.

## Impact

- Contenido: `bok/11-ai-defined.md` (nuevo texto), `sources/SOURCES.md` (sección añadida).
- Build: sin cambios de código; el capítulo pasa por `astro check`, `content-lint` (sin raya larga)
  y `check-links` (todos los enlaces internos a rutas y anclas existentes).
- Ficheros compartidos (manifiesto de capítulos, glosario, mapa regulatorio, crosswalk): cambios
  propuestos solo en el handoff, para que los aplique el orquestador.
