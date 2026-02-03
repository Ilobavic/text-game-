export function createDefaultPlayer() {
  return {
    name: "Tidecaller",
    health: 40,
    armor: 2,
    stamina: 10,
    skills: [
      { name: "Water Jet", damage: 6, cost: 2 },
      { name: "Tidal Crash", damage: 9, cost: 4 },
      { name: "Soothing Mist", damage: 0, cost: 3 },
    ],
  };
}

export function createDefaultEnemy() {
  return { name: "Gnarl", health: 30, armor: 1 };
}

export function applySkill(player, enemy, skill) {
  let dmg = Math.max(0, (skill.damage || 0) - (enemy.armor || 0));
  const newEnemy = { ...enemy, health: Math.max(0, enemy.health - dmg) };
  const msg = `You used ${skill.name} and dealt ${dmg} damage.`;
  return [newEnemy, msg];
}
