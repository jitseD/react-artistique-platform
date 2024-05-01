import { fetchApi, unwrapAtributes } from "./strapi";

const getCollections = async (searchTerm) => {
    const query = {
        sort: ["createdAt", "title", "description"],
        populate: ["artworks", "creator"]
    };

    if (searchTerm && searchTerm.trim() !== "") {
        query.filters = {
            $or: [
                { title: { $containsi: searchTerm } },
                { description: { $containsi: searchTerm } },
            ],
        };
    }

    const collections = await fetchApi({ endpoint: "collections", query, wrappedByKey: "data", });
    if (!collections) return [];
    return collections.map(unwrapAtributes);
}

// const getCollectionById = async (id) => {
//     const collection = await fetchApi({
//         endpoint: `collections/${id}`,
//         query: { populate: ["creator"] },
//         wrappedByKey: "data"
//     });
//     return unwrapAtributes(collection);
// };

// const createCollection = async (data) => {
//     const collection = await fetchApi(
//         {
//             endpoint: "collections",
//         },
//         {
//             method: "POST",
//             body: JSON.stringify({ data }),
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`
//             },
//         }
//     );
//     return unwrapAtributes(collection);
// };

// const editCollection = async (id, data) => {
//     const collection = await fetchApi(
//         {
//             endpoint: `collections/${id}`,
//         },
//         {
//             method: "PUT",
//             body: JSON.stringify({ data }),
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`
//             },
//         }
//     );
//     return unwrapAtributes(collection);
// };

export { getCollections };