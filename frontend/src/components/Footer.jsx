import { Link } from "react-router-dom";

function Footer({ variant }) {
    const year = new Date().getFullYear();
    return (
        <footer className={`site-footer site-footer-${variant}`}>
            <p>© {year}All rights reserved.</p>
            <nav aria-label="Footer">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Use</Link>
                <Link to="/help">Help</Link>
                {variant === "app" && <span className="site-version">v1.0</span>}
            </nav>
        </footer>
    );
}

export default Footer;