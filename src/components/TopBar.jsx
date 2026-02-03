import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#f8fafc",
        color: "inherit",
        boxShadow: "none",
        borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span className="app-logo">
            <img src={logo} alt="Abysspark logo" />
            Abysspark
          </span>
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
        <Button color="inherit" component={RouterLink} to="/world">
          World
        </Button>
        <Button color="inherit" component={RouterLink} to="/story">
          Story
        </Button>
        <Button color="inherit" component={RouterLink} to="/inventory">
          Inventory
        </Button>
      </Toolbar>
    </AppBar>
  );
}
