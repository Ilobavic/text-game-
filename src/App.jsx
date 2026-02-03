import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Battle from "./pages/Battle";
import Stats from "./pages/Stats";
import Inventory from "./pages/Inventory";

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-root">
      {booting && (
        <div className="boot-screen">
          <div className="boot-orb" />
          <div className="boot-ring" />
          <div className="boot-text">
            Loading tide streams<span className="boot-dots" />
          </div>
        </div>
      )}
      <TopBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </main>
    </div>
  );
}
