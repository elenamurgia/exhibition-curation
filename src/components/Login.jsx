import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState(0); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            setEmail("");
            setPassword("");

            setFormKey((prevKey) => prevKey + 1);

            navigate("/dashboard");
        } catch (error) {
            let errorMessage = "Invalid email or password.";

            if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email format. Please check your email.";
            } else if (error.code === "auth/user-not-found") {
                errorMessage = "No account found with this email. Please register first.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password. Please try again.";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many failed attempts. Please try again later.";
            } else if (error.code === "auth/network-request-failed") {
                errorMessage = "Network error. Please check your internet connection.";
            }

            setError(errorMessage);
            console.error("Error logging in:", error.message);
            setEmail("");
            setPassword("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid style={{ width: "100%", padding: "0", margin: "0" }}>
            <h2 className="mb-4 text-center" style={{ color: "#0D0C0A", fontWeight: "bold" }}>Login</h2>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Form
                onSubmit={handleLogin}
                key={formKey} 
                style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}
            >
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
                <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100" 
                    disabled={loading}
                    style={{ backgroundColor: "#0D0C0A", color: "#FFFFFF", fontWeight: "bold" }}
                >
                    {loading ? (
                        <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
                    ) : (
                        "Login"
                    )}
                </Button>
            </Form>
            <div className="mt-3 text-center">
                <p style={{ color: "#0D0C0A" }}>
                    Don't have an account? <Link to="/register" style={{ color: "#0D0C0A", textDecoration: "underline", fontWeight: "bold" }}>Register</Link>
                </p>
            </div>
        </Container>
    );
};

export default Login;