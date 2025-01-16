import React from "react";
import { Card, Button } from "react-bootstrap";

function ArtworkCard({ image, title, artist, date, onAddToGallery, onViewDetails }) {
    return (
        <Card style={{ marginBottom: "1rem", borderRadius: "8px"}}>
            <Card.Img
                variant="top"
                src={image}
                alt={title}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title style={{ fontSize: "1rem", fontWeight: "bold" }}>{title}</Card.Title>
                <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}> 
                    <strong>Artist:</strong> {artist}
                </Card.Text>
                {date && (
                    <Card.Text style={{ fontSize: "0.8rem", color:"#777" }}>
                        <strong>Date:</strong> {date}
                    </Card.Text>
                )}
                <div className="d-flex justify-conteent-between">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onViewDetails}
                    >
                        View Details
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onAddToGallery}
                    >
                        Add to My Gallery
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ArtworkCard;