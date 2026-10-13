import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ variant }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Contextual link for auth pages, depends on the current route
    const authLink = {
        "/login": { text: "New user?", label: "Create account", to: "/registration" },
        "/registration": { text: "Already registered?", label: "Log in", to: "/login" },
        "/login/otp": { text: "Wrong account?", label: "Back to login", to: "/login" },
        "/forget-password": { text: "Remembered it?", label: "Log in", to: "/login" },
    }[pathname];

    return (
        <header className={`site-header site-header-${variant}`}>
            <Link to={variant === "app" ? "/" : "/login"} className="site-brand">
                <span className="site-logo" aria-hidden="true"></span>
                <span className="site-brand-text">
                    <strong>Analytical Dashboard Platform</strong>
                </span>
            </Link>

            {variant === "auth" && authLink && (
                <p className="site-header-link">
                    {authLink.text} <Link to={authLink.to}>{authLink.label}</Link>
                </p>
            )}

            {variant === "app" && (
                <nav className="site-nav" aria-label="Main">
                    <Link to="/">Dashboard</Link>
                    {/* add: Datasets, Reports, etc. as you build them */}
                    <button type="button" className="site-logout" onClick={() => navigate("/login")}>
                        Log out
                    </button>
                </nav>
            )}
        </header>
    );
}

export default Header;