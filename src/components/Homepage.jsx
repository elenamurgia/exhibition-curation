import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from './ArtworkCard';

const Homepage = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const data = await getUnifiedArtworks(1, 6); // Fetch only 6 artworks
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
        navigate('/artworks'); // Redirect to ArtworksList page
    };

    return (
        <Container className="homepage-container">
            <h1 className="homepage-title">Welcome to your Art Exhibition</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Row className="homepage-gallery">
                    {artworks.map((art) => (
                        <Col md={4} sm={6} xs={12} key={art.id}>
                            <ArtworkCard key={art.id} {...art} />
                        </Col>
                    ))}
                </Row>
            )}
            <div className="text-center mt-4">
                <Button variant="primary" onClick={handleViewMore}>
                    View More
                </Button>
            </div>
        </Container>
    );
};

export default Homepage;
