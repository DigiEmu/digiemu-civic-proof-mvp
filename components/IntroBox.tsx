export function IntroBox() {
  return (
    <section className="rounded-2xl border border-cyan-800 bg-cyan-950/40 p-5">
      <p className="text-sm text-cyan-300 uppercase tracking-wide">
        Präsentations-MVP für Ursula
      </p>

      <h2 className="mt-2 text-xl font-semibold text-white">
        Verifizierbarer Behörden-/CO₂-Nachweis
      </h2>

      <p className="mt-3 text-slate-300">
        Dieser Prototyp zeigt, wie ein Behörden- oder CO₂-Vorgang als
        prüfbarer Nachweis gespeichert wird. Jede Entscheidung erzeugt einen
        Snapshot, einen Hash, einen Replay-Vergleich und ein Audit Log.
      </p>

      <p className="mt-3 text-slate-400 text-sm">
        Ziel: Aus einer großen Behörden-/ESG-Vision wird zuerst ein kleiner,
        beweisbarer Kern: Event → Entscheidung → Belegnummer → Audit →
        PASS/FAIL.
      </p>
    </section>
  );
}