import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ marginTop: "auto", backgroundColor: "#0D0C0A", color: "#FFFFFF", padding: "1.5rem 0" }}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            <p style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              This website sources its data from the collections of the following museums:
            </p>
          </Col>
          <Col xs={12}>
            <p style={{ fontSize: "0.9rem" }}>
              <a 
                href="https://harvardartmuseums.org/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#FFFFFF", textDecoration: "none" }}
              >
                Harvard Art Museums
              </a> | 
              <a 
                href="https://www.rijksmuseum.nl/en" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#FFFFFF", textDecoration: "none", marginLeft: "10px" }}
              >
                Rijksmuseum
              </a> | 
              <a 
                href="https://www.artic.edu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#FFFFFF", textDecoration: "none", marginLeft: "10px" }}
              >
                Art Institute of Chicago 
              </a> | 
              <a 
                href="https://www.metmuseum.org/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#FFFFFF", textDecoration: "none", marginLeft: "10px" }}
              >
                The Met Museum
              </a>
            </p>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p style={{ fontSize: "0.8rem", margin: 0 }}>
              &copy; {new Date().getFullYear()} aRT. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
