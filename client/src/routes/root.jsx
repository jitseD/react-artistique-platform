import { useState } from "react"
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getAuthData } from "../services/auth";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";



const loader = async () => {
    const { user } = getAuthData();
    return { user };
};

const Root = () => {

    const [naviationVisble, setNavigationVisible] = useState(false);

    return (
        <>
            {naviationVisble ? (
                <header onMouseLeave={() => setNavigationVisible(false)} >
                    <div className="hamburger__wrapper" >
                        <RxCross2 />
                    </div>
                    <NavBar />
                </header>
            ) : (
                <header className="nav--invisible" >
                    <div className="hamburger__wrapper" onMouseEnter={() => setNavigationVisible(true)} >
                        <RxHamburgerMenu />
                    </div>
                    <NavBar />
                </header>
            )}

            <Outlet />
        </>
    );
};

Root.loader = loader;

export default Root;
