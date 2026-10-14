import { Link } from "react-router-dom";

function Footer({ variant }) {
    const year = new Date().getFullYear();

    return (
        <footer className={`site-footer site-footer-${variant}`}>
            <div className="site-footer-grid">
                <div className="site-footer-column site-footer-about">
                    <Link to="/" className="site-footer-title">Analytical Dashboard Platform</Link>
                    <p>Upload a dataset and get cleaned data, interactive dashboards and downloadable reports.</p>
                    <address>Centre for Development of Advanced Computing (C-DAC), Delhi</address>
                </div>

                <nav className="site-footer-column" aria-label="Platform links">
                    <h2>Platform</h2>
                    <Link to="/">Dashboard</Link>
                    <Link to="/upload">Upload dataset</Link>
                    <Link to="/dashboards">Saved dashboards</Link>
                    <Link to="/reports">Reports</Link>
                </nav>

                <nav className="site-footer-column" aria-label="Resources and downloads">
                    <h2>Resources</h2>
                    <Link to="/templates">Templates</Link>
                    <a href="/downloads/dashboard" download>Download dashboard</a>
                    <a href="/downloads/report" download>Download report</a>
                    <Link to="/documentation">Documentation</Link>
                </nav>

                <nav className="site-footer-column" aria-label="Help and support">
                    <h2>Help &amp; support</h2>
                    <Link to="/help">Help centre</Link>
                    <Link to="/faq">Frequently asked questions</Link>
                    <Link to="/feedback">Give feedback</Link>
                    <Link to="/accessibility">Accessibility help</Link>
                </nav>

                <div className="site-footer-column site-footer-contact">
                    <h2>Contact</h2>
                    <address>C-DAC, Delhi<br />
                        <a href="mailto:support@example.com">support@example.com</a><br />
                        <a href="tel:+911100000000">+91 11 0000 0000</a><br />
                        Mon–Fri, 9:00 AM–5:30 PM
                    </address>
                </div>
            </div>

            <div className="site-footer-bottom">
                <span>© {year} Analytical Dashboard Platform, C-DAC. All rights reserved.</span>
                <div className="site-footer-legal">
                    <strong>Legal:</strong>
                    <nav aria-label="Legal links">
                        <Link to="/privacy">Privacy policy</Link>
                        <Link to="/terms">Terms &amp; conditions</Link>
                        <Link to="/cookies">Cookie policy</Link>
                        <Link to="/security">Security</Link>
                        <Link to="/accessibility">Accessibility statement</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
