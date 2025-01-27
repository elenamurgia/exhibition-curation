import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function CustomNavbar() {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Exhibition Curator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/artworks">Artworks</Nav.Link>
            <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
