import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Art Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/artworks">Artworks</Nav.Link>
            <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
            <Nav.Link as={Link} to="/museums">Museums</Nav.Link>
            <Nav.Link as={Link} to="/art-books">Art Books</Nav.Link>
            <Nav.Link as={Link} to="/my-gallery">My Gallery</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
