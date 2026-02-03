import React from "react";

export default function Stats() {
  const player = JSON.parse(localStorage.getItem("playerProfile") || "null");
  return (
    <div className="stats-page">
      <div className="section-head">
        <div>
          <p className="section-kicker">Profile</p>
          <h2>Player Stats</h2>
          <p className="section-sub">
            Snapshot of your current build, resistances, and pace.
          </p>
        </div>
        <div className="section-cta">
          <span className="section-pill">Level 1</span>
          <span className="section-pill ghost">PvE</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="panel">
          <h3>Core</h3>
          <div className="stats-list">
            <div>
              <div className="stat-label">Health</div>
              <div className="stat-value">
                {player?.maxHealth ?? 40}
              </div>
            </div>
            <div>
              <div className="stat-label">Armor</div>
              <div className="stat-value">{player?.armor ?? 2}</div>
            </div>
            <div>
              <div className="stat-label">Stamina</div>
              <div className="stat-value">
                {player?.maxStamina ?? 10}
              </div>
            </div>
            <div>
              <div className="stat-label">Level</div>
              <div className="stat-value">{player?.level ?? 1}</div>
            </div>
            <div>
              <div className="stat-label">Perk Points</div>
              <div className="stat-value">{player?.perkPoints ?? 0}</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Resistances</h3>
          <div className="chip-row">
            <span>Water +12%</span>
            <span>Wind +6%</span>
            <span>Shock -4%</span>
          </div>
          <div className="bar-list">
            <div>
              <div className="stat-label">Focus</div>
              <div className="stat-track">
                <span style={{ width: "72%" }} />
              </div>
            </div>
            <div>
              <div className="stat-label">Agility</div>
              <div className="stat-track stamina">
                <span style={{ width: "58%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Equipped</h3>
          <div className="equip-list">
            <div>
              <p className="equip-name">Tidecaller Staff</p>
              <span>+4 water dmg</span>
            </div>
            <div>
              <p className="equip-name">Seafoam Mantle</p>
              <span>+2 armor</span>
            </div>
            <div>
              <p className="equip-name">Gale Boots</p>
              <span>+1 agility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
