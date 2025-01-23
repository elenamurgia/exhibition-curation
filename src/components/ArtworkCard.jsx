import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ArtworkCard = ({ id, title, image, artist, date, source }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/artworks/${source}/${id}`);
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
            </Card.Body>
        </Card>
    );
};

export default ArtworkCard;
