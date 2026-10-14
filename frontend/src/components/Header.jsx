import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ variant }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    const navItems = [
        { label: "Home", to: "/" },
        { label: "Upload", to: "/upload" },
        { label: "Dashboards", to: "/dashboards" },
        { label: "Templates", to: "/templates" },
        { label: "Reports", to: "/reports" },
        { label: "Help", to: "/help" },
    ];

    return (
        <header className={`site-header site-header-${variant}`}>
            <div className="site-accessibility-bar">
                <a className="skip-link" href="#main-content">Skip to main content</a>
                <span className="site-accessibility-note">Centre for Development of Advanced Computing (C-DAC), Delhi</span>
                <div className="site-accessibility-controls" aria-label="Accessibility controls">
                    <span>Text size</span><button type="button">A−</button><button type="button">A</button><button type="button">A+</button><button type="button" aria-label="Toggle contrast">◐</button>
                </div>
            </div>

            <div className="site-header-main">
                <Link to="/" className="site-brand" onClick={() => setIsMenuOpen(false)}>
                    <span className="site-logo" aria-hidden="true"><span>ADP</span></span>
                    <span className="site-brand-text"><strong>Analytical Dashboard Platform</strong><small>Centre for Development of Advanced Computing (C-DAC), Delhi</small></span>
                </Link>

                <div className="site-header-actions">
                    <label className="site-search">
                        <span className="sr-only">Search datasets and dashboards</span>
                        <input type="search" placeholder="Search datasets and dashboards" />
                        <button type="button" aria-label="Search">⌕</button>
                    </label>
                    <div className="site-download-menu">
                        <button type="button" className="site-download-button" aria-expanded={isDownloadOpen} aria-haspopup="menu" onClick={() => setIsDownloadOpen((open) => !open)}>
                            Download <span aria-hidden="true">⌄</span>
                        </button>
                        {isDownloadOpen && <div className="site-download-dropdown" role="menu">
                            <a href="/downloads/dashboard" download role="menuitem" onClick={() => setIsDownloadOpen(false)}>Download dashboard</a>
                            <a href="/downloads/report" download role="menuitem" onClick={() => setIsDownloadOpen(false)}>Download report</a>
                        </div>}
                    </div>
                    <button type="button" className="site-auth-button" onClick={() => navigate("/login")}>Login</button>
                    <button type="button" className="site-auth-button site-auth-button-primary" onClick={() => navigate("/registration")}>Register</button>
                </div>

                <button type="button" className="site-menu-toggle" aria-expanded={isMenuOpen} aria-controls="site-navigation" onClick={() => setIsMenuOpen((open) => !open)}><span aria-hidden="true">☰</span><span>Menu</span></button>
            </div>

            <nav id="site-navigation" className={`site-nav${isMenuOpen ? " open" : ""}`} aria-label="Main navigation">
                <div className="site-nav-inner">
                    {navItems.map((item) => <Link key={item.label} className={pathname === item.to ? "active" : ""} to={item.to} onClick={() => setIsMenuOpen(false)}>{item.label}</Link>)}
                </div>
            </nav>
        </header>
    );
}

export default Header;
