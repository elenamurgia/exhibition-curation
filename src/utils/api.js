import axios from "axios";

const harvardApiKey = import.meta.env.VITE_HARVARD_API_KEY;

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org"
});


export const getHarvardArtworks = async (page = 1) => {
    try {
        const response = await harvardApi.get(`/object`, {
            params: {
                apikey: harvardApiKey, 
                size: 20, 
                page: page, 
                classification: "Paintings",
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching exhibitions:", error);
        throw error; 
    }
};
