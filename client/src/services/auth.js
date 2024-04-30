const AUTH_DATA = "auth-data-react-artistique-platform";

export const authenticate = async (username, password) => {
    let response;
    try {
        response = await fetch(
            `${import.meta.env.VITE_STRAPI_URL}/api/auth/local`,
            {
                method: "POST",
                body: JSON.stringify({ identifier: username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.log("Auth response error", error.response);
        throw error;
    }

    const data = await response.json();
    if (data.error) {
        throw data.error;
    }
    setAuthData(data);

    return data;
};

export const setAuthData = (authData) => {
    if (authData) {
        localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
    }
};