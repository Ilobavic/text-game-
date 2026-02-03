import React, { useState } from "react";
import Button from "@mui/material/Button";
import { getNode, applyEffects } from "../game/story";
import { loadWorld, saveWorld } from "../game/world";

export default function Story() {
  const [world, setWorld] = useState(loadWorld());
  const node = getNode(world.storyNode);

  function choose(choice) {
    let updated = applyEffects(world, choice.effects || []);
    updated = { ...updated, storyNode: choice.next };
    updated = {
      ...updated,
      log: [`Story choice: ${choice.label}`, ...updated.log].slice(0, 30),
    };
    setWorld(updated);
    saveWorld(updated);
  }

  return (
    <div className="story-page">
      <div className="section-head">
        <div>
          <p className="section-kicker">Narrative</p>
          <h2>{node.title}</h2>
          <p className="section-sub">{node.text}</p>
        </div>
        <div className="section-cta">
          <span className="section-pill">Depth {world.factions.depth}</span>
          <span className="section-pill ghost">Spark {world.factions.spark}</span>
        </div>
      </div>

      <div className="story-grid">
        <section className="panel">
          <h3>Choices</h3>
          <div className="choice-list">
            {node.choices.length === 0 && (
              <div className="section-sub">No choices yet. More coming soon.</div>
            )}
            {node.choices.map((choice) => {
              if (choice.condition && !choice.condition(world)) return null;
              return (
                <Button
                  key={choice.id}
                  variant="contained"
                  onClick={() => choose(choice)}
                >
                  {choice.label}
                </Button>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <h3>Flags</h3>
          <div className="chip-row">
            {Object.keys(world.flags).length === 0 && (
              <span className="status-chip muted">No flags</span>
            )}
            {Object.entries(world.flags).map(([key, value]) => (
              <span key={key} className="status-chip">
                {key}: {String(value)}
              </span>
            ))}
          </div>
        </section>

        <section className="panel log">
          <h3>Story Log</h3>
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
