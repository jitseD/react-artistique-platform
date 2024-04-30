import { useRouteLoaderData, NavLink, useFetcher } from "react-router-dom";


const AuthStatus = () => {
    let { user } = useRouteLoaderData("root");
    const fetcher = useFetcher();
    let isLoggingOut = fetcher.formData != null;

    return user ? (
        <>
            <NavLink
                to={`/artwork/generate`}
                className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
            >
                create
            </NavLink>
            <fetcher.Form method="post" action="/logout">
                <button type="submit" disabled={isLoggingOut}>
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
            </fetcher.Form>
        </>
    ) : (
        <>
            <NavLink
                to={`/login`}
                className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
            >
                login
            </NavLink>
            <NavLink
                to={`/register`}
                className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
            >
                register
            </NavLink>
        </>
    );
};

export default AuthStatus;