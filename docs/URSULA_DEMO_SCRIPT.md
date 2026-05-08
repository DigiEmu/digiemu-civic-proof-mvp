\# DigiEmu Civic Proof MVP – Demo-Script für Ursula



\## 1. Ziel der Demo



Dieser Mini-Prototyp zeigt den kleinsten beweisbaren Kern einer Behörden-/ESG-Steuerzentrale:



\*\*Event → Entscheidung → Belegnummer → Audit → DigiEmu PASS/FAIL\*\*



Die große Vision aus den Dokumenten wird damit auf einen ersten prüfbaren Vorgang heruntergebrochen.



\---



\## 2. Demo-Fall



Beispiel:



\- Projekt: `PRJ-2026-0001`

\- Vorgang: CO₂-Prüfung Bauprojekt A

\- CO₂-Wert: 125 kg

\- Budget: 25'000 CHF

\- Entscheidung: REVIEW



\---



\## 3. Ablauf in der App



\### Schritt 1 – Vorgang erfassen



Der Nutzer erfasst einen Behörden-/CO₂-Vorgang mit Titel, CO₂-Wert, Budget und Entscheidung.



\### Schritt 2 – Proof erzeugen



Die App erzeugt automatisch:



\- Event-ID

\- Decision-ID

\- Belegnummer

\- Snapshot

\- Original Hash

\- Replay Hash

\- Audit Log



\### Schritt 3 – PASS anzeigen



Wenn der rekonstruierte Replay Hash identisch mit dem Original Hash ist, erscheint:



\*\*PASS\*\*



Das bedeutet:



> Der Zustand ist reproduzierbar und unverändert.



\### Schritt 4 – Manipulation simulieren



Die App verändert testweise den CO₂-Wert minimal.



Danach entsteht ein anderer Replay Hash.



Ergebnis:



\*\*FAIL\*\*



Das bedeutet:



> Der Zustand wurde verändert oder ist nicht mehr exakt reproduzierbar.



\---



\## 4. Was DigiEmu hier zeigt



DigiEmu zeigt nicht nur ein Dashboard, sondern eine prüfbare Beweisschicht:



\- gleiche Eingabe

\- gleicher Snapshot

\- gleicher Hash

\- gleiche Rekonstruktion

\- PASS



Oder bei Abweichung:



\- geänderte Eingabe

\- anderer Hash

\- FAIL



\---



\## 5. Warum das für Ursulas Dokumente relevant ist



Die Dokumente beschreiben große Behörden-, ESG-, CO₂-, Budget- und Dashboard-Strukturen.



Dieser MVP zeigt den kleinsten technischen Kern darunter:



> Jede relevante Entscheidung kann als Snapshot gespeichert, gehasht, rekonstruiert und geprüft werden.



Damit werden spätere Dashboards, Ampeln, 3D-Ansichten und Behördenberichte nicht nur visuell, sondern technisch nachvollziehbar.



\---



\## 6. Nächste Schritte



1\. echten Behörden-/CO₂-Use-Case definieren

2\. DigiEmu Core API anbinden

3\. Audit Report erweitern

4\. einfache Dashboard-Ansicht ergänzen

5\. Pilot mit echten Beispieldaten vorbereiten

