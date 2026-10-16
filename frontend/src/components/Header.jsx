import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { label: "Home", to: "/" },
        { label: "Dashboard", to: "/dashboard" },
        { label: "Help", to: "/help" },
        { label: "About", to: "/about" },
    ];

    return (
        <header className="site-header">
            <div className="site-header-main">
                <Link to="/" className="site-brand" onClick={() => setIsMenuOpen(false)}>
                    <span className="site-logo" aria-hidden="true">ADP</span>
                    <span className="site-brand-text">
                        <strong>Analytical Dashboard Platform</strong>
                        <small>C-DAC, Delhi</small>
                    </span>
                </Link>
                <button type="button" className="site-menu-toggle" aria-expanded={isMenuOpen} aria-controls="site-navigation" onClick={() => setIsMenuOpen((open) => !open)}>
                    <span>Menu</span>
                </button>
                <nav id="site-navigation" className={`site-nav${isMenuOpen ? " open" : ""}`} aria-label="Main navigation">
                    <div className="site-nav-inner">
                        {navItems.map((item) => <Link key={item.label} className={pathname === item.to ? "active" : ""} to={item.to} onClick={() => setIsMenuOpen(false)}>{item.label}</Link>)}
                    </div>
                </nav>
                <div className="site-header-actions">
                    <button type="button" className="site-auth-button" onClick={() => navigate("/login")}>Login</button>
                    <button type="button" className="site-auth-button site-auth-button-primary" onClick={() => navigate("/registration")}>Register</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
