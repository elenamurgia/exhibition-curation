import React from "react";
import { Container, Card } from "react-bootstrap";
import MonetImage from "../assets/Monet.jpg"; 

const About = () => {
  return (
    <div 
      style={{ 
        backgroundImage: `url(${MonetImage})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Card 
          className="shadow-lg text-center" 
          style={{ 
            maxWidth: "1200px", 
            height: "auto",
            padding: "2rem", 
            borderRadius: "15px", 
            backgroundColor: "rgba(255, 255, 255, 0.9)", 
            color: "#0D0C0A"
          }}>
          <Card.Body>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>About</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              Welcome to aRT!! Explore a world of masterpieces, handpick the artworks that inspire you and 
              curate your very own exhibition. Whether you're an art enthusiast, a curator at heart 
              or simply captivated by beauty, aRT lets you create an exhibition that reflects your vision. 
            </p>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              Get ready to create, discover and celebrate art in a way that’s unique to you!
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default About;
