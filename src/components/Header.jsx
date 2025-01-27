import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, Navbar } from "react-bootstrap";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <Navbar bg="light" className="px-4">
      <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        aRT
      </Navbar.Brand>
      <Form className="d-flex ms-auto" onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder="Search artworks..."
          className="mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="secondary" type="submit">
           <i className="bi bi-search"></i>
        </Button>
      </Form>
    </Navbar>
  );
};

export default Header;
