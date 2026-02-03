import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Text RPG
        </Typography>

        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/battle">
          Battle
        </Button>
        <Button color="inherit" component={RouterLink} to="/stats">
          Stats
        </Button>
        <Button color="inherit" component={RouterLink} to="/inventory">
          Inventory
        </Button>
      </Toolbar>
    </AppBar>
  );
}
