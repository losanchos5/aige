---
lang: de
source: bok/patterns/sanctioned-ai-gateway.md
sourceHash: "88e9d0d9330fb56a063e5432a1a541f0b365831e5eb900ce73567c56aa2083c9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: sanctioned-ai-gateway
title: Sanctioned AI Gateway
layer: 4
secondaryLayer: 2
order: 28
summary: "Genehmigte KI-Tools hinter Single Sign-On und einem Gateway, das Datenklassen-Regeln anwendet, die Nutzung protokolliert und eine aktuelle Acceptable-Use-Bestätigung prüft."
---

# Muster: Sanctioned AI Gateway

**Zusammenfassung:** Platzieren Sie die genehmigten KI-Tools und Modell-APIs der Organisation hinter
Single Sign-On und einem Gateway, das die Acceptable-Use-Richtlinie als Code anwendet:
Datenklassen-Regeln für das, was gesendet werden darf, Redaktion oder Blockierung, wo die Klasse es
erfordert, ein Entscheidungsereignis pro Aufruf und Zugriff bedingt durch eine aktuelle
Acceptable-Use-Bestätigung. Das Gateway ist der genehmigte Weg und ist so gebaut, dass er der
einfachste ist; Discovery findet, was um ihn herum läuft.

## Ziele
Ermöglichen Sie Mitarbeitern, KI-Tools produktiv zu nutzen, während Sie regulierte, vertrauliche und
geheime Daten aus Tools heraushalten, die nicht dafür genehmigt sind, und verwandeln Sie die
Acceptable-Use-Richtlinie von einer Handbuchseite in ein Guardrail, das entscheidet und Nachweise
hinterlässt.

## Zielbenutzer
KI-Governance-Engineer, Security Engineer, Platform Team, Beschaffung.

## Betroffene Stakeholder
Mitarbeiter und Auftragnehmer, Kunden, deren Daten Mitarbeiter verarbeiten, Betriebsräte oder
Arbeitnehmervertreter, der Datenschutzbeauftragte, KI-Tool-Anbieter.

## Relevante Prinzipien
Machen Sie den gesteuerten Weg zum einfachsten Weg; bauen Sie das Guardrail an der frühesten Stelle,
an der es blockieren kann; registrieren und begrenzen Sie jeden Akteur, bevor er handelt.

## Kontext
Mitarbeiter führen KI-Tools schneller ein als die Beschaffung sie genehmigen kann. In einer Umfrage
eines Anbieters von 2024 unter 31.000 Wissensarbeitern in 31 Ländern sagten 78% der KI-Nutzer, dass
sie ihre eigenen KI-Tools zur Arbeit mitbringen [1]. Die Organisation hat bereits eine
Acceptable-Use-Richtlinie, die genehmigte Tools und verbotene Eingaben nach Datenklasse auflistet
(siehe
[Acceptable Use von KI durch Mitarbeiter](/bok/governance-program#acceptable-use-of-ai-by-staff)),
und der EU AI Act, wie durch das Digital Omnibus geändert, fordert Anbieter und Betreiber auf,
Maßnahmen zu ergreifen, um die KI-Kompetenz der Mitarbeiter zu unterstützen, die KI in ihrem Namen
nutzen [2]. Der Ausfallmodus ist bekannt: der Fall
[Quellcode in einen öffentlichen Chatbot eingefügt](/cases/chatbot-code-leak-reported) (berichtet)
ist die alltägliche Version, und Offenlegung sensibler Informationen ist eine benannte
Risikokategorie für LLM-Anwendungen [3].

## Problem
Eine Richtlinie, die nur in einem Handbuch lebt, hat keine Durchschlagskraft: sie wird einmal
gelesen, einmal bestätigt und nie in dem Moment bewertet, in dem jemand eine Kundendatei in ein
öffentliches Tool einfügt. Das Blockieren aller öffentlichen Tools treibt die Nutzung auf
persönliche Geräte, wo nichts gesehen wird. Nur Discovery findet das Leck, nachdem es passiert ist.

### Kräfte
- **Bequemlichkeit gegen Kontrolle.** Jeder zusätzliche Schritt auf dem genehmigten Weg treibt
  Menschen zurück auf den ungenehmigten.
- **Inspektion gegen Datenschutz.** Das Protokollieren von Mitarbeiter-Prompts ist selbst eine
  Verarbeitung von Mitarbeiterdaten, daher behält das Gateway nur das, was das Guardrail braucht,
  solange es es braucht [4].
- **Latenz gegen Redaktion.** Inhaltsklassifizierung und Redaktion fügen Zeit zu jedem Aufruf hinzu.
- **Anbieter-Bedingungen gegen Drift.** Ein genehmigtes Tool ist nur unter den Bedingungen sicher,
  unter denen es genehmigt wurde, wie z.B. kein Training auf Kundeneingaben, und diese Bedingungen
  ändern sich.

## Lösung
Machen Sie ein Gateway zur genehmigten Route zu KI und machen Sie es zur schnellsten Route.

1. **Ein Katalog genehmigter Tools als [Policy Card](/patterns/policy-card).** Jeder Eintrag nennt
   das Tool, die Vertragsbedingungen, unter denen es genehmigt wurde, die Datenklassen und
   Anwendungsfälle, für die es zulässig ist, und sein Überprüfungsdatum. Das
   [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) speist es.
2. **Ein Weg hinein.** Modell-APIs werden über ein KI-Gateway oder LLM-Proxy erreicht, und
   browserbasierte Tools über Single Sign-On und ein sicheres Web-Gateway oder eine
   Browser-Richtlinie (illustrative Kategorien, keine Produktliste). Persönliche Konten auf
   genehmigten Tools werden durch Enterprise-Mandanten ersetzt.
3. **Datenklassen-Regeln am Gateway.** Ein Content Classifier kennzeichnet jede Anfrage nach
   Datenklasse und die Card entscheidet: zulassen, mit Redaktion zulassen oder mit Grund blockieren
   und einen Weg zum richtigen Tool anbieten. Die Matrix von Datenklasse gegen Tool kommt aus der
   Acceptable-Use-Richtlinie.
4. **Zugriff auf Bestätigung.** Der Identity Provider gewährt die Gateway-Rolle nur, während eine
   aktuelle Acceptable-Use-Bestätigung und ihr Schulungsmodul registriert sind (das
   [Training Record Schema](/resources/templates#schema-training-record)).
5. **Ein Entscheidungsereignis pro Aufruf.** Das Gateway schreibt einen signierten Nachweisdatensatz
   (Entscheidung, Datenklasse, Tool, Redaktionen, ein Hash der Eingabe statt der Eingabe) in den
   Assurance Store, in der Form des
   [Evidence Record Schema](/resources/templates#schema-evidence-record).
6. **Discovery als Feedback-Schleife.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery) liest
   Identitäts-, Netzwerk- und Ausgabendaten für Tools außerhalb des Gateways; jeder Fund wird zu
   einer Intake-Anfrage (registrieren, einordnen, genehmigen oder ersetzen), bevor er zu einer
   Sanktion wird.

Illustratives Gateway-Entscheidungsereignis als Nachweisdatensatz:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "gateway.data-class.confidential.v4",
  "subject": "genai-gateway@2026.09.2",
  "decision": "allow",
  "obligation": "ISO/IEC 42001 A.9.2",
  "failure_mode": "customer data sent to a tool not approved for it",
  "input_hash": "sha256:4be1c07e9d52",
  "actor": "user:pseudo-8841",
  "timestamp": "2026-09-18T09:12:44Z",
  "signature": "ed25519:MEUCIQDx3k",
  "extensions": {
    "tool": "drafting-assistant@enterprise",
    "data_class": "confidential",
    "action": "allowed_with_redaction",
    "redactions": 2,
    "attestation": "tr-2026-0877"
  }
}
```

> **Beispiel (illustrativ)** Ein Rechtsteam beginnt, einen öffentlichen Entwurfassistenten für
> Vertragszusammenfassungen zu nutzen. Discovery kennzeichnet den Traffic; anstatt die Domain zu
> blockieren, unterzeichnet das Governance-Programm eine Enterprise-Vereinbarung ohne Training auf
> Kundendaten, fügt das Tool zum Katalog für vertrauliche Daten mit Redaktion von persönlichen
> Identifikatoren hinzu und leitet es durch das Gateway. Die Nutzung wechselt innerhalb von Wochen
> zur genehmigten Route, weil sie jetzt die einfachste ist.

## Konsequenzen
Acceptable Use wird durchsetzbar und messbar: die Organisation kann zeigen, was wohin gesendet
wurde, unter welcher Regel und wie viel Nutzung außerhalb des Gateways stattfindet. Die Kosten sind
das Gateway selbst, Classifier-Abstimmung (falsche Blockierungen untergraben schnell das Vertrauen),
Katalog-Wartung, wenn sich Anbieter-Bedingungen ändern, und die Datenschutzarbeit, um proportional
zu protokollieren. Das Gateway deckt die Tools ab, die es frontet; lokale Modelle und persönliche
Geräte bleiben ein Discovery-Problem.

## Verwandte Muster
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Policy Card](/patterns/policy-card);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Zuordnung:** EU AI Act Art. 4 · GDPR Art. 5(1)(c) · ISO/IEC 42001 A.2, A.9.2, A.10.3 · NIST AI RMF
GOVERN 2.2, GOVERN 6.1, MANAGE 3.1 · OWASP LLM02:2026 · Layer 04 Runtime Controls & Observability /
Layer 02 Inventory & Transparency.

Threat-IDs folgen dem OWASP Top 10 for LLM Applications 2026 [3], Control-IDs ISO/IEC 42001 Annex A
[5] und Unterkategorie-IDs dem NIST AI RMF [6]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] "AI at Work Is Here. Now Comes the Hard Part" (2024 Work Trend Index; 31,000 people in 31 countries; 78% of AI users bring their own AI tools to work). Microsoft and LinkedIn. 2024-05-08. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 4 replaced: providers and deployers take measures to support the development of AI literacy); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure; ids used in the Maps to line). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 5(1)(c) data minimisation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.2 policies related to AI; A.9.2 processes for responsible use of AI systems; A.10.3 suppliers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 2.2 personnel and partners receive AI risk management training; GOVERN 6.1 policies for third-party AI risks; MANAGE 3.1 third-party risks regularly monitored). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
