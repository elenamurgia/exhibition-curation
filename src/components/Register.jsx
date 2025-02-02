import React, { useState } from "react";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

const Register = () => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState(0); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name, 
                email: user.email,
                exhibitions: [],
            });
            
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setFormKey((prevKey) => prevKey + 1);

            navigate("/dashboard");
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("This email is already in use.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address.");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak.");
                    break;
                default:
                    setError("An error occurred. Please try again later.");
                    break;
            }
            console.error("Error registering:", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
                <p className="loading-text" style={{fontSize: "1.5rem", color: "#0D0C0A"}}>Loading...</p>
            </Container>
        );
    }

    return (
        <Container fluid style={{ width: "100%", padding: "0", margin: "0" }}>
            <h2 className="mb-4 text-center" style={{ color: "#0D0C0A", fontWeight: "bold" }}>Register</h2>
            {error && <Alert variant="danger" style={{ backgroundColor: "#F8D7DA", color: "#721C24", borderColor: "#F5C6CB" }}>{error}</Alert>}
            <Form
                onSubmit={handleRegister}
                key={formKey}
                style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
            >
                <Form.Group controlId="formBasicName" className="mb-3">
                    <Form.Label style={{ color: "#0D0C0A", fontWeight: "bold" }}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            border: "1px solid #0D0C0A",
                            color: "#0D0C0A",
                        }}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label style={{ color: "#0D0C0A", fontWeight: "bold" }}>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            border: "1px solid #0D0C0A",
                            color: "#0D0C0A",
                        }}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label style={{ color: "#0D0C0A", fontWeight: "bold" }}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            border: "1px solid #0D0C0A",
                            color: "#0D0C0A",
                        }}
                        autoComplete="new-password" 
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label style={{ color: "#0D0C0A", fontWeight: "bold" }}>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            border: "1px solid #0D0C0A",
                            color: "#0D0C0A",
                        }}
                        autoComplete="new-password" 
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                    style={{ backgroundColor: "#0D0C0A", color: "#FFFFFF", fontWeight: "bold" }}
                >
                    {loading ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    ) : (
                        "Register"
                    )}
                </Button>
            </Form>
            <div className="mt-3 text-center">
                <p style={{ color: "#0D0C0A" }}>
                    Already have an account? <Link to="/login" style={{ color: "#0D0C0A", textDecoration: "underline", fontWeight: "bold" }}>Login</Link>
                </p>
            </div>
        </Container>
    );
};

export default Register;
