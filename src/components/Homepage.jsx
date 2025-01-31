import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from './ArtworkCard';
import ManetImage from '../assets/Manet.jpg';

const Homepage = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const data = await getUnifiedArtworks(1, 6); 
                setArtworks(data);
            } catch (error) {
                console.error('Failed to fetch artworks', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, []);

    const handleViewMore = () => {
        navigate('/artworks'); 
    };

    const groupedArtworks = artworks.reduce((result, artwork, index) => {
        const groupIndex = Math.floor(index / 4); 
        if (!result[groupIndex]) result[groupIndex] = [];
        result[groupIndex].push(artwork);
        return result;
    }, []);

    return (
        <Container >
            <div>
                <h1 className="display-4 d-sm-none d-md-block" style={{fontWeight: "bold", color: "#0D0C0A"}}>Explore the World of Art</h1>
                <img src={ManetImage} alt="Art Showcase" className="img-fluid rounded-circle" style={{ width: '100%', height: "auto" }}/>
                <h5 className="display-6 d-sm-none d-md-block" style={{fontWeight: "bold", color: "#0D0C0A"}}>Create your Exhibition</h5>
            </div>
            {loading ? (
                <div>
                    <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
                    <p className="loading-text" style={{fontSize: "1.5rem", color: "#0D0C0A"}}>Loading...</p>
                </div>
            ) : (
                <>
                    <div className="carousel-container">
                        <Row className="justify-content-between align-items-center">
                            <Col xs="auto" className="ms-auto d-flex justify-content-end">
                                <Button
                                    type="button"
                                    className="btn text-#0D0C0A btn-sm btn-md px-3 px-md-4 py-1 py-md-2 fs-7 fs-md-6"
                                    style={{
                                        backgroundColor: "#0D0C0A",
                                        color: "#FFFFFF",            
                                        fontWeight: "bold",        
                                        fontSize: "1rem",      
                                        border: "none", 
                                        margin: "0.5rem",          
                                    }}
                                    onClick={handleViewMore}
                                >
                                    View All
                                </Button>
                            </Col>
                        </Row>
                        <Carousel className="carousel slide" data-bs-ride="carousel">
                            {groupedArtworks.map((group, idx) => (
                                <Carousel.Item key={idx}>
                                    <Row className="justify-content-center">
                                        {group.map((artwork) => (
                                            <Col
                                                key={artwork.id}
                                                xl={3}
                                                lg={4}
                                                md={6}
                                                sm={12}
                                                className="artwork-col"
                                            >
                                                <ArtworkCard {...artwork} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Homepage;
