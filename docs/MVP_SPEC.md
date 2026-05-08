\# DigiEmu Civic Proof MVP – Spezifikation v0.1



\## Zweck



Der MVP zeigt, wie ein Behörden-/CO₂-Vorgang in einen verifizierbaren Nachweis überführt wird.



Kernprinzip:



```text

Event → Entscheidung → Belegnummer → Audit → Snapshot → Hash → Replay → PASS/FAIL

```



\---



\## MVP-Umfang



Der Prototyp enthält:



\- Eingabe eines Vorgangs

\- CO₂-Wert

\- Budget-Wert

\- Entscheidung

\- automatische IDs

\- Belegnummer

\- Snapshot-Anzeige

\- SHA-256 Hash

\- Replay Hash

\- PASS/FAIL-Prüfung

\- Audit Log

\- Ampelstatus

\- JSON-Export des Audit Reports



\---



\## Datenmodell



```ts

type CivicEvent = {

&#x20; project\_id: string;

&#x20; event\_id: string;

&#x20; decision\_id: string;

&#x20; belegnummer: string;

&#x20; title: string;

&#x20; co2\_kg: number;

&#x20; budget\_chf: number;

&#x20; decision: "APPROVED" | "REVIEW" | "REJECTED";

&#x20; audit\_note: string;

};

```



\---



\## Verifikation



Die App erzeugt einen kanonisierten Snapshot.



Aus diesem Snapshot wird ein SHA-256 Hash erzeugt.



Beim Replay wird derselbe Snapshot erneut gehasht.



Wenn beide Hashes identisch sind:



```text

PASS

```



Wenn sich der Zustand verändert:



```text

FAIL

```



\---



\## Audit Log



Der MVP erzeugt folgende Audit-Schritte:



```text

EVENT\_CREATED

DECISION\_RECORDED

BELEG\_GENERATED

SNAPSHOT\_HASHED

VERIFIED\_PASS / VERIFIED\_FAIL

```



\---



\## Präsentationswert



Der MVP zeigt Ursula den kleinsten beweisbaren Kern ihrer Behörden-/ESG-Vision:



> Nicht zuerst große 3D-Dashboards, sondern zuerst ein verifizierbarer Entscheidungs- und Nachweiskern.



\---



\## Nicht im MVP enthalten



Noch nicht enthalten:



\- echte Datenbank

\- echte DigiEmu Core API

\- Login / Rollen

\- Multi-User

\- Behörden-Dashboard

\- PDF-Export

\- 3D-Visualisierung

\- produktionsreife Security



\---



\## Nächste Version v0.2



Geplante Erweiterungen:



1\. DigiEmu Core API anbinden

2\. mehrere Demo-Vorgänge speichern

3\. Audit Report als PDF erzeugen

4\. einfache Dashboard-Liste ergänzen

5\. GitHub README und Präsentations-Screenshot erstellen

