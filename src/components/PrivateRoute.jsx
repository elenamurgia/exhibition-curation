import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

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

    if (loading) return <p>Loading...</p>;

    if (!user) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>You need to be logged in to access this page.</p>
                <p>
                    <Link to="/login" state={{ from: location }}>Click here to log in</Link>
                </p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return children;
};

export default PrivateRoute;