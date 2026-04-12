import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../lib/constants";

export default function Home() {
  return (
    <div>
      <h1 className="h1">Kategorien</h1>
      <p className="muted">Wähle ein Lernziel – passende Methoden werden angezeigt.</p>

      <div className="grid">
        {CATEGORIES.map((c) => (
          <Link key={c} className="card" to={`/methods?category=${encodeURIComponent(c)}`}>
            <div className="cardTitle">{c}</div>
            <div className="cardHint">Methoden anzeigen →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
``