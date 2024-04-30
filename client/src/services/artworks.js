import { fetchApi, unwrapAtributes } from "./strapi";
import { getToken } from "./auth";

const getArtworks = async () => {
    const artworks = await fetchApi({ endpoint: "artworks", wrappedByKey: "data" });
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