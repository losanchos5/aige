---
lang: es
source: bok/00-preface.md
sourceHash: "597a86da43989641cc3dbd772fc7bad71dee72e7408f4a33f88a9f7c6c54188f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 00. Prefacio

> Por qué existe este libro, para quién es y cómo usarlo.

## Por qué existe

Existe un manifiesto para la ingeniería de GRC. Existe un manifiesto para el software ágil. Existe
un catálogo de patrones para la IA responsable y una guía de doce factores para aplicaciones en la
nube. No existe nada que te diga cómo *ingenierizar* la gobernanza de sistemas de IA: cómo convertir
una obligación del Reglamento de IA o un control de ISO 42001 en política como código, una eval
gate, un registro de agentes y evidencia legible por máquina que un auditor pueda leer. Este libro
es el primer intento de documentarlo.

Existe porque la brecha ahora es cara. Lo que se gobierna (modelos que se reentrena, prompts que
cambian, agentes que actúan por su cuenta) se mueve más rápido que cualquier documento puede seguir.
La gobernanza escrita como PDFs y hojas de cálculo está obsoleta antes de ser firmada. La disciplina
que cierra la brecha es la ingeniería, aplicada a la gobernanza. Este libro es su texto fundacional
y su referencia de trabajo.

## Quién lo escribió y de qué

El Body of Knowledge fue escrito por Jorge García Aibar, ingeniero de gobernanza de IA y privacidad,
basándose en dos años y medio diseñando y operando un marco de gobernanza de IA dentro de una gran
telco, situado entre Legal, Seguridad e Ingeniería, y cubriendo las dimensiones de gobernanza,
seguridad, cumplimiento, negocio y rendimiento de modelos del riesgo de IA. La Tesis es la única
parte coautorizada del proyecto, escrita por Jorge García Aibar y Aurélie Pols, que trabaja en IA
Responsable, Privacidad y Gobernanza de Datos. Nada en este libro divulga detalles internos de
ningún empleador; donde se describe la práctica es genérica ("en una gran telco").

Se construye a partir de tres cosas. Primero, esa experiencia operativa: qué realmente funcionó
cuando un modelo cambió un viernes y un agente ganó una nueva herramienta durante el fin de semana.
Segundo, el precedente de **GRC Engineering**: la comunidad, manifiesto y cuerpo de práctica que,
desde aproximadamente 2024, ha convertido la gobernanza, riesgo y cumplimiento en un producto
construido con código [1][2]. Tercero, el registro público: el Reglamento de IA de la UE y su
reforma Omnibus Digital, ISO/IEC 42001, el NIST AI RMF, el trabajo GenAI y Agentic de OWASP, CSA, el
Catálogo de Patrones de IA Responsable de CSIRO, y los propios marcos de seguridad de los
laboratorios fronterizos. Cada afirmación de hecho en el libro lleva una cita verificada y con
fuente.

## Quién debería leer esto

- **Líderes de gobernanza de IA** que quieren dejar de enviar documentos y empezar a enviar
  controles. El capítulo 12 configura
  [el programa de gobernanza](/bok/governance-program#the-organisation-as-an-object-of-governance)
  que da a cada control un propietario.
- **Ingenieros de seguridad e ingenieros de seguridad de IA** que extienden sus modelos de amenaza a
  modelos y agentes. Comienza con
  [la capa 04 del stack](/bok/the-stack#layer-04-runtime-controls--observability) y
  [gobernanza de agentes de IA](/bok/governing-agents#what-makes-an-agent-a-governance-object).
- **Ingenieros de privacidad y DPOs** que quieren que FRIA y DPIA vivan como código, no como PDFs
  puntuales. El capítulo 19 aplica
  [la ley de protección de datos a la IA](/bok/privacy-and-ai#principles-applied-to-ai), y el
  capítulo 18 cubre [FRIA](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27).
- **Ingenieros de MLOps y plataforma** a los que se les pide que hagan de la gobernanza una
  propiedad del pipeline. Los capítulos 14 y 15 ejecutan
  [la compilación como una cadena de gates](/bok/governing-development#the-build-as-a-chain-of-gates)
  y
  [el ciclo de vida del despliegue](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance).
- **Líderes de riesgo y CISOs** que poseen la vista empresarial del riesgo de IA. El capítulo 13
  compila
  [el apetito de riesgo y la tolerancia en gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates),
  y el capítulo 17 ejecuta
  [el ciclo de vida de respuesta a incidentes](/bok/incidents#the-response-lifecycle).
- **Ejecutivos y miembros de la junta** que necesitan saber si la gobernanza funciona. El capítulo
  12 nombra
  [los KPIs y KRIs que llegan a la junta](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
- **Abogados y profesionales de cumplimiento que quieren construir**, para ver la obligación
  convertida en un control ejecutable y evidencia legible, y para ayudar a especificarlo. La última
  parte lee [el Reglamento de IA de la UE](/bok/eu-ai-act#how-to-read-this-chapter),
  [la ley que ya se aplica](/bok/existing-law#how-to-read-this-chapter) y
  [leyes de IA alrededor del mundo](/bok/ai-laws-worldwide#the-landscape-at-a-glance) como
  artefactos para construir.
- **Equipos del sector público**, para los que varias jurisdicciones ya publican instrumentos
  dedicados. El capítulo 21 cubre
  [los registros del sector público del Reino Unido](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records)
  y
  [la Directiva de Canadá sobre Toma de Decisiones Automatizada](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making).
- **Organizaciones pequeñas y startups**, que tienen los mismos deberes con menos personas. El
  capítulo 04 construye
  [el stack mínimo viable para un equipo de uno](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one).

No necesitas escribir código de producción para usar este libro, pero deberías estar cómodo cerca de
un pipeline. La disciplina es una capacidad que cualquiera cercano a la compilación puede
desarrollar, sea cual sea el título: un ingeniero de gobernanza de IA se define por los flujos de
trabajo que posee, no por el nombre del rol.

El sitio web añade [una página de destino por audiencia](/for) ([ingenieros](/for/engineers),
[CISOs y líderes de riesgo](/for/ciso-risk), [asesor legal y DPOs](/for/legal-dpo),
[ejecutivos y juntas](/for/executives-board), [el sector público](/for/public-sector) y
[PYMEs](/for/smes)) que pone los capítulos, patrones, plantillas y herramientas en el orden que ese
trabajo los necesita.

## Cómo usar este libro

El Body of Knowledge tiene 24 capítulos en cinco partes. Lee la primera parte en orden: establece el
vocabulario que usa cada otro capítulo. Después de eso, lee por parte, o sigue la pregunta que
tienes delante.

1. **[La disciplina](/bok#part-discipline)** (capítulos 00–07): la definición, por qué la disciplina
   se está formando ahora, sus valores y principios, el stack de cinco capas, el catálogo de
   patrones, el rol y el modelo de madurez.
2. **[Referencia](/bok#part-reference)** (08–10): el mapa regulatorio que convierte cada obligación
   en un artefacto y una capa, el glosario y la lista de lectura. La mayoría de capítulos apuntan a
   estos.
3. **[Fundamentos](/bok#part-foundations)** (11–13): qué cuenta como un sistema de IA, el programa
   de gobernanza que da a cada control un propietario, y el bucle de riesgo que dice a cada control
   cuán fuerte debe ser.
4. **[El ciclo de vida](/bok#part-lifecycle)** (14–17 y 23): desarrollo, despliegue, equidad y
   explicabilidad, incidentes y agentes, cada etapa dejando un registro que una gate lee.
5. **[Ley y estándares](/bok#part-law)** (18–22): el Reglamento de IA de la UE, protección de datos,
   la otra ley que ya se aplica, leyes de IA alrededor del mundo, y los principios y estándares.

La mayoría de capítulos abren con un resumen "De un vistazo" y una lista de términos clave, cada uno
vinculado a su página de glosario, y terminan con "Qué puedes hacer esta semana". Los capítulos se
vinculan entre sí por sección, para que un tema pueda seguirse a través de partes. En el sitio web,
los patrones, plantillas, registro de obligaciones y kit de herramientas llevan el mismo material en
una forma que puedes copiar en un pipeline.

## Qué esto no es

Esto no es una lista de verificación de cumplimiento, y no es asesoramiento legal. No te dice si tu
sistema es conforme; te dice cómo construir los controles y la evidencia que permiten a alguien
calificado hacer esa llamada. No es una agenda de investigación de seguridad de IA, un manual de
MLOps, o una guía de compra de proveedores; las herramientas se nombran solo como ejemplos
ilustrativos de una categoría, nunca como respaldos. Y no está terminado. La versión 0.5.0 es un
borrador público con brechas deliberadas abiertas a contribuciones.

## Cómo citar

> García Aibar, J. *AI Governance Engineering: The Body of Knowledge*, v0.5.0. 2026.
> https://aigovernanceengineer.com/bok. Licensed CC BY 4.0.

Para la Tesis, cita a ambos coautores:

> García Aibar, J., & Pols, A. *The AI Governance Engineering Thesis*, v0.5.0. 2026.
> https://aigovernanceengineer.com/thesis. Licensed CC BY 4.0.

Cita un capítulo específico por su número y título (por ejemplo, "capítulo 01, La definición"). El
hogar canónico de la Tesis es https://aigovernanceengineer.com/thesis y del Body of Knowledge
https://aigovernanceengineer.com/bok. Cada capítulo lleva su propia lista de fuentes numeradas; la
tabla consolidada vive en `sources/SOURCES.md`.

## Versionado

Esta es **v0.5.0**, un borrador público. El versionado es semántico en espíritu: los lanzamientos de
parche corrigen hechos y erratas, los lanzamientos menores añaden capítulos o patrones, y un 1.0
marcará el punto en el que los capítulos principales (00–10) estén completos y revisados. Cada
cambio se registra en `bok/CHANGELOG.md`. Porque el panorama regulatorio y de estándares se mueve
(la reforma Omnibus Digital, estándares armonizados bajo JTC 21, los lanzamientos de OWASP y CSA),
los capítulos llevan una fecha "actual a partir de" y se espera que sean revisados.

## Cómo contribuir

Este libro acoge contribuciones acreditadas. Para contribuir:

1. Lee `STYLEGUIDE.md` y sigue exactamente la plantilla de capítulo o patrón.
2. Obtén fuente para cada afirmación de hecho. Usa el formato de cita `[n]`, etiqueta cada fuente
   `primary`, `secondary` o `reported`, y añade la fila a `sources/SOURCES.md` bajo la sección de tu
   capítulo.
3. Abre una solicitud de extracción. Para firmar la Tesis, añade tu nombre a `bok/CONTRIBUTORS.md`.

Las reglas existen para que muchas manos produzcan un libro coherente. Todo lo demás (los
argumentos, los patrones, los mapeos) está abierto para que lo mejores.

**Correspondencias:** este prefacio no hace ninguna afirmación normativa; los estándares que nombra
se tratan en su totalidad en los capítulos 04, 05, 08, 18 y 22.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
