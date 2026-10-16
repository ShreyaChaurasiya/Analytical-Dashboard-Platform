import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AuthLayout() {
    return (
        <div className="layout auth-layout">
            <Header variant="auth" />
            <main id="main-content" className="layout-content"><Outlet /></main>
            <Footer variant="auth" />
        </div>
    );
}
export default AuthLayout;
