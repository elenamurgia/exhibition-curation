import axios from "axios";
import axiosRetry from "axios-retry";

const harvardApiKey = import.meta.env.VITE_HARVARD_API_KEY;
const rijksmuseumKey = import.meta.env.VITE_RIJKSMUSEUM_API_KEY;
const europeanaKey = import.meta.env.VITE_EUROPEANA_API_KEY;

const harvardApi = axios.create({
    baseURL: "https://api.harvardartmuseums.org",
});

const rijksmuseumApi = axios.create({
    baseURL: "/rijksmuseum", 
});

const europeanaApi = axios.create({
    baseURL: "https://api.europeana.eu/record/v2/search.json",
});


axiosRetry(harvardApi, {
    retries: 3, 
    retryDelay: (retryCount) => retryCount * 1000, 
    retryCondition: (error) =>
        error.code === "ERR_NETWORK" || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

axiosRetry(rijksmuseumApi, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) =>
        error.code === "ERR_NETWORK" || axiosRetry.isNetworkOrIdempotentRequestError(error),
});

axiosRetry(europeanaApi, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) =>
        error.code === "ERR_NETWORK" || axiosRetry.isNetworkOrIdempotentRequestError(error),
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

export const getEuropeanaArtworks = async (page, pageSize) => {
    try {
        const response = await europeanaApi.get("", {
            params: {
                wskey: europeanaKey,
                query: "art",
                rows: pageSize,
                start: (page - 1) * pageSize + 1,
                media: true,
            },
        });

        return response.data.items
            .filter((artwork) => artwork.edmPreview?.[0])
            .map((artwork) => ({
                id: artwork.id,
                title: artwork.title?.[0] || "Untitled",
                artist: artwork.dcCreator?.[0] || "Unknown",
                image: artwork.edmPreview?.[0],
                date: artwork.dcDate?.[0] || "Unknown",
                source: "Europeana",
            }));
    } catch (error) {
        console.error("Error fetching artworks from Europeana:", error);
        throw error;
    }
};

export const getUnifiedArtworks = async (page, pageSize) => {
    try {
        const harvardArtworks = await getHarvardArtworks(page, pageSize);
        const rijksmuseumArtworks = await getRijksmuseumArtworks(page, pageSize);
        const europeanaArtworks = await getEuropeanaArtworks(page, pageSize);

        const normalizedEuropeana = europeanaArtworks.map((artwork) => ({
            id: artwork.id,
            title: artwork.title,
            primaryimageurl: artwork.image,
            people: [{ name: artwork.artist }],
            dated: artwork.date,
        }));

        const normalizedRijksmuseum = rijksmuseumArtworks.map((artwork) => ({
            id: artwork.id,
            title: artwork.title,
            primaryimageurl: artwork.image,
            people: [{ name: artwork.artist }],
            dated: artwork.date,
        }));

        return [
            ...harvardArtworks.records,
            ...normalizedRijksmuseum,
            ...normalizedEuropeana,
        ];
    } catch (error) {
        console.error("Error fetching unified artworks:", error);
        throw error;
    }
};
