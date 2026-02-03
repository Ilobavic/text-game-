import React from "react";

export default function Inventory() {
  return (
    <div className="inventory-page">
      <div className="section-head">
        <div>
          <p className="section-kicker">Supplies</p>
          <h2>Inventory</h2>
          <p className="section-sub">
            Compact loadout with upgrade slots ready to unlock.
          </p>
        </div>
        <div className="section-cta">
          <span className="section-pill">Weight 12/30</span>
          <span className="section-pill ghost">Quick Use</span>
        </div>
      </div>

      <div className="inventory-grid">
        <div className="panel">
          <h3>Active Items</h3>
          <div className="inventory-list">
            <div>
              <p className="equip-name">Healing Scroll</p>
              <span>Restores 18 HP</span>
            </div>
            <div>
              <p className="equip-name">Salted Elixir</p>
              <span>+2 stamina regen</span>
            </div>
            <div>
              <p className="equip-name">Storm Thread</p>
              <span>Boosts shock damage</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Currency</h3>
          <div className="currency-card">
            <div>
              <div className="stat-label">Silver</div>
              <div className="stat-value">100</div>
            </div>
            <div>
              <div className="stat-label">Gems</div>
              <div className="stat-value">4</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Materials</h3>
          <div className="chip-row">
            <span>Coral Shard</span>
            <span>Tide Bloom</span>
            <span>Driftwood</span>
            <span>Sea Glass</span>
          </div>
        </div>
      </div>
    </div>
  );
}
