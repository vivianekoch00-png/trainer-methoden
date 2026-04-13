import Admin from "./pages/Admin";
``
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Methods from "./pages/Methods";
import MethodDetail from "./pages/MethodDetail";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link className="brand" to="/">
          TrainerMethoden
        </Link>
        <nav className="nav">
          <Link to="/">Kategorien</Link>
          <Link to="/methods">Methoden</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/method/:id" element={<MethodDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
