import React, { useState, useEffect } from 'react';
import { getHarvardArtworks } from '../utils/api';
import { Row, Col, Container, Spinner } from "react-bootstrap"

function Artworks() {
  const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        getHarvardArtworks(page)
            .then((data) => {
                setArtworks(data.records || []);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch artworks. Please try again.");
                setIsLoading(false);
            });
    }, [page]);

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

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
            <Row>
                {artworks.map((artwork) => (
                    <Col key={artwork.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
                            {artwork.primaryimageurl ? (
                                <img
                                    src={artwork.primaryimageurl}
                                    alt={artwork.title || "Artwork Image"}
                                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        backgroundColor: "#e0e0e0",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <span style={{ color: "#757575" }}>No Image Available</span>
                                </div>
                            )}
                            <h5 style={{ marginTop: "1rem" }}>{artwork.title || "Untitled"}</h5>
                            <p style={{ color: "#555", fontSize: "0.9rem" }}>
                                <strong>Artist:</strong> {artwork.people?.[0]?.name || "Unknown"}
                            </p>
                        </div>
                    </Col>
                ))}
            </Row>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button onClick={handlePrevPage} disabled={page === 1} className="btn btn-secondary me-2">
                    Previous
                </button>
                <button onClick={handleNextPage} className="btn btn-primary">
                    Next
                </button>
            </div>
        </Container>
    );
}

export default Artworks;