import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnifiedArtworkById } from "../utils/api"; 
import { Spinner, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

function ArtworkDetails() {
    const { id, source } = useParams();
    const { user } = useAuth();
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInExhibition, setIsInExhibition] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

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

    useEffect(() => {
        if (!user || !artwork) return;

        const checkIfInExhibition = async () => {
            const exhibitionRef = collection(db, `users/${user.uid}/exhibition`);
            const q = query(exhibitionRef, where("id", "==", artwork.id));
            const querySnapshot = await getDocs(q);
            setIsInExhibition(!querySnapshot.empty);
        };

        checkIfInExhibition();
    }, [user, artwork]);

    const handleAddToExhibition = async () => {
        if (!user || !artwork) return;
        setLoadingAction(true);
        try {
            const exhibitionRef = collection(db, `users/${user.uid}/exhibition`);
            await addDoc(exhibitionRef, {
                id: artwork.id,
                title: artwork.title,
                image: artwork.image || artwork.primaryimageurl,
                artist: artwork.artist,
                date: artwork.date,
                source: artwork.source,
            });
            setIsInExhibition(true);
        } catch (error) {
            console.error("Error adding artwork:", error);
            alert("Failed to add artwork to exhibition.");
        } finally {
            setLoadingAction(false);
        }
    };

    const handleRemoveFromExhibition = async () => {
        if (!user || !artwork) return;
        setLoadingAction(true);
        try {
            const exhibitionRef = collection(db, `users/${user.uid}/exhibition`);
            const q = query(exhibitionRef, where("id", "==", artwork.id));
            const querySnapshot = await getDocs(q);
            const deletePromises = querySnapshot.docs.map((docSnapshot) =>
                deleteDoc(doc(db, `users/${user.uid}/exhibition`, docSnapshot.id))
            );
            await Promise.all(deletePromises);
            setIsInExhibition(false);
        } catch (error) {
            console.error("Error removing artwork:", error);
            alert("Failed to remove artwork from exhibition.");
        } finally {
            setLoadingAction(false);
        }
    };

    if (isLoading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    if (!artwork) {
        return <p style={{ textAlign: "center" }}>Artwork not found.</p>;
    }

    return (
        <Container className="mt-4">
            <Card className="shadow-lg">
                <Row className="g-0">
                    <Col md={8}>
                        <Card.Body className="text-start">
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
                            {user && (
                                <div className="d-flex mt-3">
                                    {isInExhibition ? (
                                        <Button
                                            variant="danger"
                                            className="me-2"
                                            onClick={handleRemoveFromExhibition}
                                            disabled={loadingAction}
                                        >
                                            {loadingAction ? "Removing..." : "Remove from your Exhibition"}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            className="me-2"
                                            onClick={handleAddToExhibition}
                                            disabled={loadingAction}
                                        >
                                            {loadingAction ? "Adding..." : "Add to your Exhibition"}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </Card.Body>
                    </Col>
                    <Col md={4} className="d-flex align-items-center">
                        <Card.Img
                            src={artwork.image || artwork.primaryimageurl}
                            alt={artwork.title}
                            className="img-fluid rounded-end"
                        />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default ArtworkDetails;
