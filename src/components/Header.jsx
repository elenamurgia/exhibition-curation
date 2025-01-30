import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, Navbar, Nav, Container, Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = ({ isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Destructure user from useAuth

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/register");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="w-100" style={{ paddingLeft: "2rem", paddingRight: "2rem", marginLeft: "2rem", marginRight: "2rem", marginTop: "1rem" }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "4.5rem" }}>
          aRT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/artworks">Artworks</Nav.Link>
            <Nav.Link href="/dashboard">Your Exhibition</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              user && (
                <Nav.Item>
                  <p style={{ margin: "0", padding: "0.5rem 1rem", color: "#555" }}>
                    Welcome, {user.email}
                  </p>
                </Nav.Item>
              )
            )}
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search artworks..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search"
            />
            <Button variant="outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          {user && (
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;