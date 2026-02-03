import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  loadWorld,
  saveWorld,
  rollEvent,
  updateQuest,
  addLoot,
} from "../game/world";
import { applyXp } from "../game/combat";

export default function World() {
  const [world, setWorld] = useState(loadWorld());

  function update(next) {
    setWorld(next);
    saveWorld(next);
  }

  function handleEvent() {
    const result = rollEvent(world);
    update(result.world);
  }

  function handleQuest(quest, nextStatus) {
    let updated = updateQuest(world, quest.id, nextStatus);
    if (nextStatus === "completed") {
      updated = {
        ...updated,
        inventory: addLoot(updated.inventory, quest.reward.loot || []),
        log: [
          `Quest complete: ${quest.title}.`,
          ...updated.log,
        ].slice(0, 30),
      };

      const playerRaw = localStorage.getItem("playerProfile");
      if (playerRaw) {
        const player = JSON.parse(playerRaw);
        const xpResult = applyXp(player, quest.reward.xp || 0);
        localStorage.setItem("playerProfile", JSON.stringify(xpResult.player));
        xpResult.logs.forEach((l) => {
          updated.log = [l, ...updated.log].slice(0, 30);
        });
      }
    }
    update(updated);
  }

  return (
    <div className="world-page">
      <div className="section-head">
        <div>
          <p className="section-kicker">World</p>
          <h2>Coastal Frontier</h2>
          <p className="section-sub">
            Scout the shoreline, trigger events, and complete quests for XP.
          </p>
        </div>
        <div className="section-cta">
          <Button variant="contained" onClick={handleEvent}>
            Scout Coast
          </Button>
        </div>
      </div>

      <div className="world-grid">
        <section className="panel">
          <h3>Active Quests</h3>
          <div className="quest-list">
            {world.quests.map((q) => (
              <div key={q.id} className="quest-card">
                <div>
                  <p className="equip-name">{q.title}</p>
                  <p className="section-sub">{q.description}</p>
                </div>
                <div className="quest-meta">
                  <span className={`status-chip ${q.status}`}>
                    {q.status}
                  </span>
                  <div className="quest-actions">
                    {q.status === "available" && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleQuest(q, "active")}
                      >
                        Accept
                      </Button>
                    )}
                    {q.status === "active" && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleQuest(q, "completed")}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Inventory</h3>
          <div className="inventory-list">
            {world.inventory.map((item) => (
              <div key={item.name}>
                <p className="equip-name">{item.name}</p>
                <span>x{item.qty}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel log">
          <h3>World Log</h3>
          <div className="log-list">
            {world.log.map((entry, idx) => (
              <div key={idx} className="log-item">
                {entry}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
