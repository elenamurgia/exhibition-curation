import { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const useExhibition = () => {
    const [loading, setLoading] = useState(false);

    const addArtwork = async (artwork) => {
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, 'exhibitions'), artwork);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding artwork: ", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { addArtwork, loading };
};
