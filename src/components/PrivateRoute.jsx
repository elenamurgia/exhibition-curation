import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Container, Button, Spinner, Alert } from "react-bootstrap";

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" style={{ color: "#0D0C0A" }} />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="text-center mt-5" style={{ maxWidth: "500px", backgroundColor: "#FFFFFF", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <Alert variant="danger" style={{ backgroundColor: "#F8D7DA", color: "#721C24", borderColor: "#F5C6CB" }}>
                    <p>You need to be logged in to access this page.</p>
                </Alert>
                <p>
                    <Link to="/login" state={{ from: location }} style={{ color: "#0D0C0A", fontWeight: "bold", textDecoration: "underline" }}>Click here to log in</Link>
                </p>
                <Button 
                    variant="outline-dark" 
                    onClick={() => navigate(-1)} 
                    style={{ fontWeight: "bold" }}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    return children;
};

export default PrivateRoute;
