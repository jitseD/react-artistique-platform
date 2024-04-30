import { useState } from "react"
import { Outlet } from "react-router-dom";
import AuthStatus from "../components/AuthStatus";
import { getAuthData } from "../services/auth";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";



const loader = async () => {
    const data = getAuthData();
    return data;
};

const Root = () => {

    const [naviationVisble, setNavigationVisible] = useState(false);

    return (
        <>
            {naviationVisble ? (
                <header onMouseLeave={() => setNavigationVisible(false)}>
                    <div className="hamburger__wrapper" onClick={() => setNavigationVisible(false)}>
                        <RxCross2 />
                    </div>
                    <AuthStatus />
                </header>
            ) : (
                <header onMouseEnter={() => setNavigationVisible(true)}>
                    <div className="hamburger__wrapper" onMouseEnter={() => setNavigationVisible(true)} onClick={() => setNavigationVisible(true)}>
                        <RxHamburgerMenu />
                    </div>
                </header>
            )}

            <Outlet />
        </>
    );
};

Root.loader = loader;

export default Root;
