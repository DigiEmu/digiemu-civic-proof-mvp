"use client";

import { useState } from "react";
import { demoEvent } from "@/data/demo-events";
import { createHash, verifySnapshot } from "@/lib/proof";
import {
  createBelegnummer,
  createDecisionId,
  createEventId,
  createProjectId,
} from "@/lib/ids";
import { createInitialAuditLog, type AuditEntry } from "@/lib/audit";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProofSummary } from "@/components/ProofSummary";
import { SnapshotViewer } from "@/components/SnapshotViewer";
import type { CivicEvent, DecisionStatus, VerificationStatus } from "@/types/civic";
import { IntroBox } from "@/components/IntroBox";
import { TrafficLight } from "@/components/TrafficLight";
import { ExportReportButton } from "@/components/ExportReportButton";

export default function Home() {
  const [title, setTitle] = useState(demoEvent.title);
  const [co2, setCo2] = useState(demoEvent.co2_kg);
  const [budget, setBudget] = useState(demoEvent.budget_chf);
  const [decision, setDecision] = useState<DecisionStatus>(demoEvent.decision);

  const [snapshot, setSnapshot] = useState<CivicEvent | null>(null);
  const [hash, setHash] = useState("");
  const [replayHash, setReplayHash] = useState("");
  const [status, setStatus] = useState<VerificationStatus | "">("");
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  async function generateProof() {
    const event: CivicEvent = {
      project_id: createProjectId(),
      event_id: createEventId(),
      decision_id: createDecisionId(),
      belegnummer: createBelegnummer(),
      title,
      co2_kg: co2,
      budget_chf: budget,
      decision,
      audit_note:
        "Initialer Behörden-/CO₂-Vorgang für DigiEmu Civic Proof MVP",
    };

    const original = await createHash(event);
    const replay = await createHash(event);
    const result = verifySnapshot(original, replay);

    setSnapshot(event);
    setHash(original);
    setReplayHash(replay);
    setStatus(result);
    setAuditLog(createInitialAuditLog(result));
  }

  async function simulateFail() {
    if (!snapshot) return;

    const manipulatedSnapshot: CivicEvent = {
      ...snapshot,
      co2_kg: snapshot.co2_kg + 1,
    };

    const manipulated = await createHash(manipulatedSnapshot);
    const result = verifySnapshot(hash, manipulated);

    setReplayHash(manipulated);
    setStatus(result);
    setAuditLog(createInitialAuditLog(result));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-sm text-cyan-300 uppercase tracking-wide">
            DigiEmu Civic Proof MVP
          </p>

          <h1 className="text-4xl font-bold">
            Behörden-/CO₂-Vorgang verifizierbar machen
          </h1>

          <p className="text-slate-300">
            Event → Entscheidung → Belegnummer → Audit → PASS/FAIL
          </p>

          <ProcessSteps />
        </header>
<IntroBox />

        <section className="bg-slate-900 rounded-2xl p-6 border border-slate-700 space-y-5">
          <h2 className="text-xl font-semibold">1. Vorgang erstellen</h2>

          <label className="block">
            <span className="text-sm text-slate-300">Titel</span>
            <input
              className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-600 p-3 outline-none focus:border-cyan-400"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <div className="grid md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-sm text-slate-300">CO₂ kg</span>
              <input
                type="number"
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-600 p-3 outline-none focus:border-cyan-400"
                value={co2}
                onChange={(event) => setCo2(Number(event.target.value))}
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Budget CHF</span>
              <input
                type="number"
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-600 p-3 outline-none focus:border-cyan-400"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Entscheidung</span>
              <select
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-600 p-3 outline-none focus:border-cyan-400"
                value={decision}
                onChange={(event) =>
                  setDecision(event.target.value as DecisionStatus)
                }
              >
                <option value="APPROVED">APPROVED</option>
                <option value="REVIEW">REVIEW</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </label>
          </div>

          <button
            onClick={generateProof}
            className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-3"
          >
            Proof erzeugen
          </button>
        </section>

        {snapshot && (
          <section className="bg-slate-900 rounded-2xl p-6 border border-slate-700 space-y-5">
            <h2 className="text-xl font-semibold">2. DigiEmu Nachweis</h2>

            <ProofSummary snapshot={snapshot} status={status} />
<TrafficLight status={status} />

            <SnapshotViewer
              snapshot={snapshot}
              hash={hash}
              replayHash={replayHash}
            />

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-3">Audit Log</p>

              <div className="space-y-2">
                {auditLog.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-lg border border-slate-700 bg-slate-900 p-3"
                  >
                    <p className="font-mono text-xs text-cyan-300">
                      {entry.action}
                    </p>
                    <p className="text-sm text-slate-200">{entry.message}</p>
                    <p className="text-xs text-slate-500">
                      {entry.created_at}
                    </p>
                  </div>
                ))}
              </div>
            </div>
<ExportReportButton
  snapshot={snapshot}
  hash={hash}
  replayHash={replayHash}
  status={status}
  auditLog={auditLog}
/>
            <button
              onClick={simulateFail}
              className="rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold px-5 py-3"
            >
              Manipulation simulieren → FAIL
            </button>
          </section>
        )}
      </div>
    </main>
  );
}