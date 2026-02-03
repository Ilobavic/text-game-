import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-tag">Abysspark Chronicles</div>
            <h1>Forge your legend in a tide-lit RPG.</h1>
            <p className="hero-sub">
              Fast, strategic encounters with tight, readable combat flow. Built
              to feel snappy on desktop and effortless on mobile.
            </p>

            <Stack className="hero-actions" spacing={2} direction="row">
              <Button
                variant="contained"
                size="large"
                onClick={() => nav("/battle")}
              >
                Start Battle
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => nav("/stats")}
              >
                View Stats
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => nav("/inventory")}
              >
                Inventory
              </Button>
            </Stack>

            <div className="hero-metrics">
              <div>
                <div className="metric-label">Turns</div>
                <div className="metric-value">30 sec avg</div>
              </div>
              <div>
                <div className="metric-label">Build</div>
                <div className="metric-value">Vite + React</div>
              </div>
              <div>
                <div className="metric-label">Style</div>
                <div className="metric-value">Minimal + Bold</div>
              </div>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-card">
              <div className="preview-header">
                <span>Encounter</span>
                <span className="preview-pill">Wave 01</span>
              </div>
              <div className="preview-body">
                <div className="preview-stat">
                  <div className="stat-title">HP</div>
                  <div className="stat-bar">
                    <span style={{ width: "70%" }} />
                  </div>
                </div>
                <div className="preview-stat">
                  <div className="stat-title">Stamina</div>
                  <div className="stat-bar stamina">
                    <span style={{ width: "55%" }} />
                  </div>
                </div>
                <div className="preview-actions">
                  <button className="mini-btn">Water Jet</button>
                  <button className="mini-btn ghost">Tidal Crash</button>
                  <button className="mini-btn ghost">Soothing Mist</button>
                </div>
                <div className="preview-log">
                  <p>You used Water Jet and dealt 5 damage.</p>
                  <p>Gnarl hits you for 4 damage.</p>
                </div>
              </div>
            </div>
            <div className="preview-card alt">
              <div className="preview-header">
                <span>Inventory</span>
                <span className="preview-pill">3 items</span>
              </div>
              <ul className="preview-list">
                <li>Salted Elixir</li>
                <li>Coral Charm</li>
                <li>Storm Thread</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Readable Combat</h3>
          <p>
            Clear turn logs, distinct skill costs, and fast feedback keep battles
            punchy.
          </p>
        </div>
        <div className="feature-card">
          <h3>Mobile-first Flow</h3>
          <p>
            Buttons are thumb-friendly, cards stack cleanly, and typography
            stays crisp.
          </p>
        </div>
        <div className="feature-card">
          <h3>Expandable World</h3>
          <p>
            Built to grow into quests, loot tables, and party systems without
            rewrites.
          </p>
        </div>
      </section>
    </div>
  );
}
