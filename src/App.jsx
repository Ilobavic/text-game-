import React from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Battle from "./pages/Battle";
import Stats from "./pages/Stats";
import Inventory from "./pages/Inventory";

export default function App() {
  return (
    <div className="app-root">
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
