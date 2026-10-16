import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
    const { pathname } = useLocation();
    const isDashboard = pathname === "/dashboard";

    return (
        <div className={`layout${isDashboard ? " dashboard-layout" : ""}`}>
            {!isDashboard && <Header variant="app" />}
            <main id="main-content" className="layout-content"><Outlet /></main>
            {!isDashboard && <Footer variant="app" />}
        </div>
    );
}
export default AppLayout;
