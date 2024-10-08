import { useRouteLoaderData, NavLink, useFetcher } from "react-router-dom";


const NavBar = () => {
    const { user } = useRouteLoaderData("root");
    const fetcher = useFetcher();
    const isLoggingOut = fetcher.formData != null;

    return user ? (
        <nav className="nav__bar">
            <div className="nav__links">
                <NavLink to={`${import.meta.env.BASE_URL}/`} className={`nav__link`} >artworks</NavLink>
                <NavLink to={`${import.meta.env.BASE_URL}/collections`} className={`nav__link`} >collections</NavLink>
                <NavLink to={`${import.meta.env.BASE_URL}/artwork/generate`} className="nav__link" >generator</NavLink>
                <NavLink to={`${import.meta.env.BASE_URL}/profile/${user.id}`} className="nav__link" >profile</NavLink>
            </div>

            <div className="nav__buttons">
                <fetcher.Form method="post" action={`${import.meta.env.BASE_URL}/logout`}>
                    <button className="nav__button" type="submit" disabled={isLoggingOut}>
                        {isLoggingOut ? "Signing out..." : "Sign out"}
                    </button>
                </fetcher.Form>
            </div>
        </nav>
    ) : (
        <nav className="nav__bar">
            <div className="nav__links">
                <NavLink to={`${import.meta.env.BASE_URL}/`} className={`nav__link`} >artworks</NavLink>
                <NavLink to={`${import.meta.env.BASE_URL}/collections`} className={`nav__link`} >collections</NavLink>
                <NavLink to={`${import.meta.env.BASE_URL}/artwork/generate`} className="nav__link" >generator</NavLink>
            </div>
            <div className="nav__buttons">
                <NavLink to={`${import.meta.env.BASE_URL}/login`} className="nav__link button nav__button nav__button--primary" >login</NavLink>
                <NavLink to={`${import.meta.env.BASE_URL}/register`} className="nav__link button nav__button" >register</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;