# bok-incidents Specification

## Purpose
El capítulo 17 del Body of Knowledge explica la gestión de incidentes de IA de extremo a extremo con
la voz de ingeniería del libro: cada deber o práctica atado al artefacto que lo evidencia, a la capa
del stack que lo produce y al registro de evidencia, con los relojes de notificación de varios
regímenes en una sola vista.

## Requirements

### Requirement: Capítulo 17 completo con estructura de la casa
El fichero `bok/17-incidents.md` SHALL conservar el H1 «# 17. Incidents, issues and root causes» y
una entradilla en blockquote de una o dos líneas, y SHALL contener secciones H2 estables para
definiciones, escala de severidad, ciclo de respuesta, playbooks y simulacros, modos de fallo, análisis
de causa raíz, CAPA, deberes del deployer, relojes superpuestos, registro de incidente y bases de
datos públicas, seguidas de «## What you can do this week» (de tres a cinco acciones), una línea
«**Maps to:**» con la frase «Mappings are illustrative, not a claim of conformity» y «## Sources».
El texto MUST NOT contener el carácter raya larga (U+2014).

#### Scenario: El capítulo se publica en su ruta
- **WHEN** se construye el sitio
- **THEN** `/bok/incidents` muestra el capítulo con su entradilla, las tablas GFM y los callouts
  «In practice» y «Example (illustrative)» renderizados como `aside.callout`

#### Scenario: Content-lint en verde
- **WHEN** se ejecuta `content-lint` sobre `dist`
- **THEN** no hay ninguna raya larga ni ancla `#src-n` colgante en la página del capítulo

### Requirement: Definiciones que separan severidad y notificabilidad
El capítulo SHALL definir AI incident y AI hazard según la OCDE, serious incident según `Art. 3(49)`
del AI Act y widespread infringement según `Art. 3(61)`, y SHALL añadir las definiciones de la casa
de issue y near miss, con una tabla que indique para cada término si hay daño y si arranca un reloj
legal. El capítulo MUST tratar la severidad (escala interna) y la notificabilidad (test por régimen)
como decisiones separadas.

#### Scenario: Lector distingue incidente de incidencia
- **WHEN** un lector consulta la tabla de términos
- **THEN** ve que un issue no es un evento ni arranca reloj, y que un serious incident sí lo arranca
  para proveedores de alto riesgo y de GPAI con riesgo sistémico

### Requirement: Escala de severidad mapeada a los relojes
El capítulo SHALL presentar una escala ilustrativa SEV-1 a SEV-4 más «Issue», con un test de daño por
nivel, la clase del `Art. 73` que puede activar (2, 10 o 15 días), el valor de severidad del marco
común de la OCDE y una respuesta por defecto, y SHALL mostrar cómo expresar la escala como política
ejecutable.

#### Scenario: Plazos del Art. 73 verificados
- **WHEN** la escala o la tabla de relojes cita un plazo del `Art. 73`
- **THEN** el plazo coincide con el texto del Reglamento (UE) 2024/1689 (2 días para widespread
  infringement o infraestructura crítica, 10 días por muerte, 15 días en los demás casos, contados
  desde el conocimiento) y lleva la cita [n] correspondiente

### Requirement: Ciclo de respuesta con preservación de evidencia
El capítulo SHALL describir las fases detectar, clasificar, contener, erradicar, recuperar y revisión
posterior, con el registro de evidencia y la capa de cada fase y su correspondencia con NIST SP
800-61r3, y SHALL incluir un paso de preservación de evidencia previo a la erradicación que refleje la
prohibición del `Art. 73(6)` de alterar el sistema antes de informar a las autoridades.

#### Scenario: El paso «freeze before you fix» es accionable
- **WHEN** un lector sigue la subsección de preservación
- **THEN** encuentra la lista de artefactos que congelar (versión de modelo, prompt, políticas,
  índice de recuperación, trazas) y los plazos de conservación citados (seis meses del `Art. 26(6)`,
  cinco años del Compromiso 9)

### Requirement: Causa raíz, taxonomía de causas y CAPA
El capítulo SHALL describir la junta de revisión de incidentes, los cinco porqués, el análisis de
árbol de fallos (IEC 61025) y el post-mortem sin culpa, y SHALL incluir una taxonomía de causas en la
que cada clase nombre el control, la capa y el patrón del capítulo 05 que debió detectarla. El
capítulo SHALL describir el CAPA con enlace bidireccional entre incidentes y riesgos y con una
regresión añadida al eval gate.

#### Scenario: Cada clase de causa apunta a un patrón existente
- **WHEN** se hace clic en el patrón de cualquier fila de la taxonomía
- **THEN** el enlace resuelve a un ancla `#pattern-*` existente en `/bok/patterns`

### Requirement: Deberes del deployer del Art. 26(5)
El capítulo SHALL explicar los deberes del deployer de sistemas de alto riesgo de informar al
proveedor y a la autoridad, suspender el uso ante un riesgo y avisar primero al proveedor ante un
incidente grave, incluida la aplicación del `Art. 73` al deployer si no localiza al proveedor, y
SHALL asociar cada deber a un artefacto y a una capa.

#### Scenario: Suspensión como control probado
- **WHEN** un lector consulta la tabla de deberes del deployer
- **THEN** la fila «Suspend use» nombra una ruta de suspensión probada para un sistema adquirido y la
  capa 04

### Requirement: Tabla única de relojes superpuestos
El capítulo SHALL contener una tabla con quién notifica, disparador, primer informe, seguimiento e
informe final y destinatario para el `Art. 73`, el `Art. 26(5)`, el `Art. 55(1)(c)` con el Compromiso
9 del Código de Buenas Prácticas GPAI, GDPR Arts. 33 y 34, NIS2 Art. 23, DORA Art. 19 con el RTS
2025/301, CRA Art. 14, California SB 53, el RAISE Act de Nueva York y el marco común de la OCDE, con
fecha «as of 2026-09-24». Las afirmaciones no confirmadas MUST ir matizadas y marcadas «(verify)».

#### Scenario: Cambios pendientes declarados
- **WHEN** un lector lee «Dates are moving»
- **THEN** ve que los plazos del `Art. 73` no cambiaron con el Omnibus, que existe el `Art. 75(1a)`,
  que la guía final del `Art. 73` está por confirmar y que la propuesta de Omnibus digital sobre GDPR
  está presentada pero no adoptada

### Requirement: Registro de incidente alineado con la Comisión y la OCDE
El capítulo SHALL definir los grupos de campos del registro de incidente y SHALL mapearlos por nombre
a los diez campos de la plantilla de la Comisión para incidentes graves de GPAI (4 nov 2025) y a los
criterios del marco común de notificación de la OCDE, sin reproducir texto de normas ISO/IEC.

#### Scenario: Un registro, varios informes
- **WHEN** un lector llega a la sección de relojes y al registro
- **THEN** encuentra un ejemplo JSON ilustrativo con un reloj por régimen, cada uno con su
  disparador, vencimiento, estado y, si no aplica, su justificación

### Requirement: Fuentes numeradas y verificadas
Toda afirmación factual, legal o numérica del capítulo SHALL llevar un marcador `[n]` que exista en
`## Sources` con el formato «[n] Title (gloss). Publisher. Date. URL (verified: primary|secondary|
reported)». El capítulo MUST NOT citar ni mencionar guías comerciales de estudio de certificaciones
ni productos privados.

#### Scenario: Citas completas
- **WHEN** se comparan los marcadores del texto con la lista de fuentes
- **THEN** cada marcador tiene su fuente y cada fuente se cita al menos una vez
