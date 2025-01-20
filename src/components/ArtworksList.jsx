import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUnifiedArtworks } from "../utils/api";
import { Container, Spinner, Button, Form } from "react-bootstrap";

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
                    <option value={10}>20 per page</option>
                    <option value={20}>40 per page</option>
                    <option value={50}>100 per page</option>
                    <option value={100}>200 per page</option>
                    <option value={250}>500 per page</option>
                </Form.Select>
            </div>

            <div className="artwork-grid">
                {artworks.map((artwork) => (
                    <div key={artwork.id} className="artwork-card">
                        <img
                            src={artwork.primaryimageurl}
                            alt={artwork.title}
                            onError={(e) => (e.target.src = "/placeholder.jpg")}
                        />
                        <div className="artwork-card-body">
                            <div className="artwork-card-title">{artwork.title || "Untitled"}</div>
                            <div className="artwork-card-artist">
                                <strong>Artist:</strong> {artwork.people ? artwork.people[0]?.name : "Unknown"}
                            </div>
                            {artwork.dated && (
                                <div className="artwork-card-date">
                                    <strong>Date:</strong> {artwork.dated}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

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
