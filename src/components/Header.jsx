import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false); 
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("")
      setIsSearchActive(false)
    }
  };

  const isMobile = useMediaQuery({query: '(max-width: 768px)'})

  return (
    <Container fluid className="header-container" style={{ width: '100%', padding: 0 }}>
      <Row className="align-items-center" style={{ width: '100%', margin: 0 }}>
        <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <a href="/" style={{ textDecoration: "none", color: "#012E40" }}>
            <h1 className="h1" style={{ fontWeight: "bold", margin: '0'}}>
              <strong>aRT</strong>
            </h1>
          </a>
          {isMobile && (
            <>
              {isSearchActive ? (
                <Form className="d-flex" onSubmit={handleSearch} style={{ marginLeft: '10px', flexGrow: 1 }}>
                  <FormControl
                    type="search"
                    placeholder="Search NC News..."
                    className="mr-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                  <Button variant="outline-secondary" type="submit">
                    <Search />
                  </Button>
                </Form>
              ) : (
                <Button 
                  variant="link" 
                  style={{ padding: '0 10px', color: '#012E40' }}
                  onClick={() => setIsSearchActive(true)}
                >
                  <Search />
                </Button>
              )}
            </>
          )}
        </Col>
        {!isMobile && (
          <Col md="auto">
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search NC News..."
                className="mr-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Button variant="outline-secondary" type="submit">
                <Search />
              </Button>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Header;