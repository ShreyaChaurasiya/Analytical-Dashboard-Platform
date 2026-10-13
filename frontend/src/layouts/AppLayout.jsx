import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
    return (
        <div className="layout">
            <Header variant="app" />
            <div className="layout-content"><Outlet /></div>
            <Footer variant="app" />
        </div>
    );
}
export default AppLayout;