import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AuthLayout() {
    return (
        <div className="layout">
            <Header variant="auth" />
            <div className="layout-content"><Outlet /></div>
            <Footer variant="auth" />
        </div>
    );
}
export default AuthLayout;