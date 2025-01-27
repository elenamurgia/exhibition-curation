import axios from 'axios';

const harvardApiKey = import.meta.env.VITE_HARVARD_API_KEY;
const rijksmuseumApiKey = import.meta.env.VITE_RIJKSMUSEUM_API_KEY;

const harvardApi = 'https://api.harvardartmuseums.org';
const rijksmuseumApi = 'https://www.rijksmuseum.nl/api/en';
const metApi = 'https://collectionapi.metmuseum.org/public/collection/v1';
const articApi = 'https://api.artic.edu/api/v1';

// Configure axios instance
const axiosInstance = axios.create({
    timeout: 20000, 
});

// Harvard API
export const getHarvardArtworks = async (page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${harvardApi}/object`, {
            params: {
                apikey: harvardApiKey,
                page,
                size,
                hasimage: 1,
            },
        });
        const artworks = response.data.records
            .filter((artwork) => artwork.primaryimageurl) // Ensure the image URL exists
            .map((artwork) => ({
                id: artwork.id,
                title: artwork.title,
                image: artwork.primaryimageurl,
                artist: artwork.people?.[0]?.name || 'Unknown Artist',
                date: artwork.dated,
                source: 'Harvard Art Museums',
            }));

        return artworks;
    } catch (error) {
        console.error('Error fetching Harvard artworks:', error.message);
        return [];
    }
};


// Harvard API - Get Artwork by ID
export const getHarvardArtworkById = async (id) => {
    try {
        const response = await axiosInstance.get(`${harvardApi}/object/${id}`, {
            params: { apikey: harvardApiKey },
        });
        const artwork = response.data;
        return {
            id: artwork.id,
            title: artwork.title,
            image: artwork.primaryimageurl,
            artist: artwork.people?.[0]?.name || 'Unknown Artist',
            date: artwork.dated,
            source: 'Harvard Art Museums',
        };
    } catch (error) {
        console.error('Error fetching Harvard artwork by ID:', error.message);
        return null;
    }
};

const searchHarvardArtworks = async (query, page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${harvardApi}/object`, {
            params: {
                apikey: harvardApiKey,
                page,
                size,
                keyword: query,
                hasimage: 1,
            },
        });
        return response.data.records
            .filter((artwork) => artwork.primaryimageurl) 
            .map((artwork) => ({
                id: artwork.id,
                title: artwork.title,
                image: artwork.primaryimageurl,
                artist: artwork.people?.[0]?.name || 'Unknown Artist',
                date: artwork.dated,
                source: 'Harvard Art Museums',
            }));
    } catch (error) {
        console.error('Error searching Harvard artworks:', error.message);
        return [];
    }
};

// Rijksmuseum API
export const getRijksmuseumArtworks = async (page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${rijksmuseumApi}/collection`, {
            params: {
                key: rijksmuseumApiKey,
                p: page,
                ps: size,
                imgonly: true,
            },
        });
        return response.data.artObjects.map((artwork) => ({
            id: artwork.objectNumber,
            title: artwork.title,
            image: artwork.webImage?.url,
            artist: artwork.principalOrFirstMaker,
            date: artwork.longTitle,
            source: 'Rijksmuseum',
        }));
    } catch (error) {
        console.error('Error fetching Rijksmuseum artworks:', error.message);
        return [];
    }
};

// Rijksmuseum API - Get Artwork by ID
export const getRijksmuseumArtworkById = async (id) => {
    try {
        const response = await axiosInstance.get(`${rijksmuseumApi}/collection/${id}`, {
            params: { key: rijksmuseumApiKey },
        });
        const artwork = response.data.artObject;
        return {
            id: artwork.objectNumber,
            title: artwork.title,
            image: artwork.webImage?.url,
            artist: artwork.principalOrFirstMaker,
            date: artwork.longTitle,
            source: 'Rijksmuseum',
        };
    } catch (error) {
        console.error('Error fetching Rijksmuseum artwork by ID:', error.message);
        return null;
    }
};

const searchRijksmuseumArtworks = async (query, page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${rijksmuseumApi}/collection`, {
            params: {
                key: rijksmuseumApiKey,
                q: query,
                p: page,
                ps: size,
                imgonly: true,
            },
        });
        return response.data.artObjects.map((artwork) => ({
            id: artwork.objectNumber,
            title: artwork.title,
            image: artwork.webImage?.url,
            artist: artwork.principalOrFirstMaker,
            date: artwork.longTitle,
            source: 'Rijksmuseum',
        }));
    } catch (error) {
        console.error('Error searching Rijksmuseum artworks:', error.message);
        return [];
    }
};



// Art Institute of Chicago API
export const getArticArtworks = async (page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${articApi}/artworks`, {
            params: {
                page,
                limit: size,
            },
        });
        return response.data.data
            .filter((artwork) => artwork.image_id) // Ensure images exist
            .map((artwork) => ({
                id: artwork.id,
                title: artwork.title,
                image: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
                artist: artwork.artist_title || 'Unknown Artist',
                date: artwork.date_display,
                source: 'Art Institute of Chicago',
            }));
    } catch (error) {
        console.error('Error fetching Art Institute of Chicago artworks:', error.message);
        return [];
    }
};

// Art Institute of Chicago API - Get Artwork by ID
export const getArticArtworkById = async (id) => {
    try {
        const response = await axiosInstance.get(`${articApi}/artworks/${id}`);
        const artwork = response.data.data;
        return {
            id: artwork.id,
            title: artwork.title,
            image: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
            artist: artwork.artist_title || 'Unknown Artist',
            date: artwork.date_display,
            source: 'Art Institute of Chicago',
        };
    } catch (error) {
        console.error('Error fetching Art Institute of Chicago artwork by ID:', error.message);
        return null;
    }
};

const searchArticArtworks = async (query, page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${articApi}/artworks/search`, {
            params: {
                q: query,
                page,
                limit: size,
            },
        });
        return response.data.data
            .filter((artwork) => artwork.image_id) 
            .map((artwork) => ({
                id: artwork.id,
                title: artwork.title,
                image: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
                artist: artwork.artist_title || 'Unknown Artist',
                date: artwork.date_display,
                source: 'Art Institute of Chicago',
            }));
    } catch (error) {
        console.error('Error searching Art Institute of Chicago artworks:', error.message);
        return [];
    }
};


// MET Museum API
export const getMetArtworks = async (page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${metApi}/objects`);
        const objectIDs = response.data.objectIDs.slice((page - 1) * size, page * size);

        const artworks = await Promise.all(
            objectIDs.map(async (id) => {
                try {
                    const artworkResponse = await axiosInstance.get(`${metApi}/objects/${id}`);
                    const artwork = artworkResponse.data;

                    return {
                        id: artwork.objectID?.toString(),
                        title: artwork.title || "Untitled",
                        image: artwork.primaryImage || artwork.primaryImageSmall,
                        artist: artwork.artistDisplayName || 'Unknown Artist',
                        date: artwork.objectDate,
                        source: 'MET Museum',
                    };
                } catch {
                    return null; // Handle individual failures gracefully
                }
            })
        );

        return artworks.filter((artwork) => artwork?.image); // Filter artworks with valid images
    } catch (error) {
        console.error('Error fetching MET artworks:', error.message);
        return [];
    }
};

// MET Museum API - Get Artwork by ID
export const getMetArtworkById = async (id) => {
    try {
        const response = await axiosInstance.get(`${metApi}/objects/${id}`);
        const artwork = response.data;
        return {
            id: artwork.objectID?.toString(),
            title: artwork.title || "Untitled",
            image: artwork.primaryImage || artwork.primaryImageSmall,
            artist: artwork.artistDisplayName || 'Unknown Artist',
            date: artwork.objectDate,
            source: 'MET Museum',
        };
    } catch (error) {
        console.error('Error fetching MET artwork by ID:', error.message);
        return null;
    }
};

const searchMetArtworks = async (query, page = 1, size = 10) => {
    try {
        const response = await axiosInstance.get(`${metApi}/search`, {
            params: {
                q: query,
                hasImages: true,
            },
        });

        const objectIDs = response.data.objectIDs?.slice((page - 1) * size, page * size) || [];
        const artworks = await Promise.all(
            objectIDs.map(async (id) => {
                try {
                    const artworkResponse = await axiosInstance.get(`${metApi}/objects/${id}`);
                    const artwork = artworkResponse.data;

                    return {
                        id: artwork.objectID?.toString(),
                        title: artwork.title || "Untitled",
                        image: artwork.primaryImage || artwork.primaryImageSmall,
                        artist: artwork.artistDisplayName || 'Unknown Artist',
                        date: artwork.objectDate,
                        source: 'MET Museum',
                    };
                } catch {
                    return null; // Handle individual failures gracefully
                }
            })
        );

        return artworks.filter((artwork) => artwork?.image); // Filter artworks with valid images
    } catch (error) {
        console.error('Error searching MET artworks:', error.message);
        return [];
    }
};


// Unified Artworks
export const getUnifiedArtworks = async (page = 1, size = 10) => {
    try {
        const [harvard, rijksmuseum, artic, met] = await Promise.all([
            getHarvardArtworks(page, size),
            getRijksmuseumArtworks(page, size),
            getArticArtworks(page, size),
            getMetArtworks(page, size),
        ]);

        console.log('Harvard Artworks:', harvard);
        console.log('Rijksmuseum Artworks:', rijksmuseum);
        console.log('Art Institute of Chicago Artworks:', artic);
        console.log('MET Artworks:', met);

        return [...harvard, ...rijksmuseum, ...artic, ...met];
    } catch (error) {
        console.error('Error fetching unified artworks:', error.message);
        return [];
    }
};

// Unified Artwork by ID
export const getUnifiedArtworkById = async (id, source) => {
    console.log(`Fetching artwork by ID. Source: ${source}, ID: ${id}`);
    try {
        switch (source) {
            case 'Harvard Art Museums':
                return await getHarvardArtworkById(id);
            case 'Rijksmuseum':
                return await getRijksmuseumArtworkById(id);
            case 'Art Institute of Chicago':
                return await getArticArtworkById(id);
            case 'MET Museum':
                return await getMetArtworkById(id);
            default:
                throw new Error('Invalid source specified');
        }
    } catch (error) {
        console.error('Error fetching unified artwork by ID:', error.message);
        return null;
    }
};

export const searchArtworks = async (query, page = 1, size = 10) => {
    try {
        const [harvardResults, rijksmuseumResults, articResults, metResults] = await Promise.all([
            searchHarvardArtworks(query, page, size),
            searchRijksmuseumArtworks(query, page, size),
            searchArticArtworks(query, page, size),
            searchMetArtworks(query, page, size),
        ]);

        console.log('Search results from Harvard:', harvardResults);
        console.log('Search results from Rijksmuseum:', rijksmuseumResults);
        console.log('Search results from Art Institute of Chicago:', articResults);
        console.log('Search results from MET:', metResults);

        return [...harvardResults, ...rijksmuseumResults, ...articResults, ...metResults];
    } catch (error) {
        console.error('Error performing search:', error.message);
        return [];
    }
};

