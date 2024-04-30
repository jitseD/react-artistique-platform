import { Outlet, NavLink } from "react-router-dom";
import AuthStatus from "../components/AuthStatus";
import { getAuthData } from "../services/auth";

const loader = async () => {
    const data = getAuthData();
    return data;
};

const Root = () => {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <NavLink
                            to={`/`}
                            className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                        >
                            home
                        </NavLink>
                        <AuthStatus />
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

Root.loader = loader;

export default Root;
