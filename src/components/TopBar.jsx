import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.svg";

export default function TopBar() {
  const [show, setShow] = useState(false);
  const links = [
    { label: "Home", to: "/" },
    { label: "Battle", to: "/battle" },
    { label: "Stats", to: "/stats" },
    { label: "World", to: "/world" },
    { label: "Story", to: "/story" },
    { label: "Inventory", to: "/inventory" },
  ];

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand>
          <span className="app-logo">
            <img src={logo} alt="Abysspark logo" />
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setShow(true)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((link) => (
              <LinkContainer key={link.to} to={link.to}>
                <Nav.Link>{link.label}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {links.map((link) => (
              <LinkContainer key={link.to} to={link.to}>
                <Nav.Link onClick={() => setShow(false)}>{link.label}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
