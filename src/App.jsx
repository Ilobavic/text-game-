import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Battle from "./pages/Battle";
import Stats from "./pages/Stats";
import Inventory from "./pages/Inventory";
import World from "./pages/World";
import Story from "./pages/Story";

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
          <div className="boot-ring outer" />
          <div className="boot-ring inner" />
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
          <Route path="/world" element={<World />} />
          <Route path="/story" element={<Story />} />
        </Routes>
      </main>
    </div>
  );
}
