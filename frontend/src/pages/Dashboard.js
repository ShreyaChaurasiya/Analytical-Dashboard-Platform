import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const metrics = [
    { label: "Total datasets", value: "0", note: "Upload your first dataset", tone: "green" },
    { label: "Data quality score", value: "-", note: "Available after upload", tone: "blue" },
    { label: "Reports generated", value: "0", note: "Available after analysis", tone: "violet" },
    { label: "Pending reviews", value: "0", note: "Nothing needs attention", tone: "amber" },
];

function Dashboard() {
    const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    useEffect(() => {
        if (!isAnalysisRunning) return undefined;
        const timer = window.setInterval(() => {
            setAnalysisProgress((current) => {
                if (current >= 100) {
                    window.clearInterval(timer);
                    setIsAnalysisRunning(false);
                    return 100;
                }
                return Math.min(current + 20, 100);
            });
        }, 450);
        return () => window.clearInterval(timer);
    }, [isAnalysisRunning]);

    const startAnalysis = () => {
        setAnalysisProgress(0);
        setIsAnalysisRunning(true);
    };

    return (
        <main className={`workspace-page workspace-page-empty${isWorkspaceOpen ? "" : " workspace-page-collapsed"}`}>
            <aside className="workspace-sidebar" aria-label="Dashboard sections">
                <div className="workspace-sidebar-header"><button className="workspace-hide-control" type="button" aria-label="Hide workspace" onClick={() => setIsWorkspaceOpen(false)}>☰</button></div>
                <Link className="workspace-nav-link" to="/">Home</Link>
                <Link className="workspace-nav-link active" to="/dashboard">Overview</Link>
                <Link className="workspace-nav-link" to="/upload">Upload data</Link>
                <Link className="workspace-nav-link" to="/reports">Reports</Link>
                <button className="workspace-nav-link" type="button">Data catalogue</button>
                <button className="workspace-nav-link" type="button">Quality checks</button>
                <div className="workspace-download-menu">
                    <button className="workspace-nav-link" type="button" aria-expanded={isDownloadOpen} onClick={() => setIsDownloadOpen((open) => !open)}>Downloads</button>
                    {isDownloadOpen && <div className="workspace-download-dropdown"><a href="data:text/plain;charset=utf-8,No%20report%20has%20been%20generated%20yet." download="analytical-dashboard-report.txt">Download report</a><a href="data:text/csv;charset=utf-8,metric,value%0ATotal%20datasets,0%0AReports%20generated,0%0APending%20reviews,0" download="analytical-dashboard.csv">Download dashboard</a></div>}
                </div>
                <div className="workspace-sidebar-divider" />
                <button className="workspace-nav-link" type="button">Settings</button>
                <Link className="workspace-nav-link" to="/help">Help centre</Link>
                <div className="workspace-sidebar-footer"><span className="workspace-nav-label"><strong>Ready for your data</strong><small>Upload a file to begin</small></span></div>
            </aside>
            {!isWorkspaceOpen && <button className="workspace-show-control" type="button" aria-label="Show workspace" onClick={() => setIsWorkspaceOpen(true)}>☰</button>}

            <section className="workspace-main">
                <div className="workspace-filterbar workspace-filterbar-expanded" aria-label="Dashboard filters"><label><span>Dataset</span><select defaultValue="all-datasets"><option value="all-datasets">All uploaded datasets</option></select></label><label><span>Analysis view</span><select defaultValue="overview"><option value="overview">Overview</option><option>Data quality</option><option>Trends over time</option><option>Distribution</option><option>Relationships</option></select></label><label><span>Time range</span><select defaultValue="all-time"><option value="all-time">All available data</option><option>Last 30 days</option><option>Last 90 days</option><option>Last 12 months</option></select></label><span className="workspace-updated">No dataset selected</span></div>
                <div className="workspace-topbar"><div><p className="dashboard-eyebrow">ANALYTICAL DASHBOARD</p><h1>Start with your data</h1><p className="workspace-subtitle">Upload any CSV or spreadsheet and we will prepare an analysis-ready dashboard and report.</p></div><div className="workspace-actions"><button className="workspace-analysis-button" type="button" onClick={startAnalysis} disabled={isAnalysisRunning}>{isAnalysisRunning ? "Analysing..." : "Run analysis"}</button><Link className="workspace-primary-button" to="/upload">Upload dataset</Link></div></div>
                {(isAnalysisRunning || analysisProgress === 100) && <section className={`analysis-progress-card${analysisProgress === 100 ? " analysis-complete" : ""}`} aria-live="polite"><div className="analysis-progress-copy"><div><strong>{analysisProgress === 100 ? "Analysis complete" : "Analysis in progress"}</strong><p>{analysisProgress === 100 ? "Your dashboard is ready for review." : "Preparing quality checks, trends, and report sections."}</p></div></div><div className="analysis-progress-value">{analysisProgress}%</div><div className="analysis-progress-track"><i style={{ width: `${analysisProgress}%` }} /></div></section>}
                <section className="metric-grid" aria-label="Workspace summary">{metrics.map((metric) => <article className={`metric-card metric-${metric.tone}`} key={metric.label}><div className="metric-card-head" /><p>{metric.label}</p><strong>{metric.value}</strong><small>{metric.note}</small></article>)}</section>
                <div className="workspace-content-grid"><article className="dashboard-panel panel-trend empty-panel"><div className="panel-heading"><div><h2>Data activity</h2><p>Your activity trend will appear here.</p></div></div><div className="empty-panel-body"><strong>Upload a dataset to see activity</strong><p>Charts and trends will be generated after your first analysis.</p><Link to="/upload" className="panel-link">Upload dataset</Link></div></article><article className="dashboard-panel panel-sources empty-panel"><div className="panel-heading"><div><h2>Data summary</h2><p>Source and quality insights will appear here.</p></div></div><div className="empty-panel-body"><strong>No data available yet</strong><p>We will identify columns, values, and quality issues automatically.</p></div></article><article className="dashboard-panel panel-activity empty-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Your generated dashboards and reports will appear here.</p></div><Link to="/reports" className="panel-link">View reports</Link></div><div className="empty-panel-body"><strong>No reports generated</strong><p>Run analysis after uploading a dataset to create your first report.</p></div></article></div>
            </section>
        </main>
    );
}

export default Dashboard;
