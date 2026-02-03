import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="page center">
      <h2>Text RPG</h2>
      <p>Menu-based, turn-based prototype</p>

      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={() => nav("/battle")}>
          Start Battle
        </Button>
        <Button variant="outlined" onClick={() => nav("/stats")}>
          Stats
        </Button>
        <Button variant="outlined" onClick={() => nav("/inventory")}>
          Inventory
        </Button>
      </Stack>
    </div>
  );
}
