---
lang: fr
source: bok/patterns/model-artefact-integrity.md
sourceHash: "5b9a3545c2d0b0a830570ab4994d1f61d4c0b82233b606881ffb4158b7cdeb49"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-artefact-integrity
title: Model Artefact Integrity
layer: 2
secondaryLayer: 4
order: 24
summary: "Signe cada artefacto de modelo en la compilación, adjunte la procedencia de compilación, rechace formatos que ejecuten código, y verifique la firma y los resúmenes antes de que un tiempo de ejecución lo cargue."
---

# Motif : Model Artefact Integrity

**Resumen:** Trate los pesos del modelo y sus archivos complementarios como artefactos de la cadena
de suministro. Firme un manifiesto de cada archivo y su resumen cuando la compilación los produce,
adjunte la procedencia de compilación que dice qué los compiló a partir de qué entradas, prefiera
formatos de serialización que no puedan ejecutar código y escanee los que sí pueden, y haga que cada
tiempo de ejecución verifique la firma, los resúmenes y la procedencia contra la entrada del
registro antes de cargar un modelo. La verificación escribe un registro de evidencia, por lo que
"¿qué bytes se ejecutaron y quién los produjo?" tiene una respuesta.

## Objectifs
Garantice que el modelo que carga un servicio es el modelo que compiló, evaluó y registró la
canalización, de un productor conocido, y que cargarlo no puede ejecutar el código de un atacante.

## Utilisateurs cibles
Equipo de plataforma ML, ingeniero de seguridad, ingeniero de gobernanza de IA, ingeniero de MLOps.

## Parties prenantes affectées
Usuarios y personas afectadas por los resultados del sistema, propietarios de modelos, responsables
del despliegue posteriores, auditores y autoridades de vigilancia del mercado.

## Principes pertinents
Registre y acote cada actor antes de que actúe; construya el control en el punto más temprano en que
pueda bloquear; instrumente la compilación para producir su propia prueba.

## Contexte
Los modelos se mueven de trabajos de entrenamiento a registros a clústeres de servicio, se ajustan
finamente a partir de bases extraídas de centros públicos, y se copian entre entornos y regiones.
Los archivos son binarios grandes que nadie lee. Los formatos comunes no son inertes: la
documentación de Python advierte que "El módulo pickle no es seguro. Solo desempaquete datos en los
que confíe." [1], y Hugging Face describe "ataques peligrosos de ejecución de código arbitrario" que
pueden ejecutarse cuando se carga un archivo pickle [2].

## Problème
La canalización evalúa un modelo y la producción puede cargar otro.

- **Fuerzas.** Los equipos extraen pesos por nombre o etiqueta, y una etiqueta puede moverse. El
  escaneo ayuda pero, como dice Hugging Face de su propio escáner de importación de pickle, no es
  "100% infalible" [2]. El Reglamento de IA de la UE espera que los sistemas de alto riesgo resistan
  ataques en "componentes previamente entrenados utilizados en el entrenamiento (envenenamiento de
  modelos)" (`Art. 15(5)`) [3]. MITRE ATLAS cataloga el compromiso de la cadena de suministro del
  modelo en sí (`AML.T0010.003`) y la ejecución del usuario de artefactos de IA inseguros
  (`AML.T0011.000`) [4], y OWASP enumera la cadena de suministro como `LLM04:2026` [5] y las
  vulnerabilidades de la cadena de suministro de agentes como `ASI04` [6].
- **Modo de fallo.** Un archivo de modelo alterado o malicioso se carga con los privilegios del
  proceso de servicio. O un modelo que omitió la puerta de eval llega a producción a través de una
  copia manual. Después de un incidente, nadie puede probar qué pesos produjeron los resultados en
  cuestión.

## Solution
Firme en la compilación, pruebe cómo se compiló, cargue solo formatos seguros, y verifique antes de
cargar.

1. **Firme en la compilación.** Produzca un manifiesto que enumere cada archivo de modelo y su
   resumen criptográfico y firme el manifiesto. La especificación OpenSSF Model Signing (OMS),
   introducida por OpenSSF en junio de 2025, hace exactamente esto: una firma separada sobre un
   manifiesto de hashes de archivo, en el formato de paquete Sigstore, y agnóstica de PKI (PKI
   empresarial, certificados autofirmados, claves desnudas o Sigstore sin claves) [7]; su
   implementación de referencia es la biblioteca `model-signing`} y CLI en el repositorio
   model-transparency de sigstore, cuya verificación recomputa los hashes [8].
2. **Adjunte la procedencia de compilación.** Registre qué compiló el artefacto, por qué proceso y a
   partir de qué entradas de nivel superior, como procedencia SLSA
   (`https://slsa.dev/provenance/v1`). SLSA v1.2 define Build L1 (la procedencia existe), L2 (una
   plataforma de compilación alojada, por lo que falsificar la procedencia requiere un ataque
   explícito) y L3 (compilaciones endurecidas, donde falsificarla requiere explotar una
   vulnerabilidad "más allá de las capacidades de la mayoría de los adversarios") [9]. Incluya el
   resumen del modelo base y los registros de admisión del conjunto de datos entre las entradas, y
   enumere los mismos artefactos en el [AIBOM](/patterns/aibom).
3. **Prefiera formatos seguros; escanee el resto.** Almacene pesos como safetensors, "un nuevo
   formato simple para almacenar tensores de forma segura (a diferencia de pickle)" [10]. Donde un
   marco aún carga pickle, mantenga sus restricciones: el {`torch.load`} de PyTorch por defecto es
   {`weights_only=True`} en su documentación actual y advierte "Nunca cargue datos de una fuente que
   no sea de confianza" [11]. Escanee cada archivo serializado para importaciones que ejecuten
   código antes de que llegue a un registro, y ponga en cuarentena lo que falla.
4. **Fije modelos de terceros por resumen.** Extraiga por resumen de contenido, no por etiqueta;
   verifique la firma del editor donde exista una; escanee y vuelva a alojar el artefacto en el
   registro interno; y registre la fuente y el resumen ascendentes en la entrada del registro.
5. **Verifique antes de cargar.** El control de admisión de la plataforma de servicio rechaza un
   modelo cuya firma, identidad del firmante, resúmenes de archivo o procedencia no coinciden con la
   entrada del registro para la versión que se está implementando, y escribe un registro de
   evidencia de cualquier manera. ATLAS enumera la firma de código (`AML.M0013`), la verificación de
   artefactos de IA (`AML.M0014`), el escaneo de vulnerabilidades (`AML.M0016`) y una lista de
   materiales de IA (`AML.M0023`}) entre sus mitigaciones [4].

El AI RMF pide que los modelos previamente entrenados utilizados para el desarrollo sean
"monitoreados como parte del monitoreo y mantenimiento regular del sistema de IA" (MANAGE 3.2) y que
la seguridad y la resiliencia sean "evaluadas y documentadas" (MEASURE 2.7) [12]. Los proveedores de
modelos de uso general con riesgo sistémico deben garantizar "un nivel adecuado de protección de
ciberseguridad" para el modelo y su infraestructura física (`Art. 55(1)(d)`) [3].

Verificación ilustrativa en carga, válida contra el
[esquema de registro de evidencia](/resources/templates#schema-evidence-record) publicado
(`evidence-record.v1`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "model.integrity.verify-at-load.v2",
  "subject": "support-rag-llm@2026-09-20",
  "decision": "allow",
  "obligation": "EU AI Act Art. 15(5)",
  "failure_mode": "tampered or malicious model weights loaded into serving",
  "input_hash": "sha256:8c1f4e2d7a9b3c6e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
  "actor": "serving-admission-controller",
  "timestamp": "2026-09-20T07:31:05Z",
  "signature": "ed25519:Tq5w2Lr8Zk1Xv7Nc4Pb9Hs6Gd3Fa0Jm",
  "extensions": {
    "signature_bundle": "model.sig",
    "signer": "build-pipeline@models.example.org",
    "files_verified": 7,
    "formats": ["safetensors", "json"],
    "pickle_files": 0,
    "provenance": { "predicate_type": "https://slsa.dev/provenance/v1", "build_level": "L3",
                    "builder": "ci.example.org/model-builds" },
    "registry_entry": "support-rag-llm"
  }
}
```

> **Exemple (illustratif)** Un equipo de plataforma descubrió que tres servicios cargaban el "mismo"
> modelo ajustado finamente desde tres depósitos diferentes, uno copiado a mano meses antes.
> Movieron la firma al pipeline de entrenamiento, hicieron que el controlador de admisión de
> servicio verificara el manifiesto y la procedencia contra la entrada del registro, y convirtieron
> los puntos de control de pickle restantes a safetensors. Los registros de evidencia de la primera
> semana mostraron un despliegue rechazado en una falta de coincidencia de resumen: el modelo
> copiado a mano, que nunca había pasado la puerta de eval actual.

## Conséquences
Lo que se ejecuta es demostrablemente lo que se compiló y evaluó, los ataques de la cadena de
suministro en el modelo tienen que derrotar una firma y una verificación de procedencia en lugar de
una copia de archivo, y cada carga deja evidencia. Los costos: gestión de claves o una dependencia
de Sigstore; trabajo de plataforma de compilación para alcanzar niveles SLSA más altos; conversión
de puntos de control heredados; y latencia de verificación en carga, que es pequeña en comparación
con los tiempos de carga del modelo pero debe presupuestarse para un escalado rápido.

## Motifs connexes
[AIBOM](/patterns/aibom); [Agent Registry](/patterns/agent-registry);
[AI Threat Model](/patterns/ai-threat-model);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondances :** Reglamento de IA de la UE Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.5,
A.10.3 · NIST AI RMF (Govern 6.1; Manage 3.2; Measure 2.7) · OWASP LLM04:2026 · OWASP Agentic ASI04
· MITRE ATLAS · Layer 02 Inventory & Transparency / Layer 04 Runtime Controls & Observability.

Los IDs de amenaza siguen el Top 10 de OWASP para Aplicaciones LLM 2026 [5] y para Aplicaciones
Agentic 2026 [6] y MITRE ATLAS [4]; las etiquetas de función y subcategoría siguen el NIST AI RMF
[12]; los IDs de Anexo A de ISO/IEC 42001 siguen un crosswalk publicado, no el texto del estándar
[13]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[2] Pickle Scanning (arbitrary code execution when loading pickle files; the Hub's pickle-import scan "is not 100% foolproof"; safetensors). Hugging Face Hub documentation. n.d. (accessed 2026-09-24). https://huggingface.co/docs/hub/security-pickle (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities, incl. model poisoning through pre-trained components used in training; Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk and their physical infrastructure (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; mitigations AML.M0013 Code Signing, AML.M0014 Verify AI Artifacts, AML.M0016 Vulnerability Scanning, AML.M0023 AI Bill of Materials). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM04:2026 Supply Chain). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] Top 10 for Agentic Applications 2026 (ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private or enterprise PKI, self-signed certificates, bare keys, keyless Sigstore; `pip install model-signing`). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[8] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[9] SLSA specification v1.2, Build track basics (Build L1 provenance exists; L2 hosted build platform; L3 hardened builds; provenance describes what built the artefact, by what process and from which top-level inputs; predicate type https://slsa.dev/provenance/v1). OpenSSF SLSA project. n.d. (accessed 2026-09-24). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[10] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-24). https://huggingface.co/docs/safetensors/index (verified: primary)
[11] torch.load (default `weights_only=True`; "Never load data from an untrusted source"). PyTorch documentation (2.14). n.d. (accessed 2026-09-24). https://docs.pytorch.org/docs/stable/generated/torch.load.html (verified: primary)
[12] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks; MANAGE 3.2 pre-trained models "monitored as part of AI system regular monitoring and maintenance"; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[13] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.5 AI system deployment, B.10.3 suppliers; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
