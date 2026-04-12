import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchMethods } from "../lib/api";
import type { Method } from "../lib/api";
import { TARGET_GROUPS, GROUP_SIZES, SETTINGS } from "../lib/constants";

export default function Methods() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "";

  const [targetGroup, setTargetGroup] = useState(params.get("targetGroup") || "");
  const [groupSize, setGroupSize] = useState(params.get("groupSize") || "");
  const [setting, setSetting] = useState(params.get("setting") || "");

  const [loading, setLoading] = useState(true);
  const [methods, setMethods] = useState<Method[]>([]);
  const [error, setError] = useState("");

  const query = useMemo(
    () => ({ category, targetGroup, groupSize, setting }),
    [category, targetGroup, groupSize, setting]
  );

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (targetGroup) next.set("targetGroup", targetGroup); else next.delete("targetGroup");
    if (groupSize) next.set("groupSize", groupSize); else next.delete("groupSize");
    if (setting) next.set("setting", setting); else next.delete("setting");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetGroup, groupSize, setting]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchMethods(query);
        setMethods(data);
      } catch (e: any) {
        setError(e?.message || "Fehler beim Laden");
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  return (
    <div>
      <h1 className="h1">Methoden</h1>
      {category ? <p><b>Kategorie:</b> {category}</p> : <p className="muted">Alle Methoden</p>}

      <div className="filters">
        <div className="field">
          <label>Zielgruppe</label>
          <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)}>
            <option value="">Alle</option>
            {TARGET_GROUPS.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Gruppengröße</label>
          <select value={groupSize} onChange={(e) => setGroupSize(e.target.value)}>
            <option value="">Alle</option>
            {GROUP_SIZES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Setting</label>
          <select value={setting} onChange={(e) => setSetting(e.target.value)}>
            <option value="">Alle</option>
            {SETTINGS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button className="btnSecondary" onClick={() => { setTargetGroup(""); setGroupSize(""); setSetting(""); }}>
          Filter zurücksetzen
        </button>
      </div>

      {loading && <p className="muted">Lade…</p>}
      {error && <p className="error">{error}</p>}

      <div className="list">
        {methods.map((m) => (
          <Link key={m.id} className="listItem" to={`/method/${m.id}`}>
            <div className="listTitle">{m.title}</div>
            <div className="listMeta">
              {m.duration_min} Min · {(m.settings || []).join(", ")} · {(m.target_groups || []).join(", ")}
            </div>
            {m.description ? <div className="listDesc">{m.description}</div> : null}
          </Link>
        ))}
      </div>

      {!loading && !error && methods.length === 0 && (
        <p className="muted">Keine Methoden gefunden – ggf. Filter lockern.</p>
      )}
    </div>
  );
}