import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "/" },
    { label: "Battle", to: "/battle" },
    { label: "Stats", to: "/stats" },
    { label: "World", to: "/world" },
    { label: "Story", to: "/story" },
    { label: "Inventory", to: "/inventory" },
  ];

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
      <Toolbar sx={{ flexWrap: "wrap", gap: 1, py: 1 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span className="app-logo">
            <img src={logo} alt="Abysspark logo" />
            Abysspark
          </span>
        </Typography>

        <div className="nav-links">
          {links.map((link) => (
            <Button
              key={link.to}
              color="inherit"
              size="small"
              component={RouterLink}
              to={link.to}
            >
              {link.label}
            </Button>
          ))}
        </div>
        <IconButton
          className="nav-toggle"
          color="inherit"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 220 }}>
          {links.map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={link.to}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
