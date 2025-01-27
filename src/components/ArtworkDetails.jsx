import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnifiedArtworkById } from "../utils/api"; 
import { Spinner } from "react-bootstrap";

function ArtworkDetails() {
    const { id, source } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getUnifiedArtworkById(id, source)
            .then((data) => {
                setArtwork(data || null);
                setIsLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch artwork details. Please try again.");
                setIsLoading(false);
            });
    }, [id, source]);

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

    if (!artwork) {
        return <p style={{ textAlign: "center" }}>Artwork not found.</p>;
    }

    return (
        <div className="row justify-content-center align-items-center">
            <div className="card mb-3" style={{ width: "100%", height: "auto", margin: "0 auto" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={artwork.image || artwork.primaryimageurl}
                            alt={artwork.title}
                            className="img-fluid rounded-start"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-start">
                            <h4 className="card-title"><strong>{artwork.title}</strong></h4>
                            <p className="card-text"><strong>Artist:</strong> {artwork.artist || "Unknown Artist"}</p>
                            <p className="card-text"><strong>Date:</strong> {artwork.date || "Unknown Date"}</p>
                            <p className="card-text"><strong>Medium:</strong> {artwork.medium || "Not specified"}</p>
                            <p className="card-text"><strong>Dimensions:</strong> {artwork.dimensions || "Not specified"}</p>
                            <p className="card-text"><strong>Culture:</strong> {artwork.culture || "Unknown"}</p>
                            <p className="card-text">
                                <strong>Description:</strong> {artwork.description || "No description available"}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">Source: {artwork.source}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtworkDetails;
