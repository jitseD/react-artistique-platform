import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
    const artworks = await fetchApi({ endpoint: "artworks" });
    if (!artworks) return [];
    return artworks.map(unwrapAtributes);
}


export default getArtworks;