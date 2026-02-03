import React, { useState } from "react";
import Button from "@mui/material/Button";

import {
  createDefaultPlayer,
  createDefaultEnemy,
  applySkill,
} from "../game/combat";

export default function Battle() {
  const [player, setPlayer] = useState(createDefaultPlayer());
  const [enemy, setEnemy] = useState(createDefaultEnemy());
  const [log, setLog] = useState(["Battle start!"]);

  function addLog(entry) {
    setLog((s) => [entry, ...s].slice(0, 30));
  }

  function useSkill(skill) {
    if (player.health <= 0) return;
    if (skill.cost && player.stamina < skill.cost) {
      addLog("Not enough stamina");
      return;
    }

    const [newEnemy, msg] = applySkill(player, enemy, skill);
    setEnemy(newEnemy);
    setPlayer((p) => {
      const cost = skill.cost || 0;
      const spent = Math.max(0, p.stamina - cost);
      const regen = 1;
      const maxStamina = p.maxStamina ?? 10;
      return {
        ...p,
        stamina: Math.min(maxStamina, spent + regen),
      };
    });
    addLog(msg);

    if (newEnemy.health > 0) {
      const dmg = Math.max(0, 6 - player.armor);
      setPlayer((p) => ({ ...p, health: Math.max(0, p.health - dmg) }));
      addLog(`${newEnemy.name} hits you for ${dmg} damage.`);
    } else {
      addLog(`You defeated ${newEnemy.name}!`);
    }
  }

  return (
    <div className="battle">
      <div className="battle-header">
        <div>
          <p className="section-kicker">Arena</p>
          <h2>Coastline Skirmish</h2>
          <p className="section-sub">
            Manage stamina to chain skills and survive counterattacks.
          </p>
        </div>
        <div className="battle-tags">
          <span>Turn-based</span>
          <span>Risk: Medium</span>
        </div>
      </div>

      <div className="battle-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>Player</h3>
            <span className="panel-pill">{player.name}</span>
          </div>
          <div className="stat-block">
            <div>
              <div className="stat-label">HP</div>
              <div className="stat-track">
                <span style={{ width: `${(player.health / 40) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="stat-label">Stamina</div>
              <div className="stat-track stamina">
                <span
                  style={{
                    width: `${
                      (player.stamina / (player.maxStamina ?? 10)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="stat-row">
            <div>
              <div className="stat-label">Armor</div>
              <div className="stat-value">{player.armor}</div>
            </div>
            <div>
              <div className="stat-label">Stamina</div>
              <div className="stat-value">
                {player.stamina}/{player.maxStamina ?? 10}
              </div>
            </div>
          </div>

          <div className="action-grid">
            {player.skills.map((s) => (
              <Button
                key={s.name}
                variant="contained"
                onClick={() => useSkill(s)}
                disabled={player.health <= 0}
              >
                <div className="action-title">{s.name}</div>
                <div className="action-meta">
                  {s.damage ? `${s.damage} dmg` : "Support"}{" "}
                  {s.cost ? `· ${s.cost} stam` : ""}
                </div>
              </Button>
            ))}
          </div>
        </section>

        <section className="panel enemy">
          <div className="panel-header">
            <h3>Enemy</h3>
            <span className="panel-pill warning">{enemy.name}</span>
          </div>
          <div className="stat-block">
            <div>
              <div className="stat-label">HP</div>
              <div className="stat-track danger">
                <span style={{ width: `${(enemy.health / 30) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="stat-label">Armor</div>
              <div className="stat-value">{enemy.armor}</div>
            </div>
          </div>
          <div className="enemy-card">
            <p className="enemy-title">Gnarl, Tidebreaker</p>
            <p className="enemy-sub">
              Heavy claws, slow windup. Dodge if stamina dips.
            </p>
            <div className="enemy-moves">
              <span>Crush</span>
              <span>Shatter</span>
              <span>Recover</span>
            </div>
          </div>
        </section>

        <section className="panel log">
          <div className="panel-header">
            <h3>Combat Log</h3>
            <span className="panel-pill">Live</span>
          </div>
          <div className="log-list">
            {log.map((l, i) => (
              <div key={i} className="log-item">
                {l}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
