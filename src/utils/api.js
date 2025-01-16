import axios from "axios";

const harvardApiKey = import.meta.env.VITE_HARVARD_API_KEY;

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org"
});


export const getHarvardArtworks = async (page, size) => {
    try {
        const response = await harvardApi.get("/object", {
            params: {
                apikey: harvardApiKey,
                page: page,
                size: size, 
                fields: "id,title,primaryimageurl,people,dated",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching artworks:", error);
        throw error;
    }
};


export const getHarvardArtworkById = async (id) => {
    try {
        const response = await harvardApi.get(`/object/${id}`, {
            params: {
                apikey: harvardApiKey,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching artwork details:", error);
        throw error;
    }
};
