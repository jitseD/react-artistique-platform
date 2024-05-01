import { fetchApi, unwrapAtributes } from "./strapi";
import { getToken } from "./auth";

const getArtworks = async (searchTerm, darkModeFilter) => {
    const query = {
        sort: ["title", "description", "createdAt"],
    };

    if (searchTerm && searchTerm.trim() !== "") {
        query.filters = {
            $or: [
                { title: { $containsi: searchTerm } },
                { description: { $containsi: searchTerm } },
            ],
        };
    }

    if (darkModeFilter !== undefined) {
        query.filters = {
            ...query.filters,
            darkMode: darkModeFilter,
        };
    }

    const artworks = await fetchApi({ endpoint: "artworks", wrappedByKey: "data", query });
    if (!artworks) return [];
    return artworks.map(unwrapAtributes);
}

const getArtworkById = async (id) => {
    const artwork = await fetchApi({
        endpoint: `artworks/${id}`,
        query: { populate: ["creater"] },
        wrappedByKey: "data"
    });
    return unwrapAtributes(artwork);
};

const createArtwork = async (data) => {
    const artwork = await fetchApi(
        {
            endpoint: "artworks",
        },
        {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },
        }
    );
    return unwrapAtributes(artwork);
};

const editArtwork = async (id, data) => {
    const artwork = await fetchApi(
        {
            endpoint: `artworks/${id}`,
        },
        {
            method: "PUT",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`

            },
        }
    );
    return unwrapAtributes(artwork);
};

export { getArtworks, getArtworkById, createArtwork, editArtwork };