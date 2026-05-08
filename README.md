# DigiEmu Civic Proof MVP

A minimal prototype for verifiable civic, ESG and public-sector decision records.

This MVP demonstrates how a public-sector or CO₂-related process can be transformed into a verifiable proof record using a DigiEmu-style flow:

```text
Event → Decision → Receipt Number → Audit → Snapshot → Hash → Replay → PASS/FAIL
```

---

## Live Demo

```text
https://digiemu-civic-proof-mvp.vercel.app
```

---

## Purpose

This prototype was created as a small, focused proof-of-concept derived from a broader civic / ESG / public administration architecture.

The goal is not to build a full dashboard first.

The goal is to prove the smallest verifiable core:

> A decision-related state can be captured, hashed, replayed and verified.

---

## What the MVP does

The app allows a user to create a simple civic / CO₂ process record with:

- project ID
- event ID
- decision ID
- receipt number
- CO₂ value
- budget value
- decision status
- audit note

The app then creates:

- canonical snapshot
- original hash
- replay hash
- verification status
- audit log
- JSON audit report export

---

## Verification Model

The current flow is:

```text
UI
→ verify-client
→ /api/verify
→ core-adapter
→ canonicalize
→ SHA-256 hash
→ replay comparison
→ PASS/FAIL
```

If the original snapshot and replay snapshot produce the same hash:

```text
PASS
```

If the replayed state differs:

```text
FAIL
```

---

## Current Engine

The current engine is:

```text
digiemu-core-adapter-local-v0.1
```

This means the app already uses a verification adapter layer.

The real DigiEmu Core integration is the next step.

---

## Why this matters

Many civic, ESG and public-sector dashboards focus on visualization.

DigiEmu focuses on verifiability beneath the visualization layer.

This MVP shows how future dashboards, alerts, CO₂ reports, budget controls and public-sector decisions can be backed by reproducible proof records.

---

## Example Use Case

Demo case:

```text
CO₂-Prüfung Bauprojekt A
Budget: 25'000 CHF
CO₂: 125 kg
Decision: REVIEW
```

The app generates a receipt number, snapshot, hash, replay hash and audit log.

A manipulation test changes the CO₂ value by 1 kg and produces a FAIL result.

---

## Project Structure

```text
app/
  api/
    verify/
      route.ts
  page.tsx

components/
  ExportReportButton.tsx
  IntroBox.tsx
  ProcessSteps.tsx
  ProofSummary.tsx
  SnapshotViewer.tsx
  TrafficLight.tsx

data/
  demo-events.ts

docs/
  MVP_SPEC.md
  ROADMAP.md
  URSULA_DEMO_SCRIPT.md

lib/
  audit.ts
  canonical.ts
  core-adapter.ts
  ids.ts
  proof.ts
  verify-client.ts

types/
  civic.ts
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build:

```bash
npm run build
```

---

## Roadmap

### Phase 1 – MVP Prototype

- civic / CO₂ event form
- receipt number generation
- snapshot display
- hash and replay hash
- PASS/FAIL
- audit log
- JSON export

Status: done

### Phase 2 – Verification API Adapter

- `/api/verify`
- local core adapter
- visible verification engine

Status: done

### Phase 3 – DigiEmu Core Integration

- connect adapter to DigiEmu Core
- use Core canonical JSON / hash / replay verification
- return Core-native verification result

Status: planned

### Phase 4 – Civic Dashboard Light

- multiple records
- list view
- status filters
- audit report view
- PDF export

Status: planned

---

## License

Prototype / internal evaluation stage.

Final licensing depends on DigiEmu Core licensing and future project structure.