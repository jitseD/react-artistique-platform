import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
    const artworks = await fetchApi({ endpoint: "artworks", wrappedByKey: "data" });
    if (!artworks) return [];
    return artworks.map(unwrapAtributes);
}

const getArtworkById = async (id) => {
    const cheese = await fetchApi({
        endpoint: `artworks/${id}`,
        wrappedByKey: "data"
    });
    return unwrapAtributes(cheese);
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
            },
        }
    );
    console.log(artwork);
    return unwrapAtributes(artwork);
};

export { getArtworks, getArtworkById, createArtwork };