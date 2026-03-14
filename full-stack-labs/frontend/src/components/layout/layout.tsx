import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";
import { Nav } from "./nav/nav";


export function Layout() {
    return (
        <>
            <Nav />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
