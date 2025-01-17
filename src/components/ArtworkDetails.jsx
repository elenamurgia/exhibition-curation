import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHarvardArtworkById } from "../utils/api"; 
import { Spinner } from "react-bootstrap";

function ArtworkDetails() {
    const { id } = useParams(); 
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getHarvardArtworkById(id)
            .then((data) => {
                setArtwork(data || null);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch artwork details. Please try again.");
                setIsLoading(false);
            });
    }, [id]);

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
        <div style={{ padding: "2rem" }}>
            <h2>{artwork.title}</h2>
            <img
                src={artwork.primaryimageurl}
                alt={artwork.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p><strong>Artist:</strong> {artwork.people ? artwork.people[0]?.name : "Unknown"}</p>
            <p><strong>Date:</strong> {artwork.dated}</p>
            <p><strong>Technique:</strong> {artwork.technique || "Not specified"}</p>
            <p><strong>Culture:</strong> {artwork.culture || "Unknown"}</p>
            <p><strong>Dimensions:</strong> {artwork.dimensions || "Unknown"}</p>
            <p><strong>Provenance:</strong> {artwork.provenance || "Not available"}</p>
            <p><strong>Period:</strong> {artwork.period || "Unknown"}</p>
            <p><strong>Department:</strong> {artwork.department || "Unknown"}</p>
            <p><strong>Description:</strong> {artwork.description || "No description available."}</p>
        </div>
    );
}

export default ArtworkDetails;
