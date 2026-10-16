import { Link } from "react-router-dom";

function Reports() {
    return (
        <main className="reports-page">
            <div className="reports-heading"><div><p className="dashboard-eyebrow">WORKSPACE / REPORTS</p><h1>Generated reports</h1><p>Reports and dashboards created from your uploaded datasets will appear here.</p></div><Link className="reports-back-link" to="/dashboard">Back to dashboard</Link></div>
            <section className="reports-summary"><div><span>Available reports</span><strong>0</strong></div><div><span>Generated this month</span><strong>0</strong></div><div><span>Last generated</span><strong>None yet</strong></div></section>
            <section className="reports-empty" aria-label="No generated reports"><h2>No reports generated yet</h2><p>Upload a CSV or spreadsheet, run an analysis, and your ready-to-share report will appear here.</p><Link className="workspace-primary-button" to="/upload">Upload dataset</Link></section>
        </main>
    );
}

export default Reports;
