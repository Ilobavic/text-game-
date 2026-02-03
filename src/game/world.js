export function createDefaultWorld() {
  return {
    inventory: [
      { name: "Silver", qty: 100 },
      { name: "Healing Scroll", qty: 1 },
      { name: "Coral Shard", qty: 2 },
    ],
    factions: {
      depth: 0,
      spark: 0,
    },
    flags: {},
    storyNode: "start",
    quests: [
      {
        id: "tide-01",
        title: "Echoes of the Tidelight",
        description: "Chart the glowing tide pools and collect 3 Coral Shards.",
        status: "available",
        reward: { xp: 25, loot: [{ name: "Salted Elixir", qty: 1 }] },
      },
      {
        id: "rift-02",
        title: "Brinewake Signal",
        description: "Restore the beacon and survive the surge.",
        status: "available",
        reward: { xp: 35, loot: [{ name: "Storm Thread", qty: 1 }] },
      },
    ],
    log: ["World initialized."],
  };
}

export function loadWorld() {
  const raw = localStorage.getItem("worldState");
  if (!raw) return createDefaultWorld();
  try {
    return JSON.parse(raw);
  } catch (e) {
    return createDefaultWorld();
  }
}

export function saveWorld(world) {
  localStorage.setItem("worldState", JSON.stringify(world));
}

export function addLoot(inventory, loot) {
  const updated = [...inventory];
  loot.forEach((item) => {
    const existing = updated.find((i) => i.name === item.name);
    if (existing) {
      existing.qty += item.qty;
    } else {
      updated.push({ ...item });
    }
  });
  return updated;
}

const events = [
  {
    id: "spray-cache",
    title: "Hidden Cache",
    description: "A tide-worn cache washes ashore.",
    reward: [{ name: "Silver", qty: 20 }],
  },
  {
    id: "storm-glow",
    title: "Storm Glow",
    description: "Bioluminescent spray surges across the rocks.",
    reward: [{ name: "Tide Bloom", qty: 1 }],
  },
  {
    id: "quiet",
    title: "Quiet Waters",
    description: "The sea is still. You recover your focus.",
    reward: [{ name: "Sea Glass", qty: 1 }],
  },
  {
    id: "driftwood",
    title: "Driftwood Relic",
    description: "A carved relic drifts into reach.",
    reward: [{ name: "Driftwood", qty: 2 }],
  },
];

export function rollEvent(world) {
  const event = events[Math.floor(Math.random() * events.length)];
  const updated = {
    ...world,
    inventory: addLoot(world.inventory, event.reward),
    log: [
      `${event.title}: ${event.description} (+${event.reward
        .map((r) => `${r.qty} ${r.name}`)
        .join(", ")})`,
      ...world.log,
    ].slice(0, 30),
  };
  return { world: updated, event };
}

export function updateQuest(world, questId, nextStatus) {
  return {
    ...world,
    quests: world.quests.map((q) =>
      q.id === questId ? { ...q, status: nextStatus } : q
    ),
  };
}
