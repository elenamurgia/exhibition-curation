import axios from "axios";

const harvardApiKey = import.meta.env.VITE_HARVARD_API_KEY;

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org"
});


export const getHarvardExhibitions = async () => {
    try {
        const response = await harvardApi.get(`/exhibition`, {
            params: {
                apikey: harvardApiKey, 
            },
        });
        return response.data.records; 
    } catch (error) {
        console.error("Error fetching exhibitions:", error);
        throw error; 
    }
};
