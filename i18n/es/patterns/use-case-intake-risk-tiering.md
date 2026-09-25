---
lang: es
source: bok/patterns/use-case-intake-risk-tiering.md
sourceHash: "350f07d369530791c00bd8f00f0e4131487f6317a6073ddfc68d8c3c121dac53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: use-case-intake-risk-tiering
title: "Use-Case Intake & Risk Tiering"
layer: 1
secondaryLayer: 2
order: 18
summary: "Una ruta de entrada para cada caso de uso de IA: un registro de caso de uso estructurado, un nivel calculado a partir de su perfil de riesgo, y las puertas que ese nivel activa."
---

# Patrón: Use-Case Intake & Risk Tiering

**Resumen:** Encamina cada caso de uso de IA propuesto, construido o comprado, a través de una
entrada única que escribe un registro de caso de uso estructurado, lo analiza contra prácticas
prohibidas y la escala de riesgo del Reglamento de IA, y calcula un nivel de riesgo interno a partir
de campos de perfil declarados. El nivel, no una reunión, decide qué evaluaciones, evals y
aprobaciones debe superar el sistema antes de su lanzamiento, y el registro se convierte en la
entrada de registro que cada puerta posterior lee.

## Objetivos
Haz que la primera decisión sobre un sistema de IA sea una grabada y reproducible: para qué sirve,
para qué no debe usarse, cuán arriesgado es y, a partir de eso, cuánta gobernanza recibe. Dedica
esfuerzo de revisión donde está el riesgo y deja pasar rápidamente los casos de uso de bajo riesgo
por una ruta establecida.

## Usuarios objetivo
Ingeniero de gobernanza de IA, propietario del producto, equipo de plataforma, revisores legales y
de privacidad.

## Partes interesadas afectadas
Personas afectadas por los resultados del sistema, responsables del despliegue y operadores, comité
de gobernanza de IA, auditores, autoridades de vigilancia del mercado.

## Principios relevantes
Construye el control en el punto más temprano en el que puede bloquear; haz que la ruta gobernada
sea la más fácil; registra y delimita cada actor antes de que actúe.

## Contexto
Una organización donde muchos equipos proponen características de IA, y la mayoría de ellos compran
o llaman modelos en lugar de entrenarlos. Las solicitudes llegan por correo electrónico, en
presentaciones y en tickets de compras, y cada una se revisa con las preguntas que el revisor
recuerda. El Reglamento de IA mide la mayoría de deberes contra la **finalidad prevista**, que
define como incluida el contexto y las condiciones de uso indicadas en las instrucciones de
utilización, "materiales y declaraciones promocionales o de ventas" y la documentación técnica
(`Art. 3(12)`) [1]. El NIST AI RMF pide que las finalidades previstas y los parámetros sean
"entendidos y documentados" (MAP 1.1) y que las tolerancias de riesgo sean "determinadas y
documentadas" (MAP 1.5) [2].

## Problema
Sin una entrada única, la gobernanza comienza demasiado tarde y se escala mal.

- **Fuerzas.** Los revisores quieren que cada caso de uso se evalúe en profundidad; los equipos
  quieren una respuesta en días. La clasificación depende de hechos que solo el equipo conoce: la
  finalidad, las personas afectadas, si el sistema perfila a personas. Un nivel negociado en una
  reunión se desvía con quienquiera que asista. Un nivel que no es legible por máquina no puede
  activar una puerta.
- **Modo de fallo.** Un caso de alto riesgo se cuela como "solo una prueba piloto" mientras que las
  solicitudes de bajo riesgo se colan detrás. Nadie puede mostrar qué sistemas fueron clasificados,
  por quién, en qué hechos, o por qué un sistema del Anexo III fue tratado como no de alto riesgo.

## Solución
Construye la entrada como una ruta de formulario más código que termina en un registro y un nivel,
no en minutos.

1. **Captura el registro del caso de uso.** Un formulario estructurado corto (finalidad prevista,
   usos fuera de alcance, usuarios y personas afectadas, autoridad de decisión, métricas de éxito,
   apetito de error, fuentes de datos, jurisdicciones) escribe un registro de registro con clave a
   un id. Reutiliza el
   [esquema de registro de caso de uso](/resources/templates#schema-use-case-record) publicado
   (`use-case-record.v1`) para que el formulario, el registro y las puertas compartan una forma.
2. **Analiza antes de puntuar.** Ejecuta primero el análisis de prácticas prohibidas (`Art. 5`): un
   resultado se bloquea en la entrada y nunca se clasifica. Luego coloca el sistema en la escala del
   Reglamento: un uso del Anexo III, con el filtro `Art. 6(3)` y su anulación (un sistema del Anexo
   III que perfila a personas físicas siempre es de alto riesgo), deberes de transparencia, o un
   modelo de uso general. Un proveedor que se basa en el filtro debe documentar su evaluación antes
   de colocar el sistema en el mercado y registrarlo (`Art. 6(4)`, `Art. 49(2)`) [1]; el registro de
   entrada es esa documentación. El Omnibus Digital trasladó las obligaciones de alto riesgo del
   Anexo III al 2 de diciembre de 2027 [3]: eso cambia cuándo los deberes tienen efecto, no si la
   clasificación se registra ahora.
3. **Calcula el nivel interno.** Declara campos de perfil (autonomía, impacto de decisión,
   exposición, reversibilidad del peor resultado, grupos vulnerables, clase de datos, dependencia de
   terceros) y deja que una política versionada calcule el nivel. El AI RMF establece el nivel de
   actividad de gestión de riesgos por tolerancia de riesgo (GOVERN 1.3) y pide la probabilidad y
   magnitud de cada impacto identificado (MAP 5.1) [2]. La Directiva de Canadá sobre Toma de
   Decisiones Automatizada aplica la misma idea en la administración pública, con cuatro niveles de
   impacto definidos en parte por reversibilidad y duración [4]. Un equipo que no está de acuerdo
   con su nivel cambia un factor, con evidencia, en un cambio revisado; el nivel sigue.
4. **Vincula el nivel a las puertas.** El nivel selecciona las evaluaciones requeridas (EIPD, FRIA,
   debida diligencia del proveedor), las categorías y umbrales de eval, los aprobadores y la
   cadencia de revisión, para que el pipeline lea lo que debe aplicar. El despliegue rechaza
   cualquier sistema sin un registro de entrada ("sin registro, sin despliegue"), lo que mantiene el
   inventario completo por construcción (GOVERN 1.6) [2].
5. **Reabre en caso de cambio.** Una nueva finalidad, población, jurisdicción o fuente de datos, o
   un consumidor que declara un uso en la lista de fuera de alcance, vuelve a ejecutar la entrada y
   puede mover el nivel.

Registro de caso de uso ilustrativo en la entrada, válido contra `use-case-record.v1` (los campos de
perfil y la afirmación de filtro viajan en `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/use-case-record.v1.json",
  "record_id": "uc-2026-042",
  "title": "Payslip field extraction for mortgage applications",
  "business_owner": "head-of-mortgage-operations",
  "intended_purpose": "Extract income fields from uploaded payslips into the application form for an underwriter to confirm; the affordability assessment is made elsewhere.",
  "out_of_scope_uses": ["affordability scoring", "automatic decline", "employment verification"],
  "users": ["mortgage underwriters"],
  "affected_persons": ["mortgage applicants"],
  "decision_authority": "human_decides",
  "ai_justification": {
    "alternatives_considered": ["manual keying", "template-based OCR"],
    "why_ai": "Payslip layouts vary too much for templates; every extracted field is confirmed by an underwriter."
  },
  "success_metrics": [
    { "metric": "field-level exact match on a frozen sample", "target": ">= 0.98", "direction": "higher_is_better" }
  ],
  "error_appetite": "A wrong income figure can distort an affordability decision; low-confidence fields are routed to manual keying.",
  "data_sources": [{ "name": "applicant payslips", "personal_data": true, "special_category": false }],
  "jurisdictions": ["ES", "PT"],
  "preliminary_classification": {
    "eu_ai_act_category": "minimal",
    "internal_tier": "medium",
    "rationale": "Preparatory task to an Annex III 5(b) assessment (Art. 6(3) filter claimed, no profiling); assessment documented and registered under Art. 6(4) and Art. 49(2)."
  },
  "assessments_required": ["dpia"],
  "decision": {
    "outcome": "approved_with_conditions",
    "conditions": ["Art. 49(2) registration before go-live", "monthly 2% sample checked against source payslips"],
    "decided_by": "ai-governance-review",
    "decided_at": "2026-09-22"
  },
  "register_entry": "mortgage-extract-01",
  "extensions": {
    "risk_profile": { "autonomy": "suggests", "decision_impact": "informs", "exposure": "customers",
                      "reversibility": "reversible", "vulnerable_groups": [], "data_class": "personal",
                      "third_party": ["ocr-vendor-02"] },
    "tier_rule": "tiering-policy.v3",
    "annex_iii_point": "5(b)",
    "art_6_3_condition": "preparatory_task",
    "profiling": false
  }
}
```

> **Ejemplo (ilustrativo)** El formulario de entrada de un banco es lo suficientemente corto para
> terminar en una sesión. El análisis de prácticas prohibidas y las preguntas del Anexo III se
> ejecutan primero; la regla de nivel luego lee el perfil. Una herramienta de extracción de nómina
> cae en el nivel medio con su afirmación de filtro `Art. 6(3)` registrada, por lo que obtiene un
> enlace EIPD, una eval de precisión de extracción y una comprobación de muestra mensual, no una
> ranura de comité. Una segunda solicitud, para clasificar solicitantes por incumplimiento predicho,
> activa la anulación de perfilado en la primera pregunta y se encamina como de alto riesgo antes de
> que alguien reserve una reunión.

## Consecuencias
Cada sistema tiene una finalidad, una clase y un nivel registrados antes de que cueste computación;
el esfuerzo de revisión sigue el riesgo; el inventario está completo porque el despliegue depende de
él; y cada clasificación es auditable hasta los hechos en los que se basó. Los costes: el formulario
debe mantenerse corto o los equipos lo evitarán; la regla de nivel necesita calibración y una ruta
de apelación; y los hechos autodeclarados pueden ser incorrectos, por lo que la entrada necesita
comprobaciones puntuales contra el descubrimiento y la compra.

## Patrones relacionados
[Agent Registry](/patterns/agent-registry); [Policy Card](/patterns/policy-card);
[FRIA-as-Code](/patterns/fria-as-code);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery); [AI Threat Model](/patterns/ai-threat-model);
[Dataset Admission Gate](/patterns/dataset-admission-gate).

**Correspondencias:** Reglamento de IA Art. 3(12), Art. 5, Art. 6(3)–(4), Art. 49(2), Anexo III ·
ISO/IEC 42001 A.5.2, A.9.4 · NIST AI RMF (Govern 1.3, 1.6; Map 1.1, 1.5, 5.1) · Layer 01
Govern-as-Code / Layer 02 Inventory & Transparency.

Las etiquetas de función y subcategoría siguen el NIST AI RMF [2]; los ids de ISO/IEC 42001 Anexo A
siguen un cruce publicado, no el texto del estándar [5]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose (incl. "promotional or sales materials and statements"); Art. 5 prohibited practices; Art. 6(3) filter and profiling override, Art. 6(4) documented assessment before placing on the market; Art. 49(2) registration of systems concluded not high-risk under Art. 6(3); Annex III (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.3 level of risk-management activity by risk tolerance; GOVERN 1.6 inventory of AI systems; MAP 1.1 intended purposes and settings "understood and documented"; MAP 1.5 risk tolerances "determined and documented"; MAP 5.1 likelihood and magnitude of each identified impact). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Directive on Automated Decision-Making (algorithmic impact assessment before production; Appendix B impact levels I to IV defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[5] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.2 AI system impact assessment process, B.9.4 intended use of the AI system; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
