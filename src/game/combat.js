export function createDefaultPlayer() {
  return {
    name: "Tidecaller",
    health: 40,
    maxHealth: 40,
    armor: 2,
    stamina: 10,
    maxStamina: 10,
    shield: 0,
    statuses: [],
    level: 1,
    xp: 0,
    nextLevelXp: 50,
    perkPoints: 0,
    perks: {
      vigor: 0,
      focus: 0,
      flow: 0,
    },
    skills: [
      {
        name: "Water Jet",
        damage: 6,
        cost: 2,
        cooldown: 0,
        cd: 0,
        critChance: 0.15,
      },
      {
        name: "Tidal Crash",
        damage: 9,
        cost: 4,
        cooldown: 2,
        cd: 0,
        critChance: 0.1,
        effect: { type: "stun", turns: 1 },
      },
      {
        name: "Soothing Mist",
        damage: 0,
        cost: 3,
        cooldown: 2,
        cd: 0,
        heal: 6,
        shield: 4,
        effect: { type: "regen", turns: 3, value: 2 },
      },
    ],
  };
}

export function createDefaultEnemy() {
  return {
    name: "Gnarl",
    health: 30,
    maxHealth: 30,
    armor: 1,
    shield: 0,
    statuses: [],
    xpReward: 35,
  };
}

export function applyDamage(target, amount) {
  const shieldAbsorb = Math.min(target.shield || 0, amount);
  const remaining = Math.max(0, amount - shieldAbsorb);
  return {
    updated: {
      ...target,
      shield: Math.max(0, (target.shield || 0) - shieldAbsorb),
      health: Math.max(0, target.health - remaining),
    },
    shieldAbsorb,
    remaining,
  };
}

function applyHeal(target, amount) {
  const maxHealth = target.maxHealth ?? target.health;
  return {
    ...target,
    health: Math.min(maxHealth, target.health + amount),
  };
}

function applyStatus(target, status) {
  if (!status) return target;
  const existing = target.statuses || [];
  const next = existing.map((s) =>
    s.type === status.type
      ? { ...s, turns: Math.max(s.turns, status.turns), value: status.value }
      : s
  );
  const hasType = existing.some((s) => s.type === status.type);
  return {
    ...target,
    statuses: hasType ? next : [...existing, { ...status }],
  };
}

export function hasStatus(target, type) {
  return (target.statuses || []).some((s) => s.type === type && s.turns > 0);
}

export function tickStatuses(target) {
  const logs = [];
  let updated = { ...target };

  (target.statuses || []).forEach((status) => {
    if (status.type === "bleed") {
      const dmg = status.value || 1;
      const result = applyDamage(updated, dmg);
      updated = result.updated;
      logs.push(`${target.name} bleeds for ${dmg}.`);
    }
    if (status.type === "regen") {
      const heal = status.value || 1;
      updated = applyHeal(updated, heal);
      logs.push(`${target.name} regains ${heal} HP.`);
    }
  });

  updated.statuses = (target.statuses || [])
    .map((s) => ({ ...s, turns: s.turns - 1 }))
    .filter((s) => s.turns > 0);

  return { updated, logs };
}

export function applySkill(player, enemy, skill) {
  const logs = [];
  const critRoll = Math.random();
  let dmg = Math.max(0, (skill.damage || 0) - (enemy.armor || 0));
  const critChance = skill.critChance || 0;
  let isCrit = false;

  if (dmg > 0 && critRoll < critChance) {
    dmg = Math.round(dmg * 1.6);
    isCrit = true;
  }

  let newEnemy = { ...enemy };
  if (dmg > 0) {
    const result = applyDamage(newEnemy, dmg);
    newEnemy = result.updated;
    logs.push(
      `You used ${skill.name} and dealt ${dmg} damage${
        isCrit ? " (CRIT)" : ""
      }.`
    );
  } else if (skill.damage) {
    logs.push(`You used ${skill.name} but dealt no damage.`);
  } else {
    logs.push(`You used ${skill.name}.`);
  }

  let newPlayer = { ...player };
  if (skill.heal) {
    newPlayer = applyHeal(newPlayer, skill.heal);
    logs.push(`You recover ${skill.heal} HP.`);
  }
  if (skill.shield) {
    newPlayer = { ...newPlayer, shield: (newPlayer.shield || 0) + skill.shield };
    logs.push(`You gain ${skill.shield} shield.`);
  }
  if (skill.effect) {
    newEnemy = applyStatus(newEnemy, skill.effect);
    logs.push(`${newEnemy.name} is afflicted with ${skill.effect.type}.`);
  }

  return { player: newPlayer, enemy: newEnemy, logs };
}

export function applyXp(player, amount) {
  let updated = { ...player, xp: player.xp + amount };
  const logs = [];
  let leveled = false;

  while (updated.xp >= updated.nextLevelXp) {
    updated = {
      ...updated,
      xp: updated.xp - updated.nextLevelXp,
      level: updated.level + 1,
      nextLevelXp: Math.round(updated.nextLevelXp * 1.25 + 20),
      perkPoints: (updated.perkPoints || 0) + 1,
      maxHealth: updated.maxHealth + 4,
      maxStamina: updated.maxStamina + 1,
    };
    updated.health = updated.maxHealth;
    updated.stamina = updated.maxStamina;
    leveled = true;
    logs.push(`Level up! You are now level ${updated.level}.`);
  }

  if (!leveled) {
    logs.push(`You gained ${amount} XP.`);
  }

  return { player: updated, logs };
}
