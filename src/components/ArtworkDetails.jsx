import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnifiedArtworkById } from "../utils/api"; 
import { Spinner, Modal } from "react-bootstrap";

function ArtworkDetails() {
    const { id, source } = useParams(); 
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to handle modal visibility

    
    useEffect(() => {
        setIsLoading(true);
        getUnifiedArtworkById(id, source)
            .then((data) => {
                setArtwork(data || null);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch artwork details. Please try again.");
                setIsLoading(false);
            });
    }, [id, source]);

    const handleImageClick = () => {
        setShowModal(true); // Open the modal when the image is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
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

    if (!artwork) {
        return <p style={{ textAlign: "center" }}>Artwork not found.</p>;
    }

    return (
        <div className="artwork-details">
            <h2>{artwork.title}</h2>
            <img
                src={artwork.image || artwork.primaryimageurl}
                alt={artwork.title}
                className="artwork-details-img"
                style={{ cursor: "pointer" }} // Indicate it's clickable
                onClick={handleImageClick} // Handle click on the image
            />
            <div className="artwork-details-info">
                <p><strong>Artist:</strong> {artwork.artist || "Unknown Artist"}</p>
                <p><strong>Date:</strong> {artwork.date || "Unknown Date"}</p>
                <p><strong>Technique:</strong> {artwork.technique || "Not specified"}</p>
            </div>

            {/* Modal to display the larger image */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{artwork.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={artwork.image || artwork.primaryimageurl}
                        alt={artwork.title}
                        style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ArtworkDetails;