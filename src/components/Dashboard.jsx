import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ArtworkCard from "./ArtworkCard";
import { Container, Button, Spinner, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { FaTh, FaList, FaImages } from "react-icons/fa";

const Dashboard = () => {
    const { user } = useAuth();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid"); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        fetchArtworks();
    }, [user]);

    const fetchArtworks = async () => {
        setLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(collection(db, `users/${user.uid}/exhibition`));
            const fetchedArtworks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArtworks(fetchedArtworks);
        } catch (error) {
            console.error("Error fetching artworks:", error);
            setError("Failed to load your artworks. Please try again later.");
        }
        setLoading(false);
    };

    return (
        <Container fluid style={{ width: "100%", padding: "0", margin: "0", color: "#0D0C0A" }}>
            <h3 className="text-center" style={{ fontWeight: "bold" }}>Your Exhibition ({artworks.length} artworks)</h3>
            {error && (
                <div className="text-center mt-3">
                    <p className="text-danger">{error}</p>
                    <Button variant="dark" onClick={fetchArtworks}>Retry</Button>
                </div>
            )}
            <div className="d-flex justify-content-end my-3">
                <Button 
                    onClick={() => setViewMode("grid")} 
                    className="me-2" 
                    title="Grid View (Multiple artworks per row)"
                    style={{ 
                        backgroundColor: viewMode === "grid" ? "#FFFFFF" : "#0D0C0A", 
                        border: viewMode === "grid" ? "1px solid #0D0C0A" : "none", 
                        color: viewMode === "grid" ? "#0D0C0A" : "#FFFFFF", 
                        fontWeight: "bold" 
                    }}
                >
                    <FaTh size={20} />
                </Button>
                <Button 
                    onClick={() => setViewMode("carousel")} 
                    className="me-2" 
                    title="Carousel View (Scroll through artworks)"
                    style={{ 
                        backgroundColor: viewMode === "carousel" ? "#FFFFFF" : "#0D0C0A", 
                        border: viewMode === "carousel" ? "1px solid #0D0C0A" : "none", 
                        color: viewMode === "carousel" ? "#0D0C0A" : "#FFFFFF", 
                        fontWeight: "bold" 
                    }}
                >
                    <FaImages size={20} />
                </Button>
                <Button 
                    onClick={() => setViewMode("list")} 
                    title="List View (One artwork per row)"
                    style={{ 
                        backgroundColor: viewMode === "list" ? "#FFFFFF" : "#0D0C0A", 
                        border: viewMode === "list" ? "1px solid #0D0C0A" : "none", 
                        color: viewMode === "list" ? "#0D0C0A" : "#FFFFFF", 
                        fontWeight: "bold" 
                    }}
                >
                    <FaList size={20} />
                </Button>
            </div>
            
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
                    <p className="loading-text" style={{fontSize: "1.5rem", color: "#0D0C0A"}}>Loading...</p>
                </div>
            ) : artworks.length > 0 ? (
                viewMode === "grid" ? (
                    <Row className="mt-3">
                        {artworks.map((artwork) => (
                            <Col md={3} sm={6} xs={12} key={artwork.id} className="mb-4">
                                <ArtworkCard 
                                    {...artwork} 
                                    refreshArtworks={fetchArtworks} 
                                    style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                            </Col>
                        ))}
                    </Row>
                ) : viewMode === "carousel" ? (
                    <Carousel>
                        {artworks.map((artwork) => (
                            <Carousel.Item key={artwork.id}>
                                <ArtworkCard {...artwork} refreshArtworks={fetchArtworks} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div className="mt-3">
                        {artworks.map((artwork) => (
                            <div key={artwork.id} className="mb-3">
                                <ArtworkCard {...artwork} refreshArtworks={fetchArtworks} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="text-center mt-4">
                    <p>No artworks in your exhibition yet.</p>
                    <p>
                        <Button 
                            variant="link" 
                            onClick={() => navigate("/artworks")} 
                            style={{
                                textDecoration: "underline",
                                color: "#0D0C0A",
                                fontWeight: "bold",
                            }}
                        >
                            Search for artworks here
                        </Button>
                    </p>
                </div>
            )}
        </Container>
    );
};

export default Dashboard;
