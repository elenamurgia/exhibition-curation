import axios from "axios";

const harvardApiKey = import.meta.env.VITE_HARVARD_API_KEY;
const rijksmuseumKey = import.meta.env.VITE_RIJKSMUSEUM_API_KEY;

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org"
});

const rijksmuseumApi = axios.create({
    baseURL: "https://www.rijksmuseum.nl/api/en/collection",
});


export const getHarvardArtworks = async (page, size) => {
    try {
        const response = await harvardApi.get("/object", {
            params: {
                apikey: harvardApiKey,
                page: page,
                size: size, 
                fields: "id,title,primaryimageurl,people,dated",
                hasimage: 1,
            },
        });
        const filteredArtworks = response.data.records.filter(
            (artwork) => artwork.primaryimageurl
        );

        return { ...response.data, records: filteredArtworks };
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


export const getRijksmuseumArtworks = async (page, pageSize) => {
    try {
        const response = await rijksmuseumApi.get("", {
            params: {
                key: rijksmuseumKey,
                ps: pageSize, 
                p: page, 
                imgonly: true, 
            },
        });

        return response.data.artObjects
            .filter((artwork) => artwork.webImage?.url)
            .map((artwork) => ({
                id: artwork.id,
                title: artwork.title,
                artist: artwork.principalOrFirstMaker || "Unknown",
                image: artwork.webImage.url,
                date: artwork.longTitle,
                source: "Rijksmuseum",
            }));
    } catch (error) {
        console.error("Error fetching artworks from Rijksmuseum:", error);
        throw error;
    }
};


export const getUnifiedArtworks = async (page, pageSize) => {
    try {
        const harvardArtworks = await getHarvardArtworks(page, pageSize);
        const rijksmuseumArtworks = await getRijksmuseumArtworks(page, pageSize);

        const normalizedRijksmuseum = rijksmuseumArtworks.map((artwork) => ({
            id: artwork.id,
            title: artwork.title,
            primaryimageurl: artwork.image, 
            people: [{ name: artwork.artist }], 
            dated: artwork.date,
        }));

        return [...harvardArtworks.records, ...normalizedRijksmuseum];
    } catch (error) {
        console.error("Error fetching unified artworks:", error);
        throw error;
    }
};
