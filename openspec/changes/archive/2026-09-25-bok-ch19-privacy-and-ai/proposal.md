# Proposal

## Why

El Body of Knowledge trata la protección de datos solo de pasada: el capítulo 04 dice que cada
dataset lleva una base jurídica y una retención, el 08 recoge el Art. 4a del AI Act y los Arts.
22A–22D del Reino Unido, y el glosario define la DPIA. Falta el capítulo que explique cómo el RGPD
(y sus equivalentes en Reino Unido, EE. UU., Brasil y China) se aplica al entrenamiento, la
inferencia, los derechos de los interesados y las brechas de un sistema de IA, y que traduzca cada
deber a un artefacto, una capa del stack y un registro de evidencia. El capítulo 19 existe como
esqueleto desde el commit que creó los capítulos 11–23 para la v0.5.0.

## What Changes

- `bok/19-privacy-and-ai.md` pasa de esqueleto a capítulo completo (unas 5.400 palabras de prosa
  más tablas), manteniendo el H1 `# 19. Privacy and data protection law applied to AI` y con un
  blockquote de apertura de una frase.
- Secciones H2 con anclas estables: principios aplicados a la IA (base jurídica por fase, interés
  legítimo y test en tres pasos, límites del consentimiento, transparencia, limitación de la
  finalidad); minimización, privacidad desde el diseño y PETs (anonimización frente a
  seudonimización, sentencia EDPS v SRB, límites honestos de cada PET); deberes del responsable
  (roles en la cadena de suministro, cláusulas de no entrenamiento, DPIA para IA, registro de
  actividades, transferencias e inferencia remota); decisiones automatizadas (Art. 22 tras SCHUFA y
  Dun & Bradstreet, tabla comparada con Reino Unido, CCPA/ADMT, leyes estatales, LGPD, PIPL y Art.
  86 del AI Act); derechos frente a modelos entrenados (supresión, reentrenamiento, desaprendizaje y
  registro de cumplimiento); si un modelo contiene datos personales (Opinión 28/2024 del EDPB,
  documento de Hamburgo, tres escenarios de entrenamiento ilícito); categorías especiales, datos
  inferidos, biometría, datos de salud del consumidor y datos neuronales; brechas específicas de IA
  y notificación en 72 horas; la parte RGPD del Digital Omnibus con su estado a 2026-09-24;
  contrastes fuera de la UE; mapa obligación → artefacto → capa; y "What you can do this week".
- Callouts `**In practice (illustrative)**` y `**Example (illustrative)**` con extractos JSON
  ilustrativos (registro de base jurídica, registro de decisión, registro de cumplimiento de una
  solicitud, resultado de un eval de privacidad).
- 54 fuentes numeradas en `## Sources` con el formato del capítulo 08 (51 `primary`, 2 `secondary`,
  1 `reported`); lo no confirmado lleva "(verify)" en la prosa.
- Cambios en ficheros compartidos (resumen del capítulo en `chapters.ts`, glosario, filas de
  obligaciones, crosswalk con columna RGPD, lista de lecturas, filas de `sources/SOURCES.md`) se
  entregan en el handoff `D:/Documents/aige-wt/handoffs/c19-privacy-and-ai.json`, no en este cambio.

## Capabilities

### New Capabilities
- `bok-privacy-and-ai`: capítulo 19 del Body of Knowledge sobre protección de datos aplicada a la
  IA, con cada deber traducido a artefacto, capa y registro de evidencia, fuentes verificadas y
  estado fechado de las normas en movimiento.

### Modified Capabilities
<!-- Ninguna. -->

## Impact

- Contenido: solo `bok/19-privacy-and-ai.md` y este directorio de OpenSpec.
- Sitio: la ruta `/bok/privacy-and-ai` ya existe (esqueleto); el build la regenera. Enlaces internos
  solo a rutas y anclas existentes (capítulos 04, 05 y 08).
- Sin cambios en código, datos del sitio, dependencias, CSP ni THESIS.
- Coordinación: los capítulos 17 (incidentes), 18 (AI Act) y 20 (otras leyes) se escriben en
  paralelo; el handoff propone los enlaces cruzados hacia este capítulo.
