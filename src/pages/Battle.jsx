import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

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
    setPlayer((p) => ({
      ...p,
      stamina: Math.max(0, p.stamina - (skill.cost || 0)),
    }));
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
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Player</Typography>
              <Typography>HP: {player.health}</Typography>
              <Typography>Armor: {player.armor}</Typography>
              <Typography>Stamina: {player.stamina}</Typography>

              <Box sx={{ mt: 2 }}>
                {player.skills.map((s) => (
                  <Button
                    key={s.name}
                    variant="contained"
                    sx={{ display: "block", mb: 1 }}
                    onClick={() => useSkill(s)}
                    disabled={player.health <= 0}
                  >
                    {s.name} {s.damage ? `(${s.damage} dmg)` : ""}{" "}
                    {s.cost ? ` - ${s.cost} stam` : ""}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{enemy.name}</Typography>
              <Typography>HP: {enemy.health}</Typography>
              <Typography>Armor: {enemy.armor}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Combat Log</Typography>
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {log.map((l, i) => (
                  <ListItem key={i} divider>
                    {l}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
