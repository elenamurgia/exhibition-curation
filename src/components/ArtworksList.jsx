import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col } from 'react-bootstrap';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from './ArtworkCard';

const ArtworksList = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const data = await getUnifiedArtworks(page, 12);
                setArtworks(data);
            } catch (error) {
                console.error('Failed to fetch artworks', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [page]);

    return (
        <Container >
            <h2 className="mb-4">Artworks</h2>
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Row className="artwork-grid">
                    {artworks.map((artwork) => (
                        <Col md={4} sm={6} xs={12} key={artwork.id}>
                            <ArtworkCard key={artwork.id} {...artwork} />
                        </Col>
                    ))}
                </Row>
            )}
            <div className="d-flex justify-content-between mt-3">
                <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </Button>
                <Button onClick={() => setPage((prev) => prev + 1)}>
                    Next
                </Button>
            </div>
        </Container>
    );
};

export default ArtworksList;
