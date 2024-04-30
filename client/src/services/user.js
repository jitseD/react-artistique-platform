import { fetchApi } from "./strapi";

export const getUserById = async (id) => {
    const user = await fetchApi({
        endpoint: `users/${id}`,
        query: { populate: ["artworks"] },
    });
    console.log("user", user);
    return user;
};
