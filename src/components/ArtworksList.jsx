import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col } from 'react-bootstrap';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from './ArtworkCard';
import ArtworkFilter from './ArtworkFilter';

const ArtworksList = () => {
    const [artworks, setArtworks] = useState([]);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const data = await getUnifiedArtworks(page, 20);
                setArtworks(data);
                setFilteredArtworks(data); 
            } catch (error) {
                console.error('Failed to fetch artworks', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [page]);

    const handleMuseumFilter = (selectedMuseum) => {
        if (selectedMuseum === "") {
        setFilteredArtworks(artworks);
        } else {
        const filtered = artworks.filter(
            (artwork) => artwork.source === selectedMuseum
        );
        setFilteredArtworks(filtered);
        }
    };

    const handleDateFilter = (startDate, endDate) => {
        const filtered = artworks.filter((artwork) => {
            const artworkDate = parseInt(artwork.date, 10); 
            if (isNaN(artworkDate)) return false; 
            if (startDate && endDate) {
                return artworkDate >= startDate && artworkDate <= endDate;
            } else if (startDate) {
                return artworkDate >= startDate;
            } else if (endDate) {
                return artworkDate <= endDate;
            }
            return true; 
        });
        setFilteredArtworks(filtered);
    };

    return (
        <Container >
            <h2 className="mb-4">Artworks</h2>
            <ArtworkFilter 
                onFilterChange={handleMuseumFilter} 
                onDateFilterChange={handleDateFilter}
            />
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Row className="artwork-grid">
                    {filteredArtworks.map((artwork) => (
                        <Col md={4} sm={6} xs={12} key={artwork.id}>
                            <ArtworkCard {...artwork} />
                        </Col>
                    ))}
                    </Row>
                )}
            <div className="d-flex justify-content-between mt-3">
                <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} variant="secondary">
                    Previous
                </Button>
                <Button onClick={() => setPage((prev) => prev + 1)} variant="secondary">
                    Next
                </Button>
            </div>
        </Container>
    );
};

export default ArtworksList;
