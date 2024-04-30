import { Outlet, NavLink } from "react-router-dom";

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
                        <NavLink
                            to={`/artwork/generate`}
                            className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                        >
                            create
                        </NavLink>
                        <NavLink
                            to={`/login`}
                            className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to={`/signup`}
                            className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                        >
                            signup
                        </NavLink>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;
