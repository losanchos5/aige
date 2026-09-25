---
lang: es
source: bok/21-ai-laws-worldwide.md
sourceHash: "191fdd18bca59f606083a61658b834845a9e9def3e8488c400b329303f5e4f2a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 21. Leyes específicas de IA en todo el mundo

> Fuera de la UE, la ley específica de IA va desde la Basic Act horizontal de Corea hasta estatutos
> estatales estadounidenses, directivas del sector público y marcos voluntarios; este capítulo data
> cada régimen y nombra el artefacto que evidencia cada deber.

## Cómo leer este capítulo

Este capítulo es una guía de campo para las reglas específicas de IA que se sientan junto al
Reglamento de IA de la UE. Está escrito para el ingeniero que tiene que hacer que un conjunto de
controles responda a varios regímenes a la vez, no para el abogado que tiene que opinar sobre
cualquiera de ellos. El capítulo 18 trata el
[Reglamento de IA de la UE](/bok/eu-ai-act#how-to-read-this-chapter) en profundidad; el capítulo 19
cubre privacidad y protección de datos, incluyendo
[los regímenes más allá de la UE](/bok/privacy-and-ai#beyond-the-eu-uk-us-brazil-and-china); el
capítulo 20 cubre
[la otra ley que ya se aplica a la IA](/bok/existing-law#how-to-read-this-chapter); el capítulo 22
cubre
[principios, soft law y estándares](/bok/principles-and-standards#the-instruments-at-a-glance),
incluyendo los tratados internacionales. El capítulo 08 sigue siendo el
[índice inverso](/bok/regulatory-map#other-jurisdictions) que convierte cada obligación en un
artefacto y una capa.

Cada entrada a continuación sigue la misma plantilla: **estado**, **fechas**, **alcance**,
**deberes clave**, **cumplimiento** y los **artefactos que evidencian el cumplimiento**. Cada estado
está marcado **a partir del 2026-09-24**. Donde una regla aún se estaba moviendo en esa fecha, o un
hecho no pudo ser confirmado contra una fuente primaria, la copia lo dice y lleva una etiqueta
`(verify)`. Las traducciones de términos coreanos, japoneses, chinos, italianos, españoles y
portugueses son nuestras a menos que una fuente dé una oficial.

El vocabulario de estado tiene cuatro valores, los mismos cuatro que usa el conjunto de datos de
jurisdicción del sitio:

- **Vinculante, horizontal.** Un estatuto en vigor que se aplica en todos los sectores (Corea,
  Italia, la ley de promoción de Japón).
- **Vinculante, dirigido.** Reglas vinculantes limitadas a un uso, un sector, una clase de
  desarrollador o el sector público (los estados estadounidenses, las agencias federales
  estadounidenses, las reglas departamentales de China, la directiva de Canadá).
- **Voluntaria.** Marcos, orientaciones y principios sin penalización asociada (Singapur, el enfoque
  específico de IA del Reino Unido, India, Australia).
- **Proyecto de ley.** Aún no es ley (Brasil, proyecto de ley nacional de IA de España).

La lectura de ingeniería es la que el capítulo 06 llama
[traducción regulatoria](/bok/the-role#regulatory-translation): la mayoría de estos regímenes piden
el mismo pequeño conjunto de artefactos (un inventario, una decisión de clasificación, un aviso, una
etiqueta, una evaluación de riesgos, un informe de incidente, un registro conservado durante un
período fijo). Lo que difiere es el desencadenante, la redacción del aviso, el plazo del informe, el
destinatario y el ejecutor. Construye el control una vez en el stack y parametrízalo por
jurisdicción; el patrón [Framework Crosswalk](/patterns/framework-crosswalk) es el lugar donde viven
esos parámetros. Esto no es asesoramiento legal, y los mapeos son ilustrativos, no una afirmación de
conformidad.

## El panorama de un vistazo

| Jurisdicción | Instrumento principal | Estado (a partir de 2026-09-24) | Tipo | Quién ejecuta |
|---|---|---|---|---|
| Corea del Sur | Ley Básica de IA y Decreto de Ejecución | En vigor desde 2026-01-22; multas sujetas a un período de orientación de al menos un año [1][2][3] | Vinculante, horizontal | Ministerio de Ciencia y TIC (MSIT) |
| Estados Unidos (federal) | EO 14179, EO 14365, OMB M-25-21, M-25-22 y M-26-04 | En vigor para agencias federales; sin estatuto federal para actores privados [5][6][8][10] | Vinculante, dirigido | OMB y agencias; grupo de trabajo del DOJ contra leyes estatales |
| Estados Unidos (estados) | Colorado SB 26-189, Texas HB 149, California SB 53, SB 942, AB 2013, SB 243 y reglas de CPPA, New York RAISE y GBL Art. 47, Utah, Illinois, NYC LL 144 | Mixto: varios en vigor, Colorado desde 2027-01-01, RAISE desde 2027-01-01 [15][18][19][26] | Vinculante, dirigido | Fiscales generales estatales y agencias |
| Japón | Ley de Promoción de IA (Ley No. 53 de 2025) | Completamente en vigor desde 2025-09-01 [31][32] | Vinculante, horizontal (promocional; sin penalizaciones) | Cuartel General de Estrategia de IA del Gabinete |
| China | Reglas departamentales de la CAC, más recientemente las medidas de interacción antropomórfica | En vigor; la más nueva desde 2026-07-15 [35] | Vinculante, dirigido | Administración del Ciberespacio de China (CAC) |
| Brasil | PL 2338/2023 | Proyecto de ley: aprobado por el Senado 2024-12-10; en espera de informe en la Cámara [36][37] | Proyecto de ley | Aún no designado en la ley |
| Canadá | Directiva sobre Toma de Decisiones Automatizada | En vigor para instituciones federales; AIDA caducó [38][39] | Vinculante, dirigido | Secretaría de la Junta del Tesoro de Canadá |
| India | Directrices de Gobernanza de IA de India | Publicadas 2025-11-05; sin ley de IA [40] | Voluntario | MeitY (solo orientación) |
| Reino Unido | Principios aplicados por reguladores existentes; ATRS; Código de Práctica de Ciberseguridad de IA | No estatutario para IA como tal [41][43][44] | Voluntario | Reguladores sectoriales existentes (por ejemplo la ICO, FCA y MHRA) |
| Italia | Ley 132/2025 | En vigor desde 2025-10-10 [46] | Vinculante, horizontal | AgID y ACN, más supervisores financieros |
| España | Proyecto de ley para el buen uso y gobernanza de IA; AESIA; espacio controlado de pruebas | Proyecto de ley no adoptado; espacio controlado de pruebas y guías vigentes [47][48][49] | Proyecto de ley | AESIA y autoridades sectoriales (según lo propuesto) |
| Singapur | Marcos de Gobernanza de IA (incl. agentes), AI Verify | Voluntario [50][51][53] | Voluntario | IMDA (orientación) |
| Australia | Plan Nacional de IA; Orientación para la Adopción de IA | Se aplica la ley existente; sin ley de IA [54] | Voluntario | Reguladores existentes; Instituto de Seguridad de IA asesora |

Los mismos regímenes se dibujan como
[un mapa de mosaicos por jurisdicción](/figures/jurisdiction-tiles).

## Corea del Sur: la Ley Básica de IA

Corea del Sur tiene un estatuto de IA horizontal en vigor que conlleva deberes del operador y
multas. Su nombre formal es la Ley Básica sobre el Desarrollo de la Inteligencia Artificial y el
Establecimiento de una Base para la Confianza (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Ley No. 20676 [1]. La
mayoría de la Ley es política industrial (un comité nacional de estrategia de IA, datos de
entrenamiento, clústeres de IA, apoyo industrial); los deberes que importan al ingeniero se
encuentran en el Capítulo 4, Artículos 31 a 36, y en las disposiciones de ejecución de los Artículos
40 y 43 [1].

### Estado y fechas

La Ley fue promulgada el 21 de enero de 2025 y entró en vigor el 22 de enero de 2026; la parte de la
definición de alto impacto que cubre dispositivos médicos digitales comenzó el 24 de enero de 2026
[1]. Una Ley modificatoria, No. 21311 del 20 de enero de 2026, revisó el Artículo 2 y otras
disposiciones antes de la entrada en vigor. Un segundo grupo de sus cambios entró en vigor el 21 de
julio de 2026: una segunda oración en el Artículo 35(1) requiere que la evaluación de impacto
refleje las características de grupos vulnerables a la IA, y los Artículos 16(3) y (4) indican a los
organismos públicos que consideren primero los productos de IA designados cuando compren, y eximen a
los funcionarios que los compren o utilicen de responsabilidad ante su organismo por cualquier
pérdida resultante, salvo intención o negligencia grave [1]. El Decreto de Ejecución, Decreto
Presidencial No. 36053, fue promulgado el 21 de enero de 2026 y entró en vigor el 22 de enero de
2026 [2]. MSIT, el ministerio competente, anunció un período de orientación de al menos un año
durante el cual las investigaciones de hechos y las multas administrativas se suspenden excepto en
casos muy excepcionales, como pérdida de vidas o violaciones de derechos humanos [3]. El período de
gracia se aplica a las multas, no a los deberes: las obligaciones han aplicado desde el 22 de enero
de 2026. Una enmienda de decreto en vigor desde el 21 de julio de 2026, Decreto Presidencial No.
36506, definió los grupos vulnerables a la IA (entre ellos personas con discapacidades, personas de
65 años o más, personas elegibles para prestaciones de demandantes de empleo y mujeres con
interrupciones en la carrera), estableció la confirmación de productos de IA del ministerio para
contratación pública, y modificó el Artículo 28(1) del Decreto para que la identificación de
personas afectadas en la evaluación de impacto refleje esos grupos [2][4]. Los otros deberes del
operador descritos a continuación no cambian.

### Alcance y titulares de deberes

La Ley alcanza la conducta en el extranjero que afecta al mercado coreano o a los usuarios coreanos
(Artículo 4(1)), y excluye la IA desarrollada y utilizada únicamente para defensa o seguridad
nacional, según lo especificado por decreto (Artículo 4(2); Artículo 2 del Decreto) [1][2]. El
titular del deber es el **operador de negocio de IA**, que la Ley divide en dos roles: el operador
que desarrolla y proporciona IA, y el operador que utiliza IA proporcionada por otro para ofrecer su
propio producto o servicio (Artículo 2(7)) [1]. La división es cercana a la del proveedor y
responsable del despliegue de la UE, pero no idéntica: ambos roles conllevan los deberes de
transparencia y alto impacto, y el decreto permite que un operador que utiliza confíe en las medidas
de gestión de riesgos, explicación y protección del usuario del desarrollador a menos que cambie
materialmente el propósito o uso del sistema (Artículo 27(3) del Decreto) [2].

### IA de alto impacto y cómo se confirma

**IA de alto impacto** es un sistema de IA que puede afectar significativamente, o plantear un
riesgo para, la vida humana, la seguridad física o los derechos fundamentales, y que se utiliza en
una de las áreas que la Ley enumera (Artículo 2(4)) [1]:

- suministro de energía; la producción de agua potable; la prestación de asistencia sanitaria; el
  desarrollo y uso de dispositivos médicos y dispositivos médicos digitales; la gestión segura de
  materiales e instalaciones nucleares;
- el análisis y uso de información biométrica para investigación criminal o arresto;
- sentencias o evaluaciones que afecten significativamente a los derechos y obligaciones
  individuales, **como la selección de personal y la evaluación de préstamos**;
- la operación principal de medios, instalaciones y sistemas de transporte;
- decisiones de organismos estatales, gobiernos locales e instituciones públicas que afecten a los
  ciudadanos, como comprobaciones de elegibilidad y cobro de cargos por servicios públicos;
- evaluación de estudiantes en educación infantil, primaria y secundaria;
- cualquier área adicional designada por decreto presidencial.

El operador debe revisar por adelantado si su sistema es de alto impacto, y puede pedir a MSIT que
lo confirme (Artículo 33(1)) [1]. El decreto convierte la solicitud en un archivo: una descripción
general del producto o servicio, una descripción general de los datos de entrenamiento, material que
muestre cómo se utiliza el sistema y qué produce, y cualquier otro documento de apoyo. MSIT pondera
el área, el impacto, la gravedad y frecuencia del riesgo, la revisión previa del operador y, cuando
se consulta, un comité de expertos, y responde dentro de 30 días, prorrogables una vez por 30 días.
Un operador que no está de acuerdo puede pedir una reconfirmación dentro de 10 días, y MSIT debe
responder dentro de otros 30 días después de consultar al comité de expertos (Artículo 25 del
Decreto) [2].

Para el ingeniero esto es un artefacto de entrada: un **registro de decisión de clasificación** por
sistema, que contiene el área del Artículo 2(4), la justificación del riesgo, la descripción general
de los datos de entrenamiento y, cuando se solicita, la respuesta de MSIT. Es el mismo registro que
el capítulo 06 construye en [entrada y clasificación](/bok/the-role#intake-and-classification), con
un campo más.

### Transparencia: aviso previo y etiquetado

El Artículo 31 conlleva tres deberes [1]:

1. **Aviso previo.** Un operador que proporciona un producto o servicio utilizando IA de alto
   impacto o generativa debe informar a los usuarios con anticipación de que funciona con esa IA.
2. **Etiquetado de salida.** Un operador que proporciona IA generativa, o un producto o servicio que
   la utiliza, debe indicar que las salidas fueron generadas por IA generativa.
3. **Contenido sintético realista.** Cuando un sistema produce sonido, imágenes o video que son
   difíciles de distinguir de la realidad, el operador debe notificar o etiquetar para que los
   usuarios puedan reconocer claramente que fueron generados por IA; para obras artísticas o
   creativas, el aviso puede darse de una manera que no obstaculice la exhibición o disfrute.

El decreto establece la mecánica (Artículo 23 del Decreto) [2]. El aviso previo puede estar en el
producto mismo, en el contrato, manual o términos de uso, en la pantalla o dispositivo del usuario,
o publicarse en el lugar de suministro. Las etiquetas pueden ser perceptibles por humanos o legibles
por máquina; cuando son legibles por máquina únicamente, el operador también debe informar al
usuario al menos una vez, por texto o voz, de que la salida fue generada por IA generativa. Los
avisos y etiquetas para contenido sintético realista deben ser fáciles de percibir y deben tener en
cuenta la edad de los usuarios principales y sus condiciones físicas o sociales. Se aplican tres
exenciones: cuando el uso de IA es obvio por el nombre del producto, pantalla o salida; cuando el
sistema se utiliza únicamente para el negocio interno del operador; y casos que MSIT designa por
aviso público.

### Deberes para IA de alto impacto

Un operador que proporciona IA de alto impacto debe implementar seis medidas (Artículo 34(1)) [1]:
un plan de gestión de riesgos; un plan de explicación que cubra, dentro de la viabilidad técnica, el
resultado final, los criterios principales utilizados para alcanzarlo y una descripción general de
los datos de entrenamiento; un plan de protección del usuario; gestión humana y supervisión;
documentos que muestren las medidas tomadas; y cualquier medida adicional que el comité nacional de
IA resuelva. El decreto añade tres reglas operacionales (Artículo 27 del Decreto) [2]:

- el operador publica el contenido principal de la gestión de riesgos, los planes de explicación y
  protección del usuario, y el nombre y datos de contacto de la persona que supervisa el sistema, en
  sus oficinas o en su sitio web, excepto los secretos comerciales;
- el operador conserva la evidencia documental de las medidas durante **cinco años**, en formato
  electrónico o de otro tipo;
- un operador usuario puede solicitar al operador desarrollador la información que necesita, y el
  desarrollador debe esforzarse por cooperar; las medidas adoptadas conforme a otras leyes cuentan
  donde el decreto lo indica en su anexo.

**La evaluación de impacto** es un deber de mejor esfuerzo: los operadores "se esforzarán" por
evaluar el efecto sobre los derechos fundamentales antes de proporcionar IA de gran impacto, y los
organismos públicos deben dar prioridad a los productos que fueron evaluados (artículo 35) [1]. El
decreto fija el contenido: los individuos y grupos que probablemente se verán afectados, reflejando
las características de los grupos vulnerables a la IA (artículos 3(5) y 35(1) de la Ley, en vigor
desde el 21 de julio de 2026); los derechos fundamentales en juego; los efectos sociales y
económicos; los patrones de uso; los indicadores cuantitativos o cualitativos y el método utilizado;
las medidas de prevención, mitigación y recuperación; y un plan de mejora donde sea necesario. El
operador puede realizar la evaluación por sí mismo o a través de un tercero (artículo 28 del
Decreto) [2].

### Deberes de seguridad para sistemas de alto cómputo

El artículo 32 se aplica a sistemas cuyo cómputo acumulado de entrenamiento supera un umbral
establecido por decreto [1]. El decreto requiere los tres siguientes: cómputo acumulado de
entrenamiento de al menos **10^26 operaciones de punto flotante**; construcción y operación con la
tecnología de IA más avanzada del día; y un perfil de riesgo que pueda afectar amplia y gravemente
la vida, la seguridad y los derechos fundamentales (artículo 24 del Decreto) [2]. Los operadores de
tales sistemas deben identificar, evaluar y mitigar riesgos en todo el ciclo de vida, construir un
sistema de gestión de riesgos que monitoree y responda a incidentes de seguridad de IA, y enviar los
resultados a MSIT [1]. La cifra de cómputo es la misma 10^26 que utilizan las leyes fronterizas
estadounidenses (véase [frontier-developer laws](/bok/regulatory-map#frontier-developer-laws) en el
capítulo 08), pero la prueba conjuntiva hace que la clase coreana sea más estrecha en teoría.

### Representante doméstico

Un operador sin domicilio ni establecimiento comercial en Corea debe designar un
**representante doméstico** por escrito e informarlo a MSIT si cumple con cualquier umbral del
decreto (artículo 36; artículo 29 del Decreto) [1][2]: ingresos totales del año anterior de KRW 1
billón o más; ingresos del año anterior de servicios de IA de KRW 10 mil millones o más; un promedio
de 1 millón o más de usuarios diarios en Corea durante los tres meses anteriores al final del año
anterior; o una multa anterior por ignorar una orden correctiva. El representante envía los
resultados de seguridad del artículo 32, presenta solicitudes de confirmación de gran impacto y
apoya las medidas del artículo 34, incluida la verificación de que los documentos sean actuales y
precisos; sus incumplimientos se atribuyen al operador [1].

### Cumplimiento y período de gracia

MSIT puede exigir documentos e investigar, incluso en el sitio, cuando encuentra o se le informa de
un presunto incumplimiento de los deberes de etiquetado, seguridad o gran impacto, y puede ordenar
que se detenga o corrija el incumplimiento (artículo 40) [1]. Las multas administrativas de hasta
**KRW 30 millones** se aplican a solo tres incumplimientos: no dar el aviso previo del artículo
31(1), no designar un representante doméstico y no obedecer una orden de detención o corrección
(artículo 43) [1]. Un incumplimiento de etiquetado, por lo tanto, no se multa directamente; se
vuelve sancionable cuando el operador ignora la orden correctiva que sigue. Durante el período de
orientación descrito anteriormente, la búsqueda de hechos y las multas se retienen excepto en casos
excepcionales [3].

| Deber (artículo) | Quién está vinculado | Artefacto de ingeniería que lo evidencia | Capa |
|---|---|---|---|
| Autorrevisión de gran impacto y confirmación opcional (art. 33; art. 25 del Decreto) | Todos los operadores de negocios de IA | Registro de decisión de clasificación por sistema: área Art. 2(4), razón de riesgo, descripción general de datos de entrenamiento, respuesta de MSIT | 1 · 2 |
| Aviso previo (art. 31(1); art. 23(1) del Decreto) | Operadores de productos que utilizan IA de gran impacto o generativa | Componente de notificación en UI, términos y contratos; inventario de notificaciones por superficie de usuario | 2 · 4 |
| Etiquetas de salida y aviso de contenido realista (art. 31(2)–(3); art. 23(2)–(3) del Decreto) | Operadores de IA generativa | Tubería de procedencia: etiqueta visible o marca legible por máquina, más al menos un aviso de texto o voz | 3 · 4 |
| Deberes de seguridad por encima de 10^26 FLOP (art. 32; art. 24 del Decreto) | Operadores de sistemas calificados | Registro de riesgos del ciclo de vida; monitoreo de incidentes de seguridad; informe de resultados a MSIT | 3 · 4 · 5 |
| Medidas de gran impacto (art. 34; art. 27 del Decreto) | Operadores de IA de alto impacto | Planes de gestión de riesgos, explicación y protección del usuario; supervisor humano nombrado; resumen publicado; almacén de evidencia de cinco años | 1 · 2 · 4 · 5 |
| Evaluación de impacto, mejor esfuerzo (art. 35; art. 28 del Decreto) | Operadores de IA de alto impacto | Evaluación de impacto sobre derechos fundamentales que incluya los siete elementos del decreto | 1 · 5 |
| Representante doméstico (art. 36; art. 29 del Decreto) | Operadores extranjeros por encima de un umbral | Designación presentada ante MSIT; manual de acceso a evidencia para el representante | 5 |

> **En la práctica (ilustrativo)**
> Un proveedor extranjero de una API de evaluación de contratación cruzó el umbral de 1 millón de
> usuarios diarios a través de clientes coreanos de sus clientes. El equipo de gobernanza hizo tres
> cosas. Añadió un bloque `jurisdiction.kr` a la entrada del registro de cada sistema que contenía
> el área del artículo 2(4) ("contratación"), el veredicto de autorrevisión y un enlace a la
> evaluación de impacto con forma de decreto. Extendió la política de retención del almacén de
> evidencia a cinco años para cada artefacto etiquetado `kr-art34`. Y dio al representante doméstico
> acceso de lectura a una vista de evidencia filtrada, para que el representante pudiera responder a
> MSIT desde documentos actuales en lugar de enviar correos electrónicos al equipo de producto. Nada
> nuevo se construyó en el modelo; el trabajo estuvo en el registro, la política de retención y la
> ruta de acceso.

## Estados Unidos: la capa federal

Estados Unidos no tiene un estatuto federal de IA que vincule a actores privados. La capa federal es
un conjunto de órdenes ejecutivas y memorandos de la Oficina de Gestión y Presupuesto (OMB) que
vinculan a las agencias federales y, a través de la contratación, a los proveedores que les venden.
Desde diciembre de 2025 también ha incluido un impulso deliberado contra las leyes estatales de IA.

### Órdenes ejecutivas

- **EO 14179** (23 de enero de 2025), *Removing Barriers to American Leadership in Artificial
  Intelligence*, ordenó una revisión de cada acción tomada bajo la revocada EO 14110, para que las
  inconsistentes con la nueva política pudieran ser suspendidas, revisadas o rescindidas, y ordenó
  un plan de acción de IA dentro de 180 días [5].
- **EO 14319** (23 de julio de 2025), *Preventing Woke AI in the Federal Government*, estableció dos
  "Principios de IA Imparcial" (búsqueda de la verdad y neutralidad ideológica) para los modelos de
  lenguaje grande que el gobierno compra [8].
- **EO 14365** (11 de diciembre de 2025), *Ensuring a National Policy Framework for Artificial
  Intelligence*, se dirige a las leyes estatales de IA; se trata en su propia subsección a
  continuación [10].

### Memorandos de OMB para agencias federales

**M-25-21** (3 de abril de 2025), *Accelerating Federal Use of AI through Innovation, Governance,
and Public Trust*, rescindió y reemplazó M-24-10 [6]. Define **IA de alto impacto** como IA cuya
salida sirve como base principal para decisiones o acciones con un efecto legal, material,
vinculante o significativo sobre derechos civiles, libertades civiles o privacidad, sobre acceso a
educación, vivienda, seguros, crédito, empleo y otros programas, sobre acceso a servicios
gubernamentales críticos, o sobre la salud y seguridad humanas, entre otros [6]. Algunas categorías
de casos de uso se presumen de alto impacto; un funcionario de la agencia que concluya lo contrario
debe documentar la decisión al Oficial de IA. Las agencias tenían 365 días desde la emisión para
documentar las prácticas mínimas para IA de alto impacto: pruebas previas al despliegue; una
evaluación de impacto de IA; monitoreo continuo del desempeño e impactos adversos; capacitación
adecuada de operadores; supervisión humana, intervención y responsabilidad, con un mecanismo de
seguridad donde sea práctico; recursos consistentes o apelaciones para individuos afectados; y
consulta de usuarios finales y el público [6]. **M-25-22**, emitido el mismo día, cubre adquisición
[7].

**M-26-04** (11 de diciembre de 2025) implementa EO 14319 [8]. Las agencias tenían hasta el 11 de
marzo de 2026 para actualizar sus políticas de contratación, y cada solicitud de un modelo de
lenguaje grande debe solicitar, como mínimo, la política de uso aceptable del proveedor; fichas de
modelo, sistema o datos; recursos para usuarios finales; y un mecanismo para retroalimentación de
usuarios finales sobre salidas que violen los principios [8]. Los requisitos también alcanzan
modelos integrados en otro software que la agencia compra [8].

### Plan de acción de IA de América

El plan, publicado en julio de 2025, tiene tres pilares: acelerar la innovación, construir
infraestructura de IA estadounidense y liderar en diplomacia y seguridad internacional de IA [9].
Dos de sus acciones importan aquí. Pide a las agencias con financiamiento discrecional de IA que
consideren el clima regulatorio de IA de un estado al tomar decisiones de financiamiento, y a la
Comisión Federal de Comunicaciones que evalúe si las reglas de IA estatal interfieren con su
mandato; y dirige a NIST a revisar el Marco de Gestión de Riesgos de IA para eliminar referencias a
desinformación, diversidad, equidad e inclusión, y cambio climático [9].

### El impulso federal contra las leyes estatales de IA

EO 14365 establece la maquinaria [10]. El Fiscal General debía establecer una
**Fuerza de Tarea de Litigio de IA** dentro de 30 días para desafiar las leyes estatales de IA que
entren en conflicto con la política federal; el Secretario de Comercio debía publicar, dentro de 90
días, una evaluación de las leyes estatales de IA "onerosas", incluidas las que requieren que los
modelos alteren salidas veraces; los estados con tales leyes se vuelven inelegibles para algunos
fondos de banda ancha (BEAD) y pueden ver otras subvenciones discrecionales condicionadas; la FCC
debe considerar un estándar federal de reporte y divulgación que preemptaría reglas estatales
conflictivas; la Comisión Federal de Comercio (FTC) debe emitir una declaración de política sobre
cómo se aplica su autoridad de engaño a las leyes estatales que requieren salidas alteradas; y los
asesores del Presidente deben preparar legislación para un marco federal uniforme. La recomendación
legislativa de la orden no debe proponer la preemción de leyes estatales sobre seguridad infantil,
sobre infraestructura de cómputo y centros de datos de IA que no sean permisos, o sobre adquisición
y uso estatal de IA [10].

Lo que sucedió después, a partir del 2026-09-24:

- El Fiscal General anunció la fuerza de tarea el 9 de enero de 2026, según lo informado por
  profesionales [12].
- La Casa Blanca publicó recomendaciones legislativas no vinculantes el 20 de marzo de 2026,
  pidiendo al Congreso que preemptara las leyes estatales de IA que impongan cargas indebidas sin
  preemptar las leyes estatales generalmente aplicables que protejan a los niños, prevengan fraude y
  protejan a los consumidores [11].
- La FTC solicitó comentarios el 1 de julio de 2026 sobre una propuesta de declaración de política:
  que distorsionar deliberadamente los resultados de un sistema de IA con fines ideológicos no
  divulgados puede ser engañoso conforme a la Sección 5 de la Ley de la FTC. La declaración analiza
  la Ley de IA de Colorado y sugiere que puede estar implícitamente preemptada cuando coerciona
  cambios en los resultados; los comentarios se cerraron el 31 de julio de 2026 [13].
- En la Cámara, un borrador de discusión bipartidista publicado en junio de 2026 permitiría la
  preemción federal de la regulación estatal de IA durante tres años; fue un borrador para
  comentarios de las partes interesadas, no un proyecto presentado [14]. Si desde entonces ha sido
  presentado debe verificarse (verificar).
- La evaluación de Comercio debía completarse dentro de 90 días de la orden [10]; si ha sido
  publicada y qué leyes menciona debe verificarse (verificar).
- En los tribunales, xAI demandó el 9 de abril de 2026 para bloquear la Ley de IA original de
  Colorado, SB 24-205, y el Departamento de Justicia de EE.UU. intervino con una demanda
  complementaria el 24 de abril de 2026, argumentando que la Ley viola la Cláusula de Protección
  Igualitaria [16][17]. El 27 de abril de 2026, un juez federal de magistrado dictó una orden
  estipulada conforme a la cual el Fiscal General de Colorado no haría cumplir SB 24-205 hasta 14
  días después de una sentencia sobre la moción de xAI para una orden cautelar preliminar; SB 26-189
  entonces reemplazó la Ley [16].

Para el ingeniero la regla práctica es simple: un deber estatal vincula hasta que es derogado,
reemplazado o suspendido. Mantén los controles de cada estado como un módulo de política separado y
versionado, indexado por jurisdicción, de modo que una orden judicial o una derogación sea un cambio
de configuración y no una reconstrucción.

| Instrumento federal | Se aplica a | Lo que pide | Artefacto que la agencia o proveedor conserva | Capa |
|---|---|---|---|---|
| OMB M-25-21 [6] | Agencias federales (se alienta a los elementos de la Comunidad de Inteligencia, no es obligatorio) | Determinación de alto impacto; siete prácticas mínimas; Oficial Principal de IA; inventario de casos de uso | Entrada de inventario de caso de uso; informe de prueba previa al despliegue; evaluación de impacto de IA; plan de monitoreo; ruta de apelación | 2 · 3 · 4 · 5 |
| OMB M-26-04 [8] | Agencias que compran modelos de lenguaje grande y sus proveedores | Principios de IA Imparcial como términos de contrato; paquete de transparencia mínimo | Política de uso aceptable; fichas de modelo, sistema o datos; recursos para usuarios finales; canal de retroalimentación | 2 · 5 |
| EO 14365 y la propuesta de la FTC [10][13] | Estados; desarrolladores sujetos a leyes estatales | Sin deber aún sobre actores privados; riesgo de litigio y preemción | Módulos de política indexados por jurisdicción; registro de qué controles de resultados requiere cada ley estatal | 1 |

## Estados Unidos: leyes estatales que vinculan a organizaciones privadas

El capítulo 08 mapea las dos leyes fronterizas, Texas y Colorado al nivel de la tabla
[leyes federales y estatales de EE.UU.](/bok/regulatory-map#us-federal-and-state-laws). Esta sección
añade las leyes que alcanzan a desarrolladores y responsables del despliegue ordinarios, y da a cada
una su alcance, fechas, deberes y cumplimiento.

| Ley | Estado (a partir de 2026-09-24) | Alcance | Deberes clave | Cumplimiento | Artefacto de evidencia | Capa |
|---|---|---|---|---|---|---|
| Colorado SB 26-189 (Tecnología de Toma de Decisiones Automatizada) | Firmada 2026-05-14; efectiva 2027-01-01; deroga y promulga nuevamente SB 24-205 [15][16] | Desarrolladores y responsables del despliegue de ADMT en decisiones consecuentes (empleo, vivienda, préstamos, seguros, beneficios) | Documentación del desarrollador para responsables del despliegue (usos previstos, categorías de datos de entrenamiento, límites conocidos, instrucciones) y notificación de actualizaciones materiales; notificación del responsable del despliegue del uso de ADMT; explicación en lenguaje claro dentro de 30 días de un resultado adverso; corrección del consumidor, revisión humana y reconsideración; registros conservados tres años o más | Fiscal General conforme a la Ley de Protección del Consumidor; notificación de cura de 60 días antes de 2030; sin nuevo derecho de acción privada [15] | Inventario de ADMT; paquete de documentación del desarrollador; plantillas de notificación y explicación de resultado adverso; cola de revisión humana; almacén de registros de tres años | 2 · 4 · 5 |
| Texas TRAIGA (HB 149) | En vigor 2026-01-01 [18] | Personas que hacen negocios en Texas; desarrolladores, responsables del despliegue, gobierno | Prohibiciones basadas en intención (manipulación del comportamiento, puntuación social del gobierno, discriminación ilegal, cierto contenido sexual); divulgación por agencias gubernamentales y en servicios de salud; espacio controlado de 36 meses; reglas locales de IA preemptadas | Solo Fiscal General; sin derecho de acción privada; cura de 60 días; USD 10.000–12.000 por violación curable, 80.000–200.000 por violación no curable, 2.000–40.000 por día continuado [18] | Política de uso prohibido como código; controles de divulgación; una ficha de modelo que responde a las ocho preguntas investigativas del Fiscal General | 1 · 2 · 4 |
| California SB 53 (Ley de Transparencia en IA Fronteriza) | Promulgada 2025-09-29; en vigor 2026-01-01 [19][20] | Desarrolladores fronterizos (modelos entrenados por encima de 10^26 operaciones); grandes desarrolladores fronterizos (ingresos por encima de USD 500M) | Marco de IA fronteriza publicado; informe de transparencia antes de desplegar un modelo fronterizo nuevo o sustancialmente modificado; incidentes de seguridad críticos reportados dentro de 15 días, 24 horas si la muerte o lesión grave es inminente; canal de denunciante | Fiscal General; sanción civil de hasta USD 1M por violación [19] | Marco publicado; informe de transparencia predespliegue; canalización de incidentes con los dos relojes; canal de reporte anónimo | 3 · 4 · 5 |
| Ley de Transparencia de IA de California (SB 942 enmendada por AB 853) | Operativa 2026-08-02; deberes de plataforma 2027-01-01; dispositivos de captura 2028-01-01 [21] | Proveedores cubiertos de sistemas de IA generativa pública; grandes plataformas en línea; plataformas de alojamiento; fabricantes de dispositivos de captura | Herramienta de detección gratuita; divulgación visible (manifiesta) opcional; divulgación integrada (latente) en imagen, video y audio; las plataformas detectan y exponen la procedencia y no deben eliminarla | Sanción civil de USD 5.000 por violación, cada día una violación separada, en acciones del Fiscal General, un fiscal de ciudad o un asesor de condado (Bus. & Prof. Code s. 22757.4) [21] | Canalización de procedencia escribiendo metadatos latentes; punto final de detección público; visualización de procedencia del lado de la plataforma | 3 · 4 |
| California AB 2013 (transparencia de datos de entrenamiento) | Documentación vencida el 2026-01-01 o antes y en cada lanzamiento nuevo o modificación sustancial [22] | Desarrolladores de sistemas de IA generativa lanzados desde 2022-01-01 para uso en California | Resumen público de conjuntos de datos de entrenamiento: fuentes, propósito, tamaño, tipos de datos, estado de PI, licencias, información personal, limpieza, período de recopilación, primer uso, datos sintéticos | Exenciones: seguridad e integridad, operación de aeronaves, usos de seguridad nacional federal [22] | Ficha de datos por conjunto de datos, publicada en el lanzamiento; registro de derechos de datos de entrenamiento | 2 |
| Regulaciones de CPPA de California (ADMT, evaluaciones de riesgo, auditorías de ciberseguridad) | Aprobadas 2025-09-23; efectivas 2026-01-01; deberes de ADMT desde 2027-01-01; atestaciones de evaluación de riesgo vencidas 2028-04-01 [23] | Empresas sujetas a la CCPA que utilizan ADMT para decisiones significativas | Deberes de ADMT para decisiones significativas (detalle en capítulo 19); evaluaciones de riesgo; auditorías de ciberseguridad | Agencia de Protección de Privacidad de California [23] | Registro de ADMT; notificación preuso; enrutamiento de exclusión; registro de evaluación de riesgo | 2 · 4 · 5 |
| California SB 243 (chatbots compañeros) | Promulgada 2025-10-13; informes anuales desde 2027-07-01 [24] | Operadores de chatbots complementarios | Divulga IA donde una persona razonable podría ser engañada; para menores conocidos, divulga IA y recuerda al menos cada tres horas, y previene contenido sexualmente explícito; protocolo de suicidio y autolesión con derivación de crisis | Derecho de acción privada: al menos USD 1.000 por violación [24] | Política de modo complementario; temporizador de recordatorio; clasificador de derivación de crisis y registro; informe anual | 1 · 4 · 5 |
| Nueva York RAISE Act | Firmada 2025-12-19; efectiva 2027-01-01 después de la enmienda del capítulo de 2026 [25][26] | Desarrolladores fronterizos (modelos entrenados por encima de 10^26 operaciones) para reportes de incidentes; grandes desarrolladores fronterizos (ingresos por encima de USD 500M) para el protocolo publicado, después de la enmienda del capítulo [26] | Protocolo de seguridad publicado; incidentes de seguridad divulgados dentro de 72 horas; oficina de supervisión de DFS | Fiscal General [25] | Protocolo publicado; canalización de incidentes de 72 horas | 4 · 5 |
| Nueva York GBL Artículo 47 (modelos de compañía de IA) | En vigor [27] (verificar fecha de entrada en vigor) | Operadores de compañeros de IA | Protocolo para detectar ideación suicida y autolesión y derivar a servicios de crisis; notificación de que el usuario no está hablando con un humano al inicio y al menos cada tres horas | Fiscal General; sanciones civiles de hasta USD 15.000 por día [27] | Clasificador de derivación de crisis y registro; temporizador de notificación | 4 · 5 |
| Ley de Política de IA de Utah (SB 149 enmendada por SB 226 y SB 332) | Enmiendas efectivas 2025-05-07; Ley deroga el 2027-07-01 {[28]} | Proveedores que utilizan IA generativa en transacciones de consumidor; ocupaciones reguladas | Divulga IA cuando una persona lo solicita claramente; divulgación prominente en interacciones "de alto riesgo" (datos sensibles o asesoramiento personalizado) por profesionales regulados, verbalmente al inicio o por escrito antes; puerto seguro para divulgación clara al inicio | División de Protección del Consumidor [28] | Componente de divulgación con bandera de riesgo de interacción; registro de conversación mostrando la divulgación | 4 |
| Illinois HB 3773 (enmienda de la Ley de Derechos Humanos) | Efectiva 2026-01-01; reglas de implementación en borrador, según se reporta [29] | Empleadores que utilizan IA en reclutamiento, contratación, promoción, disciplina y otros términos de empleo | Sin uso de IA con efecto discriminatorio en clases protegidas; sin códigos ZIP como proxy; notificación a empleados y solicitantes | Departamento de Derechos Humanos de Illinois y los recursos de la Ley de Derechos Humanos [29] | Inventario de IA en RRHH; eval de impacto adverso por clase protegida; registro de notificación | 2 · 3 · 4 |
| Ley Local de Nueva York 144 (herramientas automatizadas de decisión de empleo) | Ejecutada desde 2023-07-05 [30] | Empleadores y agencias de empleo que utilizan AEDTs para funciones de la Ciudad de Nueva York | Auditoría de sesgo dentro de un año antes del uso; resumen público de resultados; notificaciones a candidatos y empleados | Departamento de Protección del Consumidor y del Trabajador; canal de quejas [30] | Informe de auditoría de sesgo independiente; resumen publicado; registro de notificación | 3 · 5 |

### Decisiones consecuentes: una herramienta de contratación, cuatro regímenes

Colorado, las reglas de ADMT de California, Illinois y Nueva York City alcanzan la contratación
automatizada, pero cada uno solicita un artefacto diferente: Colorado una explicación dentro de 30
días de un resultado adverso y una ruta de revisión humana [15]; California, desde 2027, los deberes
de ADMT de la CPPA [23]; Illinois una notificación y una ausencia de efecto discriminatorio [29];
Nueva York City una auditoría de sesgo independiente, publicada, menos de un año de antigüedad [30].
Corea también enumera la contratación como un área de alto impacto [1]. Un único conjunto de evals
que mide tasas de selección por clase protegida, ejecutado en CI y en muestras de producción,
produce la evidencia que todos necesitan; los avisos y rutas de revisión difieren solo en redacción
y tiempo.

> **Ejemplo (ilustrativo)**
> Un modelo de clasificación de CV de un proveedor es desplegado por empleadores en Denver, Chicago,
> Nueva York City y Seúl. La [Eval Gate en CI](/patterns/eval-gate-in-ci) ejecuta un conjunto de
> impacto adverso en cada lanzamiento y bloquea uno que mueve la relación de tasa de selección de
> cualquier grupo por debajo del piso configurado. Los mismos resultados alimentan la solicitud de
> datos del auditor de auditoría de sesgo de NYC, el archivo de efecto discriminatorio de Illinois y
> la sección "indicadores y método" de la evaluación de impacto coreana. La entrada del registro
> lleva cuatro plantillas de notificación y una cola de revisión humana; la
> [explicación de resultado adverso](/patterns/explanation-artefact) se genera a partir de los
> códigos de razón principales del modelo y se registra con la decisión, por lo que el reloj de 30
> días de Colorado se cumple por la misma canalización que responde a un aviso de acción adversa de
> crédito de EE.UU.

### Procedencia, datos de entrenamiento y desarrolladores fronterizos

California divide la transparencia de contenidos entre dos estatutos: AB 2013 obliga a los
desarrolladores a publicar un resumen de sus datos de entrenamiento [22], y la Ley de Transparencia
de IA obliga a los grandes proveedores a incrustar procedencia en los medios que producen sus
sistemas y dar al público una forma de verificarla [21]. Ambas son problemas de evidencia antes de
ser problemas legales: una ficha de datos por conjunto de datos y un pipeline de procedencia que
escribe metadatos en el momento de la generación son los artefactos, y ambos pertenecen a las capas
2 y 3 del [stack](/bok/the-stack#layer-02-inventory--transparency). Para los desarrolladores de
frontera, SB 53 y RAISE convergen en un marco de seguridad publicado y un reloj de incidentes corto
[19][25]; el capítulo 08 lleva las
[filas de desarrollador de frontera](/bok/regulatory-map#frontier-developer-laws).

### Chatbots y asistentes

Utah, California y Nueva York regulan la interfaz conversacional en sí, no el modelo detrás de ella
[24][27][28]. Utah pide divulgación a solicitud clara y divulgación prominente en interacciones
reguladas de alto riesgo [28]; California y Nueva York añaden recordatorios periódicos y un
protocolo de derivación de crisis para productos de asistente, con los recordatorios de California
vinculados a menores conocidos [24][27]. Las medidas de interacción antropomórfica de China, a
continuación, cubren el mismo terreno con un recordatorio de dos horas [35]. Estos son problemas de
[Runtime Guardrail](/patterns/runtime-guardrail): un temporizador de sesión, un clasificador que
detecta señales de autolesión y las encamina a una derivación, y un registro que prueba que ambos se
activaron.

## Japón: la Ley de Promoción de IA

La Ley de Japón sobre la Promoción de la Investigación, Desarrollo y Utilización de Tecnologías
Relacionadas con la IA (人工知能関連技術の研究開発及び活用の推進に関する法律), Ley No. 53 de 2025, fue promulgada el 4 de
junio de 2025 y entró plenamente en vigor el 1 de septiembre de 2025, cuando entraron en vigor las
disposiciones que establecen la Sede de Estrategia de IA [31][32]. Es una ley de marco y promoción
sin sanciones [31]. Su deber sobre los negocios es una sola frase: los operadores que utilizan
tecnología relacionada con IA en su negocio deben esforzarse por utilizarla activamente y deben
**cooperar** con las medidas del gobierno nacional y local (Artículo 7) [31]. El estado emite
directrices coherentes con las normas internacionales para garantizar la investigación, desarrollo y
uso apropiados (Artículo 13), y recopila información sobre, y analiza, casos en los que propósitos
inapropiados o métodos inadecuados infringieron los derechos de las personas, luego proporciona
orientación, asesoramiento e información a los operadores (Artículo 16) [31].

Los instrumentos que dan contenido a la Ley son blandos. La Sede de Estrategia de IA adoptó
directrices sobre garantizar la adecuación de la investigación, desarrollo y uso de IA el 19 de
diciembre de 2025 [34]. El Gabinete adoptó el primer Plan Básico de IA el 23 de diciembre de 2025 y
un plan revisado el 14 de julio de 2026 [33]. La lectura de ingeniería: sin presentación y sin
multa, pero un gobierno que investiga casos de infracción de derechos y nombra operadores en
orientación. Un operador que mantiene un registro de incidentes y una ficha de modelo actualizados
puede responder a una consulta del Artículo 16 sin prisa.

## China: lo que el capítulo 08 aún no cubre

El capítulo 08 mapea los [niveles vinculantes y voluntarios](/bok/regulatory-map#china) de China,
desde las disposiciones de recomendación algorítmica hasta el marco TC260 3.0. Una regla que no
mapea es las
**Medidas Provisionales para la Administración de Servicios de Interacción Antropomórfica**
(人工智能拟人化互动服务管理暂行办法), emitidas por la CAC con otros cuatro organismos y en vigor desde el 15 de julio
de 2026 [35]. Se aplican a servicios de IA ofrecidos al público en China que simulan personalidad
humana, pensamiento y estilo de comunicación para proporcionar **interacción emocional sostenida**,
como compañía o apoyo emocional; servicio al cliente, respuesta a preguntas, asistentes de trabajo,
educación y herramientas de investigación sin interacción emocional sostenida están fuera del
alcance (Artículo 2) [35]. Los deberes:

- sin miembros de familia virtual o parejas virtuales íntimas para menores; consentimiento del tutor
  para usuarios menores de 14 años; un modo para menores con recordatorios de realidad y límites de
  tiempo; pasos razonables para identificar menores (Artículo 14) [35];
- etiquetado de contenido generado por IA conforme a las reglas de etiquetado nacional y una señal
  clara de que el usuario está interactuando con IA; un recordatorio emergente cuando aparece
  dependencia excesiva o adicción; un recordatorio después de cada **dos horas** de uso continuo
  (Artículo 18) [35];
- una salida fácil: cuando el usuario pide irse, el servicio debe detenerse y no debe mantener al
  usuario comprometido (Artículo 19) [35];
- una **evaluación de seguridad**, reportada a la oficina de ciberespacio provincial, cuando el
  servicio se lanza o añade tales características, cuando la nueva tecnología lo cambia
  significativamente, cuando alcanza 1 millón de usuarios registrados o 100.000 usuarios activos
  mensuales, o cuando surgen riesgos de seguridad nacional o interés público (Artículo 22) [35];
- presentación de algoritmo conforme a las disposiciones de recomendación, con verificaciones
  anuales por la CAC (Artículo 26) [35].

Los artefactos son los mismos que las leyes de asistente estadounidenses piden, más un monitor de
umbral en recuentos de usuarios que activa la evaluación, y el registro de presentación que el
capítulo 08 ya mapea.

## Brasil: PL 2338/2023 (proyecto)

El proyecto de ley de IA de Brasil, PL 2338/2023, fue presentado en el Senado el 3 de mayo de 2023,
aprobado por el pleno del Senado el 10 de diciembre de 2024 y enviado a la Cámara de Diputados, que
lo recibió el 17 de marzo de 2025 [36][37]. La Cámara creó una comisión especial el 4 de abril de
2025 porque el proyecto fue remitido a más de cuatro comisiones permanentes; según la última entrada
procesal, el 2 de septiembre de 2026, el proyecto estaba bajo un régimen de prioridad y esperando el
informe del relator, con un número creciente de proyectos relacionados adjuntos [37]. Es un
proyecto, no una ley. El texto del Senado, cuyo objeto declarado es el desarrollo, promoción y uso
ético y responsable de IA centrado en la persona humana [37], sigue un modelo basado en riesgos con
una lista de usos de alto riesgo y usos prohibidos (verifica el texto actual antes de confiar en
ningún artículo). El consejo de ingeniería para un proyecto es el mismo en todas partes: mapearlo en
el crosswalk como `status: bill`, no adjuntes controles a él aún, y observa la comisión.

## Canadá: después de AIDA, la Directiva sobre Toma de Decisiones Automatizada

La Ley de Inteligencia Artificial y Datos (AIDA), parte del Proyecto de Ley C-27, murió en la Orden
del Día cuando la primera sesión del 44º Parlamento terminó el 6 de enero de 2025 [38]. Canadá por
lo tanto no tiene un estatuto de IA federal para el sector privado. Lo que vincula es la
**Directiva de la Junta del Tesoro sobre Toma de Decisiones Automatizada**, que se aplica a los
sistemas de decisión automatizada de las instituciones federales [39]. Entró en vigor el 1 de abril
de 2019; la versión actual (modificada el 24 de junio de 2025) dio a los sistemas establecidos antes
de esa fecha hasta el 24 de junio de 2026 para cumplir con los nuevos requisitos, y la directiva se
revisa cada dos años [39]. Su núcleo:

- una **Evaluación de Impacto Algorítmico** (AIA) completada y publicada en el Portal de Gobierno
  Abierto antes de la producción, y actualizada cuando la funcionalidad o alcance cambian;
- requisitos escalados por el **nivel de impacto** de la AIA (I a IV), establecidos en el Apéndice
  C;
- notificación antes de decisiones a través de cada canal de servicio, en lenguaje claro, y una
  explicación significativa después de las decisiones;
- aseguramiento de calidad, incluyendo revisión por pares por expertos calificados con la revisión o
  un resumen publicado antes de la producción, y un Análisis Basado en Género Plus;
- opciones de recurso para impugnar la decisión, e informes publicados sobre efectividad y equidad
  [39].

La AIA es el ejemplo público más maduro de una evaluación de impacto que también es un artefacto
publicado y versionado; es un modelo directo para [FRIA-as-Code](/patterns/fria-as-code).

## India: directrices de gobernanza, sin ley de IA

India no tiene un estatuto específico de IA. MeitY publicó las
**Directrices de Gobernanza de IA de India** el 5 de noviembre de 2025, bajo la Misión IndiaAI [40].
Comprenden siete principios rectores ("sutras"), recomendaciones en seis pilares, un plan de acción
en cronogramas a corto, medio y largo plazo, y orientación práctica para la industria,
desarrolladores y reguladores [40]. El Secretario de MeitY describió la política como el uso de la
legislación existente siempre que sea posible [40]. Las obligaciones por lo tanto provienen de la
ley existente, notablemente la ley de tecnología de la información y protección de datos, que el
capítulo 19 cubre; cualquier enmienda específica de IA a las Reglas de TI, por ejemplo sobre
etiquetado de contenido sintético, debe verificarse su estado actual antes de ser mapeada
(verifica).

## Reino Unido: principios, reguladores y registros del sector público

El Reino Unido no tiene un estatuto de IA horizontal. Su enfoque, confirmado en la respuesta del
gobierno de febrero de 2024 al documento blanco de regulación de IA, son cinco principios
intersectoriales (seguridad, seguridad y robustez; transparencia y explicabilidad apropiadas;
equidad; responsabilidad y gobernanza; impugnabilidad y reparación) aplicados por reguladores
existentes dentro de sus competencias [41]. Si se ha introducido un proyecto de ley de IA de
frontera desde entonces debe verificarse antes de confiar en este párrafo (verifica). El resto del
panorama del Reino Unido es concreto:

- el **Instituto de Seguridad de IA** (renombrado del Instituto de Seguridad de IA en febrero
  de 2025) evalúa modelos de frontera [42];
- el **Estándar de Registro de Transparencia Algorítmica** (ATRS) es obligatorio para todos los
  departamentos gubernamentales y para organismos dependientes que entregan servicios públicos o de
  primera línea o interactúan directamente con el público; los registros se publican en un
  repositorio central [43];
- el **Código de Práctica de Ciberseguridad de IA** (31 de enero de 2025) establece principios de
  seguridad de referencia para sistemas de IA, con una guía de implementación [44] (el capítulo 08
  mapea por separado la línea de base ETSI para asegurar IA, EN 304 223);
- para decisiones significativas y únicamente automatizadas, la Ley de Datos (Uso y Acceso) de 2025
  reemplazó el Artículo 22 del RGPD del Reino Unido con los Artículos 22A a 22D, en vigor desde el 5
  de febrero de 2026 (ver [capítulo 08](/bok/regulatory-map#united-kingdom)) [45].

Un registro ATRS es una entrada de inventario escrita para el público. Un registro que ya contiene
campos de propósito, propietario, datos, supervisión humana y riesgo puede generar la mayoría de
ella.

## Italia: Ley 132/2025

Italia tiene una ley nacional de IA de alcance general que se sitúa junto a la Reglamento de IA de
la UE. La Ley No. 132 de 23 de septiembre de 2025, *Disposiciones y delegaciones al Gobierno sobre
inteligencia artificial*, fue publicada en la Gazzetta Ufficiale el 25 de septiembre de 2025 y entró
en vigor el 10 de octubre de 2025 [46]. Debe ser leída y aplicada consistentemente con el Reglamento
de IA de la UE (Artículo 1(2)) [46]. Las disposiciones que un ingeniero encontrará:

- **Menores.** El acceso a tecnologías de IA por niños menores de 14 años, y el tratamiento
  relacionado de datos personales, requiere el consentimiento del titular de la responsabilidad
  parental (Artículo 4(4)) [46].
- **Trabajo.** El empleador debe informar a los trabajadores cuando se utiliza IA, en los casos y de
  la manera que establecen las normas de transparencia existentes para sistemas automatizados
  (artículo 11(2)) [46].
- **Profesiones.** En las profesiones intelectuales la IA solo puede utilizarse para actividades
  instrumentales y de apoyo, y el profesional debe informar al cliente de qué sistemas de IA se
  utilizan (artículo 13) [46].
- **Autoridades.** AgID (la agencia digital) gestiona la innovación y la notificación y supervisión
  de los organismos de evaluación de la conformidad; ACN (la agencia de ciberseguridad) supervisa
  los sistemas de IA, incluidas inspecciones y sanciones; el Banco de Italia, CONSOB e IVASS siguen
  siendo autoridades de vigilancia del mercado para sus sectores (artículo 20) [46].
- **Derecho penal.** Un nuevo delito de difusión ilícita de imágenes, vídeos o voces generados o
  alterados por IA que causen daño injusto, punible con pena de uno a cinco años de prisión
  (artículo 26, que inserta el artículo 612-quater en el Código Penal) [46].

La ley también delega en el Gobierno la elaboración de normas adicionales; el texto consolidado en
Normattiva mostró una última actualización del 26 de junio de 2026 [46].

## España: AESIA, el espacio controlado de pruebas y un proyecto de ley

España tiene un supervisor de IA operativo, un espacio controlado de pruebas activo y un proyecto de
ley nacional sobre IA que no es ley.

- **El proyecto de ley.** El Consejo de Ministros aprobó, en primera lectura el 11 de marzo de 2025,
  el anteproyecto de ley para el buen uso y la gobernanza de la Inteligencia Artificial, con
  tramitación de urgencia; debía volver al Consejo de Ministros como proyecto de ley y luego ir a
  las Cortes Generales [47]. Según lo propuesto, establece el régimen de sanciones del Reglamento de
  IA de la UE dentro de los márgenes del Reglamento, trata el incumplimiento del etiquetado de
  ultrasuplantaciones como infracción grave, añade una potestad para retirar provisionalmente un
  sistema del mercado español tras un incidente grave, y asigna la supervisión: la agencia de
  protección de datos para los sistemas biométricos prohibidos y de gestión de fronteras y para los
  sistemas de alto riesgo de migración y asilo de las fuerzas de seguridad del Estado, el consejo
  del poder judicial para justicia, la junta electoral central para procesos democráticos, el Banco
  de España, la dirección de seguros y CNMV para sus sectores, y AESIA para el resto [47]. No había
  sido adoptado a fecha de 2026-09-24; verifica su fase parlamentaria antes de citarlo (verificar).
- **El espacio controlado de pruebas.** El Real Decreto 817/2023 estableció un entorno de pruebas
  controladas para el cumplimiento del Reglamento de IA (entonces propuesto) [48]; la primera
  convocatoria buscaba hasta 12 sistemas de alto riesgo para una prueba de un año [47].
- **Las guías.** AESIA publica 16 guías producidas en el piloto del espacio controlado de pruebas:
  dos guías introductorias, 13 guías técnicas (evaluación de la conformidad, gestión de la calidad,
  gestión de riesgos, supervisión humana, gobernanza de datos, transparencia, precisión, robustez,
  ciberseguridad, registro, vigilancia poscomercialización, gestión de incidentes, documentación
  técnica) y un manual de lista de verificación. No son vinculantes y son anteriores al Omnibus de
  IA, Reglamento (UE) 2026/1744, en vigor desde el 27 de julio de 2026 [68]. A fecha de 2026-09-24
  la página de AESIA aún dice que se actualizarán una vez aprobado el Omnibus, así que comprueba
  cada guía contra el Reglamento modificado [49].

Las guías son el conjunto de plantillas públicas más prácticas para los requisitos de alto riesgo de
la UE; el capítulo 18 mapea los artículos que implementan.

## Singapur: marcos modelo y AI Verify

Singapur regula la IA a través de marcos voluntarios y un kit de herramientas de pruebas, mantenidos
por IMDA y la Fundación AI Verify.

- El **Marco de Gobernanza de IA Modelo para IA Generativa** (mayo de 2024) establece dimensiones de
  gobernanza incluyendo pruebas, transparencia, notificación de incidentes, seguridad y procedencia
  del contenido [52].
- El **Marco de Gobernanza de IA Modelo para IA de Agentes** se lanzó en Davos el 22 de enero de
  2026 [50]; la versión actual 1.5 se publicó el 20 de mayo de 2026 y se actualizó el 5 de junio de
  2026 [51]. Tiene cuatro dimensiones: evaluar y acotar los riesgos por adelantado (casos de uso
  adecuados; límites y permisos por diseño); hacer que los humanos sean significativamente
  responsables (asignación de responsabilidad; supervisión significativa); implementar controles
  técnicos y procesos (en el diseño, antes del despliegue, y continuamente en el despliegue); y
  permitir la responsabilidad del usuario final [51].
- **AI Verify** es un marco de pruebas que evalúa un sistema de IA contra 11 principios de
  gobernanza reconocidos internacionalmente, con una extensión de IA generativa y herramientas de
  pruebas técnicas [53].

Las dos primeras dimensiones del marco de agentes son lo que este libro llama el
[Registro de Agentes](/patterns/agent-registry) e
[Identidad de Agentes y Credenciales Limitadas](/patterns/agent-identity-scoped-credentials); la
tercera es la [Eval Gate en CI](/patterns/eval-gate-in-ci) más monitorización en tiempo de
ejecución. El capítulo 23 sobre
[gobernanza de agentes](/bok/governing-agents#frameworks-written-for-agents) va más allá.

## Australia: ley existente y orientación voluntaria

Australia no tiene ley de IA. El **Plan Nacional de IA** del gobierno, publicado en diciembre de
2025, afirma que Australia tiene marcos legales existentes sólidos, en gran medida neutrales
respecto a la tecnología, que pueden aplicarse a la IA, y que el gobierno monitoreará y responderá
conforme surjan desafíos [54]. Establece un **Instituto de Seguridad de IA** para monitorear, probar
y compartir información sobre capacidades y riesgos emergentes y para asesorar a los reguladores
existentes, y construye herramientas de adopción sobre las seis prácticas esenciales de la
**Orientación para la Adopción de IA** [54]. Para el ingeniero, las obligaciones provienen de la ley
de privacidad, consumidor, discriminación y sector; las seis prácticas son una lista de verificación
razonable para un programa de gobernanza, no un deber de cumplimiento.

## Comparación de los regímenes

La comparación siguiente utiliza las preguntas que una función de gobernanza hace a cualquier ley
específica de IA. Cubre regímenes cuyo texto esta edición verificó; el Reglamento de IA de la UE es
el punto de referencia y se encuentra en el capítulo 18, que también mapea
[los mismos roles en todos los regímenes](/bok/eu-ai-act#the-same-roles-across-regimes) que la
columna Roles comprime. Un tratado internacional se sitúa junto a estos regímenes: la
[Convención Marco del Consejo de Europa](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225)
se trata en el capítulo 22, con su estado de ratificación.

| Régimen | Disparador de clasificación | Obligaciones principales | Notificación y supervisión humana | Modelos frontera o de uso general | Cumplimiento | Roles |
|---|---|---|---|---|---|---|
| Ley Básica de IA de Corea [1][2] | Áreas de alto impacto enumeradas más riesgo significativo; IA generativa | Gestión de riesgos, explicación, protección del usuario, documentos conservados cinco años; evaluación de impacto (mejor esfuerzo) | Notificación previa; etiquetas de salida; supervisor humano nombrado | Deberes de seguridad por encima de 10^26 FLOP y estado del arte | MSIT; multas hasta KRW 30M por tres incumplimientos; período de gracia | Operadores en desarrollo y uso; representante nacional |
| Colorado SB 26-189 [15] | ADMT en decisiones consecuentes | Documentación del desarrollador; registros tres años | Notificación; explicación en 30 días; revisión humana y reconsideración | Ninguno | Fiscal General; período de corrección; sin acción privada | Desarrollador e implementador |
| Texas TRAIGA [18] | Intenciones prohibidas; uso gubernamental y sanitario | Evitar usos prohibidos; responder a demandas investigativas | Divulgación por el gobierno y en sanidad | Ninguno | Fiscal General; sanciones civiles escalonadas; período de corrección | Desarrollador, implementador, gobierno |
| California SB 53 y SB 942 [19][21] | Computación e ingresos (frontera); base de usuarios (procedencia) | Marco frontera; informe de transparencia; procedencia y detección | Divulgaciones latentes y manifiestas | Desarrolladores frontera por encima de 10^26 operaciones | Fiscal General; hasta USD 1M por infracción (SB 53) | Desarrollador frontera; proveedor cubierto; plataforma |
| China, medidas antropomórficas [35] | Servicios de interacción emocional sostenida | Evaluación de seguridad; presentación de algoritmo; modo para menores | Señal de IA; recordatorio de dos horas; salida fácil | Ninguno específico | CAC y oficinas provinciales | Proveedor de servicios; tiendas de aplicaciones |
| Ley de Promoción de IA de Japón [31] | Ninguno (toda tecnología relacionada con IA) | Cooperación con medidas gubernamentales | Ninguno en la Ley | Ninguno | Sin sanciones; orientación tras investigación | Instituciones de investigación; operadores que utilizan |
| Ley italiana 132/2025 [46] | Disposiciones sectoriales además del Reglamento de IA de la UE | Información a trabajadores; divulgación profesional; consentimiento parental menores de 14 | Información a trabajadores y clientes | A través del Reglamento de IA de la UE | AgID y ACN; delito penal por ultrasuplantaciones dañinas | Empleador; profesional; proveedor |

## Normas sectoriales que ya alcanzan la IA

La ley específica de IA es solo la mitad del cuadro. Los regímenes sectoriales redactados antes, o
junto a, las leyes de IA ya vinculan muchos sistemas de IA, generalmente porque la IA se encuentra
dentro de un producto, un modelo financiero, un sistema TIC o una plataforma que regulan. El
capítulo 20 cubre la ley general (propiedad intelectual, no discriminación, protección del
consumidor, responsabilidad del producto); la tabla siguiente es la capa sectorial.

| Régimen | Disparador de IA | Deber | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| DORA, Reg. (UE) 2022/2554 (aplicable desde 2025-01-17) [55] | Los sistemas TIC de una entidad financiera o los servicios TIC de terceros incluyen IA | Gestión del riesgo TIC, incluyendo riesgo de terceros TIC, e informe de incidentes graves relacionados con TIC | Sistemas de IA en el inventario de activos TIC; proveedores de IA en el registro de terceros; canalización de incidentes usando la clasificación DORA | 2 · 4 · 5 |
| NIS2, Dir. (UE) 2022/2555 (transposición vencida 2024-10-17) [56] | Los sistemas de redes e información de una entidad esencial o importante incluyen IA | Gestión del riesgo de ciberseguridad; alerta temprana en 24 horas, notificación en 72 horas, informe final en un mes | Activos de IA en el alcance de seguridad; canalización de incidentes con el reloj NIS2 | 4 · 5 |
| Reglamento de Ciberresiliencia, Reg. (UE) 2024/2847 (informe desde 2026-09-11; deberes principales desde 2027-12-11) [57][58] | Un producto con elementos digitales que incluye componentes de IA | Seguridad por diseño y manejo de vulnerabilidades; informar de vulnerabilidades explotadas activamente e incidentes graves: 24 horas, 72 horas, informe final | SBOM y AIBOM; proceso de manejo de vulnerabilidades; manual de informe para la plataforma de informe único | 2 · 4 · 5 |
| Reglamento de Datos, Reg. (UE) 2023/2854 (aplicable desde 2025-09-12) [59] | Productos conectados y servicios relacionados cuyos datos entrenan o alimentan IA; IA entregada como servicio de procesamiento de datos | Acceso a datos y compartición para usuarios; cambio entre servicios de procesamiento de datos | Interfaz de acceso a datos y registro de compartición en la ficha de datos; plan de salida y cambio para la plataforma de IA | 2 · 5 |
| EU MDR e IVDR, con MDCG 2025-6 sobre su interacción con el Reglamento de IA (junio de 2025) [60] | Software de dispositivo médico que utiliza IA | Evaluación de conformidad del dispositivo; donde la IA también es de alto riesgo según el Reglamento de IA, ambos regímenes se aplican y las preguntas frecuentes de MDCG explican cómo encajan | Documentación técnica construida una vez para servir ambos regímenes; evaluación clínica o de rendimiento; plan de vigilancia poscomercialización | 3 · 5 |
| Orientación preliminar de la FDA sobre funciones de software de dispositivos habilitados con IA (enero de 2025; aún en borrador en la página de la FDA) [61] | Software de dispositivo habilitado con IA en una presentación de comercialización estadounidense | Documentación recomendada en todo el ciclo de vida del producto para respaldar la revisión de seguridad y eficacia | Descripción del modelo; informe de gestión y validación de datos; etiquetado; acompañamiento del desempeño poscomercialización | 3 · 5 |
| Gestión de riesgo de modelos estadounidense: SR 26-2 (2026-04-17), que sustituye a SR 11-7 [62] | Modelos, incluidos los de IA y ML, utilizados por organizaciones bancarias; más relevante por encima de USD 30 mil millones en activos | Gestión de riesgo de modelos basada en riesgos, adaptada al perfil de riesgo del modelo | Entrada del inventario de modelos; informe de validación; resultados de eval como evidencia de validación; acompañamiento del desempeño | 2 · 3 · 5 |
| PRA SS1/23 (efectiva 2024-05-17; versión revisada efectiva 2026-04-23) [63] | Modelos utilizados por bancos del Reino Unido, sociedades de crédito inmobiliario y empresas de inversión designadas por la PRA con aprobación de modelo interno para capital regulatorio | Cinco principios para un enfoque estratégico de la gestión de riesgo de modelos, comenzando con la identificación del modelo y la clasificación del riesgo del modelo | Inventario de modelos con niveles; registro de validación; registro de mitigantes de riesgo de modelo | 2 · 3 · 5 |
| ECOA y Regulation B; avisos de acción adversa de FCRA [64] | Una decisión de crédito tomada o respaldada por un algoritmo complejo | Razones principales específicas para acción adversa conforme a 12 CFR 1002.9; la Circular 2022-03 de la CFPB que dice que la complejidad no es excusa fue retirada el 12 de mayo de 2025, y la obligación de Regulation B se mantiene [71]. Los avisos de FCRA aplican cuando se utiliza un informe de consumidor (verificar el alcance por producto) | Generador de código de razón registrado con cada decisión; plantilla de aviso; eval que verifique que las razones son fieles al modelo | 3 · 4 · 5 |
| Directiva sobre trabajo en plataformas, Dir. (UE) 2024/2831 (transposición antes del 2 de dic. 2026, art. 29(1)) [65][70] | Plataformas de trabajo digital que utilizan acompañamiento automatizado o toma de decisiones | Transparencia de sistemas automatizados; acompañamiento por personal cualificado; derecho a impugnar decisiones automatizadas | Registro de gestión algorítmica; información dirigida a trabajadores; cola de revisión humana con registro de decisiones; EIPD | 2 · 4 · 5 |
| Menores y seguridad en línea: directrices del art. 28 de la DSA (2025-07-14); obligaciones sobre menores de la Ley de Seguridad en Línea del Reino Unido; leyes sobre chatbots acompañantes [66][67][24][27][35] | Servicios que es probable que utilicen menores, incluidos chat de IA y acompañantes | Medidas de protección proporcionadas; evaluación de riesgo para menores; recordatorios y derivación en crisis | Señal de verificación de edad; configuración de modo para menores; evaluación de riesgo para menores; registros de recordatorio y derivación | 1 · 4 · 5 |

Dos de estas filas cambiaron lo suficientemente recientemente como para sorprender a un equipo que
miró por última vez en 2025. Los organismos reguladores bancarios estadounidenses reemplazaron SR
11-7, el texto de referencia de «gestión de riesgo de modelos» durante quince años, con SR 26-2 el
17 de abr. de 2026 [62]; las referencias a «SR 11-7» en las políticas de gobernanza de modelos ahora
deben apuntar a la orientación revisada. Y las obligaciones de notificación de la Ley de
Ciberresiliencia comenzaron el 11 de sep. de 2026 [57].

### Relojes de incidentes entre regímenes

Un incidente de IA puede iniciar varios relojes a la vez. El patrón
[Incident Pipeline](/patterns/incident-pipeline) debe mantener cada reloj como datos, indexado por
el régimen y el desencadenante, de modo que una decisión de triaje se expanda a cada informe que
vence. El capítulo 17 trata la [respuesta a incidentes](/bok/incidents#the-overlapping-clocks) en su
totalidad.

| Régimen | Desencadenante | Reloj | Destinatario |
|---|---|---|---|
| NIS2 [56] | Incidente significativo | Aviso anticipado de 24 h; notificación de 72 h; informe final en un mes | CSIRT o autoridad competente |
| Ley de Ciberresiliencia [58] | Vulnerabilidad explotada activamente o incidente grave | Aviso anticipado de 24 h; notificación de 72 h; informe final 14 días después de una corrección (vulnerabilidades) o un mes (incidentes) | Plataforma de notificación única |
| DORA [55] | Incidente grave relacionado con las TIC | Notificación inicial en el plazo de 4 h desde la clasificación del incidente como grave y no más tarde de 24 h desde la toma de conocimiento; informe intermedio en el plazo de 72 h desde la notificación inicial; informe final en el plazo de un mes desde el último informe intermedio (Reglamento delegado (UE) 2025/301, art. 5) [69] | Autoridad financiera competente |
| California SB 53 [19] | Incidente crítico de seguridad | 15 días; 24 h si la muerte o lesión grave es inminente | Oficina de Servicios de Emergencia; autoridad apropiada para el caso de 24 horas |
| Nueva York RAISE [25][26] | Incidente crítico de seguridad | 72 h; 24 h si la muerte o lesión física grave es inminente | Oficina de supervisión dentro del Departamento de Servicios Financieros; organismo de aplicación de la ley o seguridad pública para el caso de 24 horas |
| Ley Básica de IA de Corea [1] | Deberes de seguridad para sistemas de alto cómputo | Sin reloj fijo; resultados de las medidas de seguridad presentados a MSIT | MSIT |
| Reglamento de IA, art. 73 | Incidente grave (alto riesgo) | Véase la [tabla de reloj en el capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus) | Autoridad de vigilancia del mercado |

> **En la práctica (ilustrativo)**
> Una empresa de pagos ejecutaba un modelo de puntuación de fraude dentro de una plataforma que era
> un servicio TIC conforme a DORA, una entidad importante conforme a SRI 2 y, a través de sus
> dispositivos de punto de venta, un producto CRA. Cuando una ruta de inyección de prompts en su
> agente de soporte expuso datos de tarjetas, el conducto de incidentes abrió un ticket y tres
> informes dirigidos a reguladores desde la misma línea de tiempo, cada uno con su propio reloj y
> plantilla. Lo que lo hizo funcionar no fue el modelo: fue un registro que ya etiquetaba el agente
> con los tres regímenes, y un almacén de evidencia que permitía que cada informe citara los mismos
> registros firmados.

## Lo que puedes hacer esta semana

1. **Añade un bloque de jurisdicción a cada entrada del registro.** Lista dónde se ofrece cada
   sistema, y para cada lugar registra el valor de estado (binding-horizontal, binding-targeted,
   voluntary, bill), el veredicto de clasificación y la plantilla de aviso en vigor. Comienza con la
   prueba de alto impacto de Corea y la prueba de decisión consecuente de Colorado; cubren la
   mayoría de sistemas de contratación y préstamos.
2. **Comprueba los umbrales de representante doméstico coreano.** Extrae los ingresos del año pasado
   de servicios de IA y el promedio diario de usuarios de tres meses para Corea; si alguno cruza la
   línea del decreto, designa un representante y dale una vista de evidencia de solo lectura antes
   de que termine el período de orientación.
3. **Convierte los relojes de incidentes en datos.** Pon los relojes de SRI 2, CRA, DORA, SB 53,
   RAISE y artículo 73 del Reglamento de IA en una tabla indexada por desencadenante, y haz que el
   conducto de incidentes la lea. Pruébalo con un incidente de mesa que afecte a dos regímenes.
4. **Reemplaza «SR 11-7» en tu política de gobernanza de modelos.** Apúntalo a SR 26-2 y re-nivela
   tu inventario de modelos contra la orientación revisada basada en riesgos.
5. **Haz que la ficha de modelo responda las preguntas de Texas.** Propósito, tipos de datos de
   entrenamiento, categorías de entrada y salida, métricas de desempeño, límites conocidos y
   acompañamiento posterior a la implementación: los ocho elementos que el Fiscal General de Texas
   puede exigir son un mínimo bueno para cualquier ficha de modelo.

**Correspondencias:** Ley Básica de IA de Corea, arts. 2, 4, 31–36, 40, 43 y Decreto de Ejecución,
arts. 23–29 · OMB M-25-21 §4 y M-26-04 · EO 14365 · Colorado SB 26-189 · Texas HB 149 · California
SB 53, SB 942 y AB 853, AB 2013, SB 243 y regulaciones ADMT de CPPA · Nueva York RAISE y GBL art. 47
· Utah AI Policy Act · Illinois HB 3773 · NYC Local Law 144 · Japan Act No. 53 of 2025 · Medidas de
interacción antropomórfica de CAC · Directiva canadiense sobre toma de decisiones automatizada ·
Italy Law 132/2025 · Singapore Model AI Governance Frameworks y AI Verify · DORA · SRI 2 · Ley de
Ciberresiliencia · Reglamento de Datos · MDR e IVDR · SR 26-2 · PRA SS1/23 · Regulation B ·
Directiva sobre trabajo en plataformas · DSA art. 28 · las cinco capas del stack
([Gobernanza como código](/bok/the-stack#layer-01-govern-as-code) a
[Aseguramiento y Cumplimiento Continuo](/bok/the-stack#layer-05-assurance--continuous-compliance)).
Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; as amended by Act No. 21311 of 2026-01-20, in force 2026-01-22 and, for Arts. 3(5), 16(3)-(5), 17-2, 18, 22-3 and the second sentence of 35(1), 2026-07-21; Arts. 2(4) high-impact areas, 2(7) operators, 4 scope, 31 transparency, 32 safety, 33 confirmation, 34 high-impact duties, 35 impact assessment, 36 domestic representative, 40 fact-finding, 43 fines up to KRW 30M; version in force 2026-07-21). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[2] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22; as amended by Presidential Decree No. 36506 of 2026-07-20, in force 2026-07-21, and No. 36580, in force 2026-08-20; Art. 1-2 AI-vulnerable groups, Art. 15(4) confirmation of AI products for public procurement, Art. 23 notice and labelling methods, Art. 24 10^26 FLOP and two further criteria, Art. 25 confirmation procedure and 30-day reply, Art. 27 publication and five-year retention, Art. 28 impact-assessment content, Art. 29 domestic-representative thresholds; version in force 2026-08-20). Korean Law Information Center (MOLEG). 2026-08-18. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=288781&efYd=20260820 (verified: primary)
[3] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations; AI Basic Act help desk). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[4] "AI기본법 시행령 7월 시행, 공공조달 AI 확인 제도 핵심 정리" (decree amendment in force 2026-07-21: public-procurement AI confirmation system, liability exemption for adopting officials, AI-vulnerable groups widened to job seekers and women with career breaks, support measures). Korea Data Economy News (한국데이터경제신문). 2026-07-20. https://www.dataeconomy.co.kr/news/articleView.html?idxno=41346 (verified: secondary)
[5] Executive Order 14179, Removing Barriers to American Leadership in Artificial Intelligence (signed 2025-01-23; review of actions taken under the revoked EO 14110; AI action plan within 180 days). Federal Register, Vol. 90, No. 20 (via GovInfo). 2025-01-31. https://www.govinfo.gov/content/pkg/FR-2025-01-31/html/2025-02172.htm (verified: primary)
[6] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (rescinds M-24-10; high-impact AI definition; minimum practices §4(b); 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[7] "White House Releases New Policies on Federal Agency AI Use and Procurement" (M-25-21 and M-25-22, Driving Efficient Acquisition of Artificial Intelligence in Government). The White House. 2025-04-07. https://www.whitehouse.gov/releases/2025/04/white-house-releases-new-policies-on-federal-agency-ai-use-and-procurement/ (verified: primary)
[8] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (implements EO 14319 of 2025-07-23; policies updated by 2026-03-11; minimum LLM transparency: acceptable use policy, model/system/data cards, end-user resources, feedback mechanism). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[9] Winning the Race: America's AI Action Plan (three pillars; funding and state AI regulatory climate; FCC evaluation; NIST AI RMF revision). The White House. 2025-07. https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf (verified: primary)
[10] Executive Order 14365, Ensuring a National Policy Framework for Artificial Intelligence (signed 2025-12-11; §3 AI Litigation Task Force in 30 days; §4 Commerce evaluation in 90 days; §5 BEAD and grant conditions; §6 FCC; §7 FTC policy statement; §8 legislative recommendation and carve-outs). Federal Register, Vol. 90, No. 239 (via GovInfo). 2025-12-16. https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm (verified: primary)
[11] National Policy Framework for Artificial Intelligence: Legislative Recommendations (non-binding; preempt unduly burdensome state AI laws; keep generally applicable child-protection, anti-fraud and consumer laws). The White House. 2026-03-20. https://www.whitehouse.gov/wp-content/uploads/2026/03/03.20.26-National-Policy-Framework-for-Artificial-Intelligence-Legislative-Recommendations.pdf (verified: primary)
[12] "Navigating the Emerging Federal-State AI Showdown: DOJ Establishes AI Litigation Task Force" (task force announced by the Attorney General on 2026-01-09). BakerHostetler. 2026-01-20. https://www.bakerlaw.com/insights/navigating-the-emerging-federal-state-ai-showdown-doj-establishes-ai-litigation-task-force/ (verified: secondary)
[13] "FTC Seeks Public Comment on Policy Statement Addressing AI Accuracy" (proposed Section 5 policy statement; Colorado AI Act discussed as possibly impliedly preempted; comments to 2026-07-31). Federal Trade Commission. 2026-07-01. https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy (verified: primary)
[14] "Lawmakers propose AI framework that would preempt state laws for 3 years" (Obernolte and Trahan discussion draft, Great American Artificial Intelligence Act of 2026). Nextgov/FCW. 2026-06-04. https://www.nextgov.com/artificial-intelligence/2026/06/lawmakers-propose-ai-framework-would-preempt-state-laws-3-years/413975/ (verified: secondary)
[15] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; developer documentation, deployer notice, 30-day explanation, human review, three-year records; Attorney General enforcement with 60-day cure). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[16] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 2026-06-30, then replaced by SB 26-189; xAI suit filed 2026-04-09; DOJ companion complaint 2026-04-24; stipulated order of 2026-04-27 pausing enforcement). McDermott Will & Emery. 2026-05-27. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[17] "DOJ Intervenes in Lawsuit Challenging Colorado's 'Algorithmic Discrimination' Law" (developer suit filed 2026-04-09 in the District of Colorado; DOJ complaint on Equal Protection grounds). Barnes & Thornburg. 2026-05-01. https://btlaw.com/en/insights/alerts/2026/doj-intervenes-in-lawsuit-challenging-colorados-algorithmic-discrimination-law (verified: secondary)
[18] Texas Responsible Artificial Intelligence Governance Act (HB 149, enrolled; effective 2026-01-01; §552.051 disclosure, §§552.052–552.057 prohibitions, §552.101 no private right of action, §552.103 civil investigative demand items, §552.104 60-day cure, §552.105 penalties, 36-month sandbox). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[19] SB-53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; chaptered 2025-09-29, Chapter 138; 10^26 operations; USD 500M revenue; frontier AI framework; transparency report; incident reports to OES in 15 days or 24 hours; up to USD 1M per violation; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53 (verified: primary)
[20] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; transparency reports by all frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[21] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01; s. 22757.4 civil penalty USD 5,000 per violation, each day a discrete violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[22] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01; exemptions). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[23] "California Finalizes Regulations to Strengthen Consumers' Privacy" (ADMT, risk-assessment and cybersecurity-audit regulations approved 2025-09-23; effective 2026-01-01; ADMT from 2027-01-01; attestations from 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[24] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; three-hour reminders for known minors; self-harm protocol; reports from 2027-07-01; private right of action, at least USD 1,000 per violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[25] NY State Senate Bill 2025-S6953B (RAISE Act as signed 2025-12-19: frontier models above 10^26 operations costing over USD 100M; safety protocols; 72-hour incident disclosure; thresholds and the reporting recipient superseded by the chapter amendment signed 2026-03-27, which uses 10^26 operations, USD 500M revenue for large frontier developers and a DFS office, see [26]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[26] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment S8828 signed 2026-03-27; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; all frontier developers report critical safety incidents within 72 hours to a new DFS office, or within 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[27] New York General Business Law Article 47, Artificial Intelligence Companion Models (§1701 self-harm protocol; §1702 notice at start and every three hours; §1703 Attorney General, up to USD 15,000 per day). New York State Senate. 2026. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[28] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; regulated occupations; safe harbour; effective 2025-05-07; AI Policy Act repeal date 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[29] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; IDHR draft rules; Human Rights Act remedies). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[30] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[31] Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (人工知能関連技術の研究開発及び活用の推進に関する法律; Act No. 53 of 2025, promulgated 2025-06-04; Arts. 7, 13, 16, 18; no penalties). e-Gov Law Search (Digital Agency). 2025-06-04. https://laws.e-gov.go.jp/law/507AC0000000053 (verified: primary)
[32] AI Act page (promulgated and partly in force 2025-06-04; fully in force 2025-09-01). Cabinet Office of Japan. 2025. https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html (verified: primary)
[33] AI Basic Plan (Cabinet decisions of 2025-12-23 and 2026-07-14). Cabinet Office of Japan. 2026-07-14. https://www8.cao.go.jp/cstp/ai/ai_plan/ai_plan.html (verified: primary)
[34] Guidelines on ensuring the appropriateness of research, development and use of AI-related technologies (AI Strategy Headquarters decision of 2025-12-19). Cabinet Office of Japan. 2025-12-19. https://www8.cao.go.jp/cstp/ai/ai_guideline/ai_guideline.html (verified: primary)
[35] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; Art. 2 scope; Art. 14 minors; Art. 18 labelling and two-hour reminder; Art. 19 exit; Art. 22 security assessment incl. 1M registered or 100k monthly active users; Art. 26 filing; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[36] PL 2338/2023, Marco Legal da Inteligência Artificial (introduced 2023-05-03; approved by the Senate plenary 2024-12-10; sent to the Chamber of Deputies). Federal Senate of Brazil. 2025-03-17. https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 (verified: primary)
[37] PL 2338/2023 in the Chamber of Deputies (received 2025-03-17; special committee created 2025-04-04; priority regime; awaiting report as of the 2026-09-02 entry). Câmara dos Deputados. 2026-09-02. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 (verified: primary)
[38] C-27 (44-1), Digital Charter Implementation Act, 2022 (enacting the Artificial Intelligence and Data Act; session ended 2025-01-06). LEGISinfo, Parliament of Canada. 2025. https://www.parl.ca/legisinfo/en/bill/44-1/c-27 (verified: primary)
[39] Directive on Automated Decision-Making (effective 2019-04-01; modified 2025-06-24; existing systems to comply by 2026-06-24; AIA, Appendix C impact levels, notice, explanation, peer review, GBA Plus, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[40] "MeitY Unveils India AI Governance Guidelines under IndiaAI Mission" (seven sutras, six pillars, action plan; existing legislation wherever possible). Press Information Bureau, Government of India. 2025-11-05. https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639 (verified: primary)
[41] A pro-innovation approach to AI regulation: government response (CP 1019; five cross-sector principles applied by existing regulators). Department for Science, Innovation and Technology. 2024-02-06. https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response (verified: primary)
[42] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[43] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[44] AI Cyber Security Code of Practice (code and implementation guide). Department for Science, Innovation and Technology. 2025-01-31. https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice (verified: primary)
[45] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 2026-02-05). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[46] Legge 23 settembre 2025, n. 132, Disposizioni e deleghe al Governo in materia di intelligenza artificiale (GU Serie Generale n. 223 of 2025-09-25; in force 2025-10-10; Arts. 1(2), 4(4), 11(2), 13, 20, 26; consolidated text last updated 2026-06-26). Gazzetta Ufficiale / Normattiva. 2025-09-25. https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg (verified: primary)
[47] Referencia del Consejo de Ministros, 11 March 2025 (Anteproyecto de Ley para el buen uso y la gobernanza de la Inteligencia Artificial, first reading, urgent processing; sanctions, deepfake labelling, provisional withdrawal, authorities; sandbox call for up to 12 systems). La Moncloa. 2025-03-11. https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx (verified: primary)
[48] Real Decreto 817/2023, de 8 de noviembre, entorno controlado de pruebas (AI regulatory sandbox). Boletín Oficial del Estado. 2023-11-09. https://www.boe.es/eli/es/rd/2023/11/08/817 (verified: primary)
[49] Guías (16 guides from the Spanish AI regulatory sandbox pilot; non-binding; the page still says they will be updated once the digital Omnibus is approved, as of 2026-09-24). AESIA. 2026. https://aesia.digital.gob.es/es/guias (verified: primary)
[50] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[51] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20, updated 2026-06-05; four dimensions). IMDA. 2026-06-05. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[52] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[53] AI Verify Testing Framework (11 internationally recognised AI governance principles; generative-AI update). AI Verify Foundation. 2026. https://aiverifyfoundation.sg/what-is-ai-verify/ (verified: primary)
[54] National AI Plan, "Keep Australians safe" (existing technology-neutral frameworks; AI Safety Institute; six essential practices of the Guidance for AI Adoption; published December 2025; opened via the Internet Archive). Department of Industry, Science and Resources. 2025-12. https://www.industry.gov.au/publications/national-ai-plan/keep-australians-safe (verified: primary)
[55] Digital Operational Resilience Act (DORA) (entered into force 2023-01-16; applies from 2025-01-17; ICT and ICT third-party risk; reporting of major ICT-related incidents). European Securities and Markets Authority. 2025. https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora (verified: primary)
[56] NIS2 Directive: questions and answers (transposition by 2024-10-17; early warning 24 hours, notification 72 hours, final report within one month). European Commission. 2024. https://digital-strategy.ec.europa.eu/en/faqs/directive-measures-high-common-level-cybersecurity-across-union-nis2-directive-faqs (verified: primary)
[57] Cyber Resilience Act (in force 2024-12-10; reporting obligations from 2026-09-11; main obligations from 2027-12-11; guidance of 2026-07-27). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act (verified: primary)
[58] Cyber Resilience Act: reporting obligations (24-hour early warning, 72-hour notification, final report 14 days after a corrective measure or one month for severe incidents; single reporting platform). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cra-reporting (verified: primary)
[59] Data Act (in force 2024-01-11; applies from 2025-09-12; access to data from connected products; switching between cloud providers). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/policies/data-act (verified: primary)
[60] MDCG 2025-6, FAQ on interplay between the MDR and IVDR and the Artificial Intelligence Act (how the device regulations and the AI Act apply together; listed on the Commission's MDCG guidance page). Medical Device Coordination Group (European Commission). 2025-06. https://health.ec.europa.eu/document/download/b78a17d7-e3cd-4943-851d-e02a2f22bbb4_en?filename=mdcg_2025-6_en.pdf (verified: primary)
[61] Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations (draft guidance; docket FDA-2024-D-4488). US Food and Drug Administration. 2025-01-07. https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing (verified: primary)
[62] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant above USD 30B in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[63] SS1/23, Model risk management principles for banks (published 2023-05-17; effective 2024-05-17; revised version effective 2026-04-23; scope: banks, building societies and PRA-designated investment firms with internal-model approval; five principles). Prudential Regulation Authority (Bank of England). 2026-04. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[64] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[65] "Platform workers: Council adopts new rules to improve their working conditions" (algorithmic management transparency; monitoring by qualified staff; right to contest; two years to transpose). Council of the European Union. 2024-10-14. https://www.consilium.europa.eu/en/press/press-releases/2024/10/14/platform-workers-council-adopts-new-rules-to-improve-their-working-conditions/ (verified: primary)
[66] "Commission publishes guidelines on the protection of minors" (DSA Art. 28 guidelines). European Commission. 2025-07-14. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors (verified: primary)
[67] Online Safety Act: explainer (children's risk assessments due 2025-07-24; child-safety regime in effect from summer 2025). Department for Science, Innovation and Technology. 2025-04-24. https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer (verified: primary)
[68] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[69] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5: initial notification within 4 hours of classification and 24 hours of awareness; intermediate within 72 hours; final within one month). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[70] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 29(1): transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[71] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
