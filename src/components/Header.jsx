import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, Navbar, Nav, Container, Spinner, Dropdown } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

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
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar expand="lg" className="w-100" style={{ backgroundColor: "#0D0C0A", padding: "1rem" }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "4rem", color: "#FFFFFF" }}>
          aRT
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            borderColor: "#FFFFFF",
            borderWidth: "2px",
            backgroundColor: "#FFFFFF",
          }}
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav
            className="me-auto d-flex align-items-center"
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              gap: "1.5rem", 
            }}
          >
            <Nav.Link href="/about" style={{ color: "#FFFFFF" }}>
              About
            </Nav.Link>
            <Nav.Link href="/artworks" style={{ color: "#FFFFFF" }}>
              Artworks
            </Nav.Link>
            <Nav.Link href="/dashboard" style={{ color: "#FFFFFF" }}>
              Your Exhibition
            </Nav.Link>
            {isLoading ? (
              <Spinner
                animation="border"
                size="sm"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "#D9B0D2",
                  marginLeft: "1rem",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              />
            ) : user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-user"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    gap: "0.5rem",
                    textDecoration: "none",
                    padding: 0,
                    border: "none",
                  }}
                >
                  {user.displayName || user.email.split("@")[0]}
                  <FaUserCircle size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/dashboard")}>
                    Your Exhibition
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  padding: 0,
                  border: "none",
                }}
              >
                Log In <FaUserCircle size={30} />
              </Button>
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
            <Button variant="outline-light" type="submit">
              <i className="bi bi-search" style={{ fontWeight: "bold", fontSize: "1.5rem" }}></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
