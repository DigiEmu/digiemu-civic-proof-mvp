export function RoadmapBox() {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <p className="text-sm text-cyan-300 uppercase tracking-wide">
        MVP-Ausbaupfad
      </p>

      <h2 className="mt-2 text-xl font-semibold text-white">
        Von Proof-MVP zu DigiEmu Core Integration
      </h2>

      <div className="mt-5 grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-green-800 bg-green-950/30 p-4">
          <p className="text-sm font-bold text-green-300">Jetzt</p>
          <p className="mt-2 text-slate-200">Verify API + lokaler Core-Adapter</p>
          <p className="mt-2 text-xs text-slate-400">
            Snapshot, Hash, Replay und PASS/FAIL laufen bereits über eine API-Schicht.
          </p>
        </div>

        <div className="rounded-xl border border-cyan-800 bg-cyan-950/30 p-4">
          <p className="text-sm font-bold text-cyan-300">Nächster Schritt</p>
          <p className="mt-2 text-slate-200">Echte DigiEmu Core API</p>
          <p className="mt-2 text-xs text-slate-400">
            Der Adapter wird mit DigiEmu Core verbunden, damit Canonical JSON, Hash und Verify aus Core kommen.
          </p>
        </div>

        <div className="rounded-xl border border-purple-800 bg-purple-950/30 p-4">
          <p className="text-sm font-bold text-purple-300">Danach</p>
          <p className="mt-2 text-slate-200">Dashboard / PDF / Pilotdaten</p>
          <p className="mt-2 text-xs text-slate-400">
            Mehrere Vorgänge, PDF-Audit-Report, Behörden-Dashboard light und reale Demo-Daten.
          </p>
        </div>
      </div>
    </section>
  );
}