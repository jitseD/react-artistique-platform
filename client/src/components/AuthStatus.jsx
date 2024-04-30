import { useRouteLoaderData, NavLink, useFetcher } from "react-router-dom";


const AuthStatus = () => {
    let { user } = useRouteLoaderData("root");
    const fetcher = useFetcher();
    let isLoggingOut = fetcher.formData != null;

    return user ? (
        <nav className="nav__bar">
            <div className="nav__links">
                <NavLink
                    to={`/`}
                    className={`nav__link`}
                >
                    artworks
                </NavLink>
                <NavLink
                    to="/artwork/generate"
                    className="nav__link"
                >
                    create
                </NavLink>
            </div>

            <div className="nav__buttons">
                <fetcher.Form method="post" action="/logout">
                    <button className="nav__button nav__button--primary" type="submit" disabled={isLoggingOut}>
                        {isLoggingOut ? "Signing out..." : "Sign out"}
                    </button>
                </fetcher.Form>
            </div>
        </nav>
    ) : (
        <nav className="nav__bar">
            <div className="nav__links">
                <NavLink
                    to={`/`}
                    className={`nav__link`}
                >
                    artworks
                </NavLink>
            </div>
            <div className="nav__buttons">
                <NavLink
                    to={`/login`}
                    className="nav__link button nav__button nav__button--primary"
                >
                    login
                </NavLink>
                <NavLink
                    to={`/register`}
                    className="nav__link button nav__button nav__button--primary"
                >
                    register
                </NavLink>
            </div>
        </nav>
    );
};

export default AuthStatus;