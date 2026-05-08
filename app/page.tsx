"use client";

import { useState } from "react";
import { demoEvent, demoEvents } from "@/data/demo-events";
import { verifyWithApi } from "@/lib/verify-client";
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
import { IntroBox } from "@/components/IntroBox";
import { TrafficLight } from "@/components/TrafficLight";
import { ExportReportButton } from "@/components/ExportReportButton";
import type {
  CivicEvent,
  DecisionStatus,
  VerificationStatus,
} from "@/types/civic";
import { DemoStats } from "@/components/DemoStats";
import { RoadmapBox } from "@/components/RoadmapBox";

export default function Home() {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);

  const [title, setTitle] = useState(demoEvent.title);
  const [co2, setCo2] = useState(demoEvent.co2_kg);
  const [budget, setBudget] = useState(demoEvent.budget_chf);
  const [decision, setDecision] = useState<DecisionStatus>(demoEvent.decision);

  const [snapshot, setSnapshot] = useState<CivicEvent | null>(null);
  const [hash, setHash] = useState("");
  const [replayHash, setReplayHash] = useState("");
  const [status, setStatus] = useState<VerificationStatus | "">("");
  const [engine, setEngine] = useState("");
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  function loadDemoCase(index: number) {
    const demo = demoEvents[index];

    setSelectedDemoIndex(index);
    setTitle(demo.title);
    setCo2(demo.co2_kg);
    setBudget(demo.budget_chf);
    setDecision(demo.decision);

    setSnapshot(null);
    setHash("");
    setReplayHash("");
    setStatus("");
    setEngine("");
    setAuditLog([]);
  }

  async function generateProof() {
    const selectedDemo = demoEvents[selectedDemoIndex];

    const event: CivicEvent = {
      project_id: selectedDemo?.project_id ?? createProjectId(),
      event_id: createEventId(),
      decision_id: createDecisionId(),
      belegnummer: createBelegnummer(),
      title,
      co2_kg: co2,
      budget_chf: budget,
      decision,
      audit_note:
        selectedDemo?.audit_note ??
        "Initialer Behörden-/CO₂-Vorgang für DigiEmu Civic Proof MVP",
    };

    const verification = await verifyWithApi(event);

    setSnapshot(event);
    setHash(verification.original_hash);
    setReplayHash(verification.replay_hash);
    setStatus(verification.status);
    setEngine(verification.engine);
    setAuditLog(createInitialAuditLog(verification.status));
  }

  async function simulateFail() {
    if (!snapshot) return;

    const manipulatedSnapshot: CivicEvent = {
      ...snapshot,
      co2_kg: snapshot.co2_kg + 1,
    };

    const verification = await verifyWithApi(snapshot, manipulatedSnapshot);

    setReplayHash(verification.replay_hash);
    setStatus(verification.status);
    setEngine(verification.engine);
    setAuditLog(createInitialAuditLog(verification.status));
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

<DemoStats events={demoEvents} />
<RoadmapBox />
        <section className="bg-slate-900 rounded-2xl p-6 border border-slate-700 space-y-5">
          <h2 className="text-xl font-semibold">Demo-Case auswählen</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {demoEvents.map((demo, index) => (
              <button
                key={demo.project_id}
                onClick={() => loadDemoCase(index)}
                className={`rounded-xl border p-4 text-left transition ${
                  selectedDemoIndex === index
                    ? "border-cyan-400 bg-cyan-950/40"
                    : "border-slate-700 bg-slate-800 hover:border-cyan-700"
                }`}
              >
                <p className="font-mono text-xs text-cyan-300">
                  {demo.project_id}
                </p>
                <p className="mt-2 font-semibold">{demo.title}</p>
                <p className="mt-2 text-sm text-slate-400">
                  CO₂: {demo.co2_kg} kg · Budget: {demo.budget_chf} CHF
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Entscheidung: {demo.decision}
                </p>
              </button>
            ))}
          </div>
        </section>

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

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Verification Engine</p>
              <p className="mt-1 font-mono text-sm text-cyan-300">
                {engine || "not initialized"}
              </p>
            </div>

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

            <div className="flex flex-wrap gap-3">
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
            </div>
          </section>
        )}
      </div>
    </main>
  );
}