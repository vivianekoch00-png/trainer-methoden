import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMethod } from "../lib/api";
import type { Method } from "../lib/api";
``

export default function MethodDetail() {
  const { id } = useParams();
  const [m, setM] = useState<Method | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchMethod(id as string);
        setM(data);
      } catch (e: any) {
        setError(e?.message || "Fehler");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="muted">Lade…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!m) return <p className="muted">Nicht gefunden.</p>;

  return (
    <div>
      <Link to="/methods" className="backLink">← zurück</Link>
      <h1 className="h1">{m.title}</h1>

      <div className="chips">
        {(m.categories || []).map(x => <span key={x} className="chip">{x}</span>)}
        {(m.settings || []).map(x => <span key={x} className="chip">{x}</span>)}
        {(m.group_sizes || []).map(x => <span key={x} className="chip">{x}</span>)}
        <span className="chip">{m.duration_min} Min</span>
      </div>

      {m.description ? <p>{m.description}</p> : null}

      <h2 className="h2">Ablauf</h2>
      <ol className="ol">
        {(m.steps || []).map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
}
