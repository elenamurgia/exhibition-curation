import React, { useState, useEffect } from "react";
import { db, auth } from "../utils/firebase"; 
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore"; 
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ArtworkCard from "./ArtworkCard";

const Dashboard = () => {
    const { user } = useAuth();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        fetchArtworks();
    }, [user]);

    const fetchArtworks = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, `users/${user.uid}/exhibition`));
            const fetchedArtworks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArtworks(fetchedArtworks);
        } catch (error) {
            console.error("Error fetching artworks:", error);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            <h2>Welcome, {user ? user.email : "Guest"}</h2>
            {user && <p>This is your personal exhibition page.</p>}
            <button onClick={handleLogout}>Logout</button>

            <h3>Your Exhibition</h3>
            {loading ? (
                <p>Loading...</p>
            ) : artworks.length > 0 ? (
                <div>
                    {artworks.map((artwork) => (
                        <ArtworkCard key={artwork.id} {...artwork} refreshArtworks={fetchArtworks} />
                    ))}
                </div>
            ) : (
                <p>No artworks in your exhibition yet.</p>
            )}
        </div>
    );
};

export default Dashboard;
