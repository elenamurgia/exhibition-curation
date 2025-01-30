import React, { useState, useEffect } from "react";
import { db, auth } from "../utils/firebase"; 
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore"; 
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ArtworkCard from "./ArtworkCard";

const Dashboard = () => {
    const { user } = useAuth();
    const [userExhibition, setUserExhibition] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const fetchArtworks = async () => {
            try {
                const userExhibitionRef = doc(db, "exhibitions", user.uid);
                const userDoc = await getDoc(userExhibitionRef);
                if (userDoc.exists()) {
                    setArtworks(userDoc.data().artworks || []);
                }
            } catch (error) {
                console.error("Error fetching artworks:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchArtworks();
    }, [user]);

    const fetchExhibition = async () => {
        if (!user) return;
        try {
            const querySnapshot = await getDocs(collection(db, `users/${user.uid}/exhibition`));
            const userArtworks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUserExhibition(userArtworks);
        } catch (error) {
            console.error("Error fetching exhibition:", error);
        }
    };

    useEffect(() => {
        fetchExhibition();
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const addToExhibition = async (artwork) => {
        if (!user) return;
        try {
            await addDoc(collection(db, `users/${user.uid}/exhibition`), artwork);
            fetchExhibition(); 
        } catch (error) {
            console.error("Error adding artwork:", error);
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
                        <ArtworkCard key={artwork.id} {...artwork} />
                    ))}
                </div>
            ) : (
                <p>No artworks in your exhibition yet.</p>
            )}
        </div>
    );
};

export default Dashboard;