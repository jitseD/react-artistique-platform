import { useRouteLoaderData, NavLink } from "react-router-dom";

const AuthStatus = () => {
    let { user } = useRouteLoaderData("root");

    return user ? (
        <NavLink
            to={`/artwork/generate`}
            className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
        >
            create
        </NavLink>
    ) : (
        <>
            <NavLink
                to={`/login`}
                className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
            >
                login
            </NavLink>
            <NavLink
                to={`/signup`}
                className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
            >
                signup
            </NavLink>
        </>
    );
};

export default AuthStatus;