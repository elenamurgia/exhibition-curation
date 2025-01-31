import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ArtworkCard = ({ id, title, image, artist, date, source }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/artworks/${source}/${id}`);
    };

    return (
        <Card 
            className="mb-4 artwork-card" 
            onClick={handleClick} 
            style={{ 
                cursor: 'pointer', 
                border: 'none',
                backgroundColor: '#0D0C0A', 
                color: '#FFFFFF', 
                borderRadius: '15px', 
            }}
            >
            <Card.Img 
                variant="top" 
                src={image} 
                alt={title} 
                style={{
                    borderTopLeftRadius: '15px', 
                    borderTopRightRadius: '15px',
                }}
            />
            <Card.Body style={{ textAlign: 'center', padding: '1.5rem' }}>
                <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
                    {title}
                </Card.Title>
                <Card.Text style={{ fontSize: '0.9rem' }}>
                    <strong>Artist:</strong> {artist}<br />
                    <strong>Date:</strong> {date}<br />
                    <strong>Source:</strong> {source}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ArtworkCard;
