import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
    return (
        <div className="layout">
            <Header variant="app" />
            <main id="main-content" className="layout-content"><Outlet /></main>
            <Footer variant="app" />
        </div>
    );
}
export default AppLayout;
