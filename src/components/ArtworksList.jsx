import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from "./ArtworkCard";
import { Row, Col, Container, Spinner, Button, Form } from "react-bootstrap";

function ArtworksList() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); 
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getUnifiedArtworks(page, pageSize)
            .then((data) => {
                setArtworks(data || []);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch artworks. Please try again.");
                setIsLoading(false);
            });
    }, [page, pageSize]);

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value, 10));
        setPage(1); 
    };

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    return (
        <Container>
            <h2 className="mb-4">Artworks</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="secondary" onClick={handlePrevPage} disabled={page === 1}>
                    Previous Page
                </Button>
                <span>Page {page}</span>
                <Button variant="secondary" onClick={handleNextPage}>
                    Next Page
                </Button>
                <Form.Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    style={{ width: "auto", display: "inline-block" }}
                >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                </Form.Select>
            </div>

            <Row>
                {artworks.map((artwork) => (
                    <Col key={artwork.id} xs={12} sm={6} md={4} lg={3}>
                        <ArtworkCard
                            image={artwork.primaryimageurl}
                            title={artwork.title}
                            artist={artwork.people ? artwork.people[0]?.name : "Unknown"}
                            date={artwork.dated}
                            onViewDetails={() => navigate(`/artworks/${artwork.id}`)}
                            onAddToGallery={() => console.log(`Added ${artwork.id} to gallery`)}
                        />
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <Button variant="secondary" onClick={handlePrevPage} disabled={page === 1}>
                    Previous Page
                </Button>
                <span>Page {page}</span>
                <Button variant="secondary" onClick={handleNextPage}>
                    Next Page
                </Button>
            </div>
        </Container>
    );
}

export default ArtworksList;
