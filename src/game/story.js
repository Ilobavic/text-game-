const nodes = {
  start: {
    id: "start",
    title: "The Tide Lantern",
    text: "A signal flares along the coast. Two factions answer the call.",
    choices: [
      {
        id: "aid-depth",
        label: "Aid the Depth Guild",
        effects: [{ type: "faction", key: "depth", value: 2 }],
        next: "depth-01",
      },
      {
        id: "aid-spark",
        label: "Aid the Spark Order",
        effects: [{ type: "faction", key: "spark", value: 2 }],
        next: "spark-01",
      },
    ],
  },
  "depth-01": {
    id: "depth-01",
    title: "Brine Oath",
    text: "The Depth Guild asks for silence and precision. They offer a stealth route.",
    choices: [
      {
        id: "stealth",
        label: "Take the stealth route",
        effects: [{ type: "flag", key: "stealthRoute", value: true }],
        next: "rift-gate",
      },
      {
        id: "no",
        label: "Refuse and go loud",
        effects: [{ type: "faction", key: "depth", value: -1 }],
        next: "rift-gate",
      },
    ],
  },
  "spark-01": {
    id: "spark-01",
    title: "Spark Rite",
    text: "The Spark Order wants a daring approach. They promise power at a cost.",
    choices: [
      {
        id: "ritual",
        label: "Accept the rite",
        effects: [{ type: "flag", key: "sparkRite", value: true }],
        next: "rift-gate",
      },
      {
        id: "decline",
        label: "Decline the rite",
        effects: [{ type: "faction", key: "spark", value: -1 }],
        next: "rift-gate",
      },
    ],
  },
  "rift-gate": {
    id: "rift-gate",
    title: "Rift Gate",
    text: "At the gate, your reputation shapes the encounter.",
    choices: [
      {
        id: "depth-pass",
        label: "Use Depth credentials",
        condition: (state) => state.factions.depth >= 2,
        effects: [{ type: "flag", key: "depthPass", value: true }],
        next: "after-gate",
      },
      {
        id: "spark-pass",
        label: "Use Spark credentials",
        condition: (state) => state.factions.spark >= 2,
        effects: [{ type: "flag", key: "sparkPass", value: true }],
        next: "after-gate",
      },
      {
        id: "force",
        label: "Force your way through",
        effects: [{ type: "flag", key: "forcedGate", value: true }],
        next: "after-gate",
      },
    ],
  },
  "after-gate": {
    id: "after-gate",
    title: "Abyssal Veil",
    text: "The veil parts. You glimpse what lies beneath.",
    choices: [
      {
        id: "press",
        label: "Press forward",
        effects: [{ type: "flag", key: "veilSeen", value: true }],
        next: "end",
      },
    ],
  },
  end: {
    id: "end",
    title: "Echoes",
    text: "Your choices ripple through the coast. More paths will unfold.",
    choices: [],
  },
};

export function getNode(id) {
  return nodes[id] || nodes.start;
}

export function applyEffects(state, effects) {
  const updated = { ...state };
  effects.forEach((effect) => {
    if (effect.type === "faction") {
      updated.factions = {
        ...updated.factions,
        [effect.key]: (updated.factions[effect.key] || 0) + effect.value,
      };
    }
    if (effect.type === "flag") {
      updated.flags = { ...updated.flags, [effect.key]: effect.value };
    }
  });
  return updated;
}
