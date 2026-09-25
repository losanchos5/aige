# Proposal

## Why

El capítulo 08 del Body of Knowledge es el índice inverso de obligaciones (obligación → artefacto →
capa), pero el sitio no explica el AI Act de la UE de principio a fin: alcance, definición de
sistema de IA, escalera de riesgo, roles de la cadena de valor, deberes del desplegador, FRIA,
gobernanza y calendario tras el Digital Omnibus (Reglamento (UE) 2026/1744). Para la v0.5.0 el
capítulo 18 es un stub. Un lector que llega sin conocer la ley no puede usar el índice inverso, y
no existe un conjunto de datos con los roles de la cadena de valor comparados entre regímenes (UE,
Colorado, Texas, Corea, ISO/IEC 22989), aunque los roles nombran tareas y no organizaciones.

## What Changes

- `bok/18-eu-ai-act.md`: capítulo docente completo que sustituye al stub, con H1 «18. The EU AI Act
  in one pass» y lede de una frase. Cubre: qué cambió el Omnibus; alcance, alcance extraterritorial,
  definición de sistema de IA (guías de la Comisión) y exclusiones; la escalera de riesgo con la
  lista completa del art. 5 (incluidas las prohibiciones del Omnibus y su fecha), las vías del
  art. 6(1) y del anexo III (ocho áreas), el filtro del art. 6(3) y la excepción de perfilado, los
  casos del art. 50 y el riesgo mínimo; modelos GPAI (arts. 51 a 56, umbral de riesgo sistémico,
  notificación, exenciones de código abierto y sus límites, modificadores, Código de Buenas
  Prácticas); requisitos de alto riesgo (arts. 8 a 15) en una tabla requisito → artefacto → capa;
  QMS (art. 17), evaluación de la conformidad, vigilancia poscomercialización (art. 72) e
  incidentes (art. 73); roles de la cadena de valor y disparadores del art. 25; tabla de roles entre
  regímenes; deberes del desplegador (art. 26) desglosados; FRIA (art. 27); derecho a explicación
  (art. 86); alfabetización (art. 4) y datos para sesgo (art. 4a); sandboxes y pruebas en
  condiciones reales (arts. 57 a 61); gobernanza y sanciones (AI Office, Board, autoridades, arts.
  75a a 75d, 99, 101); calendario posterior al Omnibus; «What you can do this week»; «Maps to» y
  fuentes numeradas verificadas contra EUR-Lex (ELI).
- `site/src/data/roles.ts`: nuevo conjunto de datos tipado de la tabla de roles entre regímenes (id,
  régimen, rol, definición propia, referencia de fuente, resumen de deberes, rol UE más cercano,
  disparadores para convertirse en proveedor, ancla del capítulo, marca de verificación).
- Traspaso fuera del repo (`D:/Documents/aige-wt/handoffs/c18-eu-ai-act.json`) con lo que el
  orquestador debe aplicar en ficheros compartidos (resumen y glance del capítulo, glosario,
  obligaciones, crosswalk, enlaces cruzados, filas de `sources/SOURCES.md`, notas para el cap. 08).
- Fuera de alcance: editar `bok/08-regulatory-map.md`, `bok/09-glossary.md`,
  `site/src/data/chapters.ts`, `frameworks.ts`, `crosswalk.ts`, `nav.ts` u otros capítulos; figuras;
  herramienta de triaje de roles.

## Capabilities

### New Capabilities
- `bok-eu-ai-act`: capítulo 18 del Body of Knowledge que explica el AI Act enmendado por el Omnibus
  con cada deber ligado a su artefacto, capa y fuente primaria.
- `value-chain-roles`: conjunto de datos tipado de roles de la cadena de valor entre regímenes.

### Modified Capabilities
<!-- Ninguna. -->

## Impact

- Contenido: `bok/18-eu-ai-act.md` (nuevo contenido; H1 sin cambios).
- Sitio: `site/src/data/roles.ts` (nuevo; sin consumidores todavía).
- Sin cambios en esquemas, dependencias, CSP ni en ficheros compartidos; los cambios en ficheros
  compartidos van en el traspaso para el orquestador.
- Fechas sensibles selladas «as of 2026-09-24»; las afirmaciones no confirmadas llevan «(verify)».
