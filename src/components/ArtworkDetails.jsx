import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUnifiedArtworkById } from "../utils/api"; 
import { Spinner, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

function ArtworkDetails() {
    const { id, source } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInExhibition, setIsInExhibition] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUnifiedArtworkById(id, source)
            .then((data) => {
                if (!data) {
                    setError("Artwork not found. It may have been removed or is unavailable.");
                }
                setArtwork(data || null);
            })
            .catch(() => {
                setError("Failed to fetch artwork details. Please check your internet connection and try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, source]);

    useEffect(() => {
        if (!user || !artwork) return;

        const checkIfInExhibition = async () => {
            try {
                const exhibitionRef = collection(db, `users/${user.uid}/exhibition`);
                const q = query(exhibitionRef, where("id", "==", artwork.id));
                const querySnapshot = await getDocs(q);
                setIsInExhibition(!querySnapshot.empty);
            } catch (error) {
                console.error("Error checking exhibition status:", error);
            }
        };

        checkIfInExhibition();
    }, [user, artwork]);

    const handleLoginRedirect = () => {
        navigate("/login");
    };

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
                <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
                <p className="loading-text" style={{fontSize: "1.5rem", color: "#0D0C0A"}}>Loading...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-4">
                <Alert variant="danger">{error}</Alert>
                <Button variant="dark" onClick={() => window.location.reload()}>Retry</Button>
            </Container>
        );
    }

    if (!artwork) {
        return <p style={{ textAlign: "center", color: "D9B0D2"}}>Artwork not found.</p>;
    }

    return (
        <Container fluid style={{ width: "100%", padding: "0", margin: "0" }}>
            <Card
                className="shadow-lg"
                style={{
                    border: "none",
                    borderRadius: "15px",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Row className="g-0">
                    <Col md={8}>
                        <Card.Body className="text-start" style={{ color: "#0D0C0A", padding: "2rem" }}>
                            <h4 className="card-title" style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                                {artwork.title}
                            </h4>
                            <p className="card-text">
                                <strong>Artist:</strong> {artwork.artist || "Unknown Artist"}
                            </p>
                            <p className="card-text">
                                <strong>Date:</strong> {artwork.date || "Unknown Date"}
                            </p>
                            <p className="card-text">
                                <strong>Medium:</strong> {artwork.medium || "Not specified"}
                            </p>
                            <p className="card-text">
                                <strong>Dimensions:</strong> {artwork.dimensions || "Not specified"}
                            </p>
                            <p className="card-text">
                                <strong>Culture:</strong> {artwork.culture || "Unknown"}
                            </p>
                            <p className="card-text">
                                <strong>Description:</strong> {artwork.description || "No description available"}
                            </p>
                            <p className="card-text">
                                <small>Source: {artwork.source}</small>
                            </p>
                            {user ? (
                                <div className="d-flex mt-3">
                                    {isInExhibition ? (
                                        <Button
                                            style={{
                                                backgroundColor: "#0D0C0A",
                                                color: "#FFFFFF",
                                                fontWeight: "bold",
                                                border: "none",
                                            }}
                                            className="me-2"
                                            onClick={handleRemoveFromExhibition}
                                            disabled={loadingAction}
                                        >
                                            {loadingAction ? "Removing..." : "Remove from your Exhibition"}
                                        </Button>
                                    ) : (
                                        <Button
                                            style={{
                                                backgroundColor: "#0D0C0A",
                                                color: "#FFFFFF",
                                                fontWeight: "bold",
                                                border: "none",
                                            }}
                                            className="me-2"
                                            onClick={handleAddToExhibition}
                                            disabled={loadingAction}
                                        >
                                            {loadingAction ? "Adding..." : "Add to your Exhibition"}
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    style={{ backgroundColor: "#0D0C0A", color: "#FFFFFF", fontWeight: "bold", border: "none" }}
                                    className="me-2"
                                    onClick={handleLoginRedirect}
                                >
                                    Log in to save to Exhibition
                                </Button>
                            )}
                        </Card.Body>
                    </Col>
                    <Col md={4} className="d-flex align-items-center">
                        <Card.Img
                            src={artwork.image || artwork.primaryimageurl}
                            alt={artwork.title}
                            className="img-fluid"
                            style={{
                                borderRadius: "0 15px 15px 0",
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default ArtworkDetails;
