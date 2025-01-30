import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useExhibition } from '../hooks/useExhibition';
import { useAuth } from "../hooks/useAuth";

const ArtworkCard = ({ id, title, image, artist, date, source }) => {
    const navigate = useNavigate();
    const { addArtwork, loading } = useExhibition();
    const { user } = useAuth();

    const handleClick = () => {
        navigate(`/artworks/${source}/${id}`);
    };

    const handleAddToExhibition = () => {
    if (!user) {
        alert("You must be logged in to add artwork!");
        return;
    }

    const artwork = { id, title, image, artist, date, source };
    addArtwork(artwork)
        .then(() => alert('Artwork added successfully!'))
        .catch((error) => alert(error.message));
};
    return (
        <Card className="mb-4 artwork-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src={image} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Artist:</strong> {artist}<br />
                    <strong>Date:</strong> {date}<br />
                    <strong>Source:</strong> {source}
                </Card.Text>
                <Button variant="secondary" onClick={handleAddToExhibition} disabled={loading}>
                    {loading ? "Adding..." : "Add to Exhibition"}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ArtworkCard;